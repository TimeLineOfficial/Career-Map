import React, { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Search,
  TrendingUp,
  BookOpen,
  DollarSign,
  Users,
  Star,
  Filter,
  ArrowRight,
  Zap,
  Target,
  GraduationCap,
  Briefcase,
  FlaskConical,
  Palette,
  Code,
  Stethoscope,
  Calculator,
  Globe,
  Music,
  Dumbbell,
  Leaf,
  Camera,
  Megaphone,
  CheckCircle2,
  X,
  ChevronRight,
  Award,
  TrendingDown,
} from "lucide-react";
import { ExtendedInterest } from "../lib/extended-interests";
import {
  indianSubjectsDataset,
  IndianSubject,
  getSubjectsByCategory,
  getTrendingSubjects,
  getSubjectsByLevel,
  getSubjectsByType,
  searchSubjects,
  getUniqueCategories,
} from "../lib/indian-subjects-dataset";
import AdvancedCareerMapping from "../components/AdvancedCareerMapping";

const categoryIcons = {
  Science: FlaskConical,
  Technology: Code,
  Commerce: Calculator,
  Arts: Palette,
  Languages: Globe,
  "Creative Arts": Camera,
  Sports: Dumbbell,
  "Health Sciences": Stethoscope,
  Business: Briefcase,
  Media: Megaphone,
  "Social Sciences": Users,
  Vocational: Award,
  Environmental: Leaf,
};

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  Medium:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  Hard: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
  "Very Hard": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

