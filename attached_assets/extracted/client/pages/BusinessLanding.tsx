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
import { Progress } from "@/components/ui/progress";
import {
  Building,
  Lightbulb,
  Calculator,
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  ArrowRight,
  Play,
  Download,
  Star,
  Clock,
  Target,
  Zap,
  Award,
  Briefcase,
  PieChart,
  BookOpen,
  Shield,
  Rocket,
  Globe,
} from "lucide-react";

export default function BusinessLanding() {
  const businessPathways = [
    {
      icon: Lightbulb,
      title: "Business Ideas",
      subtitle: "Discover Opportunities",
      description:
        "Explore categorized business opportunities with complete startup guides, market analysis, and success stories from real entrepreneurs.",
      features: [
        "500+ categorized business ideas",
        "Investment requirements breakdown",
        "Market opportunity analysis",
        "Success rate statistics",
        "Step-by-step implementation guides",
      ],
      color: "from-yellow-500 to-orange-500",
      href: "/business/ideas",
      badge: "Most Popular",
      badgeColor: "bg-yellow-500",
      stats: { ideas: "500+", avgRoi: "35%", successRate: "78%" },
    },
    {
      icon: FileText,
      title: "Documentation & Permits",
      subtitle: "Legal Compliance",
      description:
        "Navigate the complex world of business documentation, permits, and legal requirements with our comprehensive guides and templates.",
      features: [
        "Complete documentation checklists",
        "Government approval processes",
        "Legal compliance guidelines",
        "Downloadable templates",
        "State-wise requirement guides",
      ],
      color: "from-blue-500 to-indigo-500",
      href: "/business/documentation",
      badge: "Essential",
      badgeColor: "bg-blue-500",
      stats: { documents: "200+", states: "28", approvals: "150+" },
    },
    {
      icon: Calculator,
      title: "ROI Calculator",
      subtitle: "Investment Planning",
      description:
        "Calculate investment requirements, projected returns, and break-even analysis for any business idea with our advanced calculator tools.",
      features: [
        "Investment requirement calculator",
        "ROI and break-even analysis",
        "Cash flow projections",
        "Risk assessment tools",
        "Funding requirement estimation",
      ],
      color: "from-career-secondary to-green-600",
      href: "/business/calculator",
      badge: "Smart Tool",
      badgeColor: "bg-career-secondary",
      stats: { calculations: "10K+", avgAccuracy: "92%", savings: "₹2L+" },
    },
  ];

  const popularBusinesses = [
    {
      category: "E-commerce",
      businesses: [
        {
          name: "Online Store",
          investment: "₹50K-2L",
          roi: "25-40%",
          difficulty: "Medium",
        },
        {
          name: "Dropshipping",
          investment: "₹25K-1L",
          roi: "20-35%",
          difficulty: "Easy",
        },
        {
          name: "Amazon FBA",
          investment: "₹1L-5L",
          roi: "30-50%",
          difficulty: "Medium",
        },
      ],
    },
    {
      category: "Food & Beverage",
      businesses: [
        {
          name: "Cloud Kitchen",
          investment: "₹2L-8L",
          roi: "25-45%",
          difficulty: "Medium",
        },
        {
          name: "Food Delivery",
          investment: "₹1L-3L",
          roi: "20-35%",
          difficulty: "Easy",
        },
        {
          name: "Cafe/Restaurant",
          investment: "₹5L-20L",
          roi: "15-30%",
          difficulty: "Hard",
        },
      ],
    },
    {
      category: "Digital Services",
      businesses: [
        {
          name: "Digital Marketing Agency",
          investment: "₹25K-1L",
          roi: "40-60%",
          difficulty: "Medium",
        },
        {
          name: "Web Development",
          investment: "₹15K-50K",
          roi: "50-80%",
          difficulty: "Medium",
        },
        {
          name: "Content Creation",
          investment: "₹10K-30K",
          roi: "30-70%",
          difficulty: "Easy",
        },
      ],
    },
  ];

  const successStories = [
    {
      name: "Priya Sharma",
      business: "Organic Food Products",
      location: "Pune, Maharashtra",
      investment: "₹3 Lakh",
      currentRevenue: "₹25 Lakh/year",
      growth: "800% in 2 years",
      image: "/api/placeholder/80/80",
    },
    {
      name: "Rahul Gupta",
      business: "EdTech Platform",
      location: "Bangalore, Karnataka",
      investment: "₹8 Lakh",
      currentRevenue: "₹1.2 Crore/year",
      growth: "1400% in 3 years",
      image: "/api/placeholder/80/80",
    },
    {
      name: "Anjali Patel",
      business: "Handmade Crafts",
      location: "Ahmedabad, Gujarat",
      investment: "₹1.5 Lakh",
      currentRevenue: "₹15 Lakh/year",
      growth: "900% in 18 months",
      image: "/api/placeholder/80/80",
    },
  ];

  const quickStats = [
    {
      icon: Lightbulb,
      number: "500+",
      label: "Business Ideas",
      color: "text-yellow-600",
    },
    {
      icon: Users,
      number: "25K+",
      label: "Entrepreneurs Guided",
      color: "text-career-primary",
    },
    {
      icon: TrendingUp,
      number: "78%",
      label: "Success Rate",
      color: "text-career-secondary",
    },
    {
      icon: DollarSign,
      number: "₹5.2Cr",
      label: "Revenue Generated",
      color: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-background to-muted/20 py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-career-secondary/5 via-transparent to-yellow-500/5"></div>

        <div className="container relative px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Building className="h-10 w-10 text-career-secondary" />
              <h1 className="text-5xl md:text-6xl font-bold">
                Business Opportunities
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Transform your entrepreneurial dreams into reality. From idea
              validation to business launch, get complete guidance,
              documentation, and financial planning tools.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Rocket className="h-4 w-4 mr-2" />
                500+ Business Ideas
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Shield className="h-4 w-4 mr-2" />
                Legal Compliance
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Calculator className="h-4 w-4 mr-2" />
                Financial Planning
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/business/ideas">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-career-secondary to-green-600 text-lg px-8 py-6"
                >
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Explore Business Ideas
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>

              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Play className="h-5 w-5 mr-2" />
                Watch Success Stories
              </Button>
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

      {/* Main Business Pathways */}
      <section className="py-24">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Your Business Journey Starts Here
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Three essential tools to transform your entrepreneurial vision
                into a successful business reality.
              </p>
            </div>

            <div className="space-y-8">
              {businessPathways.map((pathway, index) => (
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
                            <div className="w-2 h-2 rounded-full bg-career-secondary"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Link to={pathway.href}>
                        <Button
                          size="lg"
                          className="group/btn bg-gradient-to-r from-career-secondary to-green-600 hover:opacity-90 text-lg px-8"
                        >
                          <Target className="h-5 w-5 mr-2" />
                          Get Started
                          <ArrowRight className="h-5 w-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>

                    {/* Right Stats */}
                    <div className="lg:w-80 p-8 lg:p-12 flex items-center justify-center">
                      <div className="space-y-6 w-full">
                        {Object.entries(pathway.stats).map(
                          ([key, value], statsIndex) => (
                            <div key={statsIndex} className="text-center">
                              <div
                                className={`text-3xl font-bold bg-gradient-to-r ${pathway.color} bg-clip-text text-transparent`}
                              >
                                {value}
                              </div>
                              <div className="text-sm text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Business Categories */}
      <section className="py-24 bg-muted/20">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Trending Business Categories
              </h2>
              <p className="text-xl text-muted-foreground">
                High-demand business opportunities with proven success rates
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {popularBusinesses.map((category, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {category.category}
                    </CardTitle>
                    <CardDescription>
                      Popular opportunities in this sector
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.businesses.map((business, businessIndex) => (
                      <div
                        key={businessIndex}
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{business.name}</h4>
                          <Badge
                            variant={
                              business.difficulty === "Easy"
                                ? "default"
                                : business.difficulty === "Medium"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {business.difficulty}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="block">Investment</span>
                            <span className="font-medium text-foreground">
                              {business.investment}
                            </span>
                          </div>
                          <div>
                            <span className="block">Expected ROI</span>
                            <span className="font-medium text-career-secondary">
                              {business.roi}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
              <p className="text-xl text-muted-foreground">
                Real entrepreneurs who transformed their ideas into thriving
                businesses
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-career-primary to-career-secondary flex items-center justify-center text-white font-bold text-xl">
                        {story.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{story.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {story.location}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-career-secondary">
                          {story.business}
                        </h4>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Investment
                          </span>
                          <div className="font-medium">{story.investment}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Current Revenue
                          </span>
                          <div className="font-medium">
                            {story.currentRevenue}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-career-secondary" />
                          <span className="font-medium text-career-secondary">
                            {story.growth}
                          </span>
                        </div>
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
      <section className="py-24 bg-gradient-to-r from-career-secondary to-green-600">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center text-white space-y-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-8 w-8" />
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to Start Your Business Journey?
              </h2>
            </div>

            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of successful entrepreneurs who started their
              journey with us. From idea to implementation, we're here to guide
              you every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/business/ideas">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6"
                >
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Browse Business Ideas
                </Button>
              </Link>

              <Link to="/business/calculator">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-career-secondary"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate Investment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
