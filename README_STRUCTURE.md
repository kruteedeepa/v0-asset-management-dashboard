# Asset Management System - Project Structure

## Overview

This is a **full-stack Asset Management System (AMS)** organized as a monorepo with separate frontend and backend folders for clarity and maintainability.

```
ams/
├── frontend/                 # Next.js React Application
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── lib/                 # Utilities and API client
│   ├── public/              # Static assets
│   ├── styles/              # Global CSS
│   ├── hooks/               # Custom React hooks
│   ├── package.json         # Frontend dependencies
│   ├── tsconfig.json        # TypeScript configuration
│   ├── next.config.mjs      # Next.js configuration
│   ├── .env.example         # Frontend environment variables
│   └── postcss.config.mjs   # PostCSS configuration
│
├── backend/                 # Express.js API Server
│   ├── server/              # (or) index.ts
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes/endpoints
│   │   ├── middleware/      # Auth, error handling
│   │   └── utils/           # Helper functions
│   ├── package.json         # Backend dependencies
│   ├── tsconfig.json        # TypeScript configuration
│   ├── .env.example         # Backend environment variables
│   └── index.ts             # Entry point
│
├── package.json             # Root package.json (monorepo)
├── .env.example             # Root environment variables reference
└── docs/                    # Documentation files
    ├── SETUP.md
    ├── DEPLOYMENT.md
    ├── ARCHITECTURE.md
    └── FUNCTIONALITY_COMPLETE.md
```

## Folder Breakdown

### `/frontend` - React Next.js Application

The frontend contains the user interface, built with Next.js 16, React 19, and TailwindCSS.

- **Key Features:**
  - Dashboard with charts, statistics, and data tables
  - Complete CRUD pages for Assets, Employees, Vendors, Categories
  - QR/Barcode scanner functionality
  - Report generation (PDF & CSV)
  - Responsive design (mobile, tablet, desktop)
  - Form validation and error handling
  - Toast notifications

- **Start Development:**
  ```bash
  npm run dev:frontend
  # or
  cd frontend && npm run dev
  ```
  Runs on: `http://localhost:3000`

### `/backend` - Express.js API Server

The backend provides all REST APIs, database operations, and business logic.

- **Key Features:**
  - 42+ RESTful API endpoints
  - MongoDB integration
  - JWT authentication middleware
  - Activity logging system
  - Error handling and validation
  - CORS enabled

- **Start Development:**
  ```bash
  npm run dev:backend
  # or
  cd backend && npm run dev
  ```
  Runs on: `http://localhost:5000`

- **API Base URL:** `http://localhost:5000/api`

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- pnpm (recommended) or npm/yarn
- MongoDB Atlas account (for database)
- Google Cloud Console account (for OAuth)

### 1. Install Dependencies

```bash
# From root directory
npm install
# or with pnpm
pnpm install
```

This will install dependencies for both frontend and backend due to the monorepo setup.

### 2. Environment Variables

Create `.env.local` files in each folder:

**Frontend (`frontend/.env.local`):**
```
NEXTAUTH_SECRET=generated-secret-key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend (`backend/.env.local`):**
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ams_db
JWT_SECRET=your-jwt-secret
CORS_ORIGIN=http://localhost:3000
```

### 3. Run Development Servers

**Option A: Run both frontend and backend together**
```bash
npm run dev
```

**Option B: Run separately**
```bash
# Terminal 1 - Frontend
npm run dev:frontend

# Terminal 2 - Backend
npm run dev:backend
```

**Access the application:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

## Building for Production

### Build Both
```bash
npm run build
```

### Build Frontend Only
```bash
npm run build:frontend
```

### Build Backend Only
```bash
npm run build:backend
```

## Project Scripts

From the root directory:

| Command | Purpose |
|---------|---------|
| `npm run dev` | Run both frontend and backend in development mode |
| `npm run dev:frontend` | Run frontend only |
| `npm run dev:backend` | Run backend only |
| `npm run build` | Build both frontend and backend |
| `npm run build:frontend` | Build frontend for production |
| `npm run build:backend` | Build backend for production |
| `npm run start:frontend` | Start production frontend server |
| `npm run start:backend` | Start production backend server |
| `npm run lint` | Run ESLint on frontend |

## File Organization

### Frontend Structure

```
frontend/
├── app/
│   ├── dashboard/          # Dashboard pages
│   │   ├── assets/
│   │   ├── employees/
│   │   ├── vendors/
│   │   ├── categories/
│   │   ├── asset-assignment/
│   │   ├── return-assets/
│   │   ├── maintenance/
│   │   ├── settings/
│   │   ├── scan-qr/
│   │   └── reports/
│   ├── auth/               # Authentication pages
│   ├── api/                # API routes (if needed)
│   └── layout.tsx          # Root layout
├── components/
│   ├── dashboard/          # Dashboard components
│   ├── shared/             # Reusable components
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── api-client.ts       # API client wrapper
│   ├── toast.ts            # Toast notifications
│   └── mock-data.ts        # Sample data
└── hooks/                  # Custom React hooks
```

