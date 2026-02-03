# Quick Login Fix - 3 Steps

## The Problem
Login fails for all users with "Login failed. Please check your email and password."

## The Solution

### Step 1: Start MongoDB
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Step 2: Start Backend Server
```bash
cd dashboard-backend
npm install  # Only if first time
npm run dev
```

Wait for this message:
```
Server running on port 5007
MongoDB Connected
Credentials loaded:
```

### Step 3: Login with Test Credentials
Use these credentials:

**Student:**
- Email: `student23102001@college.edu`
- Password: `student23102001`

**Faculty:**
- Email: `facultyrajesh@college.edu`
- Password: `facultyra`

**HOD:**
- Email: `hodanathi@college.edu`
- Password: `hod@123`

**Admin:**
- Email: `adramkumar@college.edu`
- Password: `ad@123`

## That's It!

If login still fails:
1. Check backend console for errors
2. Check browser console (F12)
3. Check network tab in DevTools
4. Verify MongoDB is running
5. See LOGIN_TROUBLESHOOTING_GUIDE.md for detailed help

## Verify Everything is Running

### Check Backend
```bash
curl http://localhost:5007/health
```
Should return: `{"status":"Server is running"}`

### Check MongoDB
```bash
mongosh
```
Should connect successfully.

### Check Frontend
```bash
cd dashboard-frontend
npm run dev
```
Should start on `http://localhost:5173`

## Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot POST /auth/login" | Start backend: `npm run dev` |
| "Network Error" | Check backend is running on port 5007 |
| "Invalid credentials" | Use correct email/password from list |
| "Connection refused" | Start MongoDB |
| "Port already in use" | Kill process on port 5007 or use different port |

## Full Setup (First Time)

```bash
# 1. Start MongoDB
net start MongoDB  # Windows

# 2. Install backend dependencies
cd dashboard-backend
npm install

# 3. Start backend
npm run dev

# 4. In new terminal, start frontend
cd dashboard-frontend
npm install
npm run dev

# 5. Open browser
# http://localhost:5173

# 6. Login with credentials above
```

## Done!

You should now be able to login and access the dashboard.
