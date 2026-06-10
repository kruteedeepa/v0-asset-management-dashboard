# Asset Management System - Complete Folder Structure

## Root Directory

```
asset-management-system/
├── frontend/                          # Next.js React Application ⚛️
├── backend/                           # Express.js API Server 🔧
├── package.json                       # Root package (monorepo config)
├── README_STRUCTURE.md                # Project overview
├── SETUP_NEW_STRUCTURE.md             # Quick setup guide ⭐ START HERE
├── FOLDER_STRUCTURE.md                # This file
├── .env.example                       # Environment variables reference
├── ARCHITECTURE.md                    # System design
├── FUNCTIONALITY_COMPLETE.md          # Features list
└── [other docs...]
```

---

## Frontend Structure (`/frontend`)

```
frontend/
├── 📦 package.json                    # Frontend dependencies
├── tsconfig.json                      # TypeScript config
├── next.config.mjs                    # Next.js config
├── postcss.config.mjs                 # PostCSS config
├── components.json                    # shadcn/ui config
├── .env.example                       # Frontend env vars template
│
├── app/                               # Next.js App Router
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Home page
│   │
│   ├── auth/
│   │   └── signin/
│   │       └── page.tsx               # Google sign-in page
│   │
│   ├── api/                           # Backend API routes (if needed)
│   │   └── auth/
│   │       ├── login/route.ts         # Login endpoint
│   │       └── logout/route.ts        # Logout endpoint
│   │
│   └── dashboard/                     # Main dashboard routes
│       ├── layout.tsx                 # Dashboard layout
│       ├── page.tsx                   # Dashboard home
│       │
│       ├── assets/
│       │   └── page.tsx               # Assets CRUD page
│       ├── employees/
│       │   └── page.tsx               # Employees CRUD page
│       ├── vendors/
│       │   └── page.tsx               # Vendors CRUD page
│       ├── categories/
│       │   └── page.tsx               # Categories CRUD page
│       ├── asset-assignment/
│       │   └── page.tsx               # Asset assignment page
│       ├── return-assets/
│       │   └── page.tsx               # Return assets page
│       ├── maintenance/
│       │   └── page.tsx               # Maintenance page
│       ├── scan-qr/
│       │   └── page.tsx               # QR/Barcode scanner page
│       ├── reports/
│       │   └── page.tsx               # Report generation page
│       └── settings/
│           └── page.tsx               # Settings page
│
├── components/                        # React Components
│   │
│   ├── dashboard/                     # Dashboard-specific components
│   │   ├── sidebar-nav.tsx            # Left navigation sidebar
│   │   ├── top-navbar.tsx             # Top navigation bar
│   │   ├── dashboard-layout.tsx       # Main layout wrapper
│   │   ├── stats-cards.tsx            # Statistics cards
│   │   ├── assets-by-category.tsx     # Category chart
│   │   ├── assets-by-status.tsx       # Status chart
│   │   ├── recent-activity.tsx        # Activity timeline
│   │   ├── recent-assets-table.tsx    # Assets data table
│   │   ├── barcode-scanner.tsx        # QR/Barcode scanner
│   │   └── report-generator.tsx       # Report builder
│   │
│   └── shared/                        # Reusable components
│       ├── data-table.tsx             # Searchable data table
│       ├── form-modal.tsx             # Add/Edit form modal
│       ├── delete-dialog.tsx          # Delete confirmation
│       ├── toast-provider.tsx         # Notification system
│       └── [other shared components]
│
├── lib/                               # Utilities & Helpers
│   ├── api-client.ts                  # Axios API wrapper
│   ├── toast.ts                       # Toast notification helpers
│   ├── types.ts                       # TypeScript type definitions
│   ├── mock-data.ts                   # Sample data for testing
│   └── [utility functions]
│
├── hooks/                             # Custom React Hooks
│   ├── useAssets.ts                   # Assets data hook
│   ├── useEmployees.ts                # Employees data hook
│   └── [other custom hooks]
│
├── styles/                            # Global Styles
│   └── globals.css                    # Global CSS & Tailwind config
│
└── public/                            # Static Assets
    ├── logo.svg                       # Logo
    └── [images, fonts, etc]
```

---

## Backend Structure (`/backend`)

