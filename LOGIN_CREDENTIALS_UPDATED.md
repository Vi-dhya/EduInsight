# Updated Login Credentials

## Password Requirements
- Minimum 8 characters
- At least one letter (a-z or A-Z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)

## Student Credentials

| Email | Password | Roll No | Year |
|-------|----------|---------|------|
| student23102060@college.edu | Student@123 | 23102060 | 2nd |
| student23102061@college.edu | Student@456 | 23102061 | 3rd |
| student23102062@college.edu | Student@789 | 23102062 | 4th |

## Faculty Credentials

| Email | Password | Name | Department |
|-------|----------|------|------------|
| facultyrajesh@college.edu | Faculty@123 | Dr. Rajesh Kumar | AI&DS |
| facultypriya@college.edu | Faculty@456 | Dr. Priya Sharma | CSE |
| facultyvikram@college.edu | Faculty@789 | Dr. Vikram Singh | EC |

## Testing Steps

1. **Stop the frontend development server** (if running)
2. **Restart the frontend**: `npm run dev` in `dashboard-frontend` folder
3. **Ensure backend is running**: `npm start` in `dashboard-backend` folder
4. **Try login with**: 
   - Email: `student23102060@college.edu`
   - Password: `Student@123`

## Backend Verification

Backend is working correctly. Test with curl:
```bash
curl -X POST http://localhost:5005/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student23102060@college.edu","password":"Student@123"}'
```

Response should include a token and user data.

## What Changed

✅ Password validation now requires:
- Minimum 8 characters
- At least one letter
- At least one number  
- At least one special character

✅ All credentials updated to meet requirements

✅ Frontend error handling improved to show validation errors

✅ Backend validates password format before checking credentials
