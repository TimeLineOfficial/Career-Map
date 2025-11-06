import React, { useState, useEffect } from "react";
import { useDataStore } from "../lib/data-service";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import {
  BookOpen,
  Play,
  Clock,
  Star,
  TrendingUp,
  Target,
  ArrowRight,
  ExternalLink,
  Download,
  FileText,
  Video,
  Award,
  Users,
  Lightbulb,
  MapPin,
  CheckCircle,
} from "lucide-react";

interface AdvancedCareerMappingProps {
  selectedCareer?: string;
  selectedField?: string;
}

export default function AdvancedCareerMapping({
  selectedCareer,
  selectedField,
}: AdvancedCareerMappingProps) {
  const {
    getCareerNotes,
    getYouTubeLectures,
    getCareerSwitchPaths,
    getText,
    currentLanguage,
  } = useDataStore();

  const [activeTab, setActiveTab] = useState("roadmap");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState("beginner");

  const careerField = selectedCareer || selectedField || "Data Science";
  const careerNotes = getCareerNotes(careerField);
  const youTubeLectures = getYouTubeLectures(careerField);
  const switchPaths = getCareerSwitchPaths("Engineering", careerField);

  const stages = [
    {
      id: "beginner",
      label: "Beginner",
      duration: careerNotes.timeline.beginner,
      color: "bg-green-100 text-green-800",
    },
    {
      id: "intermediate",
      label: "Intermediate",
      duration: careerNotes.timeline.intermediate,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "advanced",
      label: "Advanced",
      duration: careerNotes.timeline.advanced,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "expert",
      label: "Expert",
      duration: careerNotes.timeline.expert,
      color: "bg-orange-100 text-orange-800",
    },
  ];

  const preparationGuides = [
    {
      id: "foundation",
      title: "Foundation Building",
      description: "Essential concepts and prerequisites",
      duration: "2-3 months",
      difficulty: "Beginner",
      topics: [
        "Basic Programming",
        "Mathematics",
        "Problem Solving",
        "Critical Thinking",
      ],
      resources: [
        {
          type: "course",
          title: "Programming Fundamentals",
          provider: "Coursera",
          rating: 4.8,
          duration: "40 hours",
        },
        {
          type: "book",
          title: "Introduction to Algorithms",
          author: "CLRS",
          rating: 4.7,
        },
        {
          type: "practice",
          title: "HackerRank Basics",
          platform: "HackerRank",
          rating: 4.6,
        },
      ],
    },
    {
      id: "intermediate",
      title: "Skill Development",
      description: "Core competencies and practical application",
      duration: "4-6 months",
      difficulty: "Intermediate",
      topics: [
        "Advanced Programming",
        "System Design",
        "Database Management",
        "API Development",
      ],
      resources: [
        {
          type: "course",
          title: "Advanced Programming Concepts",
          provider: "edX",
          rating: 4.9,
          duration: "60 hours",
        },
        {
          type: "project",
          title: "Full Stack Application",
          platform: "GitHub",
          rating: 4.8,
        },
        {
          type: "certification",
          title: "Professional Certification",
          provider: "Industry",
          rating: 4.7,
        },
      ],
    },
    {
      id: "specialization",
      title: "Specialization",
      description: "Domain expertise and advanced topics",
      duration: "6-12 months",
      difficulty: "Advanced",
      topics: [
        "Machine Learning",
        "Cloud Architecture",
        "Leadership",
        "Innovation",
      ],
      resources: [
        {
          type: "course",
          title: "Specialized Training",
          provider: "Udacity",
          rating: 4.9,
          duration: "100 hours",
        },
        {
          type: "research",
          title: "Industry Research Papers",
          platform: "Academia",
          rating: 4.8,
        },
        {
          type: "mentorship",
          title: "Expert Mentorship",
          provider: "Industry Experts",
          rating: 4.9,
        },
      ],
    },
  ];

  const careerMilestones = [
    {
      stage: "Entry Level",
      salary: "₹3-6 LPA",
      experience: "0-2 years",
      skills: ["Basic Programming", "Problem Solving"],
    },
    {
      stage: "Mid Level",
      salary: "₹6-15 LPA",
      experience: "2-5 years",
      skills: ["Advanced Programming", "System Design"],
    },
    {
      stage: "Senior Level",
      salary: "₹15-30 LPA",
      experience: "5-8 years",
      skills: ["Leadership", "Architecture"],
    },
    {
      stage: "Expert Level",
      salary: "₹30+ LPA",
      experience: "8+ years",
      skills: ["Strategy", "Innovation", "Mentoring"],
    },
  ];

  const ResourceCard = ({
    resource,
    type,
  }: {
    resource: any;
    type: string;
  }) => (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {type === "video" && <Video className="w-4 h-4 text-red-600" />}
            {type === "course" && (
              <BookOpen className="w-4 h-4 text-blue-600" />
            )}
            {type === "book" && <FileText className="w-4 h-4 text-green-600" />}
            {type === "practice" && (
              <Target className="w-4 h-4 text-purple-600" />
            )}
            <Badge variant="outline" className="text-xs">
              {resource.type || type}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-semibold">{resource.rating}</span>
          </div>
        </div>

        <h4 className="font-semibold text-sm mb-2 line-clamp-2">
          {resource.title}
        </h4>

        <div className="space-y-2 text-xs text-gray-600">
          {resource.provider && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{resource.provider}</span>
            </div>
          )}
          {resource.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{resource.duration}</span>
            </div>
          )}
          {resource.channel && (
            <div className="flex items-center gap-1">
              <Play className="w-3 h-3" />
              <span>{resource.channel}</span>
            </div>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            <ExternalLink className="w-3 h-3 mr-1" />
            Access
          </Button>
          {type === "video" && (
            <Button size="sm" variant="outline" className="flex-1 text-xs">
              <Play className="w-3 h-3 mr-1" />
              Watch
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Advanced Career Mapping
        </h2>
        <p className="text-gray-600">
          Comprehensive guidance for {careerField} career development
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="roadmap" className="text-xs">
            <MapPin className="w-4 h-4 mr-1" />
            Roadmap
          </TabsTrigger>
          <TabsTrigger value="preparation" className="text-xs">
            <BookOpen className="w-4 h-4 mr-1" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="resources" className="text-xs">
            <FileText className="w-4 h-4 mr-1" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="videos" className="text-xs">
            <Video className="w-4 h-4 mr-1" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="milestones" className="text-xs">
            <Award className="w-4 h-4 mr-1" />
            Milestones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Career Development Timeline
              </CardTitle>
              <CardDescription>
                Step-by-step progression path for {careerField}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stages.map((stage, index) => (
                  <div key={stage.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${stage.color} font-semibold`}
                      >
                        {index + 1}
                      </div>
                      {index < stages.length - 1 && (
                        <div className="w-px h-16 bg-gray-300 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{stage.label}</h3>
                        <Badge variant="outline">{stage.duration}</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">
                        {stage.id === "beginner" &&
                          "Learn fundamentals and build foundation skills"}
                        {stage.id === "intermediate" &&
                          "Develop practical experience and specialized knowledge"}
                        {stage.id === "advanced" &&
                          "Master advanced concepts and take on leadership roles"}
                        {stage.id === "expert" &&
                          "Become industry expert and mentor others"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {careerNotes.topics
                          .slice(index, index + 2)
                          .map((topic: string, i: number) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs"
                            >
                              {topic}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preparation" className="space-y-6">
          <div className="grid gap-6">
            {preparationGuides.map((guide) => (
              <Card key={guide.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-orange-500" />
                        {guide.title}
                      </CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{guide.duration}</Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {guide.difficulty}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Topics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {guide.topics.map((topic, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">
                        Recommended Resources:
                      </h4>
                      <div className="grid md:grid-cols-3 gap-3">
                        {guide.resources.map((resource, i) => (
                          <ResourceCard
                            key={i}
                            resource={resource}
                            type={resource.type}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Official Documentation & Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {careerNotes.resources.map((resource: string, i: number) => (
                    <div
                      key={i}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-sm">{resource}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Open
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Download className="w-3 h-3 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid gap-4">
            {youTubeLectures.map((lecture: any, i: number) => (
              <Card
                key={i}
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="aspect-video w-48 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Play className="w-12 h-12 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {lecture.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{lecture.channel}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{lecture.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{lecture.rating}</span>
                        </div>
                        {lecture.verified && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>Verified</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button className="gap-2">
                          <Play className="w-4 h-4" />
                          Watch Now
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <ExternalLink className="w-4 h-4" />
                          YouTube
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Career Progression Milestones
              </CardTitle>
              <CardDescription>
                Expected progression path with salary ranges and skill
                requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {careerMilestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      {index < careerMilestones.length - 1 && (
                        <div className="w-px h-12 bg-gray-300 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">
                          {milestone.stage}
                        </h3>
                        <div className="text-right">
                          <p className="font-bold text-green-600">
                            {milestone.salary}
                          </p>
                          <p className="text-xs text-gray-500">
                            {milestone.experience}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {milestone.skills.map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
