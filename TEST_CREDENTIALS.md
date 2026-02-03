# Test Credentials - EduInsight Dashboard

## Quick Login Reference

### STUDENTS (10 Available)

| Email | Password | Roll No | Name | Year |
|-------|----------|---------|------|------|
| student23102001@college.edu | student23102001 | 23102001 | Atchaya | 2nd |
| student23102002@college.edu | student23102002 | 23102002 | Ragul | 2nd |
| student23102003@college.edu | student23102003 | 23102003 | Rifath | 2nd |
| student23102004@college.edu | student23102004 | 23102004 | Faouzia | 2nd |
| student23102005@college.edu | student23102005 | 23102005 | Sasidharan | 2nd |
| student23102006@college.edu | student23102006 | 23102006 | Shree Prajan | 2nd |
| student23102007@college.edu | student23102007 | 23102007 | Saran | 2nd |
| student23102008@college.edu | student23102008 | 23102008 | Sowmiya | 2nd |
| student23102009@college.edu | student23102009 | 23102009 | Pria Nandhini | 2nd |
| student23102010@college.edu | student23102010 | 23102010 | Vimalesh | 2nd |

### FACULTY (3 Available)

| Email | Password | Name | Department | Designation |
|-------|----------|------|------------|-------------|
| facultyrajesh@college.edu | facultyra | Dr. Rajesh Kumar | AI&DS | Associate Professor |
| facultypriya@college.edu | facultypr | Dr. Priya Sharma | CSE | Professor |
| facultyvikram@college.edu | facultyvi | Dr. Vikram Singh | EC | Assistant Professor |

### HOD (1 Available)

| Email | Password | Name | Department | Designation |
|-------|----------|------|------------|-------------|
| hodanathi@college.edu | hod@123 | Dr. Anathi | AI&DS | Head of Department |

### AD - ADMIN (1 Available)

| Email | Password | Name | Department | Designation |
|-------|----------|------|------------|-------------|
| adramkumar@college.edu | ad@123 | Dr. Ram Kumar | Academic Affairs | Associate Dean |

## How to Login

1. Go to `http://localhost:5173`
2. Enter email from table above
3. Enter password from table above
4. Click "Sign In"

## Recommended Test Users

### For Testing Student Features
- **Email**: student23102001@college.edu
- **Password**: student23102001

### For Testing Faculty Features
- **Email**: facultyrajesh@college.edu
- **Password**: facultyra

### For Testing HOD Features
- **Email**: hodanathi@college.edu
- **Password**: hod@123

### For Testing Admin Features
- **Email**: adramkumar@college.edu
- **Password**: ad@123

## Important Notes

1. **Backend Must Be Running**
   ```bash
   cd dashboard-backend
   npm run dev
   ```

2. **MongoDB Must Be Running**
   ```bash
   # Windows
   net start MongoDB
   
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

3. **Frontend Must Be Running**
   ```bash
   cd dashboard-frontend
   npm run dev
   ```

4. **Credentials Are Case-Sensitive**
   - Email must match exactly
   - Password must match exactly

5. **Each Role Has Different Dashboard**
   - Student → Student Dashboard
   - Faculty → Faculty Dashboard
   - HOD → HOD Dashboard
   - AD → Admin Dashboard

## Troubleshooting

### Login Fails
1. Check backend is running on port 5007
2. Check MongoDB is running
3. Verify email and password are correct
4. Check browser console for errors
5. Check network tab in DevTools

### Backend Not Running
```bash
cd dashboard-backend
npm install
npm run dev
```

### MongoDB Not Running
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Check what's using port 5007
netstat -ano | findstr :5007

# Kill the process
taskkill /PID <PID> /F
```

## Features by Role

### Student Can:
- View dashboard
- View exam details
- View marks
- View hall assignments
- View notice board
- Create and manage tickets
- Upload certificates
- View internships

### Faculty Can:
- View department details
- Manage certifications
- Manage internships
- Manage marks
- Post notices
- Create and manage tickets
- Download bulk files as ZIP

### HOD Can:
- View analytics
- View department information
- View notices
- View student statistics

### Admin Can:
- Manage all system features
- View all data
- System administration

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

## Email Format

- Must be valid email format
- Must match one of the credentials above
- Case-sensitive

## Session Duration

- Token expires in 24 hours
- After expiration, need to login again
- Token stored in localStorage

## Security Notes

- Never share credentials
- Change passwords in production
- Use HTTPS in production
- Keep JWT_SECRET secure
- Validate all inputs

## Support

For login issues:
1. Verify backend is running
2. Verify MongoDB is running
3. Check credentials are correct
4. Check browser console for errors
5. Check network tab in DevTools
6. Review LOGIN_TROUBLESHOOTING_GUIDE.md
