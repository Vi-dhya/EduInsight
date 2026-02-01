import mongoose from 'mongoose'

const internshipSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  rollNo: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Internship', 'Leave']
  },
  reason: {
    type: String,
    required: true
  },
  parentPhone: {
    type: String,
    required: true
  },
  photocopy: {
    type: String // File path
  },
  sentToParent: {
    type: Boolean,
    default: false
  },
  year: {
    type: String,
    required: true,
    enum: ['1st', '2nd', '3rd', '4th']
  }
}, {
  timestamps: true
})

const Internship = mongoose.model('Internship', internshipSchema)

export default Internship