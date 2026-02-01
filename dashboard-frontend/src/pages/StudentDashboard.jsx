import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import { Mail, Phone, MapPin, Users, Calendar, Droplet, AlertCircle } from 'lucide-react'
import { departmentAPI } from '../services/api'

export default function StudentDashboard({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [studentData, setStudentData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail')
    const rollNoMatch = userEmail?.match(/student(\d{8})/)
    const rollNo = rollNoMatch ? rollNoMatch[1] : '23102060'
    
    fetchStudentData(rollNo)
  }, [])

  const fetchStudentData = async (rollNo) => {
    try {
      setLoading(true)
      // Try to fetch from all years since we don't know the student's year yet
      let student = null
      const years = ['1st', '2nd', '3rd', '4th']
      
      for (const year of years) {
        const data = await departmentAPI.getStudents(year, 'AI&DS')
        const students = Array.isArray(data.students) ? data.students : (Array.isArray(data) ? data : [])
        student = students.find(s => s.rollNo === rollNo)
        if (student) break
      }
      
      if (student) {
        console.log('Student found:', student)
        setStudentData({
          id: student._id,
          name: student.name,
          rollNo: student.rollNo,
          dob: student.dob || '2003-05-15',
          bloodGroup: student.bloodGroup || 'O+',
          fatherName: student.fatherName || 'Mr. Kumar Singh',
          motherName: student.motherName || 'Mrs. Priya Singh',
          address: student.address || '123 Main Street, City, State - 560001',
          photo: student.photo || 'https://via.placeholder.com/200',
          year: student.year,
          department: student.department,
          email: student.collegeEmail,
          phone: student.phone
        })
      } else {
        console.log('Student not found with rollNo:', rollNo)
      }
    } catch (err) {
      console.error('Error fetching student data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  const news = [
    {
      id: 1,
      title: 'NAAC Accreditation A+ Grade',
      description: 'Our college has been awarded NAAC accreditation with A+ grade for excellence in academics and infrastructure.',
      date: '2024-01-30',
      priority: 'high',
      icon: '🏆'
    },
    {
      id: 2,
      title: 'New State-of-the-Art Lab Inaugurated',
      description: 'The college has inaugurated a new AI & ML laboratory with advanced computing facilities for student research.',
      date: '2024-01-28',
      priority: 'high',
      icon: '🔬'
    },
    {
      id: 3,
      title: 'College Ranked in Top 50 Institutions',
      description: 'Our institution has been ranked among the top 50 engineering colleges in the country by NIRF rankings.',
      date: '2024-01-25',
      priority: 'medium',
      icon: '⭐'
    }
  ]

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-900">
        <Sidebar isOpen={sidebarOpen} userRole="student" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white text-xl">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar isOpen={sidebarOpen} userRole="student" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <SimplifiedHeader 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8">My Profile</h1>
            
            {studentData && (
              <>
                {/* Student Details Card */}
                <div className="glass-effect rounded-xl p-8 card-shadow mb-12">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Photo Section */}
                    <div className="flex flex-col items-center">
                      <div className="w-48 h-48 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-4 overflow-hidden border-4 border-purple-400">
                        <img 
                          src={studentData.photo} 
                          alt={studentData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h2 className="text-2xl font-bold text-white text-center">{studentData.name}</h2>
                      <p className="text-purple-400 font-semibold mt-2 text-lg">{studentData.rollNo}</p>
                    </div>

                    {/* Details Section */}
                    <div className="md:col-span-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Row 1 */}
                        <div className="glass-effect rounded-lg p-4 border border-purple-500 border-opacity-30">
                          <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                            <Calendar size={16} className="text-purple-400" /> Date of Birth
                          </p>
                          <p className="text-white font-semibold text-lg">{studentData.dob}</p>
                        </div>
                        <div className="glass-effect rounded-lg p-4 border border-purple-500 border-opacity-30">
                          <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                            <Droplet size={16} className="text-red-400" /> Blood Group
                          </p>
                          <p className="text-white font-semibold text-lg">{studentData.bloodGroup}</p>
                        </div>

                        {/* Row 2 */}
                        <div className="glass-effect rounded-lg p-4 border border-purple-500 border-opacity-30">
                          <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                            <Users size={16} className="text-blue-400" /> Father's Name
                          </p>
                          <p className="text-white font-semibold">{studentData.fatherName}</p>
                        </div>
                        <div className="glass-effect rounded-lg p-4 border border-purple-500 border-opacity-30">
                          <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                            <Users size={16} className="text-pink-400" /> Mother's Name
                          </p>
                          <p className="text-white font-semibold">{studentData.motherName}</p>
                        </div>

                        {/* Row 3 */}
                        <div className="glass-effect rounded-lg p-4 border border-purple-500 border-opacity-30">
                          <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                            <Mail size={16} className="text-green-400" /> Email
                          </p>
                          <p className="text-white font-semibold text-sm">{studentData.email}</p>
                        </div>
                        <div className="glass-effect rounded-lg p-4 border border-purple-500 border-opacity-30">
                          <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                            <Phone size={16} className="text-yellow-400" /> Phone
                          </p>
                          <p className="text-white font-semibold">{studentData.phone}</p>
                        </div>

                        {/* Row 4 */}
                        <div className="glass-effect rounded-lg p-4 border border-purple-500 border-opacity-30">
                          <p className="text-gray-400 text-sm mb-1">Year</p>
                          <p className="text-white font-semibold text-lg">{studentData.year}</p>
                        </div>
                        <div className="glass-effect rounded-lg p-4 border border-purple-500 border-opacity-30">
                          <p className="text-gray-400 text-sm mb-1">Department</p>
                          <p className="text-white font-semibold text-lg">{studentData.department}</p>
                        </div>

                        {/* Row 5 - Full Width Address */}
                        <div className="md:col-span-2 glass-effect rounded-lg p-4 border border-purple-500 border-opacity-30">
                          <p className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                            <MapPin size={16} className="text-orange-400" /> Address
                          </p>
                          <p className="text-white font-semibold">{studentData.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* College Information & Achievements Section */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <AlertCircle className="text-orange-500" size={28} />
                College Information & Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((item) => (
                  <div key={item.id} className="glass-effect rounded-xl p-6 card-shadow hover:scale-105 transition border border-purple-500 border-opacity-20">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{item.icon}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.priority === 'high' ? 'bg-red-900 text-red-200' :
                        item.priority === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                        'bg-green-900 text-green-200'
                      }`}>
                        {item.priority.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <Calendar size={14} />
                      {item.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
