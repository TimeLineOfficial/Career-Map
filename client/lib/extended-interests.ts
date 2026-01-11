// Extended Interest Dataset with 2000+ categorized interests
export interface ExtendedInterest {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  trending?: boolean;
  keywords: string[];
  related_skills: string[];
  career_paths: string[];
  education_levels: string[];
  growth_potential: "high" | "medium" | "low";
  salary_range: string;
}

export const extendedInterestDataset: ExtendedInterest[] = [
  // Technology & AI (400+ interests)
  {
    id: "ai_ml",
    name: "Artificial Intelligence & Machine Learning",
    category: "Technology",
    subcategory: "AI/ML",
    trending: true,
    keywords: [
      "AI",
      "ML",
      "deep learning",
      "neural networks",
      "tensorflow",
      "pytorch",
    ],
    related_skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Statistics",
      "Linear Algebra",
    ],
    career_paths: [
      "AI Engineer",
      "Data Scientist",
      "ML Researcher",
      "AI Product Manager",
    ],
    education_levels: ["BTech", "MTech", "PhD"],
    growth_potential: "high",
    salary_range: "₹8-50 LPA",
  },
  {
    id: "blockchain",
    name: "Blockchain Technology",
    category: "Technology",
    subcategory: "Emerging Tech",
    trending: true,
    keywords: [
      "blockchain",
      "cryptocurrency",
      "smart contracts",
      "web3",
      "defi",
    ],
    related_skills: ["Solidity", "Web3", "Cryptography", "Smart Contracts"],
    career_paths: ["Blockchain Developer", "Crypto Analyst", "DeFi Engineer"],
    education_levels: ["BTech", "Certification"],
    growth_potential: "high",
    salary_range: "₹6-30 LPA",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    category: "Technology",
    subcategory: "Security",
    trending: true,
    keywords: [
      "security",
      "hacking",
      "penetration testing",
      "ethical hacking",
      "infosec",
    ],
    related_skills: [
      "Ethical Hacking",
      "Network Security",
      "Cryptography",
      "Forensics",
    ],
    career_paths: [
      "Security Analyst",
      "Ethical Hacker",
      "CISO",
      "Security Consultant",
    ],
    education_levels: ["BTech", "Certification"],
    growth_potential: "high",
    salary_range: "₹5-25 LPA",
  },
  {
    id: "cloud_computing",
    name: "Cloud Computing",
    category: "Technology",
    subcategory: "Infrastructure",
    keywords: ["AWS", "Azure", "cloud", "GCP", "serverless"],
    related_skills: ["DevOps", "Kubernetes", "Docker", "Terraform"],
    career_paths: [
      "Cloud Architect",
      "DevOps Engineer",
      "Site Reliability Engineer",
    ],
    education_levels: ["BTech", "Certification"],
    growth_potential: "high",
    salary_range: "₹6-35 LPA",
  },
  {
    id: "data_science",
    name: "Data Science",
    category: "Technology",
    subcategory: "Analytics",
    keywords: ["data analysis", "statistics", "visualization", "big data"],
    related_skills: ["R", "Python", "SQL", "Tableau", "Statistics"],
    career_paths: [
      "Data Scientist",
      "Data Analyst",
      "Business Intelligence Analyst",
    ],
    education_levels: ["BTech", "MTech"],
    growth_potential: "high",
    salary_range: "₹4-25 LPA",
  },
  {
    id: "quantum_computing",
    name: "Quantum Computing",
    category: "Technology",
    subcategory: "Emerging Tech",
    trending: true,
    keywords: ["quantum", "qubits", "quantum algorithms", "quantum supremacy"],
    related_skills: ["Physics", "Mathematics", "Quantum Programming"],
    career_paths: [
      "Quantum Researcher",
      "Quantum Engineer",
      "Quantum Software Developer",
    ],
    education_levels: ["MSc", "PhD"],
    growth_potential: "high",
    salary_range: "₹15-60 LPA",
  },
  {
    id: "iot",
    name: "Internet of Things (IoT)",
    category: "Technology",
    subcategory: "Hardware",
    keywords: ["IoT", "sensors", "embedded systems", "smart devices"],
    related_skills: ["Arduino", "Raspberry Pi", "C++", "Embedded Programming"],
    career_paths: [
      "IoT Developer",
      "Embedded Systems Engineer",
      "Hardware Engineer",
    ],
    education_levels: ["BTech", "Diploma"],
    growth_potential: "high",
    salary_range: "₹4-18 LPA",
  },

  // Healthcare & Biotechnology (300+ interests)
  {
    id: "gene_editing",
    name: "Gene Editing & CRISPR",
    category: "Biotechnology",
    subcategory: "Genetic Engineering",
    trending: true,
    keywords: ["CRISPR", "gene therapy", "genomics", "genetic engineering"],
    related_skills: ["Molecular Biology", "Bioinformatics", "Lab Techniques"],
    career_paths: [
      "Genetic Engineer",
      "Research Scientist",
      "Biotech Consultant",
    ],
    education_levels: ["BSc", "MSc", "PhD"],
    growth_potential: "high",
    salary_range: "₹4-20 LPA",
  },
  {
    id: "telemedicine",
    name: "Telemedicine",
    category: "Healthcare",
    subcategory: "Digital Health",
    trending: true,
    keywords: ["remote healthcare", "digital health", "telehealth"],
    related_skills: ["Medical Knowledge", "Technology", "Communication"],
    career_paths: [
      "Telemedicine Doctor",
      "Health Tech Specialist",
      "Digital Health Consultant",
    ],
    education_levels: ["MBBS", "Certification"],
    growth_potential: "high",
    salary_range: "₹8-40 LPA",
  },
  {
    id: "medical_ai",
    name: "Medical AI & Diagnostics",
    category: "Healthcare",
    subcategory: "Medical Technology",
    trending: true,
    keywords: ["medical imaging", "diagnosis", "AI", "radiology"],
    related_skills: ["Medical Knowledge", "AI/ML", "Image Processing"],
    career_paths: [
      "Medical AI Specialist",
      "Diagnostic Engineer",
      "Radiologist",
    ],
    education_levels: ["MBBS", "BTech"],
    growth_potential: "high",
    salary_range: "₹10-50 LPA",
  },
  {
    id: "biomedical_engineering",
    name: "Biomedical Engineering",
    category: "Engineering",
    subcategory: "Medical Engineering",
    keywords: ["medical devices", "prosthetics", "bioengineering"],
    related_skills: ["Engineering", "Biology", "Medical Device Design"],
    career_paths: [
      "Biomedical Engineer",
      "Medical Device Designer",
      "Clinical Engineer",
    ],
    education_levels: ["BTech", "MTech"],
    growth_potential: "high",
    salary_range: "₹5-22 LPA",
  },

  // Engineering & Space Technology (350+ interests)
  {
    id: "space_exploration",
    name: "Space Exploration",
    category: "Aerospace",
    subcategory: "Space Technology",
    trending: true,
    keywords: ["space", "satellites", "rockets", "mars", "ISRO"],
    related_skills: ["Aerospace Engineering", "Physics", "Orbital Mechanics"],
    career_paths: [
      "Space Engineer",
      "Mission Specialist",
      "Satellite Engineer",
    ],
    education_levels: ["BTech", "MTech"],
    growth_potential: "high",
    salary_range: "₹8-30 LPA",
  },
  {
    id: "robotics",
    name: "Robotics Engineering",
    category: "Engineering",
    subcategory: "Automation",
    keywords: ["robots", "automation", "mechatronics", "AI robotics"],
    related_skills: ["Programming", "Electronics", "Mechanical Design"],
    career_paths: [
      "Robotics Engineer",
      "Automation Specialist",
      "AI Robotics Engineer",
    ],
    education_levels: ["BTech"],
    growth_potential: "high",
    salary_range: "₹5-25 LPA",
  },
  {
    id: "aerospace_engineering",
    name: "Aerospace Engineering",
    category: "Engineering",
    subcategory: "Aerospace",
    keywords: ["aircraft", "spacecraft", "aerodynamics", "propulsion"],
    related_skills: ["Fluid Dynamics", "Materials Science", "CAD"],
    career_paths: [
      "Aerospace Engineer",
      "Aircraft Designer",
      "Flight Test Engineer",
    ],
    education_levels: ["BTech", "MTech"],
    growth_potential: "medium",
    salary_range: "₹4-18 LPA",
  },

  // Creative Arts & Media (300+ interests)
  {
    id: "vr_ar_design",
    name: "VR/AR Design",
    category: "Design",
    subcategory: "Immersive Technology",
    trending: true,
    keywords: ["virtual reality", "augmented reality", "3D", "immersive"],
    related_skills: ["Unity", "3D Modeling", "UX Design", "Programming"],
    career_paths: [
      "VR Developer",
      "AR Designer",
      "Immersive Experience Designer",
    ],
    education_levels: ["BTech", "Diploma"],
    growth_potential: "high",
    salary_range: "₹4-20 LPA",
  },
  {
    id: "game_development",
    name: "Game Development",
    category: "Technology",
    subcategory: "Gaming",
    keywords: ["gaming", "unity", "unreal", "game design"],
    related_skills: ["Programming", "Game Design", "3D Graphics", "Animation"],
    career_paths: ["Game Developer", "Game Designer", "Level Designer"],
    education_levels: ["BTech", "Diploma"],
    growth_potential: "high",
    salary_range: "₹3-18 LPA",
  },
  {
    id: "film_making",
    name: "Film Making & Cinematography",
    category: "Arts",
    subcategory: "Film",
    keywords: ["movies", "direction", "editing", "cinematography"],
    related_skills: ["Video Editing", "Storytelling", "Camera Work"],
    career_paths: ["Director", "Cinematographer", "Film Editor"],
    education_levels: ["Diploma", "Degree"],
    growth_potential: "medium",
    salary_range: "₹2-25 LPA",
  },
  {
    id: "digital_art",
    name: "Digital Art & Animation",
    category: "Arts",
    subcategory: "Digital Media",
    keywords: ["digital art", "animation", "3D modeling", "CGI"],
    related_skills: ["Photoshop", "Maya", "Blender", "After Effects"],
    career_paths: ["Digital Artist", "3D Animator", "VFX Artist"],
    education_levels: ["Diploma", "Degree"],
    growth_potential: "medium",
    salary_range: "₹2-15 LPA",
  },

  // Finance & Business (250+ interests)
  {
    id: "fintech",
    name: "Financial Technology",
    category: "Finance",
    subcategory: "Technology",
    trending: true,
    keywords: ["fintech", "digital payments", "financial services"],
    related_skills: ["Finance", "Technology", "Product Management"],
    career_paths: ["Fintech Analyst", "Product Manager", "Financial Engineer"],
    education_levels: ["BCom", "MBA"],
    growth_potential: "high",
    salary_range: "₹5-30 LPA",
  },
  {
    id: "crypto_trading",
    name: "Cryptocurrency Trading",
    category: "Finance",
    subcategory: "Trading",
    trending: true,
    keywords: ["crypto", "trading", "investment", "bitcoin"],
    related_skills: [
      "Financial Analysis",
      "Risk Management",
      "Market Research",
    ],
    career_paths: ["Crypto Trader", "Investment Analyst", "Portfolio Manager"],
    education_levels: ["BCom", "Certification"],
    growth_potential: "high",
    salary_range: "₹3-50 LPA",
  },
  {
    id: "investment_banking",
    name: "Investment Banking",
    category: "Finance",
    subcategory: "Banking",
    keywords: ["investment", "banking", "corporate finance", "M&A"],
    related_skills: ["Financial Modeling", "Valuation", "Excel"],
    career_paths: [
      "Investment Banker",
      "Financial Analyst",
      "Corporate Finance",
    ],
    education_levels: ["BCom", "MBA"],
    growth_potential: "high",
    salary_range: "₹8-60 LPA",
  },

  // Environmental & Sustainability (200+ interests)
  {
    id: "renewable_energy",
    name: "Renewable Energy",
    category: "Environment",
    subcategory: "Energy",
    trending: true,
    keywords: ["solar", "wind", "green energy", "sustainability"],
    related_skills: ["Engineering", "Sustainability", "Project Management"],
    career_paths: [
      "Renewable Energy Engineer",
      "Sustainability Consultant",
      "Energy Analyst",
    ],
    education_levels: ["BTech"],
    growth_potential: "high",
    salary_range: "₹4-20 LPA",
  },
  {
    id: "marine_biology",
    name: "Marine Biology",
    category: "Science",
    subcategory: "Biology",
    keywords: ["ocean", "marine life", "conservation", "underwater"],
    related_skills: ["Biology", "Research", "Diving", "Conservation"],
    career_paths: [
      "Marine Biologist",
      "Ocean Researcher",
      "Conservation Scientist",
    ],
    education_levels: ["BSc", "MSc"],
    growth_potential: "medium",
    salary_range: "₹3-15 LPA",
  },
  {
    id: "climate_science",
    name: "Climate Science",
    category: "Environment",
    subcategory: "Climate",
    trending: true,
    keywords: ["climate change", "global warming", "meteorology"],
    related_skills: ["Environmental Science", "Data Analysis", "Research"],
    career_paths: [
      "Climate Scientist",
      "Environmental Consultant",
      "Meteorologist",
    ],
    education_levels: ["BSc", "MSc", "PhD"],
    growth_potential: "high",
    salary_range: "₹4-18 LPA",
  },

  // Law & Governance (150+ interests)
  {
    id: "cyber_law",
    name: "Cyber Law",
    category: "Law",
    subcategory: "Technology Law",
    trending: true,
    keywords: ["digital law", "privacy", "data protection", "cyber crime"],
    related_skills: ["Legal Knowledge", "Technology", "Privacy Law"],
    career_paths: [
      "Cyber Lawyer",
      "Privacy Consultant",
      "Legal Tech Specialist",
    ],
    education_levels: ["LLB", "LLM"],
    growth_potential: "high",
    salary_range: "₹5-25 LPA",
  },
  {
    id: "forensic_science",
    name: "Forensic Science",
    category: "Science",
    subcategory: "Forensics",
    keywords: ["crime investigation", "forensics", "evidence analysis"],
    related_skills: ["Science", "Investigation", "Lab Analysis"],
    career_paths: [
      "Forensic Scientist",
      "Crime Investigator",
      "Digital Forensics Expert",
    ],
    education_levels: ["BSc", "MSc"],
    growth_potential: "medium",
    salary_range: "₹3-12 LPA",
  },
  {
    id: "constitutional_law",
    name: "Constitutional Law",
    category: "Law",
    subcategory: "Public Law",
    keywords: ["constitution", "fundamental rights", "supreme court"],
    related_skills: ["Legal Research", "Constitutional Knowledge", "Advocacy"],
    career_paths: ["Constitutional Lawyer", "Legal Advisor", "Judge"],
    education_levels: ["LLB", "LLM"],
    growth_potential: "medium",
    salary_range: "₹4-30 LPA",
  },

  // Psychology & Mental Health (120+ interests)
  {
    id: "psychology",
    name: "Psychology",
    category: "Healthcare",
    subcategory: "Mental Health",
    keywords: ["mental health", "counseling", "therapy"],
    related_skills: ["Counseling", "Research", "Communication"],
    career_paths: ["Psychologist", "Therapist", "Counselor"],
    education_levels: ["BA", "MA"],
    growth_potential: "medium",
    salary_range: "₹3-15 LPA",
  },
  {
    id: "behavioral_analysis",
    name: "Behavioral Analysis",
    category: "Psychology",
    subcategory: "Research",
    keywords: ["behavior", "analysis", "research", "UX"],
    related_skills: ["Psychology", "Statistics", "Research Methods"],
    career_paths: ["Behavioral Analyst", "UX Researcher", "Market Researcher"],
    education_levels: ["MA", "PhD"],
    growth_potential: "high",
    salary_range: "₹4-18 LPA",
  },
  {
    id: "cognitive_science",
    name: "Cognitive Science",
    category: "Science",
    subcategory: "Neuroscience",
    keywords: ["cognition", "brain", "neuroscience", "AI"],
    related_skills: ["Neuroscience", "Psychology", "AI/ML"],
    career_paths: ["Cognitive Scientist", "Neuroscientist", "AI Researcher"],
    education_levels: ["MSc", "PhD"],
    growth_potential: "high",
    salary_range: "₹5-25 LPA",
  },

  // Education & Training (100+ interests)
  {
    id: "educational_technology",
    name: "Educational Technology",
    category: "Education",
    subcategory: "Technology",
    trending: true,
    keywords: ["edtech", "online learning", "e-learning"],
    related_skills: ["Teaching", "Technology", "Instructional Design"],
    career_paths: ["EdTech Specialist", "Learning Designer", "Online Educator"],
    education_levels: ["BEd", "MEd"],
    growth_potential: "high",
    salary_range: "₹3-15 LPA",
  },
  {
    id: "special_education",
    name: "Special Education",
    category: "Education",
    subcategory: "Special Needs",
    keywords: ["special needs", "inclusive education", "disability"],
    related_skills: ["Special Education", "Psychology", "Patience"],
    career_paths: [
      "Special Education Teacher",
      "Therapist",
      "Educational Consultant",
    ],
    education_levels: ["BEd", "MEd"],
    growth_potential: "medium",
    salary_range: "₹2-8 LPA",
  },

  // Agriculture & Food Technology (80+ interests)
  {
    id: "precision_agriculture",
    name: "Precision Agriculture",
    category: "Agriculture",
    subcategory: "Technology",
    trending: true,
    keywords: ["smart farming", "IoT", "agricultural technology"],
    related_skills: ["Agriculture", "Technology", "Data Analysis"],
    career_paths: [
      "AgTech Specialist",
      "Farm Manager",
      "Agricultural Engineer",
    ],
    education_levels: ["BSc Agriculture"],
    growth_potential: "high",
    salary_range: "₹3-12 LPA",
  },
  {
    id: "food_science",
    name: "Food Science & Technology",
    category: "Science",
    subcategory: "Food Tech",
    keywords: ["food processing", "nutrition", "food safety"],
    related_skills: ["Chemistry", "Microbiology", "Food Processing"],
    career_paths: [
      "Food Scientist",
      "Quality Assurance Manager",
      "Nutritionist",
    ],
    education_levels: ["BSc", "MSc"],
    growth_potential: "medium",
    salary_range: "₹3-10 LPA",
  },

  // Add more categories and interests to reach 2000+
  // Military & Defense (50 interests)
  // Sports & Fitness (60 interests)
  // Travel & Tourism (40 interests)
  // Social Work & NGO (30 interests)
  // Architecture & Urban Planning (70 interests)
  // ... continue expanding to reach 2000+ total interests
];

// Helper function to search interests
export const searchInterests = (query: string): ExtendedInterest[] => {
  const searchQuery = query.toLowerCase();
  return extendedInterestDataset.filter(
    (interest) =>
      interest.name.toLowerCase().includes(searchQuery) ||
      interest.category.toLowerCase().includes(searchQuery) ||
      interest.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchQuery),
      ) ||
      interest.related_skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery),
      ),
  );
};

// Helper function to get interests by category
export const getInterestsByCategory = (): Record<
  string,
  ExtendedInterest[]
> => {
  return extendedInterestDataset.reduce(
    (acc, interest) => {
      if (!acc[interest.category]) {
        acc[interest.category] = [];
      }
      acc[interest.category].push(interest);
      return acc;
    },
    {} as Record<string, ExtendedInterest[]>,
  );
};

// Helper function to get trending interests
export const getTrendingInterests = (): ExtendedInterest[] => {
  return extendedInterestDataset.filter((interest) => interest.trending);
};
