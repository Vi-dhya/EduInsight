import mongoose from 'mongoose'

const certificationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
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
  certificateFile: {
    type: String // File path
  }
}, {
  timestamps: true
})

const Certification = mongoose.model('Certification', certificationSchema)

export default Certification