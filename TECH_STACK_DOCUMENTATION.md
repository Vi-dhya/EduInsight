# EduInsight - Complete Tech Stack Documentation

## Project Overview
EduInsight is a Department Analytical Dashboard for educational institutions with role-based access (Faculty & Students), real-time data management, and comprehensive analytics.

---

## Frontend Tech Stack

### Core Framework
- **React 18.x**
  - Purpose: UI library for building interactive user interfaces
  - Used for: Component-based architecture, state management, hooks

- **Vite**
  - Purpose: Modern build tool and development server
  - Used for: Fast development server, optimized production builds, HMR (Hot Module Replacement)

- **React Router v6**
  - Purpose: Client-side routing library
  - Used for: Navigation between pages, protected routes, role-based routing

### Styling & UI
- **Tailwind CSS**
  - Purpose: Utility-first CSS framework
  - Used for: Responsive design, dark theme, gradient effects, component styling

- **Lucide React**
  - Purpose: Icon library
  - Used for: UI icons (Menu, Bell, Settings, Lock, Mail, etc.)

### Data Visualization
- **Recharts**
  - Purpose: React charting library
  - Used for: Pie charts, bar charts, analytics visualization

### HTTP Client
- **Axios**
  - Purpose: Promise-based HTTP client
  - Used for: API requests to backend, JWT token handling, error handling

### State Management
- **React Hooks (useState, useEffect, useContext)**
  - Purpose: Built-in React state management
  - Used for: Component state, side effects, local storage management

### Storage
- **LocalStorage API**
  - Purpose: Browser storage
  - Used for: Storing JWT tokens, user email, user role, app settings

---

## Backend Tech Stack

### Runtime & Framework
- **Node.js**
  - Purpose: JavaScript runtime for server-side execution
  - Used for: Running backend server

- **Express.js**
  - Purpose: Minimalist web framework
  - Used for: HTTP server, routing, middleware, API endpoints

### Database
- **MongoDB**
  - Purpose: NoSQL document database
  - Used for: Storing notices, certifications, internships, exam schedules, marks, hall assignments, tickets

- **Mongoose**
  - Purpose: MongoDB object modeling
  - Used for: Schema definition, data validation, database queries

### Authentication & Security
- **JWT (JSON Web Tokens)**
  - Purpose: Stateless authentication
  - Used for: User authentication, token generation, protected routes

- **jsonwebtoken (npm package)**
  - Purpose: JWT creation and verification
  - Used for: Generating tokens on login, verifying tokens on protected routes

### Middleware
- **CORS (Cross-Origin Resource Sharing)**
  - Purpose: Enable cross-origin requests
  - Used for: Allow frontend (port 3006) to communicate with backend (port 5005)

- **Express JSON Parser**
  - Purpose: Parse JSON request bodies
  - Used for: Handling JSON payloads in API requests

### Environment Management
- **dotenv**
  - Purpose: Load environment variables
  - Used for: Managing PORT, JWT_SECRET, database connection strings

### File Handling
- **Multer**
  - Purpose: Middleware for file uploads
  - Used for: Handling certificate, internship, schedule, marks file uploads

- **Express Static**
  - Purpose: Serve static files
  - Used for: Serving uploaded files from /uploads directory

### Validation
- **Custom Validators**
  - Email Validator: Validates student and faculty email formats
  - Password Validator: Validates password requirements (8+ characters)

---

## Database Schema (MongoDB)

### Collections

1. **Students**
   - Fields: name, rollNo, email, year, department, dob, bloodGroup, fatherName, motherName, address, photo

2. **Certifications**
   - Fields: studentId, title, issuer, issueDate, expiryDate, status, year

3. **Internships**
   - Fields: studentId, company, position, startDate, endDate, status, year

4. **ExamSchedules**
   - Fields: subject, date, time, duration, year, semester, department

5. **HallAssignments**
   - Fields: studentId, hallNo, seatNo, examDate, year

6. **Marks**
   - Fields: studentId, subject, marks, totalMarks, semester, year

7. **Notices**
   - Fields: title, content, author, priority, type, department, isActive, timestamps

8. **Tickets**
   - Fields: studentId, subject, description, status, messages, createdAt, updatedAt

---

## API Architecture

### Authentication Routes
- `POST /auth/login` - User login with email and password

### API Routes (Protected with JWT)
- `/api/dashboard/*` - Dashboard analytics
- `/api/department/*` - Student and certification management
- `/api/exam/*` - Exam schedules, hall assignments, marks
- `/api/notices/*` - Notice board management
- `/api/tickets/*` - Support ticket system
- `/api/files/*` - File upload and download

---

## Development Tools

### Package Managers
- **npm**
  - Purpose: Node package manager
  - Used for: Installing and managing dependencies

