# Asset Management System - Visual Structure Guide

## 🎯 Project Layout Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                   ASSET MANAGEMENT SYSTEM                       │
│                     (Full-Stack App)                            │
└─────────────────────────────────────────────────────────────────┘
              │
              └─────────────┬─────────────┐
                           │             │
                    ┌──────▼──────┐ ┌───▼──────┐
                    │  FRONTEND   │ │ BACKEND  │
                    │  (React)    │ │(Express) │
                    └─────────────┘ └──────────┘
                       Port 3000      Port 5000
```

---

## 📁 Complete File Tree

```
asset-management-system/
│
├── 📂 frontend/                          ← Next.js React Application
│   ├── 📂 app/                          (Next.js App Router)
│   │   ├── layout.tsx                   Root layout
│   │   ├── page.tsx                     Home → redirects to dashboard
│   │   │
│   │   ├── 📂 auth/
│   │   │   └── 📂 signin/
│   │   │       └── page.tsx             Google sign-in page
│   │   │
│   │   ├── 📂 api/                      Optional API routes
│   │   │   └── 📂 auth/
│   │   │       ├── login/route.ts
│   │   │       └── logout/route.ts
│   │   │
│   │   └── 📂 dashboard/                Main dashboard section
│   │       ├── layout.tsx               Dashboard wrapper
│   │       ├── page.tsx                 Dashboard home (charts)
│   │       ├── 📂 assets/
│   │       │   └── page.tsx             Assets CRUD
│   │       ├── 📂 employees/
│   │       │   └── page.tsx             Employees CRUD
│   │       ├── 📂 vendors/
│   │       │   └── page.tsx             Vendors CRUD
│   │       ├── 📂 categories/
│   │       │   └── page.tsx             Categories CRUD
│   │       ├── 📂 asset-assignment/
│   │       │   └── page.tsx             Assign assets
│   │       ├── 📂 return-assets/
│   │       │   └── page.tsx             Return tracking
│   │       ├── 📂 maintenance/
│   │       │   └── page.tsx             Maintenance tracking
│   │       ├── 📂 scan-qr/
│   │       │   └── page.tsx             QR/Barcode scanner
│   │       ├── 📂 reports/
│   │       │   └── page.tsx             Report generator
│   │       └── 📂 settings/
│   │           └── page.tsx             System settings
│   │
│   ├── 📂 components/
│   │   ├── 📂 dashboard/                Dashboard-specific UI
│   │   │   ├── sidebar-nav.tsx          Left navigation menu
│   │   │   ├── top-navbar.tsx           Top bar with search
│   │   │   ├── dashboard-layout.tsx     Main layout wrapper
│   │   │   ├── stats-cards.tsx          Statistics display
│   │   │   ├── assets-by-category.tsx   Category chart
│   │   │   ├── assets-by-status.tsx     Status chart
│   │   │   ├── recent-activity.tsx      Activity timeline
│   │   │   ├── recent-assets-table.tsx  Assets table
│   │   │   ├── barcode-scanner.tsx      QR code scanner
│   │   │   └── report-generator.tsx     Report builder
│   │   │
│   │   └── 📂 shared/                   Reusable components
│   │       ├── data-table.tsx           Searchable/sortable table
│   │       ├── form-modal.tsx           Add/Edit modal form
│   │       ├── delete-dialog.tsx        Delete confirmation
│   │       └── toast-provider.tsx       Notification system
│   │
│   ├── 📂 lib/                          Utilities & Helpers
│   │   ├── api-client.ts                Axios API wrapper
│   │   ├── toast.ts                     Toast notification helpers
│   │   ├── types.ts                     TypeScript definitions
│   │   └── mock-data.ts                 Sample data for testing
│   │
│   ├── 📂 hooks/                        Custom React Hooks
│   │   ├── useAssets.ts                 Assets data hook
│   │   ├── useEmployees.ts              Employees data hook
│   │   └── (other hooks)
│   │
│   ├── 📂 styles/
│   │   └── globals.css                  Global CSS + Tailwind config
│   │
│   ├── 📂 public/                       Static assets
│   │   ├── logo.svg
│   │   └── (images, fonts)
│   │
│   ├── package.json                     Frontend dependencies
│   ├── tsconfig.json                    TypeScript config
│   ├── next.config.mjs                  Next.js config
│   ├── postcss.config.mjs               PostCSS config
│   ├── components.json                  shadcn/ui config
│   ├── .env.example                     Environment template
│   └── .env.local                       (You create this)
│
│
├── 📂 backend/                          ← Express.js API Server
│   ├── 📂 server/                       Application code
│   │   ├── 📂 models/                   MongoDB Schemas
│   │   │   ├── User.ts                  User schema
│   │   │   ├── Asset.ts                 Asset schema
│   │   │   ├── Category.ts              Category schema
│   │   │   ├── Employee.ts              Employee schema
│   │   │   ├── Vendor.ts                Vendor schema
│   │   │   ├── Assignment.ts            Asset assignment schema
│   │   │   ├── Activity.ts              Activity log schema
│   │   │   └── Report.ts                Report schema
│   │   │
│   │   ├── 📂 routes/                   API Endpoints
│   │   │   ├── assets.ts                GET/POST/PUT/DELETE /assets
│   │   │   ├── employees.ts             GET/POST/PUT/DELETE /employees
│   │   │   ├── vendors.ts               GET/POST/PUT/DELETE /vendors
│   │   │   ├── categories.ts            GET/POST/PUT/DELETE /categories
│   │   │   ├── assignments.ts           Asset assignment endpoints
│   │   │   ├── activities.ts            Activity log endpoints
│   │   │   ├── reports.ts               Report generation endpoints
│   │   │   └── auth.ts                  Authentication endpoints
│   │   │
│   │   ├── 📂 middleware/               Express Middleware
│   │   │   ├── auth.ts                  JWT authentication
│   │   │   └── errorHandler.ts          Global error handling
│   │   │
│   │   └── 📂 utils/                    Helper Functions
│   │       └── activityLogger.ts        Activity logging utility
│   │
│   ├── 📂 dist/                         Compiled JavaScript (build output)
│   │   └── (generated by tsc)
│   │
│   ├── index.ts                         Express server entry point
│   ├── package.json                     Backend dependencies
│   ├── tsconfig.json                    TypeScript config for Node.js
│   ├── .env.example                     Environment template
│   └── .env.local                       (You create this)
│
│
├── 📄 package.json                      ← Root Monorepo Config
├── 📄 .env.example                      Environment variables reference
├── 📄 RESTRUCTURE_COMPLETE.md           ← What changed & why
├── 📄 SETUP_NEW_STRUCTURE.md            ← Quick start guide ⭐
├── 📄 README_STRUCTURE.md               ← Full documentation
├── 📄 FOLDER_STRUCTURE.md               ← Detailed breakdown
├── 📄 STRUCTURE_VISUAL_GUIDE.md         ← This file
├── 📄 ARCHITECTURE.md                   ← System architecture
├── 📄 FUNCTIONALITY_COMPLETE.md         ← Features documentation
└── 📄 README.md                         Original readme
```

---

## 🔄 Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                     (http://localhost:3000)                      │
└──────────────────────────────────────────────────────────────────┘
                              │
                              │ (React Components)
                              ▼
        ┌─────────────────────────────────────────────┐
        │          FRONTEND (Next.js App)             │
        │   ┌─────────────────────────────────────┐   │
        │   │    React Components & Pages         │   │
        │   │  ├─ Dashboard                       │   │
        │   │  ├─ Assets, Employees, Vendors      │   │
        │   │  ├─ QR Scanner, Reports             │   │
        │   │  └─ Forms with Validation           │   │
        │   └─────────────────────────────────────┘   │
        │                    │                        │
        │   ┌────────────────▼────────────────────┐   │
        │   │    API Client                       │   │
        │   │ (frontend/lib/api-client.ts)        │   │
        │   └────────────────────────────────────┘   │
        │                    │                        │
        └────────────────────┼────────────────────────┘
                             │ HTTP Requests/Responses
                             │ (Axios)
                             ▼
        ┌─────────────────────────────────────────────┐
        │       BACKEND API (Express.js Server)       │
        │     (http://localhost:5000/api)             │
        │   ┌─────────────────────────────────────┐   │
        │   │    Express Middleware               │   │
        │   │  ├─ CORS                            │   │
        │   │  ├─ JWT Authentication              │   │
        │   │  └─ Error Handling                  │   │
        │   └─────────────────────────────────────┘   │
        │                    │                        │
        │   ┌────────────────▼────────────────────┐   │
        │   │    API Routes (CRUD Operations)     │   │
        │   │  ├─ GET /assets                     │   │
        │   │  ├─ POST /assets                    │   │
        │   │  ├─ PUT /assets/:id                 │   │
        │   │  ├─ DELETE /assets/:id              │   │
        │   │  └─ ... (40+ endpoints)             │   │
        │   └────────────────────────────────────┘   │
        │                    │                        │
        │   ┌────────────────▼────────────────────┐   │
        │   │    MongoDB Interface                │   │
        │   │ (Mongoose Models & Queries)         │   │
        │   └────────────────────────────────────┘   │
        │                    │                        │
        └────────────────────┼────────────────────────┘
                             │ Database Queries
                             ▼
        ┌─────────────────────────────────────────────┐
        │         MONGODB DATABASE                    │
        │   ├─ Users Collection                       │
        │   ├─ Assets Collection                      │
        │   ├─ Employees Collection                   │
        │   ├─ Vendors Collection                     │
        │   ├─ Categories Collection                  │
        │   ├─ Assignments Collection                 │
        │   ├─ Activities Collection                  │
        │   └─ Reports Collection                     │
        └─────────────────────────────────────────────┘
```

