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
    return new Promise<ApiResponse<User>>((resolve) => {
      setTimeout(() => {
        // In a real app you would call backend
        if (email && password) {
          const fakeUser: User = {
            id: 'user-001',
            name: 'Indra Saputra',
            email,
            phone: '08123456789',
            role: 'user',
            createdAt: new Date().toISOString(),
          };
          const fakeToken = 'fake-jwt-token';
          localStorage.setItem('token', fakeToken);
          localStorage.setItem('user', JSON.stringify(fakeUser));
          setToken(fakeToken);
          setUser(fakeUser);
          setIsLoading(false);
          resolve({ success: true, data: fakeUser });
        } else {
          setIsLoading(false);
          setError('Email atau password salah');
          resolve({ success: false, error: 'Email atau password salah' });
        }
      }, 800);
    });
  };

  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string
  ) => {
    setIsLoading(true);
    setError(null);
    return new Promise<ApiResponse<User>>((resolve) => {
      setTimeout(() => {
        if (name && email && phone && password) {
          const newUser: User = {
            id: 'user-002',
            name,
            email,
            phone,
            role: 'user',
            createdAt: new Date().toISOString(),
          };
          // auto-login after register
          const fakeToken = 'fake-jwt-token';
          localStorage.setItem('token', fakeToken);
          localStorage.setItem('user', JSON.stringify(newUser));
          setToken(fakeToken);
          setUser(newUser);
          setIsLoading(false);
          resolve({ success: true, data: newUser });
        } else {
          setIsLoading(false);
          setError('Data registrasi tidak lengkap');
          resolve({ success: false, error: 'Data registrasi tidak lengkap' });
        }
      }, 800);
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    router.push('/id/dashboard');
  };

  const value: AuthContextValue = {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: true || !!user,
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
