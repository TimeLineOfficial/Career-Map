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
  Sparkles,
  GraduationCap,
  X,
  Search,
  Plus,
} from "lucide-react";
import { loadInstitutes, Institute } from "@/lib/institutes-dataset";
import { useNavigate } from "react-router-dom";

interface StudentAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectInstitute?: (institute: Institute) => void;
}

export interface StudentProfile {
  name: string;
  email: string;
  phone: string;
  preferredCities: string[];
  stream: string;
  educationLevel: string;
  marksPercentage: number;
  alertOnPlacementVerified: boolean;
  alertOnAuditCompleted: boolean;
  alertOnNewInstitutesInArea: boolean;
  savedInstituteIds: string[];
}

const ALL_INDIAN_CITIES = [
  "Delhi NCR",
  "New Delhi",
  "Noida",
  "Greater Noida",
  "Ghaziabad",
  "Faridabad",
  "Gurgaon / Gurugram",
  "Lucknow",
  "Kanpur",
  "Varanasi",
  "Prayagraj",
  "Agra",
  "Gorakhpur",
  "Meerut",
  "Bareilly",
  "Aligarh",
  "Mumbai",
  "Pune",
  "Nagpur",
  "Nashik",
  "Bangalore / Bengaluru",
  "Hyderabad",
  "Chennai",
  "Coimbatore",
  "Kolkata",
  "Jaipur",
  "Kota",
  "Jodhpur",
  "Udaipur",
  "Chandigarh",
  "Dehradun",
  "Haridwar",
  "Patna",
  "Gaya",
  "Bhopal",
  "Indore",
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Bhubaneswar",
  "Cuttack",
  "Ranchi",
  "Jamshedpur",
  "Guwahati",
  "Kochi",
  "Thiruvananthapuram",
  "Visakhapatnam",
  "Abroad (USA, UK, Canada, Singapore, Germany, Australia)",
];

const STAGES_LIST = [
  "Class 10 Passed (Matriculation)",
  "Class 11th (Stream Selected)",
  "Class 12th Passed (Intermediate)",
  "Undergraduate Student",
  "Postgraduate Student",
  "ITI/Polytechnic",
  "PhD/Research",
  "Working Professional",
];

