import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Student from '../models/Student.js'
import Certification from '../models/Certification.js'
import Internship from '../models/Internship.js'
import ExamSchedule from '../models/ExamSchedule.js'
import HallAssignment from '../models/HallAssignment.js'
import Marks from '../models/Marks.js'
import Ticket from '../models/Ticket.js'

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eduinsight')
    console.log('MongoDB Connected')
  } catch (error) {
    console.error('Database connection error:', error.message)
    process.exit(1)
  }
}

const seedData = async () => {
  try {
    // Clear existing data
    await Student.deleteMany({})
    await Certification.deleteMany({})
    await Internship.deleteMany({})
    await ExamSchedule.deleteMany({})
    await HallAssignment.deleteMany({})
    await Marks.deleteMany({})
    await Ticket.deleteMany({})

    console.log('Cleared existing data')

    // Create students - 50 for 2nd year, 45 for 3rd year, 40 for 4th year
    const students = []
    const firstNames = ['Raj', 'Priya', 'Amit', 'Neha', 'Vikram', 'Anjali', 'Rohan', 'Sneha', 'Arjun', 'Divya', 'Karan', 'Pooja', 'Nikhil', 'Isha', 'Aditya', 'Riya', 'Sanjay', 'Ananya', 'Rahul', 'Zara']
    const lastNames = ['Kumar', 'Singh', 'Patel', 'Sharma', 'Verma', 'Gupta', 'Reddy', 'Nair', 'Iyer', 'Desai']

    // 2nd Year - 50 students
    for (let i = 0; i < 50; i++) {
      const firstName = firstNames[i % firstNames.length]
      const lastName = lastNames[i % lastNames.length]
      const rollNo = `2310206${String(i).padStart(2, '0')}`
      
      students.push({
        name: `${firstName} ${lastName}`,
        rollNo: rollNo,
        collegeEmail: `student${rollNo}@college.edu`,
        personalEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@gmail.com`,
        phone: `987654${String(3200 + i).slice(-4)}`,
        abcId: `ABC${String(123456 + i).slice(-6)}`,
        incomeCertNo: `IC2023${String(i + 1).padStart(3, '0')}`,
        year: '2nd',
        department: 'AI&DS',
        dob: new Date(2003 - Math.floor(i / 10), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        bloodGroup: ['O+', 'B+', 'AB+', 'A+'][Math.floor(Math.random() * 4)],
        fatherName: `Mr. ${firstName} ${lastName}`,
        motherName: `Mrs. ${firstName} ${lastName}`,
        address: `${100 + i} Main Street, Bangalore, Karnataka - 560001`,
        photo: `https://via.placeholder.com/200?text=${firstName}+${lastName}`
      })
    }

    // 3rd Year - 45 students
    for (let i = 0; i < 45; i++) {
      const firstName = firstNames[i % firstNames.length]
      const lastName = lastNames[i % lastNames.length]
      const rollNo = `2310305${String(i).padStart(2, '0')}`
      
      students.push({
        name: `${firstName} ${lastName}`,
        rollNo: rollNo,
        collegeEmail: `student${rollNo}@college.edu`,
        personalEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@gmail.com`,
        phone: `987654${String(3300 + i).slice(-4)}`,
        abcId: `ABC${String(123500 + i).slice(-6)}`,
        incomeCertNo: `IC2024${String(i + 1).padStart(3, '0')}`,
        year: '3rd',
        department: 'AI&DS',
        dob: new Date(2002 - Math.floor(i / 10), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        bloodGroup: ['O+', 'B+', 'AB+', 'A+'][Math.floor(Math.random() * 4)],
        fatherName: `Mr. ${firstName} ${lastName}`,
        motherName: `Mrs. ${firstName} ${lastName}`,
        address: `${200 + i} Oak Avenue, Bangalore, Karnataka - 560002`,
        photo: `https://via.placeholder.com/200?text=${firstName}+${lastName}`
      })
    }

    // 4th Year - 40 students
    for (let i = 0; i < 40; i++) {
      const firstName = firstNames[i % firstNames.length]
      const lastName = lastNames[i % lastNames.length]
      const rollNo = `2310405${String(i).padStart(2, '0')}`
      
      students.push({
        name: `${firstName} ${lastName}`,
        rollNo: rollNo,
        collegeEmail: `student${rollNo}@college.edu`,
        personalEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@gmail.com`,
        phone: `987654${String(3400 + i).slice(-4)}`,
        abcId: `ABC${String(123600 + i).slice(-6)}`,
        incomeCertNo: `IC2025${String(i + 1).padStart(3, '0')}`,
        year: '4th',
        department: 'AI&DS',
        dob: new Date(2001 - Math.floor(i / 10), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        bloodGroup: ['O+', 'B+', 'AB+', 'A+'][Math.floor(Math.random() * 4)],
        fatherName: `Mr. ${firstName} ${lastName}`,
        motherName: `Mrs. ${firstName} ${lastName}`,
        address: `${300 + i} Pine Road, Bangalore, Karnataka - 560003`,
        photo: `https://via.placeholder.com/200?text=${firstName}+${lastName}`
      })
    }

    const insertedStudents = await Student.insertMany(students)
    console.log('Created students:', insertedStudents.length)

    // Create certifications for each student
    const certifications = []
    const certNames = ['AWS Certified Solutions Architect', 'Google Cloud Associate', 'Microsoft Azure Fundamentals', 'Python Professional', 'Data Science Specialist']
    
    for (const student of insertedStudents) {
      for (let i = 0; i < 2; i++) {
        certifications.push({
          studentId: student._id,
          name: student.name,
          rollNo: student.rollNo,
          cert: certNames[Math.floor(Math.random() * certNames.length)],
          protocol: ['internship', 'coursera', 'udemy', 'events', 'workshop', 'nptel'][Math.floor(Math.random() * 6)],
          credits: 0.5,
          status: ['Accepted', 'Pending', 'Rejected'][Math.floor(Math.random() * 3)],
          remarks: 'Certificate verified and approved',
          year: student.year,
          certificateFile: `cert_${student.rollNo}_${i}.pdf`
        })
      }
    }

    await Certification.insertMany(certifications)
    console.log('Created certifications:', certifications.length)

    // Create internships/leaves for each student
    const internships = []
    const reasons = [
      'Summer internship at TCS',
      'Winter internship at Infosys',
      'Medical leave',
      'Family emergency',
      'Research project internship',
      'Industrial training'
    ]

    for (const student of insertedStudents) {
      for (let i = 0; i < 2; i++) {
        internships.push({
          studentId: student._id,
          rollNo: student.rollNo,
          name: student.name,
          type: Math.random() > 0.5 ? 'Internship' : 'Leave',
          reason: reasons[Math.floor(Math.random() * reasons.length)],
          remarks: 'Approved by department',
          year: student.year,
          parentPhone: '9876543200',
          photocopy: `internship_${student.rollNo}_${i}.pdf`,
          sentToParent: Math.random() > 0.5
        })
      }
    }

    await Internship.insertMany(internships)
    console.log('Created internships:', internships.length)

    // Create exam schedules
    const courses = ['Data Structures', 'Web Development', 'Machine Learning', 'Database Systems', 'Cloud Computing', 'AI Fundamentals']
    const examSchedules = []

    for (const student of insertedStudents) {
      for (let i = 0; i < 4; i++) {
        const examDate = new Date(2024, 1, 15 + i * 3)
        examSchedules.push({
          year: student.year,
          semester: student.year === '2nd' ? '3rd' : student.year === '3rd' ? '5th' : '7th',
          courseName: courses[i],
          date: examDate,
          day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][i % 5],
          timing: `${9 + i}:00 AM`,
          duration: '3 hours',
          department: student.department
        })
      }
    }

    await ExamSchedule.insertMany(examSchedules)
    console.log('Created exam schedules:', examSchedules.length)

    // Create hall assignments
    const hallAssignments = []
    const blocks = ['A', 'B', 'C', 'D']

    for (const student of insertedStudents) {
      for (let i = 0; i < 4; i++) {
        const examDate = new Date(2024, 1, 15 + i * 3)
        hallAssignments.push({
          rollNo: student.rollNo,
          name: student.name,
          year: student.year,
          block: blocks[Math.floor(Math.random() * blocks.length)],
          hallNo: `H${Math.floor(Math.random() * 10) + 1}`,
          seatNo: `${Math.floor(Math.random() * 50) + 1}`,
          examName: courses[i],
          examDate: examDate,
          duration: '3 hours',
          department: student.department
        })
      }
    }

    await HallAssignment.insertMany(hallAssignments)
    console.log('Created hall assignments:', hallAssignments.length)

    // Create marks
    const marks = []

    for (const student of insertedStudents) {
      for (let i = 0; i < 5; i++) {
        const internal1 = Math.floor(Math.random() * 15) + 1
        const internal2 = Math.floor(Math.random() * 15) + 1
        const semesterMark = Math.floor(Math.random() * 50) + 10
        const totalMark = Math.min(internal1 + internal2 + semesterMark, 100)

        let grade = 'F'
        if (totalMark >= 90) grade = 'A+'
        else if (totalMark >= 80) grade = 'A'
        else if (totalMark >= 70) grade = 'B'
        else if (totalMark >= 60) grade = 'C'
        else if (totalMark >= 50) grade = 'D'

        marks.push({
          rollNo: student.rollNo,
          name: courses[i],
          internal1,
          internal2,
          totalMark,
          grade,
          year: student.year,
          semester: student.year === '2nd' ? '3rd' : student.year === '3rd' ? '5th' : '7th',
          markSheetUploaded: Math.random() > 0.5
        })
      }
    }

    await Marks.insertMany(marks)
    console.log('Created marks:', marks.length)

    // Create tickets
    const ticketTitles = [
      'Exam Schedule Clarification',
      'Certificate Upload Issue',
      'Marks Not Updated',
      'Hall Ticket Problem',
      'Internship Approval Pending'
    ]

    const tickets = []

    for (const student of insertedStudents) {
      for (let i = 0; i < 2; i++) {
        tickets.push({
          title: ticketTitles[i],
          description: `Issue regarding ${ticketTitles[i].toLowerCase()}`,
          priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          status: ['Pending', 'Replied', 'Resolved'][Math.floor(Math.random() * 3)],
          rollNo: student.rollNo,
          studentName: student.name,
          studentEmail: student.collegeEmail,
          messages: [
            {
              sender: 'student',
              name: student.name,
              text: `Issue regarding ${ticketTitles[i].toLowerCase()}`,
              date: new Date()
            },
            {
              sender: 'faculty',
              name: 'Dr. Rajesh Kumar',
              text: 'We are looking into this issue. Will get back to you soon.',
              date: new Date(Date.now() + 86400000)
            }
          ],
          createdDate: new Date()
        })
      }
    }

    await Ticket.insertMany(tickets)
    console.log('Created tickets:', tickets.length)

    console.log('\n✅ All data seeded successfully!')
    console.log('\nTotal Students Created:')
    console.log('2nd Year: 50 students')
    console.log('3rd Year: 45 students')
    console.log('4th Year: 40 students')
    console.log('Total: 135 students')

    process.exit(0)
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }
}

connectDB().then(() => seedData())
