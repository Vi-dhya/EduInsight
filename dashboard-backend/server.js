import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import dashboardRoutes from './routes/dashboard.js'
import departmentRoutes from './routes/department.js'
import examRoutes from './routes/exam.js'
import filesRoutes from './routes/files.js'
import noticeRoutes from './routes/notice.js'
import ticketRoutes from './routes/tickets.js'
import notificationRoutes from './routes/notifications.js'
import connectDB from './config/database.js'

dotenv.config()

const app = express()

// Connect to MongoDB
connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/department', departmentRoutes)
app.use('/api/exam', examRoutes)
app.use('/api/files', filesRoutes)
app.use('/api/notices', noticeRoutes)
app.use('/api/tickets', ticketRoutes)

// Serve uploaded files
app.use('/uploads', express.static('uploads'))

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

app.get('/test-students', async (req, res) => {
  try {
    const Student = require('./models/Student.js').default
    const students = await Student.find({})
    res.json({ count: students.length, students })
  } catch (error) {
    res.json({ error: error.message })
  }
})

const PORT = process.env.PORT || 5007

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
