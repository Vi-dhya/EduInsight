import mongoose from 'mongoose'

const certificationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  name: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true
  },
  cert: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['internship', 'certificate'],
    default: 'certificate'
  },
  protocol: {
    type: String,
    required: true,
    enum: ['internship', 'coursera', 'udemy', 'events', 'workshop', 'nptel', 'other'],
    default: 'other'
  },
  credits: {
    type: Number,
    required: true,
    default: 0.5
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  remarks: {
    type: String,
    default: ''
  },
  year: {
    type: String,
    required: true,
    enum: ['1st', '2nd', '3rd', '4th']
  },
  department: {
    type: String,
    required: true,
    default: 'AI&DS'
  },
  certificateFile: {
    type: String // File path
  }
}, {
  timestamps: true
})

const Certification = mongoose.model('Certification', certificationSchema)

export default Certification