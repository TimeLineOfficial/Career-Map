import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import { useDataStore } from "@/lib/data-service";
import { loadInstitutes } from "@/lib/institutes-dataset";

export default function Index() {
  const { getText } = useDataStore();
  const [animatedNumbers, setAnimatedNumbers] = useState({
    jobsListed: 0,
    institutesMapped: 0,
    successStories: 0,
    students: 0,
  });

  useEffect(() => {
    const targets = {
      jobsListed: 4125,
      institutesMapped: 500,
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
  }, []);

  const coreFeatures = [
    {
      icon: Building,
      title: "Schools & Colleges Directory",
      description:
        "500+ verified institutes with corporate-checked placements and on-site audit dossiers.",
      color: "from-blue-600 to-indigo-600",
      href: "/institutes",
      badge: "Verified Data",
    },
    {
      icon: Scale,
      title: "Side-by-Side Compare",
      description:
        "Compare packages, advantages, real student reviews, and verified fees between colleges.",
      color: "from-indigo-600 to-purple-600",
      href: "/compare",
      badge: "Decision Engine",
    },
    {
      icon: Target,
      title: "By Career Goal",
      description:
        "Personalized milestone roadmap from Class 8/10th or 12th directly to your dream career.",
      color: "from-purple-600 to-pink-600",
      href: "/jobs/by-goal",
      badge: "Roadmap",
    },
    {
      icon: Heart,
      title: "By Subject & Interest",
      description:
        "Discover emerging careers matching Indian school/college subjects you actually enjoy.",
      color: "from-pink-500 to-rose-500",
      href: "/jobs/by-interest",
      badge: "Passion Driven",
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

  const topInstitutes = [
    {
      name: "IIT Bombay",
      city: "Mumbai, Maharashtra",
      type: "College",
      avgPackage: "₹21.8 LPA",
      placementStatus: "VERIFIED PLACEMENT",
      auditStatus: "AUDIT VERIFIED",
    },
    {
      name: "AIIMS New Delhi",
      city: "New Delhi, Delhi NCR",
      type: "College",
      avgPackage: "₹18.5 LPA",
      placementStatus: "VERIFIED PLACEMENT",
      auditStatus: "AUDIT VERIFIED",
    },
    {
      name: "DPS R.K. Puram",
      city: "New Delhi, Delhi NCR",
      type: "School",
      avgPackage: "99.2% Board Pass",
      placementStatus: "VERIFIED RECORD",
      auditStatus: "AUDIT VERIFIED",
    },
    {
      name: "BITS Pilani",
      city: "Pilani, Rajasthan",
      type: "College",
      avgPackage: "₹19.2 LPA",
      placementStatus: "VERIFIED PLACEMENT",
      auditStatus: "AUDIT VERIFIED",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        
        {/* Subtle Map Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 10px 10px, currentColor 1.5px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="container relative px-4 py-16 md:py-24 max-w-5xl mx-auto text-center space-y-6">
          <Badge
            variant="secondary"
            className="px-3.5 py-1.5 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 inline-flex items-center gap-1.5"
          >
            <Compass className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            {getText("site_tagline")}
          </Badge>

          {/* Clean, Refined Hero Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            <span>{getText("hero_title_1")} </span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {getText("hero_title_2")}
            </span>
          </h1>

          {/* Clear Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {getText("hero_subtitle")}
          </p>

          {/* Elevated Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link to="/institutes">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm px-6 h-12 shadow-lg shadow-blue-500/25 gap-2"
              >
                <Building className="h-4 w-4" />
                {getText("btn_explore_institutes")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link to="/compare">
              <Button
                variant="outline"
                size="lg"
                className="text-sm font-semibold px-6 h-12 gap-2 border-indigo-400/40 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-foreground"
              >
                <Scale className="h-4 w-4 text-indigo-600" />
                {getText("btn_compare_institutes")}
              </Button>
            </Link>

            <Link to="/career-map">
              <Button
                variant="secondary"
                size="lg"
                className="text-sm font-semibold px-5 h-12 gap-2"
              >
                <MapPin className="h-4 w-4 text-career-primary" />
                {getText("btn_career_roadmap")}
              </Button>
            </Link>
          </div>

          {/* Key Trust Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-border/50 max-w-3xl mx-auto">
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

      {/* Main Guided Exploration Cards */}
      <section className="py-16 bg-muted/20">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Map Your Education & Career
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Select verified schools & colleges and explore milestone-based career trajectories.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coreFeatures.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border border-border/70 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}
                />

                <CardHeader className="relative p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-md`}
                    >
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-semibold">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative p-5 pt-0">
                  <Link to={feature.href}>
                    <Button className="w-full text-xs h-9" variant="outline">
                      Explore Now
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Highlighted Registry: Verified Institutes & Career Pathways */}
      <section className="py-16">
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
                  View All ({animatedNumbers.institutesMapped}+) →
                </Link>
              </div>

              <div className="space-y-3">
                {topInstitutes.map((inst, index) => (
                  <Card key={index} className="border border-border/80 hover:shadow-md transition-shadow">
                    <CardContent className="p-3.5 flex items-center justify-between text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground">{inst.name}</span>
                          <Badge variant="outline" className="text-[10px] px-1 py-0">
                            {inst.type}
                          </Badge>
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-blue-500" />
                          <span>{inst.city}</span>
                          <span className="ml-1 text-foreground font-medium">• {inst.avgPackage}</span>
                        </div>
                        <div className="flex gap-1.5 pt-0.5">
                          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] py-0">
                            {inst.placementStatus}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-[10px] py-0">
                            {inst.auditStatus}
                          </Badge>
                        </div>
                      </div>
                      <Link to="/institutes">
                        <Button size="sm" variant="ghost" className="h-8 px-2 text-blue-600">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
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
                  <Card key={index} className="border border-border/80 hover:shadow-md transition-shadow">
                    <CardContent className="p-3.5 flex items-center justify-between text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground">{job.title}</span>
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
                      <Link to="/jobs/by-interest">
                        <Button size="sm" variant="ghost" className="h-8 px-2 text-blue-600">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Direct Call-to-Action */}
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
    </div>
  );
}
