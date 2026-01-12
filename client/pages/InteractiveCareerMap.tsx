import { useState, useEffect } from "react";
import { useDataStore, getStageColor } from "@/lib/data-service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Target,
  Search,
  Compass,
  Route,
  Star,
  Play,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  Zap,
  Building,
  GraduationCap,
} from "lucide-react";

export default function InteractiveCareerMap() {
  const { careerMapData } = useDataStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const careerFields = [
    {
      value: "technology",
      label: "Technology & Engineering",
      color: "from-blue-500 to-indigo-500",
    },
    {
      value: "healthcare",
      label: "Healthcare & Medicine",
      color: "from-red-500 to-pink-500",
    },
    {
      value: "business",
      label: "Business & Finance",
      color: "from-yellow-500 to-orange-500",
    },
    {
      value: "creative",
      label: "Creative & Design",
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "education",
      label: "Education & Research",
      color: "from-green-500 to-emerald-500",
    },
    {
      value: "government",
      label: "Government & Public Service",
      color: "from-career-primary to-purple-600",
    },
  ];

  const educationLevels = [
    { value: "school", label: "School Level (10th-12th)" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "postgraduate", label: "Postgraduate" },
    { value: "professional", label: "Professional Level" },
  ];

  // Generate career nodes from dataset with radial layout
  const generateCareerNodes = () => {
    if (!careerMapData) return [];

    const centerNode = {
      id: "center",
      title: "You",
      subtitle: "Start Your Journey",
      x: 50,
      y: 50,
      type: "center" as const,
      field: "center",
      level: "center",
      color: "bg-gradient-to-r from-career-primary to-career-secondary",
      salary: "",
      growth: "N/A" as const,
      demand: "N/A" as const,
      description: "Your starting point for career exploration",
    };

    // Convert careers to nodes with radial positioning
    const careerNodes = careerMapData.careers.map((career, index) => {
      const angle = (index * 2 * Math.PI) / careerMapData.careers.length;
      const radius = 35; // Distance from center
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);

      // Get stage color for the career's preferred stream
      const stageColor = getStageColor(career.preferred_stream);

      return {
        id: career.id,
        title: career.title,
        subtitle: getCareerSubtitle(career.id),
        x: Math.max(10, Math.min(90, x)), // Keep within bounds
        y: Math.max(10, Math.min(90, y)), // Keep within bounds
        type: "career" as const,
        field: getCareerField(career.preferred_stream),
        level: getCareerLevel(career.preferred_stream),
        color: `bg-gradient-to-r ${getGradientFromColor(stageColor)}`,
        salary: getCareerSalary(career.id),
        growth: "High" as const,
        demand: "High" as const,
        description: getCareerDescription(career.id),
        career: career,
      };
    });

    return [centerNode, ...careerNodes];
  };

  const getCareerSubtitle = (careerId: string) => {
    const subtitles: Record<string, string> = {
      doctor: "Heal People",
      software_engineer: "Build Applications",
      civil_services: "Serve the Nation",
      chartered_accountant: "Manage Finances",
      data_scientist: "Analyze Data",
      nurse: "Care for Patients",
      lawyer: "Practice Law",
      journalist: "Report News",
      pharmacist: "Dispense Medicine",
      police_officer: "Maintain Order",
    };
    return subtitles[careerId] || "Professional Career";
  };

  const getCareerField = (stream: string) => {
    if (stream.includes("pcb") || stream.includes("medical"))
      return "healthcare";
    if (stream.includes("pcm") || stream.includes("engineering"))
      return "technology";
    if (stream.includes("commerce")) return "business";
    if (stream.includes("arts")) return "creative";
    return "general";
  };

  const getCareerLevel = (stream: string) => {
    if (stream.includes("school")) return "school";
    if (stream.includes("ug_")) return "undergraduate";
    if (stream.includes("pg")) return "postgraduate";
    return "professional";
  };

  const getGradientFromColor = (hexColor: string) => {
    // Convert hex to gradient classes (simplified)
    const colorMap: Record<string, string> = {
      "#1E88E5": "from-blue-500 to-blue-600",
      "#43A047": "from-green-500 to-green-600",
      "#8E24AA": "from-purple-500 to-purple-600",
      "#F4511E": "from-orange-500 to-orange-600",
      "#00897B": "from-teal-500 to-teal-600",
      "#C2185B": "from-pink-500 to-pink-600",
    };
    return colorMap[hexColor] || "from-gray-500 to-gray-600";
  };

  const getCareerSalary = (careerId: string) => {
    const salaries: Record<string, string> = {
      doctor: "₹10-50 LPA",
      software_engineer: "₹8-25 LPA",
      civil_services: "₹56K-2L PM",
      chartered_accountant: "₹6-20 LPA",
      data_scientist: "₹12-35 LPA",
      nurse: "₹3-8 LPA",
      lawyer: "₹5-25 LPA",
      journalist: "₹4-15 LPA",
      pharmacist: "₹3-12 LPA",
      police_officer: "₹35K-1L PM",
    };
    return salaries[careerId] || "₹5-15 LPA";
  };

  const getCareerDescription = (careerId: string) => {
    const descriptions: Record<string, string> = {
      doctor: "Diagnose, treat, and prevent illness in patients",
      software_engineer: "Design, develop, and maintain software applications",
      civil_services: "Lead administrative functions and policy implementation",
      chartered_accountant:
        "Provide accounting and financial advisory services",
      data_scientist: "Extract insights from complex data using analytics",
      nurse: "Provide patient care and support in healthcare settings",
      lawyer: "Represent clients and provide legal counsel",
      journalist: "Research, write, and report news and stories",
      pharmacist: "Dispense medications and provide pharmaceutical care",
      police_officer: "Maintain law and order and ensure public safety",
    };
    return (
      descriptions[careerId] || "Professional role with growth opportunities"
    );
  };

  const careerNodes = generateCareerNodes();

  // Generate pathways from center to all career nodes
  const pathways = careerNodes
    .filter((node) => node.type === "career")
    .map((node) => ({
      from: "center",
      to: node.id,
      color: `stroke-${getCareerField(node.field)}-500`,
    }));

  const filteredNodes = careerNodes.filter((node) => {
    if (node.type === "center") return true;
    if (selectedField !== "all" && node.field !== selectedField) return false;
    if (selectedLevel !== "all" && node.level !== selectedLevel) return false;
    if (
      searchTerm &&
      !node.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "Very High":
        return "text-green-600 bg-green-50";
      case "High":
        return "text-blue-600 bg-blue-50";
      case "Medium":
        return "text-yellow-600 bg-yellow-50";
      case "Low":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-career-primary/10 to-purple-500/10">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="h-10 w-10 text-career-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Interactive Career Map
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore career paths visually with our interactive map. Discover
              connections between different roles, required skills, and
              progression pathways in various fields.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Compass className="h-4 w-4 mr-2" />
                Visual Exploration
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Route className="h-4 w-4 mr-2" />
                Career Pathways
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Target className="h-4 w-4 mr-2" />
                Goal Planning
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Controls Panel */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Explore Careers
                  </CardTitle>
                  <CardDescription>
                    Filter and search to find your ideal career path
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Search Careers
                    </label>
                    <Input
                      placeholder="e.g., Software Engineer, Doctor"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Career Field
                    </label>
                    <Select
                      value={selectedField}
                      onValueChange={setSelectedField}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Fields" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Fields</SelectItem>
                        {careerFields.map((field) => (
                          <SelectItem key={field.value} value={field.value}>
                            {field.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Education Level
                    </label>
                    <Select
                      value={selectedLevel}
                      onValueChange={setSelectedLevel}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        {educationLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Set Career Goal
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Route className="h-4 w-4 mr-2" />
                        View Pathway
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Get Guidance
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Career Field Legend */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Career Fields</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {careerFields.map((field) => (
                      <div
                        key={field.value}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-gradient-to-r ${field.color}`}
                        ></div>
                        <span className="text-sm">{field.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Interactive Map */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Career Universe
                  </CardTitle>
                  <CardDescription>
                    Click on any career to explore details and pathways
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Map Container */}
                  <div className="relative h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                    {/* SVG for connection lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {pathways.map((path, index) => {
                        const fromNode = filteredNodes.find(
                          (n) => n.id === path.from,
                        );
                        const toNode = filteredNodes.find(
                          (n) => n.id === path.to,
                        );
                        if (!fromNode || !toNode) return null;

                        const x1 = (fromNode.x / 100) * 100;
                        const y1 = (fromNode.y / 100) * 100;
                        const x2 = (toNode.x / 100) * 100;
                        const y2 = (toNode.y / 100) * 100;

                        return (
                          <line
                            key={index}
                            x1={`${x1}%`}
                            y1={`${y1}%`}
                            x2={`${x2}%`}
                            y2={`${y2}%`}
                            className={`${path.color} stroke-2 opacity-30`}
                            strokeDasharray="5,5"
                          />
                        );
                      })}
                    </svg>

                    {/* Career Nodes */}
                    {filteredNodes.map((node) => (
                      <div
                        key={node.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 hover:z-10"
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        <div
                          className={`relative ${node.color} text-white rounded-xl p-4 shadow-lg min-w-[180px] text-center ${
                            node.type === "center"
                              ? "w-24 h-24 flex items-center justify-center"
                              : ""
                          }`}
                        >
                          {node.type === "center" ? (
                            <div>
                              <div className="text-2xl font-bold">You</div>
                              <div className="text-xs opacity-80">
                                Start Here
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h3 className="font-bold text-sm">
                                {node.title}
                              </h3>
                              <p className="text-xs opacity-80">
                                {node.subtitle}
                              </p>
                              {node.salary && (
                                <div className="text-xs mt-1 bg-white/20 rounded px-2 py-1">
                                  {node.salary}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Pulse animation for center node */}
                          {node.type === "center" && (
                            <div className="absolute inset-0 rounded-xl animate-ping bg-white/20"></div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Hover Details */}
                    {hoveredNode && hoveredNode !== "center" && (
                      <div className="absolute bottom-4 left-4 right-4">
                        {(() => {
                          const node = filteredNodes.find(
                            (n) => n.id === hoveredNode,
                          );
                          if (!node) return null;
                          return (
                            <Card className="border-0 shadow-xl bg-white/95 backdrop-blur">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className="font-bold text-lg">
                                      {node.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      {node.description}
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    {node.demand && (
                                      <Badge
                                        className={getDemandColor(node.demand)}
                                      >
                                        {node.demand} Demand
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">
                                      Salary:
                                    </span>
                                    <div className="font-medium">
                                      {node.salary}
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">
                                      Growth:
                                    </span>
                                    <div className="font-medium">
                                      {node.growth}
                                    </div>
                                  </div>
                                  <div>
                                    <Button size="sm" className="w-full">
                                      <Target className="h-3 w-3 mr-1" />
                                      Explore
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Map Actions */}
              <div className="flex flex-wrap gap-4 mt-6">
                <Button className="bg-gradient-to-r from-career-primary to-purple-600">
                  <Route className="h-4 w-4 mr-2" />
                  Create Roadmap
                </Button>
                <Button variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  Take Tour
                </Button>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Join Community
                </Button>
                <Button variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  Skill Assessment
                </Button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-career-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Visual Exploration</h3>
                <p className="text-muted-foreground">
                  Discover career connections and pathways through interactive
                  visualization
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-career-secondary to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Growth Insights</h3>
                <p className="text-muted-foreground">
                  Understand salary ranges, growth potential, and market demand
                  for each career
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Smart Recommendations
                </h3>
                <p className="text-muted-foreground">
                  Get personalized career suggestions based on your interests
                  and background
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
