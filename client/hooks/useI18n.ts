import { useState, useEffect, useCallback } from 'react';

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'বা���লা', flag: '🇧🇩' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
] as const;

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];

// Translation type
export interface Translations {
  [key: string]: string | Translations;
}

// Default English translations
const DEFAULT_TRANSLATIONS: Translations = {
  // Navigation
  nav: {
    jobs: 'Jobs',
    business: 'Business',
    'career-map': 'Career Map',
    vacancies: 'Vacancies',
  },
  
  // Common terms
  common: {
    loading: 'Loading...',
    error: 'Error',
    'try-again': 'Try Again',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    filter: 'Filter',
    'clear-all': 'Clear All',
    'load-more': 'Load More',
    'see-more': 'See More',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    ok: 'OK',
    yes: 'Yes',
    no: 'No',
  },

  // Career section
  career: {
    'by-goal': 'Career by Goal',
    'by-interest': 'Career by Interest',
    'career-map': 'Career Map',
    'select-goal': 'Select your career goal',
    'select-stage': 'What\'s your current education level?',
    'select-stream': 'Choose your stream/field',
    'select-course': 'Select your specific course',
    'generate-map': 'Generate Career Map',
    'view-roadmap': 'View Career Roadmap',
    timeline: 'Timeline',
    requirements: 'Requirements',
    'key-exams': 'Key Exams',
    'next-steps': 'Next Steps',
  },

  // Business section
  business: {
    ideas: 'Business Ideas',
    'startup-guide': 'Startup Guide',
    documentation: 'Documentation',
    calculator: 'ROI Calculator',
    'investment-range': 'Investment Range',
    'roi-potential': 'ROI Potential',
    difficulty: 'Difficulty',
    'market-potential': 'Market Potential',
    'view-details': 'View Details',
    'start-plan': 'Start Planning',
  },

  // Jobs section
  jobs: {
    latest: 'Latest Jobs',
    government: 'Government Jobs',
    private: 'Private Jobs',
    'application-deadline': 'Application Deadline',
    salary: 'Salary',
    location: 'Location',
    'apply-now': 'Apply Now',
    'how-to-apply': 'How to Apply',
    eligibility: 'Eligibility',
    'selection-process': 'Selection Process',
  },

  // Forms
  forms: {
    'enter-name': 'Enter your name',
    'enter-email': 'Enter your email',
    'enter-password': 'Enter your password',
    'confirm-password': 'Confirm password',
    'sign-in': 'Sign In',
    'sign-up': 'Sign Up',
    'sign-out': 'Sign Out',
    'forgot-password': 'Forgot Password?',
    'create-account': 'Create Account',
    'already-have-account': 'Already have an account?',
    'dont-have-account': 'Don\'t have an account?',
  },

  // Messages
  messages: {
    'welcome-back': 'Welcome back!',
    'account-created': 'Account created successfully',
    'signed-out': 'Signed out successfully',
    'item-saved': 'Item saved to favorites',
    'item-removed': 'Item removed from favorites',
    'no-results': 'No results found',
    'try-different-search': 'Try different search terms',
    'loading-data': 'Loading data...',
    'network-error': 'Network error. Please try again.',
  },

  // Education levels
  education: {
    'class-10-below': 'Class 10th & Below',
    'class-11-12': 'Class 11th-12th',
    undergraduate: 'Undergraduate',
    postgraduate: 'Postgraduate',
    phd: 'PhD',
    'working-professional': 'Working Professional',
  },

  // Streams
  streams: {
    pcm: 'Physics, Chemistry, Mathematics',
    pcb: 'Physics, Chemistry, Biology',
    pcmb: 'PCM + Biology',
    commerce: 'Commerce',
    arts: 'Arts/Humanities',
  },
};

