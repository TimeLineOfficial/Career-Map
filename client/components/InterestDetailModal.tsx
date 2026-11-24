import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Briefcase,
  Award,
  TrendingUp,
  GraduationCap,
  Building,
  CheckCircle2,
  DollarSign,
  ChevronRight,
  ExternalLink,
  Target,
  Sparkles,
} from "lucide-react";
import { IndianSubject } from "@/lib/indian-subjects-dataset";
import { ExtendedInterest } from "@/lib/extended-interests";
import { loadInstitutes } from "@/lib/institutes-dataset";
import { Link } from "react-router-dom";

interface InterestDetailModalProps {
  item: IndianSubject | ExtendedInterest | null;
  isOpen: boolean;
  onClose: () => void;
  isSelected: boolean;
  onToggleSelect: () => void;
}

export default function InterestDetailModal({
  item,
  isOpen,
  onClose,
  isSelected,
  onToggleSelect,
}: InterestDetailModalProps) {
  if (!item) return null;

  const isIndianSubject = "type" in item;
  const indianSub = isIndianSubject ? (item as IndianSubject) : null;
  const extInterest = !isIndianSubject ? (item as ExtendedInterest) : null;

  const careerPaths = item.career_paths || [];
  const skills = item.related_skills || [];
  const salaryRange =
    extInterest?.salary_range ||
    (isIndianSubject
      ? item.category === "Technology"
        ? "₹8-50 LPA"
        : item.category === "Science" || item.category === "Health Sciences"
          ? "₹7-45 LPA"
          : item.category === "Commerce"
            ? "₹6-35 LPA"
            : "₹4-25 LPA"
      : "₹5-30 LPA");

  // Sample matching institutes from registry
  const allInstitutes = loadInstitutes();
  const relevantInstitutes = allInstitutes
    .filter((inst) => {
      if (item.category === "Technology" && inst.streams.some((s) => s.includes("Engineering") || s.includes("Computer"))) return true;
      if (item.category === "Health Sciences" && inst.streams.some((s) => s.includes("Medical"))) return true;
      if (item.category === "Commerce" && inst.streams.some((s) => s.includes("Commerce") || s.includes("Management"))) return true;
      return inst.type === "college";
    })
    .slice(0, 3);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[88vh] overflow-y-auto p-0 border-0 shadow-2xl">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 rounded-t-lg relative">
          <div className="pr-8 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-white/20 text-white border-white/30 text-[11px] font-semibold">
                {item.category}
              </Badge>
              {item.subcategory && (
                <Badge variant="outline" className="text-white border-white/30 text-[11px]">
                  {item.subcategory}
                </Badge>
              )}
              {item.trending && (
                <Badge className="bg-amber-400 text-amber-950 font-bold text-[10px]">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  High Demand
                </Badge>
              )}
              {indianSub && (
                <Badge className="bg-blue-400 text-blue-950 text-[10px] font-semibold">
                  {indianSub.difficulty} Difficulty
                </Badge>
              )}
            </div>

            <DialogTitle className="text-2xl font-extrabold text-white tracking-tight">
              {item.name}
            </DialogTitle>

            <DialogDescription className="text-blue-100 text-xs">
              {indianSub?.description || `In-depth career roadmap, required qualifications, and industry packages for ${item.name}.`}
            </DialogDescription>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
              <div className="text-[11px] text-muted-foreground flex items-center gap-1 font-semibold">
                <DollarSign className="h-3.5 w-3.5 text-blue-600" /> Expected Package
              </div>
              <div className="text-base font-extrabold text-foreground mt-1">{salaryRange}</div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900">
              <div className="text-[11px] text-muted-foreground flex items-center gap-1 font-semibold">
                <Briefcase className="h-3.5 w-3.5 text-indigo-600" /> Career Paths
              </div>
              <div className="text-base font-extrabold text-foreground mt-1">{careerPaths.length}+ Roles</div>
            </div>

            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900">
              <div className="text-[11px] text-muted-foreground flex items-center gap-1 font-semibold">
                <GraduationCap className="h-3.5 w-3.5 text-purple-600" /> Education Level
              </div>
              <div className="text-base font-extrabold text-foreground mt-1">
                {indianSub ? indianSub.level : "UG / PG Degree"}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <div className="text-[11px] text-muted-foreground flex items-center gap-1 font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> Growth Outlook
              </div>
              <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                {extInterest?.growth_potential === "high" || item.trending ? "High Growth" : "Stable Growth"}
              </div>
            </div>
          </div>

          {/* Section 1: Career Pathways */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-blue-600" />
              <span>Career Opportunities & Job Roles</span>
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {careerPaths.map((career, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg border bg-card flex items-center justify-between text-xs hover:border-blue-300 transition-colors"
                >
                  <span className="font-medium text-foreground">{career}</span>
                  <span className="text-[10px] text-muted-foreground font-semibold">Full-Time / Industry</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Step-by-Step Educational Roadmap */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-indigo-600" />
              <span>Step-by-Step Educational Milestones</span>
            </h4>
            <div className="space-y-2 border-l-2 border-indigo-500/40 pl-3 ml-1">
              <div className="relative">
                <div className="font-semibold text-foreground text-xs">Stage 1: School (Class 8-10th & 11-12th)</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Build fundamentals in {item.category} subjects (UP Board, CBSE, ICSE). Score 75%+ in core subjects.
                </div>
              </div>
              <div className="relative pt-1.5">
                <div className="font-semibold text-foreground text-xs">Stage 2: Undergraduate Entrance & Degree</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Appear for competitive entrances (JEE, NEET, CUET, CLAT depending on stream) and pursue relevant Bachelor's degree.
                </div>
              </div>
              <div className="relative pt-1.5">
                <div className="font-semibold text-foreground text-xs">Stage 3: Corporate Placement & Advanced Specialization</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Internships, campus placement with verified packages ({salaryRange}), or Postgraduate Master's / PhD studies.
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Essential Skills */}
          <div className="space-y-2">
            <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
              <Award className="h-4 w-4 text-purple-600" />
              <span>Key Skills & Competencies</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="text-xs px-2.5 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Section 4: Recommended Verified Colleges */}
          {relevantInstitutes.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <Building className="h-4 w-4 text-emerald-600" />
                  <span>Recommended Institutes for {item.name}</span>
                </h4>
                <Link to="/institutes" className="text-[11px] text-blue-600 font-semibold hover:underline">
                  Browse All →
                </Link>
              </div>
              <div className="grid sm:grid-cols-3 gap-2">
                {relevantInstitutes.map((inst) => (
                  <div key={inst.id} className="p-2.5 rounded-lg border bg-card text-xs space-y-1">
                    <div className="font-bold text-foreground line-clamp-1">{inst.name}</div>
                    <div className="text-[10px] text-muted-foreground">{inst.location.city}</div>
                    <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Avg: ₹{inst.placement.averagePackageLPA} LPA
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Bar */}
          <div className="pt-4 border-t flex flex-wrap items-center justify-between gap-3">
            <Button
              variant={isSelected ? "destructive" : "default"}
              size="sm"
              onClick={onToggleSelect}
              className="text-xs h-9 gap-1.5"
            >
              {isSelected ? (
                <>Deselect from Career Matching</>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Select for Career Matching
                </>
              )}
            </Button>

            <div className="flex items-center gap-2">
              <Link to="/jobs/by-goal">
                <Button variant="outline" size="sm" className="text-xs h-9 gap-1 text-foreground">
                  <Target className="h-3.5 w-3.5 text-blue-600" />
                  Plan Full Roadmap
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-xs h-9">
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
