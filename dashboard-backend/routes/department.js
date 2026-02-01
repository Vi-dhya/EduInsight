import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import Student from '../models/Student.js'
import Certification from '../models/Certification.js'
import Internship from '../models/Internship.js'

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
    const { year } = req.query
    const filter = {}
    
    if (year) filter.year = year

    const certifications = await Certification.find(filter)
      .populate('studentId', 'name rollNo')
      .sort({ createdAt: -1 })
    
    res.json({
      count: certifications.length,
      certifications
    })
  } catch (error) {
    console.error('Error fetching certifications:', error)
    res.status(500).json({ message: 'Error fetching certifications', error: error.message })
  }
})

// Add certification
router.post('/certifications', verifyToken, async (req, res) => {
  try {
    const certification = new Certification(req.body)
    await certification.save()
    await certification.populate('studentId', 'name rollNo')
    res.status(201).json(certification)
  } catch (error) {
    console.error('Error adding certification:', error)
    res.status(500).json({ message: 'Error adding certification', error: error.message })
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

// Get internships
router.get('/internships', verifyToken, async (req, res) => {
  try {
    const { year } = req.query
    const filter = {}
    
    if (year) filter.year = year

    const internships = await Internship.find(filter)
      .populate('studentId', 'name rollNo')
      .sort({ createdAt: -1 })
    
    res.json({
      count: internships.length,
      internships
    })
  } catch (error) {
    console.error('Error fetching internships:', error)
    res.status(500).json({ message: 'Error fetching internships', error: error.message })
  }
})

// Add internship
router.post('/internships', verifyToken, async (req, res) => {
  try {
    const internship = new Internship(req.body)
    await internship.save()
    await internship.populate('studentId', 'name rollNo')
    res.status(201).json(internship)
  } catch (error) {
    console.error('Error adding internship:', error)
    res.status(500).json({ message: 'Error adding internship', error: error.message })
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

export default router