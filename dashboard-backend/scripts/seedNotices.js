import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Notice from '../models/Notice.js'
import connectDB from '../config/database.js'

dotenv.config()

const seedNotices = async () => {
  try {
    await connectDB()
    
    // Clear existing notices
    await Notice.deleteMany({})
    console.log('Cleared existing notices')

    // Create sample notices
    const notices = [
      {
        title: 'Semester Exam Schedule Released',
        content: 'The semester exam schedule for the current academic year has been released. Please check the exam details section for more information.',
        author: 'Dr. Smith',
        priority: 'high',
        type: 'general',
        department: 'AI&DS',
        isActive: true
      },
      {
        title: 'Certificate Upload Deadline Extended',
        content: 'The deadline for uploading certificates has been extended to the end of this month. Students are requested to upload their certificates as soon as possible.',
        author: 'Dr. Johnson',
        priority: 'medium',
        type: 'general',
        department: 'AI&DS',
        isActive: true
      },
      {
        title: 'Internship Opportunities Available',
        content: 'Several internship opportunities are available for 3rd and 4th year students. Interested students should submit their applications through the portal.',
        author: 'Prof. Williams',
        priority: 'medium',
        type: 'general',
        department: 'AI&DS',
        isActive: true
      },
      {
        title: 'Important: Hall Assignment Released',
        content: 'Hall assignments for the upcoming exams have been released. Please check your exam details to find your assigned hall.',
        author: 'Dr. Brown',
        priority: 'high',
        type: 'general',
        department: 'AI&DS',
        isActive: true
      },
      {
        title: 'Marks Update Notification',
        content: 'Internal marks for Semester 4 have been updated. Students can view their marks in the exam details section.',
        author: 'Dr. Davis',
        priority: 'low',
        type: 'general',
        department: 'AI&DS',
        isActive: true
      }
    ]

    const createdNotices = await Notice.insertMany(notices)
    console.log(`Successfully created ${createdNotices.length} notices`)
    
    // Display created notices
    const allNotices = await Notice.find({})
    console.log('\nAll notices in database:')
    allNotices.forEach((notice, index) => {
      console.log(`${index + 1}. ${notice.title} (${notice.priority}) - by ${notice.author}`)
    })

    process.exit(0)
  } catch (error) {
    console.error('Error seeding notices:', error)
    process.exit(1)
  }
}

seedNotices()
