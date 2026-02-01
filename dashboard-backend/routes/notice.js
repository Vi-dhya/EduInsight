import express from 'express'
import { verifyToken, requireRole } from '../middleware/auth.js'
import Notice from '../models/Notice.js'

const router = express.Router()

// Get notices
router.get('/', verifyToken, async (req, res) => {
  try {
    const { type, department } = req.query
    const filter = { isActive: true }
    
    if (type) filter.type = type
    if (department) filter.department = department

    const notices = await Notice.find(filter).sort({ createdAt: -1 })
    res.json(notices)
  } catch (error) {
    console.error('Error fetching notices:', error)
    res.status(500).json({ message: 'Error fetching notices', error: error.message })
  }
})

// Get notice by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id)
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' })
    }
    
    res.json(notice)
  } catch (error) {
    console.error('Error fetching notice:', error)
    res.status(500).json({ message: 'Error fetching notice', error: error.message })
  }
})

// Add notice (faculty and admin only)
router.post('/', verifyToken, requireRole(['faculty', 'admin']), async (req, res) => {
  try {
    const { title, content, priority, type, department } = req.body
    
    const notice = new Notice({
      title,
      content,
      priority: priority || 'medium',
      type: type || 'general',
      department: department || 'AI&DS',
      author: req.user.name
    })

    await notice.save()
    res.status(201).json(notice)
  } catch (error) {
    console.error('Error adding notice:', error)
    res.status(500).json({ message: 'Error adding notice', error: error.message })
  }
})

// Update notice (faculty and admin only)
router.put('/:id', verifyToken, requireRole(['faculty', 'admin']), async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' })
    }
    
    res.json(notice)
  } catch (error) {
    console.error('Error updating notice:', error)
    res.status(500).json({ message: 'Error updating notice', error: error.message })
  }
})

// Delete notice (soft delete - set isActive to false)
router.delete('/:id', verifyToken, requireRole(['faculty', 'admin']), async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    )
    
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' })
    }
    
    res.json({ message: 'Notice deleted successfully' })
  } catch (error) {
    console.error('Error deleting notice:', error)
    res.status(500).json({ message: 'Error deleting notice', error: error.message })
  }
})

// Get notice count
router.get('/count', verifyToken, async (req, res) => {
  try {
    const { type, department } = req.query
    const filter = { isActive: true }
    
    if (type) filter.type = type
    if (department) filter.department = department

    const count = await Notice.countDocuments(filter)
    res.json({ count })
  } catch (error) {
    console.error('Error fetching notice count:', error)
    res.status(500).json({ message: 'Error fetching notice count', error: error.message })
  }
})

export default router