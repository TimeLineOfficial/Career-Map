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
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  ArrowRight,
  BookOpen,
  Target,
  Users,
  TrendingUp,
  Clock,
  DollarSign,
  Star,
  Award,
  Briefcase,
  User,
  GraduationCap,
} from "lucide-react";
import AdvancedCareerMapping from "../components/AdvancedCareerMapping";
import DynamicCareerMap from "../components/DynamicCareerMap";

type Step =
  | "goal"
  | "stage"
  | "stream"
  | "course"
  | "personalization"
  | "results";

interface SelectedOptions {
  goal: string;
  stage: string;
  stream: string;
  course: string;
}

interface PersonalDetails {
  name: string;
  currentSkills: string[];
  experienceLevel: string;
  internshipType: string;
  interests: string[];
  careerAspirations: string;
  timeCommitment: string;
  preferredLocation: string;
}

// Popular career goals with detailed information
const careerGoals = [
  {
    id: "doctor",
    title: "Doctor / Medical Professional",
    description: "Healthcare, surgery, research, medical practice",
    icon: "🩺",
    trending: true,
    avgSalary: "₹8-50 LPA",
    duration: "5.5-8 years",
    difficulty: "High",
    demand: "Very High",
  },
  {
    id: "engineer",
    title: "Engineer / Technology Expert",
    description: "Software, mechanical, electrical, civil engineering",
    icon: "⚙️",
    trending: true,
    avgSalary: "₹5-80 LPA",
    duration: "4-6 years",
    difficulty: "Medium-High",
    demand: "Very High",
  },
  {
    id: "ias_civil_services",
    title: "IAS / Civil Services",
    description: "Government administration, policy making, public service",
    icon: "🏛️",
    trending: false,
    avgSalary: "₹56K-2.5L/month",
    duration: "3-5 years prep",
    difficulty: "Very High",
    demand: "High",
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur / Business Owner",
    description: "Startup, business management, innovation",
    icon: "🚀",
    trending: true,
    avgSalary: "Variable (₹5L-50Cr+)",
    duration: "2-10 years",
    difficulty: "High",
    demand: "High",
  },
  {
    id: "researcher_scientist",
    title: "Researcher / Scientist",
    description: "Scientific research, R&D, academic career",
    icon: "🔬",
    trending: true,
    avgSalary: "₹6-40 LPA",
    duration: "6-12 years",
    difficulty: "High",
    demand: "Medium-High",
  },
  {
    id: "teacher_professor",
    title: "Teacher / Professor",
    description: "Education, academic training, knowledge sharing",
    icon: "👨‍🏫",
    trending: false,
    avgSalary: "₹3-25 LPA",
    duration: "4-8 years",
    difficulty: "Medium",
    demand: "Medium",
  },
  {
    id: "lawyer",
    title: "Lawyer / Legal Expert",
    description: "Law practice, legal consulting, judiciary",
    icon: "⚖️",
    trending: false,
    avgSalary: "₹4-50 LPA",
    duration: "5-7 years",
    difficulty: "High",
    demand: "Medium-High",
  },
  {
    id: "data_scientist",
    title: "Data Scientist / AI Expert",
    description: "Machine learning, data analysis, artificial intelligence",
    icon: "📊",
    trending: true,
    avgSalary: "₹8-60 LPA",
    duration: "3-5 years",
    difficulty: "High",
    demand: "Very High",
  },
  {
    id: "finance_banker",
    title: "Finance Expert / Banker",
    description:
      "Investment banking, financial analysis, chartered accountancy",
    icon: "💰",
    trending: true,
    avgSalary: "₹6-80 LPA",
    duration: "3-6 years",
    difficulty: "Medium-High",
    demand: "High",
  },
  {
    id: "artist_creative",
    title: "Artist / Creative Professional",
    description: "Design, content creation, entertainment, media",
    icon: "🎨",
    trending: true,
    avgSalary: "₹3-50 LPA",
    duration: "2-6 years",
    difficulty: "Medium",
    demand: "Medium-High",
  },
  {
    id: "pilot_aviation",
    title: "Pilot / Aviation Expert",
    description: "Commercial pilot, air force, aviation management",
    icon: "✈️",
    trending: false,
    avgSalary: "₹15-80 LPA",
    duration: "2-4 years",
    difficulty: "High",
    demand: "Medium",
  },
  {
    id: "chef_culinary",
    title: "Chef / Culinary Expert",
    description: "Food industry, restaurant management, culinary arts",
    icon: "👨‍🍳",
    trending: false,
    avgSalary: "₹3-30 LPA",
    duration: "2-5 years",
    difficulty: "Medium",
    demand: "Medium",
  },
];

