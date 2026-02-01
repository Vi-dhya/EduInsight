import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'Replied', 'Resolved'],
    default: 'Pending'
  },
  rollNo: {
    type: String,
    required: true
  },
  studentName: String,
  studentEmail: String,
  messages: [{
    sender: {
      type: String,
      enum: ['student', 'faculty'],
      required: true
    },
    name: String,
    text: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Ticket', ticketSchema)