export default function CareerByInterest() {
  const {
    getExtendedInterests,
    searchExtendedInterests,
    getTrendingInterests,
    findAdvancedCareersByInterests,
    getText,
    currentLanguage,
  } = useDataStore();

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState<IndianSubject[]>(
    indianSubjectsDataset,
  );
  const [careerMatches, setCareerMatches] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showResults, setShowResults] = useState(false);
  const [showAdvancedMapping, setShowAdvancedMapping] = useState(false);
  const [selectedCareerForMapping, setSelectedCareerForMapping] =
    useState<string>("");
  const [currentView, setCurrentView] = useState<"subjects" | "interests">(
    "subjects",
  );

  const allExtendedInterests = getExtendedInterests();
  const trendingInterests = getTrendingInterests();
  const trendingSubjects = getTrendingSubjects();
  const uniqueCategories = getUniqueCategories();

  // Filter subjects based on search, category, level, and type
  useEffect(() => {
    let subjects = indianSubjectsDataset;

    // Filter by search query
    if (searchQuery.trim()) {
      subjects = searchSubjects(searchQuery);
    }

    // Filter by category
    if (selectedCategory !== "all") {
      subjects = subjects.filter(
        (subject) => subject.category === selectedCategory,
      );
    }

    // Filter by level
    if (selectedLevel !== "all") {
      subjects = subjects.filter(
        (subject) =>
          subject.level === selectedLevel || subject.level === "Both",
      );
    }

    // Filter by type
    if (selectedType !== "all") {
      subjects = subjects.filter((subject) => subject.type === selectedType);
    }

    setFilteredSubjects(subjects);
  }, [searchQuery, selectedCategory, selectedLevel, selectedType]);

  const handleSubjectToggle = (subjectName: string) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subjectName)) {
        return prev.filter((name) => name !== subjectName);
      } else {
        return [...prev, subjectName];
      }
    });
  };

  const findCareerMatches = () => {
    if (selectedSubjects.length === 0) {
      alert("Please select at least one subject or interest");
      return;
    }

    // Create comprehensive career matches based on selected subjects
    const matches = selectedSubjects.flatMap((subjectName) => {
      const subject = indianSubjectsDataset.find((s) => s.name === subjectName);
      if (!subject) return [];

      return subject.career_paths.map((path, index) => ({
        path: path,
        subject: subject.name,
        category: subject.category,
        description: subject.description,
        difficulty: subject.difficulty,
        trending: subject.trending,
        skills: subject.related_skills,
        job_prospects: subject.job_prospects,
        education_requirements: [subject.level],
        growth_potential: subject.trending ? "high" : "medium",
        salary_range: generateSalaryRange(path, subject.category),
        match_score: calculateMatchScore(subject, selectedSubjects.length),
      }));
    });

    // Remove duplicates and sort by match score
    const uniqueMatches = matches
      .filter(
        (match, index, self) =>
          index === self.findIndex((m) => m.path === match.path),
      )
      .sort((a, b) => b.match_score - a.match_score);

    setCareerMatches(uniqueMatches.slice(0, 20)); // Top 20 matches
    setShowResults(true);
  };

  const generateSalaryRange = (
    careerPath: string,
    category: string,
  ): string => {
    const salaryRanges = {
      Technology: "₹6-80 LPA",
      Science: "₹4-60 LPA",
      Commerce: "₹5-50 LPA",
      "Health Sciences": "₹6-80 LPA",
      "Creative Arts": "₹3-40 LPA",
      Business: "₹6-100 LPA",
      Media: "₹4-50 LPA",
      Sports: "₹3-50 LPA",
    };
    return salaryRanges[category as keyof typeof salaryRanges] || "₹3-40 LPA";
  };

  const calculateMatchScore = (
    subject: IndianSubject,
    totalSelected: number,
  ): number => {
    let score = 50; // Base score
    if (subject.trending) score += 20;
    if (subject.difficulty === "Easy") score += 10;
    if (subject.difficulty === "Medium") score += 15;
    if (subject.difficulty === "Hard") score += 5;
    if (subject.type === "Core") score += 15;
    score += Math.min(subject.career_paths.length * 2, 20);
    return Math.min(score, 100);
  };

  const clearSelection = () => {
    setSelectedSubjects([]);
    setCareerMatches([]);
    setShowResults(false);
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setSelectedType("all");
  };

  const SubjectCard = ({
    subject,
    isSelected,
    onClick,
  }: {
    subject: IndianSubject;
    isSelected: boolean;
    onClick: () => void;
  }) => {
    const IconComponent =
      categoryIcons[subject.category as keyof typeof categoryIcons] || BookOpen;

    return (
      <Card
        className={`
          cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 group relative
          ${
            isSelected
              ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-300 shadow-lg"
              : "hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
          }
        `}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <IconComponent className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-sm leading-tight text-gray-900 dark:text-gray-100">
                  {subject.name}
                </h3>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                {subject.category}{" "}
                {subject.subcategory && `• ${subject.subcategory}`}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {subject.type} • {subject.level}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              {subject.trending && (
                <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                  <TrendingUp className="w-2.5 h-2.5 mr-1" />
                  Hot
                </Badge>
              )}
              <Badge
                className={`text-xs px-1.5 py-0.5 ${difficultyColors[subject.difficulty]}`}
              >
                {subject.difficulty}
              </Badge>
            </div>
          </div>

          <p className="text-xs text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
            {subject.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <Briefcase className="w-3 h-3 text-green-600" />
              <span className="text-gray-700 dark:text-gray-300">
                {subject.career_paths.length} career paths
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Award className="w-3 h-3 text-purple-600" />
              <span className="text-gray-700 dark:text-gray-300">
                {subject.related_skills.length} skills
              </span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex flex-wrap gap-1">
              {subject.related_skills.slice(0, 2).map((skill, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs px-1.5 py-0.5"
                >
                  {skill}
                </Badge>
              ))}
              {subject.related_skills.length > 2 && (
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  +{subject.related_skills.length - 2}
                </Badge>
              )}
            </div>
          </div>

          {isSelected && (
            <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
              <div className="text-xs text-blue-700 dark:text-blue-300">
                <span className="font-medium">Career paths:</span>
                <div className="mt-1 space-y-1">
                  {subject.career_paths.slice(0, 3).map((path, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" />
                      <span>{path}</span>
                    </div>
                  ))}
                  {subject.career_paths.length > 3 && (
                    <div className="text-xs text-blue-600 dark:text-blue-400">
                      +{subject.career_paths.length - 3} more careers
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {isSelected && (
            <div className="absolute top-2 right-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const CareerMatchCard = ({ match, index }: { match: any; index: number }) => (
    <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-4 border-blue-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100">
              {match.path}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Based on:{" "}
              <span className="font-medium text-blue-600">{match.subject}</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {match.description}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Badge variant="outline" className="font-semibold">
              #{index + 1}
            </Badge>
            <Badge className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              {match.match_score}% match
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-sm">{match.salary_range}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span
              className={`text-sm px-2 py-1 rounded-full ${
                match.growth_potential === "high"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                  : match.growth_potential === "medium"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {match.growth_potential} growth
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-600" />
            <span
              className={`text-sm px-2 py-1 rounded-full ${difficultyColors[match.difficulty]}`}
            >
              {match.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {match.trending ? (
              <TrendingUp className="w-4 h-4 text-red-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-sm">
              {match.trending ? "Trending" : "Stable"}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-2 text-gray-800 dark:text-gray-200">
            Required Skills:
          </h4>
          <div className="flex flex-wrap gap-1">
            {match.skills.slice(0, 4).map((skill: string, i: number) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {match.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{match.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-2 text-gray-800 dark:text-gray-200">
            Job Opportunities:
          </h4>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {match.job_prospects.slice(0, 3).join(", ")}
            {match.job_prospects.length > 3 && "..."}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-2 text-gray-800 dark:text-gray-200">
            Category:
          </h4>
          <Badge variant="outline">{match.category}</Badge>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <BookOpen className="w-4 h-4 mr-1" />
            Learn More
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setSelectedCareerForMapping(match.path);
              setShowAdvancedMapping(true);
            }}
            className="flex-1"
          >
            <ArrowRight className="w-4 h-4 mr-1" />
            Get Roadmap
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              🎯 Your Career Matches
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
              Based on your selected subjects:
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {selectedSubjects.map((subject, i) => (
                <Badge key={i} variant="default" className="text-sm">
                  {subject}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button onClick={() => setShowResults(false)} variant="outline">
                Back to Selection
              </Button>
              <Button onClick={clearSelection} variant="outline">
                Start Over
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerMatches.map((match, index) => (
              <CareerMatchCard key={index} match={match} index={index} />
            ))}
          </div>

          {careerMatches.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No matches found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try selecting different subjects or broadening your selection
              </p>
              <Button onClick={() => setShowResults(false)}>
                Try Different Subjects
              </Button>
            </div>
          )}

          {/* Advanced Career Mapping Modal */}
          {showAdvancedMapping && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Advanced Career Mapping
                    </h2>
                    <Button
                      variant="outline"
                      onClick={() => setShowAdvancedMapping(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <AdvancedCareerMapping
                    selectedCareer={selectedCareerForMapping}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            🎓 Find Your Career by Interest & Subjects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            Select subjects you're passionate about and discover matching career
            paths
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive database of Indian education subjects from school to
            college level
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          {/* View Toggle */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              <Button
                variant={currentView === "subjects" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("subjects")}
                className="mr-1"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Indian Subjects
              </Button>
              <Button
                variant={currentView === "interests" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView("interests")}
              >
                <Star className="w-4 h-4 mr-2" />
                General Interests
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search subjects, careers, or skills... (e.g., Physics, Computer Science, etc.)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-lg py-3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
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

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Education Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="School">School Level</SelectItem>
                  <SelectItem value="College">College Level</SelectItem>
                  <SelectItem value="Both">Both Levels</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Subject Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Core">Core Subjects</SelectItem>
                  <SelectItem value="Elective">Elective Subjects</SelectItem>
                  <SelectItem value="Vocational">
                    Vocational Subjects
                  </SelectItem>
                  <SelectItem value="Lab">Laboratory Subjects</SelectItem>
                  <SelectItem value="Co-curricular">Co-curricular</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={clearSelection}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Selected Subjects */}
          {selectedSubjects.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  Selected Subjects ({selectedSubjects.length})
                </h3>
                <Button
                  onClick={() => setSelectedSubjects([])}
                  variant="outline"
                  size="sm"
                >
                  Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSubjects.map((subject) => (
                  <Badge
                    key={subject}
                    variant="default"
                    className="cursor-pointer hover:bg-blue-700 text-sm px-3 py-1"
                    onClick={() => handleSubjectToggle(subject)}
                  >
                    {subject} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
              <Button
                onClick={findCareerMatches}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                disabled={selectedSubjects.length === 0}
              >
                <Target className="w-5 h-5 mr-2" />
                Find Career Matches ({selectedSubjects.length} subjects
                selected)
              </Button>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {filteredSubjects.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Subjects
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {uniqueCategories.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Categories
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {trendingSubjects.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Trending
              </div>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {selectedSubjects.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Selected
              </div>
            </div>
          </div>

          {/* Subject Categories */}
          <Tabs
            value={selectedCategory === "all" ? "trending" : selectedCategory}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger
                value="trending"
                onClick={() => setSelectedCategory("all")}
              >
                <Zap className="w-4 h-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger
                value="Science"
                onClick={() => setSelectedCategory("Science")}
              >
                <FlaskConical className="w-4 h-4 mr-2" />
                Science
              </TabsTrigger>
              <TabsTrigger
                value="Technology"
                onClick={() => setSelectedCategory("Technology")}
              >
                <Code className="w-4 h-4 mr-2" />
                Technology
              </TabsTrigger>
              <TabsTrigger
                value="Commerce"
                onClick={() => setSelectedCategory("Commerce")}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Commerce
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  🔥 Trending Subjects
                  <Badge variant="destructive" className="text-xs">
                    High Demand
                  </Badge>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  High-demand subjects with excellent career prospects and
                  growth potential
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {trendingSubjects.slice(0, 16).map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    isSelected={selectedSubjects.includes(subject.name)}
                    onClick={() => handleSubjectToggle(subject.name)}
                  />
                ))}
              </div>
            </TabsContent>

            {uniqueCategories.map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {category} Subjects
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Explore {category.toLowerCase()} subjects and their career
                    opportunities
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredSubjects
                    .filter((subject) => subject.category === category)
                    .slice(0, 20)
                    .map((subject) => (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        isSelected={selectedSubjects.includes(subject.name)}
                        onClick={() => handleSubjectToggle(subject.name)}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* All Subjects Grid */}
          {selectedCategory === "all" && searchQuery && (
            <div className="mt-8">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Search Results ({filteredSubjects.length})
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Results for "{searchQuery}"
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredSubjects.slice(0, 40).map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    isSelected={selectedSubjects.includes(subject.name)}
                    onClick={() => handleSubjectToggle(subject.name)}
                  />
                ))}
              </div>

              {filteredSubjects.length > 40 && (
                <div className="text-center mt-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Showing 40 of {filteredSubjects.length} subjects
                  </p>
                  <Button variant="outline">Load More Subjects</Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Call to Action */}
        {selectedSubjects.length === 0 && !searchQuery && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
              <GraduationCap className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Start Exploring Your Academic Interests
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Select subjects you've studied or are interested in to discover
              matching career paths
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>💡 Covers all major Indian education boards</span>
              <span>•</span>
              <span>🎯 From school to college level</span>
              <span>•</span>
              <span>🚀 Including emerging fields</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
