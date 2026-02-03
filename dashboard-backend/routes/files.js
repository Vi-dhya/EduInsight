import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { verifyToken } from '../middleware/auth.js'
import Certification from '../models/Certification.js'
import Internship from '../models/Internship.js'
import Student from '../models/Student.js'
import Marks from '../models/Marks.js'
import ExamSchedule from '../models/ExamSchedule.js'
import HallAssignment from '../models/HallAssignment.js'
import { extractScheduleFromImage } from '../utils/scheduleExtractor.js'
import { extractHallAssignmentsFromImage } from '../utils/hallExtractor.js'
import { extractMarksFromImage } from '../utils/marksExtractor.js'

const router = express.Router()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

// Upload certificate
router.post('/upload-certificate', verifyToken, upload.single('file'), async (req, res) => {
  try {
    console.log('=== CERTIFICATE UPLOAD START ===')
    console.log('req.user:', req.user)
    console.log('req.file:', req.file ? { name: req.file.originalname, size: req.file.size } : 'NO FILE')
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Validate file type
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.doc', '.docx']
    const fileExtension = path.extname(req.file.originalname).toLowerCase()
    console.log('Certificate upload - File:', req.file.originalname, 'Extension:', fileExtension)
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ message: `Invalid file format. Allowed: PDF, JPG, JPEG, PNG, GIF, BMP, DOC, DOCX. Got: ${fileExtension}` })
    }

    // Extract rollNo from email (student23102001@college.edu -> 23102001)
    const email = req.user?.email
    console.log('Certificate upload - Email from token:', email)
    
    if (!email) {
      return res.status(400).json({ message: 'Email not found in token' })
    }

    const rollNoMatch = email.match(/student(\d+)@/)
    if (!rollNoMatch) {
      console.log('Email does not match student pattern:', email)
      return res.status(400).json({ message: `Invalid student email format: ${email}` })
    }
    const rollNo = rollNoMatch[1]

    // Get student details
    const student = await Student.findOne({ rollNo })
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Create certification record
    const certification = new Certification({
      studentId: student._id,
      rollNo: student.rollNo,
      name: student.name,
      cert: req.file.originalname,
      protocol: req.body.protocol || 'other',
      type: 'certificate',
      credits: 0.5,
      year: student.year,
      department: student.department,
      certificateFile: `/uploads/${req.file.filename}`,
      status: 'Pending'
    })

    await certification.save()

    res.json({
      message: 'Certificate uploaded successfully',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        path: `/uploads/${req.file.filename}`
      }
    })
  } catch (err) {
    console.error('Error uploading certificate:', err)
    res.status(500).json({ message: 'Error uploading certificate', error: err.message })
  }
})

// Upload internship document
router.post('/upload-internship', verifyToken, upload.single('file'), async (req, res) => {
  try {
    console.log('=== INTERNSHIP UPLOAD START ===')
    console.log('req.user:', req.user)
    console.log('req.file:', req.file ? { name: req.file.originalname, size: req.file.size } : 'NO FILE')
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Validate file type
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.doc', '.docx']
    const fileExtension = path.extname(req.file.originalname).toLowerCase()
    console.log('Internship upload - File:', req.file.originalname, 'Extension:', fileExtension)
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ message: `Invalid file format. Allowed: PDF, JPG, JPEG, PNG, GIF, BMP, DOC, DOCX. Got: ${fileExtension}` })
    }

    // Extract rollNo from email (student23102001@college.edu -> 23102001)
    const email = req.user?.email
    console.log('Internship upload - Email from token:', email)
    
    if (!email) {
      return res.status(400).json({ message: 'Email not found in token' })
    }

    const rollNoMatch = email.match(/student(\d+)@/)
    if (!rollNoMatch) {
      console.log('Email does not match student pattern:', email)
      return res.status(400).json({ message: `Invalid student email format: ${email}` })
    }
    const rollNo = rollNoMatch[1]

    // Get student details
    const student = await Student.findOne({ rollNo })
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    // Create internship record
    const internship = new Internship({
      studentId: student._id,
      rollNo: student.rollNo,
      name: student.name,
      type: req.body.type || 'Internship',
      reason: req.body.type || 'Internship',
      photocopy: `/uploads/${req.file.filename}`,
      year: student.year,
      department: student.department,
      sentToParent: false
    })

    await internship.save()

    res.json({
      message: 'Internship document uploaded successfully',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        path: `/uploads/${req.file.filename}`
      }
    })
  } catch (err) {
    console.error('Error uploading internship:', err)
    res.status(500).json({ message: 'Error uploading internship', error: err.message })
  }
})

// Upload exam schedule
router.post('/upload-schedule', verifyToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }

  res.json({
    message: 'Schedule uploaded successfully',
    file: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: `/uploads/${req.file.filename}`
    }
  })
})

