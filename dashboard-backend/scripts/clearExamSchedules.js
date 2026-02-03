import mongoose from 'mongoose'
import ExamSchedule from '../models/ExamSchedule.js'

const clearExamSchedules = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/eduinsight')
    console.log('✓ Connected to MongoDB')

    const result = await ExamSchedule.deleteMany({})
    console.log(`✓ Successfully deleted ${result.deletedCount} exam schedule records`)
    
    const count = await ExamSchedule.countDocuments()
    console.log(`✓ Remaining exam schedules in database: ${count}`)

    await mongoose.connection.close()
    console.log('✓ Database connection closed')
    console.log('\n✅ All exam schedules cleared successfully!')
  } catch (err) {
    console.error('❌ Error clearing exam schedules:', err)
    process.exit(1)
  }
}

clearExamSchedules()
