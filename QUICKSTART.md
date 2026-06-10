# Quick Start Guide - Asset Management System

## 30-Second Setup

### 1. Install Dependencies
```bash
cd /vercel/share/v0-project
pnpm install
```

### 2. Create Environment File
```bash
cp .env.example .env.local
```

### 3. Add Your Credentials (Optional for Testing)
Edit `.env.local`:
```
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_SECRET=any-random-string-for-now
JWT_SECRET=any-random-string-for-now
```

### 4. Start Development
```bash
pnpm dev
```

### 5. Open in Browser
```
Frontend: http://localhost:3000
Backend API: http://localhost:5000
```

## What Works Without Credentials

✅ Dashboard loads with beautiful charts and tables
✅ Barcode scanner page accessible at `/dashboard/scan-qr`
✅ Report generation page at `/dashboard/reports`
✅ All UI components and styling
✅ Responsive design on mobile

## What Needs Credentials

- Google OAuth login
- MongoDB database operations
- Saving/loading real asset data
- API integration

## Quick Test: Barcode Scanner

1. Visit `http://localhost:3000/dashboard/scan-qr`
2. Click "Start Scanning"
3. Allow camera access (or just type a barcode manually)
4. Mock asset data displays (once MongoDB is set up)

## Quick Test: Report Generation

1. Visit `http://localhost:3000/dashboard/reports`
2. Click "Generate Report"
3. Download as PDF or CSV
4. See preview of report data

## File Locations

| Feature | File |
|---------|------|
| Dashboard | `app/dashboard/page.tsx` |
| Scanner | `app/dashboard/scan-qr/page.tsx` |
| Reports | `app/dashboard/reports/page.tsx` |
| API Client | `lib/api-client.ts` |
| Backend Server | `server/index.ts` |
| Env Template | `.env.example` |

## Common Commands

```bash
# Development with auto-reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run frontend only
pnpm dev:frontend

# Run backend only
pnpm dev:backend

# Type check
pnpm tsc --noEmit
```

## Browser Console Tips

Open DevTools (F12) to see:
- API calls being made
- Components rendering
- Any errors during scanning or report generation

## Get Credentials in 5 Minutes

### MongoDB Atlas (Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create M0 cluster (takes ~2 minutes)
4. Click "Connect" and copy connection string
5. Paste into `.env.local` as `MONGODB_URI`

### Google OAuth
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credential (Web application)
5. Add `http://localhost:3000/api/auth/callback/google` as redirect
6. Copy Client ID and Secret into `.env.local`

Then restart your dev server with `pnpm dev`

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Dependencies Issue
```bash
pnpm install
# or
pnpm install --force
```

### Build Fails
```bash
pnpm install
pnpm build
```

## Next Steps

1. **Run the app** → `pnpm dev`
2. **Explore the dashboard** → http://localhost:3000
3. **Try barcode scanner** → http://localhost:3000/dashboard/scan-qr
4. **Try report generation** → http://localhost:3000/dashboard/reports
5. **Get MongoDB & Google OAuth** → Add credentials to `.env.local`
6. **Test API** → Use Postman or curl

## Project Structure At a Glance

```
Frontend (Next.js)        Backend (Express)
├── /app                  ├── /server
│   ├── /api             │   ├── /models
│   ├── /auth            │   ├── /routes
│   ├── /dashboard       │   ├── /middleware
│   └── /page.tsx        │   └── index.ts
├── /components          
├── /lib                 Database (MongoDB)
└── /public              ├── Users
                        ├── Assets
                        ├── Employees
                        ├── Categories
                        └── Reports
```

## What's Included

- ✅ Professional dashboard UI
- ✅ Barcode/QR code scanner
- ✅ PDF & CSV report generation
- ✅ Complete REST API
- ✅ MongoDB models ready
- ✅ JWT authentication ready
- ✅ Activity logging system
- ✅ Responsive design
- ✅ TypeScript throughout
- ✅ Production-ready code

## Time to First Run

**With dependencies pre-installed**: 30 seconds
```bash
pnpm dev
# Open http://localhost:3000
```

**Without dependencies**: 2-3 minutes
```bash
pnpm install  # ~2 minutes
pnpm dev
# Open http://localhost:3000
```

## No Credentials Needed To...

- View the dashboard
- See all UI components
- Test the barcode scanner UI
- Test the report generator UI
- View component code
- Build the project
- Deploy to production (before adding auth)

## First Credential Setup (10 minutes)

1. MongoDB Atlas: 5 minutes
2. Google OAuth: 3 minutes
3. Update `.env.local`: 2 minutes
4. Restart app: automatic

## That's It!

You now have a full-stack AMS ready to use. Add credentials when ready, or test the UI first without them.

For more details, see:
- `SETUP.md` - Complete setup guide
- `DEPLOYMENT.md` - Deploy to production
- `IMPLEMENTATION_SUMMARY.md` - Full feature list