// Upload marks with OCR extraction
router.post('/upload-marks', verifyToken, upload.single('file'), async (req, res) => {
  try {
    console.log('=== MARKS UPLOAD START ===')
    console.log('req.file:', req.file ? { name: req.file.originalname, size: req.file.size } : 'NO FILE')
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Validate file type
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.bmp']
    const fileExtension = path.extname(req.file.originalname).toLowerCase()
    console.log('Marks upload - File:', req.file.originalname, 'Extension:', fileExtension)
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ message: `Invalid file format. Allowed: PDF, JPG, JPEG, PNG, GIF, BMP. Got: ${fileExtension}` })
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename)
    const fileUrl = `/uploads/${req.file.filename}`

    // Extract rollNo from email (student23102001@college.edu -> 23102001)
    const email = req.user.email
    const rollNoMatch = email.match(/student(\d+)@/)
    if (!rollNoMatch) {
      return res.status(400).json({ message: 'Invalid student email format' })
    }
    const rollNo = rollNoMatch[1]

    // Get student details
    const student = await Student.findOne({ rollNo })
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    const { course, uploadType } = req.body
    
    // Extract marks data using OCR
    let extractedData = null
    try {
      console.log('Starting OCR extraction for marks...')
      extractedData = await extractMarksFromImage(filePath, uploadType)
      console.log('OCR extraction completed:', extractedData)
    } catch (ocrError) {
      console.error('OCR extraction failed:', ocrError.message)
      extractedData = {
        ocrProcessed: false,
        rawText: 'Error during extraction'
      }
    }

    // Find or create marks record for this course
    let marks = await Marks.findOne({ rollNo, course })
    if (!marks) {
      marks = new Marks({
        rollNo: student.rollNo,
        name: student.name,
        course: course,
        year: student.year
      })
    }

    // Update the appropriate file field and extracted data based on upload type
    if (uploadType === 'internal1') {
      marks.internal1File = fileUrl
      marks.internal1FileUrl = fileUrl
      marks.internal1FileExtracted = {
        internal1: extractedData.internal1 || 0,
        confidence: 0.95
      }
      marks.internal1 = extractedData.internal1 || 0
    } else if (uploadType === 'internal2') {
      marks.internal2File = fileUrl
      marks.internal2FileUrl = fileUrl
      marks.internal2FileExtracted = {
        internal2: extractedData.internal2 || 0,
        confidence: 0.95
      }
      marks.internal2 = extractedData.internal2 || 0
    } else if (uploadType === 'semester') {
      marks.semesterFile = fileUrl
      marks.semesterFileUrl = fileUrl
      marks.semesterFileExtracted = {
        semesterMark: extractedData.semesterMark || 0,
        cgpa: extractedData.cgpa || 0,
        status: extractedData.status || 'Pass',
        confidence: 0.95
      }
      marks.totalMark = extractedData.semesterMark || 0
      marks.cgpa = extractedData.cgpa || 0
      marks.status = extractedData.status || 'Pass'
    } else if (uploadType === 'arrear') {
      marks.arrearFile = fileUrl
      marks.arrearFileExtracted = {
        arrearCourses: extractedData.arrearCourses || [],
        confidence: 0.95
      }
      marks.arrearCourses = extractedData.arrearCourses || []
      marks.status = 'Arrear'
    }

    await marks.save()

    res.json({
      message: 'Marks uploaded successfully',
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        path: fileUrl,
        extractedData: extractedData,
        isImage: /\.(jpg|jpeg|png|gif|bmp)$/i.test(req.file.originalname)
      }
    })
  } catch (err) {
    console.error('Error uploading marks:', err)
    res.status(500).json({ message: 'Error uploading marks', error: err.message })
  }
})

// Download file
router.get('/download/:filename', verifyToken, (req, res) => {
  const filename = req.params.filename
  const filepath = path.join(__dirname, '../uploads', filename)
  res.download(filepath)
})

// Upload exam schedule with OCR extraction
router.post('/upload-exam-schedule', verifyToken, upload.single('file'), async (req, res) => {
  try {
    console.log('=== EXAM SCHEDULE UPLOAD START ===')
    console.log('req.file:', req.file ? { name: req.file.originalname, size: req.file.size } : 'NO FILE')
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Validate file type (images and PDFs for OCR)
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.bmp']
    const fileExtension = path.extname(req.file.originalname).toLowerCase()
    console.log('Schedule upload - File:', req.file.originalname, 'Extension:', fileExtension)
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ message: `Invalid file format. Allowed: PDF, JPG, JPEG, PNG, GIF, BMP. Got: ${fileExtension}` })
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename)
    const fileUrl = `/uploads/${req.file.filename}`
    
    // Extract schedule data using OCR
    let extractedData = null
    try {
      console.log('Starting OCR extraction...')
      extractedData = await extractScheduleFromImage(filePath)
      console.log('OCR extraction completed:', extractedData)
    } catch (ocrError) {
      console.error('OCR extraction failed:', ocrError.message)
      // Continue without OCR data
      extractedData = {
        exams: [],
        totalExams: 0,
        rawText: ''
      }
    }

    // Get year and department from request
    const { year = '2nd', department = 'AI&DS' } = req.body

    // Create exam schedule record with extracted exams
    const examSchedule = new ExamSchedule({
      year: year,
      department: department,
      scheduleFile: fileUrl,
      exams: extractedData.exams || [],
      totalExams: extractedData.totalExams || 0,
      ocrProcessed: true
    })

    await examSchedule.save()
    console.log('Exam schedule saved:', examSchedule)

    res.json({
      message: 'Exam schedule uploaded successfully',
      schedule: {
        _id: examSchedule._id,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        path: fileUrl,
        exams: extractedData.exams,
        totalExams: extractedData.totalExams,
        ocrProcessed: true
      }
    })
  } catch (err) {
    console.error('Error uploading exam schedule:', err)
    res.status(500).json({ message: 'Error uploading exam schedule', error: err.message })
  }
})

