import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'
import Student from '../models/Student.js'
import Marks from '../models/Marks.js'
import Certification from '../models/Certification.js'
import Internship from '../models/Internship.js'
import Notice from '../models/Notice.js'
import ExamSchedule from '../models/ExamSchedule.js'
import HallAssignment from '../models/HallAssignment.js'

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

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({})
    await Student.deleteMany({})
    await Marks.deleteMany({})
    await Certification.deleteMany({})
    await Internship.deleteMany({})
    await Notice.deleteMany({})
    await ExamSchedule.deleteMany({})
    await HallAssignment.deleteMany({})

    console.log('Cleared existing data')

    // Create users
    const users = [
      {
        email: 'student@example.com',
        password: 'password123',
        name: 'Student User',
        role: 'student'
      },
      {
        email: 'faculty@example.com',
        password: 'password123',
        name: 'Faculty User',
        role: 'faculty'
      },
      {
        email: 'admin@example.com',
        password: 'password123',
        name: 'Admin User',
        role: 'admin'
      }
    ]

    await User.insertMany(users)
    console.log('Created users')

    // Create students
    const students = []
    
    // 2nd Year Students
    for (let i = 0; i < 50; i++) {
      students.push({
        name: `Student ${1001 + i}`,
        rollNo: `${1001 + i}`,
        collegeEmail: `student${1001 + i}@college.edu`,
        personalEmail: `student${1001 + i}@gmail.com`,
        phone: `98765${String(43210 + i).slice(-5)}`,
        abcId: `ABC${String(100000 + i).slice(-6)}`,
        incomeCertNo: `INC${String(500000 + i).slice(-6)}`,
        year: '2nd',
        department: 'AI&DS'
      })
    }

    // 3rd Year Students
    for (let i = 0; i < 50; i++) {
      students.push({
        name: `Student ${2001 + i}`,
        rollNo: `${2001 + i}`,
        collegeEmail: `student${2001 + i}@college.edu`,
        personalEmail: `student${2001 + i}@gmail.com`,
        phone: `98765${String(43210 + i).slice(-5)}`,
        abcId: `ABC${String(200000 + i).slice(-6)}`,
        incomeCertNo: `INC${String(600000 + i).slice(-6)}`,
        year: '3rd',
        department: 'AI&DS'
      })
    }

    // 4th Year Students
    for (let i = 0; i < 50; i++) {
      students.push({
        name: `Student ${3001 + i}`,
        rollNo: `${3001 + i}`,
        collegeEmail: `student${3001 + i}@college.edu`,
        personalEmail: `student${3001 + i}@gmail.com`,
        phone: `98765${String(43210 + i).slice(-5)}`,
        abcId: `ABC${String(300000 + i).slice(-6)}`,
        incomeCertNo: `INC${String(700000 + i).slice(-6)}`,
        year: '4th',
        department: 'AI&DS'
      })
    }

    const createdStudents = await Student.insertMany(students)
    console.log('Created students')

    // Create marks
    const marks = []
    createdStudents.forEach((student, index) => {
      const internal1 = Math.floor(Math.random() * 20) + 1
      const internal2 = Math.floor(Math.random() * 20) + 1
      const totalMark = Math.floor(Math.random() * 100)
      
      let grade = 'F'
      if (totalMark >= 90) grade = 'A+'
      else if (totalMark >= 80) grade = 'A'
      else if (totalMark >= 70) grade = 'B'
      else if (totalMark >= 60) grade = 'C'
      else if (totalMark >= 50) grade = 'D'

      marks.push({
        rollNo: student.rollNo,
        name: student.name,
        internal1,
        internal2,
        totalMark,
        semester: student.year === '2nd' ? '4th' : student.year === '3rd' ? '6th' : '8th',
        grade,
        year: student.year,
        markSheetUploaded: Math.random() > 0.3
      })
    })

    await Marks.insertMany(marks)
    console.log('Created marks')

    // Create certifications
    const certifications = []
    const certTypes = ['AWS Certified', 'Google Cloud', 'Azure Certified', 'Python Pro', 'Java Expert', 'Data Science', 'ML Specialist', 'DevOps Engineer']
    const statuses = ['Pending', 'Accepted', 'Rejected']

    createdStudents.slice(0, 60).forEach((student, index) => {
      certifications.push({
        studentId: student._id,
        name: student.name,
        rollNo: student.rollNo,
        cert: certTypes[index % certTypes.length],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        remarks: Math.random() > 0.5 ? 'Good work' : '',
        year: student.year
      })
    })

    await Certification.insertMany(certifications)
    console.log('Created certifications')

    // Create internships
    const internships = []
    const internshipTypes = ['Internship', 'Leave']
    const reasons = ['Google Summer Internship', 'Microsoft Internship', 'Amazon Internship', 'Medical Leave', 'Personal Reasons']

    createdStudents.slice(0, 30).forEach((student, index) => {
      internships.push({
        studentId: student._id,
        rollNo: student.rollNo,
        name: student.name,
        type: internshipTypes[Math.floor(Math.random() * internshipTypes.length)],
        reason: reasons[index % reasons.length],
        parentPhone: `98765${String(43210 + index).slice(-5)}`,
        sentToParent: Math.random() > 0.5,
        year: student.year
      })
    })

    await Internship.insertMany(internships)
    console.log('Created internships')

    // Create notices
    const notices = [
      {
        title: 'AI&DS Department Time Table Updated',
        content: 'The time table for AI&DS department has been updated for the current semester. Classes will start from 9:00 AM.',
        author: 'Department Head',
        priority: 'high',
        type: 'department'
      },
      {
        title: 'Department Seminar - Machine Learning Applications',
        content: 'A seminar on "Real-world ML Applications" will be conducted on February 5th at 2:00 PM in the AI Lab.',
        author: 'Faculty',
        priority: 'medium',
        type: 'department'
      },
      {
        title: 'NAAC Accreditation A+ Grade',
        content: 'Our college has been awarded NAAC accreditation with A+ grade for excellence in academics and infrastructure.',
        author: 'Admin',
        priority: 'high',
        type: 'college'
      },
      {
        title: 'New State-of-the-Art Lab Inaugurated',
        content: 'The college has inaugurated a new AI & ML laboratory with advanced computing facilities for student research.',
        author: 'Admin',
        priority: 'high',
        type: 'college'
      }
    ]

    await Notice.insertMany(notices)
    console.log('Created notices')

    // Create exam schedules
    const examSchedules = [
      {
        date: new Date('2024-02-15'),
        day: 'Thursday',
        courseName: 'Data Structures',
        timing: '10:00 AM - 1:00 PM',
        duration: '3 hours',
        semester: '4th',
        year: '2nd'
      },
      {
        date: new Date('2024-02-16'),
        day: 'Friday',
        courseName: 'Web Development',
        timing: '2:00 PM - 5:00 PM',
        duration: '3 hours',
        semester: '4th',
        year: '2nd'
      },
      {
        date: new Date('2024-02-19'),
        day: 'Monday',
        courseName: 'Machine Learning',
        timing: '10:00 AM - 1:00 PM',
        duration: '3 hours',
        semester: '6th',
        year: '3rd'
      },
      {
        date: new Date('2024-02-22'),
        day: 'Thursday',
        courseName: 'Cybersecurity',
        timing: '2:00 PM - 5:00 PM',
        duration: '3 hours',
        semester: '8th',
        year: '4th'
      }
    ]

    await ExamSchedule.insertMany(examSchedules)
    console.log('Created exam schedules')

    // Create hall assignments
    const hallAssignments = [
      {
        rollNo: '1001',
        name: 'Student 1001',
        year: '2nd',
        block: 'A',
        hallNo: 'A-101',
        seatNo: '15',
        examName: 'Data Structures',
        examDate: new Date('2024-02-15'),
        duration: '3 hours'
      },
      {
        rollNo: '1002',
        name: 'Student 1002',
        year: '2nd',
        block: 'A',
        hallNo: 'A-102',
        seatNo: '20',
        examName: 'Data Structures',
        examDate: new Date('2024-02-15'),
        duration: '3 hours'
      },
      {
        rollNo: '2001',
        name: 'Student 2001',
        year: '3rd',
        block: 'C',
        hallNo: 'C-101',
        seatNo: '12',
        examName: 'Machine Learning',
        examDate: new Date('2024-02-19'),
        duration: '3 hours'
      }
    ]

    await HallAssignment.insertMany(hallAssignments)
    console.log('Created hall assignments')

    console.log('✅ Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

const runSeed = async () => {
  await connectDB()
  await seedData()
}

runSeed()