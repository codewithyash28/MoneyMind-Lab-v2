'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface User {
  userId: number;
  country: string;
  ageRange: string;
  goal: string;
  xp: number;
  currencySymbol: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  updateProfile: (profile: Partial<User>) => void;
  getCurrencySymbol: (country: string) => string;
  refetch: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const countryCurrencyMap: Record<string, string> = {
  'USA': '$',
  'UK': '£',
  'India': '₹',
  'Germany': '€',
  'France': '€',
  'Japan': '¥',
  'Canada': '$',
  'Australia': '$',
  'Nigeria': '₦',
  'Kenya': 'KSh',
  'South Africa': 'R',
  'Brazil': 'R$',
  'Mexico': '$',
  'Default': '$'
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getCurrencySymbol = (country: string) => {
    return countryCurrencyMap[country] || countryCurrencyMap['Default'];
  };

  const refetch = useCallback(async () => {
    try {
      const response = await fetch('/api/onboarding');
      if (response.ok) {
        const data = await response.json();
        setUser({
          userId: data.user_id,
          country: data.country,
          ageRange: data.age_range,
          goal: data.goal,
          xp: data.xp,
          currencySymbol: getCurrencySymbol(data.country)
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const updateProfile = (profile: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...profile, currencySymbol: profile.country ? getCurrencySymbol(profile.country) : user.currencySymbol });
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, setUser, updateProfile, getCurrencySymbol, refetch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
