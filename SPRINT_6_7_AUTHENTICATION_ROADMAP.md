# 🔐 SPRINT 6 & 7 AUTHENTICATION IMPLEMENTATION ROADMAP

**Status**: Ready to Start  
**Target**: 2 weeks (Sprint 6 → Sprint 7)  
**Priority**: 🔴 CRITICAL BLOCKER (all other sprints depend on this)  
**Story Points**: 10 SP total (5 + 5)

---

## 📋 SPRINT 6: User Registration (PB-01)

### Sprint Goal
Menyediakan fitur registrasi akun pelanggan yang aman, tervalidasi, dan terintegrasi penuh antara antarmuka dan layanan backend.

---

## 🎯 SPRINT 6 DETAILED BREAKDOWN

### Task 1: User Data Model & Database Schema (1 SP) — Backend
**PBI-024**: Perancangan struktur data pengguna dan aturan validasi registrasi

**What to Create**:
```typescript
// packages/shared/src/types.ts — Add to existing User interface

export interface User {
  id: string;              // UUID
  name: string;            // Required, min 3 chars
  email: string;           // Required, valid email format
  phone: string;           // Required, valid phone format
  password: string;        // Hashed, min 8 chars
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;     // Email verification status
  role: 'customer' | 'manager' | 'admin';  // User role
}

export interface RegistrationRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  userId?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
  error?: string;
}

export interface AuthContext {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegistrationRequest) => Promise<void>;
  logout: () => void;
}
```

**Database Schema** (using MongoDB/Mongoose):
```typescript
// Will be created in backend when setting up MongoDB

interface UserSchema {
  _id: ObjectId;
  name: string;
  email: string (unique, indexed);
  phone: string;
  password: string (hashed with bcrypt);
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  role: 'customer' | 'manager' | 'admin';
}

// Indices to create:
- email: unique, sparse
- createdAt: for queries
```

**Files to Create/Update**:
- ✅ `packages/shared/src/types.ts` — Add User interfaces
- 📝 `apps/api/src/models/User.ts` — User model (create)
- 📝 `apps/api/src/utils/validation.ts` — Validation helpers (create)

**Validation Rules**:
```typescript
{
  name: {
    required: true,
    minLength: 3,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/  // Letters, spaces, hyphens, apostrophes
  },
  email: {
    required: true,
    format: 'email',
    unique: true,
    lowercase: true
  },
  phone: {
    required: true,
    pattern: /^(\+62|0)[0-9]{9,12}$/,  // Indonesian phone numbers
    unique: true
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/  // At least 1 uppercase, 1 lowercase, 1 number, 1 special char
  }
}
```

**Acceptance Criteria**:
- [ ] User schema defined & documented
- [ ] All validation rules implemented
- [ ] Type definitions exported in shared package
- [ ] Schema supports custom fields for future expansion

---

### Task 2: Registration Endpoint Implementation (1 SP) — Backend
**PBI-025**: Implementasi layanan registrasi pengguna (endpoint + hashing)

**What to Create**:
```typescript
// apps/api/src/routes/auth.ts (create new file)

import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import { User, RegistrationRequest, RegistrationResponse } from '@shared/types';

const authRouter = express.Router();

// POST /api/auth/register
authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, confirmPassword }: RegistrationRequest = req.body;

    // 1. Validate input
    if (!name || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'Semua field harus diisi'
      });
    }

    // 2. Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'Password tidak cocok'
      });
    }

    // 3. Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        error: 'Password harus mengandung minimal: 1 huruf besar, 1 huruf kecil, 1 angka, 1 karakter spesial'
      });
    }

    // 4. Check email uniqueness
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Email sudah terdaftar'
      });
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Create new user
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      role: 'customer',
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // 7. Return success (exclude password)
    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      userId: newUser.id
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan saat registrasi'
    });
  }
});

export default authRouter;
```

**Endpoint Details**:
- **Method**: POST
- **URL**: `/api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+6281234567890",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!"
  }
  ```
- **Success Response** (201):
  ```json
  {
    "success": true,
    "message": "Registrasi berhasil",
    "userId": "user-uuid-here"
  }
  ```
- **Error Responses**:
  - 400: Validation error (missing fields, password mismatch)
  - 409: Email already exists
  - 500: Server error

**Dependencies**:
- `npm install bcrypt` — Password hashing
- `npm install uuid` — Generate unique IDs
- Mongoose (if using MongoDB)

