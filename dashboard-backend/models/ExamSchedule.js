import mongoose from 'mongoose'

const examScheduleSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
    enum: ['1st', '2nd', '3rd', '4th']
  },
  department: {
    type: String,
    default: 'AI&DS'
  },
  scheduleFile: {
    type: String // File path for uploaded schedule PDF
  },
  exams: [{
    course: String,
    date: String,
    day: String,
    time: String,
    duration: String
  }],
  totalExams: {
    type: Number,
    default: 0
  },
  ocrProcessed: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const ExamSchedule = mongoose.model('ExamSchedule', examScheduleSchema)

export default ExamSchedule
