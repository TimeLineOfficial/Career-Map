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
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  GraduationCap,
  Building,
  Target,
  CheckCircle2,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface ProfessionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  profession: {
    id: string;
    title: string;
    subtitle?: string;
    field?: string;
    salary?: string;
    growth?: string;
    demand?: string;
    description?: string;
    color?: string;
  } | null;
}

export default function ProfessionDetailModal({
  isOpen,
  onClose,
  profession,
}: ProfessionDetailModalProps) {
  const navigate = useNavigate();
  if (!profession) return null;

  const milestones = [
    {
      stage: "Class 10th Foundation",
      action: "Focus on strong core subjects (Mathematics & Science) and build analytical fundamentals.",
    },
    {
      stage: "Class 11th - 12th Stream Selection",
      action: "Select appropriate academic stream (Science PCM/PCB, Commerce with Math, or Arts/Humanities).",
    },
    {
      stage: "Undergraduate Degree & Entrance",
      action: "Target premier national institutions through competitive exams (JEE, NEET, CUET, IPMAT, CLAT).",
    },
    {
      stage: "Industry Mastery & Professional Career",
      action: "Hands-on internships, project portfolios, and campus placement recruiting.",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-0 shadow-2xl bg-card">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 rounded-t-lg relative">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-white/20 text-white border-white/30 text-xs">
                  Career Pathway Dossier
                </Badge>
                {profession.demand && (
                  <Badge className="bg-emerald-500/30 text-emerald-200 border-emerald-400/40 text-xs">
                    {profession.demand} Demand
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-2xl font-black text-white">
                {profession.title}
              </DialogTitle>
              {profession.subtitle && (
                <DialogDescription className="text-blue-100 text-xs">
                  {profession.subtitle}
                </DialogDescription>
              )}
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-xs">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
              <span className="text-muted-foreground flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-emerald-600" /> Typical Package (CTC)
              </span>
              <div className="text-base font-bold text-emerald-900 dark:text-emerald-200 mt-1">
                {profession.salary || "₹8 - 35 LPA"}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <span className="text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-blue-600" /> Growth Projection
              </span>
              <div className="text-base font-bold text-blue-900 dark:text-blue-200 mt-1">
                {profession.growth || "High Growth (+18%)"}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 col-span-2 sm:col-span-1">
              <span className="text-muted-foreground flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5 text-purple-600" /> Min. Education
              </span>
              <div className="text-base font-bold text-purple-900 dark:text-purple-200 mt-1">
                Bachelor's / Professional Degree
              </div>
            </div>
          </div>

          {/* Overview */}
          {profession.description && (
            <div className="space-y-1.5">
              <h4 className="font-bold text-foreground">Role Overview & Responsibilities:</h4>
              <p className="text-muted-foreground leading-relaxed">
                {profession.description}
              </p>
            </div>
          )}

          {/* Step-by-Step Educational Progression */}
          <div className="space-y-3">
            <h4 className="font-bold text-foreground flex items-center gap-1.5">
              <Target className="h-4 w-4 text-blue-600" />
              Recommended Progression Roadmap (School to Career)
            </h4>
            <div className="space-y-2 border-l-2 border-blue-600 pl-4 ml-2">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative pb-2 last:pb-0">
                  <div className="absolute -left-[23px] top-0 w-3 h-3 rounded-full bg-blue-600 border-2 border-white dark:border-slate-900" />
                  <div className="font-bold text-foreground text-xs">{m.stage}</div>
                  <div className="text-muted-foreground text-[11px] mt-0.5">{m.action}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-muted-foreground text-[11px]">
              Explore verified schools and colleges providing target degrees for this profession.
            </span>
            <Button
              onClick={() => {
                onClose();
                navigate("/institutes");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-1.5 w-full sm:w-auto"
            >
              <Building className="h-3.5 w-3.5" />
              Find Matching Institutes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
