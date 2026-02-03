import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import Student from '../models/Student.js'
import Certification from '../models/Certification.js'
import Internship from '../models/Internship.js'
import Marks from '../models/Marks.js'
import archiver from 'archiver'
import fs from 'fs'
import path from 'path'

const router = express.Router()

// Get students
router.get('/students', verifyToken, async (req, res) => {
  try {
    const { year, department } = req.query
    const filter = {}
    
    if (year) filter.year = year
    if (department) filter.department = department

    const students = await Student.find(filter).sort({ createdAt: -1 })
    
    res.json({
      count: students.length,
      students
    })
  } catch (error) {
    console.error('Error fetching students:', error)
    res.status(500).json({ message: 'Error fetching students', error: error.message })
  }
})

// Add student
router.post('/students', verifyToken, async (req, res) => {
  try {
    const student = new Student(req.body)
    await student.save()
    res.status(201).json(student)
  } catch (error) {
    console.error('Error adding student:', error)
    res.status(500).json({ message: 'Error adding student', error: error.message })
  }
})

// Update student
router.put('/students/:id', verifyToken, async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    
    res.json(student)
  } catch (error) {
    console.error('Error updating student:', error)
    res.status(500).json({ message: 'Error updating student', error: error.message })
  }
})

// Delete student
router.delete('/students/:id', verifyToken, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }
    
    res.json({ message: 'Student deleted successfully' })
  } catch (error) {
    console.error('Error deleting student:', error)
    res.status(500).json({ message: 'Error deleting student', error: error.message })
  }
})

// Get student count
router.get('/students/count', verifyToken, async (req, res) => {
  try {
    const { year, department } = req.query
    const filter = {}
    
    if (year) filter.year = year
    if (department) filter.department = department

    const count = await Student.countDocuments(filter)
    res.json({ count })
  } catch (error) {
    console.error('Error fetching student count:', error)
    res.status(500).json({ message: 'Error fetching student count', error: error.message })
  }
})

// Get certifications
router.get('/certifications', verifyToken, async (req, res) => {
  try {
    const { year, department, rollNo } = req.query
    const filter = {}
    
    if (year) filter.year = year
    if (department) filter.department = department
    if (rollNo) filter.rollNo = rollNo

    const certifications = await Certification.find(filter)
      .populate('studentId', 'name rollNo')
      .sort({ createdAt: -1 })
    
    res.json(
      Array.isArray(certifications) ? certifications : []
    )
  } catch (error) {
    console.error('Error fetching certifications:', error)
    res.status(500).json({ message: 'Error fetching certifications', error: error.message })
  }
})

// Add certification
router.post('/certifications', verifyToken, async (req, res) => {
  try {
    console.log('Adding certification with data:', req.body)
    const certification = new Certification(req.body)
    await certification.save()
    console.log('Certification saved successfully:', certification)
    await certification.populate('studentId', 'name rollNo')
    res.status(201).json(certification)
  } catch (error) {
    console.error('Error adding certification:', error)
    res.status(500).json({ message: 'Error adding certification', error: error.message, details: error })
  }
})

// Update certification status
router.put('/certifications/:id', verifyToken, async (req, res) => {
  try {
    const { status, remarks } = req.body
    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      { status, remarks },
      { new: true, runValidators: true }
    ).populate('studentId', 'name rollNo')
    
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' })
    }
    
    res.json(certification)
  } catch (error) {
    console.error('Error updating certification:', error)
    res.status(500).json({ message: 'Error updating certification', error: error.message })
  }
})

// Update certification status (PATCH)
router.patch('/certifications/:id', verifyToken, async (req, res) => {
  try {
    const { status, remarks } = req.body
    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      { status, remarks },
      { new: true, runValidators: true }
    ).populate('studentId', 'name rollNo')
    
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' })
    }
    
    res.json(certification)
  } catch (error) {
    console.error('Error updating certification:', error)
    res.status(500).json({ message: 'Error updating certification', error: error.message })
  }
})

// Delete certification
router.delete('/certifications/:id', verifyToken, async (req, res) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id)
    
    if (!certification) {
      return res.status(404).json({ message: 'Certification not found' })
    }
    
    res.json({ message: 'Certification deleted successfully' })
  } catch (error) {
    console.error('Error deleting certification:', error)
    res.status(500).json({ message: 'Error deleting certification', error: error.message })
  }
})

