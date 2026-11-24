import React, { useState, useMemo } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import {
  Institute,
  loadInstitutes,
  compareInstitutes,
  ComparisonResult,
} from "@/lib/institutes-dataset";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowLeft,
  Award,
  ExternalLink,
  MapPin,
  TrendingUp,
  DollarSign,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import InstituteDetailModal from "@/components/institutes/InstituteDetailModal";
import DirectApplyModal from "@/components/institutes/DirectApplyModal";
import AuditBookingModal from "@/components/institutes/AuditBookingModal";
import PlacementVerificationModal from "@/components/institutes/PlacementVerificationModal";

export default function InstituteCompare() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const allInstitutes = useMemo(() => loadInstitutes(), []);

  // Parse IDs from search param ?ids=iit-delhi,dtu-delhi
  const idsParam = searchParams.get("ids");
  const selectedIds = useMemo(() => {
    if (!idsParam) {
      // Default initial pair for great first impression: IIT Delhi vs DTU
      return ["iit-delhi", "dtu-delhi"];
    }
    return idsParam.split(",").filter(Boolean);
  }, [idsParam]);

  const [candidateToAdd, setCandidateToAdd] = useState("");
  const [detailModalInst, setDetailModalInst] = useState<Institute | null>(null);
  const [applyModalInst, setApplyModalInst] = useState<Institute | null>(null);

  const comparisonData: ComparisonResult | null = useMemo(() => {
    if (selectedIds.length === 0) return null;
    try {
      return compareInstitutes(selectedIds);
    } catch {
      return null;
    }
  }, [selectedIds]);

  const removeInstitute = (idToRemove: string) => {
    const updated = selectedIds.filter((id) => id !== idToRemove);
    if (updated.length === 0) {
      navigate("/institutes");
    } else {
      setSearchParams({ ids: updated.join(",") });
    }
  };

  const addInstitute = () => {
    if (!candidateToAdd) return;
    if (selectedIds.includes(candidateToAdd)) return;
    if (selectedIds.length >= 4) {
      alert("Maximum 4 institutions can be compared simultaneously.");
      return;
    }
    const updated = [...selectedIds, candidateToAdd];
    setSearchParams({ ids: updated.join(",") });
    setCandidateToAdd("");
  };

  if (!comparisonData || comparisonData.institutes.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <Scale className="h-12 w-12 text-blue-600 mx-auto" />
        <h2 className="text-2xl font-bold">No Institutions Selected for Comparison</h2>
        <p className="text-xs text-muted-foreground">
          Please select 2 or more schools/colleges from our directory to view their side-by-side analysis.
        </p>
        <Button onClick={() => navigate("/institutes")} className="text-xs">
          Browse Institutions Directory
        </Button>
      </div>
    );
  }

  const { institutes, verdict } = comparisonData;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 py-10 px-4">
      <div className="container max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link
              to="/institutes"
              className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline mb-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Institutes Directory
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
              <Scale className="h-7 w-7 text-blue-600" />
              Side-by-Side Institutional Comparison
            </h1>
            <p className="text-xs text-muted-foreground">
              Compare advantages, disadvantages, verified placement metrics, and physical campus audits across institutions.
            </p>
          </div>

          {/* Add candidate dropdown */}
          {institutes.length < 4 && (
            <div className="flex items-center gap-2">
              <select
                value={candidateToAdd}
                onChange={(e) => setCandidateToAdd(e.target.value)}
                className="px-3 py-1.5 border rounded-md bg-background text-xs"
              >
                <option value="">+ Add another institute to compare...</option>
                {allInstitutes
                  .filter((i) => !selectedIds.includes(i.id))
                  .map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.name} ({i.location.city})
                    </option>
                  ))}
              </select>
              <Button size="sm" onClick={addInstitute} disabled={!candidateToAdd} className="text-xs gap-1">
                <Plus className="h-3.5 w-3.5" /> Add
              </Button>
            </div>
          )}
        </div>

        {/* VERDICT SUMMARY CARD (Prompt requirement: "Which collage is better than the other due to what things") */}
        <Card className="border-2 border-indigo-200 dark:border-indigo-900 bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/80 dark:from-slate-900 dark:to-slate-800 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              CareerMap Intelligent Comparison Verdict
            </div>
            <CardTitle className="text-lg font-extrabold text-indigo-950 dark:text-indigo-100">
              Comparative Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <p className="text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
              {verdict.summary}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-lg border">
                <span className="text-[11px] text-muted-foreground block">Top Placement Leader</span>
                <span className="font-bold text-emerald-600">{verdict.categoryWins.placement}</span>
              </div>
              <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-lg border">
                <span className="text-[11px] text-muted-foreground block">Best Budget & ROI</span>
                <span className="font-bold text-blue-600">{verdict.categoryWins.fees}</span>
              </div>
              <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-lg border">
                <span className="text-[11px] text-muted-foreground block">Top Infrastructure & Labs</span>
                <span className="font-bold text-indigo-600">{verdict.categoryWins.infrastructure}</span>
              </div>
              <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-lg border">
                <span className="text-[11px] text-muted-foreground block">Academic & Faculty Excellence</span>
                <span className="font-bold text-purple-600">{verdict.categoryWins.academics}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SIDE-BY-SIDE MATRIX */}
        <div className="overflow-x-auto border rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full border-collapse text-xs min-w-[700px]">
            {/* Header Columns */}
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="p-4 text-left font-bold text-muted-foreground w-1/5 min-w-[180px]">
                  Evaluation Criteria
                </th>
                {institutes.map((inst) => (
                  <th key={inst.id} className="p-4 text-left border-l relative align-top">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <Badge
                          className={`text-[10px] ${
                            inst.type === "school"
                              ? "bg-amber-400 text-amber-950"
                              : "bg-emerald-400 text-emerald-950"
                          }`}
                        >
                          {inst.type === "school" ? "School" : "College"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeInstitute(inst.id)}
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-red-500 rounded-full"
                          title="Remove from comparison"
                        >
                          ✕
                        </Button>
                      </div>

                      <h3 className="font-extrabold text-sm text-foreground leading-snug">{inst.name}</h3>

                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <MapPin className="h-3 w-3 text-blue-600" />
                        <span>{inst.location.city}, {inst.location.state}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setDetailModalInst(inst)}
                          className="text-[11px] h-7 px-2"
                        >
                          Full Profile
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setApplyModalInst(inst)}
                          className="text-[11px] h-7 px-2 bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y text-xs">
              {/* ROW 1: PLACEMENT VERIFICATION TAG */}
              <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                <td className="p-4 font-bold text-slate-900 dark:text-slate-100">
                  Placement Verification Tag
                </td>
                {institutes.map((inst) => {
                  const isVerified = inst.placement.status === "verified";
                  return (
                    <td key={inst.id} className="p-4 border-l">
                      <div
                        className={`p-2.5 rounded-lg border font-bold text-xs inline-flex items-center gap-1.5 ${
                          isVerified
                            ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                            : "bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200"
                        }`}
                      >
                        {isVerified ? (
                          <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                        )}
                        <span>{isVerified ? "VERIFIED PLACEMENT" : "UNVERIFIED (SELF-REPORTED)"}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-1">
                        {isVerified ? "Confirmed via hiring company HR" : "Awaiting corporate confirmation"}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* ROW 2: CAMPUS AUDIT STATUS */}
              <tr>
                <td className="p-4 font-bold text-slate-900 dark:text-slate-100">
                  On-Site Campus Audit
                </td>
                {institutes.map((inst) => {
                  const isAudited = inst.audit.status === "verified";
                  return (
                    <td key={inst.id} className="p-4 border-l">
                      <div
                        className={`p-2.5 rounded-lg border font-bold text-xs inline-flex items-center gap-1.5 ${
                          isAudited
                            ? "bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200"
                            : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {isAudited ? (
                          <FileCheck className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        )}
                        <span>{isAudited ? "AUDIT VERIFIED" : "AUDIT PENDING"}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-1">
                        {isAudited
                          ? `Inspected by ${inst.audit.auditTeamSize} auditors (${inst.audit.lastAuditDate})`
                          : "Physical on-site inspection pending"}
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* ROW 3: KEY ADVANTAGES (Side-by-Side Advantages) */}
              <tr className="bg-emerald-50/20 dark:bg-emerald-950/10">
                <td className="p-4 font-bold text-emerald-900 dark:text-emerald-300">
                  Key Advantages & Strengths
                </td>
                {institutes.map((inst) => (
                  <td key={inst.id} className="p-4 border-l">
                    <ul className="space-y-1.5 text-[11px]">
                      {inst.advantages.map((adv, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* ROW 4: KEY DISADVANTAGES (Side-by-Side Disadvantages) */}
              <tr className="bg-red-50/20 dark:bg-red-950/10">
                <td className="p-4 font-bold text-red-900 dark:text-red-300">
                  Disadvantages & Considerations
                </td>
                {institutes.map((inst) => (
                  <td key={inst.id} className="p-4 border-l">
                    <ul className="space-y-1.5 text-[11px]">
                      {inst.disadvantages.map((dis, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <XCircle className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{dis}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* ROW 5: PLACEMENT NUMBERS */}
              <tr>
                <td className="p-4 font-bold text-slate-900 dark:text-slate-100">
                  Placement & Admissions Record
                </td>
                {institutes.map((inst) => (
                  <td key={inst.id} className="p-4 border-l space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Placement Rate:</span>
                      <strong className="text-blue-600">{inst.placement.lastYearPlacementRate}%</strong>
                    </div>
                    {inst.type !== "school" && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Average CTC:</span>
                          <strong className="text-emerald-600">₹{inst.placement.averagePackageLPA} LPA</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Highest CTC:</span>
                          <strong className="text-purple-600">₹{inst.placement.highestPackageLPA} LPA</strong>
                        </div>
                      </>
                    )}
                    <div className="text-[10px] text-muted-foreground pt-1">
                      Top Recruiters: {inst.placement.topRecruiters.slice(0, 4).join(", ")}
                    </div>
                  </td>
                ))}
              </tr>

              {/* ROW 6: FEE STRUCTURE */}
              <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                <td className="p-4 font-bold text-slate-900 dark:text-slate-100">
                  Annual Fee & Scholarships
                </td>
                {institutes.map((inst) => (
                  <td key={inst.id} className="p-4 border-l space-y-1">
                    <div className="text-sm font-bold text-foreground">
                      ₹{inst.feeStructure.tuitionPerYear.toLocaleString("en-IN")}/yr
                    </div>
                    {inst.feeStructure.hostelPerYear && (
                      <div className="text-[11px] text-muted-foreground">
                        Hostel: ₹{inst.feeStructure.hostelPerYear.toLocaleString("en-IN")}/yr
                      </div>
                    )}
                    <div className="text-[10px] font-semibold text-emerald-600">
                      {inst.feeStructure.scholarshipAvailable ? "✓ Scholarships Offered" : "Standard Fee Only"}
                    </div>
                  </td>
                ))}
              </tr>

              {/* ROW 7: RATINGS COMPARISON */}
              <tr>
                <td className="p-4 font-bold text-slate-900 dark:text-slate-100">
                  Ratings (Out of 5.0)
                </td>
                {institutes.map((inst) => (
                  <td key={inst.id} className="p-4 border-l space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span>Overall:</span>
                      <span className="font-bold">⭐ {inst.ratings.overall}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Faculty:</span>
                      <span className="font-bold">{inst.ratings.faculty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Infrastructure:</span>
                      <span className="font-bold">{inst.ratings.infrastructure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Student Caliber:</span>
                      <span className="font-bold">{inst.ratings.studentCaliber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sports/Extracurricular:</span>
                      <span className="font-bold">{inst.ratings.sportsAndExtracurricular}</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* ROW 8: LABS & PHYSICAL FACILITIES */}
              <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                <td className="p-4 font-bold text-slate-900 dark:text-slate-100">
                  Laboratories & Sports Facilities
                </td>
                {institutes.map((inst) => (
                  <td key={inst.id} className="p-4 border-l text-[11px] space-y-1">
                    <div className="flex items-center gap-1.5">
                      {inst.audit.inspectedLabs?.csDeptLabs ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span>CS & IT Computing Hub</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {inst.audit.inspectedLabs?.physicsLab ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span>Physics / Electronic Labs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {inst.audit.inspectedLabs?.chemistryLab ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span>Chemistry Labs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {inst.audit.inspectedLabs?.sportsGrounds ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span>Sports Complex & Athletic Grounds</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* ROW 9: CONTACT & LINKS */}
              <tr>
                <td className="p-4 font-bold text-slate-900 dark:text-slate-100">
                  Direct Admission Contact
                </td>
                {institutes.map((inst) => (
                  <td key={inst.id} className="p-4 border-l space-y-2">
                    <div className="text-[11px]">
                      <div><strong>Phone:</strong> {inst.contact.phone}</div>
                      <div><strong>Email:</strong> {inst.contact.email}</div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setApplyModalInst(inst)}
                    >
                      Apply / Inquire Directly
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <InstituteDetailModal
        institute={detailModalInst}
        isOpen={!!detailModalInst}
        onClose={() => setDetailModalInst(null)}
        onOpenAuditBooking={() => {}}
        onOpenPlacementVerification={() => {}}
        onOpenApply={(inst) => setApplyModalInst(inst)}
        onToggleCompare={() => {}}
        isCompared={true}
      />

      <DirectApplyModal
        institute={applyModalInst}
        isOpen={!!applyModalInst}
        onClose={() => setApplyModalInst(null)}
      />
    </div>
  );
}
