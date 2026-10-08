import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AuthContextType } from '../types/auth';

const STORAGE_KEY = 'fermor_auth_session';

export const DEMO_USER: UserProfile = {
  name: 'Rohan K.',
  role: 'Engineer',
  email: 'rohan.k@fermor.finance',
  avatar: 'RK',
  netWorthINR: 1248000,
  healthScore: 86,
  healthStatus: 'Strong',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as UserProfile;
      }
    } catch {
      // Fallback
    }
    return null;
  });

  const isAuthenticated = !!user;

  const loginDemoUser = () => {
    setUser(DEMO_USER);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_USER));
    } catch (e) {
      console.error('Failed to write auth to localStorage', e);
    }
  };

  const loginWithEmail = (email: string) => {
    const customUser: UserProfile = {
      ...DEMO_USER,
      email,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
    };
    setUser(customUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customUser));
    } catch (e) {
      console.error('Failed to write auth to localStorage', e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear auth from localStorage', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loginDemoUser,
        loginWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
