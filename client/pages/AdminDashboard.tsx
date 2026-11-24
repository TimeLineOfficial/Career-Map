import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  ShieldCheck,
  AlertTriangle,
  Building,
  School,
  FileCheck,
  Users,
  CheckCircle2,
  XCircle,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  LogOut,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  Clock,
  UserPlus,
  ShieldAlert,
  MapPin,
} from "lucide-react";
import {
  Institute,
  loadInstitutes,
  saveInstitutes,
  StudentPlacementRecord,
  getPlacementVerificationRequests,
  updatePlacementVerificationRequestStatus,
  getOnSiteAuditRequests,
  updateOnSiteAuditStatus,
  getNewInstituteRequests,
  approveNewInstituteRequest,
  getDirectStudentApplications,
  updateInstitute,
  deleteInstitute,
} from "@/lib/institutes-dataset";
import {
  authenticateAdmin,
  isSessionValid,
  destroySession,
  getLockoutStatus,
  getSecurityAuditLogs,
  clearSecurityAuditLogs,
  updateAdminCredentials,
  exportEncryptedBackup,
  importEncryptedBackup,
  logSecurityEvent,
  getSessionRemainingSeconds,
  getAdminAccounts,
  createAdminAccount,
  deleteAdminAccount,
  AdminAccount,
} from "@/lib/security-service";
import InstituteEditorModal from "@/components/admin/InstituteEditorModal";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { toast } = useToast();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [authError, setAuthError] = useState("");
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const [sessionSecondsRemaining, setSessionSecondsRemaining] = useState(1800);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState("overview");

  // Data Stores
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [verificationRequests, setVerificationRequests] = useState(getPlacementVerificationRequests());
  const [auditRequests, setAuditRequests] = useState(getOnSiteAuditRequests());
  const [newInstRequests, setNewInstRequests] = useState(getNewInstituteRequests());
  const [studentApplications, setStudentApplications] = useState(getDirectStudentApplications());
  const [auditLogs, setAuditLogs] = useState(getSecurityAuditLogs());
  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>([]);

  // Institute Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingInstitute, setEditingInstitute] = useState<Institute | null>(null);

  // New Student Record Modal State
  const [selectedInstForStudents, setSelectedInstForStudents] = useState<string>("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentCompany, setNewStudentCompany] = useState("");
  const [newStudentPackage, setNewStudentPackage] = useState(10);
  const [newStudentRole, setNewStudentRole] = useState("Software Engineer");
  const [newStudentVerified, setNewStudentVerified] = useState(true);

  // Password / Profile Change State
  const [currentPass, setCurrentPass] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPhone1, setNewPhone1] = useState("");
  const [newPhone2, setNewPhone2] = useState("");

  // New Admin Account Creation State
  const [addAdminUser, setAddAdminUser] = useState("");
  const [addAdminPass, setAddAdminPass] = useState("");
  const [addAdminPhone1, setAddAdminPhone1] = useState("");
  const [addAdminPhone2, setAddAdminPhone2] = useState("");
  const [addAdminRole, setAddAdminRole] = useState<"admin" | "super_admin">("admin");

  // Backup passkey
  const [backupPasskey, setBackupPasskey] = useState("");
  const [importCipher, setImportCipher] = useState("");

  // Check existing session on load
  useEffect(() => {
    if (isSessionValid()) {
      setIsAuthenticated(true);
      loadAllData();
    }

    const interval = setInterval(() => {
      // 1. Lockout check
      const lock = getLockoutStatus();
      setLockoutRemaining(lock.isLocked ? lock.remainingSeconds : 0);

      // 2. Session countdown check
      if (isSessionValid()) {
        const remaining = getSessionRemainingSeconds();
        setSessionSecondsRemaining(remaining);
        if (remaining <= 0) {
          // Auto-logout cleanly
          destroySession();
          setIsAuthenticated(false);
          toast({
            title: "Session Expired",
            description: "Your 30-minute session has ended. Please log in again to continue.",
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const loadAllData = () => {
    setInstitutes(loadInstitutes());
    setVerificationRequests(getPlacementVerificationRequests());
    setAuditRequests(getOnSiteAuditRequests());
    setNewInstRequests(getNewInstituteRequests());
    setStudentApplications(getDirectStudentApplications());
    setAuditLogs(getSecurityAuditLogs());
    setAdminAccounts(getAdminAccounts());
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!username.trim() || !password.trim() || !phone.trim()) {
      setAuthError("All 3 fields (Username, Password, Phone Number) are required.");
      return;
    }

    const res = await authenticateAdmin(username, password, phone);
    if (res.success) {
      setIsAuthenticated(true);
      loadAllData();
      toast({
        title: "Admin Access Granted",
        description: `Welcome back, ${res.account?.username || "Admin"}. 30-minute session active.`,
      });
    } else {
      setAuthError(res.message);
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: res.message,
      });
    }
  };

  const handleLogout = () => {
    destroySession();
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setPhone("");
    toast({
      title: "Logged Out",
      description: "Admin session closed cleanly.",
    });
  };

  // Open Full Editor for an existing institute
  const handleOpenEditInstitute = (inst: Institute) => {
    setEditingInstitute(inst);
    setIsEditorOpen(true);
  };

  // Open Full Editor for creating a new institute
  const handleOpenCreateInstitute = () => {
    setEditingInstitute(null);
    setIsEditorOpen(true);
  };

  // Save Institute from Editor
  const handleSaveInstituteFromEditor = (savedInst: Institute) => {
    const existingIndex = institutes.findIndex((i) => i.id === savedInst.id);
    let updated: Institute[];
    if (existingIndex !== -1) {
      updated = [...institutes];
      updated[existingIndex] = savedInst;
      toast({
        title: "Institute Updated",
        description: `Profile for ${savedInst.name} successfully saved.`,
      });
    } else {
      updated = [savedInst, ...institutes];
      toast({
        title: "Institute Added",
        description: `${savedInst.name} added to the directory.`,
      });
    }

    setInstitutes(updated);
    saveInstitutes(updated);
  };

  // 1-Click Verification Toggle for Placement
  const handleTogglePlacementStatus = (instId: string) => {
    const updated = institutes.map((i) => {
      if (i.id === instId) {
        const nextStatus = i.placement.status === "verified" ? "unverified" : "verified";
        logSecurityEvent(
          "PLACEMENT_STATUS_MODIFIED",
          "data_mutation",
          "warning",
          `Admin toggled placement verification for ${i.name} to ${nextStatus}`
        );
        return {
          ...i,
          placement: {
            ...i.placement,
            status: nextStatus as any,
            badgeNotice:
              nextStatus === "verified"
                ? "Verified Placement: Formally cross-verified directly with hiring employers."
                : "⚠️ Unverified Placement: Self-reported institution claim.",
          },
        };
      }
      return i;
    });
    setInstitutes(updated);
    saveInstitutes(updated);
    toast({
      title: "Placement Status Updated",
      description: "Status successfully updated in directory.",
    });
  };

  // 1-Click Verification Toggle for Audit
  const handleToggleAuditStatus = (instId: string) => {
    const updated = institutes.map((i) => {
      if (i.id === instId) {
        const nextStatus = i.audit.status === "verified" ? "unverified" : "verified";
        logSecurityEvent(
          "AUDIT_STATUS_MODIFIED",
          "data_mutation",
          "warning",
          `Admin toggled campus audit verification for ${i.name} to ${nextStatus}`
        );
        return {
          ...i,
          audit: {
            ...i.audit,
            status: nextStatus as any,
            lastAuditDate: nextStatus === "verified" ? new Date().toISOString().split("T")[0] : undefined,
            badgeNotice:
              nextStatus === "verified"
                ? "Verified On-Site Campus Audit: Physical verification and student sampling completed."
                : "⚠️ Pending Audit: Formal on-site verification pending.",
          },
        };
      }
      return i;
    });
    setInstitutes(updated);
    saveInstitutes(updated);
    toast({
      title: "Campus Audit Status Updated",
      description: "Audit status successfully updated in directory.",
    });
  };

  // Delete Institute
  const handleDeleteInstitute = (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete '${name}' from CareerMap?`)) {
      return;
    }
    deleteInstitute(id);
    const filtered = institutes.filter((i) => i.id !== id);
    setInstitutes(filtered);
    toast({
      title: "Institute Removed",
      description: `${name} has been removed from directory.`,
    });
  };

  // Add Student Placement Record
  const handleAddStudentRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInstForStudents || !newStudentName || !newStudentCompany) return;

    const newRecord: StudentPlacementRecord = {
      id: "st_" + Date.now(),
      studentName: newStudentName,
      company: newStudentCompany,
      packageLPA: Number(newStudentPackage),
      year: new Date().getFullYear(),
      role: newStudentRole,
      verified: newStudentVerified,
      verificationSource: newStudentVerified
        ? "Verified via Corporate HR Confirmation"
        : "Pending Corporate Cross-Verification",
    };

    const updated = institutes.map((inst) => {
      if (inst.id === selectedInstForStudents) {
        return {
          ...inst,
          placement: {
            ...inst.placement,
            students: [newRecord, ...inst.placement.students],
          },
        };
      }
      return inst;
    });

    setInstitutes(updated);
    saveInstitutes(updated);
    logSecurityEvent(
      "STUDENT_RECORD_ADDED",
      "data_mutation",
      "info",
      `Student record for ${newStudentName} at ${newStudentCompany} added to ${selectedInstForStudents}`
    );

    setNewStudentName("");
    setNewStudentCompany("");
    toast({
      title: "Student Record Added",
      description: `Added ${newStudentName} (${newStudentCompany}, ₹${newStudentPackage} LPA)`,
    });
  };

  // Approve New Institute Request
  const handleApproveNewInstitute = (requestId: string) => {
    const created = approveNewInstituteRequest(requestId);
    if (created) {
      loadAllData();
      toast({
        title: "Institute Published",
        description: `'${created.name}' has been added to CareerMap directory.`,
      });
    }
  };

  // Change Credentials
  const handleChangeCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateAdminCredentials(currentPass, newUsername, newPass, newPhone1, newPhone2);
    if (res.success) {
      toast({
        title: "Profile Updated",
        description: res.message,
      });
      setCurrentPass("");
      setNewPass("");
      loadAllData();
    } else {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: res.message,
      });
    }
  };

  // Create New Admin Account
  const handleCreateNewAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createAdminAccount({
      username: addAdminUser,
      password: addAdminPass,
      primaryPhone: addAdminPhone1,
      secondaryPhone: addAdminPhone2 || undefined,
      role: addAdminRole,
    });

    if (res.success) {
      toast({
        title: "Admin Account Created",
        description: res.message,
      });
      setAddAdminUser("");
      setAddAdminPass("");
      setAddAdminPhone1("");
      setAddAdminPhone2("");
      loadAllData();
    } else {
      toast({
        variant: "destructive",
        title: "Creation Failed",
        description: res.message,
      });
    }
  };

  // Remove Admin Account
  const handleDeleteAdmin = (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete admin account '${name}'?`)) return;
    const res = deleteAdminAccount(id);
    if (res.success) {
      toast({ title: "Admin Deleted", description: res.message });
      loadAllData();
    } else {
      toast({ variant: "destructive", title: "Action Blocked", description: res.message });
    }
  };

  // Export Encrypted Backup
  const handleExportBackup = async () => {
    if (!backupPasskey) {
      alert("Please enter a passkey to secure your backup.");
      return;
    }
    const fullState = {
      institutes,
      verificationRequests,
      auditRequests,
      newInstRequests,
      studentApplications,
      timestamp: new Date().toISOString(),
    };
    const b64 = await exportEncryptedBackup(backupPasskey, fullState);
    const blob = new Blob([b64], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `careermap_backup_${new Date().toISOString().split("T")[0]}.enc`;
    a.click();
    toast({
      title: "Encrypted Backup Saved",
      description: "Data backup file securely generated and downloaded.",
    });
  };

  // Import Encrypted Backup
  const handleImportBackup = async () => {
    if (!backupPasskey || !importCipher) {
      alert("Please provide the passkey and backup ciphertext.");
      return;
    }
    try {
      const data = await importEncryptedBackup(backupPasskey, importCipher);
      if (data && data.institutes) {
        saveInstitutes(data.institutes);
        loadAllData();
        toast({
          title: "Backup Restored Successfully",
          description: `Restored ${data.institutes.length} institutions and requests.`,
        });
        setImportCipher("");
      }
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Restore Failed",
        description: e.message || "Invalid passkey or corrupted data.",
      });
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  // ==========================================
  // LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border border-slate-700 bg-slate-900/90 backdrop-blur-xl shadow-2xl text-white">
          <CardHeader className="text-center space-y-2 pb-4">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-black tracking-tight text-white">
              CareerMap Admin Console
            </CardTitle>
            <CardDescription className="text-xs text-slate-300">
              Multi-Factor Verified Management Portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lockoutRemaining > 0 ? (
              <div className="p-4 bg-red-950/70 border border-red-800 rounded-xl text-center space-y-2">
                <AlertTriangle className="h-7 w-7 text-red-400 mx-auto" />
                <div className="font-bold text-sm text-red-200">Security Lockout Active</div>
                <p className="text-xs text-red-300">
                  Multiple consecutive incorrect attempts detected. Access is temporarily locked.
                </p>
                <div className="text-xs font-mono font-bold text-amber-300 bg-black/40 py-1.5 px-3 rounded-lg inline-block">
                  Time Remaining: {formatTimer(lockoutRemaining)}
                </div>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                {authError && (
                  <div className="p-2.5 bg-red-950/60 border border-red-800 rounded-lg text-red-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <div>
                  <Label htmlFor="adminUser" className="text-slate-300 font-semibold">Admin Username</Label>
                  <Input
                    id="adminUser"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your admin username"
                    className="mt-1 bg-slate-800/80 border-slate-700 text-white text-xs"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="adminPass" className="text-slate-300 font-semibold">Password</Label>
                  <Input
                    id="adminPass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="mt-1 bg-slate-800/80 border-slate-700 text-white text-xs"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="adminPhone" className="text-slate-300 font-semibold flex items-center justify-between">
                    <span>Registered Phone Number</span>
                    <span className="text-[10px] text-slate-400">10 digits</span>
                  </Label>
                  <Input
                    id="adminPhone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter registered 10-digit mobile number"
                    className="mt-1 bg-slate-800/80 border-slate-700 text-white text-xs"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs py-2 shadow-lg shadow-blue-600/30"
                >
                  <KeyRound className="h-4 w-4 mr-1.5" />
                  Verify Credentials & Open Panel
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      {/* Top Admin Header Bar */}
      <header className="bg-slate-950 border-b border-slate-800 py-3.5 px-6 sticky top-0 z-30 shadow-md">
        <div className="container max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                CareerMap Admin Backend
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[10px]">
                  Verified Session
                </Badge>
              </h1>
              <p className="text-xs text-slate-400">
                Support Desk: <strong className="text-slate-200">career.mapofficials@gmail.com</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* 30-Minute Session Countdown Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-amber-300">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              <span>Session: {formatTimer(sessionSecondsRemaining)}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-xs border-slate-700 text-slate-300 hover:bg-slate-800 gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <main className="container max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 bg-slate-950 p-1 border border-slate-800 text-xs">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="directory">Directory ({institutes.length})</TabsTrigger>
            <TabsTrigger value="verification">Verification ({verificationRequests.filter((r) => r.status === "pending").length})</TabsTrigger>
            <TabsTrigger value="audits">Audits ({auditRequests.filter((r) => r.status === "pending_review").length})</TabsTrigger>
            <TabsTrigger value="new_inst">New Requests ({newInstRequests.filter((r) => r.status === "pending").length})</TabsTrigger>
            <TabsTrigger value="student_apps">Inquiries ({studentApplications.length})</TabsTrigger>
            <TabsTrigger value="security_settings">Security & Admins</TabsTrigger>
          </TabsList>

          {/* TAB 1: OVERVIEW */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-slate-950 border-slate-800 text-white">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs text-slate-400">Total Institutions Mapped</CardDescription>
                  <CardTitle className="text-3xl font-extrabold text-blue-400">{institutes.length}</CardTitle>
                </CardHeader>
                <CardContent className="text-[11px] text-slate-400">
                  {institutes.filter((i) => i.type === "college").length} Colleges • {institutes.filter((i) => i.type === "school").length} Schools
                </CardContent>
              </Card>

              <Card className="bg-slate-950 border-slate-800 text-white">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs text-slate-400">Verified Placements</CardDescription>
                  <CardTitle className="text-3xl font-extrabold text-emerald-400">
                    {institutes.filter((i) => i.placement.status === "verified").length}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-[11px] text-slate-400">
                  {institutes.filter((i) => i.placement.status === "unverified").length} Pending employer cross-check
                </CardContent>
              </Card>

              <Card className="bg-slate-950 border-slate-800 text-white">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs text-slate-400">Verified Campus Audits</CardDescription>
                  <CardTitle className="text-3xl font-extrabold text-purple-400">
                    {institutes.filter((i) => i.audit.status === "verified").length}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-[11px] text-slate-400">
                  {auditRequests.length} On-site inspection bookings
                </CardContent>
              </Card>

              <Card className="bg-slate-950 border-slate-800 text-white">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs text-slate-400">Student Inquiries</CardDescription>
                  <CardTitle className="text-3xl font-extrabold text-amber-400">{studentApplications.length}</CardTitle>
                </CardHeader>
                <CardContent className="text-[11px] text-slate-400">Direct admission submissions</CardContent>
              </Card>
            </div>

            {/* Quick Actions Panel */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-slate-950 border-slate-800 text-white p-5 space-y-3">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Building className="h-4 w-4 text-blue-400" /> Institution Profiles Management
                </h3>
                <p className="text-xs text-slate-400">
                  Add new schools and colleges, or edit photos, ratings out of 10, fees, ownership tags, and seat capacity.
                </p>
                <Button
                  onClick={handleOpenCreateInstitute}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-2"
                >
                  <Plus className="h-4 w-4" /> Add New School / College
                </Button>
              </Card>

              <Card className="bg-slate-950 border-slate-800 text-white p-5 space-y-3">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Users className="h-4 w-4 text-emerald-400" /> Admin Accounts & Phones
                </h3>
                <p className="text-xs text-slate-400">
                  {adminAccounts.length} authorized administrative account(s) registered with dual phone number verification.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("security_settings")}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold gap-2"
                >
                  <Lock className="h-4 w-4" /> Manage Admin Accounts
                </Button>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 2: DIRECTORY WITH FULL EDITING FREEDOM */}
          <TabsContent value="directory" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-white">Live Schools & Colleges Directory</h3>
                <p className="text-xs text-slate-400">Full editing freedom: edit wallpaper, photos, ratings out of 10, fees, pros & cons.</p>
              </div>
              <Button
                size="sm"
                onClick={handleOpenCreateInstitute}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1.5"
              >
                <Plus className="h-4 w-4" /> Add School / College
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {institutes.map((inst) => (
                <Card key={inst.id} className="bg-slate-950 border-slate-800 text-white flex flex-col justify-between">
                  <CardHeader className="p-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Badge variant="outline" className="text-[10px] uppercase border-slate-700 text-slate-300">
                          {inst.type}
                        </Badge>
                        <Badge className={`text-[10px] ${inst.institutionCategory === "government" ? "bg-blue-500/20 text-blue-300 border-blue-500/40" : "bg-purple-500/20 text-purple-300 border-purple-500/40"}`}>
                          {inst.institutionCategory === "government" ? "Government" : "Private"}
                        </Badge>
                        <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-[10px] uppercase">
                          {inst.ownershipType?.replace("_", " ")}
                        </Badge>
                      </div>
                      <span className="text-xs font-bold text-amber-400">⭐ {inst.ratings.overall} / 10.0</span>
                    </div>

                    <CardTitle className="text-sm font-bold text-white line-clamp-1">
                      {inst.name}
                    </CardTitle>
                    <CardDescription className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-500" />
                      {inst.location.city}, {inst.location.state} • Est. {inst.establishedYear}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="text-[11px] grid grid-cols-2 gap-2 text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      <div>Students: <strong className="text-white">{inst.totalStudentsEnrolled?.toLocaleString() || "N/A"}</strong></div>
                      <div>Seats: <strong className="text-white">{inst.seatMatrix?.availableSeats || "N/A"} / {inst.seatMatrix?.totalSeats || "N/A"}</strong></div>
                      <div>Tuition: <strong className="text-emerald-400">₹{inst.feeStructure.tuitionPerYear.toLocaleString("en-IN")}</strong></div>
                      <div>Photos: <strong className="text-white">{inst.photos?.length || 0}</strong></div>
                    </div>

                    {/* Verification Status Badges & 1-Click Toggles */}
                    <div className="space-y-1.5 pt-1">
                      {inst.type !== "school" && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[11px] text-slate-400">Placement Status:</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleTogglePlacementStatus(inst.id)}
                            className={`h-6 text-[10px] px-2 font-bold ${
                              inst.placement.status === "verified"
                                ? "bg-emerald-950/60 text-emerald-300 border border-emerald-700"
                                : "bg-amber-950/60 text-amber-300 border border-amber-700"
                            }`}
                          >
                            {inst.placement.status === "verified" ? "✓ Verified" : "⚠️ Unverified"}
                          </Button>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-400">Campus Audit:</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleAuditStatus(inst.id)}
                          className={`h-6 text-[10px] px-2 font-bold ${
                            inst.audit.status === "verified"
                              ? "bg-purple-950/60 text-purple-300 border border-purple-700"
                              : "bg-slate-800 text-slate-400 border border-slate-700"
                          }`}
                        >
                          {inst.audit.status === "verified" ? "✓ Audited" : "⚠️ Pending"}
                        </Button>
                      </div>
                    </div>

                    {/* Actions: Edit & Delete */}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                      <Button
                        size="sm"
                        onClick={() => handleOpenEditInstitute(inst)}
                        className="h-7 text-xs bg-indigo-600 hover:bg-indigo-700 text-white gap-1"
                      >
                        <Edit className="h-3.5 w-3.5" /> Edit Full Details
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteInstitute(inst.id, inst.name)}
                        className="h-7 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 p-1.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB 3: VERIFICATION REQUESTS */}
          <TabsContent value="verification" className="space-y-4">
            <div>
              <h3 className="font-bold text-base text-white">Corporate Placement Verification Queue</h3>
              <p className="text-xs text-slate-400">
                Official Verification Email: <strong className="text-blue-400">career.mapofficials@gmail.com</strong>
              </p>
            </div>

            {verificationRequests.length === 0 ? (
              <p className="text-slate-500 py-8 text-center text-xs">No verification requests submitted yet.</p>
            ) : (
              <div className="space-y-3">
                {verificationRequests.map((req) => (
                  <Card key={req.id} className="bg-slate-950 border-slate-800 text-white">
                    <CardContent className="p-4 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-blue-300">{req.instituteName}</span>
                        <Badge className={`text-[10px] ${req.status === "verified" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                          {req.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 text-[11px]">
                        <div>Contact Person: <strong className="text-slate-200">{req.contactPerson}</strong></div>
                        <div>Official Email: <strong className="text-slate-200">{req.officialEmail}</strong></div>
                        <div>Phone: <strong className="text-slate-200">{req.phone}</strong></div>
                        <div>WhatsApp: <strong className="text-slate-200">{req.whatsapp}</strong></div>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                        <strong>Companies to Contact:</strong> {req.companyContactDetails || "Standard recruiter list provided"}
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            updatePlacementVerificationRequestStatus(req.id, "verified");
                            loadAllData();
                            toast({ title: "Request Marked Verified" });
                          }}
                          className="text-[10px] h-6 bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          Mark Verified
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            updatePlacementVerificationRequestStatus(req.id, "rejected");
                            loadAllData();
                            toast({ title: "Request Rejected" });
                          }}
                          className="text-[10px] h-6 border-slate-700 text-slate-300"
                        >
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 4: AUDIT REQUESTS */}
          <TabsContent value="audits" className="space-y-4">
            <div>
              <h3 className="font-bold text-base text-white">On-Site Campus Inspection Bookings</h3>
              <p className="text-xs text-slate-400">Formal audit bookings requested by institutions.</p>
            </div>

            {auditRequests.length === 0 ? (
              <p className="text-slate-500 py-8 text-center text-xs">No on-site audit requests pending.</p>
            ) : (
              <div className="space-y-3">
                {auditRequests.map((req) => (
                  <Card key={req.id} className="bg-slate-950 border-slate-800 text-white">
                    <CardContent className="p-4 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-purple-300">{req.instituteName}</span>
                        <Badge className="text-[10px] bg-purple-500/20 text-purple-300">{req.status}</Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 text-[11px]">
                        <div>Person: <strong className="text-slate-200">{req.contactPerson}</strong></div>
                        <div>Date Requested: <strong className="text-slate-200">{req.preferredAuditDate}</strong></div>
                        <div>Email: <strong className="text-slate-200">{req.officialEmail}</strong></div>
                        <div>Phone: <strong className="text-slate-200">{req.phone}</strong></div>
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            updateOnSiteAuditStatus(req.id, "completed");
                            loadAllData();
                            toast({ title: "Audit Marked Completed" });
                          }}
                          className="text-[10px] h-6 bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          Mark Completed
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 5: NEW INSTITUTE REQUESTS */}
          <TabsContent value="new_inst" className="space-y-4">
            <div>
              <h3 className="font-bold text-base text-white">New Institute Listing Proposals</h3>
              <p className="text-xs text-slate-400">Submissions from schools and colleges requesting onboarding.</p>
            </div>

            {newInstRequests.length === 0 ? (
              <p className="text-slate-500 py-8 text-center text-xs">No pending listing requests.</p>
            ) : (
              <div className="space-y-3">
                {newInstRequests.map((req) => (
                  <Card key={req.id} className="bg-slate-950 border-slate-800 text-white">
                    <CardContent className="p-4 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">{req.instituteName}</span>
                        <Badge className="text-[10px]">{req.type}</Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-400 text-[11px]">
                        <div>Location: <strong className="text-slate-200">{req.locationName}</strong></div>
                        <div>Established: <strong className="text-slate-200">{req.establishedYear}</strong></div>
                        <div>Website: <a href={req.website} target="_blank" rel="noreferrer" className="text-blue-400 underline">{req.website}</a></div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                        <span className="text-[10px] text-slate-500">Email: {req.officialEmail} • Phone: {req.contactPhone}</span>
                        <Button
                          size="sm"
                          disabled={req.status === "approved"}
                          onClick={() => handleApproveNewInstitute(req.id)}
                          className="text-[10px] h-6 px-3 bg-purple-600 hover:bg-purple-700 text-white font-bold"
                        >
                          {req.status === "approved" ? "✓ Already Published" : "Approve & Publish"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 6: INQUIRIES */}
          <TabsContent value="student_apps" className="space-y-4">
            <div>
              <h3 className="font-bold text-base text-white">Student Admissions Inquiries</h3>
              <p className="text-xs text-slate-400">Applications submitted by students via direct apply buttons.</p>
            </div>

            {studentApplications.length === 0 ? (
              <p className="text-slate-500 py-8 text-center text-xs">No direct student applications received yet.</p>
            ) : (
              <div className="space-y-3 text-xs">
                {studentApplications.map((app) => (
                  <Card key={app.id} className="bg-slate-950 border-slate-800 text-white">
                    <CardContent className="p-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-blue-300">{app.studentName} → {app.instituteName}</span>
                        <span className="text-[10px] text-slate-500">{new Date(app.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Course: <strong className="text-slate-200">{app.desiredCourseOrGrade}</strong> | Score: <strong className="text-slate-200">{app.lastAcademicScore}</strong>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Email: {app.studentEmail} | Phone: {app.studentPhone}
                      </div>
                      {app.message && <p className="text-[11px] text-slate-300 italic pt-1">"{app.message}"</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 7: SECURITY & ADMIN ACCOUNTS */}
          <TabsContent value="security_settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Registered Admin Accounts & Phone Numbers */}
              <Card className="bg-slate-950 border-slate-800 text-white md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base font-bold flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-400" />
                      Authorized Admin Accounts & Registered Phones
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40 text-xs">
                      Max 2 Phones per Admin
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400">
                    Each admin profile must register up to 2 verified mobile numbers. Admin login requires Username, Password, and one of these registered phone numbers.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* List of Admins */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {adminAccounts.map((acc) => (
                      <div key={acc.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm flex items-center gap-1.5">
                            <Shield className="h-4 w-4 text-emerald-400" />
                            {acc.username}
                          </span>
                          <Badge className={`text-[10px] ${acc.role === "super_admin" ? "bg-amber-500/20 text-amber-300 border-amber-500/40" : "bg-blue-500/20 text-blue-300 border-blue-500/40"}`}>
                            {acc.role === "super_admin" ? "Super Admin" : "Admin"}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-slate-300 text-[11px]">
                          <div>Primary Phone: <strong className="text-white">{acc.primaryPhone}</strong></div>
                          {acc.secondaryPhone && (
                            <div>Secondary Phone: <strong className="text-white">{acc.secondaryPhone}</strong></div>
                          )}
                          <div className="text-[10px] text-slate-500">Created: {new Date(acc.createdAt).toLocaleDateString()}</div>
                        </div>
                        {acc.role !== "super_admin" && (
                          <div className="pt-2 border-t border-slate-800 flex justify-end">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteAdmin(acc.id, acc.username)}
                              className="h-6 text-[11px] text-red-400 hover:text-red-300 hover:bg-red-950/40"
                            >
                              <Trash2 className="h-3 w-3 mr-1" /> Remove Admin
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add New Admin Form */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <UserPlus className="h-4 w-4 text-emerald-400" /> Register Additional Admin Account
                    </h4>
                    <form onSubmit={handleCreateNewAdmin} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                      <div>
                        <Label className="text-[11px] text-slate-300">Admin Username</Label>
                        <Input
                          value={addAdminUser}
                          onChange={(e) => setAddAdminUser(e.target.value)}
                          placeholder="e.g. CoAdmin Rohit"
                          className="mt-1 bg-slate-800 border-slate-700 text-xs"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-[11px] text-slate-300">Password (Min 8 chars)</Label>
                        <Input
                          type="password"
                          value={addAdminPass}
                          onChange={(e) => setAddAdminPass(e.target.value)}
                          placeholder="Passphrase"
                          className="mt-1 bg-slate-800 border-slate-700 text-xs"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-[11px] text-slate-300">Primary Phone *</Label>
                        <Input
                          type="tel"
                          value={addAdminPhone1}
                          onChange={(e) => setAddAdminPhone1(e.target.value)}
                          placeholder="10-digit number"
                          className="mt-1 bg-slate-800 border-slate-700 text-xs"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-[11px] text-slate-300">Secondary Phone (Optional)</Label>
                        <Input
                          type="tel"
                          value={addAdminPhone2}
                          onChange={(e) => setAddAdminPhone2(e.target.value)}
                          placeholder="Backup mobile"
                          className="mt-1 bg-slate-800 border-slate-700 text-xs"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold h-9">
                          <Plus className="h-3.5 w-3.5 mr-1" /> Add Admin
                        </Button>
                      </div>
                    </form>
                  </div>
                </CardContent>
              </Card>

              {/* Change Active Credentials */}
              <Card className="bg-slate-950 border-slate-800 text-white">
                <CardHeader>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <KeyRound className="h-4 w-4 text-amber-400" />
                    Update Master Password & Phone
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400">
                    Change your current admin password or registered phone numbers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangeCredentials} className="space-y-3 text-xs">
                    <div>
                      <Label className="text-slate-300">Current Password *</Label>
                      <Input
                        type="password"
                        value={currentPass}
                        onChange={(e) => setCurrentPass(e.target.value)}
                        required
                        className="mt-1 bg-slate-900 border-slate-700 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Admin Username</Label>
                      <Input
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="e.g. Himesh Singh"
                        className="mt-1 bg-slate-900 border-slate-700 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">New Password (leave empty to keep current)</Label>
                      <Input
                        type="password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="Minimum 8 characters"
                        className="mt-1 bg-slate-900 border-slate-700 text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-slate-300">Primary Phone</Label>
                        <Input
                          type="tel"
                          value={newPhone1}
                          onChange={(e) => setNewPhone1(e.target.value)}
                          placeholder="Primary 10 digits"
                          className="mt-1 bg-slate-900 border-slate-700 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Secondary Phone</Label>
                        <Input
                          type="tel"
                          value={newPhone2}
                          onChange={(e) => setNewPhone2(e.target.value)}
                          placeholder="Secondary mobile"
                          className="mt-1 bg-slate-900 border-slate-700 text-xs"
                        />
                      </div>
                    </div>
                    <Button type="submit" size="sm" className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold">
                      Save Account Credentials
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Encrypted Backup / Restore */}
              <Card className="bg-slate-950 border-slate-800 text-white">
                <CardHeader>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Download className="h-4 w-4 text-blue-400" />
                    Encrypted Directory Backup & Recovery
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400">
                    Export or restore your full directory and verification records safely.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-xs">
                  <div>
                    <Label className="text-slate-300">Passkey for Protection</Label>
                    <Input
                      type="password"
                      value={backupPasskey}
                      onChange={(e) => setBackupPasskey(e.target.value)}
                      placeholder="Enter passkey to lock/unlock file"
                      className="mt-1 bg-slate-900 border-slate-700 text-xs"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleExportBackup}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1"
                    >
                      <Download className="h-3.5 w-3.5" /> Export Encrypted Backup
                    </Button>
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <Label className="text-slate-300">Restore from Encrypted Backup</Label>
                    <Textarea
                      rows={2}
                      value={importCipher}
                      onChange={(e) => setImportCipher(e.target.value)}
                      placeholder="Paste backup text here..."
                      className="bg-slate-900 border-slate-700 text-xs"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleImportBackup}
                      className="w-full border-slate-700 text-slate-300 text-xs gap-1"
                    >
                      <Upload className="h-3.5 w-3.5" /> Restore Backup
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Full Institute Editor Modal */}
      <InstituteEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        institute={editingInstitute}
        onSave={handleSaveInstituteFromEditor}
      />
    </div>
  );
}