// Simple translation loader (fallback to embedded translations)
async function loadTranslations(langCode: LanguageCode): Promise<Translations> {
  try {
    // Try to load from API or local files
    const response = await fetch(`/data/translations/${langCode}.json`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn(`Failed to load translations for ${langCode}:`, error);
  }

  // Fallback to default translations for now
  // In a real app, you'd have actual translation files
  return DEFAULT_TRANSLATIONS;
}

// Get nested translation value
function getTranslation(translations: Translations, key: string): string {
  const keys = key.split('.');
  let current: any = translations;
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return typeof current === 'string' ? current : key;
}

// Main i18n hook
export function useI18n() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    // Get from localStorage or default to English
    const stored = localStorage.getItem('user_language');
    if (stored && SUPPORTED_LANGUAGES.some(lang => lang.code === stored)) {
      return stored as LanguageCode;
    }
    
    // Try to detect from browser
    const browserLang = navigator.language.split('-')[0] as LanguageCode;
    if (SUPPORTED_LANGUAGES.some(lang => lang.code === browserLang)) {
      return browserLang;
    }
    
    return 'en';
  });

  const [translations, setTranslations] = useState<Translations>(DEFAULT_TRANSLATIONS);
  const [isLoading, setIsLoading] = useState(false);

  // Load translations when language changes
  useEffect(() => {
    let isCancelled = false;
    
    const loadLangTranslations = async () => {
      setIsLoading(true);
      try {
        const newTranslations = await loadTranslations(currentLanguage);
        if (!isCancelled) {
          setTranslations(newTranslations);
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
        if (!isCancelled) {
          setTranslations(DEFAULT_TRANSLATIONS);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadLangTranslations();
    
    return () => {
      isCancelled = true;
    };
  }, [currentLanguage]);

  // Change language
  const changeLanguage = useCallback((langCode: LanguageCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('user_language', langCode);
    
    // Update HTML lang attribute
    document.documentElement.lang = langCode;
    
    // Update direction for RTL languages if needed
    document.documentElement.dir = 'ltr'; // All our supported languages are LTR
  }, []);

  // Get translation function
  const t = useCallback((key: string, fallback?: string): string => {
    const translation = getTranslation(translations, key);
    return translation !== key ? translation : (fallback || key);
  }, [translations]);

  // Format number based on language
  const formatNumber = useCallback((num: number): string => {
    try {
      return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-IN' : currentLanguage).format(num);
    } catch {
      return num.toString();
    }
  }, [currentLanguage]);

  // Format currency
  const formatCurrency = useCallback((amount: number, currency: string = 'INR'): string => {
    try {
      return new Intl.NumberFormat(currentLanguage === 'en' ? 'en-IN' : currentLanguage, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      return `₹${amount.toLocaleString()}`;
    }
  }, [currentLanguage]);

  // Format date
  const formatDate = useCallback((date: Date): string => {
    try {
      return new Intl.DateTimeFormat(currentLanguage === 'en' ? 'en-IN' : currentLanguage, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    } catch {
      return date.toLocaleDateString();
    }
  }, [currentLanguage]);

  // Format relative time
  const formatRelativeTime = useCallback((date: Date): string => {
    try {
      const rtf = new Intl.RelativeTimeFormat(currentLanguage === 'en' ? 'en-IN' : currentLanguage, {
        numeric: 'auto'
      });
      
      const diff = date.getTime() - Date.now();
      const days = Math.round(diff / (1000 * 60 * 60 * 24));
      
      if (Math.abs(days) < 1) {
        const hours = Math.round(diff / (1000 * 60 * 60));
        return rtf.format(hours, 'hour');
      }
      
      return rtf.format(days, 'day');
    } catch {
      return date.toLocaleDateString();
    }
  }, [currentLanguage]);

  // Get current language info
  const getCurrentLanguage = useCallback(() => {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage) || SUPPORTED_LANGUAGES[0];
  }, [currentLanguage]);

  // Check if RTL language
  const isRTL = useCallback(() => {
    // None of our supported languages are RTL, but this is for future expansion
    return false;
  }, [currentLanguage]);

  return {
    // State
    currentLanguage,
    translations,
    isLoading,
    supportedLanguages: SUPPORTED_LANGUAGES,
    
    // Actions
    changeLanguage,
    t,
    
    // Formatters
    formatNumber,
    formatCurrency,
    formatDate,
    formatRelativeTime,
    
    // Utilities
    getCurrentLanguage,
    isRTL,
  };
}

// Export default hook
export default useI18n;

// Simple component for language switcher
export function LanguageSwitcher({ className }: { className?: string }) {
  const { currentLanguage, supportedLanguages, changeLanguage } = useI18n();
  
  return (
    <select 
      value={currentLanguage}
      onChange={(e) => changeLanguage(e.target.value as LanguageCode)}
      className={className}
    >
      {supportedLanguages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  );
}

// HOC for translation
export function withTranslation<P extends object>(
  Component: React.ComponentType<P & { t: (key: string, fallback?: string) => string }>
) {
  return function TranslatedComponent(props: P) {
    const { t } = useI18n();
    return <Component {...props} t={t} />;
  };
}