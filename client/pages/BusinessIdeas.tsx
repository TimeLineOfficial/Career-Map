import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Progress } from "../components/ui/progress";
import {
  Search,
  TrendingUp,
  DollarSign,
  Clock,
  Users,
  Star,
  Filter,
  ArrowRight,
  Zap,
  Target,
  Lightbulb,
  Rocket,
  Building,
  Leaf,
  Globe,
  Award,
  AlertCircle,
  CheckCircle,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  CreditCard,
  Cpu,
  Beaker,
  Satellite,
  Shield,
  Sprout,
  ShoppingCart,
  Camera,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";
import {
  innovativeBusinessDataset,
  BusinessIdea,
  getBusinessesByCategory,
  getTrendingBusinesses,
  getBusinessesByInvestment,
  getBusinessesByDifficulty,
  getSustainableBusinesses,
  searchBusinesses,
  getUniqueCategories,
  getBusinessesByROI
} from "../lib/innovative-business-dataset";

const categoryIcons = {
  'Artificial Intelligence': Cpu,
  'Blockchain Technology': Shield,
  'Renewable Energy': Leaf,
  'Biotechnology': Beaker,
  'Space Technology': Satellite,
  'Cybersecurity': Shield,
  'Sustainable Agriculture': Sprout,
  'E-commerce': ShoppingCart,
  'Digital Content': Camera
};

const difficultyColors = {
  'Easy': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  'Hard': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
  'Very Hard': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
};

const marketPotentialColors = {
  'Medium': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  'High': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  'Very High': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  'Explosive': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
};

export default function BusinessIdeas() {
  const [filteredBusinesses, setFilteredBusinesses] = useState<BusinessIdea[]>(innovativeBusinessDataset);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [maxInvestment, setMaxInvestment] = useState<string>("all");
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);
  const [showSustainableOnly, setShowSustainableOnly] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessIdea | null>(null);
  const [currentView, setCurrentView] = useState<'grid' | 'comparison'>('grid');

  const trendingBusinesses = getTrendingBusinesses();
  const sustainableBusinesses = getSustainableBusinesses();
  const uniqueCategories = getUniqueCategories();

  // Filter businesses based on all criteria
  useEffect(() => {
    let businesses = innovativeBusinessDataset;

    // Search filter
    if (searchQuery.trim()) {
      businesses = searchBusinesses(searchQuery);
    }

    // Category filter
    if (selectedCategory !== "all") {
      businesses = businesses.filter(business => business.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== "all") {
      businesses = businesses.filter(business => business.difficulty === selectedDifficulty);
    }

    // Investment filter
    if (maxInvestment !== "all") {
      const maxAmount = parseInt(maxInvestment);
      businesses = businesses.filter(business => business.initialInvestment.min <= maxAmount);
    }

    // Trending filter
    if (showTrendingOnly) {
      businesses = businesses.filter(business => business.trending);
    }

    // Sustainable filter
    if (showSustainableOnly) {
      businesses = businesses.filter(business => business.sustainability);
    }

    setFilteredBusinesses(businesses);
  }, [searchQuery, selectedCategory, selectedDifficulty, maxInvestment, showTrendingOnly, showSustainableOnly]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setMaxInvestment("all");
    setShowTrendingOnly(false);
    setShowSustainableOnly(false);
  };

  const formatCurrency = (amount: number): string => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
  };

  const BusinessCard = ({ business }: { business: BusinessIdea }) => {
    const IconComponent = categoryIcons[business.category as keyof typeof categoryIcons] || Lightbulb;
    
    return (
      <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-l-4 border-blue-500">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <IconComponent className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg leading-tight text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                  {business.title}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {business.category} • {business.subcategory}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              {business.trending && (
                <Badge variant="destructive" className="text-xs px-2 py-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Hot
                </Badge>
              )}
              {business.sustainability && (
                <Badge variant="outline" className="text-xs px-2 py-1 border-green-500 text-green-600">
                  <Leaf className="w-3 h-3 mr-1" />
                  Green
                </Badge>
              )}
            </div>
          </div>
          <CardDescription className="text-sm leading-relaxed mt-2">
            {business.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">
                {formatCurrency(business.initialInvestment.min)} - {formatCurrency(business.initialInvestment.max)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700 dark:text-gray-300">
                {business.timeline.profitability}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-600" />
              <span className={`text-xs px-2 py-1 rounded-full ${marketPotentialColors[business.marketPotential]}`}>
                {business.marketPotential}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-600" />
              <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[business.difficulty]}`}>
                {business.difficulty}
              </span>
            </div>
          </div>

          {/* ROI Indicator */}
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Potential ROI</span>
              <span className="text-sm font-bold text-green-600">{business.roi.potential}</span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Year 3: {business.roi.year3}
            </div>
          </div>

          {/* Technology Stack */}
          <div>
            <h5 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">Technology Stack:</h5>
            <div className="flex flex-wrap gap-1">
              {business.technology.slice(0, 3).map((tech, i) => (
                <Badge key={i} variant="outline" className="text-xs px-2 py-1">
                  {tech}
                </Badge>
              ))}
              {business.technology.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{business.technology.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Target Market */}
          <div>
            <h5 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">Target Market:</h5>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {business.targetMarket.slice(0, 2).join(', ')}
              {business.targetMarket.length > 2 && ` +${business.targetMarket.length - 2} more`}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setSelectedBusiness(business)}
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Full Details
                </Button>
              </DialogTrigger>
              <BusinessDetailModal business={business} />
            </Dialog>
            <Button size="sm" variant="outline" className="flex-1">
              <Rocket className="w-4 h-4 mr-1" />
              Start Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const BusinessDetailModal = ({ business }: { business: BusinessIdea }) => (
    <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl flex items-center gap-3">
          {React.createElement(categoryIcons[business.category as keyof typeof categoryIcons] || Lightbulb, {
            className: "w-8 h-8 text-blue-600"
          })}
          {business.title}
        </DialogTitle>
        <DialogDescription className="text-lg">
          {business.description}
        </DialogDescription>
      </DialogHeader>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Investment Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Investment Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total Investment:</span>
              <span className="text-lg font-bold text-green-600">
                {formatCurrency(business.initialInvestment.min)} - {formatCurrency(business.initialInvestment.max)}
              </span>
            </div>
            {business.initialInvestment.breakdown.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{item.item}</span>
                  <span className="text-sm font-semibold">{item.cost}</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
                <span className="text-xs text-gray-600">{item.percentage}% of total</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Timeline & ROI */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Timeline & Returns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Setup Time:</span>
                <p className="font-semibold">{business.timeline.setup}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Profitability:</span>
                <p className="font-semibold">{business.timeline.profitability}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Scale Time:</span>
                <p className="font-semibold">{business.timeline.scale}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Scalability:</span>
                <p className="font-semibold">{business.scalability}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold mb-3">ROI Projection</h5>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-600">Year 1</p>
                  <p className="font-bold text-red-600">{business.roi.year1}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Year 2</p>
                  <p className="font-bold text-yellow-600">{business.roi.year2}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Year 3</p>
                  <p className="font-bold text-green-600">{business.roi.year3}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Potential</p>
                  <p className="font-bold text-blue-600">{business.roi.potential}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h5 className="font-semibold mb-2">Education:</h5>
              <div className="flex flex-wrap gap-1">
                {business.requirements.education.map((edu, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {edu}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-2">Skills:</h5>
              <div className="flex flex-wrap gap-1">
                {business.requirements.skills.map((skill, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Certifications:</h5>
              <div className="flex flex-wrap gap-1">
                {business.requirements.certifications.map((cert, i) => (
                  <Badge key={i} variant="default" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Government & Legal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-orange-600" />
              Government & Legal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {business.governmentApprovals.required ? (
              <>
                <div className="flex items-center gap-2 text-orange-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="font-medium">Government Approvals Required</span>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Required Approvals:</h5>
                  <ul className="text-sm space-y-1">
                    {business.governmentApprovals.approvals.map((approval, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        {approval}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Timeline:</span>
                    <p>{business.governmentApprovals.timeline}</p>
                  </div>
                  <div>
                    <span className="font-medium">Cost:</span>
                    <p>{business.governmentApprovals.cost}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Minimal Government Approvals Required</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Funding Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-600" />
              Funding Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h5 className="font-semibold mb-2">Funding Sources:</h5>
              <div className="flex flex-wrap gap-1">
                {business.funding.sources.map((source, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {source}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-2">Government Schemes:</h5>
              <div className="flex flex-wrap gap-1">
                {business.funding.schemes.map((scheme, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {scheme}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-2">Eligibility:</h5>
              <ul className="text-sm space-y-1">
                {business.funding.eligibility.map((criteria, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    {criteria}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Challenges & Success Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-red-600" />
              Challenges & Success Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h5 className="font-semibold mb-2 text-red-600">Key Challenges:</h5>
              <ul className="text-sm space-y-1">
                {business.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <AlertCircle className="w-3 h-3 text-red-600" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-2 text-green-600">Success Tips:</h5>
              <ul className="text-sm space-y-1">
                {business.successTips.map((tip, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            🚀 Innovative Business Ideas 2024
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            Discover cutting-edge business opportunities in emerging technologies
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Complete with investment requirements, government approvals, and detailed implementation guides
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search business ideas, technologies, or markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-lg py-3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulty</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                  <SelectItem value="Very Hard">Very Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={maxInvestment} onValueChange={setMaxInvestment}>
                <SelectTrigger>
                  <SelectValue placeholder="Max Investment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Investment</SelectItem>
                  <SelectItem value="1000000">Under ₹10L</SelectItem>
                  <SelectItem value="5000000">Under ₹50L</SelectItem>
                  <SelectItem value="10000000">Under ₹1Cr</SelectItem>
                  <SelectItem value="50000000">Under ₹5Cr</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={showTrendingOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowTrendingOnly(!showTrendingOnly)}
                  className="flex-1"
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Trending
                </Button>
                <Button
                  variant={showSustainableOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowSustainableOnly(!showSustainableOnly)}
                  className="flex-1"
                >
                  <Leaf className="w-4 h-4 mr-1" />
                  Green
                </Button>
              </div>

              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Clear All
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{filteredBusinesses.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Ideas</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{trendingBusinesses.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Trending</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{sustainableBusinesses.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sustainable</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{uniqueCategories.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {formatCurrency(Math.min(...innovativeBusinessDataset.map(b => b.initialInvestment.min)))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Min Investment</div>
            </div>
          </div>
        </div>

        {/* Business Ideas Tabs */}
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="ai-tech" className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              AI & Tech
            </TabsTrigger>
            <TabsTrigger value="sustainable" className="flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              Sustainable
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              All Ideas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                🔥 Trending Business Opportunities
                <Badge variant="destructive" className="text-xs">
                  High Growth Potential
                </Badge>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                These businesses are experiencing rapid market growth and have exceptional potential
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingBusinesses.slice(0, 9).map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ai-tech" className="space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                🤖 AI & Technology Ventures
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cutting-edge technology businesses in AI, blockchain, space tech, and cybersecurity
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses
                .filter(business => 
                  ['Artificial Intelligence', 'Blockchain Technology', 'Space Technology', 'Cybersecurity']
                    .includes(business.category)
                )
                .map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="sustainable" className="space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                🌱 Sustainable Business Ideas
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Environmentally conscious businesses with positive impact and strong market potential
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sustainableBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                All Business Ideas ({filteredBusinesses.length})
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Complete collection of innovative business opportunities across all categories
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>

            {filteredBusinesses.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No Business Ideas Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Business Journey?</h2>
          <p className="text-lg mb-6 opacity-90">
            Get personalized business planning assistance and mentorship
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-black">
              <Rocket className="w-5 h-5 mr-2" />
              Start Business Plan
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Users className="w-5 h-5 mr-2" />
              Find Mentors
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <CreditCard className="w-5 h-5 mr-2" />
              Funding Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
