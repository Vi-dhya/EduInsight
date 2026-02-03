import mongoose from 'mongoose'
import Student from '../models/Student.js'

const seedAllYearStudents = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/eduinsight')
    console.log('Connected to MongoDB')

    // Clear existing students
    await Student.deleteMany({})
    console.log('Cleared existing students')

    // 2nd Year Students (23102001-23102010)
    const secondYearStudents = [
      { rollNo: '23102001', name: 'Atchaya', collegeEmail: 'student23102001@college.edu', personalEmail: 'atchaya@gmail.com', phone: '9876500001', abcId: 'ABC23102001', incomeCertNo: 'CERT23102001', year: '2nd', department: 'AI&DS' },
      { rollNo: '23102002', name: 'Ragul', collegeEmail: 'student23102002@college.edu', personalEmail: 'ragul@gmail.com', phone: '9876500002', abcId: 'ABC23102002', incomeCertNo: 'CERT23102002', year: '2nd', department: 'AI&DS' },
      { rollNo: '23102003', name: 'Rifath', collegeEmail: 'student23102003@college.edu', personalEmail: 'rifath@gmail.com', phone: '9876500003', abcId: 'ABC23102003', incomeCertNo: 'CERT23102003', year: '2nd', department: 'AI&DS' },
      { rollNo: '23102004', name: 'Faouzia', collegeEmail: 'student23102004@college.edu', personalEmail: 'faouzia@gmail.com', phone: '9876500004', abcId: 'ABC23102004', incomeCertNo: 'CERT23102004', year: '2nd', department: 'AI&DS' },
      { rollNo: '23102005', name: 'Sasidharan', collegeEmail: 'student23102005@college.edu', personalEmail: 'sasidharan@gmail.com', phone: '9876500005', abcId: 'ABC23102005', incomeCertNo: 'CERT23102005', year: '2nd', department: 'AI&DS' },
      { rollNo: '23102006', name: 'Shree Prajan', collegeEmail: 'student23102006@college.edu', personalEmail: 'shreeprajan@gmail.com', phone: '9876500006', abcId: 'ABC23102006', incomeCertNo: 'CERT23102006', year: '2nd', department: 'AI&DS' },
      { rollNo: '23102007', name: 'Saran', collegeEmail: 'student23102007@college.edu', personalEmail: 'saran@gmail.com', phone: '9876500007', abcId: 'ABC23102007', incomeCertNo: 'CERT23102007', year: '2nd', department: 'AI&DS' },
      { rollNo: '23102008', name: 'Sowmiya', collegeEmail: 'student23102008@college.edu', personalEmail: 'sowmiya@gmail.com', phone: '9876500008', abcId: 'ABC23102008', incomeCertNo: 'CERT23102008', year: '2nd', department: 'AI&DS' },
      { rollNo: '23102009', name: 'Pria Nandhini', collegeEmail: 'student23102009@college.edu', personalEmail: 'prianand@gmail.com', phone: '9876500009', abcId: 'ABC23102009', incomeCertNo: 'CERT23102009', year: '2nd', department: 'AI&DS' },
      { rollNo: '23102010', name: 'Vimalesh', collegeEmail: 'student23102010@college.edu', personalEmail: 'vimalesh@gmail.com', phone: '9876500010', abcId: 'ABC23102010', incomeCertNo: 'CERT23102010', year: '2nd', department: 'AI&DS' }
    ]

    // 3rd Year Students (23101001-23101010)
    const thirdYearStudents = [
      { rollNo: '23101001', name: 'Arun Kumar', collegeEmail: 'student23101001@college.edu', personalEmail: 'arunkumar@gmail.com', phone: '9876501001', abcId: 'ABC23101001', incomeCertNo: 'CERT23101001', year: '3rd', department: 'AI&DS' },
      { rollNo: '23101002', name: 'Bhavana', collegeEmail: 'student23101002@college.edu', personalEmail: 'bhavana@gmail.com', phone: '9876501002', abcId: 'ABC23101002', incomeCertNo: 'CERT23101002', year: '3rd', department: 'AI&DS' },
      { rollNo: '23101003', name: 'Charan', collegeEmail: 'student23101003@college.edu', personalEmail: 'charan@gmail.com', phone: '9876501003', abcId: 'ABC23101003', incomeCertNo: 'CERT23101003', year: '3rd', department: 'AI&DS' },
      { rollNo: '23101004', name: 'Deepika', collegeEmail: 'student23101004@college.edu', personalEmail: 'deepika@gmail.com', phone: '9876501004', abcId: 'ABC23101004', incomeCertNo: 'CERT23101004', year: '3rd', department: 'AI&DS' },
      { rollNo: '23101005', name: 'Eshan', collegeEmail: 'student23101005@college.edu', personalEmail: 'eshan@gmail.com', phone: '9876501005', abcId: 'ABC23101005', incomeCertNo: 'CERT23101005', year: '3rd', department: 'AI&DS' },
      { rollNo: '23101006', name: 'Fiona', collegeEmail: 'student23101006@college.edu', personalEmail: 'fiona@gmail.com', phone: '9876501006', abcId: 'ABC23101006', incomeCertNo: 'CERT23101006', year: '3rd', department: 'AI&DS' },
      { rollNo: '23101007', name: 'Gaurav', collegeEmail: 'student23101007@college.edu', personalEmail: 'gaurav@gmail.com', phone: '9876501007', abcId: 'ABC23101007', incomeCertNo: 'CERT23101007', year: '3rd', department: 'AI&DS' },
      { rollNo: '23101008', name: 'Harini', collegeEmail: 'student23101008@college.edu', personalEmail: 'harini@gmail.com', phone: '9876501008', abcId: 'ABC23101008', incomeCertNo: 'CERT23101008', year: '3rd', department: 'AI&DS' },
      { rollNo: '23101009', name: 'Ishita', collegeEmail: 'student23101009@college.edu', personalEmail: 'ishita@gmail.com', phone: '9876501009', abcId: 'ABC23101009', incomeCertNo: 'CERT23101009', year: '3rd', department: 'AI&DS' },
      { rollNo: '23101010', name: 'Jatin', collegeEmail: 'student23101010@college.edu', personalEmail: 'jatin@gmail.com', phone: '9876501010', abcId: 'ABC23101010', incomeCertNo: 'CERT23101010', year: '3rd', department: 'AI&DS' }
    ]

    // 4th Year Students (23100001-23100010)
    const fourthYearStudents = [
      { rollNo: '23100001', name: 'Karan', collegeEmail: 'student23100001@college.edu', personalEmail: 'karan@gmail.com', phone: '9876500001', abcId: 'ABC23100001', incomeCertNo: 'CERT23100001', year: '4th', department: 'AI&DS' },
      { rollNo: '23100002', name: 'Lavanya', collegeEmail: 'student23100002@college.edu', personalEmail: 'lavanya@gmail.com', phone: '9876500002', abcId: 'ABC23100002', incomeCertNo: 'CERT23100002', year: '4th', department: 'AI&DS' },
      { rollNo: '23100003', name: 'Madhav', collegeEmail: 'student23100003@college.edu', personalEmail: 'madhav@gmail.com', phone: '9876500003', abcId: 'ABC23100003', incomeCertNo: 'CERT23100003', year: '4th', department: 'AI&DS' },
      { rollNo: '23100004', name: 'Neha', collegeEmail: 'student23100004@college.edu', personalEmail: 'neha@gmail.com', phone: '9876500004', abcId: 'ABC23100004', incomeCertNo: 'CERT23100004', year: '4th', department: 'AI&DS' },
      { rollNo: '23100005', name: 'Omkar', collegeEmail: 'student23100005@college.edu', personalEmail: 'omkar@gmail.com', phone: '9876500005', abcId: 'ABC23100005', incomeCertNo: 'CERT23100005', year: '4th', department: 'AI&DS' },
      { rollNo: '23100006', name: 'Priya', collegeEmail: 'student23100006@college.edu', personalEmail: 'priya@gmail.com', phone: '9876500006', abcId: 'ABC23100006', incomeCertNo: 'CERT23100006', year: '4th', department: 'AI&DS' },
      { rollNo: '23100007', name: 'Qasim', collegeEmail: 'student23100007@college.edu', personalEmail: 'qasim@gmail.com', phone: '9876500007', abcId: 'ABC23100007', incomeCertNo: 'CERT23100007', year: '4th', department: 'AI&DS' },
      { rollNo: '23100008', name: 'Riya', collegeEmail: 'student23100008@college.edu', personalEmail: 'riya@gmail.com', phone: '9876500008', abcId: 'ABC23100008', incomeCertNo: 'CERT23100008', year: '4th', department: 'AI&DS' },
      { rollNo: '23100009', name: 'Siddharth', collegeEmail: 'student23100009@college.edu', personalEmail: 'siddharth@gmail.com', phone: '9876500009', abcId: 'ABC23100009', incomeCertNo: 'CERT23100009', year: '4th', department: 'AI&DS' },
      { rollNo: '23100010', name: 'Tanya', collegeEmail: 'student23100010@college.edu', personalEmail: 'tanya@gmail.com', phone: '9876500010', abcId: 'ABC23100010', incomeCertNo: 'CERT23100010', year: '4th', department: 'AI&DS' }
    ]

    const allStudents = [...secondYearStudents, ...thirdYearStudents, ...fourthYearStudents]
    console.log(`Attempting to insert ${allStudents.length} students...`)
    
    const result = await Student.insertMany(allStudents)
    console.log(`Successfully created ${result.length} students`)
    console.log(`- 2nd Year: 10 students (23102001-23102010)`)
    console.log(`- 3rd Year: 10 students (23101001-23101010)`)
    console.log(`- 4th Year: 10 students (23100001-23100010)`)

    // Verify data was inserted
    const count = await Student.countDocuments()
    console.log(`Total students in database: ${count}`)

    await mongoose.connection.close()
    console.log('Database connection closed')
  } catch (err) {
    console.error('Error seeding students:', err)
    process.exit(1)
  }
}

seedAllYearStudents()