// Get certification stats
router.get('/certifications/stats', verifyToken, async (req, res) => {
  try {
    const { year } = req.query
    const filter = {}
    
    if (year) filter.year = year

    const stats = await Certification.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])

    const result = {
      total: 0,
      accepted: 0,
      pending: 0,
      rejected: 0
    }

    stats.forEach(stat => {
      result.total += stat.count
      result[stat._id.toLowerCase()] = stat.count
    })

    res.json(result)
  } catch (error) {
    console.error('Error fetching certification stats:', error)
    res.status(500).json({ message: 'Error fetching certification stats', error: error.message })
  }
})

// Download certifications as ZIP
router.get('/certifications/download-zip', verifyToken, async (req, res) => {
  try {
    const { year } = req.query
    const filter = {}
    
    if (year) filter.year = year

    const certifications = await Certification.find(filter)
    
    if (certifications.length === 0) {
      return res.status(404).json({ message: 'No certifications found' })
    }

    // Create a ZIP archive
    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', `attachment; filename="certificates_${year || 'all'}_year.zip"`)

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.pipe(res)

    // Add each certification file with renamed filename
    certifications.forEach((cert, index) => {
      if (cert.certificateFile) {
        const filePath = path.join('uploads', cert.certificateFile)
        
        // Check if file exists
        if (fs.existsSync(filePath)) {
          const fileExtension = path.extname(cert.certificateFile)
          const renamedFileName = `${cert.rollNo}_${cert.name}_${cert.cert}${fileExtension}`
          
          archive.file(filePath, { name: renamedFileName })
        }
      }
    })

    // Add a summary CSV file
    let csvContent = 'Roll No,Name,Certificate,Status,Date\n'
    certifications.forEach(c => {
      const date = c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'N/A'
      csvContent += `"${c.rollNo}","${c.name}","${c.cert}","${c.status || 'Pending'}","${date}"\n`
    })
    
    archive.append(csvContent, { name: 'certificates_summary.csv' })

    archive.finalize()
  } catch (error) {
    console.error('Error downloading certifications:', error)
    res.status(500).json({ message: 'Error downloading certifications', error: error.message })
  }
})

// Get internships
router.get('/internships', verifyToken, async (req, res) => {
  try {
    const { year, department, rollNo } = req.query
    const filter = {}
    
    if (year) filter.year = year
    if (department) filter.department = department
    if (rollNo) filter.rollNo = rollNo

    const internships = await Internship.find(filter)
      .populate('studentId', 'name rollNo')
      .sort({ createdAt: -1 })
    
    res.json(
      Array.isArray(internships) ? internships : []
    )
  } catch (error) {
    console.error('Error fetching internships:', error)
    res.status(500).json({ message: 'Error fetching internships', error: error.message })
  }
})

// Add internship
router.post('/internships', verifyToken, async (req, res) => {
  try {
    console.log('Adding internship with data:', req.body)
    const internship = new Internship(req.body)
    await internship.save()
    console.log('Internship saved successfully:', internship)
    await internship.populate('studentId', 'name rollNo')
    res.status(201).json(internship)
  } catch (error) {
    console.error('Error adding internship:', error)
    res.status(500).json({ message: 'Error adding internship', error: error.message, details: error })
  }
})

// Send internship to parent
router.post('/internships/:id/send-to-parent', verifyToken, async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      { sentToParent: true },
      { new: true }
    ).populate('studentId', 'name rollNo')
    
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' })
    }
    
    res.json({ message: 'Sent to parent successfully', internship })
  } catch (error) {
    console.error('Error sending to parent:', error)
    res.status(500).json({ message: 'Error sending to parent', error: error.message })
  }
})

// Update internship status (PATCH)
router.patch('/internships/:id', verifyToken, async (req, res) => {
  try {
    const { status } = req.body
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('studentId', 'name rollNo')
    
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' })
    }
    
    res.json(internship)
  } catch (error) {
    console.error('Error updating internship:', error)
    res.status(500).json({ message: 'Error updating internship', error: error.message })
  }
})

