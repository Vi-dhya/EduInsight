import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import { AlertCircle, Calendar, Users, TrendingUp, Award, ChevronDown, ChevronUp } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { noticesAPI } from '../services/api'

export default function HODDashboard({ onLogout, userRole = 'hod' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedYear, setSelectedYear] = useState('2nd')
  const [showYearDropdown, setShowYearDropdown] = useState(false)
  const [notices, setNotices] = useState([])
  const [loadingNotices, setLoadingNotices] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      setLoadingNotices(true)
      const data = await noticesAPI.getNotices('general', 'AI&DS')
      setNotices(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching notices:', err)
      setNotices([])
    } finally {
      setLoadingNotices(false)
    }
  }

  // Analytics data for different years (based on 10 students per year)
  const analyticsData = {
    '2nd': {
      totalStudents: 10,
      passCount: 6,
      failCount: 4,
      certifications: {
        approved: 4,
        pending: 5,
        rejected: 1
      }
    },
    '3rd': {
      totalStudents: 10,
      passCount: 8,
      failCount: 2,
      certifications: {
        approved: 7,
        pending: 2,
        rejected: 1
      }
    },
    '4th': {
      totalStudents: 10,
      passCount: 9,
      failCount: 1,
      certifications: {
        approved: 8,
        pending: 1,
        rejected: 0
      }
    }
  }

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high':
        return 'bg-red-900 text-red-200'
      case 'medium':
        return 'bg-yellow-900 text-yellow-200'
      case 'low':
        return 'bg-green-900 text-green-200'
      default:
        return 'bg-gray-700 text-gray-200'
    }
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
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Welcome to AI&DS Department
                </h1>
                <div className="relative">
                  <button
                    onClick={() => setShowYearDropdown(!showYearDropdown)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition"
                  >
                    Select Year: {selectedYear}
                    {showYearDropdown ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {showYearDropdown && (
                    <div className="absolute top-full right-0 mt-2 bg-gray-800 rounded-lg shadow-lg z-50 w-40">
                      {['2nd', '3rd', '4th'].map(year => (
                        <button
                          key={year}
                          onClick={() => {
                            setSelectedYear(year)
                            setShowYearDropdown(false)
                          }}
                          className={`block w-full text-left px-4 py-2 hover:bg-purple-600 text-white transition ${
                            selectedYear === year ? 'bg-purple-600' : ''
                          }`}
                        >
                          {year} Year
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Total Students Count by Year */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">Total Students</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-effect rounded-xl p-6 card-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-2">2nd Year</p>
                        <p className="text-5xl font-bold text-blue-400">{analyticsData['2nd'].totalStudents}</p>
                        <p className="text-gray-500 text-xs mt-2">Students enrolled</p>
                      </div>
                      <div className="p-4 bg-blue-900 rounded-lg">
                        <Users size={40} className="text-blue-400" />
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-xl p-6 card-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-2">3rd Year</p>
                        <p className="text-5xl font-bold text-purple-400">{analyticsData['3rd'].totalStudents}</p>
                        <p className="text-gray-500 text-xs mt-2">Students enrolled</p>
                      </div>
                      <div className="p-4 bg-purple-900 rounded-lg">
                        <Users size={40} className="text-purple-400" />
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-xl p-6 card-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-2">4th Year</p>
                        <p className="text-5xl font-bold text-pink-400">{analyticsData['4th'].totalStudents}</p>
                        <p className="text-gray-500 text-xs mt-2">Students enrolled</p>
                      </div>
                      <div className="p-4 bg-pink-900 rounded-lg">
                        <Users size={40} className="text-pink-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pass/Fail and Certification Charts for Selected Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Pass/Fail Analysis */}
                <div className="glass-effect rounded-xl p-6 card-shadow">
                  <h3 className="text-xl font-bold text-white mb-6">{selectedYear} Year - Pass/Fail Analysis</h3>
                  <div className="flex items-center justify-center h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Passed', value: analyticsData[selectedYear].passCount },
                            { name: 'Failed', value: analyticsData[selectedYear].failCount }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          <Cell fill="#10b981" />
                          <Cell fill="#ef4444" />
                        </Pie>
                        <Tooltip formatter={(value) => `${value} students`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-semibold">Passed: {analyticsData[selectedYear].passCount} ({Math.round((analyticsData[selectedYear].passCount / analyticsData[selectedYear].totalStudents) * 100)}%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-400 font-semibold">Failed: {analyticsData[selectedYear].failCount} ({Math.round((analyticsData[selectedYear].failCount / analyticsData[selectedYear].totalStudents) * 100)}%)</span>
                    </div>
                  </div>
                </div>

                {/* Certification Status */}
                <div className="glass-effect rounded-xl p-6 card-shadow">
                  <h3 className="text-xl font-bold text-white mb-6">{selectedYear} Year - Certification Status</h3>
                  <div className="flex items-center justify-center h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Approved', value: analyticsData[selectedYear].certifications.approved },
                            { name: 'Pending', value: analyticsData[selectedYear].certifications.pending },
                            { name: 'Rejected', value: analyticsData[selectedYear].certifications.rejected }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          <Cell fill="#10b981" />
                          <Cell fill="#f59e0b" />
                          <Cell fill="#ef4444" />
                        </Pie>
                        <Tooltip formatter={(value) => `${value} certs`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-green-400 font-semibold">Approved: {analyticsData[selectedYear].certifications.approved}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-400 font-semibold">Pending: {analyticsData[selectedYear].certifications.pending}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-red-400 font-semibold">Rejected: {analyticsData[selectedYear].certifications.rejected}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <AlertCircle className="text-orange-500" size={28} />
                College Information & Achievements
              </h2>
              {loadingNotices ? (
                <div className="text-center text-gray-400">
                  <p>Loading notices...</p>
                </div>
              ) : notices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {notices.map((notice) => (
                    <div key={notice._id} className="glass-effect rounded-xl p-6 card-shadow hover:scale-105 transition">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-3xl">📢</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(notice.priority)}`}>
                          {notice.priority.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{notice.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{notice.content}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          {new Date(notice.createdAt).toLocaleDateString()}
                        </div>
                        <div>By: <span className="text-purple-400 font-semibold">{notice.author}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-effect rounded-xl p-12 card-shadow text-center">
                  <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-300 text-lg">No notices available</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
