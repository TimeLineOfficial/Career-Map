-- CareerMap Enterprise Cloud Admin Authentication Setup for Supabase
-- Run this entire script once in your Supabase Project -> SQL Editor.
-- Features:
--   1. Row Level Security (RLS) blocking all direct public table access
--   2. Bcrypt password hashing (pgcrypto) inside Postgres (never exposed to browser)
--   3. Server-issued 30-minute session tokens verified on every admin mutation
--   4. Super-admin role enforcement inside Postgres for creating/deleting admins
--   5. Server-side brute-force lockout protection per username

create extension if not exists pgcrypto;

create table if not exists public.admin_accounts (
  id text primary key,
  username text unique not null,
  password_hash text not null,
  primary_phone text not null,
  secondary_phone text,
  role text not null default 'admin' check (role in ('super_admin', 'admin')),
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

create table if not exists public.admin_sessions (
  token text primary key,
  admin_id text not null references public.admin_accounts(id) on delete cascade,
  role text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_login_attempts (
  username_key text primary key,
  failed_count int not null default 0,
  locked_until timestamptz
);

-- Enable RLS and block all direct anon/public access to tables
alter table public.admin_accounts enable row level security;
alter table public.admin_sessions enable row level security;
alter table public.admin_login_attempts enable row level security;

drop policy if exists "deny_all_public" on public.admin_accounts;
create policy "deny_all_public" on public.admin_accounts for all using (false) with check (false);

drop policy if exists "deny_all_sessions" on public.admin_sessions;
create policy "deny_all_sessions" on public.admin_sessions for all using (false) with check (false);

drop policy if exists "deny_all_attempts" on public.admin_login_attempts;
create policy "deny_all_attempts" on public.admin_login_attempts for all using (false) with check (false);

-- Helper: validate active session token
create or replace function public._require_admin_session(p_session_token text)
returns public.admin_sessions
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sess public.admin_sessions%rowtype;
begin
  delete from public.admin_sessions where expires_at <= now();
  select * into v_sess
  from public.admin_sessions
  where token = coalesce(p_session_token, '')
    and expires_at > now();

  if not found then
    raise exception 'UNAUTHORIZED: Invalid or expired admin session.';
  end if;
  return v_sess;
end;
$$;

-- 1. Verify Admin Login (Username/Shorthand + Password + Registered Phone + Rate Limit)
create or replace function public.verify_admin_login(
  p_username text,
  p_password text,
  p_phone text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_clean_user text := lower(trim(coalesce(p_username, '')));
  v_clean_phone text := right(regexp_replace(coalesce(p_phone, ''), '\D', '', 'g'), 10);
  v_acc public.admin_accounts%rowtype;
  v_attempt public.admin_login_attempts%rowtype;
  v_p1 text;
  v_p2 text;
  v_token text;
  v_expires timestamptz := now() + interval '30 minutes';
  v_new_count int;
begin
  -- Check server-side lockout
  select * into v_attempt from public.admin_login_attempts where username_key = v_clean_user;
  if found and v_attempt.locked_until is not null and v_attempt.locked_until > now() then
    return jsonb_build_object(
      'success', false,
      'message', format('Security lockout active. Try again in %s minute(s).', ceil(extract(epoch from (v_attempt.locked_until - now())) / 60))
    );
  end if;

  select * into v_acc
  from public.admin_accounts
  where lower(trim(username)) = v_clean_user
     or (v_clean_user in ('admin', 'himesh') and role = 'super_admin')
  limit 1;

  if not found then
    return jsonb_build_object('success', false, 'message', format('Admin username ''%s'' not found.', trim(p_username)));
  end if;

  v_p1 := right(regexp_replace(coalesce(v_acc.primary_phone, ''), '\D', '', 'g'), 10);
  v_p2 := right(regexp_replace(coalesce(v_acc.secondary_phone, ''), '\D', '', 'g'), 10);

  if v_acc.password_hash <> crypt(trim(coalesce(p_password, '')), v_acc.password_hash)
     or length(v_clean_phone) < 10
     or (v_p1 <> v_clean_phone and (v_p2 = '' or v_p2 <> v_clean_phone)) then
    v_new_count := coalesce(v_attempt.failed_count, 0) + 1;
    insert into public.admin_login_attempts (username_key, failed_count, locked_until)
    values (
      v_clean_user,
      v_new_count,
      case when v_new_count >= 5 then now() + interval '15 minutes' else null end
    )
    on conflict (username_key) do update
      set failed_count = v_new_count,
          locked_until = case when v_new_count >= 5 then now() + interval '15 minutes' else null end;

    return jsonb_build_object(
      'success', false,
      'message', case
        when v_acc.password_hash <> crypt(trim(coalesce(p_password, '')), v_acc.password_hash) then 'Incorrect password.'
        else 'Phone number does not match registered admin contacts.'
      end
    );
  end if;

  -- Success: clear attempts, issue 30-min token
  delete from public.admin_login_attempts where username_key = v_clean_user;
  v_token := encode(gen_random_bytes(32), 'hex');

  insert into public.admin_sessions (token, admin_id, role, expires_at)
  values (v_token, v_acc.id, v_acc.role, v_expires);

  update public.admin_accounts set last_login_at = now() where id = v_acc.id;

  return jsonb_build_object(
    'success', true,
    'message', 'Authentication successful',
    'token', v_token,
    'account', jsonb_build_object(
      'id', v_acc.id,
      'username', v_acc.username,
      'primaryPhone', v_acc.primary_phone,
      'secondaryPhone', v_acc.secondary_phone,
      'role', v_acc.role,
      'createdAt', v_acc.created_at,
      'lastLoginAt', now()
    )
  );
end;
$$;

-- 2. Logout / Revoke Session
create or replace function public.logout_admin_session(p_session_token text)
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.admin_sessions where token = coalesce(p_session_token, '');
$$;

-- 3. List Admin Accounts (requires valid active session; never returns password_hash)
create or replace function public.list_admin_accounts(p_session_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sess public.admin_sessions%rowtype;
begin
  v_sess := public._require_admin_session(p_session_token);
  return (
    select coalesce(jsonb_agg(jsonb_build_object(
      'id', id,
      'username', username,
      'primaryPhone', primary_phone,
      'secondaryPhone', secondary_phone,
      'role', role,
      'createdAt', created_at,
      'lastLoginAt', last_login_at
    ) order by created_at asc), '[]'::jsonb)
    from public.admin_accounts
  );
end;
$$;

-- 4. Create New Admin Account (Super Admin session required)
create or replace function public.create_admin_account_rpc(
  p_session_token text,
  p_username text,
  p_password text,
  p_primary_phone text,
  p_secondary_phone text default null,
  p_role text default 'admin'
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sess public.admin_sessions%rowtype;
  v_id text := 'adm_' || extract(epoch from now())::bigint::text;
  v_p1 text := right(regexp_replace(coalesce(p_primary_phone, ''), '\D', '', 'g'), 10);
  v_p2 text := case when p_secondary_phone is not null and trim(p_secondary_phone) <> ''
                    then right(regexp_replace(p_secondary_phone, '\D', '', 'g'), 10)
                    else null end;
begin
  v_sess := public._require_admin_session(p_session_token);
  if v_sess.role <> 'super_admin' then
    return jsonb_build_object('success', false, 'message', 'Only Super Admin can create new admin accounts.');
  end if;

  if length(trim(p_username)) < 3 then
    return jsonb_build_object('success', false, 'message', 'Username must be at least 3 characters.');
  end if;
  if length(trim(p_password)) < 8 then
    return jsonb_build_object('success', false, 'message', 'Password must be at least 8 characters long.');
  end if;
  if length(v_p1) < 10 then
    return jsonb_build_object('success', false, 'message', 'A valid 10-digit primary phone number is required.');
  end if;

  if exists (select 1 from public.admin_accounts where lower(trim(username)) = lower(trim(p_username))) then
    return jsonb_build_object('success', false, 'message', format('Admin username ''%s'' already exists.', trim(p_username)));
  end if;

  insert into public.admin_accounts (id, username, password_hash, primary_phone, secondary_phone, role)
  values (
    v_id,
    trim(p_username),
    crypt(trim(p_password), gen_salt('bf')),
    v_p1,
    v_p2,
    case when p_role = 'super_admin' then 'super_admin' else 'admin' end
  );

  return jsonb_build_object('success', true, 'message', format('Admin account ''%s'' created in Supabase cloud.', trim(p_username)));
end;
$$;

-- 5. Update Admin Account Credentials (Super Admin or self)
create or replace function public.update_admin_account_rpc(
  p_session_token text,
  p_target_id text,
  p_new_username text,
  p_new_password text default null,
  p_primary_phone text default null,
  p_secondary_phone text default null,
  p_role text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sess public.admin_sessions%rowtype;
  v_acc public.admin_accounts%rowtype;
  v_p1 text;
  v_p2 text;
begin
  v_sess := public._require_admin_session(p_session_token);
  if v_sess.role <> 'super_admin' and v_sess.admin_id <> p_target_id then
    return jsonb_build_object('success', false, 'message', 'Permission denied.');
  end if;

  select * into v_acc from public.admin_accounts where id = p_target_id;
  if not found then
    return jsonb_build_object('success', false, 'message', 'Admin account not found.');
  end if;

  if p_new_username is not null and length(trim(p_new_username)) >= 3 then
    if exists (select 1 from public.admin_accounts where id <> p_target_id and lower(trim(username)) = lower(trim(p_new_username))) then
      return jsonb_build_object('success', false, 'message', 'Username is already taken by another admin.');
    end if;
    v_acc.username := trim(p_new_username);
  end if;

  if p_new_password is not null and length(trim(p_new_password)) > 0 then
    if length(trim(p_new_password)) < 8 then
      return jsonb_build_object('success', false, 'message', 'New password must be at least 8 characters long.');
    end if;
    v_acc.password_hash := crypt(trim(p_new_password), gen_salt('bf'));
  end if;

  if p_primary_phone is not null and length(trim(p_primary_phone)) > 0 then
    v_p1 := right(regexp_replace(p_primary_phone, '\D', '', 'g'), 10);
    if length(v_p1) < 10 then
      return jsonb_build_object('success', false, 'message', 'Primary phone must be a valid 10-digit number.');
    end if;
    v_acc.primary_phone := v_p1;
  end if;

  if p_secondary_phone is not null then
    v_p2 := right(regexp_replace(p_secondary_phone, '\D', '', 'g'), 10);
    v_acc.secondary_phone := case when length(v_p2) >= 10 then v_p2 else null end;
  end if;

  if p_role is not null and v_sess.role = 'super_admin' and v_acc.role <> 'super_admin' then
    v_acc.role := case when p_role = 'super_admin' then 'super_admin' else 'admin' end;
  end if;

  update public.admin_accounts
  set username = v_acc.username,
      password_hash = v_acc.password_hash,
      primary_phone = v_acc.primary_phone,
      secondary_phone = v_acc.secondary_phone,
      role = v_acc.role
  where id = p_target_id;

  return jsonb_build_object('success', true, 'message', format('Account details updated for ''%s''.', v_acc.username));
end;
$$;

-- 6. Delete Admin Account (Super Admin session required)
create or replace function public.delete_admin_account_rpc(
  p_session_token text,
  p_target_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sess public.admin_sessions%rowtype;
  v_acc public.admin_accounts%rowtype;
begin
  v_sess := public._require_admin_session(p_session_token);
  if v_sess.role <> 'super_admin' then
    return jsonb_build_object('success', false, 'message', 'Only Super Admin can delete admin accounts.');
  end if;

  select * into v_acc from public.admin_accounts where id = p_target_id;
  if not found then
    return jsonb_build_object('success', false, 'message', 'Account not found.');
  end if;
  if v_acc.role = 'super_admin' then
    return jsonb_build_object('success', false, 'message', 'Cannot delete the primary Super Admin account.');
  end if;
  delete from public.admin_accounts where id = p_target_id;
  return jsonb_build_object('success', true, 'message', format('Admin ''%s'' removed.', v_acc.username));
end;
$$;

grant execute on function public.verify_admin_login(text, text, text) to anon, authenticated;
grant execute on function public.logout_admin_session(text) to anon, authenticated;
grant execute on function public.list_admin_accounts(text) to anon, authenticated;
grant execute on function public.create_admin_account_rpc(text, text, text, text, text, text) to anon, authenticated;
grant execute on function public.update_admin_account_rpc(text, text, text, text, text, text, text) to anon, authenticated;
grant execute on function public.delete_admin_account_rpc(text, text) to anon, authenticated;

-- Seed initial Super Admin (REPLACE 'CHANGE_THIS_PASSWORD' before running!)
insert into public.admin_accounts (id, username, password_hash, primary_phone, role)
values ('adm_super_1', 'Himesh Singh', crypt('CHANGE_THIS_PASSWORD', gen_salt('bf')), '7007677139', 'super_admin')
on conflict (id) do nothing;