// Delete internship
router.delete('/internships/:id', verifyToken, async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id)
    
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' })
    }
    
    res.json({ message: 'Internship deleted successfully' })
  } catch (error) {
    console.error('Error deleting internship:', error)
    res.status(500).json({ message: 'Error deleting internship', error: error.message })
  }
})

// Download internships as ZIP
router.get('/internships/download-zip', verifyToken, async (req, res) => {
  try {
    const { year } = req.query
    const filter = {}
    
    if (year) filter.year = year

    const internships = await Internship.find(filter)
    
    if (internships.length === 0) {
      return res.status(404).json({ message: 'No internships found' })
    }

    // Create a ZIP archive
    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', `attachment; filename="internships_${year || 'all'}_year.zip"`)

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.pipe(res)

    // Add each internship file with renamed filename
    internships.forEach((internship, index) => {
      if (internship.photocopy) {
        const filePath = path.join('uploads', internship.photocopy)
        
        // Check if file exists
        if (fs.existsSync(filePath)) {
          const fileExtension = path.extname(internship.photocopy)
          const renamedFileName = `${internship.rollNo}_${internship.name}_${internship.type}${fileExtension}`
          
          archive.file(filePath, { name: renamedFileName })
        }
      }
    })

    // Add a summary CSV file
    let csvContent = 'Roll No,Name,Type,Reason,Sent to Parent,Date\n'
    internships.forEach(i => {
      const date = i.createdAt ? new Date(i.createdAt).toLocaleDateString() : 'N/A'
      csvContent += `"${i.rollNo}","${i.name}","${i.type}","${i.reason}","${i.sentToParent ? 'Yes' : 'No'}","${date}"\n`
    })
    
    archive.append(csvContent, { name: 'internships_summary.csv' })

    archive.finalize()
  } catch (error) {
    console.error('Error downloading internships:', error)
    res.status(500).json({ message: 'Error downloading internships', error: error.message })
  }
})

// Get marks by year and course
router.get('/marks', verifyToken, async (req, res) => {
  try {
    const { year, course, department } = req.query
    const filter = {}
    
    if (year) filter.year = year
    if (course) filter.course = course
    if (department) filter.department = department

    const marks = await Marks.find(filter)
      .sort({ rollNo: 1 })
    
    res.json(
      Array.isArray(marks) ? marks : []
    )
  } catch (error) {
    console.error('Error fetching marks:', error)
    res.status(500).json({ message: 'Error fetching marks', error: error.message })
  }
})

// Download marks as ZIP
router.get('/marks/download-zip', verifyToken, async (req, res) => {
  try {
    const { year } = req.query
    const filter = {}
    
    if (year) filter.year = year

    const marks = await Marks.find(filter)
    
    if (marks.length === 0) {
      return res.status(404).json({ message: 'No marks found' })
    }

    // Create a ZIP archive
    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', `attachment; filename="marks_${year || 'all'}_year.zip"`)

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.pipe(res)

    // Add each mark sheet file with renamed filename
    marks.forEach((mark, index) => {
      if (mark.markSheetFile) {
        const filePath = path.join('uploads', mark.markSheetFile)
        
        // Check if file exists
        if (fs.existsSync(filePath)) {
          const fileExtension = path.extname(mark.markSheetFile)
          const renamedFileName = `${mark.rollNo}_${mark.name}_Semester${mark.semester}${fileExtension}`
          
          archive.file(filePath, { name: renamedFileName })
        }
      }
    })

    // Add a summary CSV file
    let csvContent = 'Roll No,Name,Semester,Internal 1,Internal 2,Total Mark,Grade,Date\n'
    marks.forEach(m => {
      const date = m.createdAt ? new Date(m.createdAt).toLocaleDateString() : 'N/A'
      csvContent += `"${m.rollNo}","${m.name}","${m.semester}","${m.internal1 || 0}","${m.internal2 || 0}","${m.totalMark || 0}","${m.grade || 'N/A'}","${date}"\n`
    })
    
    archive.append(csvContent, { name: 'marks_summary.csv' })

    archive.finalize()
  } catch (error) {
    console.error('Error downloading marks:', error)
    res.status(500).json({ message: 'Error downloading marks', error: error.message })
  }
})

export default router