### Version Control
- **Git**
  - Purpose: Version control system
  - Used for: Code repository management

### Code Editor
- **VS Code**
  - Purpose: Code editor
  - Used for: Development environment

---

## Project Structure

```
EduInsight/
├── dashboard-frontend/          # React frontend
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Page components
│   │   ├── services/            # API service layer
│   │   ├── utils/               # Utility functions
│   │   └── App.jsx              # Main app component
│   ├── package.json
│   └── vite.config.js
│
├── dashboard-backend/           # Express backend
│   ├── routes/                  # API routes
│   ├── models/                  # Mongoose schemas
│   ├── middleware/              # Custom middleware
│   ├── utils/                   # Validators
│   ├── config/                  # Database config
│   ├── credentials.json         # User credentials
│   ├── server.js                # Main server file
│   └── package.json
│
└── node_modules/                # Dependencies
```

---

## Key Features & Technology Mapping

| Feature | Technology |
|---------|-----------|
| User Authentication | JWT + Express Middleware |
| Role-Based Access | JWT Claims + React Router |
| Real-time Data Display | React Hooks + Axios |
| Analytics Charts | Recharts |
| Responsive Design | Tailwind CSS |
| Data Persistence | MongoDB + Mongoose |
| File Uploads | Multer |
| API Communication | Axios + Express |
| State Management | React Hooks + LocalStorage |
| Routing | React Router v6 |
| Icons | Lucide React |
| Build Tool | Vite |

---

## Deployment Architecture

### Frontend
- **Development**: Vite dev server (port 3006)
- **Production**: Static files served by web server

### Backend
- **Development**: Node.js + Express (port 5005)
- **Production**: Node.js + Express on server

### Database
- **Development**: Local MongoDB (localhost:27017)
- **Production**: MongoDB Atlas (cloud)

---

## Security Features

1. **JWT Authentication**
   - Stateless authentication
   - Token expiration (24 hours)
   - Secure token storage in localStorage

2. **Password Validation**
   - Minimum 8 characters
   - Backend validation before credential check

3. **Email Validation**
   - Student: `student[8-digits]@college.edu`
   - Faculty: `faculty[name]@college.edu`

4. **CORS Protection**
   - Restricted to frontend origin

5. **Role-Based Access Control**
   - Faculty-only routes
   - Student-only routes
   - Protected API endpoints

---

## Performance Optimizations

1. **Vite**
   - Fast build times
   - Code splitting
   - Lazy loading

2. **React**
   - Component memoization
   - Efficient re-renders
   - Hooks optimization

3. **Tailwind CSS**
   - Utility-first approach
   - Minimal CSS bundle
   - PurgeCSS for production

4. **MongoDB**
   - Indexed queries
   - Efficient data retrieval
   - Soft delete for data preservation

---

## Dependencies Summary

### Frontend Dependencies
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "recharts": "^2.x",
  "lucide-react": "^0.x",
  "tailwindcss": "^3.x"
}
```

### Backend Dependencies
```json
{
  "express": "^4.x",
  "mongoose": "^7.x",
  "jsonwebtoken": "^9.x",
  "cors": "^2.x",
  "dotenv": "^16.x",
  "multer": "^1.x"
}
```

---

## Development Workflow

1. **Frontend Development**
   - Run: `npm run dev` in dashboard-frontend
   - Access: http://localhost:3006

2. **Backend Development**
   - Run: `npm start` in dashboard-backend
   - Access: http://localhost:5005

3. **Database**
   - MongoDB running locally or Atlas cloud

4. **Testing**
   - Manual testing through UI
   - API testing with curl/Postman

---

## Scalability Considerations

1. **Database**: MongoDB Atlas for cloud scaling
2. **Frontend**: CDN for static file distribution
3. **Backend**: Horizontal scaling with load balancer
4. **Caching**: Redis for session management
5. **API Rate Limiting**: Prevent abuse
6. **Monitoring**: Error tracking and analytics

---

## Future Enhancement Opportunities

1. **Real-time Updates**: WebSocket for live notifications
2. **Email Notifications**: Nodemailer for email alerts
3. **Advanced Analytics**: Data visualization dashboards
4. **Mobile App**: React Native for mobile
5. **Payment Integration**: Stripe for fees
6. **AI/ML**: Predictive analytics
7. **Microservices**: Break into smaller services
8. **Docker**: Containerization for deployment

---

## Conclusion

EduInsight uses a modern, scalable tech stack with:
- **Frontend**: React + Vite + Tailwind for responsive UI
- **Backend**: Express + MongoDB for robust API
- **Security**: JWT for authentication
- **Performance**: Optimized build tools and efficient queries
- **Maintainability**: Clean architecture and modular code

This stack is production-ready and can be easily extended for future requirements.
