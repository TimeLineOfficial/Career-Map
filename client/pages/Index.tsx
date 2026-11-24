import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Target,
  Heart,
  TrendingUp,
  Users,
  MapPin,
  Briefcase,
  GraduationCap,
  Building,
  Zap,
  Scale,
  ShieldCheck,
  FileCheck,
  Compass,
  Star,
  ExternalLink,
} from "lucide-react";
import { useDataStore } from "@/lib/data-service";
import { loadInstitutes, Institute } from "@/lib/institutes-dataset";
import InstituteDetailModal from "@/components/institutes/InstituteDetailModal";

export default function Index() {
  const { getText } = useDataStore();
  const navigate = useNavigate();
  const [allInstitutes] = useState<Institute[]>(() => loadInstitutes());
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [animatedNumbers, setAnimatedNumbers] = useState({
    jobsListed: 0,
    institutesMapped: 0,
    successStories: 0,
    students: 0,
  });

  useEffect(() => {
    const targets = {
      jobsListed: 4125,
      institutesMapped: allInstitutes.length || 500,
      successStories: 687,
      students: 13750,
    };

    const duration = 1500;
    const interval = 40;
    const steps = duration / interval;

    const increments = {
      jobsListed: targets.jobsListed / steps,
      institutesMapped: targets.institutesMapped / steps,
      successStories: targets.successStories / steps,
      students: targets.students / steps,
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setAnimatedNumbers({
        jobsListed: Math.min(
          Math.floor(increments.jobsListed * currentStep),
          targets.jobsListed,
        ),
        institutesMapped: Math.min(
          Math.floor(increments.institutesMapped * currentStep),
          targets.institutesMapped,
        ),
        successStories: Math.min(
          Math.floor(increments.successStories * currentStep),
          targets.successStories,
        ),
        students: Math.min(
          Math.floor(increments.students * currentStep),
          targets.students,
        ),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [allInstitutes.length]);

  const coreFeatures = [
    {
      icon: Building,
      title: "Schools & Colleges Directory",
      description:
        "Explore 500+ schools and colleges with corporate-verified placement data, authentic campus audits, and granular fees.",
      color: "from-blue-600 to-indigo-600",
      href: "/institutes",
      badge: "Verified Registry",
      highlight: `${allInstitutes.length}+ Campuses Mapped`,
    },
    {
      icon: Scale,
      title: "Side-by-Side Compare",
      description:
        "Compare actual packages, pros & cons, verified reviews, and ratings side-by-side to make the right institutional choice.",
      color: "from-indigo-600 to-purple-600",
      href: "/compare",
      badge: "Decision Engine",
      highlight: "Direct Metrics Comparison",
    },
    {
      icon: Target,
      title: "By Career Goal",
      description:
        "Personalized milestone roadmap from Class 8/10th or 12th directly to your dream career, competitive exams, and degrees.",
      color: "from-purple-600 to-pink-600",
      href: "/jobs/by-goal",
      badge: "Goal Roadmap",
      highlight: "Step-by-Step Path",
    },
    {
      icon: Heart,
      title: "By Subject & Interest",
      description:
        "Discover emerging careers, courses, and institutes matching Indian school and college subjects you actually enjoy.",
      color: "from-pink-500 to-rose-500",
      href: "/jobs/by-interest",
      badge: "Passion Driven",
      highlight: "Aligned with NEP 2020",
    },
  ];

  const trendingJobs = [
    {
      title: "Software Engineer / AI Developer",
      category: "Technology",
      package: "₹8 - 45 LPA",
      growth: "High Growth",
    },
    {
      title: "Chartered Accountant / Financial Analyst",
      category: "Commerce",
      package: "₹7 - 35 LPA",
      growth: "High Demand",
    },
    {
      title: "Medical Specialist / Clinical Researcher",
      category: "Health Sciences",
      package: "₹10 - 50 LPA",
      growth: "Evergreen",
    },
    {
      title: "Design & Product Specialist",
      category: "Creative Arts",
      package: "₹6 - 28 LPA",
      growth: "Rapid Expansion",
    },
  ];

  const handleOpenInstituteModal = (inst: Institute) => {
    setSelectedInstitute(inst);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        
        {/* Subtle Map Coordinate Grid */}
        <div className="absolute inset-0 map-grid-pattern opacity-40 pointer-events-none" />

        <div className="container relative px-4 pt-10 pb-14 max-w-6xl mx-auto space-y-8">
          {/* Header Layout: Left-Aligned Heading & Right-Aligned Subtitle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div className="space-y-3 text-left max-w-xl">
              <Badge
                variant="secondary"
                className="px-3.5 py-1.5 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 inline-flex items-center gap-1.5"
              >
                <Compass className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                {getText("site_tagline")}
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                <span>{getText("hero_title_1")} </span>
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {getText("hero_title_2")}
                </span>
              </h1>
            </div>
            <div className="text-left md:text-right max-w-md space-y-2">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {getText("hero_subtitle")}
              </p>
              <div className="flex items-center md:justify-end gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{allInstitutes.length}+ Verified Institutions Active</span>
              </div>
            </div>
          </div>

          {/* 4 Core Features in a 2x2 Prominent Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left pt-2">
            {coreFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border border-border/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between bg-card/95 backdrop-blur-sm p-1"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}
                />

                <CardHeader className="relative p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-md`}
                      >
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base sm:text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {feature.title}
                        </CardTitle>
                        <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                          {feature.highlight}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-semibold px-2 py-0.5">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative p-5 pt-0">
                  <Link to={feature.href}>
                    <Button className="w-full text-xs h-9 font-semibold" variant="outline">
                      Explore Feature
                      <ArrowRight className="h-3.5 w-3.5 ml-2 group-hover:translate-x-1 transition-transform text-blue-600" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dynamic Trust Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/60 max-w-4xl mx-auto">
            <div className="text-center p-3">
              <div className="text-2xl md:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                {animatedNumbers.jobsListed.toLocaleString()}+
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{getText("stat_jobs")}</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl md:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {animatedNumbers.institutesMapped}+
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{getText("stat_institutes")}</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {animatedNumbers.successStories.toLocaleString()}+
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{getText("stat_success")}</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl md:text-3xl font-extrabold text-purple-600 dark:text-purple-400">
                {animatedNumbers.students.toLocaleString()}+
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{getText("stat_students")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlighted Registry: Verified Institutes & In-Demand Career Tracks */}
      <section className="py-14">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Column 1: Top Verified Institutes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-foreground">Verified Institutes</h3>
                </div>
                <Link to="/institutes" className="text-xs font-semibold text-blue-600 hover:underline">
                  View All ({allInstitutes.length}+) →
                </Link>
              </div>

              <div className="space-y-3">
                {allInstitutes.slice(0, 4).map((inst) => (
                  <Card
                    key={inst.id}
                    onClick={() => handleOpenInstituteModal(inst)}
                    className="border border-border/80 hover:shadow-md hover:border-blue-500/40 transition-all cursor-pointer group"
                  >
                    <CardContent className="p-3.5 flex items-center justify-between text-xs">
                      <div className="space-y-1.5 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground group-hover:text-blue-600 transition-colors">
                            {inst.name}
                          </span>
                          <Badge variant="outline" className="text-[10px] px-1 py-0 uppercase">
                            {inst.type}
                          </Badge>
                          {inst.ratings?.overall && (
                            <span className="inline-flex items-center text-amber-600 font-semibold text-[11px]">
                              <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-0.5" />
                              {inst.ratings.overall.toFixed(1)}/10
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-blue-500 flex-shrink-0" />
                          <span>{inst.location.city}, {inst.location.state}</span>
                          {inst.type !== "school" && inst.placement?.averagePackageLPA && (
                            <span className="ml-1 text-foreground font-medium">
                              • Avg: ₹{inst.placement.averagePackageLPA} LPA
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {inst.type !== "school" && (
                            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] py-0 font-medium">
                              {inst.placement?.status === "verified" ? "VERIFIED PLACEMENT" : "PLACEMENT AUDIT PENDING"}
                            </Badge>
                          )}
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-[10px] py-0 font-medium">
                            {inst.audit?.status === "verified" ? "CAMPUS AUDITED" : "AUDIT PENDING"}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 px-2 text-blue-600 flex-shrink-0">
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Column 2: In-Demand Career Tracks */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-foreground">Trending Career Paths</h3>
                </div>
                <Link to="/jobs/by-goal" className="text-xs font-semibold text-blue-600 hover:underline">
                  Plan Roadmap →
                </Link>
              </div>

              <div className="space-y-3">
                {trendingJobs.map((job, index) => (
                  <Card
                    key={index}
                    onClick={() => navigate("/jobs/by-goal")}
                    className="border border-border/80 hover:shadow-md hover:border-blue-500/40 transition-all cursor-pointer group"
                  >
                    <CardContent className="p-3.5 flex items-center justify-between text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </span>
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-2">
                          <span>{job.category}</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            Pkg: {job.package}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-[10px] text-muted-foreground">
                          {job.growth}
                        </Badge>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 px-2 text-blue-600">
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification & Anti-Manipulation Call-to-Action */}
      <section className="py-14 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white">
        <div className="container px-4 max-w-4xl mx-auto text-center space-y-4">
          <Badge className="bg-white/20 text-white text-xs backdrop-blur-md">
            Official Anti-Manipulation Guarantee
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Are You an Institute Dean or Corporate Recruiter?
          </h2>
          <p className="text-sm opacity-90 max-w-xl mx-auto leading-relaxed">
            Verify student placement packages directly from corporate HR, or request an on-site physical campus audit for your school or college.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link to="/institutes">
              <Button size="sm" variant="secondary" className="font-bold text-xs h-10 px-5">
                <ShieldCheck className="h-4 w-4 mr-1.5 text-blue-700" />
                Submit Verification Request
              </Button>
            </Link>
            <a href="mailto:career.mapofficials@gmail.com">
              <Button size="sm" variant="outline" className="font-semibold text-xs h-10 px-5 text-white border-white/50 hover:bg-white/20">
                Contact: career.mapofficials@gmail.com
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Direct Institute Modal on Click */}
      {selectedInstitute && (
        <InstituteDetailModal
          institute={selectedInstitute}
          isOpen={isDetailOpen}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedInstitute(null);
          }}
          onOpenAuditBooking={() => {
            setIsDetailOpen(false);
            navigate("/institutes");
          }}
          onOpenPlacementVerification={() => {
            setIsDetailOpen(false);
            navigate("/institutes");
          }}
          onOpenApply={() => {
            setIsDetailOpen(false);
            navigate("/institutes");
          }}
          onToggleCompare={() => {}}
          isCompared={false}
        />
      )}
    </div>
  );
}
