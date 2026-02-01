# Complete EduInsight Dashboard Application Guide

## Application Overview

EduInsight is a comprehensive educational dashboard system with role-based access for Faculty and Students. The application provides complete management of academic information including exams, marks, certifications, internships, and communication.

---

## System Architecture

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Port:** 3002

### Backend
- **Framework:** Express.js
- **Runtime:** Node.js
- **Authentication:** JWT
- **Port:** 5003
- **Credentials:** JSON file-based

---

## User Roles & Access

### 1. Faculty Role
**Email Format:** `faculty[department]@college.edu`
**Example:** `facultyaids@college.edu`

**Dashboard Access:**
- Faculty Dashboard (Main)
- Department Details (with year filter)
- Exam Details (with year filter)
- Notice Board (with year filter)

**Features:**
- View all students by year
- View certifications with approval/rejection
- View internships
- View exam schedules
- View hall assignments
- View student marks
- Post notices to students
- Manage student data

### 2. Student Role
**Email Format:** `student[8-digits]@college.edu`
**Example:** `student23102060@college.edu`

**Dashboard Access:**
- Student Dashboard (Profile)
- Student Details (Certifications & Internships)
- Exam Details (Personal)
- Notice Board (Faculty notices + Send to faculty)

**Features:**
- View personal profile
- Upload certificates
- View internship records
- View exam schedule
- Check hall allocation
- View marks and grades
- Track arrear courses
- View faculty notices
- Send notices to faculty

---

## Authentication

### Email Validation
- **Student:** `student[exactly 8 digits]@college.edu`
- **Faculty:** `faculty[department name]@college.edu`
- Role automatically detected from email prefix

