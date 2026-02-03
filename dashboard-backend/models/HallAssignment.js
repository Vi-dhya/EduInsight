import mongoose from 'mongoose'

const hallAssignmentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true,
    enum: ['1st', '2nd', '3rd', '4th']
  },
  block: {
    type: String,
    required: true
  },
  hallNo: {
    type: String,
    required: true
  },
  seatNo: {
    type: String,
    required: true
  },
  examName: {
    type: String,
    required: true
  },
  examDate: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  department: {
    type: String,
    default: 'AI&DS'
  },
  hallFile: {
    type: String // File path for uploaded hall assignment PDF
  },
  ocrProcessed: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const HallAssignment = mongoose.model('HallAssignment', hallAssignmentSchema)

export default HallAssignment