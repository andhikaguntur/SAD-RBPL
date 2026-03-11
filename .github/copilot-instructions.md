# SAD RBPL Codebase Guide for AI Agents

## Project Overview
**sad-rbpl** is a full-stack monorepo for managing diesel machine bookings and project allocation across three user roles (user/manager/admin). Built with:
- **Frontend**: Next.js 16 + React 19 + Mantine UI (3 separate apps: web-admin, web-manager, web-user)
- **Backend**: Express.js 5 + TypeScript + MongoDB (via Mongoose)
- **Package Manager**: pnpm with workspace structure
- **Build Tool**: Turborepo for monorepo orchestration
- **i18n**: next-intl with Indonesian (id) and English (en) locales

## Architecture & Data Flows

### Monorepo Structure
```
apps/
  api/                    # Express backend (REST API on port 4000)
  web-admin/              # Admin dashboard
  web-manager/            # Manager/operator dashboard
  web-user/               # End-user rental request portal
packages/
  shared/                 # Shared types and utilities (@shared alias)
```

**Key Pattern**: All three frontend apps are nearly identical templates with locale routing but different UIs. The backend serves all three.

### Data Flow Pattern
1. **Frontend** (Client Components): Use `'use client'` with React hooks for state management
2. **Custom Hooks**: Extract complex logic (see `useAdminDashboard` in web-admin/src/app/[locale]/page.tsx as pattern)
   - Hooks manage: data fetching (GET), form submission (POST), loading/error states
   - Currently use `setTimeout` for mock API calls; replace with actual fetch/axios to `/api/*`
3. **Backend**: Express routes handle authentication, business logic, and MongoDB persistence
4. **Shared Types**: All type definitions live in `packages/shared/src/types.ts` (e.g., `User` interface)

### Locale Routing (i18n)
- **Config**: `src/i18n/routing.ts` defines supported locales (`en`, `id`) with Indonesian as default
- **Middleware**: `src/middleware.ts` intercepts requests to add locale prefix
- **Hook**: `useT(namespace)` wrapper around `next-intl`'s `useTranslations()` for namespace-based translations
- **Message Files**: JSON translation files in `src/messages/` per locale

## Critical Development Workflows

### Running the Project
```bash
# From root directory
pnpm install                    # Install all workspace dependencies
pnpm run dev                    # Start all apps (frontend + backend)
pnpm run dev:admin             # Start only admin frontend (localhost:3000)
pnpm run dev:backend           # Start only backend (localhost:4000)
pnpm run build                 # Turborepo build all packages
pnpm run typecheck             # Type check all packages
pnpm run lint                  # Lint all packages
pnpm run format                # Prettier format all TS/TSX/MD
```

### Node/Package Versions
- **Node**: 20.19.1+ (enforced via volta in package.json)
- **pnpm**: 10.7.1+ (workspace-level lockfile; always install from root)

### Type Safety & Monorepo Dependencies
- Each app has its own `tsconfig.json` extending root config
- Root `tsconfig.json` defines `@shared` path alias pointing to `packages/shared/src`
- Use `import { Type } from '@shared/types'` for cross-package sharing
- Backend and frontend apps both consume `@shared`

## Project-Specific Conventions & Patterns

### Component Structure (Frontend)
- **Mantine UI**: Primary component library (AppShell, Paper, Button, Select, etc.)
- **Inline Mini-Components**: Small display components defined at file bottom (e.g., `KPICard`, `TransactionRow`)
- **Client Components**: Mark files with `'use client'` at top (all pages currently client-side)
- **Layout Pattern**: `MainLayout` wraps pages with AppShell (sidebar nav, header)

### Custom Hook Pattern for Complex Pages
Example from `web-admin/src/app/[locale]/page.tsx`:
```typescript
// Define types at top of file
export type DashboardData = { /* ... */ };

// Custom hook encapsulates all logic
export function useAdminDashboard() {
  const [period, setPeriod] = useState('7d');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  // useEffect for fetch, async functions for submit
  return { period, setPeriod, dashboardData, isSubmitting, submitPermintaan };
}

// Component uses hook
export default function Page() {
  const { period, dashboardData } = useAdminDashboard();
  // Render...
}
```

