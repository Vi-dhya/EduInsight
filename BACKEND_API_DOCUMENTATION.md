# Backend API Documentation

## Base URL
```
http://localhost:5003
```

## Authentication
All endpoints (except `/auth/login`) require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 1. Authentication Routes (`/auth`)

### Login
**POST** `/auth/login`

Request body:
```json
{
  "email": "student12345678@college.edu",
  "password": "Password@123"
}
```

Response:
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

## 2. Dashboard Routes (`/api/dashboard`)

### Get Dashboard Analytics
**GET** `/api/dashboard/analytics?year=2nd&department=AI&DS`

Query Parameters:
- `year` (optional): Filter by year (1st, 2nd, 3rd, 4th)
- `department` (optional): Filter by department

Response:
```json
{
  "studentCounts": {
    "1st": 50,
    "2nd": 45,
    "3rd": 40,
    "4th": 35
  },
  "passFailData": {
    "passed": 40,
    "failed": 5
  },
  "certificationData": {
    "accepted": 20,
    "pending": 15,
    "rejected": 5
  },
  "recentNotices": [...],
  "overallStats": {
    "totalStudents": 170,
    "totalCertifications": 150,
    "totalInternships": 80,
    "totalNotices": 25
  }
}
```

### Get Year Statistics
**GET** `/api/dashboard/year-stats/:year?department=AI&DS`

Path Parameters:
- `year`: Year (1st, 2nd, 3rd, 4th)

Query Parameters:
- `department` (optional): Filter by department

Response:
```json
{
  "year": "2nd",
  "studentCount": 45,
  "marksStats": {
    "totalStudents": 45,
    "averageMarks": 75.5,
    "highestMarks": 95,
    "lowestMarks": 45,
    "passed": 40,
    "failed": 5
  },
  "certificationStats": {
    "accepted": 20,
    "pending": 15,
    "rejected": 5
  },
  "internshipStats": {
    "internship": 30,
    "leave": 10
  }
}
```

---

## 3. Department Routes (`/api/department`)

### Get Students
**GET** `/api/department/students?year=2nd&department=AI&DS`

Query Parameters:
- `year` (optional): Filter by year
- `department` (optional): Filter by department

Response:
```json
{
  "count": 45,
  "students": [
    {
      "_id": "...",
      "name": "Raj Kumar",
      "rollNo": "23102060",
      "collegeEmail": "student23102060@college.edu",
      "personalEmail": "raj@gmail.com",
      "phone": "9876543210",
      "abcId": "ABC123456",
      "incomeCertNo": "IC2024001",
      "year": "2nd",
      "department": "AI&DS"
    }
  ]
}
```

### Add Student
**POST** `/api/department/students`

Request body:
```json
{
  "name": "Raj Kumar",
  "rollNo": "23102060",
  "collegeEmail": "student23102060@college.edu",
  "personalEmail": "raj@gmail.com",
  "phone": "9876543210",
  "abcId": "ABC123456",
  "incomeCertNo": "IC2024001",
  "year": "2nd",
  "department": "AI&DS"
}
```

### Update Student
**PUT** `/api/department/students/:id`

Request body: (same as Add Student, partial update allowed)

### Delete Student
**DELETE** `/api/department/students/:id`

### Get Student Count
**GET** `/api/department/students/count?year=2nd&department=AI&DS`

Response:
```json
{
  "count": 45
}
```

### Get Certifications
**GET** `/api/department/certifications?year=2nd`

Query Parameters:
- `year` (optional): Filter by year

Response:
```json
{
  "count": 40,
  "certifications": [
    {
      "_id": "...",
      "studentId": {
        "_id": "...",
        "name": "Raj Kumar",
        "rollNo": "23102060"
      },
      "name": "Raj Kumar",
      "rollNo": "23102060",
      "cert": "AWS Certified Solutions Architect",
      "status": "Accepted",
      "remarks": "Valid certification",
      "year": "2nd",
      "certificateFile": "path/to/file.pdf"
    }
  ]
}
```

### Add Certification
**POST** `/api/department/certifications`

Request body:
```json
{
  "studentId": "student_id",
  "name": "Raj Kumar",
  "rollNo": "23102060",
  "cert": "AWS Certified Solutions Architect",
  "status": "Pending",
  "remarks": "Under review",
  "year": "2nd",
  "certificateFile": "path/to/file.pdf"
}
```

### Update Certification Status
**PUT** `/api/department/certifications/:id`

Request body:
```json
{
  "status": "Accepted",
  "remarks": "Valid certification"
}
```

