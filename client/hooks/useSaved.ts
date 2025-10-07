import { useState, useEffect, useCallback } from 'react';

// Types for saved items
export interface SavedItem {
  id: string;
  type: 'careers' | 'jobs' | 'business';
  title: string;
  description?: string;
  data: any;
  savedAt: number;
}

export interface SavedItems {
  careers: SavedItem[];
  jobs: SavedItem[];
  business: SavedItem[];
}

// Storage keys
const STORAGE_KEYS = {
  careers: 'saved:careers',
  jobs: 'saved:jobs', 
  business: 'saved:business',
} as const;

// Get saved items from localStorage
function getSavedItems(type: keyof SavedItems): SavedItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS[type]);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn(`Failed to load saved ${type}:`, error);
    return [];
  }
}

// Save items to localStorage
function setSavedItemsToStorage(type: keyof SavedItems, items: SavedItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS[type], JSON.stringify(items));
  } catch (error) {
    console.error(`Failed to save ${type}:`, error);
  }
}

// Main hook for managing saved items
export function useSaved(type?: keyof SavedItems) {
  const [savedItems, setSavedItems] = useState<SavedItems>(() => ({
    careers: getSavedItems('careers'),
    jobs: getSavedItems('jobs'),
    business: getSavedItems('business'),
  }));

  // Update state when localStorage changes (from other tabs)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (Object.values(STORAGE_KEYS).includes(event.key as any)) {
        const itemType = Object.entries(STORAGE_KEYS).find(
          ([, key]) => key === event.key
        )?.[0] as keyof SavedItems;
        
        if (itemType) {
          setSavedItems(prev => ({
            ...prev,
            [itemType]: getSavedItems(itemType),
          }));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Add item to saved list
  const addSavedItem = useCallback((
    itemType: keyof SavedItems,
    id: string,
    title: string,
    data: any,
    description?: string
  ) => {
    const newItem: SavedItem = {
      id,
      type: itemType,
      title,
      description,
      data,
      savedAt: Date.now(),
    };

    setSavedItems(prev => {
      const updated = prev[itemType].filter(item => item.id !== id);
      const newItems = [newItem, ...updated];
      setSavedItemsToStorage(itemType, newItems);
      return {
        ...prev,
        [itemType]: newItems,
      };
    });
  }, []);

  // Remove item from saved list
  const removeSavedItem = useCallback((itemType: keyof SavedItems, id: string) => {
    setSavedItems(prev => {
      const updated = prev[itemType].filter(item => item.id !== id);
      setSavedItemsToStorage(itemType, updated);
      return {
        ...prev,
        [itemType]: updated,
      };
    });
  }, []);

  // Check if item is saved
  const isSaved = useCallback((itemType: keyof SavedItems, id: string): boolean => {
    return savedItems[itemType].some(item => item.id === id);
  }, [savedItems]);

  // Toggle saved state
  const toggleSaved = useCallback((
    itemType: keyof SavedItems,
    id: string,
    title: string,
    data: any,
    description?: string
  ) => {
    if (isSaved(itemType, id)) {
      removeSavedItem(itemType, id);
    } else {
      addSavedItem(itemType, id, title, data, description);
    }
  }, [isSaved, addSavedItem, removeSavedItem]);

  // Get saved items count
  const getSavedCount = useCallback((itemType?: keyof SavedItems): number => {
    if (itemType) {
      return savedItems[itemType].length;
    }
    return Object.values(savedItems).reduce((total, items) => total + items.length, 0);
  }, [savedItems]);

  // Get recent saved items
  const getRecentSaved = useCallback((limit: number = 10): SavedItem[] => {
    const allItems = Object.values(savedItems).flat();
    return allItems
      .sort((a, b) => b.savedAt - a.savedAt)
      .slice(0, limit);
  }, [savedItems]);

  // Clear all saved items of a type
  const clearSaved = useCallback((itemType: keyof SavedItems) => {
    setSavedItems(prev => {
      setSavedItemsToStorage(itemType, []);
      return {
        ...prev,
        [itemType]: [],
      };
    });
  }, []);

  // Export saved items as JSON
  const exportSaved = useCallback((itemType?: keyof SavedItems) => {
    const dataToExport = itemType ? { [itemType]: savedItems[itemType] } : savedItems;
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `careermap-saved-${itemType || 'all'}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [savedItems]);

  // Import saved items from JSON
  const importSaved = useCallback((file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          
          // Validate structure
          const validTypes = ['careers', 'jobs', 'business'];
          for (const [key, items] of Object.entries(imported)) {
            if (validTypes.includes(key) && Array.isArray(items)) {
              setSavedItems(prev => {
                const mergedItems = [...prev[key as keyof SavedItems]];
                items.forEach((item: SavedItem) => {
                  if (!mergedItems.some(existing => existing.id === item.id)) {
                    mergedItems.push(item);
                  }
                });
                setSavedItemsToStorage(key as keyof SavedItems, mergedItems);
                return {
                  ...prev,
                  [key]: mergedItems,
                };
              });
            }
          }
          resolve();
        } catch (error) {
          reject(new Error('Invalid file format'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }, []);

  // Return specific type or all saved items
  if (type) {
    return {
      items: savedItems[type],
      add: (id: string, title: string, data: any, description?: string) =>
        addSavedItem(type, id, title, data, description),
      remove: (id: string) => removeSavedItem(type, id),
      toggle: (id: string, title: string, data: any, description?: string) =>
        toggleSaved(type, id, title, data, description),
      isSaved: (id: string) => isSaved(type, id),
      count: getSavedCount(type),
      clear: () => clearSaved(type),
      export: () => exportSaved(type),
    };
  }

  return {
    all: savedItems,
    careers: savedItems.careers,
    jobs: savedItems.jobs,
    business: savedItems.business,
    addSavedItem,
    removeSavedItem,
    toggleSaved,
    isSaved,
    getSavedCount,
    getRecentSaved,
    clearSaved,
    exportSaved,
    importSaved,
    totalCount: getSavedCount(),
  };
}

// Hook for specific saved type
export function useSavedCareers() {
  return useSaved('careers');
}

export function useSavedJobs() {
  return useSaved('jobs');
}

export function useSavedBusiness() {
  return useSaved('business');
}

// Utility functions
export const savedUtils = {
  // Check if localStorage is available
  isStorageAvailable: (): boolean => {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  // Get storage usage for saved items
  getStorageUsage: (): { used: number; available: number; percentage: number } => {
    try {
      const total = 5 * 1024 * 1024; // 5MB typical localStorage limit
      const used = Object.values(STORAGE_KEYS).reduce((sum, key) => {
        const item = localStorage.getItem(key);
        return sum + (item ? item.length : 0);
      }, 0);
      
      return {
        used,
        available: total - used,
        percentage: Math.round((used / total) * 100),
      };
    } catch {
      return { used: 0, available: 0, percentage: 0 };
    }
  },

  // Cleanup old saved items
  cleanupOldItems: (daysOld: number = 30): number => {
    const cutoffTime = Date.now() - (daysOld * 24 * 60 * 60 * 1000);
    let removed = 0;

    Object.entries(STORAGE_KEYS).forEach(([type, key]) => {
      const items = getSavedItems(type as keyof SavedItems);
      const filtered = items.filter(item => item.savedAt > cutoffTime);

      if (filtered.length < items.length) {
        removed += items.length - filtered.length;
        setSavedItemsToStorage(type as keyof SavedItems, filtered);
      }
    });

    return removed;
  },
};

export default useSaved;
