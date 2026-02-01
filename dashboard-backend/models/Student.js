import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  collegeEmail: {
    type: String,
    required: true,
    unique: true
  },
  personalEmail: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  abcId: {
    type: String,
    required: true
  },
  incomeCertNo: {
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
    required: true,
    default: 'AI&DS'
  },
  dob: {
    type: String,
    default: '2003-05-15'
  },
  bloodGroup: {
    type: String,
    default: 'O+'
  },
  fatherName: {
    type: String,
    default: 'Mr. Kumar Singh'
  },
  motherName: {
    type: String,
    default: 'Mrs. Priya Singh'
  },
  address: {
    type: String,
    default: '123 Main Street, City, State - 560001'
  },
  photo: {
    type: String,
    default: 'https://via.placeholder.com/200'
  }
}, {
  timestamps: true
})

const Student = mongoose.model('Student', studentSchema)

export default Student
