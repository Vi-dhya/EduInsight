# Login Troubleshooting Guide

## Problem
Login fails for all users (Student, Faculty, HOD, AD) with error: "Login failed. Please check your email and password."

## Root Causes & Solutions

### 1. Backend Server Not Running (MOST COMMON)

#### Check if Backend is Running
```bash
# Try to access the health endpoint
curl http://localhost:5007/health
```

If you get a connection error, the backend is not running.

#### Solution: Start the Backend Server
```bash
cd dashboard-backend
npm install  # Install dependencies if not done
npm run dev  # Start development server
```

You should see:
```
Server running on port 5007
MongoDB Connected
Credentials loaded:
Students: [...]
Faculty: [...]
HOD: [...]
AD: [...]
```

### 2. MongoDB Not Running

#### Check if MongoDB is Running
```bash
# On Windows
net start MongoDB

# On Mac
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

#### Verify MongoDB Connection
```bash
# Try to connect
mongosh
```

### 3. Incorrect Credentials

#### Valid Test Credentials

**Students:**
```
Email: student23102001@college.edu
Password: student23102001

Email: student23102002@college.edu
Password: student23102002

Email: student23102003@college.edu
Password: student23102003
```

**Faculty:**
```
Email: facultyrajesh@college.edu
Password: facultyra

Email: facultypriya@college.edu
Password: facultypr

Email: facultyvikram@college.edu
Password: facultyvi
```

**HOD:**
```
Email: hodanathi@college.edu
Password: hod@123
```

**AD (Admin):**
```
Email: adramkumar@college.edu
Password: ad@123
```

### 4. CORS Issues

#### Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for CORS errors

#### Solution: Verify CORS Configuration
The backend has CORS enabled. If you still see CORS errors:

1. Check that backend is running on `http://localhost:5007`
2. Check that frontend is running on `http://localhost:5173` or similar
3. Verify the API URL in Login.jsx is correct:
```javascript
const response = await axios.post('http://localhost:5007/auth/login', {
  email,
  password
})
```

### 5. Network Issues

#### Check Network Tab
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try to login
4. Look for the login request
5. Check the response status and body

#### Common Network Issues
- **Status 0**: Backend not running
- **Status 500**: Server error (check backend logs)
- **Status 401**: Invalid credentials
- **Status 400**: Missing email or password

### 6. Port Already in Use

#### Check if Port 5007 is in Use
```bash
# On Windows
netstat -ano | findstr :5007

# On Mac/Linux
lsof -i :5007
```

#### Solution: Kill Process or Use Different Port
```bash
# Kill the process (Windows)
taskkill /PID <PID> /F

# Or change port in .env
PORT=5008
```

## Step-by-Step Troubleshooting

### Step 1: Verify Backend is Running
```bash
curl http://localhost:5007/health
```
Expected response:
```json
{"status":"Server is running"}
```

### Step 2: Verify MongoDB is Running
```bash
mongosh
```
Should connect successfully.

### Step 3: Check Backend Logs
Look for:
```
Server running on port 5007
MongoDB Connected
Credentials loaded:
```

### Step 4: Test Login with Correct Credentials
Use one of the valid credentials from above.

### Step 5: Check Browser Console
Open DevTools and look for errors.

### Step 6: Check Network Tab
Look at the login request response.

## Complete Setup from Scratch

### 1. Install Dependencies
```bash
# Backend
cd dashboard-backend
npm install

# Frontend
cd dashboard-frontend
npm install
```

### 2. Start MongoDB
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 3. Start Backend
```bash
cd dashboard-backend
npm run dev
```

Wait for:
```
Server running on port 5007
MongoDB Connected
```

### 4. Start Frontend (in new terminal)
```bash
cd dashboard-frontend
npm run dev
```

### 5. Open Browser
```
http://localhost:5173
```

### 6. Login with Test Credentials
Use one of the valid credentials listed above.

## Common Error Messages & Solutions

### "Login failed. Please check your email and password."
- **Cause**: Backend not running or invalid credentials
- **Solution**: 
  1. Start backend: `npm run dev`
  2. Use correct credentials from list above

### "Cannot POST /auth/login"
- **Cause**: Backend not running
- **Solution**: Start backend server

### "Network Error"
- **Cause**: Backend not accessible
- **Solution**: 
  1. Check backend is running
  2. Check port 5007 is not blocked
  3. Check firewall settings

### "Invalid email format"
- **Cause**: Email doesn't match expected format
- **Solution**: Use valid email from credentials list

### "Invalid password format"
- **Cause**: Password doesn't meet requirements
- **Solution**: Use correct password from credentials list

## Debugging Tips

### Enable Backend Logging
The backend already logs login attempts. Check console for:
```
=== LOGIN ATTEMPT ===
Email received: ...
Password received: ...
Checking if email starts with student: ...
```

### Check Credentials File
```bash
cat dashboard-backend/credentials.json
```

### Test API Directly
```bash
curl -X POST http://localhost:5007/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student23102001@college.edu","password":"student23102001"}'
```

Expected response:
```json
{
  "token": "...",
  "user": {
    "email": "student23102001@college.edu",
    "role": "student",
    "name": "Atchaya",
    "rollNo": "23102001",
    "year": "2nd",
    "department": "AI&DS"
  }
}
```

## Quick Fix Checklist

- [ ] Backend running on port 5007
- [ ] MongoDB running
- [ ] Using correct email from credentials list
- [ ] Using correct password from credentials list
- [ ] No CORS errors in browser console
- [ ] Network request shows status 200
- [ ] Token received in response

## Still Not Working?

1. Check backend logs for errors
2. Check browser console for errors
3. Check network tab for request/response
4. Verify credentials.json file exists
5. Verify .env file has correct settings
6. Try restarting both backend and frontend
7. Clear browser cache and cookies
8. Try incognito/private mode

## Support

If login still fails after following all steps:
1. Check backend console for error messages
2. Check browser DevTools Network tab
3. Verify all services are running
4. Try with different credentials
5. Restart all services
