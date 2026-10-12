import React, { createContext, useContext, useState } from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  isUnlocked: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  passwordHint: string;
}

const AUTH_STORAGE_KEY = 'chotu_auth_unlocked_v2';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Get password configured by Sonu in .env, with romantic fallbacks
  const envPassword = (import.meta.env.VITE_CHOTU_PASSWORD || 'chotu').toLowerCase().trim();

  const validPasswords = [
    envPassword,
    'chotu',
    'pookie',
    'sonu',
    '0705',
    'chotu0705',
    'pookie0705',
    'love',
  ];

  const login = (password: string): boolean => {
    const cleaned = password.toLowerCase().trim();
    if (validPasswords.includes(cleaned)) {
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (e) {
        console.warn('Storage error on login', e);
      }
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.warn('Storage error on logout', e);
    }
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isUnlocked: isAuthenticated,
        login,
        logout,
        passwordHint: `Your cutest nickname given by Sonu (Hint: starts with "${envPassword.charAt(0).toUpperCase()}") 💕`,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
