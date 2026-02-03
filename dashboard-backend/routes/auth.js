import express from 'express'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load credentials from file
const credentialsPath = path.join(__dirname, '../credentials.json')
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'))

console.log('Credentials loaded:')
console.log('Students:', credentials.students.map(s => s.email))
console.log('Faculty:', credentials.faculty.map(f => f.email))
console.log('HOD:', credentials.hod.map(h => h.email))
console.log('AD:', credentials.ad.map(a => a.email))

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    console.log('=== LOGIN ATTEMPT ===')
    console.log('Email received:', email)
    console.log('Password received:', password)

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // Check credentials against file - NO VALIDATION, JUST MATCH
    let user = null
    let role = null

    // Try to find user in any role
    // Check students
    user = credentials.students.find(s => s.email.toLowerCase() === email.toLowerCase() && s.password === password)
    if (user) {
      role = 'student'
      console.log('Student found:', user.name)
    }

    // Check faculty
    if (!user) {
      user = credentials.faculty.find(f => f.email.toLowerCase() === email.toLowerCase() && f.password === password)
      if (user) {
        role = 'faculty'
        console.log('Faculty found:', user.name)
      }
    }

    // Check HOD
    if (!user) {
      user = credentials.hod.find(h => h.email.toLowerCase() === email.toLowerCase() && h.password === password)
      if (user) {
        role = 'hod'
        console.log('HOD found:', user.name)
      }
    }

    // Check AD
    if (!user) {
      user = credentials.ad.find(a => a.email.toLowerCase() === email.toLowerCase() && a.password === password)
      if (user) {
        role = 'ad'
        console.log('AD found:', user.name)
      }
    }

    if (!user) {
      console.log('User not found - login failed')
      console.log('Available students:', credentials.students.map(s => s.email))
      console.log('Available faculty:', credentials.faculty.map(f => f.email))
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    console.log('User found, generating token')

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

    console.log('Login successful for:', email, 'Role:', role)

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
        ...(role === 'hod' && {
          designation: user.designation,
          department: user.department
        }),
        ...(role === 'ad' && {
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
