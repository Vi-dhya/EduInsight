import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import YearDropdown from '../components/YearDropdown'
import { Upload } from 'lucide-react'

export default function ExamDetails({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedYear, setSelectedYear] = useState('2nd')
  const [activeTab, setActiveTab] = useState('schedule')
  const [marksFilter, setMarksFilter] = useState('all')
  const navigate = useNavigate()

  const [examSchedules] = useState([
    { id: 1, date: '2024-02-15', day: 'Thursday', courseName: 'Data Structures', semester: '4th', timing: '10:00 AM - 1:00 PM', year: '2nd' },
    { id: 2, date: '2024-02-16', day: 'Friday', courseName: 'Web Development', semester: '4th', timing: '2:00 PM - 5:00 PM', year: '2nd' },
    { id: 3, date: '2024-02-17', day: 'Saturday', courseName: 'Database Management', semester: '4th', timing: '10:00 AM - 1:00 PM', year: '2nd' },
    { id: 4, date: '2024-02-18', day: 'Sunday', courseName: 'Operating Systems', semester: '4th', timing: '2:00 PM - 5:00 PM', year: '2nd' },
    { id: 5, date: '2024-02-19', day: 'Monday', courseName: 'Machine Learning', semester: '6th', timing: '10:00 AM - 1:00 PM', year: '3rd' },
    { id: 6, date: '2024-02-20', day: 'Tuesday', courseName: 'Cloud Computing', semester: '6th', timing: '2:00 PM - 5:00 PM', year: '3rd' },
    { id: 7, date: '2024-02-21', day: 'Wednesday', courseName: 'AI & NLP', semester: '8th', timing: '10:00 AM - 1:00 PM', year: '4th' },
  ])

  const [hallAssignments] = useState([
    { id: 1, rollNo: '1001', name: 'Raj Kumar', year: '2nd', block: 'A', hallNo: 'A-101', seatNo: '15', examName: 'Data Structures', examDate: '2024-02-15', duration: '3 hours' },
    { id: 2, rollNo: '1002', name: 'Priya Singh', year: '2nd', block: 'A', hallNo: 'A-102', seatNo: '20', examName: 'Data Structures', examDate: '2024-02-15', duration: '3 hours' },
    { id: 3, rollNo: '1003', name: 'Amit Patel', year: '2nd', block: 'B', hallNo: 'B-101', seatNo: '10', examName: 'Web Development', examDate: '2024-02-16', duration: '3 hours' },
    { id: 4, rollNo: '1004', name: 'Neha Sharma', year: '2nd', block: 'B', hallNo: 'B-102', seatNo: '25', examName: 'Web Development', examDate: '2024-02-16', duration: '3 hours' },
    { id: 5, rollNo: '1005', name: 'Vikram Singh', year: '2nd', block: 'A', hallNo: 'A-103', seatNo: '18', examName: 'Database Management', examDate: '2024-02-17', duration: '3 hours' },
    { id: 6, rollNo: '2001', name: 'Anjali Verma', year: '3rd', block: 'C', hallNo: 'C-201', seatNo: '30', examName: 'Machine Learning', examDate: '2024-02-19', duration: '3 hours' },
    { id: 7, rollNo: '2002', name: 'Rohan Kumar', year: '3rd', block: 'C', hallNo: 'C-202', seatNo: '35', examName: 'Machine Learning', examDate: '2024-02-19', duration: '3 hours' },
    { id: 8, rollNo: '3001', name: 'Sneha Patel', year: '4th', block: 'D', hallNo: 'D-301', seatNo: '45', examName: 'AI & NLP', examDate: '2024-02-21', duration: '3 hours' },
  ])

  const [marks] = useState([
    { id: 1, rollNo: '23102060', name: 'Raj Kumar', course: 'Data Structures', internal1: 18, internal2: 19, total: 85, grade: 'A', status: 'Pass', year: '2nd' },
    { id: 2, rollNo: '23102061', name: 'Priya Singh', course: 'Data Structures', internal1: 20, internal2: 20, total: 92, grade: 'A+', status: 'Pass', year: '2nd' },
    { id: 3, rollNo: '23102062', name: 'Amit Patel', course: 'Web Development', internal1: 16, internal2: 17, total: 78, grade: 'B', status: 'Pass', year: '2nd' },
    { id: 4, rollNo: '23102063', name: 'Neha Sharma', course: 'Database Management', internal1: 12, internal2: 11, total: 45, grade: 'F', status: 'Arrear', year: '2nd' },
    { id: 5, rollNo: '23103001', name: 'Vikram Singh', course: 'Machine Learning', internal1: 19, internal2: 20, total: 88, grade: 'A', status: 'Pass', year: '3rd' },
    { id: 6, rollNo: '23103002', name: 'Anjali Verma', course: 'Cloud Computing', internal1: 14, internal2: 13, total: 52, grade: 'F', status: 'Arrear', year: '3rd' },
    { id: 7, rollNo: '23104001', name: 'Neha Sharma', course: 'AI & NLP', internal1: 20, internal2: 20, total: 95, grade: 'A+', status: 'Pass', year: '4th' },
  ])

  const filteredSchedules = examSchedules.filter(s => s.year === selectedYear)
  const filteredHalls = hallAssignments.filter(h => h.year === selectedYear)
  const yearFilteredMarks = marks.filter(m => m.year === selectedYear)
  
  const filteredMarks = yearFilteredMarks.filter(m => {
    if (marksFilter === 'passed') return m.status === 'Pass'
    if (marksFilter === 'arrear') return m.status === 'Arrear'
    return true
  })

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  const handleUploadSchedule = () => {
    alert('Upload exam schedule file')
  }

  const handleUploadHallTicket = () => {
    alert('Upload hall ticket file')
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar isOpen={sidebarOpen} userRole="faculty" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SimplifiedHeader 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-white">Exam Details</h1>
              <YearDropdown selectedYear={selectedYear} onYearChange={setSelectedYear} />
            </div>

            <div className="flex gap-4 mb-8 border-b border-purple-500">
              {['schedule', 'halls', 'marks'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-semibold transition ${
                    activeTab === tab
                      ? 'text-purple-400 border-b-2 border-purple-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab === 'schedule' && 'Exam Schedule'}
                  {tab === 'halls' && 'Hall Assignments'}
                  {tab === 'marks' && 'Marks'}
                </button>
              ))}
            </div>

            {activeTab === 'schedule' && (
              <div>
                <div className="mb-6 flex justify-end">
                  <button
                    onClick={handleUploadSchedule}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition"
                  >
                    <Upload size={20} />
                    Upload Schedule
                  </button>
                </div>
                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Date</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Day</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Course Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Semester</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Timing</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSchedules.map((schedule, idx) => (
                          <tr key={schedule.id} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                            <td className="px-4 py-3 text-white font-medium">{schedule.date}</td>
                            <td className="px-4 py-3 text-gray-300">{schedule.day}</td>
                            <td className="px-4 py-3 text-gray-300">{schedule.courseName}</td>
                            <td className="px-4 py-3 text-gray-300">{schedule.semester}</td>
                            <td className="px-4 py-3 text-gray-300">{schedule.timing}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'halls' && (
              <div>
                <div className="mb-6 flex justify-end">
                  <button
                    onClick={handleUploadHallTicket}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition"
                  >
                    <Upload size={20} />
                    Upload Hall Ticket
                  </button>
                </div>
                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Roll No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Year</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Block</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Hall No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Seat No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Exam Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Exam Date</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredHalls.map((hall, idx) => (
                          <tr key={hall.id} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                            <td className="px-4 py-3 text-white font-medium">{hall.rollNo}</td>
                            <td className="px-4 py-3 text-white font-medium">{hall.name}</td>
                            <td className="px-4 py-3">
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-900 text-blue-200">
                                {hall.year}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-300">{hall.block}</td>
                            <td className="px-4 py-3 text-gray-300">{hall.hallNo}</td>
                            <td className="px-4 py-3 text-gray-300">{hall.seatNo}</td>
                            <td className="px-4 py-3 text-gray-300">{hall.examName}</td>
                            <td className="px-4 py-3 text-gray-300">{hall.examDate}</td>
                            <td className="px-4 py-3 text-gray-300">{hall.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'marks' && (
              <div>
                <div className="flex gap-3 mb-8 justify-between items-center">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setMarksFilter('all')}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        marksFilter === 'all'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      All Students
                    </button>
                    <button
                      onClick={() => setMarksFilter('passed')}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        marksFilter === 'passed'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Only Passed Students
                    </button>
                    <button
                      onClick={() => setMarksFilter('arrear')}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        marksFilter === 'arrear'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Only Arrear Students
                    </button>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition">
                    Download Marks
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                  <div className="glass-effect rounded-xl p-6 card-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-2">All Students</p>
                        <p className="text-3xl font-bold text-white">{yearFilteredMarks.length}</p>
                      </div>
                      <div className="text-4xl text-purple-400">👥</div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-xl p-6 card-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Passed Students</p>
                        <p className="text-3xl font-bold text-green-400">{yearFilteredMarks.filter(m => m.status === 'Pass').length}</p>
                      </div>
                      <div className="text-4xl text-green-400">✓</div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-xl p-6 card-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Arrear Students</p>
                        <p className="text-3xl font-bold text-red-400">{yearFilteredMarks.filter(m => m.status === 'Arrear').length}</p>
                      </div>
                      <div className="text-4xl text-red-400">⚠</div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-xl p-6 card-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Pass Percentage</p>
                        <p className="text-3xl font-bold text-green-400">{yearFilteredMarks.length > 0 ? Math.round((yearFilteredMarks.filter(m => m.status === 'Pass').length / yearFilteredMarks.length) * 100) : 0}%</p>
                      </div>
                      <div className="text-4xl text-green-400">📊</div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-xl p-6 card-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Fail Percentage</p>
                        <p className="text-3xl font-bold text-red-400">{yearFilteredMarks.length > 0 ? Math.round((yearFilteredMarks.filter(m => m.status === 'Arrear').length / yearFilteredMarks.length) * 100) : 0}%</p>
                      </div>
                      <div className="text-4xl text-red-400">📊</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition">
                    Download Passed Students ZIP
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition">
                    Download Arrear Students ZIP
                  </button>
                </div>

                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Roll No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Course</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Internal 1</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Internal 2</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Total</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Grade</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Mark Sheet</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMarks.map((mark, idx) => (
                          <tr key={mark.id} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                            <td className="px-4 py-3 text-white font-medium">{mark.rollNo}</td>
                            <td className="px-4 py-3 text-white">{mark.name}</td>
                            <td className="px-4 py-3 text-gray-300">{mark.course}</td>
                            <td className="px-4 py-3 text-gray-300">{mark.internal1}</td>
                            <td className="px-4 py-3 text-gray-300">{mark.internal2}</td>
                            <td className="px-4 py-3 text-white font-semibold">{mark.total}</td>
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                mark.grade === 'A+' ? 'bg-green-900 text-green-200' :
                                mark.grade === 'A' ? 'bg-green-800 text-green-200' :
                                mark.grade === 'B' ? 'bg-blue-900 text-blue-200' :
                                'bg-yellow-900 text-yellow-200'
                              }`}>
                                {mark.grade}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                mark.status === 'Pass' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                              }`}>
                                {mark.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button className="text-blue-400 hover:text-blue-300 font-medium transition">
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