const DEFAULT_PROFILE: StudentProfile = {
  name: "",
  email: "",
  phone: "",
  preferredCities: ["Delhi NCR", "Lucknow"],
  stream: "Engineering / Technology",
  educationLevel: "Class 10 Passed (Matriculation)",
  marksPercentage: 85,
  alertOnPlacementVerified: true,
  alertOnAuditCompleted: true,
  alertOnNewInstitutesInArea: true,
  savedInstituteIds: ["iit-delhi", "dps-rk-puram"],
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
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_PROFILE,
          ...parsed,
          preferredCities: parsed.preferredCities || (parsed.preferredCity ? [parsed.preferredCity] : DEFAULT_PROFILE.preferredCities),
        };
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

  const toggleCity = (city: string) => {
    setProfile((prev) => {
      const current = prev.preferredCities || [];
      const updated = current.includes(city)
        ? current.filter((c) => c !== city)
        : [...current, city];
      return { ...prev, preferredCities: updated };
    });
  };

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
    const updated = profile.savedInstituteIds.filter((id) => id !== instId);
    const newProfile = { ...profile, savedInstituteIds: updated };
    setProfile(newProfile);
    localStorage.setItem("careermap_student_account", JSON.stringify(newProfile));
  };

  const [citySearchQuery, setCitySearchQuery] = useState("");

  const filteredCitySuggestions = ALL_INDIAN_CITIES.filter(
    (c) =>
      c.toLowerCase().includes(citySearchQuery.toLowerCase()) &&
      !(profile.preferredCities || []).includes(c)
  ).slice(0, 12);

  const handleAddCustomCity = () => {
    const trimmed = citySearchQuery.trim();
    if (!trimmed) return;
    const current = profile.preferredCities || [];
    if (!current.includes(trimmed)) {
      setProfile({ ...profile, preferredCities: [...current, trimmed] });
    }
    setCitySearchQuery("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-0 shadow-2xl relative z-[120]">
        {/* Sticky Header with Close Button pinned at top right */}
        <div className="sticky top-0 z-30 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 rounded-t-lg shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">
                Student Account Portal
              </DialogTitle>
              <DialogDescription className="text-blue-100 text-xs">
                Save your institutions, track placement verification updates, and receive area alerts.
              </DialogDescription>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors flex-shrink-0"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
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
                      <User className="h-3.5 w-3.5 text-blue-500" /> Full Name *
                    </label>
                    <Input
                      placeholder="Enter your full name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="text-xs h-9"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1 mb-1">
                      <Mail className="h-3.5 w-3.5 text-blue-500" /> Email ID (for verification updates) *
                    </label>
                    <Input
                      type="email"
                      placeholder="student@example.com"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="text-xs h-9"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1 mb-1">
                      <Phone className="h-3.5 w-3.5 text-blue-500" /> Phone Number (SMS / WhatsApp)
                    </label>
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="text-xs h-9"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">
                      Current Educational Stage
                    </label>
                    <select
                      value={profile.educationLevel}
                      onChange={(e) => setProfile({ ...profile, educationLevel: e.target.value })}
                      className="w-full text-xs p-2 border rounded-md bg-background"
                    >
                      {STAGES_LIST.map((stage) => (
                        <option key={stage} value={stage}>
                          {stage}
                        </option>
                      ))}
                    </select>
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
                      <option value="Engineering / Technology">Engineering / Technology (CS, IT, AI, Core)</option>
                      <option value="Medical / Healthcare">Medical / Healthcare (MBBS, BDS, Biotech)</option>
                      <option value="Commerce / Management">Commerce / Management (BBA, MBA, CA, Finance)</option>
                      <option value="Arts / Humanities">Arts / Humanities (Law, Civil Services, Design)</option>
                      <option value="Polytechnic / Vocational">Polytechnic & Vocational Skills</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 flex justify-between">
                      <span>Last Academic Score (%)</span>
                      <span className="font-bold text-blue-600">{profile.marksPercentage}%</span>
                    </label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={profile.marksPercentage}
                      onChange={(e) => setProfile({ ...profile, marksPercentage: Number(e.target.value) })}
                      className="text-xs h-9"
                    />
                  </div>
                </div>

                {/* Multi-Select Preferred Cities with Search & Custom Add */}
                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-blue-500" /> Preferred Cities & Regions ({(profile.preferredCities || []).length} Selected):
                    </label>
                    <span className="text-[10px] text-muted-foreground">Type to search any Indian city or add custom</span>
                  </div>

                  {/* Selected Cities Badges */}
                  <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-muted/20 border border-border/80 rounded-lg">
                    {(profile.preferredCities || []).map((city) => (
                      <Badge
                        key={city}
                        variant="secondary"
                        className="bg-blue-600 text-white hover:bg-blue-700 text-xs py-0.5 px-2.5 gap-1.5 cursor-pointer font-medium"
                        onClick={() => toggleCity(city)}
                      >
                        {city} <X className="h-3 w-3" />
                      </Badge>
                    ))}
                    {(profile.preferredCities || []).length === 0 && (
                      <span className="text-xs text-muted-foreground italic">No cities selected yet. Search below.</span>
                    )}
                  </div>

                  {/* City Search & Add Box */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
                      <Input
                        value={citySearchQuery}
                        onChange={(e) => setCitySearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCustomCity())}
                        placeholder="Search city across India or type any custom region..."
                        className="text-xs h-8 pl-8"
                      />
                    </div>
                    {citySearchQuery.trim() && (
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddCustomCity}
                        className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white gap-1"
                      >
                        <Plus className="h-3 w-3" /> Add "{citySearchQuery.trim()}"
                      </Button>
                    )}
                  </div>

                  {/* Filtered Suggestion Pills */}
                  {citySearchQuery.trim() && (
                    <div className="flex flex-wrap gap-1 pt-1 max-h-24 overflow-y-auto">
                      {filteredCitySuggestions.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            toggleCity(city);
                            setCitySearchQuery("");
                          }}
                          className="px-2 py-0.5 rounded text-[11px] bg-muted/60 hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-950 dark:hover:text-blue-300 border border-border"
                        >
                          + {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dynamic Recommendation Snippet */}
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Personalized Pathway Guidance:
                  </div>
                  <p className="leading-relaxed">
                    Based on your stage (<strong>{profile.educationLevel}</strong>) and score of <strong>{profile.marksPercentage}%</strong> in <strong>{profile.stream}</strong>, we recommend reviewing verified programs in {profile.preferredCities?.slice(0, 3).join(", ")}.
                  </p>
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

            {/* TAB 2: ALERTS */}
            <TabsContent value="alerts" className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 rounded-xl border flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold">Placement Verification Notification</div>
                    <div className="text-[11px] text-muted-foreground">
                      Receive an instant alert when a saved college's placement record is verified by employer HRs.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.alertOnPlacementVerified}
                    onChange={(e) =>
                      setProfile({ ...profile, alertOnPlacementVerified: e.target.checked })
                    }
                    className="h-4 w-4 rounded"
                  />
                </div>

                <div className="p-4 rounded-xl border flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold">Campus Audit Completion Notification</div>
                    <div className="text-[11px] text-muted-foreground">
                      Get notified when CareerMap completes an on-site physical inspection & lab verification.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.alertOnAuditCompleted}
                    onChange={(e) =>
                      setProfile({ ...profile, alertOnAuditCompleted: e.target.checked })
                    }
                    className="h-4 w-4 rounded"
                  />
                </div>

                <div className="p-4 rounded-xl border flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold">New Institution Alert in Preferred Areas</div>
                    <div className="text-[11px] text-muted-foreground">
                      Receive updates when new verified schools or colleges are added in {profile.preferredCities?.join(", ")}.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={profile.alertOnNewInstitutesInArea}
                    onChange={(e) =>
                      setProfile({ ...profile, alertOnNewInstitutesInArea: e.target.checked })
                    }
                    className="h-4 w-4 rounded"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t">
                <Button onClick={handleSaveProfile} size="sm" className="bg-blue-600 text-white text-xs">
                  Save Alert Settings
                </Button>
              </div>
            </TabsContent>

            {/* TAB 3: SAVED INSTITUTES */}
            <TabsContent value="saved" className="space-y-4">
              {savedInstitutes.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Bookmark className="h-10 w-10 text-muted-foreground mx-auto opacity-50" />
                  <p className="text-xs text-muted-foreground">
                    You haven't saved any institutions yet. Explore the directory and bookmark institutions to track them here.
                  </p>
                  <Button
                    size="sm"
                    onClick={() => {
                      onClose();
                      navigate("/institutes");
                    }}
                    className="text-xs"
                  >
                    Explore Institutions Directory
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedInstitutes.map((inst) => (
                    <div
                      key={inst.id}
                      className="p-3.5 border rounded-xl flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-foreground">{inst.name}</span>
                          <Badge variant="outline" className="text-[10px]">
                            {inst.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                          <span>{inst.location.city}</span>
                          <span>Rating: ⭐ {inst.ratings.overall} / 10.0</span>
                          <span>Tuition: ₹{inst.feeStructure.tuitionPerYear.toLocaleString("en-IN")}/yr</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            onClose();
                            if (onSelectInstitute) onSelectInstitute(inst);
                          }}
                          className="text-xs h-7"
                        >
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveSaved(inst.id)}
                          className="text-red-500 hover:text-red-600 h-7 w-7 p-0"
                          title="Remove bookmark"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
