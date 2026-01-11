import React, { useEffect, useState } from "react";
import { useDataStore } from "../lib/data-service";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  DollarSign,
  Search,
  Filter,
  Play,
  BookOpen,
  TrendingUp,
  Users,
  Clock,
  Target,
  FileText,
  Video,
  ExternalLink,
} from "lucide-react";

export default function BusinessIdeas() {
  const {
    careerMapData,
    paginatedBusinessIdeas,
    hasMoreBusinessIdeas,
    loadMoreBusinessIdeas,
    getText,
    currentLanguage,
  } = useDataStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredIdeas, setFilteredIdeas] = useState<any[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<any>(null);
  const [showIdeaDetails, setShowIdeaDetails] = useState(false);

  const businessIdeas = careerMapData?.business_ideas || [];
  const categories = [
    "all",
    ...Array.from(new Set(businessIdeas.map((idea) => idea.category))),
  ];

  useEffect(() => {
    let ideas = paginatedBusinessIdeas;

    // Filter by search query
    if (searchQuery.trim()) {
      ideas = ideas.filter(
        (idea) =>
          idea.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      ideas = ideas.filter((idea) => idea.category === selectedCategory);
    }

    setFilteredIdeas(ideas);
  }, [searchQuery, selectedCategory, paginatedBusinessIdeas]);

  const formatCurrency = (amount: number): string => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    } else {
      return `₹${amount}`;
    }
  };

  const getBusinessVideoGuide = (businessName: string) => {
    // Mock video guide data - in real implementation, this would come from the dataset
    return {
      title: `How to Start ${businessName} - Complete Guide`,
      duration: "15:30",
      thumbnail: "/placeholder.svg",
      url: `https://youtube.com/watch?v=${businessName.toLowerCase().replace(/\s+/g, "_")}_guide`,
      channel: "Business Startup Guide",
      views: "125K",
    };
  };

  const getBusinessNotes = (businessName: string) => {
    // Mock business notes - in real implementation, this would come from the dataset
    return {
      summary: `Complete setup guide for ${businessName} business`,
      requirements: [
        "Business registration and licenses",
        "Initial capital and funding",
        "Location and infrastructure",
        "Market research and planning",
        "Legal compliance",
      ],
      steps: [
        "Market Research & Validation",
        "Business Plan Development",
        "Legal Registration & Licenses",
        "Funding & Capital Arrangement",
        "Setup & Infrastructure",
        "Marketing & Launch",
      ],
      timeline: "2-6 months",
      success_tips: [
        "Start with minimum viable product",
        "Focus on customer feedback",
        "Keep detailed financial records",
        "Build strong supplier relationships",
        "Invest in digital marketing",
      ],
    };
  };

  const BusinessIdeaCard = ({
    idea,
    onClick,
  }: {
    idea: any;
    onClick: () => void;
  }) => (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 group hover:border-blue-300"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-900 mb-2">
              {idea.name}
            </h3>
            <Badge variant="outline" className="mb-3">
              {idea.category}
            </Badge>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-green-600 font-semibold">
              <DollarSign className="w-4 h-4" />
              <span>{formatCurrency(idea.min_capital_inr)}</span>
            </div>
            <p className="text-xs text-gray-500">min. capital</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileText className="w-4 h-4" />
            <span>{idea.documents?.length || 0} documents required</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>
              {idea.min_capital_inr < 100000
                ? "Solo/Small team"
                : idea.min_capital_inr < 1000000
                  ? "Small business"
                  : "Medium business"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Target className="w-4 h-4" />
            <span>
              {idea.min_capital_inr < 50000
                ? "Low risk"
                : idea.min_capital_inr < 500000
                  ? "Medium risk"
                  : "High potential"}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 group-hover:border-blue-500"
            >
              <Video className="w-4 h-4 mr-1" />
              Video Guide
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 group-hover:border-blue-500"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Setup Notes
            </Button>
          </div>
        </div>

        <div className="mt-3">
          <div className="text-xs text-gray-500">Required documents:</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {(idea.documents || [])
              .slice(0, 3)
              .map((doc: string, i: number) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {doc}
                </Badge>
              ))}
            {(idea.documents || []).length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{idea.documents.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const BusinessDetailsModal = ({
    idea,
    onClose,
  }: {
    idea: any;
    onClose: () => void;
  }) => {
    const videoGuide = getBusinessVideoGuide(idea.name);
    const businessNotes = getBusinessNotes(idea.name);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {idea.name}
                </h2>
                <p className="text-gray-600">{idea.category} Business</p>
              </div>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>

          <div className="p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="video">Video Guide</TabsTrigger>
                <TabsTrigger value="notes">Setup Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        Investment Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-gray-600">
                            Minimum Capital Required:
                          </span>
                          <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(idea.min_capital_inr)}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">
                            Business Type:
                          </span>
                          <p className="font-semibold">{idea.category}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">
                            Risk Level:
                          </span>
                          <Badge
                            variant={
                              idea.min_capital_inr < 50000
                                ? "default"
                                : idea.min_capital_inr < 500000
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {idea.min_capital_inr < 50000
                              ? "Low Risk"
                              : idea.min_capital_inr < 500000
                                ? "Medium Risk"
                                : "High Potential"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Required Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {(idea.documents || []).map(
                          (doc: string, i: number) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                            >
                              <FileText className="w-4 h-4 text-gray-600" />
                              <span className="text-sm">{doc}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="video" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="w-5 h-5 text-red-600" />
                      Video Tutorial
                    </CardTitle>
                    <CardDescription>
                      Complete step-by-step guide to start your {idea.name}{" "}
                      business
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="font-semibold text-lg mb-2">
                            {videoGuide.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Duration: {videoGuide.duration}
                          </p>
                          <Button className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Watch on YouTube
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Channel: {videoGuide.channel}</span>
                        <span>{videoGuide.views} views</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Business Setup Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        {businessNotes.summary}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Setup Timeline: {businessNotes.timeline}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Setup Steps</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-3">
                          {businessNotes.steps.map(
                            (step: string, i: number) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                                  {i + 1}
                                </div>
                                <span className="text-sm">{step}</span>
                              </li>
                            ),
                          )}
                        </ol>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Success Tips</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {businessNotes.success_tips.map(
                            (tip: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{tip}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getText("business_ideas_title", currentLanguage) ||
              "Business Ideas"}
          </h1>
          <p className="text-xl text-gray-600">
            {getText("business_ideas_subtitle", currentLanguage) ||
              "Discover profitable business opportunities with complete setup guides"}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Search and Filters */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search business ideas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter className="w-4 h-4 text-gray-600 flex-shrink-0" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category === "all" ? "All Categories" : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Business Ideas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map((idea) => (
              <BusinessIdeaCard
                key={idea.id}
                idea={idea}
                onClick={() => {
                  setSelectedIdea(idea);
                  setShowIdeaDetails(true);
                }}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreBusinessIdeas && filteredIdeas.length > 0 && (
            <div className="text-center mt-8">
              <Button
                onClick={loadMoreBusinessIdeas}
                size="lg"
                className="gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Load More Ideas
              </Button>
              <p className="text-sm text-gray-600 mt-2">
                Showing {paginatedBusinessIdeas.length} of{" "}
                {businessIdeas.length} business ideas
              </p>
            </div>
          )}

          {/* No Results */}
          {filteredIdeas.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No business ideas found
              </h3>
              <p className="text-gray-600 mb-4">
                Try different search terms or browse all categories
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Business Details Modal */}
        {showIdeaDetails && selectedIdea && (
          <BusinessDetailsModal
            idea={selectedIdea}
            onClose={() => {
              setShowIdeaDetails(false);
              setSelectedIdea(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
