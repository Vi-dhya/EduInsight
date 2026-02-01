# Login Fix Guide

## Current Status
✅ Backend is running on port 5005
✅ Frontend is running on port 3006
✅ Password validation is working
✅ Credentials are correct

## Password Requirements
- Minimum 8 characters
- At least one letter (a-z or A-Z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)

## Valid Test Credentials

### Students
```
Email: student23102060@college.edu
Password: Student@123
```

```
Email: student23102061@college.edu
Password: Student@456
```

```
Email: student23102062@college.edu
Password: Student@789
```

### Faculty
```
Email: facultyrajesh@college.edu
Password: Faculty@123
```

```
Email: facultypriya@college.edu
Password: Faculty@456
```

```
Email: facultyvikram@college.edu
Password: Faculty@789
```

## How to Access

1. Open browser and go to: **http://localhost:3006**
2. Enter email and password from above
3. Click Login

## Password Validation Details

Each password meets all requirements:
- `Student@123` = 10 chars, has letters (S,t,u,d,e,n), numbers (1,2,3), special char (@)
- `Faculty@123` = 10 chars, has letters (F,a,c,u,l,t,y), numbers (1,2,3), special char (@)

## If Login Still Fails

1. **Check browser console** (F12 → Console tab) for error messages
2. **Verify backend is running**: Open http://localhost:5005/health
3. **Clear browser cache**: Ctrl+Shift+Delete
4. **Hard refresh**: Ctrl+F5
5. **Check credentials.json** file has correct passwords

## Backend Verification

Test backend directly with curl:
```bash
curl -X POST http://localhost:5005/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student23102060@college.edu","password":"Student@123"}'
```

Should return a token and user data.

## Frontend Port

Frontend is running on: **http://localhost:3006**
(Not 3002 - other ports were in use)