const experienceLevels = [
  {
    id: "beginner",
    label: "Complete Beginner",
    description: "No prior experience",
  },
  {
    id: "some_knowledge",
    label: "Some Knowledge",
    description: "Basic understanding",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    description: "1-2 years experience",
  },
  {
    id: "experienced",
    label: "Experienced",
    description: "3+ years experience",
  },
];

const internshipTypes = [
  {
    id: "none",
    label: "No Internship Yet",
    description: "Looking for first opportunity",
  },
  {
    id: "college",
    label: "College Internship",
    description: "Academic requirement",
  },
  {
    id: "industry",
    label: "Industry Internship",
    description: "Professional experience",
  },
  {
    id: "research",
    label: "Research Internship",
    description: "Academic/scientific research",
  },
  {
    id: "startup",
    label: "Startup Internship",
    description: "Early-stage company",
  },
  {
    id: "corporate",
    label: "Corporate Internship",
    description: "Large company",
  },
];

const timeCommitments = [
  {
    id: "part_time",
    label: "Part-time (10-20 hrs/week)",
    description: "Flexible learning",
  },
  {
    id: "full_time",
    label: "Full-time (40+ hrs/week)",
    description: "Intensive learning",
  },
  {
    id: "weekend",
    label: "Weekends Only",
    description: "Working professional",
  },
  {
    id: "flexible",
    label: "Flexible Schedule",
    description: "As per availability",
  },
];

