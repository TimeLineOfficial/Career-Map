// API adapters with graceful fallback to local data files

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// Generic API adapter with fallback
async function apiAdapter<T>(
  endpoint: string,
  fallbackPath: string,
  options?: RequestInit
): Promise<T> {
  try {
    // Try API first
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (response.ok) {
      const result: ApiResponse<T> = await response.json();
      if (result.success) {
        return result.data;
      }
    }

    throw new Error(`API error: ${response.status}`);
  } catch (error) {
    console.warn(`API fallback: ${endpoint} -> ${fallbackPath}`, error);
    
    // Fallback to local data
    try {
      const response = await fetch(fallbackPath);
      if (!response.ok) {
        throw new Error(`Failed to load fallback data: ${response.status}`);
      }
      return await response.json();
    } catch (fallbackError) {
      console.error('Fallback failed:', fallbackError);
      throw new Error(`Both API and fallback failed for ${endpoint}`);
    }
  }
}

// Career paths API
export const careerApi = {
  getPlaceholders: () => 
    apiAdapter<any>('/careers/placeholders', '/data/placeholders.json'),
  
  generatePath: (stage: string, goal: string) =>
    apiAdapter<any>(`/careers/generate?stage=${stage}&goal=${goal}`, '/data/placeholders.json'),
  
  getCareerMap: (id: string) =>
    apiAdapter<any>(`/careers/${id}`, '/data/placeholders.json'),
};

// Interests API
export const interestsApi = {
  getAll: () =>
    apiAdapter<any>('/interests', '/data/interests.json'),
  
  search: (query: string) =>
    apiAdapter<any>(`/interests/search?q=${query}`, '/data/interests.json'),
  
  getByCategory: (category: string) =>
    apiAdapter<any>(`/interests/category/${category}`, '/data/interests.json'),
};

// Business ideas API
export const businessApi = {
  getAll: () =>
    apiAdapter<any>('/business/ideas', '/data/business_ideas.json'),
  
  getById: (id: string) =>
    apiAdapter<any>(`/business/ideas/${id}`, '/data/business_ideas.json'),
  
  search: (query: string) =>
    apiAdapter<any>(`/business/search?q=${query}`, '/data/business_ideas.json'),
  
  getByCategory: (category: string) =>
    apiAdapter<any>(`/business/category/${category}`, '/data/business_ideas.json'),
};

// Jobs API
export const jobsApi = {
  getAll: () =>
    apiAdapter<any>('/jobs', '/data/jobs_seed.json'),
  
  getById: (id: string) =>
    apiAdapter<any>(`/jobs/${id}`, '/data/jobs_seed.json'),
  
  search: (query: string) =>
    apiAdapter<any>(`/jobs/search?q=${query}`, '/data/jobs_seed.json'),
  
  getByType: (type: 'government' | 'private') =>
    apiAdapter<any>(`/jobs/type/${type}`, '/data/jobs_seed.json'),
  
  getLatest: (limit: number = 10) =>
    apiAdapter<any>(`/jobs/latest?limit=${limit}`, '/data/jobs_seed.json'),
};

// User preferences API (localStorage fallback)
export const userApi = {
  savePreferences: async (preferences: any): Promise<void> => {
    try {
      await fetch(`${API_BASE}/user/preferences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });
    } catch (error) {
      // Fallback to localStorage
      localStorage.setItem('user_preferences', JSON.stringify(preferences));
    }
  },
  
  getPreferences: async (): Promise<any> => {
    try {
      const response = await fetch(`${API_BASE}/user/preferences`);
      if (response.ok) {
        const result = await response.json();
        return result.data;
      }
    } catch (error) {
      // Fallback to localStorage
      const stored = localStorage.getItem('user_preferences');
      return stored ? JSON.parse(stored) : {};
    }
  },
  
  saveFavorite: async (type: string, id: string, data: any): Promise<void> => {
    try {
      await fetch(`${API_BASE}/user/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, data }),
      });
    } catch (error) {
      // Fallback to localStorage
      const favorites = JSON.parse(localStorage.getItem('user_favorites') || '{}');
      if (!favorites[type]) favorites[type] = {};
      favorites[type][id] = data;
      localStorage.setItem('user_favorites', JSON.stringify(favorites));
    }
  },
  
  getFavorites: async (type?: string): Promise<any> => {
    try {
      const url = type ? `${API_BASE}/user/favorites?type=${type}` : `${API_BASE}/user/favorites`;
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        return result.data;
      }
    } catch (error) {
      // Fallback to localStorage
      const favorites = JSON.parse(localStorage.getItem('user_favorites') || '{}');
      return type ? favorites[type] || {} : favorites;
    }
  },
  
  removeFavorite: async (type: string, id: string): Promise<void> => {
    try {
      await fetch(`${API_BASE}/user/favorites/${type}/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      // Fallback to localStorage
      const favorites = JSON.parse(localStorage.getItem('user_favorites') || '{}');
      if (favorites[type]) {
        delete favorites[type][id];
        localStorage.setItem('user_favorites', JSON.stringify(favorites));
      }
    }
  },
};

// Language API
export const languageApi = {
  getTranslations: (lang: string) =>
    apiAdapter<any>(`/translations/${lang}`, `/data/translations/${lang}.json`),
  
  getSupportedLanguages: () =>
    apiAdapter<string[]>('/languages', '/data/languages.json'),
};

// Analytics API (optional)
export const analyticsApi = {
  trackEvent: async (event: string, data: any): Promise<void> => {
    try {
      await fetch(`${API_BASE}/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, data, timestamp: Date.now() }),
      });
    } catch (error) {
      // Silently fail for analytics
      console.debug('Analytics tracking failed:', error);
    }
  },
  
  getStats: async (): Promise<any> => {
    try {
      const response = await fetch(`${API_BASE}/analytics/stats`);
      if (response.ok) {
        const result = await response.json();
        return result.data;
      }
    } catch (error) {
      // Return empty stats if API unavailable
      return { views: 0, users: 0, conversions: 0 };
    }
  },
};

// Health check for API availability
export const healthApi = {
  check: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE}/health`, {
        method: 'GET',
        timeout: 5000,
      } as RequestInit);
      return response.ok;
    } catch (error) {
      return false;
    }
  },
};

// Export all APIs
export default {
  career: careerApi,
  interests: interestsApi,
  business: businessApi,
  jobs: jobsApi,
  user: userApi,
  language: languageApi,
  analytics: analyticsApi,
  health: healthApi,
};

// Utility function to check if running in offline mode
export const isOfflineMode = async (): Promise<boolean> => {
  return !(await healthApi.check());
};

// Initialize API check on load
let apiAvailable = false;
healthApi.check().then(status => {
  apiAvailable = status;
  console.log(`API Status: ${status ? 'Online' : 'Offline (using fallback data)'}`);
});

export { apiAvailable };
