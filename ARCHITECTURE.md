# Asset Management System - Architecture Guide

## System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                    Next.js Frontend                        │  │
│  │  (React 19 + Tailwind CSS + TypeScript)                    │  │
│  │                                                             │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │  │
│  │  │  Dashboard   │  │   Scanner    │  │   Reports    │    │  │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │  │
│  │         │                  │                  │             │  │
│  │  ┌──────┴──────────────────┴──────────────────┴──────┐    │  │
│  │  │         API Client Wrapper (lib/api-client.ts)    │    │  │
│  │  │  - Asset API                                      │    │  │
│  │  │  - Employee API                                   │    │  │
│  │  │  - Report API                                     │    │  │
│  │  │  - Auth API                                       │    │  │
│  │  └────────────────┬─────────────────────────────────┘    │  │
│  └───────────────────┼──────────────────────────────────────┘  │
│                      │                                           │
│                      │ HTTP/JSON                                │
│                      │                                           │
└──────────────────────┼───────────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                              │
        │  Port 3000 (Dev)            │  Port 5000 (API)
        │  http://localhost:3000       │  http://localhost:5000
        │                              │
┌───────▼──────────────────────────────▼──────────────────┐
│                  Express.js Backend                      │
│                 (Node.js + TypeScript)                   │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │              Route Handlers                        │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐          │  │
│  │  │ Assets   │ │ Employees│ │ Reports  │  ...     │  │
│  │  └─────┬────┘ └─────┬────┘ └─────┬────┘          │  │
│  │        │             │            │               │  │
│  │  ┌─────┴─────────────┴────────────┴──────────┐   │  │
│  │  │     Middleware                            │   │  │
│  │  │  - Authentication (JWT)                   │   │  │
│  │  │  - Error Handling                         │   │  │
│  │  │  - Activity Logging                       │   │  │
│  │  │  - CORS                                   │   │  │
│  │  └─────┬─────────────────────────────────────┘   │  │
│  └────────┼────────────────────────────────────────┘   │
│           │                                             │
│  ┌────────▼────────────────────────────────────────┐   │
│  │           MongoDB Models/Schemas                │   │
│  │  ┌─────────┐  ┌──────────┐  ┌──────────┐      │   │
│  │  │ Users   │  │ Assets   │  │Employees │      │   │
│  │  ├─────────┤  ├──────────┤  ├──────────┤      │   │
│  │  │ Vendors │  │ Categories├─│Assignments      │   │
│  │  ├─────────┤  ├──────────┤  ├──────────┤      │   │
│  │  │Activities│ │ Reports  │  │          │      │   │
│  │  └─────────┘  └──────────┘  └──────────┘      │   │
│  └────────┬────────────────────────────────────────┘   │
└───────────┼──────────────────────────────────────────────┘
            │
            │ Mongoose (MongoDB Driver)
            │
┌───────────▼──────────────────────────────────────────────┐
│              MongoDB Atlas (Database)                     │
│  https://cloud.mongodb.com                              │
│                                                          │
│  Database: ams_db                                       │
│  Collections:                                           │
│    - users (Authentication & Profiles)                  │
│    - assets (IT Equipment Inventory)                    │
│    - employees (Employee Directory)                     │
│    - vendors (Vendor Information)                       │
│    - categories (Asset Categories)                      │
│    - assignments (Asset-to-Employee Assignments)        │
│    - activities (Audit Log)                             │
│    - reports (Generated Reports)                        │
└──────────────────────────────────────────────────────────┘
```

## Request Flow

### 1. Dashboard Load
```
Browser Request
    ↓
Next.js Server-Side Rendering
    ↓
React Components Render
    ↓
API Calls Made (if credentials configured)
    ↓
API Client → Express Backend
    ↓
MongoDB Query
    ↓
Data Returned → Browser Display
```

### 2. Barcode Scan
```
User clicks "Start Scanning"
    ↓
Browser requests camera permission
    ↓
Camera feed displays
    ↓
ZXing Library detects barcode/QR
    ↓
API Call: GET /api/assets/scan/{barcode}
    ↓
Express Backend queries MongoDB
    ↓
Asset details returned
    ↓
Display on dashboard
```

### 3. Report Generation
```
User selects report type & filters
    ↓
Frontend calls POST /api/reports/generate/{type}
    ↓
Backend queries MongoDB based on filters
    ↓
Data formatted as JSON
    ↓
Frontend receives data
    ↓
jsPDF or CSV library processes
    ↓