### Get Certification Statistics
**GET** `/api/department/certifications/stats?year=2nd`

Response:
```json
{
  "total": 40,
  "accepted": 25,
  "pending": 10,
  "rejected": 5
}
```

### Get Internships
**GET** `/api/department/internships?year=2nd`

Query Parameters:
- `year` (optional): Filter by year

Response:
```json
{
  "count": 30,
  "internships": [
    {
      "_id": "...",
      "studentId": {
        "_id": "...",
        "name": "Raj Kumar",
        "rollNo": "23102060"
      },
      "rollNo": "23102060",
      "name": "Raj Kumar",
      "type": "Internship",
      "reason": "Skill development in cloud technologies",
      "parentPhone": "9876543200",
      "photocopy": "path/to/file.pdf",
      "sentToParent": false,
      "year": "2nd"
    }
  ]
}
```

### Add Internship
**POST** `/api/department/internships`

Request body:
```json
{
  "studentId": "student_id",
  "rollNo": "23102060",
  "name": "Raj Kumar",
  "type": "Internship",
  "reason": "Skill development in cloud technologies",
  "parentPhone": "9876543200",
  "photocopy": "path/to/file.pdf",
  "year": "2nd"
}
```

### Send Internship to Parent
**POST** `/api/department/internships/:id/send-to-parent`

Response:
```json
{
  "message": "Sent to parent successfully",
  "internship": {...}
}
```

---

## 4. Exam Routes (`/api/exam`)

### Get Exam Schedules
**GET** `/api/exam/schedules?year=2nd&semester=4th&department=AI&DS`

Query Parameters:
- `year` (optional): Filter by year
- `semester` (optional): Filter by semester
- `department` (optional): Filter by department

Response:
```json
[
  {
    "_id": "...",
    "date": "2024-02-15",
    "day": "Thursday",
    "courseName": "Data Structures",
    "timing": "10:00 AM - 1:00 PM",
    "duration": "3 hours",
    "semester": "4th",
    "year": "2nd",
    "department": "AI&DS"
  }
]
```

### Add Exam Schedule
**POST** `/api/exam/schedules`

Request body:
```json
{
  "date": "2024-02-15",
  "day": "Thursday",
  "courseName": "Data Structures",
  "timing": "10:00 AM - 1:00 PM",
  "duration": "3 hours",
  "semester": "4th",
  "year": "2nd",
  "department": "AI&DS"
}
```

### Update Exam Schedule
**PUT** `/api/exam/schedules/:id`

Request body: (same as Add, partial update allowed)

### Delete Exam Schedule
**DELETE** `/api/exam/schedules/:id`

### Get Hall Assignments
**GET** `/api/exam/hall-assignments?year=2nd`

Query Parameters:
- `year` (optional): Filter by year

Response:
```json
[
  {
    "_id": "...",
    "rollNo": "23102060",
    "name": "Raj Kumar",
    "year": "2nd",
    "block": "A",
    "hallNo": "A-101",
    "seatNo": "15",
    "examName": "Data Structures",
    "examDate": "2024-02-15",
    "duration": "3 hours",
    "department": "AI&DS"
  }
]
```

### Add Hall Assignment
**POST** `/api/exam/hall-assignments`

Request body:
```json
{
  "rollNo": "23102060",
  "name": "Raj Kumar",
  "year": "2nd",
  "block": "A",
  "hallNo": "A-101",
  "seatNo": "15",
  "examName": "Data Structures",
  "examDate": "2024-02-15",
  "duration": "3 hours",
  "department": "AI&DS"
}
```

### Update Hall Assignment
**PUT** `/api/exam/hall-assignments/:id`

Request body: (same as Add, partial update allowed)

### Delete Hall Assignment
**DELETE** `/api/exam/hall-assignments/:id`

### Get Marks
**GET** `/api/exam/marks?year=2nd&semester=4th`

Query Parameters:
- `year` (optional): Filter by year
- `semester` (optional): Filter by semester

Response:
```json
[
  {
    "_id": "...",
    "rollNo": "23102060",
    "name": "Raj Kumar",
    "internal1": 18,
    "internal2": 19,
    "totalMark": 85,
    "semester": "4th",
    "grade": "A",
    "markSheetUploaded": false,
    "year": "2nd"
  }
]
```

### Add Marks
**POST** `/api/exam/marks`

Request body:
```json
{
  "rollNo": "23102060",
  "name": "Raj Kumar",
  "internal1": 18,
  "internal2": 19,
  "totalMark": 85,
  "semester": "4th",
  "year": "2nd"
}
```

