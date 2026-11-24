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
  Sparkles,
} from "lucide-react";
import ProfessionDetailModal from "@/components/career/ProfessionDetailModal";
import StudentAccountModal from "@/components/StudentAccountModal";

export default function InteractiveCareerMap() {
  const { careerMapData } = useDataStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Modals & Account Gate State
  const [selectedProfessionForDetail, setSelectedProfessionForDetail] = useState<any | null>(null);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [hasStudentAccount, setHasStudentAccount] = useState(() => {
    try {
      return !!localStorage.getItem("careermap_student_account");
    } catch {
      return false;
    }
  });

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
      value: "commerce",
      label: "Commerce & Banking",
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
        x: Math.max(10, Math.min(90, x)),
        y: Math.max(10, Math.min(90, y)),
        type: "career" as const,
        field: getCareerField(career.preferred_stream),
        level: getCareerLevel(career.preferred_stream),
        color: `bg-gradient-to-r ${getGradientFromColor(stageColor)}`,
        salary: (career as any).salary_range_inr || "₹8 - 35 LPA",
        growth: (career as any).growth_projection || "High Growth (+18%)",
        demand: (career as any).market_demand || "High",
        description: (career as any).description || "Professional career path with high industry impact.",
      };
    });

    return [centerNode, ...careerNodes];
  };

  const getCareerSubtitle = (id: string): string => {
    const subtitles: { [key: string]: string } = {
      "software-engineer": "Build the Digital World",
      "data-scientist": "Unlock Data Insights",
      "chartered-accountant": "Financial Mastery",
      "medical-doctor": "Heal & Save Lives",
      "digital-marketer": "Connect Brands & People",
      "civil-servant": "Serve the Nation",
      "graphic-designer": "Visual Storytelling",
      "teacher-educator": "Shape Future Minds",
      entrepreneur: "Create Solutions & Value",
    };
    return subtitles[id] || "Professional Path";
  };

  const getCareerField = (stream: string): string => {
    if (stream.includes("Science") || stream.includes("Engineering"))
      return "technology";
    if (stream.includes("Commerce")) return "commerce";
    if (stream.includes("Arts") || stream.includes("Design")) return "creative";
    return "technology";
  };

  const getCareerLevel = (stream: string): string => {
    return "undergraduate";
  };

  const getGradientFromColor = (color: string): string => {
    if (color.includes("blue")) return "from-blue-500 to-indigo-500";
    if (color.includes("green")) return "from-green-500 to-emerald-500";
    if (color.includes("purple")) return "from-purple-500 to-pink-500";
    if (color.includes("orange")) return "from-yellow-500 to-orange-500";
    return "from-blue-500 to-purple-500";
  };

  const getDemandColor = (demand: string): string => {
    switch (demand) {
      case "Very High":
        return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300";
      case "High":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const allNodes = generateCareerNodes();

  const filteredNodes = allNodes.filter((node) => {
    if (node.type === "center") return true;

    const matchesSearch =
      node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesField =
      selectedField === "all" || node.field === selectedField;
    const matchesLevel =
      selectedLevel === "all" || node.level === selectedLevel;

    return matchesSearch && matchesField && matchesLevel;
  });

  const generatePathways = () => {
    const pathways = [];
    const careerNodes = filteredNodes.filter((node) => node.type === "career");

    for (let i = 0; i < careerNodes.length; i++) {
      pathways.push({
        from: "center",
        to: careerNodes[i].id,
        color: "stroke-career-primary",
      });

      if (i > 0) {
        pathways.push({
          from: careerNodes[i - 1].id,
          to: careerNodes[i].id,
          color: "stroke-career-secondary",
        });
      }
    }

    return pathways;
  };

  const pathways = generatePathways();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-career-primary to-purple-600 text-white py-12 px-4">
        <div className="container max-w-6xl mx-auto text-center space-y-4">
          <Badge className="bg-white/20 text-white border-white/30 text-xs">
            Visual Career Universe
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Interactive Career Map
          </h1>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Navigate through career connections, educational milestones, and industry compensation nodes.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="container max-w-7xl mx-auto space-y-6">
          {/* Account Gating Banner */}
          {!hasStudentAccount && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-blue-300 dark:border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-amber-500 flex-shrink-0" />
                <span className="text-foreground">
                  <strong>Create Your Free Student Account:</strong> Save career trajectories, receive verified placement notifications, and track matching colleges.
                </span>
              </div>
              <Button
                size="sm"
                onClick={() => setIsAccountModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-8 whitespace-nowrap"
              >
                Log In / Create Account
              </Button>
            </div>
          )}

          {/* Controls Bar */}
          <div className="bg-card p-4 rounded-2xl shadow-sm border space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search professions, skills or packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 text-xs"
                />
              </div>

              <div>
                <Select value={selectedField} onValueChange={setSelectedField}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="All Career Fields" />
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
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="All Education Levels" />
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
            </div>
          </div>

          {/* Map Layout Grid */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar Guide */}
            <div className="space-y-4">
              <Card className="border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                    <Compass className="h-4 w-4 text-blue-600" /> Map Navigation Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-muted-foreground">
                  <p>
                    • <strong>Center Node:</strong> Represents your current starting educational level.
                  </p>
                  <p>
                    • <strong>Profession Nodes:</strong> Click on any career node to open the full detailed dossier with milestone roadmap and salary.
                  </p>
                  <p>
                    • <strong>Connecting Paths:</strong> Indicate natural career transitions and multi-disciplinary pathways.
                  </p>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-bold">Career Domains</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {careerFields.map((field) => (
                    <div
                      key={field.value}
                      onClick={() => setSelectedField(field.value)}
                      className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                        selectedField === field.value
                          ? "bg-muted font-bold text-foreground"
                          : "hover:bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${field.color}`} />
                      <span>{field.label}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Interactive Map Canvas */}
            <div className="lg:col-span-3">
              <Card className="border shadow-xl overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      Visual Career Universe
                    </CardTitle>
                    <span className="text-xs text-muted-foreground">
                      Click any node to open full profession roadmap
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative h-[620px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 overflow-hidden border-t">
                    {/* SVG Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {pathways.map((path, index) => {
                        const fromNode = filteredNodes.find((n) => n.id === path.from);
                        const toNode = filteredNodes.find((n) => n.id === path.to);
                        if (!fromNode || !toNode) return null;

                        return (
                          <line
                            key={index}
                            x1={`${fromNode.x}%`}
                            y1={`${fromNode.y}%`}
                            x2={`${toNode.x}%`}
                            y2={`${toNode.y}%`}
                            className={`${path.color} stroke-2 opacity-30`}
                            strokeDasharray="5,5"
                          />
                        );
                      })}
                    </svg>

                    {/* Nodes */}
                    {filteredNodes.map((node) => (
                      <div
                        key={node.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 hover:z-20"
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => {
                          if (node.type !== "center") {
                            setSelectedProfessionForDetail(node);
                          }
                        }}
                      >
                        <div
                          className={`relative ${node.color} text-white rounded-xl p-3.5 shadow-lg min-w-[170px] text-center select-none ${
                            node.type === "center"
                              ? "w-20 h-20 flex items-center justify-center rounded-2xl"
                              : ""
                          }`}
                        >
                          {node.type === "center" ? (
                            <div>
                              <div className="text-xl font-black">You</div>
                              <div className="text-[10px] opacity-80">Start Here</div>
                            </div>
                          ) : (
                            <div>
                              <h3 className="font-bold text-xs">{node.title}</h3>
                              <p className="text-[10px] opacity-80 line-clamp-1">{node.subtitle}</p>
                              {node.salary && (
                                <div className="text-[10px] mt-1 bg-white/20 backdrop-blur-sm rounded px-1.5 py-0.5 font-semibold">
                                  {node.salary}
                                </div>
                              )}
                            </div>
                          )}

                          {node.type === "center" && (
                            <div className="absolute inset-0 rounded-2xl animate-ping bg-white/20 pointer-events-none" />
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Hover Details Card (Dark mode compatible) */}
                    {hoveredNode && hoveredNode !== "center" && (
                      <div className="absolute bottom-4 left-4 right-4 z-30">
                        {(() => {
                          const node = filteredNodes.find((n) => n.id === hoveredNode);
                          if (!node) return null;
                          return (
                            <Card className="border shadow-2xl bg-white/95 dark:bg-slate-900/95 dark:border-slate-800 backdrop-blur">
                              <CardContent className="p-4 space-y-2 text-xs">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="font-bold text-sm text-foreground">{node.title}</h3>
                                    <p className="text-[11px] text-muted-foreground line-clamp-1">{node.description}</p>
                                  </div>
                                  <div className="flex gap-1.5">
                                    {node.demand && (
                                      <Badge className={getDemandColor(node.demand)}>
                                        {node.demand} Demand
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 pt-1 border-t">
                                  <div>
                                    <span className="text-muted-foreground text-[10px]">Package (CTC):</span>
                                    <div className="font-bold text-foreground">{node.salary || "N/A"}</div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground text-[10px]">Growth Rate:</span>
                                    <div className="font-bold text-blue-600">{node.growth || "N/A"}</div>
                                  </div>
                                  <div className="flex items-end">
                                    <Button
                                      size="sm"
                                      onClick={() => setSelectedProfessionForDetail(node)}
                                      className="w-full h-7 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                                    >
                                      View Full Dossier →
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
            </div>
          </div>
        </div>
      </section>

      {/* Profession Detail Modal */}
      <ProfessionDetailModal
        isOpen={!!selectedProfessionForDetail}
        onClose={() => setSelectedProfessionForDetail(null)}
        profession={selectedProfessionForDetail}
      />

      {/* Student Account Modal */}
      <StudentAccountModal
        isOpen={isAccountModalOpen}
        onClose={() => {
          setIsAccountModalOpen(false);
          setHasStudentAccount(!!localStorage.getItem("careermap_student_account"));
        }}
      />
    </div>
  );
}
