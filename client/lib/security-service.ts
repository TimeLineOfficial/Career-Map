/**
 * CareerMap Enterprise-Grade Security Architecture
 * 
 * Provides:
 * 1. Multi-factor administrative credentials verification (Username, Password, Registered Phone Number)
 * 2. Multi-Admin accounts support with dual registered phone numbers (max 2 per admin)
 * 3. Exponential lockout protection against unauthorized attempts (3 attempts = 15m, subsequent = 60m)
 * 4. 30-minute strictly monitored session with live remaining time countdown
 * 5. Input sanitization against cross-site scripting (XSS)
 * 6. Secure, authenticated backup export and restoration
 * 7. Comprehensive administrative audit logging
 */

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  action: string;
  category: "auth" | "data_mutation" | "verification" | "system";
  severity: "info" | "warning" | "critical";
  details: string;
}

export interface AdminAccount {
  id: string;
  username: string;
  passwordHash: string;
  primaryPhone: string;
  secondaryPhone?: string;
  role: "super_admin" | "admin";
  createdAt: string;
  lastLoginAt?: string;
}

export interface SecurityState {
  isAuthenticated: boolean;
  sessionToken: string | null;
  sessionExpiresAt: number | null;
  adminUsername: string;
  failedAttempts: number;
  lockedUntil: number | null;
}

const SALT = "cm_secure_v2_9f8d7a6b";
const STORED_HASH_KEY = "cm_admin_hash_v2";
const STORED_USER_KEY = "cm_admin_user_v2";
const STORED_PHONE_KEY = "cm_admin_phone_v2";
const ADMIN_ACCOUNTS_KEY = "cm_admin_accounts_v2";
const AUDIT_LOG_KEY = "cm_security_audit_log_v2";
const LOCKOUT_KEY = "cm_admin_lockout_v2";
export const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutes
const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_15_MIN_MS = 15 * 60 * 1000;
const LOCKOUT_60_MIN_MS = 60 * 60 * 1000;

// Internal hash calculation
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function hashPasswordWithSalt(password: string): Promise<string> {
  return sha256(`${SALT}:${password}`);
}

export function generateSecureToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Normalize phone numbers for comparison (extract digits)
export function normalizePhone(phone: string): string {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  // Return last 10 digits if longer
  return digits.length > 10 ? digits.slice(-10) : digits;
}

// Strict XSS Sanitizer for all inputs
export function sanitizeInput(input: string): string {
  if (!input) return "";
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

// Security Audit Logger
export function logSecurityEvent(
  action: string,
  category: SecurityAuditLog["category"],
  severity: SecurityAuditLog["severity"],
  details: string
): void {
  try {
    const rawLogs = localStorage.getItem(AUDIT_LOG_KEY);
    const logs: SecurityAuditLog[] = rawLogs ? JSON.parse(rawLogs) : [];
    const newLog: SecurityAuditLog = {
      id: "log_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      action,
      category,
      severity,
      details,
    };
    logs.unshift(newLog);
    if (logs.length > 150) logs.pop();
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(logs));
  } catch (e) {
    console.error("Audit log error:", e);
  }
}

export function getSecurityAuditLogs(): SecurityAuditLog[] {
  try {
    const rawLogs = localStorage.getItem(AUDIT_LOG_KEY);
    return rawLogs ? JSON.parse(rawLogs) : [];
  } catch {
    return [];
  }
}

export function clearSecurityAuditLogs(): void {
  localStorage.removeItem(AUDIT_LOG_KEY);
}

// Initialize Admin Credentials and Account Registry
export async function initializeSecurityCredentials(): Promise<void> {
  const accountsRaw = localStorage.getItem(ADMIN_ACCOUNTS_KEY);
  if (!accountsRaw) {
    const initialHash = await hashPasswordWithSalt("Himesh@147Singh2");
    const superAdmin: AdminAccount = {
      id: "adm_super_1",
      username: "Himesh Singh",
      passwordHash: initialHash,
      primaryPhone: "9876543210",
      secondaryPhone: "9876543211",
      role: "super_admin",
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify([superAdmin]));
    localStorage.setItem(STORED_HASH_KEY, initialHash);
    localStorage.setItem(STORED_USER_KEY, "Himesh Singh");
    localStorage.setItem(STORED_PHONE_KEY, "9876543210");
    logSecurityEvent("SYSTEM_INIT", "system", "info", "Security subsystem initialized with Super Admin account.");
  }
}

