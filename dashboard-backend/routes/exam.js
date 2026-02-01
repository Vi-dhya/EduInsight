import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import ExamSchedule from '../models/ExamSchedule.js'
import HallAssignment from '../models/HallAssignment.js'
import Marks from '../models/Marks.js'

const router = express.Router()

// Get exam schedules
router.get('/schedules', verifyToken, async (req, res) => {
  try {
    const { year, department, semester } = req.query
    const filter = {}
    
    if (year) filter.year = year
    if (department) filter.department = department
    if (semester) filter.semester = semester

    const schedules = await ExamSchedule.find(filter).sort({ date: 1 })
    res.json(schedules)
  } catch (error) {
    console.error('Error fetching schedules:', error)
    res.status(500).json({ message: 'Error fetching schedules', error: error.message })
  }
})

// Add exam schedule
router.post('/schedules', verifyToken, async (req, res) => {
  try {
    const schedule = new ExamSchedule(req.body)
    await schedule.save()
    res.status(201).json(schedule)
  } catch (error) {
    console.error('Error adding schedule:', error)
    res.status(500).json({ message: 'Error adding schedule', error: error.message })
  }
})

// Update exam schedule
router.put('/schedules/:id', verifyToken, async (req, res) => {
  try {
    const schedule = await ExamSchedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' })
    }
    
    res.json(schedule)
  } catch (error) {
    console.error('Error updating schedule:', error)
    res.status(500).json({ message: 'Error updating schedule', error: error.message })
  }
})

// Delete exam schedule
router.delete('/schedules/:id', verifyToken, async (req, res) => {
  try {
    const schedule = await ExamSchedule.findByIdAndDelete(req.params.id)
    
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' })
    }
    
    res.json({ message: 'Schedule deleted successfully' })
  } catch (error) {
    console.error('Error deleting schedule:', error)
    res.status(500).json({ message: 'Error deleting schedule', error: error.message })
  }
})

// Get hall assignments
router.get('/hall-assignments', verifyToken, async (req, res) => {
  try {
    const { year } = req.query
    const filter = {}
    
    if (year) filter.year = year

    const assignments = await HallAssignment.find(filter).sort({ examDate: 1 })
    res.json(assignments)
  } catch (error) {
    console.error('Error fetching hall assignments:', error)
    res.status(500).json({ message: 'Error fetching hall assignments', error: error.message })
  }
})

// Add hall assignment
router.post('/hall-assignments', verifyToken, async (req, res) => {
  try {
    const assignment = new HallAssignment(req.body)
    await assignment.save()
    res.status(201).json(assignment)
  } catch (error) {
    console.error('Error adding hall assignment:', error)
    res.status(500).json({ message: 'Error adding hall assignment', error: error.message })
  }
})

// Update hall assignment
router.put('/hall-assignments/:id', verifyToken, async (req, res) => {
  try {
    const assignment = await HallAssignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!assignment) {
      return res.status(404).json({ message: 'Hall assignment not found' })
    }
    
    res.json(assignment)
  } catch (error) {
    console.error('Error updating hall assignment:', error)
    res.status(500).json({ message: 'Error updating hall assignment', error: error.message })
  }
})

// Delete hall assignment
router.delete('/hall-assignments/:id', verifyToken, async (req, res) => {
  try {
    const assignment = await HallAssignment.findByIdAndDelete(req.params.id)
    
    if (!assignment) {
      return res.status(404).json({ message: 'Hall assignment not found' })
    }
    
    res.json({ message: 'Hall assignment deleted successfully' })
  } catch (error) {
    console.error('Error deleting hall assignment:', error)
    res.status(500).json({ message: 'Error deleting hall assignment', error: error.message })
  }
})

// Get marks
router.get('/marks', verifyToken, async (req, res) => {
  try {
    const { year, semester } = req.query
    const filter = {}
    
    if (year) filter.year = year
    if (semester) filter.semester = semester

    const marks = await Marks.find(filter).sort({ createdAt: -1 })
    res.json(marks)
  } catch (error) {
    console.error('Error fetching marks:', error)
    res.status(500).json({ message: 'Error fetching marks', error: error.message })
  }
})

// Add marks
router.post('/marks', verifyToken, async (req, res) => {
  try {
    const { rollNo, name, internal1, internal2, totalMark, semester, year } = req.body
    
    // Calculate grade based on total marks
    let grade = 'F'
    if (totalMark >= 90) grade = 'A+'
    else if (totalMark >= 80) grade = 'A'
    else if (totalMark >= 70) grade = 'B'
    else if (totalMark >= 60) grade = 'C'
    else if (totalMark >= 50) grade = 'D'

    const mark = new Marks({
      rollNo,
      name,
      internal1,
      internal2,
      totalMark,
      semester,
      grade,
      year
    })

    await mark.save()
    res.status(201).json(mark)
  } catch (error) {
    console.error('Error adding marks:', error)
    res.status(500).json({ message: 'Error adding marks', error: error.message })
  }
})

// Update marks
router.put('/marks/:id', verifyToken, async (req, res) => {
  try {
    const { internal1, internal2, totalMark } = req.body
    
    // Recalculate grade if totalMark is provided
    let grade
    if (totalMark !== undefined) {
      if (totalMark >= 90) grade = 'A+'
      else if (totalMark >= 80) grade = 'A'
      else if (totalMark >= 70) grade = 'B'
      else if (totalMark >= 60) grade = 'C'
      else if (totalMark >= 50) grade = 'D'
      else grade = 'F'
    }

    const updateData = { ...req.body }
    if (grade) updateData.grade = grade

    const mark = await Marks.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
    
    if (!mark) {
      return res.status(404).json({ message: 'Mark not found' })
    }
    
    res.json(mark)
  } catch (error) {
    console.error('Error updating marks:', error)
    res.status(500).json({ message: 'Error updating marks', error: error.message })
  }
})

// Delete marks
router.delete('/marks/:id', verifyToken, async (req, res) => {
  try {
    const mark = await Marks.findByIdAndDelete(req.params.id)
    
    if (!mark) {
      return res.status(404).json({ message: 'Mark not found' })
    }
    
    res.json({ message: 'Mark deleted successfully' })
  } catch (error) {
    console.error('Error deleting marks:', error)
    res.status(500).json({ message: 'Error deleting marks', error: error.message })
  }
})

// Get marks statistics
router.get('/marks/stats', verifyToken, async (req, res) => {
  try {
    const { year } = req.query
    const filter = {}
    
    if (year) filter.year = year

    const stats = await Marks.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$grade',
          count: { $sum: 1 }
        }
      }
    ])

    const total = await Marks.countDocuments(filter)
    const passed = await Marks.countDocuments({ ...filter, grade: { $ne: 'F' } })
    const failed = await Marks.countDocuments({ ...filter, grade: 'F' })

    const result = {
      total,
      passed,
      failed,
      passPercentage: total > 0 ? ((passed / total) * 100).toFixed(2) : 0,
      failPercentage: total > 0 ? ((failed / total) * 100).toFixed(2) : 0,
      gradeDistribution: {}
    }

    stats.forEach(stat => {
      result.gradeDistribution[stat._id] = stat.count
    })

    res.json(result)
  } catch (error) {
    console.error('Error fetching marks stats:', error)
    res.status(500).json({ message: 'Error fetching marks stats', error: error.message })
  }
})

export default router