export interface IndianSubject {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  level: "School" | "College" | "Both";
  type:
    | "Core"
    | "Elective"
    | "Vocational"
    | "Co-curricular"
    | "Lab"
    | "Practical";
  boards: string[];
  career_paths: string[];
  related_skills: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  trending: boolean;
  description: string;
  job_prospects: string[];
}

export const indianSubjectsDataset: IndianSubject[] = [
  // SCIENCE STREAM - CORE SUBJECTS
  {
    id: "physics",
    name: "Physics",
    category: "Science",
    subcategory: "Physical Sciences",
    level: "Both",
    type: "Core",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Engineer",
      "Scientist",
      "Researcher",
      "Astronomer",
      "Medical Physicist",
    ],
    related_skills: [
      "Mathematical Analysis",
      "Problem Solving",
      "Laboratory Skills",
      "Data Analysis",
    ],
    difficulty: "Hard",
    trending: true,
    description: "Study of matter, energy, motion, and forces in the universe",
    job_prospects: [
      "Research Scientist",
      "Engineer",
      "Teacher",
      "Data Analyst",
      "Space Scientist",
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    category: "Science",
    subcategory: "Physical Sciences",
    level: "Both",
    type: "Core",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Chemist",
      "Pharmacist",
      "Research Scientist",
      "Chemical Engineer",
      "Food Scientist",
    ],
    related_skills: [
      "Laboratory Techniques",
      "Chemical Analysis",
      "Safety Protocols",
      "Data Interpretation",
    ],
    difficulty: "Hard",
    trending: true,
    description: "Study of matter, its properties, composition, and reactions",
    job_prospects: [
      "Chemical Engineer",
      "Pharmacist",
      "Quality Control Analyst",
      "Environmental Scientist",
    ],
  },
  {
    id: "biology",
    name: "Biology",
    category: "Science",
    subcategory: "Life Sciences",
    level: "Both",
    type: "Core",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Doctor",
      "Biologist",
      "Researcher",
      "Biotechnologist",
      "Environmental Scientist",
    ],
    related_skills: [
      "Observation",
      "Data Collection",
      "Laboratory Skills",
      "Research Methods",
    ],
    difficulty: "Medium",
    trending: true,
    description: "Study of living organisms and their interactions",
    job_prospects: [
      "Medical Doctor",
      "Biotechnologist",
      "Research Scientist",
      "Microbiologist",
    ],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    category: "Science",
    subcategory: "Mathematical Sciences",
    level: "Both",
    type: "Core",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Engineer",
      "Data Scientist",
      "Mathematician",
      "Statistician",
      "Actuary",
    ],
    related_skills: [
      "Logical Reasoning",
      "Problem Solving",
      "Analytical Thinking",
      "Statistical Analysis",
    ],
    difficulty: "Hard",
    trending: true,
    description: "Study of numbers, shapes, patterns, and logical reasoning",
    job_prospects: [
      "Data Scientist",
      "Engineer",
      "Financial Analyst",
      "Researcher",
      "Teacher",
    ],
  },

  // COMMERCE STREAM - CORE SUBJECTS
  {
    id: "accountancy",
    name: "Accountancy",
    category: "Commerce",
    subcategory: "Financial Studies",
    level: "Both",
    type: "Core",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Chartered Accountant",
      "Finance Manager",
      "Auditor",
      "Tax Consultant",
      "Investment Banker",
    ],
    related_skills: [
      "Financial Analysis",
      "Bookkeeping",
      "Tax Planning",
      "Audit Procedures",
    ],
    difficulty: "Medium",
    trending: true,
    description: "Study of financial record keeping and analysis",
    job_prospects: [
      "CA",
      "Financial Analyst",
      "Auditor",
      "Tax Consultant",
      "CFO",
    ],
  },
  {
    id: "business_studies",
    name: "Business Studies",
    category: "Commerce",
    subcategory: "Management Studies",
    level: "Both",
    type: "Core",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Business Manager",
      "Entrepreneur",
      "Marketing Executive",
      "HR Manager",
      "Operations Manager",
    ],
    related_skills: [
      "Strategic Planning",
      "Leadership",
      "Communication",
      "Project Management",
    ],
    difficulty: "Medium",
    trending: true,
    description:
      "Study of business operations, management, and entrepreneurship",
    job_prospects: [
      "Business Analyst",
      "Manager",
      "Entrepreneur",
      "Consultant",
      "Sales Executive",
    ],
  },
  {
    id: "economics",
    name: "Economics",
    category: "Commerce",
    subcategory: "Economic Sciences",
    level: "Both",
    type: "Core",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Economist",
      "Policy Analyst",
      "Investment Banker",
      "Research Analyst",
      "Government Officer",
    ],
    related_skills: [
      "Data Analysis",
      "Market Research",
      "Statistical Methods",
      "Policy Understanding",
    ],
    difficulty: "Medium",
    trending: true,
    description:
      "Study of production, distribution, and consumption of goods and services",
    job_prospects: [
      "Economist",
      "Policy Analyst",
      "Banking Professional",
      "Research Analyst",
    ],
  },

  // ARTS/HUMANITIES - CORE SUBJECTS
  {
    id: "history",
    name: "History",
    category: "Arts",
    subcategory: "Social Sciences",
    level: "Both",
    type: "Core",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Historian",
      "Archaeologist",
      "Teacher",
      "Civil Services",
      "Journalist",
    ],
    related_skills: [
      "Research",
      "Critical Analysis",
      "Writing",
      "Documentation",
    ],
    difficulty: "Medium",
    trending: false,
    description: "Study of past events, cultures, and civilizations",
    job_prospects: [
      "Civil Services",
      "Teacher",
      "Researcher",
      "Museum Curator",
      "Journalist",
    ],
  },
  {
    id: "geography",
    name: "Geography",
    category: "Arts",
    subcategory: "Earth Sciences",
    level: "Both",
    type: "Core",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Geographer",
      "Urban Planner",
      "Environmental Consultant",
      "GIS Specialist",
      "Cartographer",
    ],
    related_skills: [
      "Spatial Analysis",
      "Map Reading",
      "Data Interpretation",
      "Environmental Analysis",
    ],
    difficulty: "Medium",
    trending: true,
    description: "Study of Earth's features, climate, and human activities",
    job_prospects: [
      "Urban Planner",
      "GIS Specialist",
      "Environmental Consultant",
      "Survey Officer",
    ],
  },
  {
    id: "political_science",
    name: "Political Science",
    category: "Arts",
    subcategory: "Social Sciences",
    level: "Both",
    type: "Core",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Civil Services",
      "Politician",
      "Policy Analyst",
      "Diplomat",
      "Journalist",
    ],
    related_skills: [
      "Critical Thinking",
      "Public Speaking",
      "Research",
      "Policy Analysis",
    ],
    difficulty: "Medium",
    trending: true,
    description: "Study of government systems, politics, and public policies",
    job_prospects: [
      "Civil Services",
      "Policy Analyst",
      "Political Consultant",
      "Diplomat",
      "Journalist",
    ],
  },
  {
    id: "psychology",
    name: "Psychology",
    category: "Arts",
    subcategory: "Behavioral Sciences",
    level: "Both",
    type: "Core",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Psychologist",
      "Counselor",
      "Therapist",
      "HR Specialist",
      "Researcher",
    ],
    related_skills: [
      "Observation",
      "Communication",
      "Empathy",
      "Research Methods",
    ],
    difficulty: "Medium",
    trending: true,
    description: "Study of human behavior, mind, and mental processes",
    job_prospects: [
      "Clinical Psychologist",
      "Counselor",
      "HR Professional",
      "Researcher",
      "Therapist",
    ],
  },

  // LANGUAGE SUBJECTS
  {
    id: "english",
    name: "English",
    category: "Languages",
    subcategory: "Global Languages",
    level: "Both",
    type: "Core",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Writer",
      "Journalist",
      "Teacher",
      "Content Creator",
      "Editor",
    ],
    related_skills: [
      "Writing",
      "Communication",
      "Literature Analysis",
      "Grammar",
    ],
    difficulty: "Medium",
    trending: true,
    description: "Study of English language, literature, and communication",
    job_prospects: [
      "Content Writer",
      "Journalist",
      "Teacher",
      "Editor",
      "Translator",
    ],
  },
  {
    id: "hindi",
    name: "Hindi",
    category: "Languages",
    subcategory: "Indian Languages",
    level: "Both",
    type: "Core",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Hindi Teacher",
      "Translator",
      "Content Writer",
      "Journalist",
      "Civil Services",
    ],
    related_skills: [
      "Language Proficiency",
      "Literature Understanding",
      "Translation",
      "Writing",
    ],
    difficulty: "Medium",
    trending: false,
    description: "Study of Hindi language, literature, and cultural heritage",
    job_prospects: [
      "Teacher",
      "Translator",
      "Content Creator",
      "Government Jobs",
      "Media Professional",
    ],
  },
  {
    id: "sanskrit",
    name: "Sanskrit",
    category: "Languages",
    subcategory: "Classical Languages",
    level: "Both",
    type: "Elective",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Sanskrit Scholar",
      "Teacher",
      "Researcher",
      "Translator",
      "Cultural Historian",
    ],
    related_skills: [
      "Ancient Text Analysis",
      "Translation",
      "Cultural Understanding",
      "Research",
    ],
    difficulty: "Hard",
    trending: false,
    description: "Study of ancient Sanskrit language and classical texts",
    job_prospects: [
      "Sanskrit Teacher",
      "Researcher",
      "Cultural Consultant",
      "Translator",
    ],
  },

  // MODERN TECHNOLOGY SUBJECTS
  {
    id: "computer_science",
    name: "Computer Science",
    category: "Technology",
    subcategory: "Information Technology",
    level: "Both",
    type: "Core",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Software Engineer",
      "Data Scientist",
      "Cybersecurity Analyst",
      "Game Developer",
      "AI Engineer",
    ],
    related_skills: [
      "Programming",
      "Problem Solving",
      "Algorithm Design",
      "Database Management",
    ],
    difficulty: "Hard",
    trending: true,
    description:
      "Study of computational systems, programming, and software development",
    job_prospects: [
      "Software Developer",
      "Data Scientist",
      "Cybersecurity Expert",
      "AI Engineer",
    ],
  },
  {
    id: "information_practices",
    name: "Information Practices",
    category: "Technology",
    subcategory: "Information Technology",
    level: "College",
    type: "Core",
    boards: ["CBSE"],
    career_paths: [
      "Database Administrator",
      "Systems Analyst",
      "IT Consultant",
      "Web Developer",
    ],
    related_skills: [
      "Database Design",
      "Web Development",
      "System Analysis",
      "Data Management",
    ],
    difficulty: "Medium",
    trending: true,
    description:
      "Study of information systems, databases, and web technologies",
    job_prospects: [
      "Database Admin",
      "Web Developer",
      "Systems Analyst",
      "IT Support",
    ],
  },
  {
    id: "artificial_intelligence",
    name: "Artificial Intelligence",
    category: "Technology",
    subcategory: "Advanced Computing",
    level: "College",
    type: "Elective",
    boards: ["CBSE"],
    career_paths: [
      "AI Engineer",
      "Machine Learning Specialist",
      "Data Scientist",
      "Robotics Engineer",
    ],
    related_skills: [
      "Machine Learning",
      "Python Programming",
      "Neural Networks",
      "Data Analysis",
    ],
    difficulty: "Very Hard",
    trending: true,
    description: "Study of intelligent systems and machine learning algorithms",
    job_prospects: [
      "AI Engineer",
      "ML Specialist",
      "Data Scientist",
      "Research Scientist",
    ],
  },

  // VOCATIONAL SUBJECTS
  {
    id: "agriculture",
    name: "Agriculture",
    category: "Vocational",
    subcategory: "Agricultural Sciences",
    level: "Both",
    type: "Vocational",
    boards: ["CBSE", "State Boards"],
    career_paths: [
      "Agricultural Scientist",
      "Farmer",
      "Agricultural Engineer",
      "Food Technologist",
    ],
    related_skills: [
      "Crop Management",
      "Soil Analysis",
      "Pest Control",
      "Farm Planning",
    ],
    difficulty: "Medium",
    trending: true,
    description:
      "Study of crop production, animal husbandry, and farm management",
    job_prospects: [
      "Agricultural Scientist",
      "Farm Manager",
      "Food Technologist",
      "Agricultural Officer",
    ],
  },
  {
    id: "biotechnology",
    name: "Biotechnology",
    category: "Science",
    subcategory: "Applied Sciences",
    level: "College",
    type: "Core",
    boards: ["CBSE", "State Boards"],
    career_paths: [
      "Biotechnologist",
      "Research Scientist",
      "Quality Control Analyst",
      "Bioinformatics Specialist",
    ],
    related_skills: [
      "Laboratory Techniques",
      "Genetic Engineering",
      "Bioinformatics",
      "Research Methods",
    ],
    difficulty: "Hard",
    trending: true,
    description:
      "Application of biological processes in technology and industry",
    job_prospects: [
      "Biotechnologist",
      "Research Scientist",
      "Quality Analyst",
      "Bioinformatics Expert",
    ],
  },
  {
    id: "hotel_management",
    name: "Hotel Management",
    category: "Vocational",
    subcategory: "Hospitality",
    level: "College",
    type: "Vocational",
    boards: ["State Boards", "Private Institutions"],
    career_paths: [
      "Hotel Manager",
      "Restaurant Manager",
      "Event Coordinator",
      "Tourism Officer",
    ],
    related_skills: [
      "Customer Service",
      "Event Planning",
      "Food Service",
      "Business Management",
    ],
    difficulty: "Medium",
    trending: true,
    description: "Study of hospitality industry operations and management",
    job_prospects: [
      "Hotel Manager",
      "Event Manager",
      "Restaurant Owner",
      "Tourism Professional",
    ],
  },

  // CREATIVE ARTS SUBJECTS
  {
    id: "fine_arts",
    name: "Fine Arts",
    category: "Creative Arts",
    subcategory: "Visual Arts",
    level: "Both",
    type: "Elective",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Artist",
      "Art Teacher",
      "Graphic Designer",
      "Art Therapist",
      "Museum Curator",
    ],
    related_skills: [
      "Drawing",
      "Painting",
      "Sculpture",
      "Art History",
      "Creative Expression",
    ],
    difficulty: "Medium",
    trending: true,
    description:
      "Study of visual arts including drawing, painting, and sculpture",
    job_prospects: [
      "Professional Artist",
      "Art Teacher",
      "Graphic Designer",
      "Art Director",
    ],
  },
  {
    id: "music",
    name: "Music",
    category: "Creative Arts",
    subcategory: "Performing Arts",
    level: "Both",
    type: "Elective",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Musician",
      "Music Teacher",
      "Music Producer",
      "Sound Engineer",
      "Music Therapist",
    ],
    related_skills: [
      "Instrument Playing",
      "Music Theory",
      "Composition",
      "Performance",
    ],
    difficulty: "Medium",
    trending: true,
    description: "Study of musical theory, instruments, and performance",
    job_prospects: [
      "Professional Musician",
      "Music Teacher",
      "Music Producer",
      "Sound Engineer",
    ],
  },
  {
    id: "dance",
    name: "Dance",
    category: "Creative Arts",
    subcategory: "Performing Arts",
    level: "Both",
    type: "Elective",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Professional Dancer",
      "Dance Teacher",
      "Choreographer",
      "Dance Therapist",
    ],
    related_skills: [
      "Body Movement",
      "Rhythm",
      "Choreography",
      "Cultural Understanding",
    ],
    difficulty: "Medium",
    trending: true,
    description: "Study of various dance forms and movement techniques",
    job_prospects: [
      "Professional Dancer",
      "Dance Teacher",
      "Choreographer",
      "Performance Artist",
    ],
  },

  // PHYSICAL EDUCATION AND SPORTS
  {
    id: "physical_education",
    name: "Physical Education",
    category: "Sports",
    subcategory: "Physical Fitness",
    level: "Both",
    type: "Core",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Sports Coach",
      "Fitness Trainer",
      "Sports Manager",
      "Physiotherapist",
    ],
    related_skills: [
      "Athletic Training",
      "Sports Psychology",
      "Nutrition",
      "Injury Prevention",
    ],
    difficulty: "Medium",
    trending: true,
    description: "Study of physical fitness, sports, and health education",
    job_prospects: [
      "Sports Coach",
      "Fitness Trainer",
      "Sports Manager",
      "PE Teacher",
    ],
  },
  {
    id: "yoga",
    name: "Yoga",
    category: "Sports",
    subcategory: "Wellness",
    level: "Both",
    type: "Elective",
    boards: ["CBSE", "State Boards"],
    career_paths: [
      "Yoga Instructor",
      "Wellness Coach",
      "Yoga Therapist",
      "Meditation Teacher",
    ],
    related_skills: [
      "Yoga Asanas",
      "Meditation",
      "Breathing Techniques",
      "Mindfulness",
    ],
    difficulty: "Medium",
    trending: true,
    description: "Study of traditional yoga practices and wellness techniques",
    job_prospects: [
      "Yoga Instructor",
      "Wellness Coach",
      "Yoga Therapist",
      "Meditation Guide",
    ],
  },

  // SPECIALIZED SCIENCE SUBJECTS
  {
    id: "environmental_science",
    name: "Environmental Science",
    category: "Science",
    subcategory: "Environmental Studies",
    level: "Both",
    type: "Elective",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Environmental Scientist",
      "Conservation Officer",
      "Environmental Consultant",
      "Policy Analyst",
    ],
    related_skills: [
      "Environmental Analysis",
      "Conservation Methods",
      "Research",
      "Policy Understanding",
    ],
    difficulty: "Medium",
    trending: true,
    description: "Study of environmental systems and conservation methods",
    job_prospects: [
      "Environmental Scientist",
      "Conservation Officer",
      "Environmental Consultant",
    ],
  },
  {
    id: "forensic_science",
    name: "Forensic Science",
    category: "Science",
    subcategory: "Applied Sciences",
    level: "College",
    type: "Specialized",
    boards: ["State Universities"],
    career_paths: [
      "Forensic Scientist",
      "Crime Scene Investigator",
      "Lab Analyst",
      "Expert Witness",
    ],
    related_skills: [
      "Evidence Analysis",
      "Laboratory Techniques",
      "Documentation",
      "Court Procedures",
    ],
    difficulty: "Hard",
    trending: true,
    description: "Application of scientific methods to criminal investigations",
    job_prospects: [
      "Forensic Scientist",
      "Crime Scene Investigator",
      "Lab Analyst",
    ],
  },

  // EMERGING TECHNOLOGY SUBJECTS
  {
    id: "data_science",
    name: "Data Science",
    category: "Technology",
    subcategory: "Data Analytics",
    level: "College",
    type: "Specialized",
    boards: ["Universities", "Professional Courses"],
    career_paths: [
      "Data Scientist",
      "Data Analyst",
      "Business Intelligence Analyst",
      "Machine Learning Engineer",
    ],
    related_skills: [
      "Statistical Analysis",
      "Programming",
      "Data Visualization",
      "Machine Learning",
    ],
    difficulty: "Hard",
    trending: true,
    description: "Extraction of insights from structured and unstructured data",
    job_prospects: [
      "Data Scientist",
      "Data Analyst",
      "BI Analyst",
      "ML Engineer",
    ],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    category: "Technology",
    subcategory: "Information Security",
    level: "College",
    type: "Specialized",
    boards: ["Universities", "Professional Certifications"],
    career_paths: [
      "Cybersecurity Analyst",
      "Ethical Hacker",
      "Security Consultant",
      "CISO",
    ],
    related_skills: [
      "Network Security",
      "Penetration Testing",
      "Risk Assessment",
      "Incident Response",
    ],
    difficulty: "Hard",
    trending: true,
    description: "Protection of digital systems and data from cyber threats",
    job_prospects: [
      "Cybersecurity Analyst",
      "Ethical Hacker",
      "Security Consultant",
    ],
  },
  {
    id: "blockchain",
    name: "Blockchain Technology",
    category: "Technology",
    subcategory: "Distributed Systems",
    level: "College",
    type: "Specialized",
    boards: ["Universities", "Professional Courses"],
    career_paths: [
      "Blockchain Developer",
      "Cryptocurrency Analyst",
      "Smart Contract Developer",
    ],
    related_skills: [
      "Distributed Systems",
      "Cryptography",
      "Smart Contracts",
      "DeFi",
    ],
    difficulty: "Very Hard",
    trending: true,
    description: "Study of distributed ledger technology and cryptocurrencies",
    job_prospects: ["Blockchain Developer", "Crypto Analyst", "DeFi Developer"],
  },

  // HEALTH AND MEDICAL SPECIALIZATIONS
  {
    id: "nutrition",
    name: "Nutrition and Dietetics",
    category: "Health Sciences",
    subcategory: "Applied Health",
    level: "College",
    type: "Specialized",
    boards: ["Universities", "Medical Institutions"],
    career_paths: [
      "Nutritionist",
      "Dietitian",
      "Food Consultant",
      "Sports Nutritionist",
    ],
    related_skills: [
      "Nutrition Planning",
      "Health Assessment",
      "Meal Planning",
      "Clinical Knowledge",
    ],
    difficulty: "Medium",
    trending: true,
    description: "Study of nutrition science and dietary planning for health",
    job_prospects: [
      "Clinical Nutritionist",
      "Sports Nutritionist",
      "Food Consultant",
    ],
  },
  {
    id: "physiotherapy",
    name: "Physiotherapy",
    category: "Health Sciences",
    subcategory: "Rehabilitation",
    level: "College",
    type: "Specialized",
    boards: ["Medical Universities"],
    career_paths: [
      "Physiotherapist",
      "Sports Therapist",
      "Rehabilitation Specialist",
    ],
    related_skills: [
      "Manual Therapy",
      "Exercise Prescription",
      "Patient Assessment",
      "Rehabilitation",
    ],
    difficulty: "Hard",
    trending: true,
    description: "Treatment of movement disorders and physical rehabilitation",
    job_prospects: [
      "Clinical Physiotherapist",
      "Sports Therapist",
      "Rehabilitation Specialist",
    ],
  },

  // BUSINESS AND ENTREPRENEURSHIP
  {
    id: "entrepreneurship",
    name: "Entrepreneurship",
    category: "Business",
    subcategory: "Innovation",
    level: "College",
    type: "Specialized",
    boards: ["Universities", "Business Schools"],
    career_paths: [
      "Entrepreneur",
      "Startup Founder",
      "Business Consultant",
      "Innovation Manager",
    ],
    related_skills: [
      "Business Planning",
      "Innovation",
      "Leadership",
      "Risk Management",
    ],
    difficulty: "Hard",
    trending: true,
    description:
      "Study of business creation, innovation, and startup management",
    job_prospects: [
      "Startup Founder",
      "Business Consultant",
      "Innovation Manager",
    ],
  },
  {
    id: "digital_marketing",
    name: "Digital Marketing",
    category: "Business",
    subcategory: "Marketing",
    level: "College",
    type: "Specialized",
    boards: ["Universities", "Professional Courses"],
    career_paths: [
      "Digital Marketer",
      "Social Media Manager",
      "SEO Specialist",
      "Content Marketer",
    ],
    related_skills: [
      "SEO/SEM",
      "Social Media",
      "Content Creation",
      "Analytics",
    ],
    difficulty: "Medium",
    trending: true,
    description: "Marketing of products and services using digital channels",
    job_prospects: [
      "Digital Marketing Manager",
      "SEO Specialist",
      "Social Media Manager",
    ],
  },

  // SOCIAL WORK AND DEVELOPMENT
  {
    id: "social_work",
    name: "Social Work",
    category: "Social Sciences",
    subcategory: "Community Development",
    level: "College",
    type: "Specialized",
    boards: ["Universities"],
    career_paths: [
      "Social Worker",
      "NGO Manager",
      "Community Organizer",
      "Policy Advocate",
    ],
    related_skills: [
      "Community Engagement",
      "Counseling",
      "Program Management",
      "Advocacy",
    ],
    difficulty: "Medium",
    trending: true,
    description:
      "Working with communities to address social issues and improve lives",
    job_prospects: ["Social Worker", "NGO Manager", "Community Organizer"],
  },

  // MASS COMMUNICATION AND MEDIA
  {
    id: "journalism",
    name: "Journalism",
    category: "Media",
    subcategory: "Communication",
    level: "College",
    type: "Specialized",
    boards: ["Universities", "Media Institutes"],
    career_paths: ["Journalist", "News Anchor", "Editor", "Media Producer"],
    related_skills: ["Writing", "Research", "Communication", "Media Ethics"],
    difficulty: "Medium",
    trending: true,
    description:
      "Collection, verification, and presentation of news and information",
    job_prospects: ["Journalist", "News Anchor", "Editor", "Content Creator"],
  },
  {
    id: "film_studies",
    name: "Film Studies",
    category: "Media",
    subcategory: "Entertainment",
    level: "College",
    type: "Specialized",
    boards: ["Film Institutes", "Universities"],
    career_paths: [
      "Film Director",
      "Cinematographer",
      "Film Editor",
      "Producer",
    ],
    related_skills: [
      "Storytelling",
      "Visual Composition",
      "Editing",
      "Production Management",
    ],
    difficulty: "Hard",
    trending: true,
    description: "Study of filmmaking, cinema theory, and visual storytelling",
    job_prospects: [
      "Film Director",
      "Cinematographer",
      "Film Editor",
      "Producer",
    ],
  },

  // LABORATORY SUBJECTS
  {
    id: "chemistry_lab",
    name: "Chemistry Laboratory",
    category: "Science",
    subcategory: "Laboratory",
    level: "Both",
    type: "Lab",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Lab Technician",
      "Quality Control Analyst",
      "Research Assistant",
    ],
    related_skills: [
      "Laboratory Safety",
      "Equipment Handling",
      "Data Recording",
      "Chemical Analysis",
    ],
    difficulty: "Medium",
    trending: false,
    description:
      "Practical application of chemistry concepts in laboratory settings",
    job_prospects: ["Lab Technician", "Quality Analyst", "Research Assistant"],
  },
  {
    id: "physics_lab",
    name: "Physics Laboratory",
    category: "Science",
    subcategory: "Laboratory",
    level: "Both",
    type: "Lab",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: [
      "Lab Technician",
      "Instrumentation Engineer",
      "Research Assistant",
    ],
    related_skills: [
      "Instrument Calibration",
      "Data Analysis",
      "Measurement Techniques",
      "Safety Protocols",
    ],
    difficulty: "Medium",
    trending: false,
    description:
      "Hands-on experiments and practical applications of physics principles",
    job_prospects: [
      "Lab Technician",
      "Instrumentation Engineer",
      "Research Assistant",
    ],
  },
  {
    id: "biology_lab",
    name: "Biology Laboratory",
    category: "Science",
    subcategory: "Laboratory",
    level: "Both",
    type: "Lab",
    boards: ["CBSE", "ICSE", "State Boards"],
    career_paths: ["Lab Technician", "Microbiologist", "Research Assistant"],
    related_skills: [
      "Microscopy",
      "Specimen Preparation",
      "Cell Culture",
      "Data Documentation",
    ],
    difficulty: "Medium",
    trending: false,
    description: "Practical study of biological specimens and life processes",
    job_prospects: [
      "Medical Lab Technician",
      "Microbiologist",
      "Research Assistant",
    ],
  },
];

