import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eduinsight')
    console.log('MongoDB Connected')
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}

const createTestUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({})
    console.log('Cleared existing users')

    // Create test users with proper password hashing
    const studentUser = new User({
      email: 'student@example.com',
      password: 'password123',
      name: 'Student User',
      role: 'student'
    })

    const facultyUser = new User({
      email: 'faculty@example.com',
      password: 'password123',
      name: 'Faculty User',
      role: 'faculty'
    })

    const adminUser = new User({
      email: 'admin@example.com',
      password: 'password123',
      name: 'Admin User',
      role: 'admin'
    })

    await studentUser.save()
    await facultyUser.save()
    await adminUser.save()

    console.log('✅ Test users created successfully!')
    console.log('Student: student@example.com / password123')
    console.log('Faculty: faculty@example.com / password123')
    console.log('Admin: admin@example.com / password123')
    
    process.exit(0)
  } catch (error) {
    console.error('Error creating test users:', error)
    process.exit(1)
  }
}

const run = async () => {
  await connectDB()
  await createTestUsers()
}

run()