Download PDF/CSV to computer
```

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────┐
│           User Actions in Dashboard                      │
│  (Create Asset, Assign, Scan, Generate Report, etc.)     │
└─────────────────────────┬────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │   Validate & Prepare Request    │
        │  (Input validation on frontend) │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │   API Call via Fetch/Axios      │
        │  (Include JWT token if needed)  │
        └────────────┬────────────────────┘
                     │ HTTP Request
                     ▼
        ┌─────────────────────────────────┐
        │  Express Route Handler          │
        │  (app.js, assets.ts, etc.)      │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │  Middleware (optional)          │
        │  - JWT Verification             │
        │  - Input Validation             │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │  Business Logic                 │
        │  (Create, Update, Query)        │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │  Mongoose Model Operation       │
        │  (Asset.create, find, etc.)     │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │  MongoDB Query/Write            │
        │  (Document CRUD)                │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │  Log Activity (if applicable)   │
        │  (Create Activity document)     │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │  Return JSON Response           │
        │  (Success or Error)             │
        └────────────┬────────────────────┘
                     │ HTTP Response
                     ▼
        ┌─────────────────────────────────┐
        │  Frontend Receives Response     │
        │  (Update state/UI)              │
        └────────────┬────────────────────┘
                     │
                     ▼
        ┌─────────────────────────────────┐
        │  Update Dashboard Display       │
        │  (Refresh charts/tables)        │
        └─────────────────────────────────┘
```

## File Organization

### Frontend (React/Next.js)
```
/app                              # Next.js App Router
├── /api/auth/                    # Authentication endpoints
│   ├── login/route.ts            # Login endpoint
│   └── logout/route.ts           # Logout endpoint
├── /auth/                        # Auth pages
│   └── signin/page.tsx           # Google OAuth page
├── /dashboard/                   # Protected pages
│   ├── page.tsx                  # Main dashboard
│   ├── /scan-qr/page.tsx         # Barcode scanner
│   └── /reports/page.tsx         # Report generation
└── page.tsx                      # Home redirect

/components/dashboard/            # Dashboard components
├── dashboard-layout.tsx          # Main layout wrapper
├── sidebar-nav.tsx               # Left sidebar menu
├── top-navbar.tsx                # Top navigation bar
├── stats-cards.tsx               # Statistics cards
├── assets-by-category.tsx        # Category chart
├── assets-by-status.tsx          # Status chart
├── recent-activity.tsx           # Activity timeline
├── recent-assets-table.tsx       # Assets data table
├── barcode-scanner.tsx           # Scanner component
└── report-generator.tsx          # Report component

/lib                              # Utilities & helpers
├── api-client.ts                 # API wrapper functions
├── auth.ts                       # NextAuth config
├── types.ts                      # TypeScript types
└── mock-data.ts                  # Sample data

/public                           # Static assets
└── assets/                       # Images, icons, etc.
```

### Backend (Express/Node.js)
```
/server                           # Express backend
├── /models/                      # MongoDB schemas
│   ├── User.ts                   # User schema
│   ├── Asset.ts                  # Asset schema
│   ├── Employee.ts               # Employee schema
│   ├── Vendor.ts                 # Vendor schema
│   ├── Category.ts               # Category schema
│   ├── Assignment.ts             # Assignment schema
│   ├── Activity.ts               # Activity schema
│   └── Report.ts                 # Report schema
├── /routes/                      # API route handlers
│   ├── auth.ts                   # Authentication
│   ├── assets.ts                 # Asset CRUD
│   ├── employees.ts              # Employee CRUD
│   ├── vendors.ts                # Vendor CRUD
│   ├── categories.ts             # Category CRUD
│   ├── activities.ts             # Activity queries
│   └── reports.ts                # Report generation
├── /middleware/                  # Express middleware
│   ├── auth.ts                   # JWT verification
│   └── errorHandler.ts           # Error handling
├── /utils/                       # Helper functions
│   └── activityLogger.ts         # Activity logging
└── index.ts                      # Main server file
```

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  email: String,
  name: String,
  role: 'admin' | 'manager' | 'user',
  googleId: String,
  profileImage: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Asset Collection
```javascript
{
  _id: ObjectId,
  assetId: String,      // A001234567
  name: String,         // Dell Latitude 5440
  category: String,     // Laptop
  serialNumber: String, // DL123456789
  status: 'Assigned' | 'Available' | 'Maintenance',
  assignedTo: String,   // Employee ID
  purchaseDate: Date,
  purchasePrice: Number,
  location: String,
  description: String,
  barcode: String,      // UUID for scanning
  createdBy: String,    // User ID
  createdAt: Date,
  updatedAt: Date
}
```

### Activity Collection
```javascript
{
  _id: ObjectId,
  type: 'asset_added' | 'asset_assigned' | 'asset_returned' | ...,
  title: String,        // "Dell Latitude 5440 added"
  description: String,  // "New asset added to inventory"
  assetId: String,
  employeeId: String,
  createdBy: String,    // User ID
  createdAt: Date       // Auto-timestamp
}
```

