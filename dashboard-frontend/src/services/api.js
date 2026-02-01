const API_BASE_URL = 'http://localhost:5005/api'
const AUTH_BASE_URL = 'http://localhost:5005/auth'

// Get token from localStorage
const getToken = () => localStorage.getItem('token')

// Set default headers with token
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
})

// ============ AUTHENTICATION ============
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${AUTH_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('userEmail', data.user.email)
      localStorage.setItem('userRole', data.user.role)
    }
    return data
  }
}

// ============ DASHBOARD ============
export const dashboardAPI = {
  getAnalytics: async (year, department = 'AI&DS') => {
    const params = new URLSearchParams()
    if (year) params.append('year', year)
    if (department) params.append('department', department)
    
    const response = await fetch(`${API_BASE_URL}/dashboard/analytics?${params}`, {
      headers: getHeaders()
    })
    return response.json()
  },

  getYearStats: async (year, department = 'AI&DS') => {
    const params = new URLSearchParams()
    if (department) params.append('department', department)
    
    const response = await fetch(`${API_BASE_URL}/dashboard/year-stats/${year}?${params}`, {
      headers: getHeaders()
    })
    return response.json()
  }
}

// ============ DEPARTMENT ============
export const departmentAPI = {
  // Students
  getStudents: async (year, department) => {
    const params = new URLSearchParams()
    if (year) params.append('year', year)
    if (department) params.append('department', department)
    
    const response = await fetch(`${API_BASE_URL}/department/students?${params}`, {
      headers: getHeaders()
    })
    return response.json()
  },

  addStudent: async (studentData) => {
    const response = await fetch(`${API_BASE_URL}/department/students`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(studentData)
    })
    return response.json()
  },

  updateStudent: async (id, studentData) => {
    const response = await fetch(`${API_BASE_URL}/department/students/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(studentData)
    })
    return response.json()
  },

  deleteStudent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/department/students/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    })
    return response.json()
  },

  getStudentCount: async (year, department) => {
    const params = new URLSearchParams()
    if (year) params.append('year', year)
    if (department) params.append('department', department)
    
    const response = await fetch(`${API_BASE_URL}/department/students/count?${params}`, {
      headers: getHeaders()
    })
    return response.json()
  },

  // Certifications
  getCertifications: async (year) => {
    const params = new URLSearchParams()
    if (year) params.append('year', year)
    
    const response = await fetch(`${API_BASE_URL}/department/certifications?${params}`, {
      headers: getHeaders()
    })
    return response.json()
  },

  addCertification: async (certData) => {
    const response = await fetch(`${API_BASE_URL}/department/certifications`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(certData)
    })
    return response.json()
  },

  updateCertification: async (id, certData) => {
    const response = await fetch(`${API_BASE_URL}/department/certifications/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(certData)
    })
    return response.json()
  },

  getCertificationStats: async (year) => {
    const params = new URLSearchParams()
    if (year) params.append('year', year)
    
    const response = await fetch(`${API_BASE_URL}/department/certifications/stats?${params}`, {
      headers: getHeaders()
    })
    return response.json()
  },

  // Internships
  getInternships: async (year) => {
    const params = new URLSearchParams()
    if (year) params.append('year', year)
    
    const response = await fetch(`${API_BASE_URL}/department/internships?${params}`, {
      headers: getHeaders()
    })
    return response.json()
  },

  addInternship: async (internshipData) => {
    const response = await fetch(`${API_BASE_URL}/department/internships`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(internshipData)
    })
    return response.json()
  },

  sendToParent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/department/internships/${id}/send-to-parent`, {
      method: 'POST',
      headers: getHeaders()
    })
    return response.json()
  }
}

// ============ EXAM ============
export const examAPI = {
  // Schedules
  getSchedules: async (year, semester, department) => {
    const params = new URLSearchParams()
    if (year) params.append('year', year)
    if (semester) params.append('semester', semester)
    if (department) params.append('department', department)
    
    const response = await fetch(`${API_BASE_URL}/exam/schedules?${params}`, {
      headers: getHeaders()
    })
    return response.json()
  },

  addSchedule: async (scheduleData) => {
    const response = await fetch(`${API_BASE_URL}/exam/schedules`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(scheduleData)
    })
    return response.json()
  },

  updateSchedule: async (id, scheduleData) => {
    const response = await fetch(`${API_BASE_URL}/exam/schedules/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(scheduleData)
    })
    return response.json()
  },

  deleteSchedule: async (id) => {
    const response = await fetch(`${API_BASE_URL}/exam/schedules/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    })
    return response.json()
  },

  // Hall Assignments
  getHallAssignments: async (year) => {
    const params = new URLSearchParams()
    if (year) params.append('year', year)
    
    const response = await fetch(`${API_BASE_URL}/exam/hall-assignments?${params}`, {
      headers: getHeaders()
    })
    return response.json()
  },

  addHallAssignment: async (assignmentData) => {
    const response = await fetch(`${API_BASE_URL}/exam/hall-assignments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(assignmentData)
    })
    return response.json()
  },

  updateHallAssignment: async (id, assignmentData) => {
    const response = await fetch(`${API_BASE_URL}/exam/hall-assignments/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(assignmentData)
    })
    return response.json()
  },

  deleteHallAssignment: async (id) => {
    const response = await fetch(`${API_BASE_URL}/exam/hall-assignments/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    })
    return response.json()
  },

  // Marks
  getMarks: async (year, semester) => {
    const params = new URLSearchParams()
    if (year) params.append('year', year)
    if (semester) params.append('semester', semester)
    
    const response = await fetch(`${API_BASE_URL}/exam/marks?${params}`, {
      headers: getHeaders()
    })
    return response.json()
  },

  addMarks: async (marksData) => {
    const response = await fetch(`${API_BASE_URL}/exam/marks`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(marksData)
    })
    return response.json()
  },

  updateMarks: async (id, marksData) => {
    const response = await fetch(`${API_BASE_URL}/exam/marks/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(marksData)
    })
    return response.json()
  },

  deleteMarks: async (id) => {
    const response = await fetch(`${API_BASE_URL}/exam/marks/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    })
    return response.json()
  },

  getMarksStats: async (year) => {
    const params = new URLSearchParams()
    if (year) params.append('year', year)
    
    const response = await fetch(`${API_BASE_URL}/exam/marks/stats?${params}`, {
      headers: getHeaders()
    })
    return response.json()
  }
}

