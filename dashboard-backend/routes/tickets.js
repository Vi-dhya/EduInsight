import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import Ticket from '../models/Ticket.js'

const router = express.Router()

// Get all tickets for a student
router.get('/', verifyToken, async (req, res) => {
  try {
    const { rollNo } = req.query
    const filter = {}
    
    if (rollNo) filter.rollNo = rollNo

    const tickets = await Ticket.find(filter).sort({ createdDate: -1 })
    res.json(tickets)
  } catch (error) {
    console.error('Error fetching tickets:', error)
    res.status(500).json({ message: 'Error fetching tickets', error: error.message })
  }
})

// Get ticket by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }
    
    res.json(ticket)
  } catch (error) {
    console.error('Error fetching ticket:', error)
    res.status(500).json({ message: 'Error fetching ticket', error: error.message })
  }
})

// Create new ticket
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, priority, rollNo, studentName, studentEmail } = req.body
    
    const ticket = new Ticket({
      title,
      description,
      priority: priority || 'medium',
      rollNo,
      studentName,
      studentEmail,
      messages: [{
        sender: 'student',
        name: studentName,
        text: description,
        date: new Date()
      }]
    })

    await ticket.save()
    res.status(201).json(ticket)
  } catch (error) {
    console.error('Error creating ticket:', error)
    res.status(500).json({ message: 'Error creating ticket', error: error.message })
  }
})

// Add message to ticket
router.post('/:id/messages', verifyToken, async (req, res) => {
  try {
    const { sender, name, text } = req.body
    
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          messages: {
            sender,
            name,
            text,
            date: new Date()
          }
        },
        $set: { updatedAt: new Date() }
      },
      { new: true }
    )
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }
    
    res.json(ticket)
  } catch (error) {
    console.error('Error adding message:', error)
    res.status(500).json({ message: 'Error adding message', error: error.message })
  }
})

// Update ticket status
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { status } = req.body
    
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }
    
    res.json(ticket)
  } catch (error) {
    console.error('Error updating ticket:', error)
    res.status(500).json({ message: 'Error updating ticket', error: error.message })
  }
})

// Delete ticket
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id)
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' })
    }
    
    res.json({ message: 'Ticket deleted successfully' })
  } catch (error) {
    console.error('Error deleting ticket:', error)
    res.status(500).json({ message: 'Error deleting ticket', error: error.message })
  }
})

export default router
