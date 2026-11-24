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
} from "@/lib/security-service";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { toast } = useToast();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState("overview");

  // Data Stores
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [verificationRequests, setVerificationRequests] = useState(getPlacementVerificationRequests());
  const [auditRequests, setAuditRequests] = useState(getOnSiteAuditRequests());
  const [newInstRequests, setNewInstRequests] = useState(getNewInstituteRequests());
  const [studentApplications, setStudentApplications] = useState(getDirectStudentApplications());
  const [auditLogs, setAuditLogs] = useState(getSecurityAuditLogs());

  // Editing Institute State
  const [editingInst, setEditingInst] = useState<Institute | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New Student Record Modal State
  const [selectedInstForStudents, setSelectedInstForStudents] = useState<string>("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentCompany, setNewStudentCompany] = useState("");
  const [newStudentPackage, setNewStudentPackage] = useState(10);
  const [newStudentRole, setNewStudentRole] = useState("Software Engineer");
  const [newStudentVerified, setNewStudentVerified] = useState(true);

  // Password Change State
  const [currentPass, setCurrentPass] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPass, setNewPass] = useState("");

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
      const lock = getLockoutStatus();
      setLockoutRemaining(lock.isLocked ? lock.remainingSeconds : 0);
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
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    const res = await authenticateAdmin(username, password);
    if (res.success) {
      setIsAuthenticated(true);
      loadAllData();
      toast({
        title: "Admin Access Granted",
        description: "Cryptographically authenticated. Secure session initialized.",
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
    toast({
      title: "Logged Out",
      description: "Admin session destroyed securely.",
    });
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
    const filtered = institutes.filter((i) => i.id !== id);
    setInstitutes(filtered);
    saveInstitutes(filtered);
    logSecurityEvent("INSTITUTE_DELETED", "data_mutation", "critical", `Deleted institute ${name} (${id})`);
    toast({
      title: "Institute Removed",
      description: `${name} has been removed from directory.`,
    });
  };

  // Add Student Placement Record
  const handleAddStudentRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInstForStudents || !newStudentName || !newStudentCompany) return;

    const updated = institutes.map((i) => {
      if (i.id === selectedInstForStudents) {
        const newRecord: StudentPlacementRecord = {
          id: "st_" + Date.now(),
          studentName: newStudentName,
          company: newStudentCompany,
          packageLPA: Number(newStudentPackage),
          year: new Date().getFullYear(),
          role: newStudentRole,
          verified: newStudentVerified,
          verificationSource: newStudentVerified
            ? "Corporate Confirmation (Direct Company HR)"
            : "College Self-Reported (Pending Corporate Confirmation)",
        };
        logSecurityEvent(
          "STUDENT_RECORD_ADDED",
          "data_mutation",
          "info",
          `Added placement record for ${newStudentName} at ${i.name}`
        );
        return {
          ...i,
          placement: {
            ...i.placement,
            students: [newRecord, ...i.placement.students],
          },
        };
      }
      return i;
    });

    setInstitutes(updated);
    saveInstitutes(updated);
    setNewStudentName("");
    setNewStudentCompany("");
    toast({
      title: "Student Placement Record Added",
      description: "New verified record logged.",
    });
  };

  // Approve New Institute Request
  const handleApproveNewInstitute = (reqId: string) => {
    const created = approveNewInstituteRequest(reqId);
    if (created) {
      loadAllData();
      toast({
        title: "Institute Approved & Published",
        description: `'${created.name}' is now live in the CareerMap directory!`,
      });
    }
  };

  // Save Credentials Change
  const handleChangeCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await updateAdminCredentials(currentPass, newUsername, newPass);
    if (res.success) {
      toast({
        title: "Master Credentials Updated",
        description: "New password hash securely committed.",
      });
      setCurrentPass("");
      setNewUsername("");
      setNewPass("");
    } else {
      toast({
        variant: "destructive",
        title: "Credential Update Failed",
        description: res.message,
      });
    }
  };

  // Export Encrypted Backup
  const handleExportBackup = async () => {
    if (!backupPasskey || backupPasskey.length < 6) {
      alert("Please enter a secure passkey of at least 6 characters.");
      return;
    }
    const dataToExport = {
      institutes,
      verificationRequests,
      auditRequests,
      newInstRequests,
      studentApplications,
      exportedAt: new Date().toISOString(),
    };
    const encrypted = await exportEncryptedBackup(backupPasskey, dataToExport);
    
    // Download as file
    const blob = new Blob([encrypted], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `careermap_backup_aes_${new Date().toISOString().split("T")[0]}.enc`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Encrypted Backup Exported",
      description: "Data securely encrypted with AES-GCM and downloaded.",
    });
  };

  // Import Encrypted Backup
  const handleImportBackup = async () => {
    if (!backupPasskey || !importCipher) {
      alert("Please provide the passkey and encrypted ciphertext.");
      return;
    }
    try {
      const data = await importEncryptedBackup(backupPasskey, importCipher);
      if (data && data.institutes) {
        setInstitutes(data.institutes);
        saveInstitutes(data.institutes);
        loadAllData();
        toast({
          title: "Backup Successfully Restored",
          description: "All institutions and requests recovered.",
        });
        setImportCipher("");
      }
    } catch (e: any) {
      alert("Decryption failed: " + e.message);
    }
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border border-slate-700 bg-slate-900/90 backdrop-blur-xl shadow-2xl text-white">
          <CardHeader className="text-center space-y-2 pb-4">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-black tracking-tight text-white">
              CareerMap High-Security Admin
            </CardTitle>
            <CardDescription className="text-xs text-slate-300">
              Cryptographically Protected Management Console
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lockoutRemaining > 0 ? (
              <div className="p-3.5 bg-red-950/60 border border-red-800 rounded-xl text-center space-y-1">
                <AlertTriangle className="h-6 w-6 text-red-400 mx-auto" />
                <div className="font-bold text-xs text-red-200">Security Lockout Active</div>
                <p className="text-[11px] text-red-300">
                  Brute-force protection activated. Please wait{" "}
                  <strong>{lockoutRemaining}s</strong> before retrying.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                {authError && (
                  <div className="p-2.5 bg-red-950/50 border border-red-800 rounded-lg text-red-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <div>
                  <Label htmlFor="adminUser" className="text-slate-300">Admin Username</Label>
                  <Input
                    id="adminUser"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    className="mt-1 bg-slate-800/80 border-slate-700 text-white text-xs"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="adminPass" className="text-slate-300">Master Password</Label>
                  <Input
                    id="adminPass"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter master password"
                    className="mt-1 bg-slate-800/80 border-slate-700 text-white text-xs"
                    required
                  />
                </div>

                <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/60 text-[11px] text-blue-200/90 leading-tight space-y-1">
                  <div className="font-semibold text-blue-300 flex items-center gap-1">
                    <Lock className="h-3 w-3" /> SHA-256 Salted Cryptographic Verification
                  </div>
                  <p>Passwords are never stored in plaintext. Lockout activates after 5 failed attempts.</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs py-2 shadow-lg shadow-blue-600/30"
                >
                  <KeyRound className="h-4 w-4 mr-1.5" />
                  Authenticate & Unlock Panel
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      {/* Top Admin Header Bar */}
      <header className="bg-slate-950 border-b border-slate-800 py-4 px-6 sticky top-0 z-30 shadow-md">
        <div className="container max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white flex items-center gap-2">
                CareerMap Admin Backend
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[10px]">
                  Encrypted Session
                </Badge>
              </h1>
              <p className="text-xs text-slate-400">
                Official Verification Desk: <strong className="text-slate-200">career.mapofficials@gmail.com</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-xs border-slate-700 text-slate-300 hover:bg-slate-800 gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout Session
            </Button>
          </div>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <main className="container max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-950 border border-slate-800 p-1 flex flex-wrap gap-1 h-auto rounded-xl">
            <TabsTrigger value="overview" className="text-xs font-semibold data-[state=active]:bg-blue-600">
              Overview & Security
            </TabsTrigger>
            <TabsTrigger value="institutes" className="text-xs font-semibold data-[state=active]:bg-blue-600">
              Institutes Manager ({institutes.length})
            </TabsTrigger>
            <TabsTrigger value="placements" className="text-xs font-semibold data-[state=active]:bg-blue-600">
              Placement Records
            </TabsTrigger>
            <TabsTrigger value="verification_requests" className="text-xs font-semibold data-[state=active]:bg-blue-600">
              Verification Requests ({verificationRequests.filter((r) => r.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="audit_requests" className="text-xs font-semibold data-[state=active]:bg-blue-600">
              Campus Audits ({auditRequests.filter((a) => a.status === "pending_review").length})
            </TabsTrigger>
            <TabsTrigger value="new_institutes" className="text-xs font-semibold data-[state=active]:bg-blue-600">
              New Institute Submissions ({newInstRequests.filter((n) => n.status === "pending").length})
            </TabsTrigger>
            <TabsTrigger value="student_apps" className="text-xs font-semibold data-[state=active]:bg-blue-600">
              Student Apps ({studentApplications.length})
            </TabsTrigger>
            <TabsTrigger value="security_settings" className="text-xs font-semibold data-[state=active]:bg-blue-600">
              Security & Backup
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: OVERVIEW & SECURITY */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-slate-950 border-slate-800 text-white">
                <CardContent className="p-4 space-y-1">
                  <span className="text-xs text-slate-400">Total Live Institutes</span>
                  <div className="text-2xl font-black text-blue-400">{institutes.length}</div>
                  <div className="text-[11px] text-slate-500">
                    {institutes.filter((i) => i.type === "school").length} Schools,{" "}
                    {institutes.filter((i) => i.type === "college").length} Colleges
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-950 border-slate-800 text-white">
                <CardContent className="p-4 space-y-1">
                  <span className="text-xs text-slate-400">Verified Placements</span>
                  <div className="text-2xl font-black text-emerald-400">
                    {institutes.filter((i) => i.placement.status === "verified").length}
                  </div>
                  <div className="text-[11px] text-emerald-500/80">Corporate Cross-Checked</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-950 border-slate-800 text-white">
                <CardContent className="p-4 space-y-1">
                  <span className="text-xs text-slate-400">Verified Campus Audits</span>
                  <div className="text-2xl font-black text-indigo-400">
                    {institutes.filter((i) => i.audit.status === "verified").length}
                  </div>
                  <div className="text-[11px] text-indigo-400/80">Physical Inspection Done</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-950 border-slate-800 text-white">
                <CardContent className="p-4 space-y-1">
                  <span className="text-xs text-slate-400">Pending Actions</span>
                  <div className="text-2xl font-black text-amber-400">
                    {verificationRequests.filter((r) => r.status === "pending").length +
                      auditRequests.filter((a) => a.status === "pending_review").length +
                      newInstRequests.filter((n) => n.status === "pending").length}
                  </div>
                  <div className="text-[11px] text-amber-400/80">Awaiting admin review</div>
                </CardContent>
              </Card>
            </div>

            {/* Security Audit Log Stream */}
            <Card className="bg-slate-950 border-slate-800 text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-400" />
                    Security Audit Trail & Anti-Tamper Logs
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400">
                    Real-time immutable log of administrative authentication and data mutations
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    clearSecurityAuditLogs();
                    setAuditLogs([]);
                  }}
                  className="text-xs border-slate-700 text-slate-400 hover:text-white"
                >
                  Clear Logs
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-72 overflow-y-auto text-xs">
                  {auditLogs.length === 0 ? (
                    <p className="text-slate-500 py-4 text-center">No security incidents logged.</p>
                  ) : (
                    auditLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`text-[9px] px-1.5 py-0 ${
                                log.severity === "critical"
                                  ? "bg-red-500/20 text-red-300 border-red-500/40"
                                  : log.severity === "warning"
                                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                                    : "bg-blue-500/20 text-blue-300 border-blue-500/40"
                              }`}
                            >
                              {log.action}
                            </Badge>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-slate-300 text-[11px]">{log.details}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: INSTITUTES MANAGER */}
          <TabsContent value="institutes" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white">Live Schools & Colleges Database</h3>
              <Button
                size="sm"
                onClick={() => {
                  const newName = window.prompt("Enter new Institute Name:");
                  if (!newName) return;
                  const newCity = window.prompt("Enter City (e.g. Noida, Bangalore):") || "India";
                  const newType = window.confirm("Is this a School? (Click OK for School, Cancel for College)")
                    ? "school"
                    : "college";
                  const created: Institute = {
                    id: newName.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now().toString().slice(-4),
                    name: newName,
                    shortName: newName.split(" ")[0],
                    type: newType,
                    levels: newType === "school" ? ["class_8_10", "class_11_12"] : ["ug", "pg"],
                    boards: newType === "school" ? ["CBSE"] : undefined,
                    streams: ["Science (PCM)", "Commerce"],
                    location: {
                      city: newCity,
                      state: "India",
                      area: newCity,
                      address: newCity,
                      geo: { lat: 28.5, lng: 77.3 },
                      googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(newName)}`,
                    },
                    establishedYear: 2010,
                    yearsInOperation: 16,
                    website: "https://example.edu",
                    contact: {
                      email: "admin@example.edu",
                      phone: "+91-9876543210",
                      whatsapp: "+91-9876543210",
                    },
                    feeStructure: {
                      tuitionPerYear: 120000,
                      totalEstimated: 120000,
                      scholarshipAvailable: true,
                      notes: "Standard fee structure",
                    },
                    ratings: {
                      overall: 4.2,
                      faculty: 4.2,
                      infrastructure: 4.2,
                      studentCaliber: 4.0,
                      sportsAndExtracurricular: 4.0,
                      techLevel: 4.0,
                    },
                    advantages: ["Quality academic guidance"],
                    disadvantages: ["Placement verification in progress"],
                    placement: {
                      status: "unverified",
                      badgeNotice: "⚠️ Unverified Placement: Newly added institute.",
                      lastYearPlacementRate: 85,
                      allTimePlacementRate: 80,
                      averagePackageLPA: 6.5,
                      highestPackageLPA: 18.0,
                      medianPackageLPA: 6.0,
                      topRecruiters: [],
                      students: [],
                    },
                    audit: {
                      status: "unverified",
                      badgeNotice: "⚠️ Pending Audit",
                      studentSamplingConducted: false,
                      randomStudentInterviewCount: 0,
                      topStudentInterviewCount: 0,
                    },
                    photos: [],
                    rankScore: 80,
                    featured: false,
                  };
                  const updated = [created, ...institutes];
                  setInstitutes(updated);
                  saveInstitutes(updated);
                  toast({ title: "Institute Created", description: `${newName} added to directory.` });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs gap-1.5"
              >
                <Plus className="h-4 w-4" /> Add New Institute
              </Button>
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950 divide-y divide-slate-800 text-xs">
              {institutes.map((inst) => (
                <div key={inst.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-900/60 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{inst.name}</span>
                      <Badge className={`text-[10px] ${inst.type === "school" ? "bg-amber-500/20 text-amber-300" : "bg-blue-500/20 text-blue-300"}`}>
                        {inst.type}
                      </Badge>
                      <span className="text-slate-400">({inst.location.city})</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                      <span>Tuition: ₹{inst.feeStructure.tuitionPerYear.toLocaleString("en-IN")}/yr</span>
                      <span>•</span>
                      <span>Rank Score: {inst.rankScore}/100</span>
                      <span>•</span>
                      <span>Avg Package: ₹{inst.placement.averagePackageLPA} LPA</span>
                    </div>
                  </div>

                  {/* Actions & Verification Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Placement Tag Button */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTogglePlacementStatus(inst.id)}
                      className={`text-xs h-7 ${
                        inst.placement.status === "verified"
                          ? "border-emerald-500 text-emerald-400 bg-emerald-950/20"
                          : "border-amber-500 text-amber-400 bg-amber-950/20"
                      }`}
                    >
                      {inst.placement.status === "verified" ? "✓ Placement Verified" : "⚠️ Placement Unverified"}
                    </Button>

                    {/* Audit Tag Button */}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleAuditStatus(inst.id)}
                      className={`text-xs h-7 ${
                        inst.audit.status === "verified"
                          ? "border-blue-500 text-blue-400 bg-blue-950/20"
                          : "border-slate-600 text-slate-400 bg-slate-900"
                      }`}
                    >
                      {inst.audit.status === "verified" ? "✓ Audit Verified" : "Audit Pending"}
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteInstitute(inst.id, inst.name)}
                      className="text-xs h-7 px-2"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* TAB 3: PLACEMENT RECORDS */}
          <TabsContent value="placements" className="space-y-6">
            <Card className="bg-slate-950 border-slate-800 text-white">
              <CardHeader>
                <CardTitle className="text-base font-bold">Add Individual Student Placement Record</CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Log verified offers from companies directly into an institute's profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddStudentRecord} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                    <div className="md:col-span-2">
                      <Label className="text-slate-300">Target Institute</Label>
                      <select
                        value={selectedInstForStudents}
                        onChange={(e) => setSelectedInstForStudents(e.target.value)}
                        required
                        className="w-full mt-1 p-2 bg-slate-900 border border-slate-700 rounded-md text-xs text-white"
                      >
                        <option value="">-- Choose Institute --</option>
                        {institutes.map((i) => (
                          <option key={i.id} value={i.id}>{i.name} ({i.location.city})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label className="text-slate-300">Student Name</Label>
                      <Input
                        value={newStudentName}
                        onChange={(e) => setNewStudentName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        required
                        className="mt-1 bg-slate-900 border-slate-700 text-xs"
                      />
                    </div>

                    <div>
                      <Label className="text-slate-300">Company Name</Label>
                      <Input
                        value={newStudentCompany}
                        onChange={(e) => setNewStudentCompany(e.target.value)}
                        placeholder="e.g. Google India"
                        required
                        className="mt-1 bg-slate-900 border-slate-700 text-xs"
                      />
                    </div>

                    <div>
                      <Label className="text-slate-300">Package (LPA)</Label>
                      <Input
                        type="number"
                        step="0.5"
                        value={newStudentPackage}
                        onChange={(e) => setNewStudentPackage(Number(e.target.value))}
                        required
                        className="mt-1 bg-slate-900 border-slate-700 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newStudentVerified}
                        onChange={(e) => setNewStudentVerified(e.target.checked)}
                        className="rounded bg-slate-900 border-slate-700 text-blue-600"
                      />
                      <span className="text-slate-300 text-xs">Mark as Verified (Direct HR Confirmation Received)</span>
                    </label>

                    <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                      Save Student Record
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 4: PLACEMENT VERIFICATION REQUESTS */}
          <TabsContent value="verification_requests" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  Placement Verification Inbound Requests
                </h3>
                <p className="text-xs text-slate-400">
                  Requests sent by colleges to verify their placement claims. Verified directly at{" "}
                  <strong className="text-slate-200">career.mapofficials@gmail.com</strong>.
                </p>
              </div>
            </div>

            {verificationRequests.length === 0 ? (
              <p className="text-slate-500 py-8 text-center text-xs">No verification requests submitted yet.</p>
            ) : (
              <div className="space-y-3 text-xs">
                {verificationRequests.map((req) => (
                  <Card key={req.id} className="bg-slate-950 border-slate-800 text-white">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-emerald-300">{req.instituteName}</span>
                        <Badge
                          className={`text-[10px] ${
                            req.status === "verified"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : req.status === "contacting_companies"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-amber-500/20 text-amber-300"
                          }`}
                        >
                          Status: {req.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-400 text-[11px]">
                        <div>Contact: <strong className="text-slate-200">{req.contactPerson}</strong></div>
                        <div>Email: <strong className="text-slate-200">{req.officialEmail}</strong></div>
                        <div>Phone: <strong className="text-slate-200">{req.phone}</strong></div>
                      </div>

                      <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px]">
                        <span className="text-slate-400 font-semibold block mb-0.5">Corporate HR References:</span>
                        <span className="text-slate-200">{req.companyContactDetails}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                        <span className="text-[10px] text-slate-500">Submitted: {new Date(req.createdAt).toLocaleString()}</span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              updatePlacementVerificationRequestStatus(req.id, "contacting_companies");
                              loadAllData();
                            }}
                            className="text-[10px] h-6 px-2 border-slate-700"
                          >
                            Mark Contacting HR
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              updatePlacementVerificationRequestStatus(req.id, "verified");
                              handleTogglePlacementStatus(req.instituteId);
                              loadAllData();
                            }}
                            className="text-[10px] h-6 px-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            Approve & Mark Verified
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 5: CAMPUS AUDIT REQUESTS */}
          <TabsContent value="audit_requests" className="space-y-4">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-blue-400" />
                On-Site Campus Audit Bookings
              </h3>
              <p className="text-xs text-slate-400">
                Audits requested by colleges/schools with preferred dates and team size (1-4 auditors).
              </p>
            </div>

            {auditRequests.length === 0 ? (
              <p className="text-slate-500 py-8 text-center text-xs">No campus audits requested yet.</p>
            ) : (
              <div className="space-y-3 text-xs">
                {auditRequests.map((req) => (
                  <Card key={req.id} className="bg-slate-950 border-slate-800 text-white">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-blue-300">{req.instituteName}</span>
                        <Badge className="bg-blue-500/20 text-blue-300 text-[10px]">
                          Audit Date: {req.preferredAuditDate} ({req.teamSizeRequested} Auditors)
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-400 text-[11px]">
                        <div>Coordinator: <strong className="text-slate-200">{req.contactPerson}</strong></div>
                        <div>Official Email: <strong className="text-slate-200">{req.officialEmail}</strong></div>
                        <div>Phone: <strong className="text-slate-200">{req.phone}</strong></div>
                      </div>

                      <div className="text-[11px] text-slate-300">
                        <span className="text-slate-400 font-semibold">Departments to inspect: </span>
                        {req.coursesToAudit.join(", ") || "Full Campus"}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                        <span className="text-[10px] text-slate-500">
                          {req.travelLodgingAgreed ? "✓ Travel & Lodging Arranged by Institute" : "Pending Agreement"}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              updateOnSiteAuditStatus(req.id, "team_assigned");
                              loadAllData();
                            }}
                            className="text-[10px] h-6 px-2 border-slate-700"
                          >
                            Assign Audit Team
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              updateOnSiteAuditStatus(req.id, "completed");
                              handleToggleAuditStatus(req.instituteId);
                              loadAllData();
                            }}
                            className="text-[10px] h-6 px-2 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Mark Completed & Issue Verified Badge
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 6: NEW INSTITUTE SUBMISSIONS */}
          <TabsContent value="new_institutes" className="space-y-4">
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Building className="h-4 w-4 text-purple-400" />
                New College & School Onboarding Applications
              </h3>
              <p className="text-xs text-slate-400">
                Inbound requests from institutions to be added to CareerMap directory.
              </p>
            </div>

            {newInstRequests.length === 0 ? (
              <p className="text-slate-500 py-8 text-center text-xs">No pending onboarding applications.</p>
            ) : (
              <div className="space-y-3 text-xs">
                {newInstRequests.map((req) => (
                  <Card key={req.id} className="bg-slate-950 border-slate-800 text-white">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-purple-300">{req.instituteName}</span>
                        <Badge className="bg-purple-500/20 text-purple-300 text-[10px] uppercase">
                          {req.type}
                        </Badge>
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
                          {req.status === "approved" ? "✓ Already Published" : "Approve & Publish to Directory"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 7: DIRECT STUDENT APPLICATIONS */}
          <TabsContent value="student_apps" className="space-y-4">
            <div>
              <h3 className="font-bold text-base text-white">Student Admissions Inquiries</h3>
              <p className="text-xs text-slate-400">Applications submitted by students via "Apply Now" buttons.</p>
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

          {/* TAB 8: SECURITY SETTINGS & ENCRYPTED BACKUP */}
          <TabsContent value="security_settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Change Master Credentials */}
              <Card className="bg-slate-950 border-slate-800 text-white">
                <CardHeader>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <KeyRound className="h-4 w-4 text-amber-400" />
                    Change Admin Master Password
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400">
                    Updates your SHA-256 salted hash. Choose a strong passkey.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangeCredentials} className="space-y-3 text-xs">
                    <div>
                      <Label className="text-slate-300">Current Password</Label>
                      <Input
                        type="password"
                        value={currentPass}
                        onChange={(e) => setCurrentPass(e.target.value)}
                        required
                        className="mt-1 bg-slate-900 border-slate-700 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">New Admin Username</Label>
                      <Input
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="e.g. Himesh Singh"
                        required
                        className="mt-1 bg-slate-900 border-slate-700 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">New Master Password (Min 8 chars)</Label>
                      <Input
                        type="password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        required
                        className="mt-1 bg-slate-900 border-slate-700 text-xs"
                      />
                    </div>
                    <Button type="submit" size="sm" className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs">
                      Update Master Credentials
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* AES-GCM Encrypted Backup / Restore */}
              <Card className="bg-slate-950 border-slate-800 text-white">
                <CardHeader>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Download className="h-4 w-4 text-blue-400" />
                    Encrypted Backup & Recovery (AES-GCM)
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400">
                    Export or restore your full directory with military-grade encryption
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-xs">
                  <div>
                    <Label className="text-slate-300">Encryption Passkey</Label>
                    <Input
                      type="password"
                      value={backupPasskey}
                      onChange={(e) => setBackupPasskey(e.target.value)}
                      placeholder="Passkey for encryption/decryption"
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
                    <Label className="text-slate-300">Restore from Encrypted Text</Label>
                    <Textarea
                      rows={2}
                      value={importCipher}
                      onChange={(e) => setImportCipher(e.target.value)}
                      placeholder="Paste encrypted base64 payload here..."
                      className="bg-slate-900 border-slate-700 text-xs"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleImportBackup}
                      className="w-full border-slate-700 text-slate-300 text-xs gap-1"
                    >
                      <Upload className="h-3.5 w-3.5" /> Decrypt & Restore Backup
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
