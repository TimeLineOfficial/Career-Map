import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ArrowRight,
  BookOpen,
  Target,
  Award,
  Clock,
  Users,
  Star,
  CheckCircle,
  ExternalLink,
  PlayCircle,
} from "lucide-react";

interface CareerMapProps {
  currentStage: string;
  goal: string;
  onPathGenerated?: (path: CareerStep[]) => void;
}

interface CareerStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  requirements: string[];
  options?: string[];
  exams?: string[];
  nextSteps?: string[];
  resources?: {
    title: string;
    type: "link" | "video" | "course";
    url?: string;
  }[];
  isCompleted?: boolean;
  isActive?: boolean;
  difficulty?: "Easy" | "Medium" | "Hard" | "Very Hard";
  importance?: "Low" | "Medium" | "High" | "Critical";
}

export default function DynamicCareerMap({
  currentStage,
  goal,
  onPathGenerated,
}: CareerMapProps) {
  const [careerPath, setCareerPath] = useState<CareerStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Comprehensive career mapping database with PCM/PCB specific paths
  const careerMappings = {
    // PCM Stream Career Paths
    class_11_12_pcm_engineer: [
      {
        id: "step_1",
        title: "Complete 12th PCM with Strong Foundation",
        description: "Focus on Physics, Chemistry, Mathematics with 85%+ marks",
        duration: "2 years",
        requirements: [
          "Strong conceptual understanding",
          "Regular practice",
          "NCERT mastery",
        ],
        difficulty: "Medium",
        importance: "Critical",
        resources: [
          { title: "NCERT Physics Solutions", type: "link" },
          { title: "Chemistry Khan Academy", type: "video" },
          { title: "Mathematics for JEE", type: "course" },
        ],
        nextSteps: [
          "JEE Main preparation",
          "State CET preparation",
          "Board exam focus",
        ],
      },
      {
        id: "step_2",
        title: "Engineering Entrance Preparation",
        description:
          "Intensive preparation for JEE Main/Advanced and state CETs",
        duration: "1-2 years",
        requirements: [
          "12th PCM completed",
          "Coaching/self-study plan",
          "Mock test practice",
        ],
        exams: [
          "JEE Main",
          "JEE Advanced",
          "MHT CET",
          "BITSAT",
          "VITEEE",
          "COMEDK",
        ],
        difficulty: "Very Hard",
        importance: "Critical",
        options: [
          "Self Study with Online Resources",
          "Coaching Institutes (Kota/Local)",
          "Hybrid Online + Offline",
          "Distance Learning Programs",
        ],
        resources: [
          { title: "JEE Main Previous Papers", type: "link" },
          { title: "Physics Wallah JEE", type: "video" },
          { title: "Unacademy JEE Course", type: "course" },
        ],
        nextSteps: [
          "College selection",
          "Branch preference",
          "Counselling process",
        ],
      },
      {
        id: "step_3",
        title: "BTech Specialization Selection",
        description:
          "Choose engineering branch based on interests and market demand",
        duration: "4 years",
        requirements: [
          "JEE/CET qualification",
          "College admission",
          "Branch allocation",
        ],
        difficulty: "Medium",
        importance: "High",
        options: [
          "Computer Science Engineering (CSE)",
          "Electronics & Communication (ECE)",
          "Mechanical Engineering",
          "Civil Engineering",
          "Electrical Engineering",
          "Chemical Engineering",
          "Aerospace Engineering",
          "Biotechnology Engineering",
          "Data Science & Engineering",
          "AI & Machine Learning",
        ],
        resources: [
          { title: "Engineering Branch Guide", type: "link" },
          { title: "Career in Engineering", type: "video" },
          { title: "Industry Trends Report", type: "link" },
        ],
        nextSteps: [
          "Academic excellence",
          "Practical projects",
          "Internship preparation",
        ],
      },
      {
        id: "step_4",
        title: "Skill Development & Projects",
        description:
          "Build technical skills and create impressive project portfolio",
        duration: "2-3 years (during BTech)",
        requirements: [
          "Programming fundamentals",
          "Domain knowledge",
          "Project ideas",
        ],
        difficulty: "Medium",
        importance: "High",
        options: [
          "Open Source Contributions",
          "Research Projects",
          "Industry Collaborations",
          "Startup Projects",
          "Competitive Programming",
          "Technical Certifications",
        ],
        resources: [
          { title: "GitHub for Engineers", type: "course" },
          { title: "Project Ideas Repository", type: "link" },
          { title: "Technical Interview Prep", type: "video" },
        ],
        nextSteps: [
          "Internship applications",
          "Job preparation",
          "Higher studies planning",
        ],
      },
      {
        id: "step_5",
        title: "Career Launch & Growth",
        description: "Secure placement or pursue higher education",
        duration: "1-2 years",
        requirements: ["BTech degree", "Strong portfolio", "Interview skills"],
        difficulty: "Medium",
        importance: "Critical",
        options: [
          "Campus Placements",
          "Off-Campus Job Hunt",
          "MTech/MS Abroad",
          "Gate Preparation",
          "Startup Founding",
          "Civil Services (IES/UPSC)",
        ],
        resources: [
          { title: "Placement Preparation Guide", type: "course" },
          { title: "Resume Building Workshop", type: "video" },
          { title: "Salary Negotiation Tips", type: "link" },
        ],
      },
    ],

    // PCB Stream to Medical Career
    class_11_12_pcb_doctor: [
      {
        id: "step_1",
        title: "Excel in 12th PCB",
        description: "Master Physics, Chemistry, Biology with 90%+ marks",
        duration: "2 years",
        requirements: [
          "Deep understanding of concepts",
          "Diagram practice",
          "Regular revision",
        ],
        difficulty: "Hard",
        importance: "Critical",
        resources: [
          { title: "NCERT Biology Complete", type: "link" },
          { title: "Chemistry for NEET", type: "video" },
          { title: "Physics Simplified", type: "course" },
        ],
        nextSteps: [
          "NEET preparation strategy",
          "Mock test series",
          "Conceptual clarity",
        ],
      },
      {
        id: "step_2",
        title: "NEET Preparation & Qualification",
        description:
          "Clear National Eligibility cum Entrance Test for medical admission",
        duration: "1-2 years",
        requirements: [
          "12th PCB completed",
          "NEET registration",
          "Systematic preparation",
        ],
        exams: ["NEET UG", "AIIMS (if applicable)", "JIPMER (if applicable)"],
        difficulty: "Very Hard",
        importance: "Critical",
        options: [
          "Coaching Institutes (Kota/Allen/Aakash)",
          "Self Study with Online Platforms",
          "Hybrid Preparation Method",
          "One Year Dedicated Preparation",
          "Two Year Integrated Program",
        ],
        resources: [
          { title: "NEET Previous 20 Years", type: "link" },
          { title: "Biology Video Lectures", type: "video" },
          { title: "NEET Mock Test Series", type: "course" },
        ],
        nextSteps: [
          "College selection",
          "Counselling process",
          "Seat allocation",
        ],
      },
      {
        id: "step_3",
        title: "MBBS Course Completion",
        description: "Complete Bachelor of Medicine and Bachelor of Surgery",
        duration: "5.5 years (4.5 years + 1 year internship)",
        requirements: [
          "NEET qualification",
          "Medical college admission",
          "Academic excellence",
        ],
        difficulty: "Hard",
        importance: "Critical",
        options: [
          "Government Medical Colleges",
          "Private Medical Colleges",
          "Deemed Universities",
          "AIIMS/JIPMER Institutions",
          "International Medical Colleges",
        ],
        resources: [
          { title: "Medical Textbooks Guide", type: "link" },
          { title: "Clinical Skills Videos", type: "video" },
          { title: "Medical Ethics Course", type: "course" },
        ],
        nextSteps: [
          "Internship completion",
          "Medical registration",
          "Career path selection",
        ],
      },
      {
        id: "step_4",
        title: "Medical Registration & Practice Setup",
        description: "Get medical license and choose practice type",
        duration: "6 months - 1 year",
        requirements: [
          "MBBS completion",
          "Internship certificate",
          "Medical Council registration",
        ],
        difficulty: "Medium",
        importance: "Critical",
        options: [
          "General Practice",
          "Government Medical Officer",
          "Private Hospital Employment",
          "MD/MS Preparation",
          "Fellowship Programs",
          "Medical PG Entrance (NEET PG)",
        ],
        resources: [
          { title: "Medical Registration Process", type: "link" },
          { title: "Setting Up Practice", type: "video" },
          { title: "Medical Law & Ethics", type: "course" },
        ],
        nextSteps: [
          "Specialization decision",
          "Practice growth",
          "Continuous learning",
        ],
      },
      {
        id: "step_5",
        title: "Specialization & Career Growth",
        description: "Pursue MD/MS or establish successful practice",
        duration: "3-5 years",
        requirements: [
          "Medical practice experience",
          "NEET PG (for specialization)",
          "Professional network",
        ],
        difficulty: "Hard",
        importance: "High",
        options: [
          "MD - Internal Medicine",
          "MS - Surgery",
          "MD - Pediatrics",
          "MD - Radiology",
          "MS - Orthopedics",
          "MD - Dermatology",
          "MD - Psychiatry",
          "Fellowship in Sub-specialties",
        ],
        resources: [
          { title: "PG Medical Entrance Prep", type: "course" },
          { title: "Specialty Selection Guide", type: "link" },
          { title: "Medical Career Progression", type: "video" },
        ],
      },
    ],

    // Commerce to Business/Finance
    class_11_12_commerce_business: [
      {
        id: "step_1",
        title: "Excel in Commerce Subjects",
        description:
          "Master Accountancy, Business Studies, Economics with 85%+ marks",
        duration: "2 years",
        requirements: [
          "Strong foundation in commerce",
          "Practical knowledge",
          "Case study analysis",
        ],
        difficulty: "Medium",
        importance: "High",
        resources: [
          { title: "Commerce NCERT Solutions", type: "link" },
          { title: "Business Studies Videos", type: "video" },
          { title: "Economics Simplified", type: "course" },
        ],
        nextSteps: [
          "Bachelor degree selection",
          "Entrance exam preparation",
          "Career planning",
        ],
      },
      {
        id: "step_2",
        title: "Bachelor Degree in Commerce/Management",
        description: "Choose appropriate undergraduate program",
        duration: "3 years",
        requirements: [
          "12th Commerce completed",
          "College admission",
          "Academic focus",
        ],
        difficulty: "Medium",
        importance: "High",
        options: [
          "BCom (Bachelor of Commerce)",
          "BBA (Bachelor of Business Administration)",
          "BCA (if interested in IT)",
          "CA Foundation + BCom",
          "CS Foundation + BCom",
          "CMA Foundation + BCom",
        ],
        resources: [
          { title: "Commerce Career Guide", type: "link" },
          { title: "Professional Course Overview", type: "video" },
          { title: "Skill Development Programs", type: "course" },
        ],
        nextSteps: [
          "Professional course planning",
          "Internship preparation",
          "Skill development",
        ],
      },
      {
        id: "step_3",
        title: "Professional Certification & Experience",
        description:
          "Pursue professional courses and gain practical experience",
        duration: "2-4 years",
        requirements: [
          "Bachelor degree progress",
          "Professional course enrollment",
          "Practical training",
        ],
        difficulty: "Hard",
        importance: "High",
        options: [
          "Chartered Accountancy (CA)",
          "Company Secretary (CS)",
          "Cost & Management Accountant (CMA)",
          "Financial Risk Manager (FRM)",
          "Chartered Financial Analyst (CFA)",
          "Digital Marketing Certification",
        ],
        resources: [
          { title: "CA Course Structure", type: "link" },
          { title: "Professional Exam Strategies", type: "video" },
          { title: "Industry Internship Guide", type: "course" },
        ],
        nextSteps: [
          "Job market entry",
          "MBA preparation",
          "Entrepreneurship planning",
        ],
      },
      {
        id: "step_4",
        title: "Career Launch & MBA Preparation",
        description: "Enter job market or prepare for management education",
        duration: "1-3 years",
        requirements: [
          "Degree completion",
          "Professional qualification",
          "Work experience",
        ],
        difficulty: "Medium",
        importance: "High",
        options: [
          "Corporate Jobs (Finance/Marketing/HR)",
          "Banking Sector Entry",
          "Consulting Firms",
          "MBA Preparation (CAT/XAT/GMAT)",
          "Startup Opportunities",
          "Government Job Preparation",
        ],
        resources: [
          { title: "MBA Entrance Preparation", type: "course" },
          { title: "Corporate Interview Skills", type: "video" },
          { title: "Salary Negotiation Guide", type: "link" },
        ],
        nextSteps: [
          "MBA admission",
          "Career advancement",
          "Leadership development",
        ],
      },
    ],

    // Arts/Humanities Career Paths
    class_11_12_arts_creative: [
      {
        id: "step_1",
        title: "Develop Creative Foundation",
        description:
          "Build strong base in chosen arts subjects and creative skills",
        duration: "2 years",
        requirements: [
          "Arts subject mastery",
          "Portfolio development",
          "Creative projects",
        ],
        difficulty: "Medium",
        importance: "High",
        resources: [
          { title: "Creative Arts Portfolio Guide", type: "link" },
          { title: "Digital Design Tools", type: "video" },
          { title: "Art History & Appreciation", type: "course" },
        ],
        nextSteps: [
          "Portfolio preparation",
          "Entrance exam preparation",
          "Skill specialization",
        ],
      },
      {
        id: "step_2",
        title: "Specialized Education & Training",
        description: "Pursue higher education in chosen creative field",
        duration: "3-4 years",
        requirements: [
          "12th Arts completed",
          "Portfolio/entrance exam",
          "Creative aptitude",
        ],
        difficulty: "Medium",
        importance: "High",
        options: [
          "Bachelor of Fine Arts (BFA)",
          "Bachelor of Design (B.Des)",
          "Mass Communication & Journalism",
          "Psychology & Social Work",
          "Language & Literature Studies",
          "Film & Television Studies",
        ],
        resources: [
          { title: "Creative Career Pathways", type: "link" },
          { title: "Industry Trends in Arts", type: "video" },
          { title: "Professional Development Course", type: "course" },
        ],
        nextSteps: [
          "Skill enhancement",
          "Industry exposure",
          "Network building",
        ],
      },
      {
        id: "step_3",
        title: "Professional Skill Development",
        description: "Master industry-relevant tools and techniques",
        duration: "1-2 years",
        requirements: [
          "Basic education completed",
          "Software proficiency",
          "Industry awareness",
        ],
        difficulty: "Medium",
        importance: "High",
        options: [
          "Adobe Creative Suite Mastery",
          "Digital Marketing & Content Creation",
          "UI/UX Design Specialization",
          "Video Production & Editing",
          "Graphic Design & Branding",
          "Writing & Content Strategy",
        ],
        resources: [
          { title: "Industry Software Training", type: "course" },
          { title: "Freelancing Guide for Creatives", type: "link" },
          { title: "Building Creative Business", type: "video" },
        ],
        nextSteps: [
          "Portfolio building",
          "Client acquisition",
          "Career establishment",
        ],
      },
    ],

    // Working Professional Career Switch
    working_professional_tech_transition: [
      {
        id: "step_1",
        title: "Assess Current Skills & Market Gap",
        description:
          "Evaluate transferable skills and identify technology learning path",
        duration: "2-4 weeks",
        requirements: [
          "Current role analysis",
          "Market research",
          "Goal setting",
        ],
        difficulty: "Easy",
        importance: "Critical",
        resources: [
          { title: "Skill Gap Analysis Tool", type: "link" },
          { title: "Tech Career Transition Guide", type: "video" },
          { title: "Industry Research Methods", type: "course" },
        ],
        nextSteps: [
          "Learning path design",
          "Resource allocation",
          "Timeline planning",
        ],
      },
      {
        id: "step_2",
        title: "Foundation Learning & Certification",
        description: "Build technical foundation through structured learning",
        duration: "6-12 months",
        requirements: [
          "Learning schedule",
          "Practice environment",
          "Progress tracking",
        ],
        difficulty: "Hard",
        importance: "Critical",
        options: [
          "Full Stack Web Development",
          "Data Science & Analytics",
          "Cloud Computing (AWS/Azure)",
          "Digital Marketing & Growth",
          "Product Management",
          "Cybersecurity Fundamentals",
        ],
        resources: [
          { title: "Coding Bootcamp Programs", type: "course" },
          { title: "Free Programming Resources", type: "link" },
          { title: "Career Transition Success Stories", type: "video" },
        ],
        nextSteps: [
          "Project portfolio",
          "Networking",
          "Job search preparation",
        ],
      },
      {
        id: "step_3",
        title: "Portfolio Development & Job Search",
        description:
          "Create impressive portfolio and start job hunting process",
        duration: "3-6 months",
        requirements: [
          "Completed projects",
          "GitHub profile",
          "Professional network",
        ],
        difficulty: "Medium",
        importance: "Critical",
        options: [
          "Freelance Project Experience",
          "Open Source Contributions",
          "Personal Project Showcase",
          "Industry Networking Events",
          "Professional Referrals",
          "Direct Company Applications",
        ],
        resources: [
          { title: "Tech Portfolio Examples", type: "link" },
          { title: "Interview Preparation Guide", type: "course" },
          { title: "Salary Negotiation for Career Switchers", type: "video" },
        ],
      },
    ],
  };

  const generateCareerPath = (stage: string, goal: string): CareerStep[] => {
    const stageLower = stage.toLowerCase();
    const goalLower = goal.toLowerCase();

    // Enhanced matching logic for specific stream combinations
    let mappingKey = "";

    // PCM Stream paths
    if (stageLower.includes("11_12") || stageLower.includes("class_11")) {
      if (
        goalLower.includes("engineer") ||
        goalLower.includes("technology") ||
        goalLower.includes("computer") ||
        goalLower.includes("software")
      ) {
        mappingKey = "class_11_12_pcm_engineer";
      }
    }

    // PCB Stream paths
    if (stageLower.includes("11_12") || stageLower.includes("class_11")) {
      if (
        goalLower.includes("doctor") ||
        goalLower.includes("medical") ||
        goalLower.includes("mbbs") ||
        goalLower.includes("physician")
      ) {
        mappingKey = "class_11_12_pcb_doctor";
      }
    }

    // Commerce Stream paths
    if (stageLower.includes("11_12") || stageLower.includes("class_11")) {
      if (
        goalLower.includes("business") ||
        goalLower.includes("finance") ||
        goalLower.includes("commerce") ||
        goalLower.includes("management")
      ) {
        mappingKey = "class_11_12_commerce_business";
      }
    }

    // Arts Stream paths
    if (stageLower.includes("11_12") || stageLower.includes("class_11")) {
      if (
        goalLower.includes("arts") ||
        goalLower.includes("creative") ||
        goalLower.includes("design") ||
        goalLower.includes("media")
      ) {
        mappingKey = "class_11_12_arts_creative";
      }
    }

    // Working Professional paths
    if (stageLower.includes("working") || stageLower.includes("professional")) {
      if (
        goalLower.includes("tech") ||
        goalLower.includes("software") ||
        goalLower.includes("data") ||
        goalLower.includes("programming")
      ) {
        mappingKey = "working_professional_tech_transition";
      }
    }

    // Direct mapping lookup
    if (careerMappings[mappingKey as keyof typeof careerMappings]) {
      return careerMappings[mappingKey as keyof typeof careerMappings];
    }

    // Fallback: Generate generic path based on goal keywords
    if (goalLower.includes("doctor") || goalLower.includes("medical")) {
      // Use medical path but adapt for different stages
      const medicalPath = careerMappings.class_11_12_pcb_doctor;
      if (stageLower.includes("10")) {
        return [
          {
            id: "choose_pcb",
            title: "Choose PCB Stream in 11th-12th",
            description:
              "Select Physics, Chemistry, Biology with Mathematics/English",
            duration: "1 year decision + 2 years study",
            requirements: [
              "10th pass with good marks in Science",
              "Interest in biological sciences",
            ],
            difficulty: "Medium",
            importance: "Critical",
            nextSteps: ["Stream selection", "NEET preparation planning"],
          },
          ...medicalPath,
        ];
      }
      return medicalPath;
    }

    if (goalLower.includes("engineer") || goalLower.includes("technology")) {
      const engineeringPath = careerMappings.class_11_12_pcm_engineer;
      if (stageLower.includes("10")) {
        return [
          {
            id: "choose_pcm",
            title: "Choose PCM Stream in 11th-12th",
            description:
              "Select Physics, Chemistry, Mathematics with additional subjects",
            duration: "1 year decision + 2 years study",
            requirements: [
              "10th pass with strong Math & Science",
              "Logical thinking ability",
            ],
            difficulty: "Medium",
            importance: "Critical",
            nextSteps: ["Stream selection", "JEE preparation planning"],
          },
          ...engineeringPath,
        ];
      }
      return engineeringPath;
    }

    // Default comprehensive path
    return [
      {
        id: "assess",
        title: "Assess Current Position & Set Goals",
        description: `Evaluate your current education level (${stage}) and define clear career objectives`,
        duration: "2-4 weeks",
        requirements: [
          "Self assessment",
          "Goal clarification",
          "Market research",
        ],
        difficulty: "Easy",
        importance: "Critical",
        resources: [
          { title: "Career Assessment Tools", type: "link" },
          { title: "Goal Setting Workshop", type: "video" },
        ],
        nextSteps: ["Skill gap analysis", "Learning path design"],
      },
      {
        id: "plan",
        title: "Create Detailed Learning Plan",
        description: `Develop comprehensive roadmap towards ${goal}`,
        duration: "1-2 weeks",
        requirements: [
          "Clear goals",
          "Resource identification",
          "Timeline creation",
        ],
        difficulty: "Medium",
        importance: "High",
        resources: [
          { title: "Learning Path Templates", type: "link" },
          { title: "Study Planning Guide", type: "course" },
        ],
        nextSteps: ["Resource acquisition", "Learning commencement"],
      },
      {
        id: "execute",
        title: "Execute Learning Plan",
        description:
          "Begin systematic skill development and knowledge acquisition",
        duration: "6-24 months",
        requirements: ["Dedication", "Resources", "Consistent practice"],
        difficulty: "Hard",
        importance: "Critical",
        options: [
          "Formal Education Programs",
          "Online Course Platforms",
          "Self-Directed Learning",
          "Mentorship Programs",
          "Practical Projects",
        ],
        resources: [
          { title: "Online Learning Platforms", type: "link" },
          { title: "Study Techniques Masterclass", type: "video" },
          { title: "Project-Based Learning", type: "course" },
        ],
        nextSteps: ["Skill validation", "Opportunity application"],
      },
      {
        id: "apply",
        title: "Apply Knowledge & Seek Opportunities",
        description:
          "Put learning into practice and pursue career opportunities",
        duration: "3-12 months",
        requirements: [
          "Acquired skills",
          "Portfolio/certificates",
          "Professional network",
        ],
        difficulty: "Medium",
        importance: "Critical",
        options: [
          "Job Applications",
          "Internship Programs",
          "Freelance Projects",
          "Further Education",
          "Entrepreneurship",
        ],
        resources: [
          { title: "Job Search Strategies", type: "course" },
          { title: "Interview Preparation", type: "video" },
          { title: "Career Networking Guide", type: "link" },
        ],
      },
    ];
  };

  useEffect(() => {
    if (currentStage && goal) {
      setIsLoading(true);
      setTimeout(() => {
        const path = generateCareerPath(currentStage, goal);
        setCareerPath(path);
        setIsLoading(false);
        onPathGenerated?.(path);
      }, 1000); // Slightly longer for better UX
    }
  }, [currentStage, goal]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Generating Your Personalized Career Map
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Analyzing your profile: {currentStage.replace("_", " ")} → {goal}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <span>Creating personalized roadmap...</span>
        </div>
      </div>
    );
  }

  if (!careerPath.length) {
    return (
      <div className="text-center p-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Ready to Generate Your Career Map?
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Complete your selections to generate a personalized career roadmap
        </p>
      </div>
    );
  }

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Hard":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "Very Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getImportanceColor = (importance?: string) => {
    switch (importance) {
      case "Critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "High":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          🗺️ Your Personalized Career Roadmap
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
          <span className="font-semibold text-blue-600">
            {currentStage.replace("_", " ")}
          </span>
          {" → "}
          <span className="font-semibold text-green-600">{goal}</span>
        </p>
        <div className="flex justify-center items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {careerPath.length} Step Process
          </span>
          <span className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            Personalized for You
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-8 top-16 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 rounded-full opacity-30"></div>

        {careerPath.map((step, index) => (
          <div key={step.id} className="relative flex items-start mb-10">
            {/* Step Number */}
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10 border-4 border-white dark:border-gray-800">
              {index + 1}
            </div>

            {/* Step Content */}
            <Card className="ml-6 flex-1 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-blue-500">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 text-gray-900 dark:text-gray-100">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-base text-gray-600 dark:text-gray-300">
                      {step.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Badge
                      variant="outline"
                      className="text-xs whitespace-nowrap"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {step.duration}
                    </Badge>
                    {step.difficulty && (
                      <Badge
                        className={`text-xs ${getDifficultyColor(step.difficulty)}`}
                      >
                        {step.difficulty}
                      </Badge>
                    )}
                    {step.importance && (
                      <Badge
                        className={`text-xs ${getImportanceColor(step.importance)}`}
                      >
                        {step.importance}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Requirements */}
                {step.requirements && step.requirements.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-sm mb-3 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Requirements:
                    </h5>
                    <ul className="text-sm space-y-2">
                      {step.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-300">
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Options */}
                {step.options && step.options.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-sm mb-3 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-600" />
                      Available Options:
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {step.options.map((option, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-xs p-2 justify-start"
                        >
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exams */}
                {step.exams && step.exams.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-sm mb-3 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-600" />
                      Key Exams:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {step.exams.map((exam, i) => (
                        <Badge
                          key={i}
                          variant="destructive"
                          className="text-xs"
                        >
                          <Award className="w-3 h-3 mr-1" />
                          {exam}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resources */}
                {step.resources && step.resources.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-sm mb-3 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      Learning Resources:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {step.resources.map((resource, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                        >
                          {resource.type === "video" && (
                            <PlayCircle className="w-4 h-4 text-red-600" />
                          )}
                          {resource.type === "link" && (
                            <ExternalLink className="w-4 h-4 text-blue-600" />
                          )}
                          {resource.type === "course" && (
                            <BookOpen className="w-4 h-4 text-green-600" />
                          )}
                          <span className="text-xs text-gray-700 dark:text-gray-300">
                            {resource.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Steps Preview */}
                {step.nextSteps && step.nextSteps.length > 0 && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <h5 className="font-semibold text-sm mb-2 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                      Next Steps:
                    </h5>
                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {step.nextSteps.slice(0, 3).map((next, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          <span>{next}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center pt-8 border-t border-gray-200 dark:border-gray-700">
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <BookOpen className="w-4 h-4" />
          Get Detailed Study Guide
        </Button>
        <Button variant="outline" className="gap-2">
          <Users className="w-4 h-4" />
          Connect with Mentors
        </Button>
        <Button variant="outline" className="gap-2">
          <Star className="w-4 h-4" />
          Save Career Map
        </Button>
        <Button variant="outline" className="gap-2">
          <Target className="w-4 h-4" />
          Track Progress
        </Button>
      </div>

      {/* Success Tips */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
        <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Success Tips for Your Journey
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Stay consistent with daily learning
              </span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Build a strong professional network
              </span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Create practical projects and portfolio
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Seek mentorship and guidance
              </span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Stay updated with industry trends
              </span>
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">
                Track progress and celebrate milestones
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
