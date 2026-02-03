import mongoose from 'mongoose'
import HallAssignment from '../models/HallAssignment.js'

const clearHallAssignments = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/eduinsight')
    console.log('✓ Connected to MongoDB')

    const result = await HallAssignment.deleteMany({})
    console.log(`✓ Successfully deleted ${result.deletedCount} hall assignment records`)
    
    const count = await HallAssignment.countDocuments()
    console.log(`✓ Remaining hall assignments in database: ${count}`)

    await mongoose.connection.close()
    console.log('✓ Database connection closed')
    console.log('\n✅ All hall assignments cleared successfully!')
  } catch (err) {
    console.error('❌ Error clearing hall assignments:', err)
    process.exit(1)
  }
}

clearHallAssignments()
