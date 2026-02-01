import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DepartmentDetails from './pages/DepartmentDetails'
import ExamDetails from './pages/ExamDetails'
import NoticeBoard from './pages/NoticeBoard'
import Settings from './pages/Settings'
import StudentDashboard from './pages/StudentDashboard'
import StudentDepartmentDetails from './pages/StudentDepartmentDetails'
import StudentExamDetails from './pages/StudentExamDetails'
import StudentTicket from './pages/StudentTicket'
import StudentNoticeBoard from './pages/StudentNoticeBoard'
import FacultyTicket from './pages/FacultyTicket'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('userRole')
    
    if (token) {
      setIsAuthenticated(true)
      setUserRole(role)
    }
  }, [])

  const handleLogin = (token, role, email) => {
    localStorage.setItem('token', token)
    localStorage.setItem('userRole', role)
    localStorage.setItem('userEmail', email)
    setIsAuthenticated(true)
    setUserRole(role)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    setIsAuthenticated(false)
    setUserRole(null)
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to={userRole === 'faculty' ? "/faculty-dashboard" : "/student-dashboard"} />} 
        />
        
        {/* Faculty Routes */}
        <Route 
          path="/faculty-dashboard" 
          element={isAuthenticated && userRole === 'faculty' ? <Dashboard onLogout={handleLogout} userRole="faculty" /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/department-details" 
          element={isAuthenticated && userRole === 'faculty' ? <DepartmentDetails onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/exam-details" 
          element={isAuthenticated && userRole === 'faculty' ? <ExamDetails onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/faculty-ticket" 
          element={isAuthenticated && userRole === 'faculty' ? <FacultyTicket onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/notice-board" 
          element={isAuthenticated && userRole === 'faculty' ? <NoticeBoard onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        
        {/* Student Routes */}
        <Route 
          path="/student-dashboard" 
          element={isAuthenticated && userRole === 'student' ? <StudentDashboard onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/student-department-details" 
          element={isAuthenticated && userRole === 'student' ? <StudentDepartmentDetails onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/student-exam-details" 
          element={isAuthenticated && userRole === 'student' ? <StudentExamDetails onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/student-ticket" 
          element={isAuthenticated && userRole === 'student' ? <StudentTicket onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/student-notice-board" 
          element={isAuthenticated && userRole === 'student' ? <StudentNoticeBoard onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        
        {/* Settings */}
        <Route 
          path="/settings" 
          element={isAuthenticated ? <Settings onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        
        <Route path="/" element={<Navigate to={isAuthenticated ? (userRole === 'faculty' ? "/faculty-dashboard" : "/student-dashboard") : "/login"} />} />
      </Routes>
    </Router>
  )
}

export default App
