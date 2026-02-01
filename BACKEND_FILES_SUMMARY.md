# Backend Files Summary

## Overview
The backend is built with Express.js and uses MongoDB with Mongoose for data persistence. Currently uses file-based credentials for authentication with JWT tokens.

---

## Core Files

### 1. **server.js** - Main Server Entry Point
- **Location**: `dashboard-backend/server.js`
- **Purpose**: Express server setup and route initialization
- **Current Setup**:
  - CORS enabled
  - JSON/URL-encoded body parsing
  - Auth routes mounted at `/auth`
  - Health check endpoint at `/health`
  - Runs on port 5003 (configurable via PORT env var)
- **Dependencies**: express, cors, dotenv

---

## Configuration Files

### 2. **package.json** - Dependencies & Scripts
- **Location**: `dashboard-backend/package.json`
- **Key Dependencies**:
  - `express`: Web framework
  - `cors`: Cross-origin requests
  - `dotenv`: Environment variables
  - `jsonwebtoken`: JWT token generation/verification
  - `bcryptjs`: Password hashing
  - `multer`: File upload handling
  - `mongoose`: MongoDB ODM
- **Scripts**:
  - `npm start`: Run production server
  - `npm run dev`: Run with nodemon (auto-reload)
  - `npm run seed`: Seed database with test data

### 3. **config/database.js** - MongoDB Connection
- **Location**: `dashboard-backend/config/database.js`
- **Purpose**: Mongoose connection setup
- **Connection String**: `mongodb://localhost:27017/eduinsight` (default)
- **Environment Variable**: `MONGODB_URI`
- **Status**: Not currently imported in server.js (needs to be connected)

---

## Authentication & Routes

### 4. **routes/auth.js** - Authentication Routes
- **Location**: `dashboard-backend/routes/auth.js`
- **Endpoint**: `POST /auth/login`
- **Current Implementation**:
  - Reads credentials from `credentials.json` file
  - Validates email format (student/faculty)
  - Validates password strength
  - Generates JWT token with 24h expiration
  - Auto-detects role from email prefix
  - Returns user data with role-specific fields