---

## 🎯 Quick Reference

### Frontend Location
- **UI Components:** `frontend/components/`
- **Pages:** `frontend/app/dashboard/`
- **API Calls:** `frontend/lib/api-client.ts`
- **Styles:** `frontend/styles/globals.css`
- **Config:** `frontend/package.json`

### Backend Location
- **API Routes:** `backend/server/routes/`
- **Database Models:** `backend/server/models/`
- **Middleware:** `backend/server/middleware/`
- **Server Entry:** `backend/index.ts`
- **Config:** `backend/package.json`

### Root Files
- **Monorepo Config:** `package.json`
- **Documentation:** `*.md` files
- **Environment Setup:** `.env.example` files

---

## 🚀 Running Different Parts

```bash
# From root directory

# Run BOTH frontend + backend
npm run dev

# Run ONLY frontend
npm run dev:frontend
cd frontend && npm run dev

# Run ONLY backend
npm run dev:backend
cd backend && npm run dev

# Build BOTH
npm run build

# Build ONLY frontend
npm run build:frontend

# Build ONLY backend
npm run build:backend
```

---

## 📋 What Each Folder Contains

### `/frontend` - User Interface
**Purpose:** Display data to users, collect input, call APIs

**Key Files:**
- Pages with forms and tables
- React components for UI
- API client to call backend
- Stylesheets and layouts

