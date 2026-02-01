import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import Student from '../models/Student.js'
import Marks from '../models/Marks.js'
import Certification from '../models/Certification.js'
import Internship from '../models/Internship.js'
import Notice from '../models/Notice.js'

const router = express.Router()

// Get dashboard analytics
router.get('/analytics', verifyToken, async (req, res) => {
  try {
    const { year, department = 'AI&DS' } = req.query

    // Student counts by year - fix department filter
    const studentCounts = await Student.aggregate([
      { $match: { department: 'AI&DS' } }, // Use exact department name
      {
        $group: {
          _id: '$year',
          count: { $sum: 1 }
        }
      }
    ])

    const studentCountsObj = {
      '1st': 0,
      '2nd': 0,
      '3rd': 0,
      '4th': 0
    }

    studentCounts.forEach(item => {
      studentCountsObj[item._id] = item.count
    })

    // Pass/Fail statistics for selected year
    let passFailData = { passed: 0, failed: 0 }
    if (year) {
      const marksStats = await Marks.aggregate([
        { $match: { year } },
        {
          $group: {
            _id: { $cond: [{ $eq: ['$grade', 'F'] }, 'failed', 'passed'] },
            count: { $sum: 1 }
          }
        }
      ])

      marksStats.forEach(item => {
        passFailData[item._id] = item.count
      })
    }

    // Certification statistics for selected year
    let certificationData = { accepted: 0, pending: 0, rejected: 0 }
    if (year) {
      const certStats = await Certification.aggregate([
        { $match: { year } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ])

      certStats.forEach(item => {
        certificationData[item._id.toLowerCase()] = item.count
      })
    }

    // Recent notices
    const recentNotices = await Notice.find({ 
      isActive: true,
      $or: [
        { department },
        { type: 'college' }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(5)

    // Overall statistics
    const totalStudents = await Student.countDocuments({ department })
    const totalCertifications = await Certification.countDocuments()
    const totalInternships = await Internship.countDocuments()
    const totalNotices = await Notice.countDocuments({ isActive: true })

    res.json({
      studentCounts: studentCountsObj,
      passFailData,
      certificationData,
      recentNotices,
      overallStats: {
        totalStudents,
        totalCertifications,
        totalInternships,
        totalNotices
      }
    })
  } catch (error) {
    console.error('Error fetching dashboard analytics:', error)
    res.status(500).json({ message: 'Error fetching dashboard analytics', error: error.message })
  }
})

// Get year-wise statistics
router.get('/year-stats/:year', verifyToken, async (req, res) => {
  try {
    const { year } = req.params
    const { department = 'AI&DS' } = req.query

    // Student count for the year
    const studentCount = await Student.countDocuments({ year, department })

    // Marks statistics
    const marksStats = await Marks.aggregate([
      { $match: { year } },
      {
        $group: {
          _id: null,
          totalStudents: { $sum: 1 },
          averageMarks: { $avg: '$totalMark' },
          highestMarks: { $max: '$totalMark' },
          lowestMarks: { $min: '$totalMark' },
          passed: {
            $sum: {
              $cond: [{ $ne: ['$grade', 'F'] }, 1, 0]
            }
          },
          failed: {
            $sum: {
              $cond: [{ $eq: ['$grade', 'F'] }, 1, 0]
            }
          }
        }
      }
    ])

    // Certification statistics
    const certStats = await Certification.aggregate([
      { $match: { year } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])

    const certificationStats = { accepted: 0, pending: 0, rejected: 0 }
    certStats.forEach(item => {
      certificationStats[item._id.toLowerCase()] = item.count
    })

    // Internship statistics
    const internshipStats = await Internship.aggregate([
      { $match: { year } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ])

    const internshipData = { internship: 0, leave: 0 }
    internshipStats.forEach(item => {
      internshipData[item._id.toLowerCase()] = item.count
    })

    res.json({
      year,
      studentCount,
      marksStats: marksStats[0] || {
        totalStudents: 0,
        averageMarks: 0,
        highestMarks: 0,
        lowestMarks: 0,
        passed: 0,
        failed: 0
      },
      certificationStats,
      internshipStats: internshipData
    })
  } catch (error) {
    console.error('Error fetching year statistics:', error)
    res.status(500).json({ message: 'Error fetching year statistics', error: error.message })
  }
})

export default router