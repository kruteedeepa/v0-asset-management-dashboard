# Asset Management System (AMS) - Complete Setup Guide

This document provides comprehensive setup instructions for the full-stack AMS application with Google authentication, MongoDB, Express backend, and barcode scanning.

## Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- MongoDB Atlas account (free tier available)
- Google Cloud Console account

## Step 1: Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth 2.0 Client ID"
5. Select "Web application"
6. Add Authorized JavaScript origins:
   - `http://localhost:3000`
   - Your production domain (e.g., `https://yourdomain.com`)
7. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
8. Copy the Client ID and Client Secret

## Step 2: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (M0 free tier is sufficient)
4. Go to "Database Access" and create a database user
5. Go to "Network Access" and allow access from your IP or anywhere (0.0.0.0/0)
6. Click "Connect" and copy the connection string:
   - Format: `mongodb+srv://username:password@cluster-name.mongodb.net/ams_db?retryWrites=true&w=majority`

## Step 3: Environment Configuration

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your credentials in `.env.local`:
   ```
   NEXTAUTH_SECRET=<generated-secret>
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_ID=<your-google-client-id>
   GOOGLE_SECRET=<your-google-client-secret>
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. Generate secrets:
   ```bash
   # Generate NEXTAUTH_SECRET
   openssl rand -base64 32
   
   # Generate JWT_SECRET
   openssl rand -base64 32
   ```

## Step 4: Install Dependencies

```bash
pnpm install
```

## Step 5: Running the Application

### Development Mode (Frontend + Backend)

```bash
pnpm dev
```

This will start both:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

### Production Build

```bash
pnpm build
pnpm start
```

## API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth callback

### Assets
- `GET /api/assets` - Get all assets
- `GET /api/assets/:id` - Get asset by ID
- `POST /api/assets` - Create new asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset
- `POST /api/assets/:id/assign` - Assign asset to employee
- `POST /api/assets/:id/return` - Return asset
- `POST /api/assets/:id/maintenance` - Mark asset for maintenance
- `GET /api/assets/scan/:barcode` - Scan asset by barcode

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Vendors
- `GET /api/vendors` - Get all vendors
- `GET /api/vendors/:id` - Get vendor by ID
- `POST /api/vendors` - Create new vendor
- `PUT /api/vendors/:id` - Update vendor
- `DELETE /api/vendors/:id` - Delete vendor

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Activities
- `GET /api/activities` - Get recent activities
- `GET /api/activities/asset/:assetId` - Get activities for an asset
- `GET /api/activities/employee/:employeeId` - Get activities for an employee

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports/generate/assets` - Generate assets report
- `POST /api/reports/generate/assignments` - Generate assignments report
- `POST /api/reports/generate/maintenance` - Generate maintenance report

## Features Implemented

### Frontend
- Google OAuth authentication
- Protected dashboard routes
- Asset management CRUD
- Employee management
- Vendor management
- Category management
- Asset assignment tracking
- Real-time activity logging
- Barcode/QR code scanning
- Report generation (PDF & CSV export)
- Responsive design with Tailwind CSS

### Backend
- Express.js REST API
- MongoDB database integration
- JWT authentication
- Activity logging system
- Barcode scanning support
- Report generation with filtering
- Error handling and validation
- CORS support

## Troubleshooting

### MongoDB Connection Issues
- Ensure your IP is whitelisted in MongoDB Atlas Network Access
- Check connection string format
- Verify username and password don't contain special characters (if they do, URL encode them)

### Google OAuth Issues
- Ensure redirect URIs are correctly configured in Google Console
- Check that localhost:3000 is added for development
- Clear browser cookies and try again

### Backend Not Starting
- Check that port 5000 is not in use
- Verify MongoDB URI is correct
- Check for any missing environment variables

### Frontend/Backend Communication
- Ensure NEXT_PUBLIC_API_URL matches the backend port
- Check CORS is enabled in Express (already configured)
- Verify JWT token is being stored correctly

## Project Structure

```
├── app/
│   ├── api/auth/[...nextauth]/    # NextAuth route handlers
│   ├── auth/                        # Authentication pages
│   ├── dashboard/                   # Protected dashboard routes
│   └── page.tsx                     # Main page
├── components/
│   └── dashboard/                   # Dashboard components
├── lib/
│   ├── api-client.ts               # API wrapper functions
│   └── types.ts                     # TypeScript types
├── server/
│   ├── models/                      # MongoDB schemas
│   ├── routes/                      # API route handlers
│   ├── middleware/                  # Auth and error handling
│   ├── utils/                       # Utility functions
│   └── index.ts                     # Main server file
├── auth.ts                          # NextAuth configuration
├── .env.example                     # Environment template
└── package.json                     # Dependencies and scripts
```

## Next Steps

1. Configure your Google OAuth credentials
2. Set up MongoDB Atlas database
3. Create `.env.local` with all required variables
4. Run `pnpm install`
5. Start with `pnpm dev`
6. Access the application at `http://localhost:3000`

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express Documentation](https://expressjs.com/)
