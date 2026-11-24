import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Bookmark,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Compass,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Lock,
} from "lucide-react";
import { loadInstitutes, Institute } from "@/lib/institutes-dataset";
import { useNavigate } from "react-router-dom";

interface StudentAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectInstitute?: (institute: Institute) => void;
}

interface StudentProfile {
  name: string;
  email: string;
  phone: string;
  preferredCity: string;
  stream: string;
  educationLevel: string;
  alertOnPlacementVerified: boolean;
  alertOnAuditCompleted: boolean;
  alertOnNewInstitutesInArea: boolean;
  savedInstituteIds: string[];
}

const DEFAULT_PROFILE: StudentProfile = {
  name: "",
  email: "",
  phone: "",
  preferredCity: "Delhi NCR",
  stream: "Engineering / Science",
  educationLevel: "Class 12",
  alertOnPlacementVerified: true,
  alertOnAuditCompleted: true,
  alertOnNewInstitutesInArea: true,
  savedInstituteIds: ["inst-1", "inst-4"], // Default sample saved institutes (IIT Bombay, DPS R.K. Puram)
};

export default function StudentAccountModal({
  isOpen,
  onClose,
  onSelectInstitute,
}: StudentAccountModalProps) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const stored = localStorage.getItem("careermap_student_account");
      if (stored) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
      }
    } catch (e) {
      // Ignore
    }
    return DEFAULT_PROFILE;
  });

  const [activeTab, setActiveTab] = useState<"profile" | "alerts" | "saved">("profile");
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  // Load all institutes to display saved ones
  const [allInstitutes] = useState<Institute[]>(() => loadInstitutes());

  const savedInstitutes = allInstitutes.filter((inst) =>
    profile.savedInstituteIds.includes(inst.id)
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("careermap_student_account", JSON.stringify(profile));
      setIsSavedSuccess(true);
      setTimeout(() => setIsSavedSuccess(false), 3000);
    } catch (e) {
      console.error("Failed to save student profile", e);
    }
  };

  const handleRemoveSaved = (instId: string) => {
    const updatedIds = profile.savedInstituteIds.filter((id) => id !== instId);
    const updated = { ...profile, savedInstituteIds: updatedIds };
    setProfile(updated);
    try {
      localStorage.setItem("careermap_student_account", JSON.stringify(updated));
    } catch (e) {}
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-0 shadow-2xl">
        {/* Header with Map Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 rounded-t-lg relative">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <span>Student Account Portal</span>
                <Badge className="bg-emerald-500/30 text-emerald-200 border-emerald-400/40 text-xs">
                  Active
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-blue-100 text-xs">
                Save your institutions, track placement verification updates, and receive area alerts.
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full bg-muted/60 p-1">
              <TabsTrigger value="profile" className="flex items-center gap-1.5 text-xs font-semibold">
                <User className="h-3.5 w-3.5" />
                <span>My Profile</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-1.5 text-xs font-semibold">
                <Bell className="h-3.5 w-3.5" />
                <span>Notification Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-1.5 text-xs font-semibold">
                <Bookmark className="h-3.5 w-3.5" />
                <span>Saved Institutes ({profile.savedInstituteIds.length})</span>
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: PROFILE */}
            <TabsContent value="profile" className="space-y-4">
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1 mb-1">
                      <User className="h-3.5 w-3.5 text-blue-500" /> Full Name
                    </label>
                    <Input
                      placeholder="e.g. Rahul Sharma"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="text-xs h-9"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1 mb-1">
                      <Mail className="h-3.5 w-3.5 text-blue-500" /> Email ID (for verification alerts)
                    </label>
                    <Input
                      type="email"
                      placeholder="e.g. student@gmail.com"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="text-xs h-9"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1 mb-1">
                      <Phone className="h-3.5 w-3.5 text-blue-500" /> Phone Number (SMS / WhatsApp)
                    </label>
                    <Input
                      type="tel"
                      placeholder="e.g. +91 9876543210"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="text-xs h-9"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1 mb-1">
                      <MapPin className="h-3.5 w-3.5 text-blue-500" /> Preferred City / State
                    </label>
                    <Input
                      placeholder="e.g. Kanpur, Lucknow, Delhi NCR, Pune"
                      value={profile.preferredCity}
                      onChange={(e) => setProfile({ ...profile, preferredCity: e.target.value })}
                      className="text-xs h-9"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">
                      Target Stream / Discipline
                    </label>
                    <select
                      value={profile.stream}
                      onChange={(e) => setProfile({ ...profile, stream: e.target.value })}
                      className="w-full text-xs p-2 border rounded-md bg-background"
                    >
                      <option value="Engineering / Technology">Engineering / Technology</option>
                      <option value="Medical / Healthcare">Medical / Healthcare</option>
                      <option value="Commerce / Management">Commerce / Management</option>
                      <option value="Arts / Humanities">Arts / Humanities</option>
                      <option value="Class 8-10th Board Guidance">Class 8-10th Board Guidance</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">
                      Current Stage
                    </label>
                    <select
                      value={profile.educationLevel}
                      onChange={(e) => setProfile({ ...profile, educationLevel: e.target.value })}
                      className="w-full text-xs p-2 border rounded-md bg-background"
                    >
                      <option value="Class 8-10">Class 8-10</option>
                      <option value="Class 11-12">Class 11-12</option>
                      <option value="Undergraduate">Undergraduate Student</option>
                      <option value="Graduate / Professional">Graduate / Professional</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  {isSavedSuccess && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="h-4 w-4" /> Profile & preferences saved successfully!
                    </span>
                  )}
                  {!isSavedSuccess && <span />}
                  <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                    Save Profile
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* TAB 2: ALERTS & NOTIFICATIONS */}
            <TabsContent value="alerts" className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200">
                Configure when CareerMap sends you real-time notifications about your saved schools and colleges.
              </div>

              <div className="space-y-3">
                {/* Alert 1 */}
                <div className="p-3.5 rounded-xl border bg-card flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="alert1"
                    checked={profile.alertOnPlacementVerified}
                    onChange={(e) =>
                      setProfile({ ...profile, alertOnPlacementVerified: e.target.checked })
                    }
                    className="mt-1 h-4 w-4 rounded text-blue-600 cursor-pointer"
                  />
                  <label htmlFor="alert1" className="cursor-pointer flex-1">
                    <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>Placement Data Verified Alert</span>
                      <Badge className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] py-0">
                        High Priority
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                      Send me an Email/SMS notification as soon as any of my saved institutions receive the{" "}
                      <span className="font-semibold text-foreground">[VERIFIED PLACEMENT]</span> tag confirmed directly by hiring companies.
                    </p>
                  </label>
                </div>

                {/* Alert 2 */}
                <div className="p-3.5 rounded-xl border bg-card flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="alert2"
                    checked={profile.alertOnAuditCompleted}
                    onChange={(e) =>
                      setProfile({ ...profile, alertOnAuditCompleted: e.target.checked })
                    }
                    className="mt-1 h-4 w-4 rounded text-blue-600 cursor-pointer"
                  />
                  <label htmlFor="alert2" className="cursor-pointer flex-1">
                    <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <FileCheck className="h-4 w-4 text-blue-600" />
                      <span>Campus Audit Completion Alert</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                      Notify me when our on-site inspection team finishes the physical campus audit, student interviews, and lab verification for my saved colleges.
                    </p>
                  </label>
                </div>

                {/* Alert 3 */}
                <div className="p-3.5 rounded-xl border bg-card flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="alert3"
                    checked={profile.alertOnNewInstitutesInArea}
                    onChange={(e) =>
                      setProfile({ ...profile, alertOnNewInstitutesInArea: e.target.checked })
                    }
                    className="mt-1 h-4 w-4 rounded text-blue-600 cursor-pointer"
                  />
                  <label htmlFor="alert3" className="cursor-pointer flex-1">
                    <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-purple-600" />
                      <span>New Institutions In My Preferred Area ({profile.preferredCity || "Any City"})</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                      Alert me whenever a new school or college is officially mapped and added to the CareerMap registry in my preferred city.
                    </p>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={handleSaveProfile}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                >
                  Save Notification Preferences
                </Button>
              </div>
            </TabsContent>

            {/* TAB 3: SAVED INSTITUTES */}
            <TabsContent value="saved" className="space-y-4">
              {savedInstitutes.length === 0 ? (
                <div className="text-center py-8 border rounded-xl bg-muted/20">
                  <Bookmark className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-semibold text-foreground">No saved institutions yet</p>
                  <p className="text-[11px] text-muted-foreground mt-1 max-w-sm mx-auto">
                    Browse the Schools & Colleges Directory and click the bookmark icon to track verification updates.
                  </p>
                  <Button
                    onClick={() => {
                      onClose();
                      navigate("/institutes");
                    }}
                    variant="outline"
                    size="sm"
                    className="mt-3 text-xs"
                  >
                    Browse Institutes Directory
                  </Button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {savedInstitutes.map((inst) => {
                    const isPlacementVerified = inst.placement.status === "verified";
                    const isAuditVerified = inst.audit.status === "verified";

                    return (
                      <div
                        key={inst.id}
                        className="p-3 rounded-xl border bg-card hover:bg-accent/10 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground">{inst.name}</span>
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5 py-0"
                            >
                              {inst.type === "school" ? "School" : "College"}
                            </Badge>
                          </div>
                          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-blue-500" />
                            <span>{inst.location.city}, {inst.location.state}</span>
                            <span className="ml-2 font-medium text-foreground">
                              Fee: ₹{inst.feeStructure.tuitionPerYear.toLocaleString("en-IN")}/yr
                            </span>
                          </div>
                          {/* Live Verification Badges */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                                isPlacementVerified
                                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                                  : "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                              }`}
                            >
                              {isPlacementVerified ? (
                                <ShieldCheck className="h-3 w-3 text-emerald-600" />
                              ) : (
                                <AlertTriangle className="h-3 w-3 text-amber-600" />
                              )}
                              {isPlacementVerified ? "VERIFIED PLACEMENT" : "UNVERIFIED PLACEMENT"}
                            </span>

                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                                isAuditVerified
                                  ? "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800"
                                  : "bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 border border-orange-300 dark:border-orange-800"
                              }`}
                            >
                              {isAuditVerified ? (
                                <FileCheck className="h-3 w-3 text-blue-600" />
                              ) : (
                                <Compass className="h-3 w-3 text-orange-600" />
                              )}
                              {isAuditVerified ? "AUDIT VERIFIED" : "CAMPUS DETAIL: UNVERIFIED"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          {onSelectInstitute && (
                            <Button
                              onClick={() => {
                                onClose();
                                onSelectInstitute(inst);
                              }}
                              variant="outline"
                              size="sm"
                              className="text-xs h-8"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" /> View Dossier
                            </Button>
                          )}
                          <Button
                            onClick={() => handleRemoveSaved(inst.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 h-8 px-2"
                            title="Remove from saved"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Discreet Admin Link at Bottom */}
          <div className="border-t mt-6 pt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>CareerMap Verified Institute Network</span>
            <button
              onClick={() => {
                onClose();
                navigate("/admin");
              }}
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/80 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Lock className="h-3 w-3" /> Institute / Admin Portal
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
