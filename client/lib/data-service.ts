import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  extendedInterestDataset,
  ExtendedInterest,
  searchInterests,
  getTrendingInterests,
} from "./extended-interests";
import {
  allJobs,
  JobPosting,
  getJobsByType,
  getActiveJobs,
  searchJobs,
  JobAutoFetcher,
} from "./job-dataset";

// Types based on the JSON structure
export interface CareerMapData {
  meta: {
    version: string;
    generated_at: string;
    source: string;
    notes: string[];
  };
  site: {
    name: string;
    tagline: string;
    design: {
      theme: string;
      dark_mode: boolean;
      mobile_first: boolean;
      animation: string;
      map_colors_by_stage: boolean;
    };
    languages: string[];
    auth: {
      providers: string[];
      require_login_to_save: boolean;
      save_prompt_after_seconds: number;
    };
    monetization: {
      ads: {
        enabled: boolean;
        slots: string[];
      };
      premium_notes: {
        enabled: boolean;
        payment_method: string;
        deliverable: string;
      };
    };
    admin: {
      login: {
        username: string;
        password: string;
      };
      warnings: string[];
    };
    performance: any;
    seo: any;
    navigation: {
      items: string[];
    };
    ui_text: {
      [key: string]: {
        [lang: string]: string;
      };
    };
  };
  stages: Array<{
    id: string;
    label: string;
    color: string;
  }>;
  interests: Array<{
    id: string;
    category: string;
    name: string;
  }>;
  courses: Array<{
    id: string;
    level: string;
    name: string;
    requires_stage: string;
    entrance: string[];
  }>;
  exams: Array<{
    id: string;
    name: string;
    unlocks: string[];
  }>;
  careers: Array<{
    id: string;
    title: string;
    preferred_stream: string;
    primary_courses: string[];
  }>;
  rules: Array<{
    from_stage: string;
    goal: string;
    recommendation: string;
    next_stage: string;
    guard?: string;
    exams?: string[];
    courses?: string[];
  }>;
  business_ideas: Array<{
    id: string;
    category: string;
    name: string;
    min_capital_inr: number;
    documents: string[];
  }>;
  job_sources: Array<{
    id: string;
    type: string;
    strategy: string;
    url: string;
  }>;
  job_schema: {
    fields: string[];
    filters: string[];
  };
  ui_contracts: {
    map_layout: {
      type: string;
      spacing: string;
      draggable: boolean;
      pinch_zoom_mobile: boolean;
    };
    buttons: any;
    saved: {
      sections: string[];
      autosave: boolean;
    };
  };
  interest_to_stream: {
    [interestId: string]: string;
  };
}

export interface Job {
  id: string;
  source_id: string;
  title: string;
  org: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
  salary_notes?: string;
  allowances?: string;
  start_date: string;
  end_date: string;
  fee_general?: string;
  fee_sc?: string;
  fee_st?: string;
  fee_obc?: string;
  fee_ews?: string;
  apply_url: string;
  howto_url?: string;
  pdf_url?: string;
  created_at: string;
  sector: string;
  education_required: string;
  experience: string;
}

export interface SavedItem {
  id: string;
  type: "career_map" | "interest" | "business_idea" | "job";
  data: any;
  saved_at: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  provider: "google" | "facebook" | "phone";
  saved_items: SavedItem[];
  preferences: {
    language: string;
    dark_mode: boolean;
  };
}

interface DataStore {
  // Data
  careerMapData: CareerMapData | null;
  jobs: JobPosting[];
  extendedInterests: ExtendedInterest[];
  currentUser: User | null;

  // UI State
  currentLanguage: string;
  darkMode: boolean;
  isLoading: boolean;

  // Pagination
  businessIdeasPage: number;
  businessIdeasPerPage: number;
  paginatedBusinessIdeas: any[];
  hasMoreBusinessIdeas: boolean;

  // Actions
  loadData: () => Promise<void>;
  setLanguage: (lang: string) => void;
  toggleDarkMode: () => void;
  setUser: (user: User | null) => void;
  addSavedItem: (item: SavedItem) => void;
  removeSavedItem: (id: string) => void;
  loadMoreBusinessIdeas: () => void;

  // Career Path Generation
  generateCareerPath: (
    currentStage: string,
    goal: string,
  ) => Array<{
    stage: string;
    title: string;
    description: string;
    exams?: string[];
    courses?: string[];
  }>;