// Upload hall assignments with OCR extraction
router.post('/upload-hall-assignments', verifyToken, upload.single('file'), async (req, res) => {
  try {
    console.log('=== HALL ASSIGNMENTS UPLOAD START ===')
    console.log('req.file:', req.file ? { name: req.file.originalname, size: req.file.size } : 'NO FILE')
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Validate file type (images and PDFs for OCR)
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.bmp']
    const fileExtension = path.extname(req.file.originalname).toLowerCase()
    console.log('Hall assignments upload - File:', req.file.originalname, 'Extension:', fileExtension)
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ message: `Invalid file format. Allowed: PDF, JPG, JPEG, PNG, GIF, BMP. Got: ${fileExtension}` })
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename)
    const fileUrl = `/uploads/${req.file.filename}`
    
    // Extract hall assignment data using OCR
    let extractedData = null
    try {
      console.log('Starting OCR extraction for hall assignments...')
      extractedData = await extractHallAssignmentsFromImage(filePath)
      console.log('OCR extraction completed:', extractedData)
    } catch (ocrError) {
      console.error('OCR extraction failed:', ocrError.message)
      // Continue without OCR data
      extractedData = {
        assignments: [],
        totalAssignments: 0,
        rawText: ''
      }
    }

    // Get year and department from request
    const { year = '2nd', department = 'AI&DS' } = req.body

    // Delete existing hall assignments for this year and department
    await HallAssignment.deleteMany({ year, department })

    // Create hall assignment records with extracted data
    const hallAssignments = []
    for (const assignment of (extractedData.assignments || [])) {
      const hallAssignment = new HallAssignment({
        rollNo: assignment.rollNo,
        name: assignment.name,
        year: year,
        block: assignment.block,
        hallNo: assignment.hallNo,
        seatNo: assignment.seatNo,
        examName: assignment.examName,
        examDate: new Date(assignment.examDate),
        duration: assignment.duration,
        department: department,
        hallFile: fileUrl,
        ocrProcessed: true
      })
      await hallAssignment.save()
      hallAssignments.push(hallAssignment)
    }

    console.log('Hall assignments saved:', hallAssignments.length)

    res.json({
      message: 'Hall assignments uploaded successfully',
      assignments: {
        _id: hallAssignments[0]?._id,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        path: fileUrl,
        assignments: hallAssignments,
        totalAssignments: hallAssignments.length,
        ocrProcessed: true
      }
    })
  } catch (err) {
    console.error('Error uploading hall assignments:', err)
    res.status(500).json({ message: 'Error uploading hall assignments', error: err.message })
  }
})

// Delete exam schedules
router.delete('/delete-exam-schedules/:year', verifyToken, async (req, res) => {
  try {
    const { year } = req.params
    const { department = 'AI&DS' } = req.body

    const result = await ExamSchedule.deleteMany({ year, department })
    console.log(`✓ Deleted ${result.deletedCount} exam schedule records for ${year} year`)

    res.json({
      message: `Successfully deleted ${result.deletedCount} exam schedule records`,
      deletedCount: result.deletedCount
    })
  } catch (err) {
    console.error('Error deleting exam schedules:', err)
    res.status(500).json({ message: 'Error deleting exam schedules', error: err.message })
  }
})

// Delete hall assignments
router.delete('/delete-hall-assignments/:year', verifyToken, async (req, res) => {
  try {
    const { year } = req.params
    const { department = 'AI&DS' } = req.body

    const result = await HallAssignment.deleteMany({ year, department })
    console.log(`✓ Deleted ${result.deletedCount} hall assignment records for ${year} year`)

    res.json({
      message: `Successfully deleted ${result.deletedCount} hall assignment records`,
      deletedCount: result.deletedCount
    })
  } catch (err) {
    console.error('Error deleting hall assignments:', err)
    res.status(500).json({ message: 'Error deleting hall assignments', error: err.message })
  }
})

export default router
