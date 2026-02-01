import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import { Upload, Download, AlertCircle, CheckCircle, XCircle, Eye } from 'lucide-react'
import { examAPI, filesAPI } from '../services/api'

export default function StudentExamDetails({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('schedule')
  const [studentData, setStudentData] = useState({
    name: '',
    rollNo: '',
    block: 'A'
  })
  const [showInternal1Upload, setShowInternal1Upload] = useState(null)
  const [showInternal2Upload, setShowInternal2Upload] = useState(null)
  const [showSemesterUpload, setShowSemesterUpload] = useState(null)
  const [examSchedules, setExamSchedules] = useState([])
  const [hallTickets, setHallTickets] = useState([])
  const [marks, setMarks] = useState([])
  const [arrears, setArrears] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail')
    const rollNoMatch = userEmail?.match(/student(\d{8})/)
    if (rollNoMatch) {
      const rollNo = rollNoMatch[1]
      setStudentData(prev => ({...prev, rollNo, name: `Student ${rollNo}`}))
      fetchExamData(rollNo)
    }
  }, [])

  const fetchExamData = async (rollNo) => {
    try {
      setLoading(true)
      
      // Fetch exam schedules - API returns array directly
      const schedulesData = await examAPI.getSchedules('2nd', undefined, 'AI&DS')
      setExamSchedules(Array.isArray(schedulesData) ? schedulesData : [])
      
      // Fetch hall assignments - API returns array directly
      const hallData = await examAPI.getHallAssignments('2nd')
      setHallTickets(Array.isArray(hallData) ? hallData : [])
      
      // Fetch marks - API returns array directly
      const marksData = await examAPI.getMarks('2nd', undefined)
      const marksArray = Array.isArray(marksData) ? marksData : []
      setMarks(marksArray)
      
      // Filter arrears (marks with grade F)
      const arrearsList = marksArray.filter(m => m.grade === 'F') || []
      setArrears(arrearsList)
    } catch (err) {
      console.error('Error fetching exam data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  const handleInternal1Upload = async (markId, file) => {
    if (!file) return
    try {
      const fileResponse = await filesAPI.uploadMarks(file)
      await examAPI.updateMarks(markId, { internal1File: fileResponse.file.path })
      fetchExamData(studentData.rollNo)
      setShowInternal1Upload(null)
      alert('Internal 1 marks uploaded successfully!')
    } catch (err) {
      console.error(err)
      alert('Failed to upload marks')
    }
  }

  const handleInternal2Upload = async (markId, file) => {
    if (!file) return
    try {
      const fileResponse = await filesAPI.uploadMarks(file)
      await examAPI.updateMarks(markId, { internal2File: fileResponse.file.path })
      fetchExamData(studentData.rollNo)
      setShowInternal2Upload(null)
      alert('Internal 2 marks uploaded successfully!')
    } catch (err) {
      console.error(err)
      alert('Failed to upload marks')
    }
  }

  const handleSemesterUpload = async (markId, file) => {
    if (!file) return
    try {
      const fileResponse = await filesAPI.uploadMarks(file)
      await examAPI.updateMarks(markId, { semesterFile: fileResponse.file.path })
      fetchExamData(studentData.rollNo)
      setShowSemesterUpload(null)
      alert('Semester marks uploaded successfully!')
    } catch (err) {
      console.error(err)
      alert('Failed to upload marks')
    }
  }

  const handleDownloadSchedule = () => {
    if (examSchedules.length > 0) {
      alert('Downloading exam schedule...')
      // In real implementation, this would download a PDF
    }
  }

  const handleDownloadHallTicket = () => {
    if (hallTickets.length > 0) {
      alert('Downloading hall ticket...')
      // In real implementation, this would download a PDF
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pass':
        return 'bg-green-900 text-green-200'
      case 'Arrear':
        return 'bg-red-900 text-red-200'
      default:
        return 'bg-gray-700 text-gray-200'
    }
  }

  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A+':
      case 'A':
        return 'bg-green-900 text-green-200'
      case 'B':
        return 'bg-blue-900 text-blue-200'
      case 'C':
        return 'bg-yellow-900 text-yellow-200'
      default:
        return 'bg-gray-700 text-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-900">
        <Sidebar isOpen={sidebarOpen} userRole="student" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white text-xl">Loading exam details...</p>
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
            <h1 className="text-4xl font-bold text-white mb-8">Exam Details</h1>

            <div className="flex gap-4 mb-8 border-b border-purple-500">
              {['schedule', 'hall', 'marks', 'arrears'].map(tab => (
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
                  {tab === 'hall' && 'Hall Ticket'}
                  {tab === 'marks' && 'Marks'}
                  {tab === 'arrears' && 'Arrears'}
                </button>
              ))}
            </div>

            {/* Exam Schedule Tab */}
            {activeTab === 'schedule' && (
              <div className="space-y-4">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleDownloadSchedule}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition"
                  >
                    <Download size={20} />
                    Download Schedule
                  </button>
                </div>

                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Date</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Day</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Exam Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {examSchedules.map((exam, idx) => (
                          <tr key={exam._id || idx} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                            <td className="px-4 py-3 text-white font-medium">{exam.date ? new Date(exam.date).toLocaleDateString() : 'N/A'}</td>
                            <td className="px-4 py-3 text-gray-300">{exam.day || 'N/A'}</td>
                            <td className="px-4 py-3 text-gray-300">{exam.course || exam.courseName || 'N/A'}</td>
                            <td className="px-4 py-3 text-gray-300">{exam.time || exam.timing || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Hall Ticket Tab */}
            {activeTab === 'hall' && (
              <div className="space-y-4">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleDownloadHallTicket}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition"
                  >
                    <Download size={20} />
                    Download Hall Ticket
                  </button>
                </div>

                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Roll No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Block</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Hall No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Seat No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Exam Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hallTickets.map((ticket, idx) => (
                          <tr key={ticket._id || idx} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                            <td className="px-4 py-3 text-white font-medium">{ticket.name || ticket.studentName || 'N/A'}</td>
                            <td className="px-4 py-3 text-white font-medium">{ticket.rollNo || 'N/A'}</td>
                            <td className="px-4 py-3 text-gray-300">{ticket.block || 'N/A'}</td>
                            <td className="px-4 py-3 text-gray-300">{ticket.hallNo || 'N/A'}</td>
                            <td className="px-4 py-3 text-gray-300">{ticket.seatNo || 'N/A'}</td>
                            <td className="px-4 py-3 text-gray-300">{ticket.examName || ticket.course || 'N/A'}</td>
                            <td className="px-4 py-3 text-gray-300">{ticket.duration || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Marks Tab */}
            {activeTab === 'marks' && (
              <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-white font-semibold">Course</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Internal 1</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Internal 2</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Semester</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Total</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Grade</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marks.map((mark, idx) => (
                        <tr key={mark._id || idx} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                          <td className="px-4 py-3 text-white font-medium">{mark.name || mark.course}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-300">{mark.internal1}</span>
                              {mark.internal1File ? (
                                <button
                                  onClick={() => alert(`Viewing: ${mark.internal1File}`)}
                                  className="text-blue-400 hover:text-blue-300"
                                  title="View uploaded file"
                                >
                                  <Eye size={16} />
                                </button>
                              ) : (
                                <div>
                                  {showInternal1Upload === mark._id ? (
                                    <div className="flex gap-2 items-center">
                                      <input
                                        type="file"
                                        onChange={(e) => handleInternal1Upload(mark._id, e.target.files[0])}
                                        accept=".pdf,.doc,.docx"
                                        className="text-xs flex-1"
                                      />
                                      <button
                                        onClick={() => setShowInternal1Upload(null)}
                                        className="text-gray-400 hover:text-gray-300 text-xs"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => setShowInternal1Upload(mark._id)}
                                      className="text-blue-400 hover:text-blue-300 text-xs font-semibold flex items-center gap-1"
                                    >
                                      <Upload size={14} />
                                      Upload
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-300">{mark.internal2}</span>
                              {mark.internal2File ? (
                                <button
                                  onClick={() => alert(`Viewing: ${mark.internal2File}`)}
                                  className="text-blue-400 hover:text-blue-300"
                                  title="View uploaded file"
                                >
                                  <Eye size={16} />
                                </button>
                              ) : (
                                <div>
                                  {showInternal2Upload === mark._id ? (
                                    <div className="flex gap-2 items-center">
                                      <input
                                        type="file"
                                        onChange={(e) => handleInternal2Upload(mark._id, e.target.files[0])}
                                        accept=".pdf,.doc,.docx"
                                        className="text-xs flex-1"
                                      />
                                      <button
                                        onClick={() => setShowInternal2Upload(null)}
                                        className="text-gray-400 hover:text-gray-300 text-xs"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => setShowInternal2Upload(mark._id)}
                                      className="text-blue-400 hover:text-blue-300 text-xs font-semibold flex items-center gap-1"
                                    >
                                      <Upload size={14} />
                                      Upload
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-2">
                              {mark.semesterFile ? (
                                <button
                                  onClick={() => alert(`Viewing: ${mark.semesterFile}`)}
                                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-semibold"
                                  title="View uploaded file"
                                >
                                  <Eye size={16} />
                                  View
                                </button>
                              ) : (
                                <div>
                                  {showSemesterUpload === mark._id ? (
                                    <div className="flex gap-2 items-center">
                                      <input
                                        type="file"
                                        onChange={(e) => handleSemesterUpload(mark._id, e.target.files[0])}
                                        accept=".pdf,.doc,.docx"
                                        className="text-xs flex-1"
                                      />
                                      <button
                                        onClick={() => setShowSemesterUpload(null)}
                                        className="text-gray-400 hover:text-gray-300 text-xs"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => setShowSemesterUpload(mark._id)}
                                      className="text-blue-400 hover:text-blue-300 text-xs font-semibold flex items-center gap-1"
                                    >
                                      <Upload size={14} />
                                      Upload
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-white font-semibold">{mark.totalMark}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getGradeColor(mark.grade)}`}>
                              {mark.grade}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(mark.grade === 'F' ? 'Arrear' : 'Pass')}`}>
                              {mark.grade === 'F' ? 'Arrear' : 'Pass'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Arrears Tab */}
            {activeTab === 'arrears' && (
              <div>
                {arrears.length > 0 ? (
                  <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                          <tr>
                            <th className="px-4 py-3 text-left text-white font-semibold">Course</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Semester</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {arrears.map((arrear, idx) => (
                            <tr key={arrear._id || idx} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                              <td className="px-4 py-3 text-white font-medium">{arrear.name || arrear.course}</td>
                              <td className="px-4 py-3 text-gray-300">{arrear.semester}</td>
                              <td className="px-4 py-3">
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-900 text-red-200">
                                  Arrear
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold transition">
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="glass-effect rounded-xl p-12 card-shadow text-center">
                    <CheckCircle size={48} className="mx-auto text-green-400 mb-4" />
                    <p className="text-gray-300 text-lg">No arrears! Great job!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
