import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  email: string;
  name?: string;
} | null;

type AuthContextType = {
  user: User;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}