export const getSubjectsByCategory = (category: string): IndianSubject[] => {
  return indianSubjectsDataset.filter(
    (subject) => subject.category === category,
  );
};

export const getTrendingSubjects = (): IndianSubject[] => {
  return indianSubjectsDataset.filter((subject) => subject.trending);
};

export const getSubjectsByLevel = (
  level: "School" | "College" | "Both",
): IndianSubject[] => {
  return indianSubjectsDataset.filter(
    (subject) => subject.level === level || subject.level === "Both",
  );
};

export const getSubjectsByType = (type: string): IndianSubject[] => {
  return indianSubjectsDataset.filter((subject) => subject.type === type);
};

export const searchSubjects = (query: string): IndianSubject[] => {
  const lowerQuery = query.toLowerCase();
  return indianSubjectsDataset.filter(
    (subject) =>
      subject.name.toLowerCase().includes(lowerQuery) ||
      subject.description.toLowerCase().includes(lowerQuery) ||
      subject.career_paths.some((path) =>
        path.toLowerCase().includes(lowerQuery),
      ) ||
      subject.related_skills.some((skill) =>
        skill.toLowerCase().includes(lowerQuery),
      ),
  );
};

export const getUniqueCategories = (): string[] => {
  return Array.from(
    new Set(indianSubjectsDataset.map((subject) => subject.category)),
  );
};

export const getUniqueSubcategories = (): string[] => {
  return Array.from(
    new Set(
      indianSubjectsDataset
        .map((subject) => subject.subcategory)
        .filter(Boolean),
    ),
  ) as string[];
};
