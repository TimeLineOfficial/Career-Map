import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Institute,
  loadInstitutes,
  queryInstitutes,
  InstituteFilterOptions,
  BoardType,
  StreamType,
  EducationLevel,
  analyzeStudentMarksAndPreferences,
  StudentRecommendation,
} from "@/lib/institutes-dataset";
import InstituteDetailModal from "@/components/institutes/InstituteDetailModal";
import AuditBookingModal from "@/components/institutes/AuditBookingModal";
import PlacementVerificationModal from "@/components/institutes/PlacementVerificationModal";
import NewInstituteModal from "@/components/institutes/NewInstituteModal";
import DirectApplyModal from "@/components/institutes/DirectApplyModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  MapPin,
  Search,
  Filter,
  ShieldCheck,
  AlertTriangle,
  GraduationCap,
  Building,
  School,
  ArrowRight,
  Compass,
  FileCheck,
  CheckCircle2,
  XCircle,
  Scale,
  Sparkles,
  ExternalLink,
  Plus,
  Phone,
  MessageCircle,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

export default function InstitutesDirectory() {
  const navigate = useNavigate();
  const allInstitutes = useMemo(() => loadInstitutes(), []);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "college" | "school">("all");
  const [selectedLevel, setSelectedLevel] = useState<"all" | EducationLevel>("all");
  const [selectedBoard, setSelectedBoard] = useState<"all" | BoardType>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [placementOnly, setPlacementOnly] = useState<boolean>(false);
  const [auditOnly, setAuditOnly] = useState<boolean>(false);
  const [maxFee, setMaxFee] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"rank" | "fee_low" | "placement" | "rating">("rank");

  // Comparison State (Array of selected institute IDs)
  const [comparedInstitutes, setComparedInstitutes] = useState<string[]>([]);

  // Modals State
  const [selectedInstituteForDetail, setSelectedInstituteForDetail] = useState<Institute | null>(null);
  const [auditModalInst, setAuditModalInst] = useState<Institute | null>(null);
  const [placementVerifyInst, setPlacementVerifyInst] = useState<Institute | null>(null);
  const [newInstModalOpen, setNewInstModalOpen] = useState(false);
  const [applyModalInst, setApplyModalInst] = useState<Institute | null>(null);

  // Student Score & Guidance Calculator State (from Audio 1)
  const [showCalculator, setShowCalculator] = useState(false);
  const [currentClassInput, setCurrentClassInput] = useState<"class_8" | "class_10" | "class_12">("class_8");
  const [mathScore, setMathScore] = useState<number>(85);
  const [scienceScore, setScienceScore] = useState<number>(82);
  const [englishScore, setEnglishScore] = useState<number>(78);
  const [socialScore, setSocialScore] = useState<number>(75);
  const [techInterest, setTechInterest] = useState<boolean>(true);
  const [sportsInterest, setSportsInterest] = useState<boolean>(false);
  const [businessInterest, setBusinessInterest] = useState<boolean>(false);
  const [medicalInterest, setMedicalInterest] = useState<boolean>(false);
  const [calculatorResult, setCalculatorResult] = useState<StudentRecommendation | null>(null);

  // Unique Cities in Dataset
  const cities = useMemo(() => {
    const set = new Set<string>();
    allInstitutes.forEach((i) => set.add(i.location.city));
    return Array.from(set);
  }, [allInstitutes]);

  // Query Results
  const filteredInstitutes = useMemo(() => {
    return queryInstitutes({
      searchQuery,
      type: selectedType,
      level: selectedLevel,
      board: selectedBoard,
      city: selectedCity,
      minPlacementStatus: placementOnly ? "verified_only" : "all",
      auditStatus: auditOnly ? "verified_only" : "all",
      maxFee: maxFee > 0 ? maxFee : undefined,
      sortBy,
    });
  }, [
    searchQuery,
    selectedType,
    selectedLevel,
    selectedBoard,
    selectedCity,
    placementOnly,
    auditOnly,
    maxFee,
    sortBy,
  ]);

  const toggleCompare = (inst: Institute) => {
    setComparedInstitutes((prev) => {
      if (prev.includes(inst.id)) {
        return prev.filter((id) => id !== inst.id);
      } else {
        if (prev.length >= 4) {
          alert("You can compare up to 4 institutes side by side.");
          return prev;
        }
        return [...prev, inst.id];
      }
    });
  };

  const handleRunAnalysis = () => {
    const result = analyzeStudentMarksAndPreferences({
      currentClass: currentClassInput,
      mathScore,
      scienceScore,
      englishScore,
      socialScore,
      techInterest,
      sportsInterest,
      businessInterest,
      medicalInterest,
    });
    setCalculatorResult(result);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedLevel("all");
    setSelectedBoard("all");
    setSelectedCity("all");
    setPlacementOnly(false);
    setAuditOnly(false);
    setMaxFee(0);
    setSortBy("rank");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 relative pb-28">
      {/* Decorative Career Map Background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 12px 12px, #3b82f6 2px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Hero Section with Map Theme Styling */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white py-14 px-4 overflow-hidden shadow-md">
        {/* Subtle decorative roadmap paths */}
        <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M-100,100 C300,50 600,250 1200,80 S1800,200 2000,100"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="4"
              strokeDasharray="10 8"
            />
            <path
              d="M-50,220 C400,180 800,40 1400,180 S1900,100 2100,220"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="3"
              strokeDasharray="6 6"
            />
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-sm">
                <Compass className="h-3.5 w-3.5 text-amber-300 animate-spin-slow" />
                <span>India's 100% Transparent School & College Navigation Map</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Career MAP: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-blue-200 to-emerald-300">Schools & Colleges Explorer</span>
              </h1>
              <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-2xl">
                Explore every school and college with <strong className="text-white">Verified Placement Records</strong> (cross-checked directly with employer HRs) and <strong className="text-white">On-Site Campus Audits</strong> (physical inspections & random student interviews).
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => setShowCalculator(!showCalculator)}
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs gap-2 shadow-lg"
              >
                <Sparkles className="h-4 w-4" />
                {showCalculator ? "Hide Marks Analyzer" : "Marks & Stream Analyzer"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setNewInstModalOpen(true)}
                className="border-white/30 text-white hover:bg-white/10 text-xs gap-2"
              >
                <Plus className="h-4 w-4" />
                Add School / College
              </Button>
            </div>
          </div>

          {/* Quick Level Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-blue-200/80 mr-2 font-medium">Stage Navigation:</span>
            {[
              { id: "all", label: "All Institutions" },
              { id: "class_8_10", label: "Class 8th - 10th (Board Guidance)" },
              { id: "class_11_12", label: "Class 11th - 12th (Streams & JEE/NEET)" },
              { id: "ug", label: "Undergraduate (B.Tech / BBA / MBBS)" },
              { id: "pg", label: "Postgraduate & Research" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedLevel(tab.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedLevel === tab.id
                    ? "bg-white text-blue-900 shadow-md font-bold scale-105"
                    : "bg-white/10 text-blue-100 hover:bg-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MARKS & STREAM ANALYZER (Audio 1: Class 8th to 12th guidance) */}
      {showCalculator && (
        <section className="container max-w-7xl mx-auto px-4 -mt-6 relative z-20">
          <Card className="border-2 border-amber-300 dark:border-amber-700 shadow-xl bg-gradient-to-br from-amber-50/90 via-white to-blue-50/90 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <Sparkles className="h-5 w-5" />
                  <CardTitle className="text-lg">Student Marks & Career Recommendation Engine</CardTitle>
                </div>
                <Badge className="bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 text-xs">
                  Class 8th, 10th & 12th Custom Guidance
                </Badge>
              </div>
              <CardDescription className="text-xs">
                Enter your last academic exam marks and interests. Our map engine analyzes your strengths to suggest optimal boards (CBSE, ICSE, UP Board), 11th streams, and matching schools/colleges.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Current Stage</label>
                  <select
                    value={currentClassInput}
                    onChange={(e) => setCurrentClassInput(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-background text-xs font-medium"
                  >
                    <option value="class_8">Class 8th (Choosing 9th Board)</option>
                    <option value="class_10">Class 10th (Choosing 11th Stream)</option>
                    <option value="class_12">Class 12th (Choosing College & UG)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Mathematics Marks (%)</label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={mathScore}
                    onChange={(e) => setMathScore(Number(e.target.value))}
                    className="mt-1 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Science / EVS (%)</label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={scienceScore}
                    onChange={(e) => setScienceScore(Number(e.target.value))}
                    className="mt-1 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">English / Language (%)</label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={englishScore}
                    onChange={(e) => setEnglishScore(Number(e.target.value))}
                    className="mt-1 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Social Sciences (%)</label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={socialScore}
                    onChange={(e) => setSocialScore(Number(e.target.value))}
                    className="mt-1 text-xs"
                  />
                </div>
              </div>

              {/* Interests toggles */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground">Key Interests & Aspirations:</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setTechInterest(!techInterest)}
                    className={`px-3 py-1.5 rounded-full border transition-all ${
                      techInterest ? "bg-blue-600 text-white border-blue-600 font-semibold" : "bg-muted/40 hover:bg-muted"
                    }`}
                  >
                    💻 Tech, Coding & Robotics
                  </button>
                  <button
                    type="button"
                    onClick={() => setMedicalInterest(!medicalInterest)}
                    className={`px-3 py-1.5 rounded-full border transition-all ${
                      medicalInterest ? "bg-red-600 text-white border-red-600 font-semibold" : "bg-muted/40 hover:bg-muted"
                    }`}
                  >
                    🩺 Biology, Medicine & Life Sciences
                  </button>
                  <button
                    type="button"
                    onClick={() => setBusinessInterest(!businessInterest)}
                    className={`px-3 py-1.5 rounded-full border transition-all ${
                      businessInterest ? "bg-amber-600 text-white border-amber-600 font-semibold" : "bg-muted/40 hover:bg-muted"
                    }`}
                  >
                    📊 Business, Finance & Startups
                  </button>
                  <button
                    type="button"
                    onClick={() => setSportsInterest(!sportsInterest)}
                    className={`px-3 py-1.5 rounded-full border transition-all ${
                      sportsInterest ? "bg-emerald-600 text-white border-emerald-600 font-semibold" : "bg-muted/40 hover:bg-muted"
                    }`}
                  >
                    ⚽ Sports, Athletics & Extracurriculars
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button size="sm" onClick={handleRunAnalysis} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate Personalized Roadmap Suggestions
                </Button>
              </div>

              {/* Results Preview */}
              {calculatorResult && (
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-300 dark:border-blue-800 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200">
                      <div className="text-xs font-bold text-blue-900 dark:text-blue-200">Strongest Subject Domains</div>
                      <ul className="mt-1 space-y-1 text-xs">
                        {calculatorResult.strongAreas.map((area, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200">
                      <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">Recommended Streams & Boards</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {calculatorResult.recommendedBoards.map((b) => (
                          <Badge key={b} className="bg-emerald-600 text-white text-[10px]">Board: {b}</Badge>
                        ))}
                        {calculatorResult.recommendedStreams.map((s) => (
                          <Badge key={s} variant="outline" className="text-emerald-950 dark:text-emerald-200 text-[10px]">{s}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200">
                      <div className="text-xs font-bold text-purple-900 dark:text-purple-200">Suggested High-Yield Careers</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {calculatorResult.careerPaths.map((cp) => (
                          <Badge key={cp} variant="secondary" className="text-[10px]">{cp}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-semibold text-muted-foreground">Top Matching Institutions:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {calculatorResult.suggestedInstitutes.map((inst) => (
                        <Button
                          key={inst.id}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => setSelectedInstituteForDetail(inst)}
                        >
                          {inst.name} ({inst.location.city}) →
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      )}

      {/* Main Exploration Controls */}
      <section className="container max-w-7xl mx-auto px-4 mt-8 space-y-6">
        {/* Search & Quick Filters Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border space-y-4">
          <div className="flex flex-col lg:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schools & colleges by name, city, courses, or board (e.g., IIT, DPS, UP Board, Pune)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-xs h-10 w-full"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1 w-full lg:w-auto">
              <Button
                variant={selectedType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("all")}
                className="text-xs flex-1 lg:flex-none"
              >
                All
              </Button>
              <Button
                variant={selectedType === "school" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("school")}
                className="text-xs flex-1 lg:flex-none gap-1.5"
              >
                <School className="h-3.5 w-3.5" /> Schools
              </Button>
              <Button
                variant={selectedType === "college" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("college")}
                className="text-xs flex-1 lg:flex-none gap-1.5"
              >
                <Building className="h-3.5 w-3.5" /> Colleges
              </Button>
            </div>
          </div>

          {/* Granular Filter Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2 border-t text-xs">
            {/* Board Selector */}
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">Board Affiliation</label>
              <select
                value={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value as any)}
                className="w-full mt-1 p-2 border rounded-md bg-background text-xs"
              >
                <option value="all">All Boards</option>
                <option value="CBSE">CBSE Board</option>
                <option value="ICSE">ICSE Board</option>
                <option value="UP Board">UP Board</option>
                <option value="State Board">State Boards</option>
                <option value="IB">IB / International</option>
              </select>
            </div>

            {/* City Selector */}
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">Location / City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background text-xs"
              >
                <option value="all">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Verified Placement Only Toggle */}
            <div className="flex flex-col justify-end">
              <button
                type="button"
                onClick={() => setPlacementOnly(!placementOnly)}
                className={`w-full p-2 rounded-md border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  placementOnly
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-muted/30 hover:bg-muted text-muted-foreground"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified Placement Only</span>
              </button>
            </div>

            {/* Verified Audit Only Toggle */}
            <div className="flex flex-col justify-end">
              <button
                type="button"
                onClick={() => setAuditOnly(!auditOnly)}
                className={`w-full p-2 rounded-md border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  auditOnly
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-muted/30 hover:bg-muted text-muted-foreground"
                }`}
              >
                <FileCheck className="h-3.5 w-3.5" />
                <span>Campus Audit Only</span>
              </button>
            </div>

            {/* Sort By */}
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">Sort Ranking</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full mt-1 p-2 border rounded-md bg-background text-xs"
              >
                <option value="rank">CareerMap Overall Rank</option>
                <option value="placement">Highest Average CTC</option>
                <option value="rating">Student & Infra Rating</option>
                <option value="fee_low">Lowest Annual Tuition</option>
              </select>
            </div>

            {/* Reset Filters */}
            <div className="flex flex-col justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="w-full text-xs text-muted-foreground gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <div>
            Showing <strong className="text-foreground">{filteredInstitutes.length}</strong> institutions matching your map criteria
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" /> Verified Data
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 ml-2" /> Self-Reported Data
          </div>
        </div>

        {/* Institutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstitutes.map((inst) => {
            const isCompared = comparedInstitutes.includes(inst.id);
            const isPlacementVerified = inst.placement.status === "verified";
            const isAuditVerified = inst.audit.status === "verified";

            return (
              <Card
                key={inst.id}
                className={`overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative flex flex-col justify-between ${
                  isCompared ? "ring-2 ring-blue-600 border-blue-600" : "border-slate-200 dark:border-slate-800"
                }`}
              >
                {/* Top Card Image & Badge Overlay */}
                <div className="relative aspect-[16/9] bg-muted overflow-hidden">
                  <img
                    src={inst.photos[0]?.url || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80"}
                    alt={inst.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1">
                    <Badge
                      className={`text-[10px] font-bold px-2 py-0.5 ${
                        inst.type === "school" ? "bg-amber-400 text-amber-950" : "bg-emerald-400 text-emerald-950"
                      }`}
                    >
                      {inst.type === "school" ? "School" : "College"}
                    </Badge>
                    <div className="flex gap-1">
                      {inst.boards?.map((b) => (
                        <Badge key={b} className="bg-black/60 backdrop-blur-md text-white text-[10px]">
                          {b}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Image Overlay Info */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <h3 className="font-bold text-base line-clamp-1 text-white">{inst.name}</h3>
                    <div className="flex items-center gap-1 text-[11px] text-blue-200">
                      <MapPin className="h-3 w-3 text-amber-300" />
                      <span>{inst.location.city}, {inst.location.state}</span>
                      <span className="opacity-70 ml-1">({inst.yearsInOperation} yrs est.)</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <CardContent className="p-4 space-y-3.5 flex-1 flex flex-col justify-between text-xs">
                  {/* Verified / Unverified Dual Badges (Text & Audio 2) */}
                  <div className="space-y-1.5">
                    {/* Placement Tag */}
                    <div
                      className={`p-2 rounded-lg border flex items-center justify-between ${
                        isPlacementVerified
                          ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                          : "bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        {isPlacementVerified ? (
                          <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                        )}
                        <span>{isPlacementVerified ? "VERIFIED PLACEMENT" : "UNVERIFIED PLACEMENT"}</span>
                      </div>
                      <span className="text-[10px] font-semibold">
                        {inst.type !== "school"
                          ? `Avg: ₹${inst.placement.averagePackageLPA} LPA`
                          : `Success: ${inst.placement.lastYearPlacementRate}%`}
                      </span>
                    </div>

                    {/* Physical Audit Tag */}
                    <div
                      className={`p-2 rounded-lg border flex items-center justify-between ${
                        isAuditVerified
                          ? "bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200"
                          : "bg-slate-50 dark:bg-slate-950/20 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        {isAuditVerified ? (
                          <FileCheck className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        ) : (
                          <Compass className="h-4 w-4 text-slate-500 flex-shrink-0" />
                        )}
                        <span>{isAuditVerified ? "AUDIT VERIFIED" : "AUDIT PENDING"}</span>
                      </div>
                      <span className="text-[10px] font-semibold">
                        {isAuditVerified ? `${inst.audit.randomStudentInterviewCount} Students Sampled` : "Self-Reported"}
                      </span>
                    </div>
                  </div>

                  {/* Financial & Rating Highlights */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-muted/40 text-[11px]">
                    <div>
                      <span className="text-muted-foreground">Tuition Fee:</span>
                      <div className="font-bold text-foreground">
                        ₹{inst.feeStructure.tuitionPerYear.toLocaleString("en-IN")}/yr
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rating Score:</span>
                      <div className="font-bold text-foreground">
                        ⭐ {inst.ratings.overall} / 5.0 ({inst.rankScore}/100)
                      </div>
                    </div>
                  </div>

                  {/* Advantages Sneak Peek */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-muted-foreground">Key Advantage:</span>
                    <p className="text-[11px] text-foreground line-clamp-1 font-medium">
                      ✓ {inst.advantages[0]}
                    </p>
                  </div>

                  {/* Actions & Compare Button */}
                  <div className="pt-2 border-t space-y-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                        onClick={() => setSelectedInstituteForDetail(inst)}
                      >
                        Explore Profile
                      </Button>
                      <Button
                        variant={isCompared ? "destructive" : "outline"}
                        size="sm"
                        className="text-xs"
                        onClick={() => toggleCompare(inst)}
                      >
                        {isCompared ? "Remove" : "+ Compare"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setApplyModalInst(inst)}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                      >
                        Direct Apply →
                      </button>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${inst.contact.phone}`}
                          className="text-muted-foreground hover:text-blue-600"
                          title="Call Institute"
                        >
                          <Phone className="h-3.5 w-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/${inst.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-emerald-600"
                          title="WhatsApp Institute"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                        </a>
                        <a
                          href={inst.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                          title="Visit Official Website"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Floating Side-by-Side Comparison Dock */}
      {comparedInstitutes.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-4xl mx-auto z-40 bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto">
            <div className="flex items-center gap-1.5 font-bold text-xs text-amber-400 flex-shrink-0">
              <Scale className="h-4 w-4" />
              <span>Comparing ({comparedInstitutes.length}/4):</span>
            </div>
            <div className="flex gap-2">
              {comparedInstitutes.map((id) => {
                const inst = allInstitutes.find((i) => i.id === id);
                if (!inst) return null;
                return (
                  <Badge
                    key={id}
                    variant="secondary"
                    className="bg-slate-800 text-white text-[11px] gap-1 pl-2 pr-1 py-1"
                  >
                    <span>{inst.shortName}</span>
                    <button
                      type="button"
                      onClick={() => toggleCompare(inst)}
                      className="hover:bg-slate-700 rounded-full p-0.5"
                    >
                      <XCircle className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setComparedInstitutes([])}
              className="text-xs text-slate-300 hover:text-white"
            >
              Clear
            </Button>
            <Button
              size="sm"
              onClick={() => navigate(`/compare?ids=${comparedInstitutes.join(",")}`)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs gap-1.5"
            >
              <Scale className="h-4 w-4" /> Compare Side-by-Side Now
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <InstituteDetailModal
        institute={selectedInstituteForDetail}
        isOpen={!!selectedInstituteForDetail}
        onClose={() => setSelectedInstituteForDetail(null)}
        onOpenAuditBooking={(inst) => setAuditModalInst(inst)}
        onOpenPlacementVerification={(inst) => setPlacementVerifyInst(inst)}
        onOpenApply={(inst) => setApplyModalInst(inst)}
        onToggleCompare={toggleCompare}
        isCompared={selectedInstituteForDetail ? comparedInstitutes.includes(selectedInstituteForDetail.id) : false}
      />

      <AuditBookingModal
        institute={auditModalInst}
        isOpen={!!auditModalInst}
        onClose={() => setAuditModalInst(null)}
      />

      <PlacementVerificationModal
        institute={placementVerifyInst}
        isOpen={!!placementVerifyInst}
        onClose={() => setPlacementVerifyInst(null)}
      />

      <NewInstituteModal
        isOpen={newInstModalOpen}
        onClose={() => setNewInstModalOpen(false)}
      />

      <DirectApplyModal
        institute={applyModalInst}
        isOpen={!!applyModalInst}
        onClose={() => setApplyModalInst(null)}
      />
    </div>
  );
}
