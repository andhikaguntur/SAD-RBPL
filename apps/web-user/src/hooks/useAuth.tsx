'use client';

import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

// Local User and ApiResponse types to avoid cross-package imports
type User = {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  role?: string;
  createdAt?: string;
};

type ApiResponse<T> = { success: boolean; data?: T; error?: string };

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<ApiResponse<User>>;
  register: (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<ApiResponse<User>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('token');
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // state initialized from localStorage via lazy initializers above

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (result.success) {
        localStorage.setItem('token', 'session-token'); // Simple token for now
        localStorage.setItem('user', JSON.stringify(result.data));
        setToken('session-token');
        setUser(result.data);
        setIsLoading(false);
        return { success: true, data: result.data };
      } else {
        throw new Error(result.message || 'Email atau password salah');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const result = await response.json();
      if (result.success) {
        localStorage.setItem('token', 'session-token');
        localStorage.setItem('user', JSON.stringify(result.data));
        setToken('session-token');
        setUser(result.data);
        setIsLoading(false);
        return { success: true, data: result.data };
      } else {
        throw new Error(result.message || 'Registrasi gagal');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    router.push('/id/login');
  };

  const value: AuthContextValue = {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
