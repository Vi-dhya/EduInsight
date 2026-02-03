import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Student from '../models/Student.js'

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

const seedSpecificStudents = async () => {
  try {
    // Define the 10 specific students
    const specificStudents = [
      {
        name: 'Atchaya',
        rollNo: '23102001',
        collegeEmail: 'student23102001@college.edu',
        personalEmail: 'atchaya@gmail.com',
        phone: '9876543201',
        abcId: 'ABC123201',
        incomeCertNo: 'IC2023001',
        year: '2nd',
        department: 'AI&DS',
        dob: '2003-05-15',
        bloodGroup: 'O+',
        fatherName: 'Mr. Kumar Singh',
        motherName: 'Mrs. Priya Singh',
        address: '123 Main Street, Bangalore, Karnataka - 560001'
      },
      {
        name: 'Ragul',
        rollNo: '23102002',
        collegeEmail: 'student23102002@college.edu',
        personalEmail: 'ragul@gmail.com',
        phone: '9876543202',
        abcId: 'ABC123202',
        incomeCertNo: 'IC2023002',
        year: '2nd',
        department: 'AI&DS',
        dob: '2003-06-20',
        bloodGroup: 'B+',
        fatherName: 'Mr. Rajesh Kumar',
        motherName: 'Mrs. Anjali Kumar',
        address: '124 Main Street, Bangalore, Karnataka - 560001'
      },
      {
        name: 'Rifath',
        rollNo: '23102003',
        collegeEmail: 'student23102003@college.edu',
        personalEmail: 'rifath@gmail.com',
        phone: '9876543203',
        abcId: 'ABC123203',
        incomeCertNo: 'IC2023003',
        year: '2nd',
        department: 'AI&DS',
        dob: '2003-07-10',
        bloodGroup: 'AB+',
        fatherName: 'Mr. Ahmed Khan',
        motherName: 'Mrs. Fatima Khan',
        address: '125 Main Street, Bangalore, Karnataka - 560001'
      },
      {
        name: 'Faouzia',
        rollNo: '23102004',
        collegeEmail: 'student23102004@college.edu',
        personalEmail: 'faouzia@gmail.com',
        phone: '9876543204',
        abcId: 'ABC123204',
        incomeCertNo: 'IC2023004',
        year: '2nd',
        department: 'AI&DS',
        dob: '2003-08-25',
        bloodGroup: 'A+',
        fatherName: 'Mr. Hassan Ali',
        motherName: 'Mrs. Zainab Ali',
        address: '126 Main Street, Bangalore, Karnataka - 560001'
      },
      {
        name: 'Sasidharan',
        rollNo: '23102005',
        collegeEmail: 'student23102005@college.edu',
        personalEmail: 'sasidharan@gmail.com',
        phone: '9876543205',
        abcId: 'ABC123205',
        incomeCertNo: 'IC2023005',
        year: '2nd',
        department: 'AI&DS',
        dob: '2003-09-12',
        bloodGroup: 'O+',
        fatherName: 'Mr. Sasi Kumar',
        motherName: 'Mrs. Lakshmi Kumar',
        address: '127 Main Street, Bangalore, Karnataka - 560001'
      },
      {
        name: 'Shree Prajan',
        rollNo: '23102006',
        collegeEmail: 'student23102006@college.edu',
        personalEmail: 'shreeprajan@gmail.com',
        phone: '9876543206',
        abcId: 'ABC123206',
        incomeCertNo: 'IC2023006',
        year: '2nd',
        department: 'AI&DS',
        dob: '2003-10-03',
        bloodGroup: 'B+',
        fatherName: 'Mr. Prajan Singh',
        motherName: 'Mrs. Shree Singh',
        address: '128 Main Street, Bangalore, Karnataka - 560001'
      },
      {
        name: 'Saran',
        rollNo: '23102007',
        collegeEmail: 'student23102007@college.edu',
        personalEmail: 'saran@gmail.com',
        phone: '9876543207',
        abcId: 'ABC123207',
        incomeCertNo: 'IC2023007',
        year: '2nd',
        department: 'AI&DS',
        dob: '2003-11-18',
        bloodGroup: 'AB+',
        fatherName: 'Mr. Saran Kumar',
        motherName: 'Mrs. Divya Kumar',
        address: '129 Main Street, Bangalore, Karnataka - 560001'
      },
      {
        name: 'Sowmiya',
        rollNo: '23102008',
        collegeEmail: 'student23102008@college.edu',
        personalEmail: 'sowmiya@gmail.com',
        phone: '9876543208',
        abcId: 'ABC123208',
        incomeCertNo: 'IC2023008',
        year: '2nd',
        department: 'AI&DS',
        dob: '2003-12-05',
        bloodGroup: 'A+',
        fatherName: 'Mr. Sowmya Kumar',
        motherName: 'Mrs. Pooja Kumar',
        address: '130 Main Street, Bangalore, Karnataka - 560001'
      },
      {
        name: 'Pria Nandhini',
        rollNo: '23102009',
        collegeEmail: 'student23102009@college.edu',
        personalEmail: 'priandhini@gmail.com',
        phone: '9876543209',
        abcId: 'ABC123209',
        incomeCertNo: 'IC2023009',
        year: '2nd',
        department: 'AI&DS',
        dob: '2003-01-22',
        bloodGroup: 'O+',
        fatherName: 'Mr. Pria Kumar',
        motherName: 'Mrs. Nandhini Kumar',
        address: '131 Main Street, Bangalore, Karnataka - 560001'
      },
      {
        name: 'Vimalesh',
        rollNo: '23102010',
        collegeEmail: 'student23102010@college.edu',
        personalEmail: 'vimalesh@gmail.com',
        phone: '9876543210',
        abcId: 'ABC123210',
        incomeCertNo: 'IC2023010',
        year: '2nd',
        department: 'AI&DS',
        dob: '2003-02-14',
        bloodGroup: 'B+',
        fatherName: 'Mr. Vimal Kumar',
        motherName: 'Mrs. Eshita Kumar',
        address: '132 Main Street, Bangalore, Karnataka - 560001'
      }
    ]

    // Check if students already exist
    const existingCount = await Student.countDocuments({
      rollNo: { $in: specificStudents.map(s => s.rollNo) }
    })

    if (existingCount > 0) {
      console.log(`${existingCount} students already exist. Skipping insertion.`)
    } else {
      const insertedStudents = await Student.insertMany(specificStudents)
      console.log(`✅ Created ${insertedStudents.length} specific students`)
    }

    console.log('\nStudents in database:')
    const allStudents = await Student.find({}, 'name rollNo year')
    console.log(`Total: ${allStudents.length} students`)
    
    process.exit(0)
  } catch (error) {
    console.error('Error seeding specific students:', error)
    process.exit(1)
  }
}

connectDB().then(() => seedSpecificStudents())
