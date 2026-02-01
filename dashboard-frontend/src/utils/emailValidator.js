export const validateStudentEmail = (email) => {
  const studentEmailRegex = /^student(\d{8})@college\.edu$/
  const match = email.match(studentEmailRegex)
  
  if (!match) {
    return {
      isValid: false,
      error: 'Student email must be: student[8-digits]@college.edu',
      rollNo: null
    }
  }

  return {
    isValid: true,
    error: null,
    rollNo: match[1]
  }
}

export const validateFacultyEmail = (email) => {
  const facultyEmailRegex = /^faculty[a-zA-Z]+@college\.edu$/
  const match = email.match(facultyEmailRegex)
  
  if (!match) {
    return {
      isValid: false,
      error: 'Faculty email must be: faculty[name]@college.edu (e.g., facultypriyanka@college.edu)'
    }
  }

  return {
    isValid: true,
    error: null
  }
}

export const validateEmail = (email) => {
  if (!email) {
    return {
      isValid: false,
      error: 'Email is required'
    }
  }

  if (email.startsWith('student')) {
    return validateStudentEmail(email)
  } else if (email.startsWith('faculty')) {
    return validateFacultyEmail(email)
  } else {
    return {
      isValid: false,
      error: 'Email must start with "student" or "faculty"'
    }
  }
}
