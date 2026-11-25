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
  OwnershipType,
  InstitutionCategory,
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
  Award,
  BookOpen,
} from "lucide-react";

// Expanded Pan-India and International Cities (Indian first by default)
const COMPREHENSIVE_CITIES = [
  "New Delhi",
  "Noida",
  "Greater Noida",
  "Lucknow",
  "Kanpur",
  "Varanasi",
  "Prayagraj",
  "Dehradun",
  "Pune",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Jaipur",
  "Chandigarh",
  "Patna",
  "Bhopal",
  "Abroad (USA / UK / Global)",
];

export default function InstitutesDirectory() {
  const navigate = useNavigate();
  const allInstitutes = useMemo(() => loadInstitutes(), []);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "college" | "school">("all");
  const [selectedLevel, setSelectedLevel] = useState<"all" | EducationLevel>("all");
  const [selectedBoard, setSelectedBoard] = useState<"all" | BoardType>("all");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"all" | InstitutionCategory>("all");
  const [selectedOwnership, setSelectedOwnership] = useState<"all" | OwnershipType>("all");
  const [placementOnly, setPlacementOnly] = useState<boolean>(false);
  const [auditOnly, setAuditOnly] = useState<boolean>(false);
  const [maxFee, setMaxFee] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"rank" | "fee_low" | "placement" | "rating">("rank");
  const [visibleCount, setVisibleCount] = useState<number>(9);

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

  // Toggle multi-select city
  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  // Query Results
  const filteredInstitutes = useMemo(() => {
    return queryInstitutes({
      searchQuery,
      type: selectedType,
      level: selectedLevel,
      board: selectedBoard,
      cities: selectedCities.length > 0 ? selectedCities : undefined,
      category: selectedCategory,
      ownership: selectedOwnership,
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
    selectedCities,
    selectedCategory,
    selectedOwnership,
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

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedLevel("all");
    setSelectedBoard("all");
    setSelectedCities([]);
    setSelectedCategory("all");
    setSelectedOwnership("all");
    setPlacementOnly(false);
    setAuditOnly(false);
    setMaxFee(0);
    setSortBy("rank");
  };

  const handleRunAnalysis = () => {
    const res = analyzeStudentMarksAndPreferences({
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
    setCalculatorResult(res);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* CLEAN ELEVATED HEADER BANNER */}
      <section className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white pt-8 pb-10 px-4 shadow-lg overflow-hidden">
        {/* Map Grid Texture */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 10px 10px, white 2px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="container max-w-7xl mx-auto relative z-10 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-sm">
                <Compass className="h-3.5 w-3.5 text-amber-300" />
                <span>India's 100% Transparent School & College Navigation Map</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Schools & Colleges Directory
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <Button
                size="sm"
                onClick={() => setShowCalculator(!showCalculator)}
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs gap-1.5 shadow-md h-9"
              >
                <Sparkles className="h-3.5 w-3.5" />
                {showCalculator ? "Hide Marks Analyzer" : "Marks & Stream Analyzer"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNewInstModalOpen(true)}
                className="border-white/30 text-white hover:bg-white/10 text-xs gap-1.5 h-9"
              >
                <Plus className="h-3.5 w-3.5" />
                Add School / College
              </Button>
            </div>
          </div>

          {/* Quick Level Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-blue-200/80 mr-1 font-medium">Stage:</span>
            {[
              { id: "all", label: "All Institutions" },
              { id: "class_8_10", label: "Class 8th - 10th (Board Guidance)" },
              { id: "class_11_12", label: "Class 11th - 12th (Streams)" },
              { id: "ug", label: "Undergraduate (UG)" },
              { id: "pg", label: "Postgraduate & Research" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedLevel(tab.id as any)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
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

      {/* MARKS & STREAM ANALYZER (Compact & Neat) */}
      {showCalculator && (
        <section className="container max-w-4xl mx-auto px-4 -mt-4 relative z-20">
          <Card className="border border-amber-300 dark:border-amber-700 shadow-lg bg-gradient-to-br from-amber-50/80 via-white to-blue-50/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
            <CardHeader className="py-2.5 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <Sparkles className="h-4 w-4" />
                  <CardTitle className="text-sm font-bold">Marks & Stream Analyser</CardTitle>
                </div>
                <Badge className="bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 text-[10px] py-0 px-2">
                  Class 8th, 10th & 12th
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 px-4 pb-4 pt-0">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[10px] font-semibold text-muted-foreground block">Current Stage</label>
                  <select
                    value={currentClassInput}
                    onChange={(e) => setCurrentClassInput(e.target.value as any)}
                    className="w-full mt-0.5 px-2 py-1 border rounded bg-background text-[11px] font-medium h-7"
                  >
                    <option value="class_8">Class 8th</option>
                    <option value="class_10">Class 10th</option>
                    <option value="class_12">Class 12th</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground block">Maths (%)</label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={mathScore}
                    onChange={(e) => setMathScore(Number(e.target.value))}
                    className="mt-0.5 h-7 text-[11px] px-2"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground block">Science (%)</label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={scienceScore}
                    onChange={(e) => setScienceScore(Number(e.target.value))}
                    className="mt-0.5 h-7 text-[11px] px-2"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground block">English (%)</label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={englishScore}
                    onChange={(e) => setEnglishScore(Number(e.target.value))}
                    className="mt-0.5 h-7 text-[11px] px-2"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground block">Social Sci (%)</label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={socialScore}
                    onChange={(e) => setSocialScore(Number(e.target.value))}
                    className="mt-0.5 h-7 text-[11px] px-2"
                  />
                </div>
              </div>

              {/* Interests toggles - compact row */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[10px] font-semibold text-muted-foreground mr-1">Interests:</span>
                <button
                  type="button"
                  onClick={() => setTechInterest(!techInterest)}
                  className={`px-2 py-0.5 rounded-full border text-[11px] transition-all ${
                    techInterest ? "bg-blue-600 text-white border-blue-600 font-semibold" : "bg-muted/40 hover:bg-muted"
                  }`}
                >
                  💻 Tech
                </button>
                <button
                  type="button"
                  onClick={() => setMedicalInterest(!medicalInterest)}
                  className={`px-2 py-0.5 rounded-full border text-[11px] transition-all ${
                    medicalInterest ? "bg-red-600 text-white border-red-600 font-semibold" : "bg-muted/40 hover:bg-muted"
                  }`}
                >
                  🩺 Medicine
                </button>
                <button
                  type="button"
                  onClick={() => setBusinessInterest(!businessInterest)}
                  className={`px-2 py-0.5 rounded-full border text-[11px] transition-all ${
                    businessInterest ? "bg-amber-600 text-white border-amber-600 font-semibold" : "bg-muted/40 hover:bg-muted"
                  }`}
                >
                  📊 Business
                </button>
                <button
                  type="button"
                  onClick={() => setSportsInterest(!sportsInterest)}
                  className={`px-2 py-0.5 rounded-full border text-[11px] transition-all ${
                    sportsInterest ? "bg-emerald-600 text-white border-emerald-600 font-semibold" : "bg-muted/40 hover:bg-muted"
                  }`}
                >
                  ⚽ Sports
                </button>

                <div className="ml-auto">
                  <Button size="sm" onClick={handleRunAnalysis} className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold gap-1 h-7 px-3">
                    <Sparkles className="h-3 w-3" />
                    Analyse Marks
                  </Button>
                </div>
              </div>

              {/* Results Preview */}
              {calculatorResult && (
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-blue-300 dark:border-blue-800 space-y-2 mt-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="p-2 rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-200">
                      <div className="text-[10px] font-bold text-blue-900 dark:text-blue-200">Strong Subjects</div>
                      <ul className="mt-1 space-y-0.5 text-[11px]">
                        {calculatorResult.strongAreas.map((area, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-blue-600 flex-shrink-0" />
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200">
                      <div className="text-[10px] font-bold text-emerald-900 dark:text-emerald-200">Recommended Streams & Boards</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {calculatorResult.recommendedBoards.map((b) => (
                          <Badge key={b} className="bg-emerald-600 text-white text-[9px] py-0 px-1.5">Board: {b}</Badge>
                        ))}
                        {calculatorResult.recommendedStreams.map((s) => (
                          <Badge key={s} variant="outline" className="text-emerald-950 dark:text-emerald-200 text-[9px] py-0 px-1.5">{s}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/30 border border-purple-200">
                      <div className="text-[10px] font-bold text-purple-900 dark:text-purple-200">Suggested Careers</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {calculatorResult.careerPaths.map((cp) => (
                          <Badge key={cp} variant="secondary" className="text-[9px] py-0 px-1.5">{cp}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      )}

      {/* Main Exploration Controls */}
      <section className="container max-w-7xl mx-auto px-4 mt-6 space-y-5">
        {/* Search & Quick Filters Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border space-y-3.5">
          <div className="flex flex-col lg:flex-row items-center gap-3">
            {/* Dynamic Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${allInstitutes.length}+ schools & colleges by name, city, courses, or board (e.g. IIT, DPS, UP Board, Pune)...`}
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
                className="text-xs flex-1 lg:flex-none h-10"
              >
                All ({allInstitutes.length})
              </Button>
              <Button
                variant={selectedType === "school" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("school")}
                className="text-xs flex-1 lg:flex-none gap-1.5 h-10"
              >
                <School className="h-3.5 w-3.5" /> Schools ({allInstitutes.filter((i) => i.type === "school").length})
              </Button>
              <Button
                variant={selectedType === "college" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("college")}
                className="text-xs flex-1 lg:flex-none gap-1.5 h-10"
              >
                <Building className="h-3.5 w-3.5" /> Colleges ({allInstitutes.filter((i) => i.type === "college").length})
              </Button>
            </div>
          </div>

          {/* Granular Filter Row: Board, Category, Ownership, Toggles */}
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

            {/* Institution Category */}
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full mt-1 p-2 border rounded-md bg-background text-xs"
              >
                <option value="all">Govt & Private</option>
                <option value="government">Government Only</option>
                <option value="private">Private Only</option>
              </select>
            </div>

            {/* Ownership */}
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">Ownership</label>
              <select
                value={selectedOwnership}
                onChange={(e) => setSelectedOwnership(e.target.value as any)}
                className="w-full mt-1 p-2 border rounded-md bg-background text-xs"
              >
                <option value="all">All Ownerships</option>
                <option value="central_govt">Central Government</option>
                <option value="state_govt">State Government</option>
                <option value="deemed">Deemed University</option>
                <option value="private">Private Institution</option>
                <option value="international">International / Autonomous</option>
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
                <span>Verified Placements</span>
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
                <span>Audited Labs Only</span>
              </button>
            </div>

            {/* Sort By & Reset */}
            <div className="flex items-center gap-1.5">
              <div className="flex-1">
                <label className="text-[11px] font-semibold text-muted-foreground">Sort</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full mt-1 p-2 border rounded-md bg-background text-xs"
                >
                  <option value="rank">Overall Rank</option>
                  <option value="placement">Highest CTC</option>
                  <option value="rating">Rating (/10)</option>
                  <option value="fee_low">Lowest Fee</option>
                </select>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="h-8 mt-4 text-xs text-muted-foreground p-2"
                title="Reset all filters"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Multi-Select Cities Filter Pills */}
          <div className="pt-2 border-t space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-semibold flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-blue-600" /> Filter by Cities / Geography (Multi-Select):
              </span>
              {selectedCities.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedCities([])}
                  className="text-blue-600 hover:underline font-medium text-[11px]"
                >
                  Clear Selected Cities ({selectedCities.length})
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {COMPREHENSIVE_CITIES.map((city) => {
                const isSelected = selectedCities.includes(city);
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => toggleCity(city)}
                    className={`px-2.5 py-1 rounded-full text-xs transition-all border ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 font-bold shadow-sm"
                        : "bg-muted/40 hover:bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {city} {isSelected && "✓"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <div>
            Showing <strong className="text-foreground">{filteredInstitutes.length}</strong> institutions matching your map criteria
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" /> Corporate Verified
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 ml-2" /> Self-Reported
          </div>
        </div>

        {/* Institutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstitutes.slice(0, visibleCount).map((inst) => {
            const isCompared = comparedInstitutes.includes(inst.id);
            const isPlacementVerified = inst.placement.status === "verified";
            const isAuditVerified = inst.audit.status === "verified";
            const isSchool = inst.type === "school";

            return (
              <Card
                key={inst.id}
                onClick={() => setSelectedInstituteForDetail(inst)}
                className={`cursor-pointer overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative flex flex-col justify-between ${
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Badge
                        className={`text-[10px] font-bold px-2 py-0.5 ${
                          isSchool ? "bg-amber-400 text-amber-950" : "bg-emerald-400 text-emerald-950"
                        }`}
                      >
                        {isSchool ? "School" : "College"}
                      </Badge>
                      <Badge className="bg-black/60 backdrop-blur-md text-white text-[10px]">
                        {inst.institutionCategory === "government" ? "Govt" : "Private"}
                      </Badge>
                      {inst.ownershipType && (
                        <Badge className="bg-blue-600/70 backdrop-blur-md text-white text-[10px] uppercase">
                          {inst.ownershipType.replace("_", " ")}
                        </Badge>
                      )}
                    </div>
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
                <CardContent className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                  {/* Verification / Academic Badges */}
                  <div className="space-y-1.5">
                    {!isSchool ? (
                      // College Placement Tag
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlacementVerifyInst(inst);
                        }}
                        className={`p-2 rounded-lg border flex items-center justify-between cursor-pointer hover:opacity-95 transition-opacity ${
                          isPlacementVerified
                            ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                            : "bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200"
                        }`}
                        title="Click to view corporate verification procedure"
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
                          Avg: ₹{inst.placement.averagePackageLPA} LPA
                        </span>
                      </div>
                    ) : (
                      // School Academic Results Tag (No Placement Data!)
                      <div className="p-2 rounded-lg border bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold">
                          <BookOpen className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          <span>BOARD EXCELLENCE TRACK</span>
                        </div>
                        <span className="text-[10px] font-semibold">100% Pass Rate</span>
                      </div>
                    )}

                    {/* Physical Audit Tag */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setAuditModalInst(inst);
                      }}
                      className={`p-2 rounded-lg border flex items-center justify-between cursor-pointer hover:opacity-95 transition-opacity ${
                        isAuditVerified
                          ? "bg-blue-50 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200"
                          : "bg-orange-50 dark:bg-orange-950/25 border-orange-300 dark:border-orange-800 text-orange-950 dark:text-orange-200"
                      }`}
                      title="Click to view campus audit procedure"
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        {isAuditVerified ? (
                          <FileCheck className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-orange-600 flex-shrink-0" />
                        )}
                        <span>{isAuditVerified ? "AUDIT VERIFIED" : "CAMPUS AUDIT: PENDING"}</span>
                      </div>
                      <span className="text-[10px] font-semibold">
                        {isAuditVerified ? `${inst.audit.randomStudentInterviewCount} Students Sampled` : "Click to Audit"}
                      </span>
                    </div>
                  </div>

                  {/* Financial & Calibrated 10.0 Rating Highlights */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-muted/40 text-[11px]">
                    <div>
                      <span className="text-muted-foreground">Annual Tuition:</span>
                      <div className="font-bold text-foreground">
                        ₹{inst.feeStructure.tuitionPerYear.toLocaleString("en-IN")}/yr
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rating Score:</span>
                      <div className="font-bold text-amber-600 dark:text-amber-400">
                        ⭐ {inst.ratings.overall} / 10.0
                      </div>
                    </div>
                  </div>

                  {/* Key Advantage */}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInstituteForDetail(inst);
                        }}
                      >
                        Explore Profile
                      </Button>
                      <Button
                        variant={isCompared ? "destructive" : "outline"}
                        size="sm"
                        className="text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompare(inst);
                        }}
                      >
                        {isCompared ? "Remove" : "+ Compare"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                      <a
                        href={`tel:${inst.contact.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-blue-600 inline-flex items-center gap-1"
                      >
                        <Phone className="h-3 w-3" /> Call
                      </a>
                      <a
                        href={`https://wa.me/${inst.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-emerald-600 inline-flex items-center gap-1 text-emerald-600"
                      >
                        <MessageCircle className="h-3 w-3" /> WhatsApp
                      </a>
                      <a
                        href={inst.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-foreground inline-flex items-center gap-1"
                      >
                        Website <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More Button */}
        {filteredInstitutes.length > visibleCount && (
          <div className="text-center pt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className="text-xs px-8"
            >
              Load More Institutions ({filteredInstitutes.length - visibleCount} remaining)
            </Button>
          </div>
        )}
      </section>

      {/* Floating Side-by-Side Compare Bar */}
      {comparedInstitutes.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-950 text-white border border-slate-700 px-5 py-3 rounded-full shadow-2xl flex items-center gap-4 text-xs backdrop-blur-lg">
          <Scale className="h-4 w-4 text-amber-400" />
          <span>
            <strong className="text-amber-400">{comparedInstitutes.length}</strong> institute(s) selected for comparison
          </span>
          <Button
            size="sm"
            onClick={() => navigate(`/compare?ids=${comparedInstitutes.join(",")}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-7 px-3"
          >
            Compare Side-by-Side →
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setComparedInstitutes([])}
            className="text-xs text-slate-400 hover:text-white h-7 px-2"
          >
            Clear
          </Button>
        </div>
      )}

      {/* Modals */}
      <InstituteDetailModal
        institute={selectedInstituteForDetail}
        isOpen={!!selectedInstituteForDetail}
        onClose={() => setSelectedInstituteForDetail(null)}
        onOpenAuditBooking={(inst) => {
          setSelectedInstituteForDetail(null);
          setAuditModalInst(inst);
        }}
        onOpenPlacementVerification={(inst) => {
          setSelectedInstituteForDetail(null);
          setPlacementVerifyInst(inst);
        }}
        onOpenApply={(inst) => {
          setSelectedInstituteForDetail(null);
          setApplyModalInst(inst);
        }}
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
