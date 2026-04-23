SAD-RBPL Codebase Guide for AI Agents

Project Overview

sad-rbpl is a full-stack monorepo for SAD-OC (Sumber Anugerah Diesel - Operational Command), managing diesel machine bookings, outbound logistics, and financial workflows.

Built with:

Frontend: Next.js 16 + React 19 + Mantine UI (3 separate apps: web-admin, web-manager, web-user)

Backend: Express.js 5 + TypeScript + MongoDB (via Mongoose)

Package Manager: pnpm with workspace structure

Build Tool: Turborepo for monorepo orchestration

i18n: next-intl with Indonesian (id) and English (en) locales

1. Monorepo Structure & Domain Driven Design

apps/
  api/                    # Express backend (REST API, PDF Generators, Billing Engine)
  web-admin/              # Internal App: Admin Operations 
  web-manager/            # Internal App: Manager & Logistics Operations 
  web-user/               # External App: Customer Portal 
packages/
  contracts/              # Contracts and Domain Models (@contracts alias)


Key Pattern: All database schemas, API request/response interfaces, and shared business logic MUST be defined in packages/contracts. Apps import these via the @contracts/ alias. Do not use a generic "shared" folder.

2. Feature Mapping & Sprint Scope

The system is strictly divided into 3 apps based on a 14-Sprint Product Backlog. When implementing a feature, constrain your code to the specific requirements of that app.

A. web-admin (Admin Operations)

Dense data UI, data tables, and verification workflows.

Sprint 1 (PB-04): Rental Price Validation & Quotation Generation.

Sprint 2 (PB-11): Payment Verification (Approve/Reject customer uploads).

Sprint 3 (PB-13): Asset Status Management (Updating machine availability).

B. web-manager (Logistics & Reporting)

Analytics, scheduling, and logistics control.

Sprint 4 (PB-12): Dispatch Scheduling (Assigning drivers, generating Surat Jalan).

Sprint 5 (PB-14): Final Reporting & Fleet Analytics (Recharts integration).

C. web-user (Customer Portal)

CRITICAL UI RULE: This is NOT a dashboard. It is a B2B/B2C Self-Service Portal. It must be user-oriented, guiding, and clean. Use a minimal, icon-only side navigation (e.g., Home, New Plan/Request, Billing) to prevent UI clutter. Focus on clear conversion actions (CTAs) rather than dense data widgets.

Sprint 6-7 (PB-01, PB-02): Customer Registration & JWT Authentication.

Sprint 8 (PB-03): Rental Request Stepper Form (Select machine, duration, location).

Sprint 9-10 (PB-05, PB-06): Quotation Hub (Review pricing, Accept/Reject contract).

Sprint 13-14 (PB-09, PB-10): Billing Center (View auto-generated Invoices, Drag & Drop Payment Upload).

(Note: Sprint 11 Auto PO and Sprint 12 Auto Invoice are purely api backend services triggered by user actions).

3. Critical Business Rules (Invariants)

The AI must strictly enforce these Non-Functional Requirements (RNFs) in both the frontend validation and backend logic:

Safety (RNF-007): Machines with a "Rusak" (Maintenance/Broken) status CANNOT be processed for rent or updated to "Ready".

Audit Trail (RNF-008): Every PATCH or POST request in web-admin and web-manager MUST log the action (actor, timestamp, old state, new state) to an audit log collection.

Storage (RNF-006): Payment proof uploads (web-user Sprint 14) must be compressed before database/cloud storage insertion.

4. Architecture & Data Flows

Separation of Concerns (Frontend)

Never write fetch or complex business logic directly inside the UI component (page.tsx). Follow this exact pattern:

Frontend (Client Components): Use 'use client' with React hooks for presentation.

Custom Hooks: Extract complex logic to hooks/use[Feature].ts. Hooks manage data fetching (GET), form submission (POST), and loading/error states.

Mocking to Production: Currently, use setTimeout to mock API latency in hooks. When instructed to integrate, replace setTimeout with axios or fetch calls to /api/*.

Locale Routing (i18n)

Config: src/i18n/routing.ts defines supported locales (en, id) with Indonesian as default.

Middleware: src/middleware.ts intercepts requests to add locale prefix.

Hook: useT(namespace) wrapper around next-intl's useTranslations().

5. Development Workflows

# From root directory
pnpm install                    # Install all workspace dependencies
pnpm run dev                    # Start all apps (frontend + backend)
pnpm run dev:admin              # Start only admin frontend (localhost:3000)
pnpm run dev:user               # Start only user frontend (localhost:3002)
pnpm run build                  # Turborepo build all packages
pnpm run typecheck              # Type check all packages


Node: 20.19.1+ (enforced via volta in package.json)

pnpm: 10.7.1+ (workspace-level lockfile; always install from root)

6. Integration Points & External Dependencies

UI Library (Mantine): Primary component library. Prefer Mantine props (color="blue", fw={900}) over CSS classes.

Icons: @tabler/icons-react. Specifically for web-user, use these icons heavily for the clean side-navigation.

Charting: Recharts (ResponsiveContainer, AreaChart) exclusively for web-manager and web-admin.

Backend Database: MongoDB via Mongoose. Schemas must map directly to the domain models in packages/contracts.

7. Notes for AI Agents

Language: Indonesian UI/comments are mandatory for the business domain (e.g., "Surat Jalan", "Bukti Bayar", "Genset 50kVA").

Next.js Dynamic Routes: [locale] prefix is required on all routes; understand locale stripping in middleware.

Workspace Dependency: Always run pnpm install from root; never install per-app.

UI Consistency: Do not mix web-user styles with internal admin styles. Admin gets dense tables; Users get clean cards, steppers, and prominent action buttons.