  // Interest Matching
  findCareersByInterests: (interests: string[]) => Array<{
    career: any;
    matchScore: number;
    recommendedStream: string;
  }>;

  // Extended Interest Functions
  getExtendedInterests: () => ExtendedInterest[];
  searchExtendedInterests: (query: string) => ExtendedInterest[];
  getTrendingInterests: () => ExtendedInterest[];
  findAdvancedCareersByInterests: (interests: string[], preferredLevel?: string) => any[];

  // Enhanced Job Functions
  getLatestJobs: (
    type?: "government" | "private",
    limit?: number,
  ) => JobPosting[];
  searchJobs: (query: string) => JobPosting[];
  autoFetchJobs: () => Promise<void>;

  // Business Ideas
  loadMoreBusinessIdeas: () => void;

  // Advanced Career Mapping
  getCareerSwitchPaths: (currentField: string, targetField: string) => any[];
  getCareerNotes: (careerPath: string) => any;
  getYouTubeLectures: (topic: string) => any[];

  // Career by Goal Flow
  getEducationStages: () => Array<{ id: string; label: string }>;
  getStreamsByStage: (stage: string) => string[];
  getCoursesByStream: (stream: string) => string[];

  // UI Text
  getText: (key: string, lang?: string) => string;
}

export const useDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      // Initial state
      careerMapData: null,
      jobs: allJobs,
      extendedInterests: extendedInterestDataset,
      currentUser: null,
      currentLanguage: "en",
      darkMode: false,
      isLoading: false,
      businessIdeasPage: 1,
      businessIdeasPerPage: 6,
      paginatedBusinessIdeas: [],
      hasMoreBusinessIdeas: true,

      // Load data from JSON
      loadData: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch("/CareerMap_unified_payload.json");
          const data: CareerMapData = await response.json();
          // Initialize paginated business ideas
          const initialBusinessIdeas = data.business_ideas?.slice(0, 6) || [];

          set({
            careerMapData: data,
            currentLanguage: data.site.languages[0] || "en",
            darkMode: data.site.design.dark_mode,
            isLoading: false,
            paginatedBusinessIdeas: initialBusinessIdeas,
            hasMoreBusinessIdeas: (data.business_ideas?.length || 0) > 6,
          });

          // Apply theme
          if (data.site.design.dark_mode) {
            document.documentElement.classList.add("dark");
          }

          console.log("CareerMap data loaded successfully");
        } catch (error) {
          console.error("Failed to load CareerMap data:", error);
          set({ isLoading: false });
        }
      },

      // UI Actions
      setLanguage: (lang: string) => {
        set({ currentLanguage: lang });
        // Update user preferences if logged in
        const { currentUser } = get();
        if (currentUser) {
          set({
            currentUser: {
              ...currentUser,
              preferences: {
                ...currentUser.preferences,
                language: lang,
              },
            },
          });
        }
      },

      toggleDarkMode: () => {
        const { darkMode } = get();
        const newDarkMode = !darkMode;
        set({ darkMode: newDarkMode });

        if (newDarkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }

        // Update user preferences if logged in
        const { currentUser } = get();
        if (currentUser) {
          set({
            currentUser: {
              ...currentUser,
              preferences: {
                ...currentUser.preferences,
                dark_mode: newDarkMode,
              },
            },
          });
        }
      },

      // User management
      setUser: (user: User | null) => {
        set({ currentUser: user });
        if (user) {
          // Apply user preferences
          set({
            currentLanguage: user.preferences.language,
            darkMode: user.preferences.dark_mode,
          });

          if (user.preferences.dark_mode) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
      },

      // Saved items
      addSavedItem: (item: SavedItem) => {
        const { currentUser } = get();
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            saved_items: [...currentUser.saved_items, item],
          };
          set({ currentUser: updatedUser });
        }
      },

      removeSavedItem: (id: string) => {
        const { currentUser } = get();
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            saved_items: currentUser.saved_items.filter(
              (item) => item.id !== id,
            ),
          };
          set({ currentUser: updatedUser });
        }
      },

      // Business ideas pagination
      loadMoreBusinessIdeas: () => {
        set((state) => {
          const currentLength = state.paginatedBusinessIdeas.length;
          const nextBatch =
            state.careerMapData?.business_ideas?.slice(
              currentLength,
              currentLength + state.businessIdeasPerPage,
            ) || [];

          return {
            paginatedBusinessIdeas: [
              ...state.paginatedBusinessIdeas,
              ...nextBatch,
            ],
            hasMoreBusinessIdeas:
              currentLength + nextBatch.length <
              (state.careerMapData?.business_ideas?.length || 0),
          };
        });
      },

      // Extended Interest Functions
      getExtendedInterests: () => {
        return extendedInterestDataset;
      },

      searchExtendedInterests: (query: string) => {
        return searchInterests(query);
      },

      getTrendingInterests: () => {
        return getTrendingInterests();
      },

      findAdvancedCareersByInterests: (interests: string[], preferredLevel?: string) => {
        const extendedInterests = extendedInterestDataset;

        const matchedCareers = interests.flatMap(interestName => {
          const interest = extendedInterests.find(i =>
            i.name.toLowerCase().includes(interestName.toLowerCase()) ||
            i.keywords.some(k => k.toLowerCase().includes(interestName.toLowerCase()))
          );

          return interest ? interest.career_paths.map(path => ({
            path,
            interest: interest.name,
            category: interest.category,
            growth: interest.growth_potential,
            salary: interest.salary_range,
            education: interest.education_levels
          })) : [];
        });

        return matchedCareers.slice(0, 20); // Limit to top 20 matches
      },

      // Enhanced Job Functions
      getLatestJobs: (type?: "government" | "private", limit = 50) => {
        const activeJobs = getActiveJobs();
        const filteredJobs = type ? getJobsByType(type) : activeJobs;
        return filteredJobs.slice(0, limit);
      },

      searchJobs: (query: string) => {
        return searchJobs(query);
      },

      autoFetchJobs: async () => {
        const jobFetcher = JobAutoFetcher.getInstance();
        await jobFetcher.startAutoFetch();
      },

      // Advanced Career Mapping
      getCareerSwitchPaths: (currentField: string, targetField: string) => {
        return [
          {
            path: `${currentField} → ${targetField}`,
            steps: [
              `Assess transferable skills from ${currentField}`,
              `Complete foundation courses in ${targetField}`,
              "Gain relevant certifications",
              "Build portfolio projects",
              "Network in target industry",
              "Apply for entry-level or transitional roles",
            ],
            duration: "6-18 months",
            difficulty: currentField === targetField ? "low" : "medium",
            estimated_cost: "₹50,000 - ₹2,00,000",
            success_rate: "70-85%",
          },
        ];
      },

      getCareerNotes: (careerPath: string) => {
        return {
          summary: `Comprehensive guide for ${careerPath} career development`,
          topics: [
            "Foundation concepts and prerequisites",
            "Essential skills and competencies",
            "Industry trends and future outlook",
            "Salary expectations and growth trajectory",
            "Top companies and career opportunities",
            "Certification and learning paths",
          ],
          resources: [
            "Official documentation and standards",
            "Recommended online courses (Coursera, edX)",
            "Industry reports and whitepapers",
            "Expert interviews and podcasts",
            "Professional communities and forums",
          ],
          timeline: {
            beginner: "3-6 months",
            intermediate: "6-12 months",
            advanced: "1-2 years",
            expert: "3+ years",
          },
        };
      },

      getYouTubeLectures: (topic: string) => {
        return [
          {
            title: `${topic} - Complete Tutorial Series`,
            channel: "Career Academy India",
            duration: "2:30:00",
            url: `https://youtube.com/watch?v=${topic.toLowerCase().replace(/\s+/g, "_")}_tutorial`,
            verified: true,
            views: "1.2M",
            rating: 4.8,
          },
          {
            title: `Advanced ${topic} Concepts`,
            channel: "Tech Mastery",
            duration: "1:45:00",
            url: `https://youtube.com/watch?v=${topic.toLowerCase().replace(/\s+/g, "_")}_advanced`,
            verified: true,
            views: "856K",
            rating: 4.7,
          },
          {
            title: `${topic} Interview Preparation`,
            channel: "Interview Success",
            duration: "45:30",
            url: `https://youtube.com/watch?v=${topic.toLowerCase().replace(/\s+/g, "_")}_interview`,
            verified: true,
            views: "623K",
            rating: 4.9,
          },
        ];
      },

      // Career by Goal Flow
      getEducationStages: () => {
        return [
          { id: "class_10_below", label: "10th or Below" },
          { id: "class_11_12", label: "11th-12th" },
          { id: "undergraduate", label: "Undergraduate (UG)" },
          { id: "postgraduate", label: "Postgraduate (PG)" },
          { id: "phd", label: "PhD/Doctorate" },
          { id: "working_professional", label: "Working Professional" },
        ];
      },

      getStreamsByStage: (stage: string) => {
        const streamMapping: Record<string, string[]> = {
          class_11_12: [
            "Science (PCM)",
            "Science (PCB)",
            "Commerce",
            "Arts/Humanities",
          ],
          undergraduate: [
            "Engineering",
            "Medical",
            "Commerce",
            "Arts",
            "Science",
            "Law",
            "Design",
          ],
          postgraduate: ["MTech", "MBA", "MSc", "MA", "LLM", "MD/MS", "MFA"],
          working_professional: [
            "Information Technology",
            "Finance & Banking",
            "Healthcare",
            "Education",
            "Manufacturing",
            "Retail",
            "Government",
            "Consulting",
            "Startups",
          ],
        };
        return streamMapping[stage] || [];
      },

      getCoursesByStream: (stream: string) => {
        const courseMapping: Record<string, string[]> = {
          Engineering: [
            "Computer Science",
            "Electronics",
            "Mechanical",
            "Civil",
            "Chemical",
            "Aerospace",
          ],
          Medical: ["MBBS", "BDS", "BAMS", "BHMS", "Nursing", "Pharmacy"],
          Commerce: ["BCom", "BBA", "CA", "CS", "CMA", "Economics"],
          Science: [
            "Physics",
            "Chemistry",
            "Mathematics",
            "Biology",
            "Environmental Science",
          ],
          Arts: [
            "English Literature",
            "History",
            "Political Science",
            "Psychology",
            "Sociology",
          ],
          "Information Technology": [
            "Software Development",
            "Data Science",
            "Cybersecurity",
            "Cloud Computing",
            "AI/ML",
          ],
        };
        return courseMapping[stream] || [];
      },

      // Career path generation using rules
      generateCareerPath: (currentStage: string, goal: string) => {
        const { careerMapData } = get();
        if (!careerMapData) return [];

        const path: Array<{
          stage: string;
          title: string;
          description: string;
          exams?: string[];
          courses?: string[];
        }> = [];

        let currentStageId = currentStage;
        const visitedStages = new Set<string>();

        while (currentStageId && !visitedStages.has(currentStageId)) {
          visitedStages.add(currentStageId);

          // Find rule for current stage and goal
          const rule = careerMapData.rules.find(
            (r) => r.from_stage === currentStageId && r.goal === goal,
          );

          if (!rule) break;

          // Get stage info
          const stageInfo = careerMapData.stages.find(
            (s) => s.id === currentStageId,
          );

          path.push({
            stage: currentStageId,
            title: stageInfo?.label || currentStageId,
            description: rule.recommendation,
            exams: rule.exams,
            courses: rule.courses,
          });

          currentStageId = rule.next_stage;
        }

        return path;
      },

      // Interest matching using interest_to_stream mapping
      findCareersByInterests: (interests: string[]) => {
        const { careerMapData } = get();
        if (!careerMapData) return [];

        const matches: Array<{
          career: any;
          matchScore: number;
          recommendedStream: string;
        }> = [];

        // Map interests to streams
        const recommendedStreams = interests
          .map((interest) => careerMapData.interest_to_stream[interest])
          .filter(Boolean);

        // Find careers that match these streams
        careerMapData.careers.forEach((career) => {
          const matchingStreams = recommendedStreams.filter(
            (stream) =>
              career.preferred_stream === stream ||
              career.preferred_stream === "any",
          );

          if (matchingStreams.length > 0) {
            const matchScore =
              (matchingStreams.length / interests.length) * 100;
            matches.push({
              career,
              matchScore,
              recommendedStream: matchingStreams[0] || career.preferred_stream,
            });
          }
        });

        // Sort by match score
        return matches.sort((a, b) => b.matchScore - a.matchScore);
      },

      // Get localized text
      getText: (key: string, lang?: string) => {
        const { careerMapData, currentLanguage } = get();
        const language = lang || currentLanguage;

        if (careerMapData?.site.ui_text[key]) {
          return (
            careerMapData.site.ui_text[key][language] ||
            careerMapData.site.ui_text[key]["en"] ||
            key
          );
        }

        return key;
      },
    }),
    {
      name: "careermap-store",
      partialize: (state) => ({
        currentUser: state.currentUser,
        currentLanguage: state.currentLanguage,
        darkMode: state.darkMode,
        businessIdeasPage: state.businessIdeasPage,
      }),
    },
  ),
);

