import mongoose from 'mongoose'

const marksSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  internal1: {
    type: Number,
    required: true,
    min: 0,
    max: 20
  },
  internal2: {
    type: Number,
    required: true,
    min: 0,
    max: 20
  },
  totalMark: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  semester: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true,
    enum: ['A+', 'A', 'B', 'C', 'D', 'F']
  },
  markSheetUploaded: {
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

const Marks = mongoose.model('Marks', marksSchema)

export default Marks