**Technology:** Next.js, React, Tailwind CSS, shadcn/ui

**Runs on:** Port 3000

### `/backend` - API Server
**Purpose:** Process data, manage database, provide APIs

**Key Files:**
- Route handlers for API endpoints
- MongoDB schemas and models
- Authentication and middleware
- Database operations

**Technology:** Express.js, MongoDB, Mongoose, JWT

**Runs on:** Port 5000

---

## 🔍 Finding Things

| What you want | Where to find it |
|---|---|
| Change a page layout | `frontend/app/dashboard/[page]/page.tsx` |
| Add a new dashboard page | Create `frontend/app/dashboard/newpage/page.tsx` |
| Change a table display | `frontend/components/shared/data-table.tsx` |
| Modify form validation | `frontend/components/shared/form-modal.tsx` |
| Edit API endpoint | `backend/server/routes/[resource].ts` |
| Change database structure | `backend/server/models/[Model].ts` |
| Add authentication | `backend/server/middleware/auth.ts` |
| Call an API from UI | `frontend/lib/api-client.ts` |
| Fix an error response | `backend/server/middleware/errorHandler.ts` |
| Log user activities | `backend/server/utils/activityLogger.ts` |

---

## 🎓 Learning the Structure

### For Frontend Developers
1. Start with `frontend/app/dashboard/`
2. Look at `frontend/components/` for UI parts
3. Check `frontend/lib/api-client.ts` for API calls
4. Review `frontend/lib/mock-data.ts` for data structure

### For Backend Developers
1. Start with `backend/server/routes/`
2. Look at `backend/server/models/` for database structure
3. Check `backend/server/middleware/` for authentication
4. Review API documentation to understand endpoints

### For Full-Stack Understanding
1. Pick a feature (e.g., "add asset")
2. Trace frontend page → API call → backend route → database
3. Follow the data back: database → route response → frontend display

---

## 📦 Dependencies

### Frontend Only
```json
{
  "next": "^16.2.6",
  "react": "^19",
  "recharts": "2.15.0",
  "axios": "^1.17.0",
  "tailwindcss": "^4.2.0"
}
```

### Backend Only
```json
{
  "express": "^5.2.1",
  "mongoose": "^9.6.3",
  "jsonwebtoken": "^9.0.3",
  "cors": "^2.8.6"
}
```

---

## 🎯 Common Tasks

### Add a new menu item
1. Create page: `frontend/app/dashboard/newfeature/page.tsx`
2. Update sidebar: `frontend/components/dashboard/sidebar-nav.tsx`
3. (Backend) Create routes: `backend/server/routes/newfeature.ts`

### Connect UI to API
1. Add API call: `frontend/lib/api-client.ts`
2. Use in component: Import and call the function
3. Backend route should exist: `backend/server/routes/[resource].ts`

### Deploy the app
**Frontend:** `frontend/` → Deploy to Vercel
**Backend:** `backend/` → Deploy to Railway/Heroku

---

## ✅ Verification Checklist

- [ ] Folder structure clear and organized
- [ ] Frontend code in `/frontend`
- [ ] Backend code in `/backend`
- [ ] Environment files set up (`frontend/.env.local`, `backend/.env.local`)
- [ ] Dependencies installed (`npm install`)
- [ ] Both servers start correctly (`npm run dev`)
- [ ] Frontend runs on port 3000
- [ ] Backend runs on port 5000
- [ ] Can navigate all dashboard pages
- [ ] Forms work and show validation

---

**Now you understand the complete structure!** 🎊

Next step: Read `SETUP_NEW_STRUCTURE.md` to get started.
