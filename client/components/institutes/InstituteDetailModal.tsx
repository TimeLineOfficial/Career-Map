import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Institute,
  StudentPlacementRecord,
  PhotoCategory,
} from "@/lib/institutes-dataset";
import {
  ShieldCheck,
  AlertTriangle,
  Building,
  GraduationCap,
  MapPin,
  ExternalLink,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle2,
  XCircle,
  Users,
  Award,
  DollarSign,
  TrendingUp,
  Camera,
  FileCheck,
  Compass,
} from "lucide-react";

interface InstituteDetailModalProps {
  institute: Institute | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenAuditBooking: (inst: Institute) => void;
  onOpenPlacementVerification: (inst: Institute) => void;
  onOpenApply: (inst: Institute) => void;
  onToggleCompare: (inst: Institute) => void;
  isCompared: boolean;
}

export default function InstituteDetailModal({
  institute,
  isOpen,
  onClose,
  onOpenAuditBooking,
  onOpenPlacementVerification,
  onOpenApply,
  onToggleCompare,
  isCompared,
}: InstituteDetailModalProps) {
  if (!institute) return null;

  const [activeTab, setActiveTab] = useState("overview");
  const [photoFilter, setPhotoFilter] = useState<string>("all");
  const [photoTypeFilter, setPhotoTypeFilter] = useState<"all" | "highlight" | "ground_reality">("all");

  const isPlacementVerified = institute.placement.status === "verified";
  const isAuditVerified = institute.audit.status === "verified";

  const filteredPhotos = institute.photos.filter((p) => {
    if (photoFilter !== "all" && p.category !== photoFilter) return false;
    if (photoTypeFilter !== "all" && p.type !== photoTypeFilter) return false;
    return true;
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-0 gap-0 border-0 shadow-2xl">
        {/* Top Header Banner with Map Theme Accents */}
        <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 rounded-t-lg overflow-hidden">
          {/* Subtle Map Grid Background */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 10px 10px, white 2px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  className={`text-xs px-2.5 py-0.5 font-semibold uppercase tracking-wider ${
                    institute.type === "school"
                      ? "bg-amber-400 text-amber-950"
                      : "bg-emerald-400 text-emerald-950"
                  }`}
                >
                  {institute.type === "school" ? "School (8th-12th)" : "Higher Education / College"}
                </Badge>
                {institute.boards && institute.boards.length > 0 && (
                  <Badge variant="outline" className="border-white/30 text-white text-xs">
                    Board: {institute.boards.join(", ")}
                  </Badge>
                )}
                <Badge variant="outline" className="border-white/30 text-white text-xs">
                  Est. {institute.establishedYear} ({institute.yearsInOperation} yrs)
                </Badge>
              </div>

              <DialogTitle className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                {institute.name}
              </DialogTitle>

              <DialogDescription className="text-blue-100 flex items-center gap-1.5 text-sm">
                <MapPin className="h-4 w-4 text-amber-300 flex-shrink-0" />
                <span>{institute.location.address}</span>
                <a
                  href={institute.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white font-medium ml-1 inline-flex items-center gap-0.5"
                >
                  View on Map <ExternalLink className="h-3 w-3" />
                </a>
              </DialogDescription>
            </div>

            {/* Verification Badges Summary */}
            <div className="flex flex-col gap-2 min-w-[220px]">
              {/* Placement Badge */}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold backdrop-blur-md ${
                  isPlacementVerified
                    ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-200"
                    : "bg-amber-500/20 border-amber-400/50 text-amber-200"
                }`}
              >
                {isPlacementVerified ? (
                  <ShieldCheck className="h-4 w-4 text-emerald-300 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-300 flex-shrink-0" />
                )}
                <div>
                  <div className="uppercase tracking-wide font-bold">
                    {isPlacementVerified ? "Verified Placement" : "Unverified Placement"}
                  </div>
                  <div className="text-[10px] opacity-80">
                    {isPlacementVerified ? "Cross-Checked With Employers" : "Self-Reported Claim"}
                  </div>
                </div>
              </div>

              {/* Physical Audit Badge */}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold backdrop-blur-md ${
                  isAuditVerified
                    ? "bg-blue-500/20 border-blue-400/50 text-blue-200"
                    : "bg-slate-500/20 border-slate-400/50 text-slate-200"
                }`}
              >
                {isAuditVerified ? (
                  <FileCheck className="h-4 w-4 text-blue-300 flex-shrink-0" />
                ) : (
                  <Compass className="h-4 w-4 text-slate-300 flex-shrink-0" />
                )}
                <div>
                  <div className="uppercase tracking-wide font-bold">
                    {isAuditVerified ? "Campus Audit Verified" : "Audit Pending"}
                  </div>
                  <div className="text-[10px] opacity-80">
                    {isAuditVerified
                      ? `Inspected by Team (${institute.audit.lastAuditDate || "Recent"})`
                      : "Awaiting On-Site Visit"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full bg-muted/60 p-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="placement">
                {institute.type === "school" ? "Admissions & Placements" : "Placement Records"}
              </TabsTrigger>
              <TabsTrigger value="audit">Campus Audit & Labs</TabsTrigger>
              <TabsTrigger value="photos">Photos ({institute.photos.length})</TabsTrigger>
              <TabsTrigger value="comparison">Pros & Cons</TabsTrigger>
            </TabsList>

            {/* TAB 1: OVERVIEW */}
            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Annual Tuition</div>
                  <div className="text-2xl font-bold text-blue-950 dark:text-blue-100 mt-1">
                    ₹{institute.feeStructure.tuitionPerYear.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {institute.feeStructure.scholarshipAvailable ? "Scholarships available" : "Standard fee"}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900">
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {institute.type === "school" ? "Top Admissions Rate" : "Placement Rate"}
                  </div>
                  <div className="text-2xl font-bold text-emerald-950 dark:text-emerald-100 mt-1">
                    {institute.placement.lastYearPlacementRate}%
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    All-Time: {institute.placement.allTimePlacementRate}%
                  </div>
                </div>

                {institute.type !== "school" ? (
                  <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900">
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">Average Package</div>
                    <div className="text-2xl font-bold text-purple-950 dark:text-purple-100 mt-1">
                      ₹{institute.placement.averagePackageLPA} LPA
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      Highest: ₹{institute.placement.highestPackageLPA} LPA
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900">
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">Student Caliber</div>
                    <div className="text-2xl font-bold text-purple-950 dark:text-purple-100 mt-1">
                      {institute.ratings.studentCaliber} / 5.0
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Competitive Selection</div>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900">
                  <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">Overall Rank Score</div>
                  <div className="text-2xl font-bold text-amber-950 dark:text-amber-100 mt-1">
                    {institute.rankScore} / 100
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    Rating: {institute.ratings.overall} / 5.0
                  </div>
                </div>
              </div>

              {/* Streams and Programs */}
              <div className="border rounded-xl p-5 space-y-3">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                  Streams & Specialized Programs
                </h4>
                <div className="flex flex-wrap gap-2">
                  {institute.streams.map((stream) => (
                    <Badge key={stream} variant="secondary" className="px-3 py-1 font-medium">
                      {stream}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Ratings Breakdown */}
              <div className="border rounded-xl p-5 space-y-4">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Award className="h-4 w-4 text-purple-600" />
                  Institutional Evaluation Parameters
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Faculty & Pedagogy</span>
                      <span className="font-bold">{institute.ratings.faculty} / 5</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${(institute.ratings.faculty / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Campus Infrastructure</span>
                      <span className="font-bold">{institute.ratings.infrastructure} / 5</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${(institute.ratings.infrastructure / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Student Caliber</span>
                      <span className="font-bold">{institute.ratings.studentCaliber} / 5</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${(institute.ratings.studentCaliber / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Sports & Extracurricular</span>
                      <span className="font-bold">{institute.ratings.sportsAndExtracurricular} / 5</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${(institute.ratings.sportsAndExtracurricular / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Technology Integration</span>
                      <span className="font-bold">{institute.ratings.techLevel} / 5</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-600 rounded-full"
                        style={{ width: `${(institute.ratings.techLevel / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Overall Score</span>
                      <span className="font-bold">{institute.ratings.overall} / 5</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: `${(institute.ratings.overall / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: PLACEMENT & ADMISSION DATA */}
            <TabsContent value="placement" className="space-y-6">
              {/* Notice Banner */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  isPlacementVerified
                    ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                    : "bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200"
                }`}
              >
                {isPlacementVerified ? (
                  <ShieldCheck className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="font-bold text-sm">
                    {isPlacementVerified
                      ? "100% Verified Corporate Placement Record"
                      : "Unverified Placement Claim (Self-Reported)"}
                  </div>
                  <p className="text-xs opacity-90">{institute.placement.badgeNotice}</p>
                  {!isPlacementVerified && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 text-xs border-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40"
                      onClick={() => onOpenPlacementVerification(institute)}
                    >
                      Are you from this institute? Request Placement Verification
                    </Button>
                  )}
                </div>
              </div>

              {/* Placement Stats Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-xl">
                  <span className="text-xs text-muted-foreground">Last Session Placement</span>
                  <div className="text-2xl font-bold mt-1 text-blue-600">
                    {institute.placement.lastYearPlacementRate}%
                  </div>
                </div>
                <div className="p-4 border rounded-xl">
                  <span className="text-xs text-muted-foreground">All-Time Placement Record</span>
                  <div className="text-2xl font-bold mt-1 text-indigo-600">
                    {institute.placement.allTimePlacementRate}%
                  </div>
                </div>
                {institute.type !== "school" && (
                  <>
                    <div className="p-4 border rounded-xl">
                      <span className="text-xs text-muted-foreground">Average CTC Package</span>
                      <div className="text-2xl font-bold mt-1 text-emerald-600">
                        ₹{institute.placement.averagePackageLPA} LPA
                      </div>
                    </div>
                    <div className="p-4 border rounded-xl">
                      <span className="text-xs text-muted-foreground">Highest Package Offered</span>
                      <div className="text-2xl font-bold mt-1 text-purple-600">
                        ₹{institute.placement.highestPackageLPA} LPA
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Student Placement Roster */}
              <div className="border rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    Individual Student Placement & Admission Records
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    {institute.placement.students.length} Records Verified
                  </Badge>
                </div>

                {institute.placement.students.length === 0 ? (
                  <p className="text-xs text-muted-foreground py-4 text-center">
                    No individual student records uploaded yet.
                  </p>
                ) : (
                  <div className="divide-y border rounded-lg overflow-hidden text-xs">
                    <div className="grid grid-cols-5 p-3 bg-muted/60 font-semibold text-muted-foreground">
                      <div>Student Name</div>
                      <div>Organization / Company</div>
                      <div>Role / Course</div>
                      <div>Package (LPA)</div>
                      <div>Verification Status</div>
                    </div>
                    {institute.placement.students.map((st) => (
                      <div key={st.id} className="grid grid-cols-5 p-3 items-center hover:bg-muted/30 transition-colors">
                        <div className="font-semibold">{st.studentName}</div>
                        <div className="text-blue-700 dark:text-blue-300 font-medium">{st.company}</div>
                        <div>{st.role}</div>
                        <div className="font-bold">
                          {st.packageLPA > 0 ? `₹${st.packageLPA} LPA` : "Seat Confirmed"}
                        </div>
                        <div>
                          {st.verified ? (
                            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] gap-1">
                              <CheckCircle2 className="h-3 w-3" /> Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-amber-700 dark:text-amber-300 text-[10px] gap-1">
                              <AlertTriangle className="h-3 w-3" /> Unverified
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* TAB 3: CAMPUS AUDIT & LABS */}
            <TabsContent value="audit" className="space-y-6">
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  isAuditVerified
                    ? "bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200"
                    : "bg-slate-50 dark:bg-slate-950/20 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300"
                }`}
              >
                <FileCheck className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-sm">
                    {isAuditVerified
                      ? `On-Site Audit Completed (${institute.audit.lastAuditDate || "Recent"})`
                      : "Campus Audit Not Conducted Yet"}
                  </div>
                  <p className="text-xs opacity-90">{institute.audit.badgeNotice}</p>
                  <Button
                    size="sm"
                    className="mt-2 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => onOpenAuditBooking(institute)}
                  >
                    Schedule Official CareerMap Campus Audit
                  </Button>
                </div>
              </div>

              {isAuditVerified && (
                <>
                  {/* Lab & Facility Checklist */}
                  <div className="border rounded-xl p-5 space-y-3">
                    <h4 className="font-semibold text-sm">Physical Inspection Checklist</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/40">
                        {institute.audit.inspectedLabs?.csDeptLabs ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span>CS & IT Computing Labs</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/40">
                        {institute.audit.inspectedLabs?.physicsLab ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span>Physics & Electronics Labs</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/40">
                        {institute.audit.inspectedLabs?.chemistryLab ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span>Chemistry & Material Science</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/40">
                        {institute.audit.inspectedLabs?.biologyLab ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span>Biology & Life Science Labs</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/40">
                        {institute.audit.inspectedLabs?.managementClassrooms ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span>Smart Audio-Visual Classrooms</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/40">
                        {institute.audit.inspectedLabs?.sportsGrounds ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span>Playgrounds & Sports Complex</span>
                      </div>
                    </div>
                  </div>

                  {/* Student Sampling Findings */}
                  <div className="border rounded-xl p-5 space-y-3">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      Independent Student Sampling Findings
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Random Students Sampled:</span>
                        <div className="text-lg font-bold text-purple-600">
                          {institute.audit.randomStudentInterviewCount} Students
                        </div>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <span className="text-muted-foreground">Top Rankers Sampled:</span>
                        <div className="text-lg font-bold text-indigo-600">
                          {institute.audit.topStudentInterviewCount} Students
                        </div>
                      </div>
                    </div>
                    {institute.audit.studentFeedbackSummary && (
                      <p className="text-xs bg-muted/20 p-3 rounded-lg border text-muted-foreground">
                        <strong className="text-foreground">Auditor Note: </strong>
                        {institute.audit.studentFeedbackSummary}
                      </p>
                    )}
                  </div>
                </>
              )}
            </TabsContent>

            {/* TAB 4: CATEGORIZED PHOTOS */}
            <TabsContent value="photos" className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                <div className="flex gap-1 overflow-x-auto text-xs">
                  {["all", "campus", "classrooms", "labs", "grounds", "sports"].map((cat) => (
                    <Button
                      key={cat}
                      size="sm"
                      variant={photoFilter === cat ? "default" : "outline"}
                      className="text-xs capitalize h-7"
                      onClick={() => setPhotoFilter(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <span className="text-muted-foreground mr-1">View:</span>
                  <Button
                    size="sm"
                    variant={photoTypeFilter === "all" ? "secondary" : "ghost"}
                    className="text-xs h-7"
                    onClick={() => setPhotoTypeFilter("all")}
                  >
                    All Photos
                  </Button>
                  <Button
                    size="sm"
                    variant={photoTypeFilter === "highlight" ? "secondary" : "ghost"}
                    className="text-xs h-7"
                    onClick={() => setPhotoTypeFilter("highlight")}
                  >
                    Highlights
                  </Button>
                  <Button
                    size="sm"
                    variant={photoTypeFilter === "ground_reality" ? "secondary" : "ghost"}
                    className="text-xs h-7 text-amber-700 dark:text-amber-400 font-semibold"
                    onClick={() => setPhotoTypeFilter("ground_reality")}
                  >
                    🔍 Ground Reality
                  </Button>
                </div>
              </div>

              {filteredPhotos.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground text-xs">
                  No photos uploaded for this category yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredPhotos.map((photo) => (
                    <div key={photo.id} className="group relative border rounded-xl overflow-hidden shadow-sm">
                      <div className="aspect-video bg-muted overflow-hidden">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-xs truncate">{photo.title}</span>
                          <Badge
                            className={`text-[9px] px-1.5 py-0 ${
                              photo.type === "ground_reality"
                                ? "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200"
                                : "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-200"
                            }`}
                          >
                            {photo.type === "ground_reality" ? "Reality Inspection" : "Highlight"}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-2">{photo.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* TAB 5: ADVANTAGES & DISADVANTAGES */}
            <TabsContent value="comparison" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Advantages */}
                <div className="border border-emerald-200 dark:border-emerald-900/60 rounded-xl p-5 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
                  <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    Key Advantages & Strengths
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {institute.advantages.map((adv, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disadvantages */}
                <div className="border border-red-200 dark:border-red-900/60 rounded-xl p-5 bg-red-50/40 dark:bg-red-950/20 space-y-3">
                  <h4 className="font-bold text-sm text-red-900 dark:text-red-200 flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    Considerations & Disadvantages
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {institute.disadvantages.map((dis, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>{dis}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Footer */}
          <div className="mt-8 pt-4 border-t flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant={isCompared ? "destructive" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => onToggleCompare(institute)}
              >
                {isCompared ? "Remove from Comparison" : "+ Add to Side-by-Side Compare"}
              </Button>
              <a
                href={`tel:${institute.contact.phone}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 border rounded-md text-xs font-medium hover:bg-muted"
              >
                <Phone className="h-3.5 w-3.5 text-blue-600" /> Call Direct
              </a>
              <a
                href={`https://wa.me/${institute.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 border rounded-md text-xs font-medium hover:bg-muted text-emerald-600"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={institute.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 border rounded-md text-xs font-medium hover:bg-muted"
              >
                Visit Website <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs"
                onClick={() => onOpenApply(institute)}
              >
                Apply Now / Inquire
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