export default function CareerByGoal() {
  const {
    careerMapData,
    currentLanguage,
    getText,
    generateCareerPath,
    getEducationStages,
    getStreamsByStage,
    getCoursesByStream,
    getCareerSwitchPaths,
    getCareerNotes,
    getYouTubeLectures,
  } = useDataStore();

  const [currentStep, setCurrentStep] = useState<Step>("goal");
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    goal: "",
    stage: "",
    stream: "",
    course: "",
  });
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    name: "",
    currentSkills: [],
    experienceLevel: "",
    internshipType: "",
    interests: [],
    careerAspirations: "",
    timeCommitment: "",
    preferredLocation: "",
  });
  const [careerPaths, setCareerPaths] = useState<any[]>([]);
  const [careerSwitchPaths, setCareerSwitchPaths] = useState<any[]>([]);
  const [showAdvancedMapping, setShowAdvancedMapping] = useState(false);
  const [showAdvancedCareerModal, setShowAdvancedCareerModal] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");

  const educationStages = getEducationStages();

  const handleGoalSelect = (goalId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      goal: goalId,
      stage: "",
      stream: "",
      course: "",
    }));
    setCurrentStep("stage");
  };

  const handleStageSelect = (stageId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      stage: stageId,
      stream: "",
      course: "",
    }));
    setCurrentStep("stream");
  };

  const handleStreamSelect = (stream: string) => {
    setSelectedOptions((prev) => ({ ...prev, stream, course: "" }));

    // For working professionals, go to personalization directly
    if (selectedOptions.stage === "working_professional") {
      setCurrentStep("personalization");
    } else {
      setCurrentStep("course");
    }
  };

  const handleCourseSelect = (course: string) => {
    setSelectedOptions((prev) => ({ ...prev, course }));
    setCurrentStep("personalization");
  };

  const addSkill = () => {
    if (
      skillInput.trim() &&
      !personalDetails.currentSkills.includes(skillInput.trim())
    ) {
      setPersonalDetails((prev) => ({
        ...prev,
        currentSkills: [...prev.currentSkills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setPersonalDetails((prev) => ({
      ...prev,
      currentSkills: prev.currentSkills.filter((s) => s !== skill),
    }));
  };

  const addInterest = () => {
    if (
      interestInput.trim() &&
      !personalDetails.interests.includes(interestInput.trim())
    ) {
      setPersonalDetails((prev) => ({
        ...prev,
        interests: [...prev.interests, interestInput.trim()],
      }));
      setInterestInput("");
    }
  };

  const removeInterest = (interest: string) => {
    setPersonalDetails((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const generateResults = () => {
    // Generate career paths based on all selections and personal details
    const selectedGoal = careerGoals.find((g) => g.id === selectedOptions.goal);
    const goal =
      selectedGoal?.title || selectedOptions.course || selectedOptions.stream;

    const paths = generateCareerPath(selectedOptions.stage, goal);
    setCareerPaths(paths);

    // For working professionals, show career switch paths
    if (selectedOptions.stage === "working_professional") {
      const switchPaths = getCareerSwitchPaths(selectedOptions.stream, goal);
      setCareerSwitchPaths(switchPaths);
    }

    setCurrentStep("results");
  };

  const resetFlow = () => {
    setCurrentStep("goal");
    setSelectedOptions({ goal: "", stage: "", stream: "", course: "" });
    setPersonalDetails({
      name: "",
      currentSkills: [],
      experienceLevel: "",
      internshipType: "",
      interests: [],
      careerAspirations: "",
      timeCommitment: "",
      preferredLocation: "",
    });
    setCareerPaths([]);
    setCareerSwitchPaths([]);
    setShowAdvancedMapping(false);
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8 space-x-2 overflow-x-auto pb-2">
      {(
        [
          "goal",
          "stage",
          "stream",
          "course",
          "personalization",
          "results",
        ] as Step[]
      ).map((step, index) => {
        const isActive = currentStep === step;
        const isCompleted =
          [
            "goal",
            "stage",
            "stream",
            "course",
            "personalization",
            "results",
          ].indexOf(currentStep) > index;

        // Skip course step for working professionals
        if (
          step === "course" &&
          selectedOptions.stage === "working_professional"
        ) {
          return null;
        }

        const stepNames = {
          goal: "Goal",
          stage: "Stage",
          stream: "Stream",
          course: "Course",
          personalization: "Details",
          results: "Results",
        };

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : isCompleted
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  }
                `}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                {stepNames[step]}
              </span>
            </div>
            {index < 5 && step !== "course" ? (
              <ArrowRight className="w-4 h-4 text-gray-400 mt-2" />
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );

  const renderGoalSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          What's your career goal?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Select your dream career and we'll create a personalized roadmap to
          achieve it
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {careerGoals.map((goal) => (
          <Card
            key={goal.id}
            className="career-option-card cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-500 group relative"
            onClick={() => handleGoalSelect(goal.id)}
          >
            <CardContent className="p-6">
              <div className="text-center">
                {goal.trending && (
                  <Badge className="absolute top-2 right-2 text-xs bg-red-500">
                    🔥 Trending
                  </Badge>
                )}

                <div className="text-4xl mb-3">{goal.icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
                  {goal.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {goal.description}
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Salary:
                    </span>
                    <span className="font-medium text-green-600">
                      {goal.avgSalary}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Duration:
                    </span>
                    <span className="font-medium text-blue-600">
                      {goal.duration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Difficulty:
                    </span>
                    <span
                      className={`font-medium ${
                        goal.difficulty === "High" ||
                        goal.difficulty === "Very High"
                          ? "text-red-600"
                          : goal.difficulty === "Medium-High" ||
                              goal.difficulty === "Medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {goal.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Demand:
                    </span>
                    <span
                      className={`font-medium ${
                        goal.demand === "Very High"
                          ? "text-green-600"
                          : goal.demand === "High"
                            ? "text-blue-600"
                            : "text-yellow-600"
                      }`}
                    >
                      {goal.demand}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStageSelection = () => {
    const selectedGoal = careerGoals.find((g) => g.id === selectedOptions.goal);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            What's your current education level?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Selected Goal:{" "}
            <span className="font-semibold text-blue-600">
              {selectedGoal?.title}
            </span>
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            We'll tailor the roadmap based on your current stage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {educationStages.map((stage) => (
            <Card
              key={stage.id}
              className="career-option-card cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-500 group"
              onClick={() => handleStageSelect(stage.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <GraduationCap className="w-12 h-12 mx-auto text-blue-600 group-hover:text-blue-700" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
                  {stage.label}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {stage.id === "class_10_below" &&
                    "Foundation level guidance for future planning"}
                  {stage.id === "class_11_12" &&
                    "Stream selection for higher education"}
                  {stage.id === "undergraduate" &&
                    "Course and specialization guidance"}
                  {stage.id === "postgraduate" &&
                    "Advanced degree and research options"}
                  {stage.id === "phd" && "Research and academic career paths"}
                  {stage.id === "working_professional" &&
                    "Career switch and upskilling options"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={() => setCurrentStep("goal")}>
            Back to Goal Selection
          </Button>
        </div>
      </div>
    );
  };

  const renderStreamSelection = () => {
    const streams = getStreamsByStage(selectedOptions.stage);
    const selectedGoal = careerGoals.find((g) => g.id === selectedOptions.goal);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            {selectedOptions.stage === "working_professional"
              ? "What's your current industry/domain?"
              : "Choose your stream/field"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Goal:{" "}
            <span className="font-semibold text-blue-600">
              {selectedGoal?.title}
            </span>{" "}
            | Stage:{" "}
            <span className="font-semibold text-green-600">
              {selectedOptions.stage.replace("_", " ")}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {streams.map((stream) => (
            <Card
              key={stream}
              className="career-option-card cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-500 group"
              onClick={() => handleStreamSelect(stream)}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <Target className="w-12 h-12 mx-auto text-green-600 group-hover:text-green-700" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  {stream}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={() => setCurrentStep("stage")}>
            Back to Education Level
          </Button>
        </div>
      </div>
    );
  };

  const renderCourseSelection = () => {
    const courses = getCoursesByStream(selectedOptions.stream);
    const selectedGoal = careerGoals.find((g) => g.id === selectedOptions.goal);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            Select your specific course/specialization
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Goal:{" "}
            <span className="font-semibold text-blue-600">
              {selectedGoal?.title}
            </span>{" "}
            | Stream:{" "}
            <span className="font-semibold text-green-600">
              {selectedOptions.stream}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Card
              key={course}
              className="career-option-card cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-500 group"
              onClick={() => handleCourseSelect(course)}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <Users className="w-12 h-12 mx-auto text-purple-600 group-hover:text-purple-700" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  {course}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={() => setCurrentStep("stream")}>
            Back to Stream Selection
          </Button>
        </div>
      </div>
    );
  };

  const renderPersonalizationForm = () => {
    const selectedGoal = careerGoals.find((g) => g.id === selectedOptions.goal);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            Tell us more about yourself
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            This helps us create a more personalized and accurate career roadmap
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Your Name (Optional)
                </label>
                <Input
                  value={personalDetails.name}
                  onChange={(e) =>
                    setPersonalDetails((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Career Aspirations
                </label>
                <Textarea
                  value={personalDetails.careerAspirations}
                  onChange={(e) =>
                    setPersonalDetails((prev) => ({
                      ...prev,
                      careerAspirations: e.target.value,
                    }))
                  }
                  placeholder="Describe what you want to achieve in your career..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Preferred Location
                </label>
                <Input
                  value={personalDetails.preferredLocation}
                  onChange={(e) =>
                    setPersonalDetails((prev) => ({
                      ...prev,
                      preferredLocation: e.target.value,
                    }))
                  }
                  placeholder="e.g., Mumbai, Delhi, Bangalore, USA, Remote"
                />
              </div>
            </CardContent>
          </Card>

          {/* Experience & Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Experience & Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Experience Level
                </label>
                <Select
                  value={personalDetails.experienceLevel}
                  onValueChange={(value) =>
                    setPersonalDetails((prev) => ({
                      ...prev,
                      experienceLevel: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level.id} value={level.id}>
                        <div>
                          <div className="font-medium">{level.label}</div>
                          <div className="text-sm text-gray-500">
                            {level.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Internship Experience
                </label>
                <Select
                  value={personalDetails.internshipType}
                  onValueChange={(value) =>
                    setPersonalDetails((prev) => ({
                      ...prev,
                      internshipType: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select internship type" />
                  </SelectTrigger>
                  <SelectContent>
                    {internshipTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-sm text-gray-500">
                            {type.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Current Skills
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add a skill (e.g., Python, Communication, etc.)"
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button type="button" onClick={addSkill} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {personalDetails.currentSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="cursor-pointer hover:bg-red-100"
                      onClick={() => removeSkill(skill)}
                    >
                      {skill} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Additional Interests
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    placeholder="Add an interest (e.g., AI, Music, Sports, etc.)"
                    onKeyPress={(e) => e.key === "Enter" && addInterest()}
                  />
                  <Button type="button" onClick={addInterest} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {personalDetails.interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="outline"
                      className="cursor-pointer hover:bg-red-100"
                      onClick={() => removeInterest(interest)}
                    >
                      {interest} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Learning Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Learning Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Time Commitment
                </label>
                <Select
                  value={personalDetails.timeCommitment}
                  onValueChange={(value) =>
                    setPersonalDetails((prev) => ({
                      ...prev,
                      timeCommitment: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How much time can you dedicate?" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeCommitments.map((commitment) => (
                      <SelectItem key={commitment.id} value={commitment.id}>
                        <div>
                          <div className="font-medium">{commitment.label}</div>
                          <div className="text-sm text-gray-500">
                            {commitment.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Generate Career Map Button */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              🎯 Ready to Create Your Personalized Career Map?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Based on your goal:{" "}
              <span className="font-bold text-blue-600">
                {selectedGoal?.title}
              </span>
              {personalDetails.name && <span> for {personalDetails.name}</span>}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={generateResults}
                size="lg"
                className="career-map-generate-btn bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                🗺️ Generate My Personalized Career Map
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  selectedOptions.stage === "working_professional"
                    ? setCurrentStep("stream")
                    : setCurrentStep("course")
                }
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const selectedGoal = careerGoals.find((g) => g.id === selectedOptions.goal);

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            Your Personalized Career Roadmap
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Goal:{" "}
            <span className="font-bold text-blue-600">
              {selectedGoal?.title}
            </span>
            {personalDetails.name && <span> for {personalDetails.name}</span>}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {selectedOptions.stage} → {selectedOptions.stream}
            {selectedOptions.course && ` → ${selectedOptions.course}`}
          </p>
        </div>

        {/* Personal Summary */}
        {(personalDetails.name ||
          personalDetails.currentSkills.length > 0 ||
          personalDetails.experienceLevel) && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardHeader>
              <CardTitle className="text-center">
                Personal Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                {personalDetails.name && (
                  <div>
                    <strong>Name:</strong> {personalDetails.name}
                  </div>
                )}
                {personalDetails.experienceLevel && (
                  <div>
                    <strong>Experience:</strong>{" "}
                    {
                      experienceLevels.find(
                        (e) => e.id === personalDetails.experienceLevel,
                      )?.label
                    }
                  </div>
                )}
                {personalDetails.internshipType && (
                  <div>
                    <strong>Internship:</strong>{" "}
                    {
                      internshipTypes.find(
                        (i) => i.id === personalDetails.internshipType,
                      )?.label
                    }
                  </div>
                )}
                {personalDetails.timeCommitment && (
                  <div>
                    <strong>Time Commitment:</strong>{" "}
                    {
                      timeCommitments.find(
                        (t) => t.id === personalDetails.timeCommitment,
                      )?.label
                    }
                  </div>
                )}
                {personalDetails.preferredLocation && (
                  <div>
                    <strong>Preferred Location:</strong>{" "}
                    {personalDetails.preferredLocation}
                  </div>
                )}
              </div>

              {personalDetails.currentSkills.length > 0 && (
                <div className="mt-4">
                  <strong className="text-sm">Current Skills:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {personalDetails.currentSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {personalDetails.interests.length > 0 && (
                <div className="mt-4">
                  <strong className="text-sm">Interests:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {personalDetails.interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="outline"
                        className="text-xs"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Dynamic Career Map */}
        <DynamicCareerMap
          currentStage={selectedOptions.stage}
          goal={
            selectedGoal?.title ||
            selectedOptions.course ||
            selectedOptions.stream
          }
          onPathGenerated={(path) => {
            console.log("Career path generated:", path);
          }}
        />

        {/* Career Path Steps */}
        {careerPaths.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recommended Career Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {careerPaths.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {step.description}
                      </p>

                      {step.exams && step.exams.length > 0 && (
                        <div className="mb-2">
                          <span className="text-sm font-medium">
                            Key Exams:{" "}
                          </span>
                          {step.exams.map((exam: string, i: number) => (
                            <Badge key={i} variant="outline" className="mr-1">
                              {exam}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {step.courses && step.courses.length > 0 && (
                        <div>
                          <span className="text-sm font-medium">
                            Recommended Courses:{" "}
                          </span>
                          {step.courses.map((course: string, i: number) => (
                            <Badge key={i} variant="secondary" className="mr-1">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => setShowAdvancedMapping(!showAdvancedMapping)}
              variant="outline"
            >
              {showAdvancedMapping ? "Hide" : "Show"} Advanced Career Resources
            </Button>
            <Button onClick={() => setShowAdvancedCareerModal(true)}>
              Get Complete Career Roadmap
            </Button>
            <Button onClick={resetFlow} variant="outline">
              Start Over
            </Button>
          </div>
        </div>

        {/* Advanced Career Resources */}
        {showAdvancedMapping && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Career Notes & Guide</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const notes = getCareerNotes(
                    selectedGoal?.title ||
                      selectedOptions.course ||
                      selectedOptions.stream,
                  );
                  return (
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        {notes.summary}
                      </p>

                      <div>
                        <h5 className="font-semibold mb-2">Key Topics:</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {notes.topics.map((topic: string, i: number) => (
                            <li key={i}>{topic}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold mb-2">
                          Learning Timeline:
                        </h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <strong>Beginner:</strong> {notes.timeline.beginner}
                          </div>
                          <div>
                            <strong>Intermediate:</strong>{" "}
                            {notes.timeline.intermediate}
                          </div>
                          <div>
                            <strong>Advanced:</strong> {notes.timeline.advanced}
                          </div>
                          <div>
                            <strong>Expert:</strong> {notes.timeline.expert}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>YouTube Lectures</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const lectures = getYouTubeLectures(
                    selectedGoal?.title ||
                      selectedOptions.course ||
                      selectedOptions.stream,
                  );
                  return (
                    <div className="space-y-3">
                      {lectures.map((lecture: any, i: number) => (
                        <div key={i} className="border rounded-lg p-3">
                          <h6 className="font-semibold text-sm">
                            {lecture.title}
                          </h6>
                          <div className="flex justify-between items-center text-xs text-gray-600 mt-1">
                            <span>{lecture.channel}</span>
                            <span>{lecture.duration}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex gap-2">
                              <Badge variant="outline" className="text-xs">
                                {lecture.views} views
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                ★ {lecture.rating}
                              </Badge>
                            </div>
                            <Button
                              size="sm"
                              variant="link"
                              className="text-xs p-0"
                            >
                              Watch Now
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {getText("career_by_goal_title", currentLanguage) ||
              "Career by Goal"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {getText("career_by_goal_subtitle", currentLanguage) ||
              "Set your career goal and get a personalized roadmap to achieve it"}
          </p>
        </div>

        <StepIndicator />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {currentStep === "goal" && renderGoalSelection()}
          {currentStep === "stage" && renderStageSelection()}
          {currentStep === "stream" && renderStreamSelection()}
          {currentStep === "course" && renderCourseSelection()}
          {currentStep === "personalization" && renderPersonalizationForm()}
          {currentStep === "results" && renderResults()}
        </div>

        {/* Advanced Career Mapping Modal */}
        {showAdvancedCareerModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Complete Career Roadmap
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowAdvancedCareerModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <AdvancedCareerMapping
                  selectedField={
                    careerGoals.find((g) => g.id === selectedOptions.goal)
                      ?.title ||
                    selectedOptions.course ||
                    selectedOptions.stream
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