// Job fetching service (simulated for now, would integrate with actual APIs)
export class JobFetchService {
  private static instance: JobFetchService;

  static getInstance(): JobFetchService {
    if (!JobFetchService.instance) {
      JobFetchService.instance = new JobFetchService();
    }
    return JobFetchService.instance;
  }

  async fetchJobsFromSources(): Promise<Job[]> {
    const { careerMapData } = useDataStore.getState();
    if (!careerMapData) return [];

    const mockJobs: Job[] = [
      {
        id: "job_1",
        source_id: "ssc",
        title: "Combined Graduate Level Examination",
        org: "Staff Selection Commission",
        location: "All India",
        salary_min: 25500,
        salary_max: 81100,
        salary_notes: "Pay Level 4 to 8",
        allowances: "HRA, TA, Medical",
        start_date: "2024-02-01",
        end_date: "2024-03-01",
        fee_general: "₹100",
        fee_sc: "Nil",
        fee_st: "Nil",
        fee_obc: "₹100",
        fee_ews: "Nil",
        apply_url: "https://ssc.nic.in",
        howto_url: "https://youtube.com/watch?v=example",
        created_at: new Date().toISOString(),
        sector: "Government",
        education_required: "Graduation",
        experience: "Fresher",
      },
      {
        id: "job_2",
        source_id: "railways_rrb",
        title: "Junior Engineer",
        org: "Railway Recruitment Board",
        location: "Multiple Zones",
        salary_min: 35400,
        salary_max: 112400,
        salary_notes: "Pay Level 6",
        allowances: "HRA, TA, Medical",
        start_date: "2024-01-15",
        end_date: "2024-02-15",
        fee_general: "₹500",
        fee_sc: "₹250",
        fee_st: "₹250",
        fee_obc: "₹500",
        fee_ews: "₹250",
        apply_url: "https://indianrailways.gov.in",
        howto_url: "https://youtube.com/watch?v=example2",
        created_at: new Date().toISOString(),
        sector: "Railway",
        education_required: "Engineering Diploma/Degree",
        experience: "Fresher",
      },
    ];

    return mockJobs;
  }