**Acceptance Criteria**:
- [ ] Endpoint accepts all required fields
- [ ] Validates email format
- [ ] Validates password strength
- [ ] Checks email uniqueness
- [ ] Hashes password before storage
- [ ] Returns correct HTTP status codes
- [ ] Error messages are clear & helpful
- [ ] No passwords stored in logs

---

### Task 3: Registration Form UI (1 SP) — Frontend
**PBI-026**: Implementasi antarmuka registrasi

**File to Create**:
```
apps/web-user/src/app/[locale]/register/page.tsx
```

**Component Structure**:
```typescript
// apps/web-user/src/app/[locale]/register/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Stack,
  Group,
  Alert,
  Link as MantineLink,
} from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name) newErrors.name = 'Nama harus diisi';
    else if (formData.name.length < 3) newErrors.name = 'Nama minimal 3 karakter';

    // Email validation
    if (!formData.email) newErrors.email = 'Email harus diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    // Phone validation
    if (!formData.phone) newErrors.phone = 'Nomor telepon harus diisi';
    else if (!/^(\+62|0)[0-9]{9,12}$/.test(formData.phone)) {
      newErrors.phone = 'Format nomor telepon tidak valid';
    }

    // Password validation
    if (!formData.password) newErrors.password = 'Password harus diisi';
    else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
      newErrors.password = 'Password harus mengandung: huruf besar, huruf kecil, angka, dan karakter spesial';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registrasi gagal');
        return;
      }

      setSuccess(true);
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container size="sm" py={60}>
        <Paper p="lg" radius="md" withBorder>
          <Stack align="center" gap="md">
            <IconCheck size={48} color="green" />
            <Text fw={600} size="lg">Registrasi Berhasil!</Text>
            <Text c="dimmed">Silakan login dengan akun Anda</Text>
            <Button component={Link} href="/login" fullWidth>
              Ke Halaman Login
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="sm" py={60}>
      <Paper p="lg" radius="md" withBorder>
        <Text fw={600} size="xl" mb="md">Daftar Akun</Text>

        {error && (
          <Alert icon={<IconAlertCircle />} title="Error" color="red" mb="md">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Nama Lengkap"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              required
            />

            <TextInput
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              required
            />

            <TextInput
              label="Nomor Telepon"
              placeholder="+6281234567890"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={errors.phone}
              required
            />

            <PasswordInput
              label="Password"
              placeholder="Min. 8 karakter"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              required
            />

            <PasswordInput
              label="Konfirmasi Password"
              placeholder="Ulangi password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              required
            />

            <Button type="submit" fullWidth loading={loading}>
              Daftar
            </Button>

            <Group justify="center" gap={4}>
              <Text c="dimmed" size="sm">Sudah punya akun?</Text>
              <MantineLink component={Link} href="/login" size="sm">
                Login di sini
              </MantineLink>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
```

**Design Requirements**:
- Mantine UI components only
- Responsive (mobile, tablet, desktop)
- Clear error messages for validation
- Loading state while submitting
- Success message with redirect
- Link to login page

**Acceptance Criteria**:
- [ ] Form displays all required fields
- [ ] Client-side validation works
- [ ] Password strength indicator (optional)
- [ ] Error messages displayed correctly
- [ ] Success message shows after registration
- [ ] Can navigate to login page
- [ ] Mobile responsive
- [ ] Accessible (labels, ARIA attributes)

---

### Task 4: Register Page Integration with Backend (2 SP) — Frontend
**PBI-028**: Integrasi UI dengan layanan backend

**What to Do**:
1. Test registration form with actual API
2. Handle network errors gracefully
3. Add loading skeleton/spinner
4. Add success feedback with redirect
5. Store userId in localStorage (temporary until session added)
6. Add retry logic for failed requests

**Implementation Checklist**:
- [ ] Form submits to `/api/auth/register`
- [ ] Network errors handled properly
- [ ] Validation happens both client & server side
- [ ] Success redirects to login
- [ ] Failure shows error message
- [ ] Loading state prevents multiple submissions
- [ ] Test with invalid data
- [ ] Test with valid data
- [ ] Test with duplicate email
- [ ] Test network timeout

---

## 📋 SPRINT 7: User Login & Session (PB-02)

### Sprint Goal
Menyediakan mekanisme autentikasi pengguna yang aman dan andal sehingga pelanggan dapat melakukan login dan mengakses fitur penyewaan.

---

## 🎯 SPRINT 7 DETAILED BREAKDOWN

