// Authentication stub for development and fallback

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    language: string;
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  favorites: {
    careers: string[];
    jobs: string[];
    business: string[];
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Check if auth stub is enabled
const AUTH_STUB_ENABLED = import.meta.env.VITE_ENABLE_AUTH_STUB === 'true';

// Demo user for stub mode
const DEMO_USER: User = {
  id: 'demo_user_123',
  email: 'demo@careermap.com',
  name: 'Demo User',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  preferences: {
    language: 'en',
    theme: 'light',
    notifications: true,
  },
  favorites: {
    careers: [],
    jobs: [],
    business: [],
  },
};

class AuthService {
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  };
  
  private listeners: Set<(state: AuthState) => void> = new Set();

  constructor() {
    this.loadPersistedAuth();
  }

  // Subscribe to auth state changes
  subscribe(listener: (state: AuthState) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Get current auth state
  getState(): AuthState {
    return { ...this.state };
  }

  // Notify listeners of state changes
  private notify() {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  // Load persisted authentication
  private loadPersistedAuth() {
    try {
      const stored = localStorage.getItem('auth_state');
      if (stored) {
        const { user } = JSON.parse(stored);
        if (user) {
          this.state.user = user;
          this.state.isAuthenticated = true;
        }
      }
    } catch (error) {
      console.warn('Failed to load persisted auth:', error);
    }
  }

  // Persist authentication state
  private persistAuth() {
    try {
      localStorage.setItem('auth_state', JSON.stringify({
        user: this.state.user,
        isAuthenticated: this.state.isAuthenticated,
      }));
    } catch (error) {
      console.warn('Failed to persist auth:', error);
    }
  }

  // Sign in with Google (or stub)
  async signInWithGoogle(): Promise<User> {
    this.state.isLoading = true;
    this.notify();

    try {
      if (AUTH_STUB_ENABLED) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Return demo user
        this.state.user = { ...DEMO_USER };
        this.state.isAuthenticated = true;
        this.state.isLoading = false;
        
        this.persistAuth();
        this.notify();
        
        return this.state.user;
      } else {
        // Real Google authentication would go here
        // For now, fall back to stub mode
        console.warn('Google Auth not configured, using stub mode');
        return this.signInWithGoogle(); // Recursive call with stub enabled
      }
    } catch (error) {
      this.state.isLoading = false;
      this.notify();
      throw error;
    }
  }

  // Sign in with email/password (stub only)
  async signInWithEmail(email: string, password: string): Promise<User> {
    this.state.isLoading = true;
    this.notify();

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple validation for demo
      if (email && password.length >= 6) {
        this.state.user = {
          ...DEMO_USER,
          email,
          name: email.split('@')[0] || 'User',
        };
        this.state.isAuthenticated = true;
        this.state.isLoading = false;
        
        this.persistAuth();
        this.notify();
        
        return this.state.user;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      this.state.isLoading = false;
      this.notify();
      throw error;
    }
  }

  // Sign up with email/password (stub only)
  async signUpWithEmail(email: string, password: string, name: string): Promise<User> {
    this.state.isLoading = true;
    this.notify();

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation for demo
      if (email && password.length >= 6 && name) {
        this.state.user = {
          ...DEMO_USER,
          id: `user_${Date.now()}`,
          email,
          name,
        };
        this.state.isAuthenticated = true;
        this.state.isLoading = false;
        
        this.persistAuth();
        this.notify();
        
        return this.state.user;
      } else {
        throw new Error('Invalid registration details');
      }
    } catch (error) {
      this.state.isLoading = false;
      this.notify();
      throw error;
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    this.state.isLoading = true;
    this.notify();

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.state.user = null;
      this.state.isAuthenticated = false;
      this.state.isLoading = false;
      
      localStorage.removeItem('auth_state');
      this.notify();
    } catch (error) {
      this.state.isLoading = false;
      this.notify();
      throw error;
    }
  }

  // Update user profile
  async updateProfile(updates: Partial<User>): Promise<User> {
    if (!this.state.user) {
      throw new Error('No authenticated user');
    }

    try {
      this.state.user = {
        ...this.state.user,
        ...updates,
      };
      
      this.persistAuth();
      this.notify();
      
      return this.state.user;
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  }

  // Update user preferences
  async updatePreferences(preferences: Partial<User['preferences']>): Promise<User> {
    if (!this.state.user) {
      throw new Error('No authenticated user');
    }

    try {
      this.state.user.preferences = {
        ...this.state.user.preferences,
        ...preferences,
      };
      
      this.persistAuth();
      this.notify();
      
      return this.state.user;
    } catch (error) {
      throw new Error('Failed to update preferences');
    }
  }

  // Add to favorites
  async addToFavorites(type: keyof User['favorites'], id: string): Promise<void> {
    if (!this.state.user) {
      throw new Error('No authenticated user');
    }

    if (!this.state.user.favorites[type].includes(id)) {
      this.state.user.favorites[type].push(id);
      this.persistAuth();
      this.notify();
    }
  }

  // Remove from favorites
  async removeFromFavorites(type: keyof User['favorites'], id: string): Promise<void> {
    if (!this.state.user) {
      throw new Error('No authenticated user');
    }

    this.state.user.favorites[type] = this.state.user.favorites[type].filter(
      item => item !== id
    );
    this.persistAuth();
    this.notify();
  }

  // Check if item is favorited
  isFavorited(type: keyof User['favorites'], id: string): boolean {
    return this.state.user?.favorites[type]?.includes(id) || false;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.state.user;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.state.isAuthenticated;
  }

  // Check if loading
  isLoading(): boolean {
    return this.state.isLoading;
  }
}

// Create singleton instance
const authService = new AuthService();

import React, { useEffect, useState } from 'react';

// React hook for auth state
export function useAuth() {
  const [state, setState] = useState(authService.getState());

  useEffect(() => {
    const unsubscribe = authService.subscribe(setState);
    return () => { unsubscribe(); };
  }, []);

  return {
    ...state,
    signInWithGoogle: () => authService.signInWithGoogle(),
    signInWithEmail: (email: string, password: string) => 
      authService.signInWithEmail(email, password),
    signUpWithEmail: (email: string, password: string, name: string) => 
      authService.signUpWithEmail(email, password, name),
    signOut: () => authService.signOut(),
    updateProfile: (updates: Partial<User>) => authService.updateProfile(updates),
    updatePreferences: (preferences: Partial<User['preferences']>) => 
      authService.updatePreferences(preferences),
    addToFavorites: (type: keyof User['favorites'], id: string) => 
      authService.addToFavorites(type, id),
    removeFromFavorites: (type: keyof User['favorites'], id: string) => 
      authService.removeFromFavorites(type, id),
    isFavorited: (type: keyof User['favorites'], id: string) => 
      authService.isFavorited(type, id),
  };
}

// Export auth service and types
export { authService, type User, type AuthState };
export default authService;

// Utility to check auth status
export const checkAuthStatus = (): boolean => authService.isAuthenticated();

// Initialize auth on module load
console.log(`Auth Service initialized (Stub mode: ${AUTH_STUB_ENABLED})`);