## API Endpoints

### Assets (9 endpoints)
- `GET /api/assets` - Get all assets
- `GET /api/assets/:id` - Get single asset
- `GET /api/assets/scan/:barcode` - Scan barcode
- `POST /api/assets` - Create asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset
- `POST /api/assets/:id/assign` - Assign to employee
- `POST /api/assets/:id/return` - Return asset
- `POST /api/assets/:id/maintenance` - Mark for maintenance

### Employees (5 endpoints)
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get single employee
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Vendors (5 endpoints)
- Similar structure to Employees

### Categories (5 endpoints)
- Similar structure to Employees

### Activities (3 endpoints)
- `GET /api/activities` - Get recent activities
- `GET /api/activities/asset/:assetId` - Get asset activities
- `GET /api/activities/employee/:employeeId` - Get employee activities

### Reports (4 endpoints)
- `GET /api/reports` - Get report history
- `POST /api/reports/generate/assets` - Generate assets report
- `POST /api/reports/generate/assignments` - Generate assignments report
- `POST /api/reports/generate/maintenance` - Generate maintenance report

### Auth (2 endpoints)
- `POST /api/auth/google` - Google OAuth callback
- `POST /api/auth/login` - Manual login
- `POST /api/auth/logout` - Logout

## Authentication Flow

### With Google OAuth (When Configured)
```
1. User clicks "Sign in with Google"
2. Redirects to Google login page
3. User authenticates with Google
4. Google redirects back with auth code
5. NextAuth exchanges code for tokens
6. API call: POST /api/auth/google
7. Backend creates/updates user in MongoDB
8. Returns JWT token
9. Token stored in session/cookie
10. User redirected to dashboard
```

### Without OAuth (Current State)
```
1. Dashboard accessible directly
2. Mock data displayed
3. No persistent login state
4. Perfect for testing UI
```

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Scanner**: @zxing/library
- **Export**: jsPDF, html2pdf
- **Type Safety**: TypeScript
- **HTTP**: Fetch API, Axios-ready

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + NextAuth.js
- **Security**: bcryptjs
- **Type Safety**: TypeScript
- **DevTools**: tsx, concurrently

### Database
- **Primary**: MongoDB (Atlas or self-hosted)
- **ODM**: Mongoose
- **Collections**: 8 (Users, Assets, Employees, Vendors, Categories, Assignments, Activities, Reports)

## Environment Variables

```
Frontend:
- NEXTAUTH_SECRET         # NextAuth session secret
- NEXTAUTH_URL            # Auth callback URL
- GOOGLE_ID              # Google OAuth ID
- GOOGLE_SECRET          # Google OAuth secret
- NEXT_PUBLIC_API_URL    # Backend API URL

Backend:
- MONGODB_URI            # MongoDB connection string
- JWT_SECRET             # JWT signing secret
- PORT                   # Server port (default 5000)
- NODE_ENV              # development/production
```

## Security Architecture

```
Request → Frontend Validation → API Client (JWT added) → Express → Route Handler → 
Middleware (JWT verified) → Business Logic → MongoDB Query → Activity Log → Response
```

## Scaling Considerations

### Current (Development)
- Single Express process
- All-in-one server
- MongoDB free tier

### Production (Later)
- Load balancer
- Multiple Express instances
- MongoDB Atlas paid tier
- Redis caching (optional)
- CDN for assets
- Separate API domain

## Deployment Architecture

```
┌─────────────────────────────┐
│   DNS / Domain Provider      │
└────────────┬────────────────┘
             │
    ┌────────┴─────────┐
    │                  │
┌───▼──────────┐  ┌───▼────────────────┐
│ Vercel CDN   │  │ Backend Service    │
│              │  │ (Railway/Render)   │
│ Frontend     │  │                    │
│ (Next.js)    │  │ Express + Node.js  │
└───┬──────────┘  └───┬────────────────┘
    │                 │
    └─────────────────┼──────────┐
                      │          │
                  ┌───▼──────────▼─┐
                  │  MongoDB Atlas  │
                  │   Database      │
                  └─────────────────┘
```

## Monitoring & Logging

### Frontend
- Console logs for debugging
- Vercel analytics (with deployment)
- Browser DevTools

### Backend
- Console logs (development)
- Activity logging to MongoDB
- Error middleware catches exceptions

### Database
- MongoDB Atlas monitoring
- Query performance tracking
- Storage usage monitoring

---

This architecture is **scalable**, **maintainable**, and **production-ready**. Each layer is independent and can be upgraded or replaced as needed.