- **Response Structure**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "email": "student12345678@college.edu",
      "role": "student",
      "name": "Student 12345678",
      "rollNo": "12345678",
      "year": "2nd",
      "department": "AI&DS"
    }
  }
  ```

---

## Middleware

### 5. **middleware/auth.js** - JWT Verification
- **Location**: `dashboard-backend/middleware/auth.js`
- **Functions**:
  - `verifyToken`: Validates JWT token from Authorization header
  - `requireRole`: Checks if user has required role(s)
- **Status**: Defined but not currently used in routes

---

## Utilities

### 6. **utils/emailValidator.js** - Email Validation
- **Location**: `dashboard-backend/utils/emailValidator.js`
- **Functions**:
  - `validateStudentEmail()`: Validates `student[8-digits]@college.edu`
  - `validateFacultyEmail()`: Validates `faculty[name]@college.edu` (any name, case-insensitive)
  - `validateEmail()`: Main validator that routes to appropriate function
- **Returns**: `{ isValid: boolean, error: string, rollNo?: string }`

### 7. **utils/passwordValidator.js** - Password Validation
- **Location**: `dashboard-backend/utils/passwordValidator.js`
- **Requirements**:
  - Minimum 8 characters
  - At least one uppercase letter (A-Z)
  - At least one lowercase letter (a-z)
  - At least one number (0-9)
  - At least one special character (!@#$%^&*)
- **Returns**: `{ isValid: boolean, errors: string[] }`

---

## Data Models

### 8. **models/User.js** - User Schema
- **Location**: `dashboard-backend/models/User.js`
- **Fields**:
  - `email` (String, unique, required)
  - `password` (String, hashed, required)
  - `name` (String, required)
  - `role` (String: 'student', 'faculty', 'admin')
  - `department` (String, default: 'AI&DS')
  - `isActive` (Boolean, default: true)
  - `timestamps` (createdAt, updatedAt)
- **Methods**: `comparePassword()`
- **Status**: Defined but not used in current auth flow

### 9. **models/Student.js** - Student Schema
- **Location**: `dashboard-backend/models/Student.js`
- **Fields**:
  - `name` (String, required)
  - `rollNo` (String, unique, required)
  - `collegeEmail` (String, unique, required)
  - `personalEmail` (String, required)
  - `phone` (String, required)
  - `abcId` (String, required)
  - `incomeCertNo` (String, required)
  - `year` (String: '1st', '2nd', '3rd', '4th')
  - `department` (String, default: 'AI&DS')
  - `timestamps`

### 10. **models/Certification.js** - Certification Schema
- **Location**: `dashboard-backend/models/Certification.js`
- **Fields**:
  - `studentId` (ObjectId, ref: Student)
  - `name` (String, required)
  - `rollNo` (String, required)
  - `cert` (String, required)
  - `status` (String: 'Pending', 'Accepted', 'Rejected')
  - `remarks` (String)
  - `year` (String: '1st', '2nd', '3rd', '4th')
  - `certificateFile` (String - file path)
  - `timestamps`

### 11. **models/Internship.js** - Internship Schema
- **Location**: `dashboard-backend/models/Internship.js`
- **Fields**:
  - `studentId` (ObjectId, ref: Student)
  - `rollNo` (String, required)
  - `name` (String, required)
  - `type` (String: 'Internship', 'Leave')
  - `reason` (String, required)
  - `parentPhone` (String, required)
  - `photocopy` (String - file path)
  - `sentToParent` (Boolean, default: false)
  - `year` (String: '1st', '2nd', '3rd', '4th')
  - `timestamps`

### 12. **models/Marks.js** - Marks Schema
- **Location**: `dashboard-backend/models/Marks.js`
- **Fields**:
  - `rollNo` (String, required)
  - `name` (String, required)
  - `internal1` (Number: 0-20)
  - `internal2` (Number: 0-20)
  - `totalMark` (Number: 0-100)
  - `semester` (String, required)
  - `grade` (String: 'A+', 'A', 'B', 'C', 'D', 'F')
  - `markSheetUploaded` (Boolean, default: false)
  - `year` (String: '1st', '2nd', '3rd', '4th')
  - `timestamps`

### 13. **models/HallAssignment.js** - Hall Assignment Schema
- **Location**: `dashboard-backend/models/HallAssignment.js`
- **Fields**:
  - `rollNo` (String, required)
  - `name` (String, required)
  - `year` (String: '1st', '2nd', '3rd', '4th')
  - `block` (String, required)
  - `hallNo` (String, required)
  - `seatNo` (String, required)
  - `examName` (String, required)
  - `examDate` (Date, required)
  - `duration` (String, required)
  - `department` (String, default: 'AI&DS')
  - `timestamps`

### 14. **models/ExamSchedule.js** - Exam Schedule (Mock Data)
- **Location**: `dashboard-backend/models/ExamSchedule.js`
- **Status**: Currently uses in-memory mock data (not MongoDB)
- **Mock Data Structure**:
  - `id`, `date`, `day`, `courseName`, `timing`, `duration`, `semester`, `year`
- **Mock Hall Assignments**:
  - `id`, `rollNo`, `name`, `year`, `block`, `hallNo`, `seatNo`, `examName`, `examDate`, `duration`
- **Exported Functions**:
  - `getSchedules(year, semester)`
  - `getHallAssignments(year)`
  - `addSchedule()`, `updateSchedule()`, `deleteSchedule()`
  - `addHallAssignment()`, `updateHallAssignment()`, `deleteHallAssignment()`

### 15. **models/Notice.js** - Notice Schema
- **Location**: `dashboard-backend/models/Notice.js`
- **Fields**:
  - `title` (String, required)
  - `content` (String, required)
  - `author` (String, required)
  - `priority` (String: 'low', 'medium', 'high')
  - `type` (String: 'department', 'college', 'general')
  - `department` (String, default: 'AI&DS')
  - `isActive` (Boolean, default: true)
  - `timestamps`

---

## Key Issues & Gaps

1. **Database Not Connected**: `connectDB()` is defined but not called in `server.js`
2. **File-Based Auth**: Currently uses `credentials.json` instead of database
3. **No Routes for Models**: Models are defined but no API routes exist for:
   - Student data retrieval
   - Certification management
   - Internship management
   - Marks retrieval
   - Hall assignments
   - Notices
4. **Mock Data**: ExamSchedule uses in-memory mock data instead of MongoDB
5. **No File Upload Handling**: Multer is installed but not configured
6. **No Error Handling**: Limited error handling in routes
7. **Middleware Not Used**: Auth middleware defined but not applied to routes

---

## Environment Variables Needed

```
PORT=5003
MONGODB_URI=mongodb://localhost:27017/eduinsight
JWT_SECRET=your-secret-key
```

---

## Next Steps to Complete Backend

1. Connect MongoDB in `server.js`
2. Create API routes for all models
3. Implement file upload handling with multer
4. Add proper error handling and validation
5. Migrate from file-based credentials to database
6. Add role-based access control to routes
7. Implement pagination for list endpoints
8. Add search and filter functionality
