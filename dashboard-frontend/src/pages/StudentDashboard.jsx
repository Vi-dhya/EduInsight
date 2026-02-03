import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import { Mail, Phone, MapPin, Users, Calendar, Droplet, AlertCircle } from 'lucide-react'

export default function StudentDashboard({ onLogout, userRole = 'student' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [studentData, setStudentData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Fetch student data from backend
  useEffect(() => {
    fetchStudentData()
  }, [])

  const fetchStudentData = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail')
      const rollNoMatch = userEmail?.match(/student(\d+)@/)
      const rollNo = rollNoMatch ? rollNoMatch[1] : null

      if (!rollNo) {
        setLoading(false)
        return
      }

      const response = await fetch(`http://localhost:5007/api/department/students?rollNo=${rollNo}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        const students = data.students || []
        if (students.length > 0) {
          setStudentData(students[0])
        } else {
          setStudentData(getHardcodedStudent(rollNo))
        }
      } else {
        setStudentData(getHardcodedStudent(rollNo))
      }
    } catch (err) {
      console.error('Error fetching student data:', err)
      const userEmail = localStorage.getItem('userEmail')
      const rollNoMatch = userEmail?.match(/student(\d+)@/)
      const rollNo = rollNoMatch ? rollNoMatch[1] : '23102001'
      setStudentData(getHardcodedStudent(rollNo))
    } finally {
      setLoading(false)
    }
  }

  const getHardcodedStudent = (rollNo) => {
    const studentDataMap = {
      '23102001': { name: 'Atchaya', rollNo: '23102001', dob: '12-03-2004', bloodGroup: 'O+', fatherName: 'Murugan', motherName: 'Kavitha', email: 'student23102001@college.edu', phone: '9876500001', year: '2nd', department: 'AI&DS', address: '12, Gandhi Street, Chennai' },
      '23102002': { name: 'Ragul', rollNo: '23102002', dob: '25-07-2004', bloodGroup: 'B+', fatherName: 'Rajesh', motherName: 'Lakshmi', email: 'student23102002@college.edu', phone: '9876500002', year: '2nd', department: 'AI&DS', address: '45, Anna Nagar, Trichy' },
      '23102003': { name: 'Rifath', rollNo: '23102003', dob: '09-11-2004', bloodGroup: 'A+', fatherName: 'Ibrahim', motherName: 'Ayesha', email: 'student23102003@college.edu', phone: '9876500003', year: '2nd', department: 'AI&DS', address: '78, Beach Road, Puducherry' },
      '23102004': { name: 'Faouzia', rollNo: '23102004', dob: '18-02-2004', bloodGroup: 'AB+', fatherName: 'Farook', motherName: 'Noorjahan', email: 'student23102004@college.edu', phone: '9876500004', year: '2nd', department: 'AI&DS', address: '33, Market Street, Coimbatore' },
      '23102005': { name: 'Sasidharan', rollNo: '23102005', dob: '30-06-2004', bloodGroup: 'O−', fatherName: 'Shankar', motherName: 'Meenakshi', email: 'student23102005@college.edu', phone: '9876500005', year: '2nd', department: 'AI&DS', address: '21, Temple Road, Madurai' },
      '23102006': { name: 'Shree Prajan', rollNo: '23102006', dob: '14-09-2004', bloodGroup: 'B−', fatherName: 'Prakash', motherName: 'Saranya', email: 'student23102006@college.edu', phone: '9876500006', year: '2nd', department: 'AI&DS', address: '67, Lake View, Salem' },
      '23102007': { name: 'Saran', rollNo: '23102007', dob: '05-01-2004', bloodGroup: 'A−', fatherName: 'Karthik', motherName: 'Deepa', email: 'student23102007@college.edu', phone: '9876500007', year: '2nd', department: 'AI&DS', address: '90, Bus Stand Road, Erode' },
      '23102008': { name: 'Sowmiya', rollNo: '23102008', dob: '22-08-2004', bloodGroup: 'O+', fatherName: 'Ramesh', motherName: 'Vasanthi', email: 'student23102008@college.edu', phone: '9876500008', year: '2nd', department: 'AI&DS', address: '15, Park Street, Thanjavur' },
      '23102009': { name: 'Pria Nandhini', rollNo: '23102009', dob: '11-04-2004', bloodGroup: 'AB−', fatherName: 'Nandha Kumar', motherName: 'Rajalakshmi', email: 'student23102009@college.edu', phone: '9876500009', year: '2nd', department: 'AI&DS', address: '56, Railway Colony, Vellore' },
      '23102010': { name: 'Vimalesh', rollNo: '23102010', dob: '27-12-2004', bloodGroup: 'B+', fatherName: 'Manikandan', motherName: 'Sudha', email: 'student23102010@college.edu', phone: '9876500010', year: '2nd', department: 'AI&DS', address: '24, Hill View Road, Ooty' }
    }
    return studentDataMap[rollNo] || studentDataMap['23102001']
  }

  const collegeAchievements = [
    { id: 1, title: 'NAAC Accreditation A+ Grade', description: 'Our college has been awarded NAAC accreditation with A+ grade for excellence in academics and infrastructure.', date: '2024-01-30', priority: 'high', icon: '🏆' },
    { id: 2, title: 'New State-of-the-Art Lab Inaugurated', description: 'The college has inaugurated a new AI & ML laboratory with advanced computing facilities for student research.', date: '2024-01-28', priority: 'high', icon: '🔬' },
    { id: 3, title: 'College Ranked in Top 50 Institutions', description: 'Our institution has been ranked among the top 50 engineering colleges in the country by NIRF rankings.', date: '2024-01-25', priority: 'medium', icon: '⭐' }
  ]

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-900">
        <Sidebar isOpen={sidebarOpen} userRole={userRole} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <SimplifiedHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onLogout={handleLogout} />
          <main className="flex-1 flex items-center justify-center">
            <p className="text-white text-xl">Loading...</p>
          </main>
        </div>
      </div>
    )
  }

  if (!studentData) {
    return (
      <div className="flex h-screen bg-gray-900">
        <Sidebar isOpen={sidebarOpen} userRole={userRole} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <SimplifiedHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onLogout={handleLogout} />
          <main className="flex-1 flex items-center justify-center">
            <p className="text-white text-xl">No student data found</p>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar isOpen={sidebarOpen} userRole={userRole} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <SimplifiedHeader 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8">My Profile</h1>
            
            {/* Student Profile Card */}
            <div className="glass-effect rounded-xl p-8 card-shadow mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Photo Section - Left */}
                <div className="flex flex-col items-center justify-start">
                  <div className="w-40 h-40 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-6 overflow-hidden border-4 border-purple-400">
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white">
                      {studentData.name.charAt(0)}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white text-center">{studentData.name}</h2>
                  <p className="text-purple-400 font-semibold mt-2 text-lg">{studentData.rollNo}</p>
                </div>

                {/* Profile Fields - Right (2 columns) */}
                <div className="md:col-span-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-400 text-xs mb-2 flex items-center gap-2">
                        <Calendar size={14} className="text-purple-400" /> Date of Birth
                      </p>
                      <p className="text-white font-semibold">{studentData.dob}</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-400 text-xs mb-2 flex items-center gap-2">
                        <Droplet size={14} className="text-red-400" /> Blood Group
                      </p>
                      <p className="text-white font-semibold">{studentData.bloodGroup}</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-400 text-xs mb-2 flex items-center gap-2">
                        <Users size={14} className="text-blue-400" /> Father's Name
                      </p>
                      <p className="text-white font-semibold">{studentData.fatherName}</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-400 text-xs mb-2 flex items-center gap-2">
                        <Users size={14} className="text-pink-400" /> Mother's Name
                      </p>
                      <p className="text-white font-semibold">{studentData.motherName}</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-400 text-xs mb-2 flex items-center gap-2">
                        <Mail size={14} className="text-green-400" /> Email
                      </p>
                      <p className="text-white font-semibold text-sm">{studentData.email}</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-400 text-xs mb-2 flex items-center gap-2">
                        <Phone size={14} className="text-yellow-400" /> Phone
                      </p>
                      <p className="text-white font-semibold">{studentData.phone}</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-400 text-xs mb-2">Year</p>
                      <p className="text-white font-semibold">{studentData.year}</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-400 text-xs mb-2">Department</p>
                      <p className="text-white font-semibold">{studentData.department}</p>
                    </div>
                    <div className="col-span-2 bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <p className="text-gray-400 text-xs mb-2 flex items-center gap-2">
                        <MapPin size={14} className="text-orange-400" /> Address
                      </p>
                      <p className="text-white font-semibold">{studentData.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* College Information & Achievements Section */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <AlertCircle className="text-orange-500" size={28} />
                College Information & Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {collegeAchievements.map((item) => (
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