### Task 1: Authentication & Session Management Design (1 SP) — Backend
**PBI-028**: Perancangan mekanisme autentikasi dan manajemen sesi pengguna

**Architecture Decision**:
```
Option A: JWT Tokens (Recommended)
- Stateless authentication
- Good for microservices
- Token stored in httpOnly cookie
- Refresh token for expiration

Option B: Session-based
- Server-side state
- Simpler for traditional apps
- Requires session store (Redis)

→ RECOMMEND: JWT with httpOnly cookies
```

**Session Flow**:
```
1. User submits login credentials
2. Backend validates email & password
3. Backend generates JWT token (exp: 24 hours)
4. Backend generates refresh token (exp: 7 days)
5. Both tokens stored in httpOnly cookies
6. Frontend receives user data
7. Frontend can access protected routes
8. When token expires, use refresh token to get new one
9. On logout, clear both tokens
```

**JWT Payload**:
```json
{
  "sub": "user-id-here",
  "email": "user@example.com",
  "role": "customer",
  "iat": 1704067200,
  "exp": 1704153600
}
```

**Environment Variables Needed**:
```
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=24h
REFRESH_TOKEN_SECRET=refresh-secret-key
REFRESH_TOKEN_EXPIRE=7d
```

**Acceptance Criteria**:
- [ ] JWT strategy documented
- [ ] Token structure defined
- [ ] Cookie settings defined (httpOnly, secure, sameSite)
- [ ] Refresh token strategy designed
- [ ] Token expiration handled
- [ ] Secret key management plan

---

### Task 2: Login Endpoint Implementation (1 SP) — Backend
**PBI-029**: Implementasi layanan login (verifikasi password + pembuatan sesi)

**Create Endpoint**:
```typescript
// apps/api/src/routes/auth.ts — Add to existing file

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequest = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email dan password harus diisi'
      });
    }

    // 2. Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Email atau password salah'
      });
    }

    // 3. Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: 'Email atau password salah'
      });
    }

    // 4. Generate tokens
    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    const refreshToken = jwt.sign(
      { sub: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    );

    // 5. Set httpOnly cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // 6. Return user data
    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan saat login'
    });
  }
});
```

**Endpoint Details**:
- **Method**: POST
- **URL**: `/api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "SecurePass123!"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "success": true,
    "message": "Login berhasil",
    "user": {
      "id": "user-uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+6281234567890",
      "role": "customer"
    }
  }
  ```
- **Error Responses**:
  - 400: Missing email/password
  - 401: Invalid credentials
  - 500: Server error

**Acceptance Criteria**:
- [ ] Validates email & password format
- [ ] Queries user correctly
- [ ] Compares password securely
- [ ] Generates JWT token with correct payload
- [ ] Generates refresh token
- [ ] Sets httpOnly cookies
- [ ] Returns user data (no password)
- [ ] Handles errors gracefully

---

### Task 3: Login Form UI (1 SP) — Frontend
**PBI-030**: Implementasi antarmuka login serta proteksi rute

**File to Create**:
```
apps/web-user/src/app/[locale]/login/page.tsx
```

**Component Structure**:
```typescript
// apps/web-user/src/app/[locale]/login/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Stack,
  Group,
  Alert,
  Link as MantineLink,
  Checkbox,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important: send cookies
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login gagal');
        return;
      }

      // Store user data in context/state
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Redirect to dashboard
      router.push('/');

    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py={60}>
      <Paper p="lg" radius="md" withBorder>
        <Text fw={600} size="xl" mb="md">Login</Text>

        {error && (
          <Alert icon={<IconAlertCircle />} title="Error" color="red" mb="md">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={loading}
            />

            <PasswordInput
              label="Password"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={loading}
            />

            <Checkbox
              label="Ingat saya"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.currentTarget.checked)}
            />

            <Button type="submit" fullWidth loading={loading}>
              Login
            </Button>

            <Group justify="space-between" gap="xs">
              <MantineLink component={Link} href="/forgot-password" size="sm">
                Lupa password?
              </MantineLink>
              <Group gap={4}>
                <Text c="dimmed" size="sm">Belum punya akun?</Text>
                <MantineLink component={Link} href="/register" size="sm">
                  Daftar di sini
                </MantineLink>
              </Group>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
```

**Acceptance Criteria**:
- [ ] Form displays email & password fields
- [ ] Submit button works
- [ ] Error messages displayed
- [ ] Loading state while submitting
- [ ] Cookies received from server
- [ ] Redirects to home on success
- [ ] Link to registration page
- [ ] Link to forgot password (placeholder)
- [ ] Mobile responsive
- [ ] Accessible