// ============ FILES ============
export const filesAPI = {
  uploadCertificate: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch(`${API_BASE_URL}/files/upload-certificate`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: formData
    })
    return response.json()
  },

  uploadInternship: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch(`${API_BASE_URL}/files/upload-internship`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: formData
    })
    return response.json()
  },

  uploadSchedule: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch(`${API_BASE_URL}/files/upload-schedule`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: formData
    })
    return response.json()
  },

  uploadMarks: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch(`${API_BASE_URL}/files/upload-marks`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: formData
    })
    return response.json()
  },

  downloadFile: async (filename) => {
    window.open(`${API_BASE_URL}/files/download/${filename}`, '_blank')
  }
}

// ============ NOTICES ============
export const noticesAPI = {
  getNotices: async (type, department) => {
    const params = new URLSearchParams()
    if (type) params.append('type', type)
    if (department) params.append('department', department)
    
    const response = await fetch(`${API_BASE_URL}/notices?${params}`, {
      headers: getHeaders()
    })
    return response.json()
  },

  getNoticeById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/notices/${id}`, {
      headers: getHeaders()
    })
    return response.json()
  },

  addNotice: async (noticeData) => {
    const response = await fetch(`${API_BASE_URL}/notices`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(noticeData)
    })
    return response.json()
  },

  updateNotice: async (id, noticeData) => {
    const response = await fetch(`${API_BASE_URL}/notices/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(noticeData)
    })
    return response.json()
  },

  deleteNotice: async (id) => {
    const response = await fetch(`${API_BASE_URL}/notices/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    })
    return response.json()
  },

  getNoticeCount: async (type, department) => {
    const params = new URLSearchParams()
    if (type) params.append('type', type)
    if (department) params.append('department', department)
    
    const response = await fetch(`${API_BASE_URL}/notices/count?${params}`, {
      headers: getHeaders()
    })
    return response.json()
  }
}


// ============ TICKETS ============
export const ticketsAPI = {
  getTickets: async (rollNo) => {
    const params = new URLSearchParams()
    if (rollNo) params.append('rollNo', rollNo)
    
    const response = await fetch(`${API_BASE_URL}/tickets?${params}`, {
      headers: getHeaders()
    })
    return response.json()
  },

  getTicketById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      headers: getHeaders()
    })
    return response.json()
  },

  createTicket: async (ticketData) => {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(ticketData)
    })
    return response.json()
  },

  addMessage: async (ticketId, message) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/messages`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(message)
    })
    return response.json()
  },

  updateTicketStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status })
    })
    return response.json()
  }
}
