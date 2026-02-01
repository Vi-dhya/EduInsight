import mongoose from 'mongoose'

const examScheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  timing: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true,
    enum: ['1st', '2nd', '3rd', '4th']
  },
  department: {
    type: String,
    default: 'AI&DS'
  }
}, {
  timestamps: true
})

const ExamSchedule = mongoose.model('ExamSchedule', examScheduleSchema)

export default ExamSchedule
