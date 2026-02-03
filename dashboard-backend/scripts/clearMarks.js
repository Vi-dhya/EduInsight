import mongoose from 'mongoose'
import Marks from '../models/Marks.js'

const clearMarks = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/eduinsight')
    console.log('Connected to MongoDB')

    const result = await Marks.deleteMany({})
    console.log(`Deleted ${result.deletedCount} marks records`)

    await mongoose.connection.close()
    console.log('Database connection closed')
  } catch (err) {
    console.error('Error clearing marks:', err)
    process.exit(1)
  }
}

clearMarks()