  async scheduleAutoFetch(): Promise<void> {
    // This would implement the actual scheduled fetching
    // For now, we'll just update the store with mock data
    const jobs = await this.fetchJobsFromSources();
    useDataStore.setState({ jobs });
  }
}

// Initialize data loading
export const initializeCareerMapData = async () => {
  const store = useDataStore.getState();
  await store.loadData();

  // Initialize job fetching
  const jobService = JobFetchService.getInstance();
  await jobService.scheduleAutoFetch();
};

// Helper functions
export const getStageColor = (stageId: string): string => {
  const { careerMapData } = useDataStore.getState();
  const stage = careerMapData?.stages.find((s) => s.id === stageId);
  return stage?.color || "#000000";
};

export const getInterestsByCategory = () => {
  const { careerMapData } = useDataStore.getState();
  if (!careerMapData) return {};

  return careerMapData.interests.reduce(
    (acc, interest) => {
      if (!acc[interest.category]) {
        acc[interest.category] = [];
      }
      acc[interest.category].push(interest);
      return acc;
    },
    {} as Record<string, typeof careerMapData.interests>,
  );
};

export const getBusinessIdeasByCategory = () => {
  const { careerMapData } = useDataStore.getState();
  if (!careerMapData) return {};

  return careerMapData.business_ideas.reduce(
    (acc, idea) => {
      if (!acc[idea.category]) {
        acc[idea.category] = [];
      }
      acc[idea.category].push(idea);
      return acc;
    },
    {} as Record<string, typeof careerMapData.business_ideas>,
  );
};

export const formatCurrency = (amount: number): string => {
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