---

### Task 4: Login Integration & Route Protection (2 SP) — Frontend
**PBI-031**: Integrasi UI dengan layanan backend

**What to Create**:

1. **Authentication Context** (apps/web-user/src/context/AuthContext.tsx):
```typescript
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@shared/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    setUser(data.user);
  };

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
  };

  const register = async (formData: any) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

2. **Protected Route Component** (apps/web-user/src/components/ProtectedRoute.tsx):
```typescript
'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { redirect } from 'next/navigation';
import { Center, Spinner } from '@mantine/core';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Center h={300}><Spinner /></Center>;
  }

  if (!user) {
    redirect('/login');
  }

  return <>{children}</>;
}
```

3. **Update Layout** (apps/web-user/src/app/layout.tsx):
```typescript
import { AuthProvider } from '@/context/AuthContext';
import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AuthProvider>
          <MantineProvider>
            <Notifications />
            {children}
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

4. **Protected Pages**:
Wrap pages that require authentication:
```typescript
// apps/web-user/src/app/[locale]/pesanan/page.tsx
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      {/* Orders page content */}
    </ProtectedRoute>
  );
}
```

**Additional Endpoints Needed**:
```typescript
// GET /api/auth/me — Get current user
// POST /api/auth/logout — Logout user
// POST /api/auth/refresh — Refresh token
```

**Acceptance Criteria**:
- [ ] Auth context provides user data
- [ ] useAuth hook works correctly
- [ ] Protected routes redirect to login if no auth
- [ ] Login/register pages accessible without auth
- [ ] Logout clears cookies
- [ ] Token refresh works automatically
- [ ] Page shows loading state while checking auth
- [ ] User data persists across page refreshes
- [ ] Navbar shows user name after login
- [ ] Navbar shows login/register links before login

---

## 🎯 IMPLEMENTATION CHECKLIST

### Sprint 6
- [ ] Create User type definitions
- [ ] Create User model/schema
- [ ] Implement POST /api/auth/register
- [ ] Test registration with Postman
- [ ] Create registration form component
- [ ] Test registration form UI
- [ ] Validate all form inputs
- [ ] Handle all error cases
- [ ] Success message & redirect
- [ ] Update documentation

### Sprint 7
- [ ] Design JWT authentication strategy
- [ ] Implement POST /api/auth/login
- [ ] Implement GET /api/auth/me
- [ ] Implement POST /api/auth/logout
- [ ] Implement POST /api/auth/refresh
- [ ] Test login with Postman
- [ ] Create login form component
- [ ] Create AuthContext for state management
- [ ] Create ProtectedRoute component
- [ ] Update layout with AuthProvider
- [ ] Protect user-specific pages
- [ ] Add logout functionality to Navbar
- [ ] Test full auth flow end-to-end
- [ ] Update documentation

---

## 🔗 DEPENDENCIES & BLOCKERS

### Required NPM Packages
```bash
# Backend
npm install bcrypt jsonwebtoken cookie-parser
npm install -D @types/bcrypt @types/jsonwebtoken

# Frontend
# (mostly included in Next.js already)
```

### Database Setup
- Need MongoDB connection string
- Need database models/schemas
- Need to create User collection with indices

### Environment Variables
```
# .env.local (Backend)
DATABASE_URL=mongodb://...
JWT_SECRET=your-super-secret-key
REFRESH_TOKEN_SECRET=another-secret-key
JWT_EXPIRE=24h
REFRESH_TOKEN_EXPIRE=7d
```

### Dependency Chain
```
Sprint 6 (Registration) → Sprint 7 (Login) → Sprint 8-14 (User features)
```

**Nothing else can start until Sprint 6 & 7 complete!**

---

## 📊 SUCCESS METRICS

After completion, should be able to:
- ✅ Register new user account
- ✅ Login with email & password
- ✅ Stay logged in across page refreshes
- ✅ Auto-logout after token expiration
- ✅ Access protected pages only when logged in
- ✅ See username in navigation bar
- ✅ Logout and clear all session data
- ✅ Get meaningful error messages for invalid login

---

**Status**: Ready to implement  
**Estimated Duration**: 2 weeks  
**Team Size**: 2 developers (1 FE, 1 BE)  
**Priority**: 🔴 CRITICAL BLOCKER  

Next steps: Assign Sprint 6 tasks to team and begin implementation!