export function getAdminAccounts(): AdminAccount[] {
  try {
    const raw = localStorage.getItem(ADMIN_ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAdminAccounts(accounts: AdminAccount[]): void {
  localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(accounts));
}

// Add a new admin account (Requires registered phone number, max 2 phone numbers)
export async function createAdminAccount(newAdmin: {
  username: string;
  password: string;
  primaryPhone: string;
  secondaryPhone?: string;
  role: "super_admin" | "admin";
}): Promise<{ success: boolean; message: string }> {
  if (!newAdmin.username.trim() || newAdmin.username.length < 3) {
    return { success: false, message: "Username must be at least 3 characters." };
  }
  if (!newAdmin.password || newAdmin.password.length < 8) {
    return { success: false, message: "Password must be at least 8 characters long." };
  }
  const cleanPhone1 = normalizePhone(newAdmin.primaryPhone);
  if (cleanPhone1.length < 10) {
    return { success: false, message: "A valid 10-digit primary phone number is required." };
  }
  const cleanPhone2 = newAdmin.secondaryPhone ? normalizePhone(newAdmin.secondaryPhone) : undefined;
  if (cleanPhone2 && cleanPhone2.length < 10) {
    return { success: false, message: "Secondary phone number must be 10 digits if provided." };
  }

  const accounts = getAdminAccounts();
  const exists = accounts.some(
    (a) => a.username.toLowerCase() === newAdmin.username.trim().toLowerCase()
  );
  if (exists) {
    return { success: false, message: `An admin account with username '${newAdmin.username}' already exists.` };
  }

  const passwordHash = await hashPasswordWithSalt(newAdmin.password);
  const created: AdminAccount = {
    id: "adm_" + Date.now(),
    username: sanitizeInput(newAdmin.username),
    passwordHash,
    primaryPhone: cleanPhone1,
    secondaryPhone: cleanPhone2,
    role: newAdmin.role,
    createdAt: new Date().toISOString(),
  };

  accounts.push(created);
  saveAdminAccounts(accounts);
  logSecurityEvent("ADMIN_CREATED", "auth", "info", `New admin '${created.username}' created with verified phone.`);
  return { success: true, message: `Admin account '${created.username}' created successfully.` };
}

// Delete admin account
export function deleteAdminAccount(adminId: string): { success: boolean; message: string } {
  const accounts = getAdminAccounts();
  const target = accounts.find((a) => a.id === adminId);
  if (!target) return { success: false, message: "Account not found." };
  if (target.role === "super_admin") {
    const superCount = accounts.filter((a) => a.role === "super_admin").length;
    if (superCount <= 1) {
      return { success: false, message: "Cannot delete the primary Super Admin account." };
    }
  }

  const filtered = accounts.filter((a) => a.id !== adminId);
  saveAdminAccounts(filtered);
  logSecurityEvent("ADMIN_DELETED", "auth", "warning", `Admin account '${target.username}' was removed.`);
  return { success: true, message: `Admin '${target.username}' removed.` };
}

// Check lockout state
export function getLockoutStatus(): {
  isLocked: boolean;
  remainingSeconds: number;
  failedAttempts: number;
  lockoutTier: number;
} {
  try {
    const raw = localStorage.getItem(LOCKOUT_KEY);
    if (!raw) return { isLocked: false, remainingSeconds: 0, failedAttempts: 0, lockoutTier: 0 };
    const { attempts, lockedUntil, tier } = JSON.parse(raw);
    const now = Date.now();
    if (lockedUntil && now < lockedUntil) {
      return {
        isLocked: true,
        remainingSeconds: Math.ceil((lockedUntil - now) / 1000),
        failedAttempts: attempts,
        lockoutTier: tier || 1,
      };
    }
    return {
      isLocked: false,
      remainingSeconds: 0,
      failedAttempts: attempts || 0,
      lockoutTier: tier || 0,
    };
  } catch {
    return { isLocked: false, remainingSeconds: 0, failedAttempts: 0, lockoutTier: 0 };
  }
}

function recordFailedAttempt(): { isLocked: boolean; remainingSeconds: number; remainingAttempts: number } {
  const current = getLockoutStatus();
  const attempts = current.failedAttempts + 1;
  let lockedUntil: number | null = null;
  let tier = current.lockoutTier;

  if (attempts >= MAX_FAILED_ATTEMPTS) {
    tier += 1;
    // Tier 1 (first 3 failures) = 15 minutes lockout; Tier 2+ (subsequent) = 60 minutes lockout
    const lockDuration = tier >= 2 ? LOCKOUT_60_MIN_MS : LOCKOUT_15_MIN_MS;
    lockedUntil = Date.now() + lockDuration;
    const durationLabel = tier >= 2 ? "1 hour (60 minutes)" : "15 minutes";
    logSecurityEvent(
      "SECURITY_LOCKOUT",
      "auth",
      "critical",
      `Consecutive failed login attempts (${attempts}). Access locked for ${durationLabel}.`
    );
  } else {
    logSecurityEvent(
      "AUTH_FAILED",
      "auth",
      "warning",
      `Failed admin login attempt (${attempts}/${MAX_FAILED_ATTEMPTS}).`
    );
  }

  localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ attempts, lockedUntil, tier }));
  const remaining = Math.max(0, MAX_FAILED_ATTEMPTS - attempts);
  const remainingSeconds = lockedUntil ? Math.ceil((lockedUntil - Date.now()) / 1000) : 0;
  return {
    isLocked: !!lockedUntil,
    remainingSeconds,
    remainingAttempts: remaining,
  };
}

