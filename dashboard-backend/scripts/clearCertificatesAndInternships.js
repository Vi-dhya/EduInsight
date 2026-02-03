import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Certification from '../models/Certification.js'
import Internship from '../models/Internship.js'

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eduinsight')
    console.log('MongoDB Connected')
  } catch (error) {
    console.error('Database connection error:', error.message)
    process.exit(1)
  }
}

const clearData = async () => {
  try {
    console.log('Clearing all certificates and internships...')
    
    const certResult = await Certification.deleteMany({})
    console.log(`✅ Deleted ${certResult.deletedCount} certificates`)
    
    const internResult = await Internship.deleteMany({})
    console.log(`✅ Deleted ${internResult.deletedCount} internships`)
    
    console.log('\n✅ All mock data cleared successfully!')
    
    process.exit(0)
  } catch (error) {
    console.error('Error clearing data:', error)
    process.exit(1)
  }
}

connectDB().then(() => clearData())
