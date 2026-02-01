# Login Credentials

## Student Accounts

### Student 1
- **Email**: `student23102060@college.edu`
- **Password**: `Student@123`
- **Name**: Raj Kumar
- **Roll No**: 23102060
- **Year**: 2nd
- **Department**: AI&DS

### Student 2
- **Email**: `student23102061@college.edu`
- **Password**: `Student@456`
- **Name**: Priya Singh
- **Roll No**: 23102061
- **Year**: 3rd
- **Department**: AI&DS

### Student 3
- **Email**: `student23102062@college.edu`
- **Password**: `Student@789`
- **Name**: Amit Patel
- **Roll No**: 23102062
- **Year**: 4th
- **Department**: AI&DS

## Faculty Accounts

### Faculty 1 (AI&DS)
- **Email**: `facultyaids@college.edu`
- **Password**: `Faculty@123`
- **Name**: Dr. Rajesh Kumar
- **Department**: AI&DS
- **Designation**: Associate Professor

### Faculty 2 (CSE)
- **Email**: `facultycse@college.edu`
- **Password**: `Faculty@456`
- **Name**: Dr. Priya Sharma
- **Department**: CSE
- **Designation**: Professor

### Faculty 3 (EC)
- **Email**: `facultyec@college.edu`
- **Password**: `Faculty@789`
- **Name**: Dr. Vikram Singh
- **Department**: EC
- **Designation**: Assistant Professor

## How to Login

1. Go to: `http://localhost:3000/login`
2. Enter email from above
3. Enter password from above
4. Click "Login"

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)

All provided passwords meet these requirements.

## Testing

### To test Student Features:
Use any student account above

### To test Faculty Features:
Use any faculty account above

## Notes

- Credentials are stored in `dashboard-backend/credentials.json`
- Passwords are NOT hashed (for development only)
- In production, use proper password hashing (bcrypt)
- Each login generates a JWT token valid for 24 hours