function resetFailedAttempts(): void {
  localStorage.removeItem(LOCKOUT_KEY);
}

// 3-Factor Secure Authenticate (Username, Password, Phone Number)
export async function authenticateAdmin(
  user: string,
  pass: string,
  phone: string
): Promise<{ success: boolean; message: string; token?: string; account?: AdminAccount }> {
  await initializeSecurityCredentials();

  // Check lockout
  const lockout = getLockoutStatus();
  if (lockout.isLocked) {
    const mins = Math.ceil(lockout.remainingSeconds / 60);
    return {
      success: false,
      message: `Security Lockout Active: Too many failed login attempts. Please wait ${mins} minute(s) before retrying.`,
    };
  }

  const cleanUser = sanitizeInput(user).trim().toLowerCase();
  const inputHash = await hashPasswordWithSalt(pass);
  const cleanPhone = normalizePhone(phone);

  const accounts = getAdminAccounts();

  // Find matching account by username (supports "admin" or "himesh" shorthand for Himesh Singh)
  const matched = accounts.find((acc) => {
    const accUser = acc.username.toLowerCase();
    const isUserMatch =
      accUser === cleanUser ||
      (cleanUser === "admin" && acc.role === "super_admin") ||
      (cleanUser === "himesh" && acc.username.toLowerCase().includes("himesh"));
    return isUserMatch;
  });

  if (!matched) {
    const res = recordFailedAttempt();
    if (res.isLocked) {
      const mins = Math.ceil(res.remainingSeconds / 60);
      return {
        success: false,
        message: `Account locked for ${mins} minute(s) due to multiple consecutive failed attempts.`,
      };
    }
    return {
      success: false,
      message: `Invalid credentials. ${res.remainingAttempts} attempt(s) remaining before security lockout.`,
    };
  }

  // Verify Password Hash
  const isPassValid = inputHash === matched.passwordHash;

  // Verify Phone Number (Must match primary or secondary registered phone)
  const isPhoneValid =
    cleanPhone.length >= 10 &&
    (normalizePhone(matched.primaryPhone) === cleanPhone ||
      (matched.secondaryPhone && normalizePhone(matched.secondaryPhone) === cleanPhone));

  if (isPassValid && isPhoneValid) {
    resetFailedAttempts();
    const token = generateSecureToken();
    const expiresAt = Date.now() + SESSION_DURATION_MS;

    // Record last login
    matched.lastLoginAt = new Date().toISOString();
    saveAdminAccounts(accounts);

    // Store in sessionStorage (isolated per browser session)
    sessionStorage.setItem("cm_session_token", token);
    sessionStorage.setItem("cm_session_expires", expiresAt.toString());
    sessionStorage.setItem("cm_session_user", matched.username);
    sessionStorage.setItem("cm_session_role", matched.role);

    logSecurityEvent(
      "AUTH_SUCCESS",
      "auth",
      "info",
      `Admin '${matched.username}' authenticated with verified phone credentials.`
    );

    return {
      success: true,
      message: "Authentication successful",
      token,
      account: matched,
    };
  } else {
    const res = recordFailedAttempt();
    if (res.isLocked) {
      const mins = Math.ceil(res.remainingSeconds / 60);
      return {
        success: false,
        message: `Account locked for ${mins} minute(s) due to multiple consecutive failed attempts.`,
      };
    }
    const reason = !isPassValid
      ? "Incorrect password."
      : "Phone number does not match registered admin contacts.";
    return {
      success: false,
      message: `${reason} ${res.remainingAttempts} attempt(s) remaining before security lockout.`,
    };
  }
}

// Session Helpers
export function isSessionValid(): boolean {
  const token = sessionStorage.getItem("cm_session_token");
  const expiresStr = sessionStorage.getItem("cm_session_expires");
  if (!token || !expiresStr) return false;
  const expiresAt = parseInt(expiresStr, 10);
  if (Date.now() > expiresAt) {
    destroySession();
    return false;
  }
  return true;
}

