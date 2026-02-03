import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import YearDropdown from '../components/YearDropdown'
import { Upload, Eye, Download, FileText, X } from 'lucide-react'
import { examAPI, filesAPI } from '../services/api'

export default function ExamDetails({ onLogout, userRole = 'faculty' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedYear, setSelectedYear] = useState('2nd')
  const [activeTab, setActiveTab] = useState('schedule')
  const [marksFilter, setMarksFilter] = useState('all')
  const [examSchedules, setExamSchedules] = useState([])
  const [hallAssignments, setHallAssignments] = useState([])
  const [marks, setMarks] = useState([])
  const [loading, setLoading] = useState(false)
  const [showScheduleUpload, setShowScheduleUpload] = useState(null)
  const [scheduleFile, setScheduleFile] = useState(null)
  const [showHallUpload, setShowHallUpload] = useState(false)
  const [hallFile, setHallFile] = useState(null)
  const [viewingMarkFile, setViewingMarkFile] = useState(null)
  const [uploadingCourse, setUploadingCourse] = useState(null)
  const [uploadingType, setUploadingType] = useState(null)
  const [uploadFile, setUploadFile] = useState(null)
  const [selectedSemester, setSelectedSemester] = useState('Semester 1')
  const [selectedCourse, setSelectedCourse] = useState('Deep Learning')
  const [selectedMarksSemester, setSelectedMarksSemester] = useState('Semester 1')
  const navigate = useNavigate()

  const courses = [
    'Deep Learning',
    'Information Security Management',
    'Web Technology',
    'Business Analytics',
    'Software Testing',
    'Digital Marketing'
  ]

  const semesters = [
    'Semester 1',
    'Semester 2',
    'Semester 3',
    'Semester 4',
    'Semester 5',
    'Semester 6',
    'Semester 7',
    'Semester 8'
  ]

  useEffect(() => {
    fetchExamData()
  }, [selectedYear])

  const fetchExamData = async () => {
    try {
      setLoading(true)
      
      // Fetch exam schedules
      const schedulesData = await examAPI.getSchedules(selectedYear, undefined, 'AI&DS')
      console.log('Schedules data:', schedulesData)
      setExamSchedules(Array.isArray(schedulesData.schedules) ? schedulesData.schedules : (Array.isArray(schedulesData) ? schedulesData : []))
      
      // Fetch hall assignments
      const hallData = await examAPI.getHallAssignments(selectedYear)
      console.log('Hall data:', hallData)
      setHallAssignments(Array.isArray(hallData.hallAssignments) ? hallData.hallAssignments : (Array.isArray(hallData) ? hallData : []))
      
      // Fetch marks
      const marksData = await examAPI.getMarks(selectedYear, undefined)
      console.log('Marks data:', marksData)
      setMarks(Array.isArray(marksData.marks) ? marksData.marks : (Array.isArray(marksData) ? marksData : []))
    } catch (err) {
      console.error('Error fetching exam data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadSchedule = async (scheduleId) => {
    if (!scheduleFile) {
      alert('Please select a file')
      return
    }

    try {
      setLoading(true)
      // Upload file to backend with OCR extraction
      const formData = new FormData()
      formData.append('file', scheduleFile)
      formData.append('year', selectedYear)
      formData.append('department', 'AI&DS')

      const response = await fetch('http://localhost:5007/api/files/upload-exam-schedule', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      })

      const data = await response.json()
      if (response.ok) {
        alert('Exam schedule uploaded successfully! OCR extraction in progress...')
        setShowScheduleUpload(false)
        setScheduleFile(null)
        // Refresh data after a short delay
        setTimeout(() => {
          fetchExamData()
        }, 1000)
      } else {
        alert('Failed to upload schedule: ' + data.message)
      }
    } catch (err) {
      console.error('Error uploading schedule:', err)
      alert('Failed to upload schedule: ' + (err.message || 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSchedules = async () => {
    if (!window.confirm(`Are you sure you want to delete all exam schedules for ${selectedYear} year? This action cannot be undone.`)) {
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`http://localhost:5007/api/files/delete-exam-schedules/${selectedYear}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ department: 'AI&DS' })
      })

      const data = await response.json()
      if (response.ok) {
        alert(`Successfully deleted ${data.deletedCount} exam schedule records`)
        fetchExamData()
      } else {
        alert('Failed to delete schedules: ' + data.message)
      }
    } catch (err) {
      console.error('Error deleting schedules:', err)
      alert('Failed to delete schedules: ' + (err.message || 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteHallAssignments = async () => {
    if (!window.confirm(`Are you sure you want to delete all hall assignments for ${selectedYear} year? This action cannot be undone.`)) {
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`http://localhost:5007/api/files/delete-hall-assignments/${selectedYear}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ department: 'AI&DS' })
      })

      const data = await response.json()
      if (response.ok) {
        alert(`Successfully deleted ${data.deletedCount} hall assignment records`)
        fetchExamData()
      } else {
        alert('Failed to delete hall assignments: ' + data.message)
      }
    } catch (err) {
      console.error('Error deleting hall assignments:', err)
      alert('Failed to delete hall assignments: ' + (err.message || 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  const handleUploadHallAssignments = async () => {
    if (!hallFile) {
      alert('Please select a file')
      return
    }

    try {
      setLoading(true)
      // Upload file to backend with OCR extraction
      const formData = new FormData()
      formData.append('file', hallFile)
      formData.append('year', selectedYear)
      formData.append('department', 'AI&DS')

      const response = await fetch('http://localhost:5007/api/files/upload-hall-assignments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      })

      const data = await response.json()
      if (response.ok) {
        alert('Hall assignments uploaded successfully! OCR extraction in progress...')
        setShowHallUpload(false)
        setHallFile(null)
        // Refresh data after a short delay
        setTimeout(() => {
          fetchExamData()
        }, 1000)
      } else {
        alert('Failed to upload hall assignments: ' + data.message)
      }
    } catch (err) {
      console.error('Error uploading hall assignments:', err)
      alert('Failed to upload hall assignments: ' + (err.message || 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  const filteredSchedules = []
  const filteredHalls = []
  const yearFilteredMarks = []
  
  const filteredMarks = []

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
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-white">Exam Details</h1>
              <YearDropdown selectedYear={selectedYear} onYearChange={setSelectedYear} />
            </div>

            <div className="flex gap-4 mb-8 border-b border-purple-500">
              {['schedule', 'halls', 'internal', 'marks'].map(tab => (
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
                  {tab === 'internal' && 'Internal Marks'}
                  {tab === 'marks' && 'Marks'}
                </button>
              ))}
            </div>

            {activeTab === 'schedule' && (
              <div>
                {examSchedules.length === 0 && (
                  <div className="mb-6 flex justify-end">
                    <button
                      onClick={() => setShowScheduleUpload(true)}
                      className="btn-primary"
                    >
                      <Upload size={20} className="inline mr-2" />
                      Upload Schedule File
                    </button>
                  </div>
                )}

                {showScheduleUpload && examSchedules.length === 0 && (
                  <div className="card-professional mb-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Upload Exam Schedule</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-300 mb-2">Select Schedule File (PDF)</label>
                        <input
                          type="file"
                          onChange={(e) => setScheduleFile(e.target.files[0])}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="input-professional"
                        />
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            if (scheduleFile) {
                              handleUploadSchedule('bulk')
                            } else {
                              alert('Please select a file')
                            }
                          }}
                          disabled={loading}
                          className="btn-success flex-1"
                        >
                          {loading ? 'Uploading...' : 'Upload'}
                        </button>
                        <button
                          onClick={() => {
                            setShowScheduleUpload(false)
                            setScheduleFile(null)
                          }}
                          className="btn-secondary flex-1"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {examSchedules.length > 0 && (
                  <div>
                    <div className="mb-4 flex justify-between items-center">
                      <p className="text-blue-300 font-medium">Showing {examSchedules.reduce((sum, s) => sum + (s.exams?.length || 0), 0)} exam(s)</p>
                      <button
                        onClick={handleDeleteSchedules}
                        disabled={loading}
                        className="btn-danger btn-small"
                      >
                        {loading ? 'Deleting...' : 'Delete Schedule'}
                      </button>
                    </div>
                    <div className="card-professional">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="table-header">
                            <tr>
                              <th className="px-4 py-3 text-left">Course</th>
                              <th className="px-4 py-3 text-left">Date</th>
                              <th className="px-4 py-3 text-left">Day</th>
                              <th className="px-4 py-3 text-left">Time</th>
                              <th className="px-4 py-3 text-left">Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {examSchedules.flatMap((schedule, scheduleIdx) => 
                              (schedule.exams || []).map((exam, examIdx) => (
                                <tr key={`${scheduleIdx}-${examIdx}`} className="table-row-hover">
                                  <td className="px-4 py-3 text-white font-medium">{exam.course || '-'}</td>
                                  <td className="px-4 py-3 text-slate-300">{exam.date || '-'}</td>
                                  <td className="px-4 py-3 text-slate-300">{exam.day || '-'}</td>
                                  <td className="px-4 py-3 text-slate-300">{exam.time || '-'}</td>
                                  <td className="px-4 py-3 text-slate-300">{exam.duration || '-'}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {examSchedules.length === 0 && !showScheduleUpload && (
                  <div className="glass-effect rounded-xl p-6 card-shadow text-center">
                    <p className="text-gray-300">No schedule available yet</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'halls' && (
              <div>
                {hallAssignments.length > 0 && (
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-blue-300 font-medium">Showing {hallAssignments.length} hall assignment(s)</p>
                    <button
                      onClick={handleDeleteHallAssignments}
                      disabled={loading}
                      className="btn-danger btn-small"
                    >
                      {loading ? 'Deleting...' : 'Delete All Assignments'}
                    </button>
                  </div>
                )}
                {hallAssignments.length === 0 && (
                  <div className="mb-6 flex justify-end">
                    <button
                      onClick={() => setShowHallUpload(true)}
                      className="btn-primary"
                    >
                      <Upload size={20} className="inline mr-2" />
                      Upload Hall Ticket
                    </button>
                  </div>
                )}

                {showHallUpload && (
                  <div className="card-professional mb-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Upload Hall Assignments</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-300 mb-2">Select Hall Assignment File (PDF/Excel)</label>
                        <input
                          type="file"
                          onChange={(e) => setHallFile(e.target.files[0])}
                          accept=".pdf,.xls,.xlsx,.doc,.docx"
                          className="input-professional"
                        />
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            if (hallFile) {
                              handleUploadHallAssignments()
                            } else {
                              alert('Please select a file')
                            }
                          }}
                          disabled={loading}
                          className="btn-success flex-1"
                        >
                          {loading ? 'Uploading...' : 'Upload'}
                        </button>
                        <button
                          onClick={() => {
                            setShowHallUpload(false)
                            setHallFile(null)
                          }}
                          className="btn-secondary flex-1"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="card-professional">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="table-header">
                        <tr>
                          <th className="px-4 py-3 text-left">Roll No</th>
                          <th className="px-4 py-3 text-left">Name</th>
                          <th className="px-4 py-3 text-left">Year</th>
                          <th className="px-4 py-3 text-left">Block</th>
                          <th className="px-4 py-3 text-left">Hall No</th>
                          <th className="px-4 py-3 text-left">Seat No</th>
                          <th className="px-4 py-3 text-left">Exam Name</th>
                          <th className="px-4 py-3 text-left">Exam Date</th>
                          <th className="px-4 py-3 text-left">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hallAssignments.length === 0 ? (
                          <tr className="table-row-hover">
                            <td colSpan="9" className="px-4 py-3 text-center text-slate-400">No hall assignments uploaded yet</td>
                          </tr>
                        ) : (
                          hallAssignments.map((hall, idx) => (
                            <tr key={hall._id || idx} className="table-row-hover">
                              <td className="px-4 py-3 text-white">{hall.rollNo || '-'}</td>
                              <td className="px-4 py-3 text-white">{hall.name || '-'}</td>
                              <td className="px-4 py-3 text-slate-300">{hall.year || '-'}</td>
                              <td className="px-4 py-3 text-slate-300">{hall.block || '-'}</td>
                              <td className="px-4 py-3 text-slate-300">{hall.hallNo || '-'}</td>
                              <td className="px-4 py-3 text-slate-300">{hall.seatNo || '-'}</td>
                              <td className="px-4 py-3 text-slate-300">{hall.examName || '-'}</td>
                              <td className="px-4 py-3 text-slate-300">{hall.examDate ? new Date(hall.examDate).toLocaleDateString() : '-'}</td>
                              <td className="px-4 py-3 text-slate-300">{hall.duration || '-'}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'marks' && (
              <div>
                <div className="mb-6 flex gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <label className="text-slate-300 font-semibold">Semester:</label>
                    <select
                      value={selectedMarksSemester}
                      onChange={(e) => setSelectedMarksSemester(e.target.value)}
                      className="px-4 py-2 bg-slate-800 border border-purple-500 rounded-lg text-white focus:outline-none focus:border-purple-400 transition"
                    >
                      {semesters.map((semester) => (
                        <option key={semester} value={semester}>
                          {semester}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="card-professional">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="table-header">
                        <tr>
                          <th className="px-4 py-3 text-left">Roll No</th>
                          <th className="px-4 py-3 text-left">Name</th>
                          <th className="px-4 py-3 text-center">Mark Sheet</th>
                          <th className="px-4 py-3 text-center">SGPA</th>
                          <th className="px-4 py-3 text-center">CGPA</th>
                          <th className="px-4 py-3 text-center">Credit Registered</th>
                          <th className="px-4 py-3 text-left">Credit Completed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marks.filter(m => m.semester === selectedMarksSemester).map((markData) => (
                          <tr key={markData._id} className="table-row-hover">
                            <td className="px-4 py-3 text-white font-medium">{markData.rollNo || '-'}</td>
                            <td className="px-4 py-3 text-white font-medium">{markData.name || '-'}</td>
                            
                            {/* Mark Sheet Column */}
                            <td className="px-4 py-3 text-center">
                              {markData?.semesterFile ? (
                                <div className="flex items-center justify-center gap-2">
                                  <a
                                    href={`http://localhost:5007${markData.semesterFile}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 transition"
                                    title="View Mark Sheet"
                                  >
                                    <Eye size={18} />
                                  </a>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setUploadingCourse(markData.rollNo)
                                    setUploadingType('semester')
                                  }}
                                  className="btn-primary btn-small mx-auto"
                                >
                                  <Upload size={14} className="inline mr-1" />
                                  Upload
                                </button>
                              )}
                            </td>

                            {/* SGPA Column */}
                            <td className="px-4 py-3 text-center text-slate-300">
                              {markData?.sgpa || '-'}
                            </td>

                            {/* CGPA Column */}
                            <td className="px-4 py-3 text-center text-slate-300">
                              {markData?.cgpa || '-'}
                            </td>

                            {/* Credit Registered Column */}
                            <td className="px-4 py-3 text-center text-slate-300">
                              {markData?.creditRegistered || '-'}
                            </td>

                            {/* Credit Completed Column */}
                            <td className="px-4 py-3 text-slate-300 text-sm">{markData?.creditCompleted || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Upload Modal */}
                {uploadingCourse && uploadingType && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="card-professional max-w-md w-full mx-4">
                      <h2 className="text-2xl font-bold text-white mb-4">
                        Upload Semester Mark Sheet
                      </h2>
                      <p className="text-blue-300 mb-4">Course: <span className="font-semibold text-white">{uploadingCourse}</span></p>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-blue-300 mb-2">Select Mark Sheet File (Image/PDF)</label>
                          <input
                            type="file"
                            onChange={(e) => setUploadFile(e.target.files[0])}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="input-professional"
                          />
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleUploadMarks(uploadingCourse, uploadingType)}
                            disabled={loading || !uploadFile}
                            className="btn-success flex-1"
                          >
                            {loading ? 'Uploading...' : 'Upload'}
                          </button>
                          <button
                            onClick={() => {
                              setUploadingCourse(null)
                              setUploadingType(null)
                              setUploadFile(null)
                            }}
                            className="btn-secondary flex-1"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Internal Marks Tab */}
            {activeTab === 'internal' && (
              <div>
                <div className="mb-6 flex gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <label className="text-slate-300 font-semibold">Semester:</label>
                    <select
                      value={selectedSemester}
                      onChange={(e) => setSelectedSemester(e.target.value)}
                      className="px-4 py-2 bg-slate-800 border border-purple-500 rounded-lg text-white focus:outline-none focus:border-purple-400 transition"
                    >
                      {semesters.map((semester) => (
                        <option key={semester} value={semester}>
                          {semester}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-slate-300 font-semibold">Course:</label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="px-4 py-2 bg-slate-800 border border-purple-500 rounded-lg text-white focus:outline-none focus:border-purple-400 transition"
                    >
                      {courses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="card-professional">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="table-header">
                        <tr>
                          <th className="px-4 py-3 text-left">Roll No</th>
                          <th className="px-4 py-3 text-left">Name</th>
                          <th className="px-4 py-3 text-center">Internal 1</th>
                          <th className="px-4 py-3 text-center">Internal 2</th>
                          <th className="px-4 py-3 text-center">Status</th>
                          <th className="px-4 py-3 text-left">Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marks.filter(m => m.semester === selectedSemester && m.course === selectedCourse).map((markData) => (
                          <tr key={markData._id} className="table-row-hover">
                            <td className="px-4 py-3 text-white font-medium">{markData.rollNo || '-'}</td>
                            <td className="px-4 py-3 text-white font-medium">{markData.name || '-'}</td>
                            
                            {/* Internal 1 Column */}
                            <td className="px-4 py-3 text-center">
                              {markData?.internal1File ? (
                                <div className="flex items-center justify-center gap-2">
                                  <span className="text-slate-300">
                                    {markData?.internal1FileExtracted?.internal1 || markData?.internal1 || '-'}
                                  </span>
                                  <a
                                    href={`http://localhost:5007${markData.internal1File}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 transition"
                                    title="View Internal 1"
                                  >
                                    <Eye size={18} />
                                  </a>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setUploadingCourse(markData.rollNo)
                                    setUploadingType('internal1')
                                  }}
                                  className="btn-primary btn-small mx-auto"
                                >
                                  <Upload size={14} className="inline mr-1" />
                                  Upload
                                </button>
                              )}
                            </td>

                            {/* Internal 2 Column */}
                            <td className="px-4 py-3 text-center">
                              {markData?.internal2File ? (
                                <div className="flex items-center justify-center gap-2">
                                  <span className="text-slate-300">
                                    {markData?.internal2FileExtracted?.internal2 || markData?.internal2 || '-'}
                                  </span>
                                  <a
                                    href={`http://localhost:5007${markData.internal2File}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 transition"
                                    title="View Internal 2"
                                  >
                                    <Eye size={18} />
                                  </a>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setUploadingCourse(markData.rollNo)
                                    setUploadingType('internal2')
                                  }}
                                  className="btn-primary btn-small mx-auto"
                                >
                                  <Upload size={14} className="inline mr-1" />
                                  Upload
                                </button>
                              )}
                            </td>

                            {/* Status Column */}
                            <td className="px-4 py-3 text-center">
                              <span className={`${
                                markData?.status === 'Pass' ? 'badge-pass' : 'badge-fail'
                              }`}>
                                {markData?.status || '-'}
                              </span>
                            </td>

                            {/* Remarks Column */}
                            <td className="px-4 py-3 text-slate-300 text-sm">{markData?.remarks || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Upload Modal */}
                {uploadingCourse && uploadingType && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="card-professional max-w-md w-full mx-4">
                      <h2 className="text-2xl font-bold text-white mb-4">
                        Upload {uploadingType === 'internal1' ? 'Internal 1' : 'Internal 2'} Marks
                      </h2>
                      <p className="text-blue-300 mb-4">Course: <span className="font-semibold text-white">{uploadingCourse}</span></p>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-blue-300 mb-2">Select Marks File (Image/PDF)</label>
                          <input
                            type="file"
                            onChange={(e) => setUploadFile(e.target.files[0])}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="input-professional"
                          />
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleUploadMarks(uploadingCourse, uploadingType)}
                            disabled={loading || !uploadFile}
                            className="btn-success flex-1"
                          >
                            {loading ? 'Uploading...' : 'Upload'}
                          </button>
                          <button
                            onClick={() => {
                              setUploadingCourse(null)
                              setUploadingType(null)
                              setUploadFile(null)
                            }}
                            className="btn-secondary flex-1"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
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