### Password Validation
- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)
- At least 1 special character (!@#$%^&*)

### Test Credentials

**Faculty:**
```
Email: facultyaids@college.edu
Password: Faculty@123
```

**Students:**
```
Email: student23102060@college.edu
Password: Student@123

Email: student23102061@college.edu
Password: Student@456

Email: student23102062@college.edu
Password: Student@789
```

---

## Application Routes

### Faculty Routes
| Route | Component | Purpose |
|-------|-----------|---------|
| `/faculty-dashboard` | Dashboard.jsx | Main faculty dashboard |
| `/department-details` | DepartmentDetails.jsx | View students, certs, internships |
| `/exam-details` | ExamDetails.jsx | View exam schedule, halls, marks |
| `/notice-board` | NoticeBoard.jsx | Post notices to students |

### Student Routes
| Route | Component | Purpose |
|-------|-----------|---------|
| `/student-dashboard` | StudentDashboard.jsx | Student profile view |
| `/student-department-details` | StudentDepartmentDetails.jsx | Certs & internships |
| `/student-exam-details` | StudentExamDetails.jsx | Exam info & marks |
| `/student-notice-board` | StudentNoticeBoard.jsx | Faculty notices & send |

### Common Routes
| Route | Component | Purpose |
|-------|-----------|---------|
| `/login` | Login.jsx | Authentication |
| `/settings` | Settings.jsx | User settings |
| `/` | App.jsx | Root redirect |

---

## Faculty Dashboard Features

### 1. Dashboard
- Welcome message
- Department analytics
- College news and achievements
- Priority badges for announcements

### 2. Department Details
**Tabs:**
- **Student Details:** Name, email, phone, year
- **Certifications:** Certificate name, issuer, status, remarks
- **Internships:** Company, position, status, remarks

**Features:**
- Year dropdown filter (2nd, 3rd, 4th)
- View all students in department
- Track certification approvals
- Monitor internship placements

### 3. Exam Details
**Tabs:**
- **Exam Schedule:** Course, date, time, duration
- **Hall Assignments:** Roll no, name, block, hall, seat
- **Marks:** Course, internal scores, total, grade, status

**Features:**
- Year dropdown filter
- View exam timetable
- Manage hall allocations
- Track student performance

### 4. Notice Board
**Features:**
- Post notices with title and description
- Set priority (High/Medium/Low)
- Filter by year
- Delete notices
- View all posted notices

---

## Student Dashboard Features

### 1. Student Dashboard (Profile)
**Displays:**
- Student photo
- Name and roll number
- Date of birth
- Blood group
- Father's and mother's names
- Email and phone
- Address
- Year and department

### 2. Student Details
**Certifications Tab:**
- View uploaded certificates
- Certificate name, issuer, date
- Status (Accepted/Rejected/Pending)
- Faculty remarks
- Upload new certificates

**Internships Tab:**
- View internship records
- Company, position, dates
- Status (Completed/Ongoing)
- Remarks

### 3. Exam Details
**Exam Schedule Tab:**
- View exam dates and times
- Course names
- Duration

**Hall & Seat Tab:**
- Roll number and name
- Block and hall assignment
- Seat number
- Reporting time

**Marks Tab:**
- Course-wise marks
- Internal 1 and 2 scores
- Total score
- Grade
- Pass/Arrear status
- Upload marksheet

**Arrears Tab:**
- Failed courses
- Semester information
- Retake exam option

### 4. Notice Board
**Faculty Notices:**
- View all notices from faculty
- Priority indicators
- Sender information
- Date posted

**My Notices:**
- Send notices to faculty
- Set priority level
- Track status (Pending/Replied/Resolved)
- Delete sent notices

---

## File Structure

```
dashboard-frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx (Faculty)
│   │   ├── DepartmentDetails.jsx
│   │   ├── ExamDetails.jsx
│   │   ├── NoticeBoard.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── StudentDepartmentDetails.jsx
│   │   ├── StudentExamDetails.jsx
│   │   ├── StudentNoticeBoard.jsx
│   │   └── Settings.jsx
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── SimplifiedHeader.jsx
│   │   ├── YearDropdown.jsx
│   │   └── Logo.jsx
│   ├── utils/
│   │   ├── emailValidator.js
│   │   └── passwordValidator.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html

dashboard-backend/
├── routes/
│   ├── auth.js
│   ├── dashboard.js
│   ├── department.js
│   ├── exam.js
│   ├── notice.js
│   └── files.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Student.js
│   ├── User.js
│   ├── Certification.js
│   ├── Internship.js
│   ├── ExamSchedule.js
│   ├── HallAssignment.js
│   ├── Marks.js
│   └── Notice.js
├── utils/
│   ├── emailValidator.js
│   └── passwordValidator.js
├── config/
│   └── database.js
├── credentials.json
├── server.js
├── package.json
└── .env
```

---

## How to Run

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup
```bash
cd dashboard-backend
npm install
npm start
```
Backend runs on `http://localhost:5003`

### Frontend Setup
```bash
cd dashboard-frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3002`

### Access Application
Open browser and navigate to: `http://localhost:3002`

---

## Login Flow

1. User enters email and password
2. Email format validated (student or faculty)
3. Password strength validated
4. Credentials checked against credentials.json
5. JWT token generated
6. Role determined from email prefix
7. User redirected to appropriate dashboard

---

## Key Features

### Security
✓ Email format validation
✓ Strong password requirements
✓ JWT authentication
✓ Role-based access control
✓ Protected routes

### User Experience
✓ Real-time validation feedback
✓ Responsive design
✓ Glass-morphism UI
✓ Gradient backgrounds
✓ Color-coded status indicators
✓ Smooth transitions

### Functionality
✓ File uploads (certificates, marksheets)
✓ Year-based filtering
✓ Status tracking
✓ Priority management
✓ Notice system
✓ Data organization

### Data Management
✓ Student profiles
✓ Certification tracking
✓ Internship records
✓ Exam schedules
✓ Hall allocations
✓ Marks management
✓ Arrear tracking

---

## Customization

### Adding New Features
1. Create new page component in `src/pages/`
2. Add route in `App.jsx`
3. Add menu item in `Sidebar.jsx`
4. Create backend route if needed

### Styling
- Modify `tailwind.config.js` for colors
- Update `index.css` for global styles
- Use Tailwind classes in components

### Validation
- Update `emailValidator.js` for email rules
- Update `passwordValidator.js` for password rules

---

## Troubleshooting

### Frontend won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend won't start
```bash
# Check if port 5003 is in use
# Update PORT in .env if needed
npm start
```

### Login not working
- Verify email format matches pattern
- Check password meets all requirements
- Ensure credentials.json exists
- Check backend is running

### Styling issues
```bash
# Rebuild Tailwind CSS
npm run build
```

---

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Real file storage (AWS S3/Google Cloud)
- Email notifications
- Real-time updates (WebSocket)
- Advanced analytics
- Mobile app
- API documentation
- Unit tests
- Integration tests

---

## Support

For issues or questions:
1. Check error messages in browser console
2. Check backend logs
3. Verify all dependencies are installed
4. Ensure both servers are running
5. Check network connectivity

---

## License

This project is for educational purposes.

---

## Version

**Current Version:** 1.0.0
**Last Updated:** January 2026