```
backend/
├── 📦 package.json                    # Backend dependencies (Express, MongoDB, etc)
├── tsconfig.json                      # TypeScript config
├── .env.example                       # Backend env vars template
├── index.ts                           # Express server entry point
│
├── server/                            # Application logic
│   │
│   ├── models/                        # MongoDB Schemas (Mongoose)
│   │   ├── User.ts                    # User schema
│   │   ├── Asset.ts                   # Asset schema
│   │   ├── Category.ts                # Category schema
│   │   ├── Employee.ts                # Employee schema
│   │   ├── Vendor.ts                  # Vendor schema
│   │   ├── Assignment.ts              # Asset assignment schema
│   │   ├── Activity.ts                # Activity log schema
│   │   └── Report.ts                  # Report schema
│   │
│   ├── routes/                        # API Endpoints
│   │   ├── assets.ts                  # GET/POST/PUT/DELETE /assets
│   │   ├── employees.ts               # GET/POST/PUT/DELETE /employees
│   │   ├── vendors.ts                 # GET/POST/PUT/DELETE /vendors
│   │   ├── categories.ts              # GET/POST/PUT/DELETE /categories
│   │   ├── assignments.ts             # Asset assignment endpoints
│   │   ├── activities.ts              # Activity log endpoints
│   │   ├── reports.ts                 # Report generation endpoints
│   │   └── auth.ts                    # Authentication endpoints
│   │
│   ├── middleware/                    # Express Middleware
│   │   ├── auth.ts                    # JWT authentication
│   │   └── errorHandler.ts            # Global error handling
│   │
│   └── utils/                         # Helper Functions
│       └── activityLogger.ts          # Log user activities
│
└── dist/                              # Compiled JavaScript (generated by build)
```

---

## Key Files & Their Purpose

### Frontend Key Files

| File | Purpose |
|------|---------|
| `frontend/app/page.tsx` | Home page (redirects to dashboard) |
| `frontend/app/dashboard/page.tsx` | Main dashboard view |
| `frontend/app/dashboard/assets/page.tsx` | Assets management page |
| `frontend/lib/api-client.ts` | All API calls through here |
| `frontend/components/dashboard/sidebar-nav.tsx` | Left menu navigation |
| `frontend/lib/mock-data.ts` | Sample data for testing |

### Backend Key Files

| File | Purpose |
|------|---------|
| `backend/index.ts` | Express server setup & start |
| `backend/server/models/Asset.ts` | Database schema for assets |
| `backend/server/routes/assets.ts` | Asset API endpoints (CRUD) |
| `backend/server/middleware/auth.ts` | JWT verification |
| `backend/.env.local` | MongoDB URI, secrets, etc |

---

## Quick Navigation

### To Make Changes:

**Want to change the UI?** → Edit files in `/frontend/components/` and `/frontend/app/`

**Want to change an API?** → Edit files in `/backend/server/routes/`

**Want to add a new page?** → Create `/frontend/app/dashboard/[pagename]/page.tsx`

**Want to add a new API endpoint?** → Create or edit `/backend/server/routes/[resource].ts`

**Want to change the database?** → Edit `/backend/server/models/`

---

## File Count Summary

```
Frontend Files:        ~50+ files
  - Components:        20+
  - Pages:             12
  - Utilities:         10+

Backend Files:         ~20+ files
  - Models:            8
  - Routes:            8
  - Middleware:        2
  - Utils:             2+

Total:                 ~70+ files organized clearly
```

---

## Environment Variables Locations

**Frontend env:** `frontend/.env.local`
**Backend env:** `backend/.env.local`
**Reference:** `.env.example` files in each folder

---

## Running Commands from Root

```bash
npm run dev              # Start frontend + backend
npm run dev:frontend    # Start only frontend
npm run dev:backend     # Start only backend

npm run build           # Build both
npm run build:frontend  # Build only frontend
npm run build:backend   # Build only backend
```

---

## Frontend Pages Available

All located in `frontend/app/dashboard/`:

1. **Dashboard** - `/dashboard` - Overview with charts
2. **Assets** - `/dashboard/assets` - Manage assets
3. **Employees** - `/dashboard/employees` - Manage employees
4. **Vendors** - `/dashboard/vendors` - Manage vendors
5. **Categories** - `/dashboard/categories` - Manage categories
6. **Asset Assignment** - `/dashboard/asset-assignment` - Assign assets
7. **Return Assets** - `/dashboard/return-assets` - Return assets
8. **Maintenance** - `/dashboard/maintenance` - Maintenance tracking
9. **QR Scanner** - `/dashboard/scan-qr` - Scan QR codes
10. **Reports** - `/dashboard/reports` - Generate reports
11. **Settings** - `/dashboard/settings` - System settings

---

## Backend API Base

**URL:** `http://localhost:5000/api`

**Endpoints:**
- `/assets` - Asset management
- `/employees` - Employee management
- `/vendors` - Vendor management
- `/categories` - Category management
- `/assignments` - Asset assignments
- `/activities` - Activity log
- `/reports` - Report generation
- `/auth` - Authentication

---

## Deployment Folders

**Frontend deploys from:** `/frontend` folder  
**Backend deploys from:** `/backend` folder  

---

**Now you have a clear, organized project structure!** 🎉