Grade is calculated automatically based on totalMark:
- 90+ = A+
- 80-89 = A
- 70-79 = B
- 60-69 = C
- 50-59 = D
- <50 = F

### Update Marks
**PUT** `/api/exam/marks/:id`

Request body: (same as Add, partial update allowed)

### Delete Marks
**DELETE** `/api/exam/marks/:id`

### Get Marks Statistics
**GET** `/api/exam/marks/stats?year=2nd`

Query Parameters:
- `year` (optional): Filter by year

Response:
```json
{
  "total": 45,
  "passed": 40,
  "failed": 5,
  "passPercentage": "88.89",
  "failPercentage": "11.11",
  "gradeDistribution": {
    "A+": 5,
    "A": 15,
    "B": 15,
    "C": 5,
    "F": 5
  }
}
```

---

## 5. File Routes (`/api/files`)

### Upload Certificate
**POST** `/api/files/upload-certificate`

Form Data:
- `file`: Certificate file (PDF, DOC, DOCX, JPG, PNG)

Response:
```json
{
  "message": "Certificate uploaded successfully",
  "file": {
    "filename": "1234567890-certificate.pdf",
    "originalName": "certificate.pdf",
    "size": 102400,
    "path": "/uploads/1234567890-certificate.pdf"
  }
}
```

### Upload Internship Document
**POST** `/api/files/upload-internship`

Form Data:
- `file`: Internship document

Response: (same as Upload Certificate)

### Upload Exam Schedule
**POST** `/api/files/upload-schedule`

Form Data:
- `file`: Schedule file

Response: (same as Upload Certificate)

### Upload Marks
**POST** `/api/files/upload-marks`

Form Data:
- `file`: Marks file

Response: (same as Upload Certificate)

### Download File
**GET** `/api/files/download/:filename`

Downloads the file from uploads folder

---

## 6. Notice Routes (`/api/notices`)

### Get Notices
**GET** `/api/notices?type=department&department=AI&DS`

Query Parameters:
- `type` (optional): Filter by type (department, college, general)
- `department` (optional): Filter by department

Response:
```json
[
  {
    "_id": "...",
    "title": "Exam Schedule Released",
    "content": "The exam schedule for 2nd year has been released...",
    "author": "Dr. Faculty Name",
    "priority": "high",
    "type": "department",
    "department": "AI&DS",
    "isActive": true,
    "createdAt": "2024-02-01T10:00:00Z",
    "updatedAt": "2024-02-01T10:00:00Z"
  }
]
```

### Get Notice by ID
**GET** `/api/notices/:id`

Response: (single notice object)

### Add Notice (Faculty/Admin only)
**POST** `/api/notices`

Request body:
```json
{
  "title": "Exam Schedule Released",
  "content": "The exam schedule for 2nd year has been released...",
  "priority": "high",
  "type": "department",
  "department": "AI&DS"
}
```

Author is automatically set from the logged-in user.

### Update Notice (Faculty/Admin only)
**PUT** `/api/notices/:id`

Request body: (same as Add, partial update allowed)

### Delete Notice (Faculty/Admin only)
**DELETE** `/api/notices/:id`

Soft delete - sets isActive to false

### Get Notice Count
**GET** `/api/notices/count?type=department&department=AI&DS`

Response:
```json
{
  "count": 15
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

Common HTTP Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Server Error

---

## Example Usage

### Login
```bash
curl -X POST http://localhost:5003/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student12345678@college.edu",
    "password": "Password@123"
  }'
```

### Get Dashboard Analytics (with token)
```bash
curl -X GET "http://localhost:5003/api/dashboard/analytics?year=2nd" \
  -H "Authorization: Bearer <token>"
```

### Add Student
```bash
curl -X POST http://localhost:5003/api/department/students \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Raj Kumar",
    "rollNo": "23102060",
    "collegeEmail": "student23102060@college.edu",
    "personalEmail": "raj@gmail.com",
    "phone": "9876543210",
    "abcId": "ABC123456",
    "incomeCertNo": "IC2024001",
    "year": "2nd",
    "department": "AI&DS"
  }'
```

---

## Notes

1. All timestamps are in ISO 8601 format (UTC)
2. File uploads are stored in `dashboard-backend/uploads/` directory
3. JWT tokens expire after 24 hours
4. Role-based access control is enforced on certain endpoints
5. Soft deletes are used for notices (not permanently deleted)
