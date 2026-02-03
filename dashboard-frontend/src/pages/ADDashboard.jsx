import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import { AlertCircle, Calendar, Users, TrendingUp, Award, ChevronDown, ChevronUp } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

export default function ADDashboard({ onLogout, userRole = 'ad' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedYear, setSelectedYear] = useState('2nd')
  const [showYearDropdown, setShowYearDropdown] = useState(false)
  const navigate = useNavigate()

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
                  Welcome to Academic Affairs
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((item) => (
                  <div key={item.id} className="glass-effect rounded-xl p-6 card-shadow hover:scale-105 transition">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{item.icon}</span>
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
