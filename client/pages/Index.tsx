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
  Search,
  Lightbulb,
  TrendingUp,
  Users,
  MapPin,
  Briefcase,
  GraduationCap,
  Building,
  Zap,
  Star,
  Play,
  Download,
  Bell,
} from "lucide-react";

export default function Index() {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    jobsListed: 0,
    businessIdeas: 0,
    successStories: 0,
    students: 0,
  });

  useEffect(() => {
    const targets = {
      jobsListed: 15000,
      businessIdeas: 500,
      successStories: 2500,
      students: 50000,
    };

    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;

    const increments = {
      jobsListed: targets.jobsListed / steps,
      businessIdeas: targets.businessIdeas / steps,
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
        businessIdeas: Math.min(
          Math.floor(increments.businessIdeas * currentStep),
          targets.businessIdeas,
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

  const jobsFeatures = [
    {
      icon: Target,
      title: "By Goal",
      description:
        "Interactive career roadmap from your current stage to dream job",
      color: "from-career-primary to-purple-600",
      href: "/jobs/by-goal",
      badge: "Interactive",
    },
    {
      icon: Heart,
      title: "By Interest",
      description:
        "Discover careers based on your passions and subjects you love",
      color: "from-pink-500 to-rose-500",
      href: "/jobs/by-interest",
      badge: "Personalized",
    },
    {
      icon: Search,
      title: "Latest Vacancies",
      description:
        "Real-time government and private job openings with application guides",
      color: "from-career-secondary to-green-600",
      href: "/jobs/vacancies",
      badge: "Live Updates",
    },
  ];

  const businessFeatures = [
    {
      icon: Lightbulb,
      title: "Business Ideas",
      description:
        "Categorized business opportunities with complete startup guides",
      color: "from-yellow-500 to-orange-500",
      href: "/business/ideas",
    },
    {
      icon: Building,
      title: "Documentation Help",
      description:
        "Required permits, licenses, and legal documentation guidance",
      color: "from-blue-500 to-indigo-500",
      href: "/business/documentation",
    },
    {
      icon: TrendingUp,
      title: "ROI Calculator",
      description:
        "Investment requirements and projected returns for each business",
      color: "from-career-secondary to-teal-500",
      href: "/business/calculator",
    },
  ];

  const trendingJobs = [
    {
      title: "Software Developer",
      category: "Technology",
      applications: "2.5K+",
      deadline: "15 Dec",
    },
    {
      title: "Digital Marketing",
      category: "Marketing",
      applications: "1.8K+",
      deadline: "20 Dec",
    },
    {
      title: "Data Analyst",
      category: "Analytics",
      applications: "3.2K+",
      deadline: "18 Dec",
    },
    {
      title: "Content Creator",
      category: "Creative",
      applications: "950+",
      deadline: "25 Dec",
    },
  ];

  const trendingBusiness = [
    {
      title: "E-commerce Store",
      category: "Retail",
      investment: "₹50K-2L",
      roi: "25-40%",
    },
    {
      title: "Food Delivery",
      category: "Food & Beverage",
      investment: "₹1L-5L",
      roi: "20-35%",
    },
    {
      title: "Digital Agency",
      category: "Services",
      investment: "₹25K-1L",
      roi: "30-50%",
    },
    {
      title: "Ed-Tech Platform",
      category: "Education",
      investment: "₹2L-10L",
      roi: "40-60%",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-gradient-to-r from-career-primary/5 via-transparent to-career-secondary/5"></div>
        <div className="container relative px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium"
              >
                <Zap className="h-4 w-4 mr-2" />
                Your Complete Career & Business Roadmap
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Navigate Your
                <span className="bg-gradient-to-r from-career-primary via-career-secondary to-career-accent bg-clip-text text-transparent">
                  {" "}
                  Career Journey
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From school to success - discover your perfect career path,
                explore business opportunities, and get step-by-step guidance to
                achieve your professional dreams.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-career-primary to-career-secondary hover:opacity-90 text-lg px-8 py-6"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Start Career Mapping
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>

              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-career-primary">
                  {animatedNumbers.jobsListed.toLocaleString()}+
                </div>
                <div className="text-sm text-muted-foreground">Jobs Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-career-secondary">
                  {animatedNumbers.businessIdeas}+
                </div>
                <div className="text-sm text-muted-foreground">
                  Business Ideas
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-career-accent">
                  {animatedNumbers.successStories.toLocaleString()}+
                </div>
                <div className="text-sm text-muted-foreground">
                  Success Stories
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-career-primary">
                  {animatedNumbers.students.toLocaleString()}+
                </div>
                <div className="text-sm text-muted-foreground">
                  Students Guided
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-24 bg-muted/20">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Briefcase className="h-8 w-8 text-career-primary" />
                <h2 className="text-4xl md:text-5xl font-bold">
                  Career Guidance
                </h2>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Three powerful ways to discover and plan your ideal career path
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {jobsFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                  ></div>

                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white`}
                      >
                        <feature.icon className="h-6 w-6" />
                      </div>
                      {feature.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-career-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative">
                    <Link to={feature.href}>
                      <Button className="w-full group/btn" variant="outline">
                        Explore Now
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section className="py-24">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Building className="h-8 w-8 text-career-secondary" />
                <h2 className="text-4xl md:text-5xl font-bold">
                  Business Opportunities
                </h2>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Start your entrepreneurial journey with complete guidance and
                support
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {businessFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                  ></div>

                  <CardHeader className="relative">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white w-fit mb-4`}
                    >
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-career-secondary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative">
                    <Link to={feature.href}>
                      <Button className="w-full group/btn" variant="outline">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-24 bg-muted/20">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                What's Trending
              </h2>
              <p className="text-xl text-muted-foreground">
                Most popular opportunities right now
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Trending Jobs */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-6 w-6 text-career-primary" />
                  <h3 className="text-2xl font-bold">Trending Jobs</h3>
                </div>
                <div className="space-y-4">
                  {trendingJobs.map((job, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{job.title}</h4>
                              <Badge variant="outline" className="text-xs">
                                {job.category}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {job.applications}
                              </span>
                              <span className="flex items-center gap-1">
                                <Bell className="h-3 w-3" />
                                Deadline: {job.deadline}
                              </span>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Link to="/jobs/vacancies">
                  <Button variant="outline" className="w-full mt-4">
                    View All Jobs
                  </Button>
                </Link>
              </div>

              {/* Trending Business */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Star className="h-6 w-6 text-career-secondary" />
                  <h3 className="text-2xl font-bold">Trending Business</h3>
                </div>
                <div className="space-y-4">
                  {trendingBusiness.map((business, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">
                                {business.title}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {business.category}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Investment: {business.investment}</span>
                              <span>ROI: {business.roi}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Link to="/business">
                  <Button variant="outline" className="w-full mt-4">
                    Explore Business Ideas
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-career-primary to-career-secondary">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center text-white space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of students and professionals who have already
              found their path to success. Start your journey today and unlock
              unlimited possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6"
              >
                <GraduationCap className="h-5 w-5 mr-2" />
                Start Free Assessment
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-career-primary"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Career Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
