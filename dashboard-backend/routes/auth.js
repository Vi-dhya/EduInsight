import express from 'express'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { validatePassword } from '../utils/passwordValidator.js'
import { validateEmail } from '../utils/emailValidator.js'

const router = express.Router()

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load credentials from file
const credentialsPath = path.join(__dirname, '../credentials.json')
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'))

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // Validate email format
    const emailValidation = validateEmail(email)
    if (!emailValidation.isValid) {
      return res.status(400).json({ 
        message: 'Invalid email format',
        error: emailValidation.error
      })
    }

    // Validate password format
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      return res.status(400).json({ 
        message: 'Invalid password format',
        errors: passwordValidation.errors
      })
    }

    // Check credentials against file
    let user = null
    let role = null

    if (email.startsWith('student')) {
      user = credentials.students.find(s => s.email === email && s.password === password)
      role = 'student'
    } else if (email.startsWith('faculty')) {
      user = credentials.faculty.find(f => f.email === email && f.password === password)
      role = 'faculty'
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate token
    const token = jwt.sign(
      { 
        email: email, 
        role: role,
        name: user.name,
        ...(role === 'student' && { rollNo: user.rollNo, year: user.year })
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    res.json({
      token,
      user: {
        email: email,
        role: role,
        name: user.name,
        ...(role === 'faculty' && {
          designation: user.designation,
          department: user.department
        }),
        ...(role === 'student' && {
          rollNo: user.rollNo,
          year: user.year,
          department: user.department
        })
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router