### Mock API Pattern (Temporary)
Currently uses `setTimeout` to simulate network latency:
```typescript
// TODO comments mark mock data; replace with real axios/fetch
setTimeout(() => {
  setDashboardData({ /* mock data */ });
  setIsLoading(false);
}, 800);
```
**Replace with**:
```typescript
axios.get(`/api/dashboard?period=${period}`).then(res => {
  setDashboardData(res.data);
  setIsLoading(false);
});
```

### Backend Route Pattern
Express routes use simple REST structure:
```typescript
// apps/api/src/index.ts
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", user: /* shared type */ });
});
```

## Integration Points & External Dependencies

### UI Library: Mantine
- **Components Used**: AppShell, Paper, Button, Select, TextInput, NumberInput, Textarea, Badge, Table, Progress, Drawer, SimpleGrid, etc.
- **Hooks**: `useDisclosure` for modal/drawer state
- **Icons**: @tabler/icons-react (e.g., IconCash, IconPlus, IconSend)
- **Styling**: CSS-in-JS via Mantine theming; also Tailwind CSS configured

### Charting: Recharts
- Used for revenue trends (AreaChart in admin dashboard)
- Responsive container pattern for data visualization

### Backend Database (MongoDB via Mongoose)
- Currently stubbed in `index.ts`; actual models/schemas needed
- Shared types should reflect MongoDB schema structure

### CORS
- Backend includes CORS middleware to allow frontend requests
- Configured in `apps/api/src/index.ts`

## Key Files to Reference

### Types & Contracts
- `packages/shared/src/types.ts` - Central type definitions (extend here for shared models)
- `apps/web-admin/src/app/[locale]/page.tsx` (lines 1-40) - Type definition pattern

### i18n & Routing
- `src/i18n/routing.ts` - Supported locales and default
- `src/middleware.ts` - Locale detection and routing
- `src/hooks/useT.ts` - Translation hook pattern
- `src/messages/{en,id}.json` - Translation files

### API Integration
- `apps/api/src/index.ts` - Backend entry point and route examples
- Current mock: `apps/web-admin/src/app/[locale]/page.tsx` (lines 45-75) - See `useEffect` with TODO

### UI Patterns
- `apps/web-admin/src/components/layout/MainLayout.tsx` - Layout wrapper pattern
- `apps/web-admin/src/app/[locale]/page.tsx` (lines 320-387) - Mini-component pattern (KPICard, FleetProgress, TransactionRow)

## Common Tasks

### Adding a New Frontend Feature
1. Create page in `apps/web-[role]/src/app/[locale]/[feature]/page.tsx`
2. Extract logic into custom hook in same file or `hooks/` folder
3. Use Mantine components for UI
4. Import shared types from `@shared/types`
5. Add translations to `messages/{en,id}.json`

### Adding an API Endpoint
1. Add route to `apps/api/src/index.ts` (or create separate router file)
2. Export response type to `packages/shared/src/types.ts`
3. Update frontend to call with fetch/axios instead of setTimeout

### Sharing Code Across Apps
1. Add to `packages/shared/src/` (types or utility functions)
2. Update `packages/shared/src/types.ts` or create new file (e.g., `utils/`)
3. Import with `@shared` alias in any app

## Testing & Type Checking
- `pnpm run typecheck` validates all TypeScript before build
- No unit tests configured yet; consider Jest + React Testing Library for frontend
- Backend needs integration tests against MongoDB

## Notes for AI Agents
- **Language**: Indonesian UI/comments are common (see dashboard strings like "Transaksi Terbaru", "Validasi Armada")
- **Status**: Early development phase; many TODO comments mark incomplete integrations
- **Mantine Styling**: Prefer Mantine props (`color="blue"`, `fw={900}`) over CSS classes for consistency
- **Next.js Dynamic Routes**: `[locale]` prefix is required on all routes; understand locale stripping in middleware
- **Workspace Dependency**: Always run `pnpm install` from root; never install per-app
