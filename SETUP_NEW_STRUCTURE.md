# Quick Setup Guide - New Structure

## Project Structure

The project is now organized into **separate frontend and backend folders** for better clarity:

```
asset-management-system/
├── frontend/          ← React/Next.js UI (port 3000)
├── backend/           ← Express API (port 5000)
└── package.json       ← Root monorepo config
```

## Installation

### 1. Install All Dependencies

```bash
# From root directory
npm install
# or with pnpm (recommended)
pnpm install
```

This installs dependencies for both frontend and backend automatically.

## Environment Setup

### Frontend Configuration (`frontend/.env.local`)

```
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend Configuration (`backend/.env.local`)

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ams_db
JWT_SECRET=your-jwt-secret-key
CORS_ORIGIN=http://localhost:3000
```

## Running the Application

### Option 1: Run Both Together (Recommended)

```bash
npm run dev
```

This runs:
- Frontend on `http://localhost:3000`
- Backend on `http://localhost:5000`

### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```
→ Runs on `http://localhost:3000`

**Terminal 2 - Backend:**
```bash
npm run dev:backend
# or
cd backend && npm run dev
```
→ Runs on `http://localhost:5000`

## Quick Commands

| Command | What it does |
|---------|---|
| `npm run dev` | Start both frontend + backend |
| `npm run dev:frontend` | Start only frontend |
| `npm run dev:backend` | Start only backend |
| `npm run build` | Build both for production |
| `npm run build:frontend` | Build only frontend |
| `npm run build:backend` | Build only backend |

## Folder Organization

### Frontend (`/frontend`)
- **app/** - Next.js pages & routes
- **components/** - React components
- **lib/** - Utilities & API client
- **styles/** - Global CSS
- **public/** - Static files
- **package.json** - Frontend dependencies only

### Backend (`/backend`)
- **server/** - Express middleware & utilities
  - **models/** - MongoDB schemas
  - **routes/** - API endpoints
  - **middleware/** - Auth & error handling
- **package.json** - Backend dependencies only

## Key Features

✅ **11 Working Pages** - Assets, Employees, Vendors, Categories, Asset Assignment, Return Assets, Maintenance, Settings, QR Scanner, Reports  
✅ **Add/Edit/Delete** - Complete CRUD operations on all pages  
✅ **Dashboard** - Charts, statistics, activity log  
✅ **Barcode Scanner** - Real-time QR/barcode scanning  
✅ **Report Generation** - PDF & CSV export  
✅ **Notifications** - Toast messages for all actions  
✅ **Responsive Design** - Works on all devices  

## API Integration

The frontend automatically connects to the backend API at:
- **Base URL:** `http://localhost:5000/api`
- **API Client:** `frontend/lib/api-client.ts`

All API calls go through the centralized API client.

## Next Steps

1. **Set up environment variables** (see Environment Setup above)
2. **Create MongoDB Atlas cluster** and get connection string
3. **Get Google OAuth credentials** (optional)
4. **Run `npm run dev`** to start both servers
5. **Visit `http://localhost:3000`** to see the dashboard

## Testing Without Backend

You can start just the frontend for UI testing:
```bash
npm run dev:frontend
```

The dashboard works with mock data - no backend needed for initial testing!

## Building for Production

```bash
npm run build
```

This builds:
- **Frontend** → optimized Next.js app in `frontend/.next/`
- **Backend** → compiled Express server in `backend/dist/`

## Troubleshooting

**Ports already in use?**
```bash
# Kill process on port
lsof -ti:3000 | xargs kill -9    # Frontend
lsof -ti:5000 | xargs kill -9    # Backend
```

**Dependencies not installing?**
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Backend not connecting to MongoDB?**
- Check `MONGODB_URI` in `backend/.env.local`
- Verify IP whitelist in MongoDB Atlas
- Ensure database name is correct

## Project Layout Example

After setup, you'll have:

```
ams/
├── frontend/
│   ├── app/
│   │   └── dashboard/
│   │       ├── assets/page.tsx
│   │       ├── employees/page.tsx
│   │       └── ...
│   ├── components/
│   ├── lib/
│   ├── package.json
│   └── .env.local
├── backend/
│   ├── server/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   ├── package.json
│   ├── .env.local
│   └── index.ts
└── package.json (root)
```

## What's Different Now?

**Before:** Everything in one folder, unclear what's frontend vs backend  
**Now:** Clear separation - `/frontend` for UI, `/backend` for API

**Benefits:**
- ✅ Easy to understand structure
- ✅ Separate dependencies for each part
- ✅ Can deploy frontend and backend independently
- ✅ Clear file organization
- ✅ Easier to collaborate in teams

## Need Help?

1. Check the main `README_STRUCTURE.md` for detailed docs
2. Look in `/frontend` or `/backend` folders for specific code
3. All environment variables are documented in `.env.example` files

---

**Ready to start?** → Run `npm run dev` and visit `http://localhost:3000`
