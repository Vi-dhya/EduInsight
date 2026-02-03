import mongoose from 'mongoose'
import Student from '../models/Student.js'

const seedCompleteStudentDetails = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/eduinsight')
    console.log('✓ Connected to MongoDB')

    // Clear existing students
    await Student.deleteMany({})
    console.log('✓ Cleared existing students')

    // 2nd Year Students (23102001-23102010) - Complete Details
    const secondYearStudents = [
      {
        rollNo: '23102001',
        name: 'Atchaya',
        collegeEmail: 'student23102001@college.edu',
        personalEmail: 'atchaya.m@gmail.com',
        phone: '9876500001',
        abcId: 'ABC23102001',
        incomeCertNo: 'CERT23102001',
        year: '2nd',
        department: 'AI&DS',
        dob: '2004-03-12',
        bloodGroup: 'O+',
        fatherName: 'Mr. Murugan M',
        motherName: 'Mrs. Kavitha M',
        address: '12, Gandhi Street, Chennai, Tamil Nadu - 600001'
      },
      {
        rollNo: '23102002',
        name: 'Ragul',
        collegeEmail: 'student23102002@college.edu',
        personalEmail: 'ragul.r@gmail.com',
        phone: '9876500002',
        abcId: 'ABC23102002',
        incomeCertNo: 'CERT23102002',
        year: '2nd',
        department: 'AI&DS',
        dob: '2004-07-25',
        bloodGroup: 'B+',
        fatherName: 'Mr. Rajesh R',
        motherName: 'Mrs. Lakshmi R',
        address: '45, Anna Nagar, Trichy, Tamil Nadu - 620001'
      },
      {
        rollNo: '23102003',
        name: 'Rifath',
        collegeEmail: 'student23102003@college.edu',
        personalEmail: 'rifath.a@gmail.com',
        phone: '9876500003',
        abcId: 'ABC23102003',
        incomeCertNo: 'CERT23102003',
        year: '2nd',
        department: 'AI&DS',
        dob: '2004-11-09',
        bloodGroup: 'A+',
        fatherName: 'Mr. Ibrahim A',
        motherName: 'Mrs. Ayesha A',
        address: '78, Beach Road, Puducherry - 605001'
      },
      {
        rollNo: '23102004',
        name: 'Faouzia',
        collegeEmail: 'student23102004@college.edu',
        personalEmail: 'faouzia.f@gmail.com',
        phone: '9876500004',
        abcId: 'ABC23102004',
        incomeCertNo: 'CERT23102004',
        year: '2nd',
        department: 'AI&DS',
        dob: '2004-02-18',
        bloodGroup: 'AB+',
        fatherName: 'Mr. Farook F',
        motherName: 'Mrs. Noorjahan F',
        address: '33, Market Street, Coimbatore, Tamil Nadu - 641001'
      },
      {
        rollNo: '23102005',
        name: 'Sasidharan',
        collegeEmail: 'student23102005@college.edu',
        personalEmail: 'sasidharan.s@gmail.com',
        phone: '9876500005',
        abcId: 'ABC23102005',
        incomeCertNo: 'CERT23102005',
        year: '2nd',
        department: 'AI&DS',
        dob: '2004-06-30',
        bloodGroup: 'O-',
        fatherName: 'Mr. Shankar S',
        motherName: 'Mrs. Meenakshi S',
        address: '21, Temple Road, Madurai, Tamil Nadu - 625001'
      },
      {
        rollNo: '23102006',
        name: 'Shree Prajan',
        collegeEmail: 'student23102006@college.edu',
        personalEmail: 'shreeprajan.p@gmail.com',
        phone: '9876500006',
        abcId: 'ABC23102006',
        incomeCertNo: 'CERT23102006',
        year: '2nd',
        department: 'AI&DS',
        dob: '2004-09-14',
        bloodGroup: 'B-',
        fatherName: 'Mr. Prajan P',
        motherName: 'Mrs. Shree P',
        address: '56, Park Avenue, Salem, Tamil Nadu - 636001'
      },
      {
        rollNo: '23102007',
        name: 'Saran',
        collegeEmail: 'student23102007@college.edu',
        personalEmail: 'saran.s@gmail.com',
        phone: '9876500007',
        abcId: 'ABC23102007',
        incomeCertNo: 'CERT23102007',
        year: '2nd',
        department: 'AI&DS',
        dob: '2004-01-22',
        bloodGroup: 'A-',
        fatherName: 'Mr. Saran S',
        motherName: 'Mrs. Saranya S',
        address: '89, Main Road, Erode, Tamil Nadu - 638001'
      },
      {
        rollNo: '23102008',
        name: 'Sowmiya',
        collegeEmail: 'student23102008@college.edu',
        personalEmail: 'sowmiya.s@gmail.com',
        phone: '9876500008',
        abcId: 'ABC23102008',
        incomeCertNo: 'CERT23102008',
        year: '2nd',
        department: 'AI&DS',
        dob: '2004-04-08',
        bloodGroup: 'AB-',
        fatherName: 'Mr. Sowmya S',
        motherName: 'Mrs. Sowmya S',
        address: '67, Nagar Street, Vellore, Tamil Nadu - 632001'
      },
      {
        rollNo: '23102009',
        name: 'Pria Nandhini',
        collegeEmail: 'student23102009@college.edu',
        personalEmail: 'prianand.n@gmail.com',
        phone: '9876500009',
        abcId: 'ABC23102009',
        incomeCertNo: 'CERT23102009',
        year: '2nd',
        department: 'AI&DS',
        dob: '2004-08-19',
        bloodGroup: 'O+',
        fatherName: 'Mr. Nandhini N',
        motherName: 'Mrs. Nandhini N',
        address: '34, Lotus Street, Kanchipuram, Tamil Nadu - 631501'
      },
      {
        rollNo: '23102010',
        name: 'Vimalesh',
        collegeEmail: 'student23102010@college.edu',
        personalEmail: 'vimalesh.v@gmail.com',
        phone: '9876500010',
        abcId: 'ABC23102010',
        incomeCertNo: 'CERT23102010',
        year: '2nd',
        department: 'AI&DS',
        dob: '2004-05-27',
        bloodGroup: 'B+',
        fatherName: 'Mr. Vimal V',
        motherName: 'Mrs. Vimala V',
        address: '99, Sunflower Lane, Tiruppur, Tamil Nadu - 641601'
      }
    ]

    // 3rd Year Students (23101001-23101010) - Complete Details
    const thirdYearStudents = [
      {
        rollNo: '23101001',
        name: 'Arun Kumar',
        collegeEmail: 'student23101001@college.edu',
        personalEmail: 'arun.kumar@gmail.com',
        phone: '9876501001',
        abcId: 'ABC23101001',
        incomeCertNo: 'CERT23101001',
        year: '3rd',
        department: 'AI&DS',
        dob: '2003-03-12',
        bloodGroup: 'O+',
        fatherName: 'Mr. Kumar A',
        motherName: 'Mrs. Aruna A',
        address: '11, Raj Nagar, Chennai, Tamil Nadu - 600002'
      },
      {
        rollNo: '23101002',
        name: 'Bhavana',
        collegeEmail: 'student23101002@college.edu',
        personalEmail: 'bhavana.b@gmail.com',
        phone: '9876501002',
        abcId: 'ABC23101002',
        incomeCertNo: 'CERT23101002',
        year: '3rd',
        department: 'AI&DS',
        dob: '2003-07-25',
        bloodGroup: 'B+',
        fatherName: 'Mr. Bhavan B',
        motherName: 'Mrs. Bhavani B',
        address: '22, Shanti Nagar, Trichy, Tamil Nadu - 620002'
      },
      {
        rollNo: '23101003',
        name: 'Charan',
        collegeEmail: 'student23101003@college.edu',
        personalEmail: 'charan.c@gmail.com',
        phone: '9876501003',
        abcId: 'ABC23101003',
        incomeCertNo: 'CERT23101003',
        year: '3rd',
        department: 'AI&DS',
        dob: '2003-11-09',
        bloodGroup: 'A+',
        fatherName: 'Mr. Charan C',
        motherName: 'Mrs. Charanya C',
        address: '33, Peace Road, Puducherry - 605002'
      },
      {
        rollNo: '23101004',
        name: 'Deepika',
        collegeEmail: 'student23101004@college.edu',
        personalEmail: 'deepika.d@gmail.com',
        phone: '9876501004',
        abcId: 'ABC23101004',
        incomeCertNo: 'CERT23101004',
        year: '3rd',
        department: 'AI&DS',
        dob: '2003-02-18',
        bloodGroup: 'AB+',
        fatherName: 'Mr. Deep D',
        motherName: 'Mrs. Deepa D',
        address: '44, Garden Street, Coimbatore, Tamil Nadu - 641002'
      },
      {
        rollNo: '23101005',
        name: 'Eshan',
        collegeEmail: 'student23101005@college.edu',
        personalEmail: 'eshan.e@gmail.com',
        phone: '9876501005',
        abcId: 'ABC23101005',
        incomeCertNo: 'CERT23101005',
        year: '3rd',
        department: 'AI&DS',
        dob: '2003-06-30',
        bloodGroup: 'O-',
        fatherName: 'Mr. Eshan E',
        motherName: 'Mrs. Eshana E',
        address: '55, Flower Lane, Madurai, Tamil Nadu - 625002'
      },
      {
        rollNo: '23101006',
        name: 'Fiona',
        collegeEmail: 'student23101006@college.edu',
        personalEmail: 'fiona.f@gmail.com',
        phone: '9876501006',
        abcId: 'ABC23101006',
        incomeCertNo: 'CERT23101006',
        year: '3rd',
        department: 'AI&DS',
        dob: '2003-09-14',
        bloodGroup: 'B-',
        fatherName: 'Mr. Fiona F',
        motherName: 'Mrs. Fiona F',
        address: '66, Star Street, Salem, Tamil Nadu - 636002'
      },
      {
        rollNo: '23101007',
        name: 'Gaurav',
        collegeEmail: 'student23101007@college.edu',
        personalEmail: 'gaurav.g@gmail.com',
        phone: '9876501007',
        abcId: 'ABC23101007',
        incomeCertNo: 'CERT23101007',
        year: '3rd',
        department: 'AI&DS',
        dob: '2003-01-22',
        bloodGroup: 'A-',
        fatherName: 'Mr. Gaurav G',
        motherName: 'Mrs. Gaurika G',
        address: '77, Moon Road, Erode, Tamil Nadu - 638002'
      },
      {
        rollNo: '23101008',
        name: 'Harini',
        collegeEmail: 'student23101008@college.edu',
        personalEmail: 'harini.h@gmail.com',
        phone: '9876501008',
        abcId: 'ABC23101008',
        incomeCertNo: 'CERT23101008',
        year: '3rd',
        department: 'AI&DS',
        dob: '2003-04-08',
        bloodGroup: 'AB-',
        fatherName: 'Mr. Hari H',
        motherName: 'Mrs. Harini H',
        address: '88, Sun Street, Vellore, Tamil Nadu - 632002'
      },
      {
        rollNo: '23101009',
        name: 'Ishita',
        collegeEmail: 'student23101009@college.edu',
        personalEmail: 'ishita.i@gmail.com',
        phone: '9876501009',
        abcId: 'ABC23101009',
        incomeCertNo: 'CERT23101009',
        year: '3rd',
        department: 'AI&DS',
        dob: '2003-08-19',
        bloodGroup: 'O+',
        fatherName: 'Mr. Ishit I',
        motherName: 'Mrs. Ishita I',
        address: '99, Cloud Street, Kanchipuram, Tamil Nadu - 631502'
      },
      {
        rollNo: '23101010',
        name: 'Jatin',
        collegeEmail: 'student23101010@college.edu',
        personalEmail: 'jatin.j@gmail.com',
        phone: '9876501010',
        abcId: 'ABC23101010',
        incomeCertNo: 'CERT23101010',
        year: '3rd',
        department: 'AI&DS',
        dob: '2003-05-27',
        bloodGroup: 'B+',
        fatherName: 'Mr. Jatin J',
        motherName: 'Mrs. Jatina J',
        address: '100, Wind Lane, Tiruppur, Tamil Nadu - 641602'
      }
    ]

    // 4th Year Students (23100001-23100010) - Complete Details
    const fourthYearStudents = [
      {
        rollNo: '23100001',
        name: 'Karan',
        collegeEmail: 'student23100001@college.edu',
        personalEmail: 'karan.k@gmail.com',
        phone: '9876500001',
        abcId: 'ABC23100001',
        incomeCertNo: 'CERT23100001',
        year: '4th',
        department: 'AI&DS',
        dob: '2002-03-12',
        bloodGroup: 'O+',
        fatherName: 'Mr. Karan K',
        motherName: 'Mrs. Karana K',
        address: '111, Victory Road, Chennai, Tamil Nadu - 600003'
      },
      {
        rollNo: '23100002',
        name: 'Lavanya',
        collegeEmail: 'student23100002@college.edu',
        personalEmail: 'lavanya.l@gmail.com',
        phone: '9876500002',
        abcId: 'ABC23100002',
        incomeCertNo: 'CERT23100002',
        year: '4th',
        department: 'AI&DS',
        dob: '2002-07-25',
        bloodGroup: 'B+',
        fatherName: 'Mr. Lavan L',
        motherName: 'Mrs. Lavanya L',
        address: '222, Hope Nagar, Trichy, Tamil Nadu - 620003'
      },
      {
        rollNo: '23100003',
        name: 'Madhav',
        collegeEmail: 'student23100003@college.edu',
        personalEmail: 'madhav.m@gmail.com',
        phone: '9876500003',
        abcId: 'ABC23100003',
        incomeCertNo: 'CERT23100003',
        year: '4th',
        department: 'AI&DS',
        dob: '2002-11-09',
        bloodGroup: 'A+',
        fatherName: 'Mr. Madhav M',
        motherName: 'Mrs. Madhavi M',
        address: '333, Joy Road, Puducherry - 605003'
      },
      {
        rollNo: '23100004',
        name: 'Neha',
        collegeEmail: 'student23100004@college.edu',
        personalEmail: 'neha.n@gmail.com',
        phone: '9876500004',
        abcId: 'ABC23100004',
        incomeCertNo: 'CERT23100004',
        year: '4th',
        department: 'AI&DS',
        dob: '2002-02-18',
        bloodGroup: 'AB+',
        fatherName: 'Mr. Neha N',
        motherName: 'Mrs. Neha N',
        address: '444, Dream Street, Coimbatore, Tamil Nadu - 641003'
      },
      {
        rollNo: '23100005',
        name: 'Omkar',
        collegeEmail: 'student23100005@college.edu',
        personalEmail: 'omkar.o@gmail.com',
        phone: '9876500005',
        abcId: 'ABC23100005',
        incomeCertNo: 'CERT23100005',
        year: '4th',
        department: 'AI&DS',
        dob: '2002-06-30',
        bloodGroup: 'O-',
        fatherName: 'Mr. Omkar O',
        motherName: 'Mrs. Omkara O',
        address: '555, Success Lane, Madurai, Tamil Nadu - 625003'
      },
      {
        rollNo: '23100006',
        name: 'Priya',
        collegeEmail: 'student23100006@college.edu',
        personalEmail: 'priya.p@gmail.com',
        phone: '9876500006',
        abcId: 'ABC23100006',
        incomeCertNo: 'CERT23100006',
        year: '4th',
        department: 'AI&DS',
        dob: '2002-09-14',
        bloodGroup: 'B-',
        fatherName: 'Mr. Priya P',
        motherName: 'Mrs. Priya P',
        address: '666, Bright Street, Salem, Tamil Nadu - 636003'
      },
      {
        rollNo: '23100007',
        name: 'Qasim',
        collegeEmail: 'student23100007@college.edu',
        personalEmail: 'qasim.q@gmail.com',
        phone: '9876500007',
        abcId: 'ABC23100007',
        incomeCertNo: 'CERT23100007',
        year: '4th',
        department: 'AI&DS',
        dob: '2002-01-22',
        bloodGroup: 'A-',
        fatherName: 'Mr. Qasim Q',
        motherName: 'Mrs. Qasima Q',
        address: '777, Smart Road, Erode, Tamil Nadu - 638003'
      },
      {
        rollNo: '23100008',
        name: 'Riya',
        collegeEmail: 'student23100008@college.edu',
        personalEmail: 'riya.r@gmail.com',
        phone: '9876500008',
        abcId: 'ABC23100008',
        incomeCertNo: 'CERT23100008',
        year: '4th',
        department: 'AI&DS',
        dob: '2002-04-08',
        bloodGroup: 'AB-',
        fatherName: 'Mr. Riya R',
        motherName: 'Mrs. Riya R',
        address: '888, Tech Street, Vellore, Tamil Nadu - 632003'
      },
      {
        rollNo: '23100009',
        name: 'Siddharth',
        collegeEmail: 'student23100009@college.edu',
        personalEmail: 'siddharth.s@gmail.com',
        phone: '9876500009',
        abcId: 'ABC23100009',
        incomeCertNo: 'CERT23100009',
        year: '4th',
        department: 'AI&DS',
        dob: '2002-08-19',
        bloodGroup: 'O+',
        fatherName: 'Mr. Siddharth S',
        motherName: 'Mrs. Siddharta S',
        address: '999, Future Street, Kanchipuram, Tamil Nadu - 631503'
      },
      {
        rollNo: '23100010',
        name: 'Tanya',
        collegeEmail: 'student23100010@college.edu',
        personalEmail: 'tanya.t@gmail.com',
        phone: '9876500010',
        abcId: 'ABC23100010',
        incomeCertNo: 'CERT23100010',
        year: '4th',
        department: 'AI&DS',
        dob: '2002-05-27',
        bloodGroup: 'B+',
        fatherName: 'Mr. Tanya T',
        motherName: 'Mrs. Tanya T',
        address: '1000, Vision Lane, Tiruppur, Tamil Nadu - 641603'
      }
    ]

    const allStudents = [...secondYearStudents, ...thirdYearStudents, ...fourthYearStudents]
    console.log(`\n📊 Attempting to insert ${allStudents.length} students with complete details...`)
    
    const result = await Student.insertMany(allStudents)
    console.log(`\n✓ Successfully created ${result.length} students`)
    console.log(`  ├─ 2nd Year: 10 students (23102001-23102010)`)
    console.log(`  ├─ 3rd Year: 10 students (23101001-23101010)`)
    console.log(`  └─ 4th Year: 10 students (23100001-23100010)`)

    // Verify data was inserted
    const count = await Student.countDocuments()
    console.log(`\n✓ Total students in database: ${count}`)

    // Show sample student details
    const sampleStudent = await Student.findOne({ rollNo: '23102001' })
    console.log(`\n📋 Sample Student Details:`)
    console.log(`  Name: ${sampleStudent.name}`)
    console.log(`  Roll No: ${sampleStudent.rollNo}`)
    console.log(`  DOB: ${sampleStudent.dob}`)
    console.log(`  Blood Group: ${sampleStudent.bloodGroup}`)
    console.log(`  Father: ${sampleStudent.fatherName}`)
    console.log(`  Mother: ${sampleStudent.motherName}`)
    console.log(`  Address: ${sampleStudent.address}`)

    await mongoose.connection.close()
    console.log(`\n✓ Database connection closed`)
    console.log(`\n✅ All student details successfully pushed to database!`)
  } catch (err) {
    console.error('❌ Error seeding students:', err)
    process.exit(1)
  }
}

seedCompleteStudentDetails()
