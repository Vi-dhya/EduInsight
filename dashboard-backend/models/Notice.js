import mongoose from 'mongoose'

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  type: {
    type: String,
    required: true,
    enum: ['department', 'college', 'general']
  },
  department: {
    type: String,
    default: 'AI&DS'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const Notice = mongoose.model('Notice', noticeSchema)

export default Notice