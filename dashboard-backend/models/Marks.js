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
  course: {
    type: String
  },
  internal1: {
    type: Number,
    min: 0,
    max: 20
  },
  internal2: {
    type: Number,
    min: 0,
    max: 20
  },
  totalMark: {
    type: Number,
    min: 0,
    max: 100
  },
  semester: {
    type: String
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'B', 'C', 'D', 'F']
  },
  status: {
    type: String,
    enum: ['Pass', 'Arrear'],
    default: 'Pass'
  },
  cgpa: {
    type: Number,
    min: 0,
    max: 10
  },
  year: {
    type: String,
    enum: ['1st', '2nd', '3rd', '4th']
  },
  // File upload fields
  internal1File: {
    type: String // File path
  },
  internal1FileExtracted: {
    type: Object, // { internal1, confidence }
    default: null
  },
  internal2File: {
    type: String // File path
  },
  internal2FileExtracted: {
    type: Object, // { internal2, confidence }
    default: null
  },
  semesterFile: {
    type: String // File path
  },
  semesterFileExtracted: {
    type: Object, // { semesterMark, cgpa, status, confidence }
    default: null
  },
  arrearFile: {
    type: String // File path
  },
  arrearFileExtracted: {
    type: Object, // { arrearCourses: [], confidence }
    default: null
  },
  arrearCourses: [{
    type: String // List of arrear course names
  }],
  // File URLs for viewing
  internal1FileUrl: {
    type: String // URL to view internal 1 mark sheet
  },
  internal2FileUrl: {
    type: String // URL to view internal 2 mark sheet
  },
  semesterFileUrl: {
    type: String // URL to view semester mark sheet
  },
  remarks: {
    type: String // Faculty remarks about the marks
  }
}, {
  timestamps: true
})

const Marks = mongoose.model('Marks', marksSchema)

export default Marks