### Backend Structure

```
backend/
├── server/ (or models, routes, middleware in root)
│   ├── models/             # MongoDB schemas
│   │   ├── User.ts
│   │   ├── Asset.ts
│   │   ├── Employee.ts
│   │   ├── Vendor.ts
│   │   ├── Category.ts
│   │   ├── Assignment.ts
│   │   ├── Activity.ts
│   │   └── Report.ts
│   ├── routes/             # API endpoints
│   │   ├── assets.ts
│   │   ├── employees.ts
│   │   ├── vendors.ts
│   │   ├── categories.ts
│   │   ├── activities.ts
│   │   ├── reports.ts
│   │   └── auth.ts
│   ├── middleware/         # Custom middleware
│   │   ├── auth.ts         # JWT verification
│   │   └── errorHandler.ts
│   └── utils/              # Helper functions
│       └── activityLogger.ts
└── index.ts                # Express app entry point
```

## API Endpoints

Base URL: `http://localhost:5000/api`

### Assets
- `GET /assets` - Get all assets
- `POST /assets` - Create asset
- `PUT /assets/:id` - Update asset
- `DELETE /assets/:id` - Delete asset

### Employees
- `GET /employees` - Get all employees
- `POST /employees` - Create employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Vendors
- `GET /vendors` - Get all vendors
- `POST /vendors` - Create vendor
- `PUT /vendors/:id` - Update vendor
- `DELETE /vendors/:id` - Delete vendor

### Categories
- `GET /categories` - Get all categories
- `POST /categories` - Create category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Asset Assignment
- `GET /assignments` - Get all assignments
- `POST /assignments` - Create assignment
- `PUT /assignments/:id` - Update assignment

### Reports
- `GET /reports` - Get all reports
- `POST /reports/generate` - Generate new report
- `GET /reports/export/:id` - Export report as PDF

### Activities
- `GET /activities` - Get activity log

## Technologies Used

### Frontend
- **Framework:** Next.js 16
- **UI Library:** React 19
- **Styling:** TailwindCSS + shadcn/ui
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts
- **Barcode/QR:** @zxing/library
- **PDF Generation:** jspdf, html2pdf
- **State Management:** React Context
- **HTTP Client:** Axios

### Backend
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs for passwords
- **Language:** TypeScript
- **Runtime:** Node.js

### DevOps
- **Package Manager:** pnpm (or npm)
- **Monorepo:** Root-level package.json with workspaces
- **Deployment:** Vercel (frontend) + Railway/Heroku (backend)

## Development Workflow

### Adding a New Feature

1. **Create Frontend Page/Component**
   ```
   frontend/app/dashboard/[feature]/page.tsx
   frontend/components/shared/[feature]-form.tsx
   ```

2. **Create Backend API Route**
   ```
   backend/routes/[feature].ts
   backend/models/[Feature].ts
   ```

3. **Connect Frontend to Backend**
   - Add API calls in `frontend/lib/api-client.ts`
   - Use API client in components

4. **Test Locally**
   - Run both frontend and backend
   - Test API endpoints with Postman or similar
   - Test UI flows in browser

## Troubleshooting

### Frontend won't start
```bash
cd frontend
npm install
npm run dev
```

### Backend won't start
```bash
cd backend
npm install
npm run dev
```

### Port already in use
- Frontend default: 3000
- Backend default: 5000

Change in `.env` or kill process using the port:
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F
```

### MongoDB connection issues
1. Check `MONGODB_URI` in `backend/.env.local`
2. Verify MongoDB Atlas IP whitelist
3. Confirm database name and credentials

## Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set frontend root directory: `frontend`
3. Set build command: `npm run build`
4. Set output directory: `.next`

### Backend (Railway/Heroku)
1. Deploy from GitHub to Railway or Heroku
2. Set root directory: `backend`
3. Set environment variables in platform UI
4. Set start command: `npm run start:backend`

## Documentation

See additional documentation files:
- `SETUP.md` - Detailed setup guide
- `ARCHITECTURE.md` - System architecture
- `DEPLOYMENT.md` - Production deployment
- `FUNCTIONALITY_COMPLETE.md` - Feature documentation

## Support

For issues or questions:
1. Check existing documentation
2. Review error messages in console
3. Check backend logs for API errors
4. Verify environment variables are set correctly

## License

MIT
