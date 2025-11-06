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
  Target,
  Heart,
  Search,
  ArrowRight,
  MapPin,
  Briefcase,
  TrendingUp,
  Users,
  Clock,
  Star,
  Zap,
  GraduationCap,
  Building,
} from "lucide-react";

export default function JobsLanding() {
  const jobPathways = [
    {
      icon: Target,
      title: "By Goal",
      subtitle: "Career Roadmap",
      description:
        "Start with your dream job and get a personalized step-by-step roadmap from your current education stage. Our interactive career map shows you exactly what to study, which exams to take, and what skills to develop.",
      features: [
        "Interactive visual career mapping",
        "Stage-by-stage guidance (Class 10th to Professional)",
        "Stream and course recommendations",
        "Government exam preparation paths",
        "Skills and certification roadmap",
      ],
      color: "from-career-primary to-purple-600",
      href: "/jobs/by-goal",
      badge: "Most Popular",
      badgeColor: "bg-career-primary",
    },
    {
      icon: Heart,
      title: "By Interest",
      subtitle: "Passion-Driven Careers",
      description:
        "Discover career opportunities based on subjects and topics you're passionate about. From Arts to Quantum Physics, find careers that align with your interests and natural inclinations.",
      features: [
        "Subject and topic-based matching",
        "Interest assessment tools",
        "Multiple career options per interest",
        "Trending fields and emerging careers",
        "Salary and growth potential insights",
      ],
      color: "from-pink-500 to-rose-500",
      href: "/jobs/by-interest",
      badge: "Personalized",
      badgeColor: "bg-pink-500",
    },
    {
      icon: Search,
      title: "Latest Vacancies",
      subtitle: "Real-Time Opportunities",
      description:
        "Access the latest government and private job openings with complete application guidance. Get notifications for jobs matching your profile and never miss an opportunity.",
      features: [
        "Live job listings from 500+ sources",
        "Government jobs (SSC, UPSC, Railway, Banking)",
        "Private sector opportunities",
        "Application deadlines and fee details",
        "Video tutorials for form filling",
      ],
      color: "from-career-secondary to-green-600",
      href: "/jobs/vacancies",
      badge: "Live Updates",
      badgeColor: "bg-career-secondary",
    },
  ];

  const quickStats = [
    {
      icon: Briefcase,
      number: "15,000+",
      label: "Active Job Listings",
      color: "text-career-primary",
    },
    {
      icon: Users,
      number: "50K+",
      label: "Students Guided",
      color: "text-career-secondary",
    },
    {
      icon: TrendingUp,
      number: "89%",
      label: "Success Rate",
      color: "text-career-accent",
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Support Available",
      color: "text-purple-600",
    },
  ];

  const popularCareers = [
    { name: "Software Engineering", growth: "+25%", avg_salary: "₹8-15 LPA" },
    { name: "Data Science", growth: "+30%", avg_salary: "₹10-20 LPA" },
    { name: "Digital Marketing", growth: "+20%", avg_salary: "₹5-12 LPA" },
    { name: "Civil Services", growth: "+15%", avg_salary: "₹7-12 LPA" },
    { name: "Healthcare", growth: "+22%", avg_salary: "₹6-18 LPA" },
    { name: "Finance & Banking", growth: "+18%", avg_salary: "₹8-16 LPA" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted/20 py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-career-primary/5 via-transparent to-career-secondary/5"></div>

        <div className="container relative px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Briefcase className="h-10 w-10 text-career-primary" />
              <h1 className="text-5xl md:text-6xl font-bold">
                Career Guidance
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Three powerful pathways to discover, plan, and achieve your ideal
              career. Whether you know your goal, follow your passion, or seek
              opportunities - we've got you covered.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <GraduationCap className="h-4 w-4 mr-2" />
                Class 10th to PhD
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Building className="h-4 w-4 mr-2" />
                All Industries
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Star className="h-4 w-4 mr-2" />
                Personalized Guidance
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-muted/10">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className={`text-3xl font-bold ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Pathways */}
      <section className="py-24">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Choose Your Career Discovery Path
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Each path is designed for different starting points and
                preferences. Pick the one that resonates with your current
                situation.
              </p>
            </div>

            <div className="space-y-8">
              {jobPathways.map((pathway, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${pathway.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                  ></div>

                  <div className="flex flex-col lg:flex-row">
                    {/* Left Content */}
                    <div className="flex-1 p-8 lg:p-12">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`p-4 rounded-xl bg-gradient-to-br ${pathway.color} text-white`}
                        >
                          <pathway.icon className="h-8 w-8" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl md:text-3xl font-bold">
                              {pathway.title}
                            </h3>
                            <Badge
                              className={`${pathway.badgeColor} text-white text-xs`}
                            >
                              {pathway.badge}
                            </Badge>
                          </div>
                          <p className="text-lg text-muted-foreground">
                            {pathway.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-lg mb-6 leading-relaxed">
                        {pathway.description}
                      </p>

                      <div className="space-y-3 mb-8">
                        {pathway.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-3"
                          >
                            <div className="w-2 h-2 rounded-full bg-career-primary"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Link to={pathway.href}>
                        <Button
                          size="lg"
                          className="group/btn bg-gradient-to-r from-career-primary to-career-secondary hover:opacity-90 text-lg px-8"
                        >
                          <MapPin className="h-5 w-5 mr-2" />
                          Start This Path
                          <ArrowRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>

                    {/* Right Visual */}
                    <div className="lg:w-80 p-8 lg:p-12 flex items-center justify-center">
                      <div className="relative">
                        <div
                          className={`w-32 h-32 rounded-full bg-gradient-to-br ${pathway.color} opacity-20 animate-pulse`}
                        ></div>
                        <div
                          className={`absolute inset-4 rounded-full bg-gradient-to-br ${pathway.color} opacity-40`}
                        ></div>
                        <div
                          className={`absolute inset-8 rounded-full bg-gradient-to-br ${pathway.color} flex items-center justify-center text-white`}
                        >
                          <pathway.icon className="h-12 w-12" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Careers */}
      <section className="py-24 bg-muted/20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Popular Career Tracks</h2>
              <p className="text-xl text-muted-foreground">
                Most sought-after careers with high growth potential
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCareers.map((career, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">{career.name}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-career-secondary">
                          <TrendingUp className="h-4 w-4" />
                          Growth: {career.growth}
                        </span>
                        <span className="text-muted-foreground">
                          {career.avg_salary}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-career-primary to-career-secondary">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center text-white space-y-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-8 w-8" />
              <h2 className="text-4xl md:text-5xl font-bold">
                Start Your Career Journey Today
              </h2>
            </div>

            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Don't wait for the perfect moment. Every successful career starts
              with a single step. Take yours today and unlock unlimited
              possibilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/jobs/by-goal">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6"
                >
                  <Target className="h-5 w-5 mr-2" />
                  Start Career Mapping
                </Button>
              </Link>

              <Link to="/jobs/by-interest">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-career-primary"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Explore by Interest
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