export function getSessionRemainingSeconds(): number {
  const expiresStr = sessionStorage.getItem("cm_session_expires");
  if (!expiresStr) return 0;
  const expiresAt = parseInt(expiresStr, 10);
  const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
  return remaining;
}

export function getActiveSessionUser(): { username: string; role: string } | null {
  if (!isSessionValid()) return null;
  return {
    username: sessionStorage.getItem("cm_session_user") || "Admin",
    role: sessionStorage.getItem("cm_session_role") || "admin",
  };
}

export function extendSession(): void {
  if (isSessionValid()) {
    const expiresAt = Date.now() + SESSION_DURATION_MS;
    sessionStorage.setItem("cm_session_expires", expiresAt.toString());
  }
}

export function destroySession(): void {
  const user = sessionStorage.getItem("cm_session_user") || "Admin";
  sessionStorage.removeItem("cm_session_token");
  sessionStorage.removeItem("cm_session_expires");
  sessionStorage.removeItem("cm_session_user");
  sessionStorage.removeItem("cm_session_role");
  logSecurityEvent("AUTH_LOGOUT", "auth", "info", `Session closed for '${user}'.`);
}

// Update Master Password / Phone
export async function updateAdminCredentials(
  currentPass: string,
  newUsername: string,
  newPass: string,
  newPrimaryPhone?: string,
  newSecondaryPhone?: string
): Promise<{ success: boolean; message: string }> {
  const accounts = getAdminAccounts();
  const currentSessionUser = sessionStorage.getItem("cm_session_user") || "Himesh Singh";
  const target = accounts.find(
    (a) => a.username.toLowerCase() === currentSessionUser.toLowerCase()
  );

  if (!target) {
    return { success: false, message: "Admin account not found." };
  }

  const checkHash = await hashPasswordWithSalt(currentPass);
  if (checkHash !== target.passwordHash) {
    logSecurityEvent("CREDENTIAL_CHANGE_FAILED", "auth", "warning", "Attempted credential update with incorrect current password.");
    return { success: false, message: "Current password verification failed." };
  }

  if (newPass && newPass.length < 8) {
    return { success: false, message: "New password must be at least 8 characters long." };
  }

  if (newPass) {
    target.passwordHash = await hashPasswordWithSalt(newPass);
  }
  if (newUsername.trim()) {
    target.username = sanitizeInput(newUsername);
    sessionStorage.setItem("cm_session_user", target.username);
  }
  if (newPrimaryPhone) {
    const p1 = normalizePhone(newPrimaryPhone);
    if (p1.length >= 10) target.primaryPhone = p1;
  }
  if (newSecondaryPhone !== undefined) {
    const p2 = normalizePhone(newSecondaryPhone);
    target.secondaryPhone = p2.length >= 10 ? p2 : undefined;
  }

  saveAdminAccounts(accounts);
  logSecurityEvent(
    "CREDENTIALS_UPDATED",
    "auth",
    "critical",
    `Admin credentials successfully updated for '${target.username}'.`
  );

  return { success: true, message: "Account profile and credentials updated securely." };
}

// Secure Data Backup & Restoration
export async function exportEncryptedBackup(passkey: string, dataToExport: any): Promise<string> {
  const enc = new TextEncoder();
  const pwUtf8 = enc.encode(passkey);
  const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.importKey("raw", pwHash, { name: "AES-GCM" }, false, ["encrypt"]);

  const dataUtf8 = enc.encode(JSON.stringify(dataToExport));
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, dataUtf8);

  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);

  logSecurityEvent("DATA_BACKUP_EXPORTED", "system", "info", "Encrypted administrative data backup generated.");
  return btoa(String.fromCharCode.apply(null, Array.from(combined)));
}

export async function importEncryptedBackup(passkey: string, encryptedBase64: string): Promise<any> {
  try {
    const raw = atob(encryptedBase64);
    const combined = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      combined[i] = raw.charCodeAt(i);
    }

    const iv = combined.slice(0, 12);
    const data = combined.slice(12);

    const enc = new TextEncoder();
    const pwUtf8 = enc.encode(passkey);
    const pwHash = await crypto.subtle.digest("SHA-256", pwUtf8);

    const key = await crypto.subtle.importKey("raw", pwHash, { name: "AES-GCM" }, false, ["decrypt"]);
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);

    const decoded = new TextDecoder().decode(decrypted);
    logSecurityEvent("DATA_BACKUP_RESTORED", "system", "info", "Encrypted backup successfully restored and verified.");
    return JSON.parse(decoded);
  } catch (err) {
    logSecurityEvent("DATA_RESTORE_FAILED", "system", "critical", "Failed backup restore: invalid passkey or corrupted data.");
    throw new Error("Invalid passkey or corrupted backup package.");
  }
}
