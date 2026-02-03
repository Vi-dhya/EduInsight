import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import { Download, Eye, Upload } from 'lucide-react'

export default function StudentExamDetails({ onLogout, userRole = 'student' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('schedule')
  const [marks, setMarks] = useState([])
  const [schedules, setSchedules] = useState([])
  const [hallAssignments, setHallAssignments] = useState([])
  const [uploadingCourse, setUploadingCourse] = useState(null)
  const [uploadingType, setUploadingType] = useState(null)
  const [uploadFile, setUploadFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState('Semester 1')
  const navigate = useNavigate()

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

  const courses = [
    'Deep Learning',
    'Information Security Management',
    'Web Technology',
    'Business Analytics',
    'Software Testing',
    'Digital Marketing'
  ]

  // Extract rollNo from email
  const getUserRollNo = () => {
    const email = localStorage.getItem('userEmail')
    const match = email.match(/student(\d+)@/)
    return match ? match[1] : null
  }

  // Fetch marks on component mount
  useEffect(() => {
    fetchMarks()
    fetchSchedules()
    fetchHallAssignments()
  }, [])

  const fetchSchedules = async () => {
    try {
      const year = localStorage.getItem('userYear') || '2nd'
      const response = await fetch(`http://localhost:5007/api/exam/schedules?year=${year}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setSchedules(Array.isArray(data.schedules) ? data.schedules : (Array.isArray(data) ? data : []))
      }
    } catch (err) {
      console.error('Error fetching schedules:', err)
    }
  }

  const fetchHallAssignments = async () => {
    try {
      const year = localStorage.getItem('userYear') || '2nd'
      const response = await fetch(`http://localhost:5007/api/exam/hall-assignments?year=${year}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setHallAssignments(Array.isArray(data.hallAssignments) ? data.hallAssignments : (Array.isArray(data) ? data : []))
      }
    } catch (err) {
      console.error('Error fetching hall assignments:', err)
    }
  }

  const fetchMarks = async () => {
    try {
      const rollNo = getUserRollNo()
      const response = await fetch(`http://localhost:5007/api/exam/marks?rollNo=${rollNo}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setMarks(Array.isArray(data) ? data : [])
      }
    } catch (err) {
      console.error('Error fetching marks:', err)
    }
  }

  const handleUploadMarks = async (course, uploadType) => {
    if (!uploadFile) {
      alert('Please select a file')
      return
    }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', uploadFile)
      formData.append('course', course)
      formData.append('uploadType', uploadType)

      const response = await fetch('http://localhost:5007/api/files/upload-marks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      })

      const data = await response.json()
      if (response.ok) {
        alert('Marks uploaded successfully! OCR extraction in progress...')
        setUploadingCourse(null)
        setUploadingType(null)
        setUploadFile(null)
        // Refresh data
        await new Promise(resolve => setTimeout(resolve, 1000))
        fetchMarks()
      } else {
        alert('Failed to upload marks: ' + data.message)
      }
    } catch (err) {
      console.error('Error uploading marks:', err)
      alert('Error uploading marks: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    onLogout()
    navigate('/login')
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
            <h1 className="text-4xl font-bold text-white mb-8">Exam Details</h1>

            {/* Semester Dropdown for Internal Marks */}
            {activeTab === 'internal' && (
              <div className="flex justify-end mb-4">
                <div className="flex items-center gap-2">
                  <label className="text-white font-semibold">Select Semester:</label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-white focus:outline-none focus:border-purple-400 transition"
                  >
                    {semesters.map((semester) => (
                      <option key={semester} value={semester}>
                        {semester}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="flex gap-4 mb-8 border-b border-purple-500">
              {['schedule', 'halls', 'internal', 'marks', 'arrears'].map(tab => (
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
                  {tab === 'arrears' && 'Arrears'}
                </button>
              ))}
            </div>

            {/* Exam Schedule Tab */}
            {activeTab === 'schedule' && (
              <div className="space-y-4">
                {schedules.length > 0 && (
                  <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                          <tr>
                            <th className="px-4 py-3 text-left text-white font-semibold">Course</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Date</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Day</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Time</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schedules.flatMap((schedule, scheduleIdx) => 
                            (schedule.exams || []).map((exam, examIdx) => (
                              <tr key={`${scheduleIdx}-${examIdx}`} className={`border-t border-gray-700 ${examIdx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                                <td className="px-4 py-3 text-white font-medium">{exam.course || '-'}</td>
                                <td className="px-4 py-3 text-gray-300">{exam.date || '-'}</td>
                                <td className="px-4 py-3 text-gray-300">{exam.day || '-'}</td>
                                <td className="px-4 py-3 text-gray-300">{exam.time || '-'}</td>
                                <td className="px-4 py-3 text-gray-300">{exam.duration || '-'}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {schedules.length === 0 && (
                  <div className="glass-effect rounded-xl p-6 card-shadow text-center">
                    <p className="text-gray-300">No schedule available yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Hall Assignments Tab */}
            {activeTab === 'halls' && (
              <div className="space-y-4">
                {hallAssignments.length > 0 && (
                  <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                          <tr>
                            <th className="px-4 py-3 text-left text-white font-semibold">Roll No</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Name</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Block</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Hall No</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Seat No</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Exam Name</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Exam Date</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hallAssignments.flatMap((hallGroup, groupIdx) => 
                            (hallGroup.assignments || []).map((assignment, assignIdx) => (
                              <tr key={`${groupIdx}-${assignIdx}`} className={`border-t border-gray-700 ${assignIdx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                                <td className="px-4 py-3 text-white font-medium">{assignment.rollNo || '-'}</td>
                                <td className="px-4 py-3 text-white font-medium">{assignment.name || '-'}</td>
                                <td className="px-4 py-3 text-gray-300">{assignment.block || '-'}</td>
                                <td className="px-4 py-3 text-gray-300">{assignment.hallNo || '-'}</td>
                                <td className="px-4 py-3 text-gray-300">{assignment.seatNo || '-'}</td>
                                <td className="px-4 py-3 text-gray-300">{assignment.examName || '-'}</td>
                                <td className="px-4 py-3 text-gray-300">{assignment.examDate || '-'}</td>
                                <td className="px-4 py-3 text-gray-300">{assignment.duration || '-'}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {hallAssignments.length === 0 && (
                  <div className="glass-effect rounded-xl p-6 card-shadow text-center">
                    <p className="text-gray-300">No hall assignments available yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Marks Tab */}
            {activeTab === 'marks' && (
              <div>
                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Semester</th>
                          <th className="px-4 py-3 text-center text-white font-semibold">Mark Sheet</th>
                          <th className="px-4 py-3 text-center text-white font-semibold">SGPA</th>
                          <th className="px-4 py-3 text-center text-white font-semibold">CGPA</th>
                          <th className="px-4 py-3 text-center text-white font-semibold">Credit Registered</th>
                          <th className="px-4 py-3 text-center text-white font-semibold">Credit Completed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semesters.map((semester) => {
                          const markData = marks.find(m => m.semester === semester)
                          return (
                            <tr key={semester} className="border-t border-gray-700 bg-gray-800 hover:bg-gray-700 transition">
                              <td className="px-4 py-3 text-white font-medium">{semester}</td>
                              
                              {/* Mark Sheet Column */}
                              <td className="px-4 py-3 text-center">
                                {markData?.semesterFile ? (
                                  <div className="flex items-center justify-center gap-2">
                                    <span className="text-gray-300">
                                      {markData?.semesterFileExtracted?.semesterMark || markData?.totalMark || '-'}
                                    </span>
                                    <a
                                      href={`http://localhost:5007${markData.semesterFile}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-400 hover:text-blue-300"
                                      title="View Mark Sheet"
                                    >
                                      <Eye size={18} />
                                    </a>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setUploadingCourse(semester)
                                      setUploadingType('marksheet')
                                    }}
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold flex items-center gap-1 mx-auto transition"
                                  >
                                    <Upload size={14} />
                                    Upload
                                  </button>
                                )}
                              </td>

                              {/* SGPA Column */}
                              <td className="px-4 py-3 text-center text-gray-300">
                                {markData?.semesterFileExtracted?.sgpa || markData?.sgpa || '-'}
                              </td>

                              {/* CGPA Column */}
                              <td className="px-4 py-3 text-center text-gray-300">
                                {markData?.semesterFileExtracted?.cgpa || markData?.cgpa || '-'}
                              </td>

                              {/* Credit Registered Column */}
                              <td className="px-4 py-3 text-center text-gray-300">
                                {markData?.creditRegistered || '-'}
                              </td>

                              {/* Credit Completed Column */}
                              <td className="px-4 py-3 text-center text-gray-300">
                                {markData?.creditCompleted || '-'}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Upload Modal */}
                {uploadingCourse && uploadingType && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="glass-effect rounded-xl p-6 card-shadow max-w-md w-full mx-4">
                      <h2 className="text-2xl font-bold text-white mb-4">
                        Upload {uploadingType === 'marksheet' ? 'Mark Sheet' : 'Marks'}
                      </h2>
                      <p className="text-gray-300 mb-4">Semester: <span className="font-semibold">{uploadingCourse}</span></p>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-200 mb-2">Select Mark Sheet File (Image/PDF)</label>
                          <input
                            type="file"
                            onChange={(e) => setUploadFile(e.target.files[0])}
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-gray-300 focus:outline-none focus:border-purple-400 transition"
                          />
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleUploadMarks(uploadingCourse, uploadingType)}
                            disabled={loading || !uploadFile}
                            className="flex-1 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
                          >
                            {loading ? 'Uploading...' : 'Upload'}
                          </button>
                          <button
                            onClick={() => {
                              setUploadingCourse(null)
                              setUploadingType(null)
                              setUploadFile(null)
                            }}
                            className="flex-1 px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
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

            {/* Arrears Tab */}
            {activeTab === 'arrears' && (
              <div>
                {marks.some(m => m.arrearCourses && m.arrearCourses.length > 0) ? (
                  <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                          <tr>
                            <th className="px-4 py-3 text-left text-white font-semibold">Arrear Course</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
                            <th className="px-4 py-3 text-left text-white font-semibold">Document</th>
                          </tr>
                        </thead>
                        <tbody>
                          {marks.flatMap((mark, idx) => 
                            (mark.arrearCourses || []).map((course, courseIdx) => (
                              <tr key={`${idx}-${courseIdx}`} className={`border-t border-gray-700 ${courseIdx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                                <td className="px-4 py-3 text-white font-medium">{course}</td>
                                <td className="px-4 py-3">
                                  <span className="px-2 py-1 rounded text-xs font-semibold bg-red-900 text-red-200">
                                    Arrear
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  {mark.arrearFile && (
                                    <a
                                      href={`http://localhost:5007${mark.arrearFile}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                    >
                                      <Eye size={18} />
                                      View
                                    </a>
                                  )}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="glass-effect rounded-xl p-6 card-shadow text-center">
                    <p className="text-gray-300">No arrear courses yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Internal Marks Tab */}
            {activeTab === 'internal' && (
              <div>
                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Course</th>
                          <th className="px-4 py-3 text-center text-white font-semibold">Internal 1</th>
                          <th className="px-4 py-3 text-center text-white font-semibold">Internal 2</th>
                          <th className="px-4 py-3 text-center text-white font-semibold">Status</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map((course) => {
                          const markData = marks.find(m => m.course === course && m.semester === selectedSemester)
                          return (
                            <tr key={course} className="border-t border-gray-700 bg-gray-800 hover:bg-gray-700 transition">
                              <td className="px-4 py-3 text-white font-medium">{course}</td>
                              
                              {/* Internal 1 Column */}
                              <td className="px-4 py-3 text-center">
                                {markData?.internal1File ? (
                                  <div className="flex items-center justify-center gap-2">
                                    <span className="text-gray-300">
                                      {markData?.internal1FileExtracted?.internal1 || markData?.internal1 || '-'}
                                    </span>
                                    <a
                                      href={`http://localhost:5007${markData.internal1File}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-400 hover:text-blue-300"
                                      title="View Internal 1"
                                    >
                                      <Eye size={18} />
                                    </a>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setUploadingCourse(course)
                                      setUploadingType('internal1')
                                    }}
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold flex items-center gap-1 mx-auto transition"
                                  >
                                    <Upload size={14} />
                                    Upload
                                  </button>
                                )}
                              </td>

                              {/* Internal 2 Column */}
                              <td className="px-4 py-3 text-center">
                                {markData?.internal2File ? (
                                  <div className="flex items-center justify-center gap-2">
                                    <span className="text-gray-300">
                                      {markData?.internal2FileExtracted?.internal2 || markData?.internal2 || '-'}
                                    </span>
                                    <a
                                      href={`http://localhost:5007${markData.internal2File}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-400 hover:text-blue-300"
                                      title="View Internal 2"
                                    >
                                      <Eye size={18} />
                                    </a>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setUploadingCourse(course)
                                      setUploadingType('internal2')
                                    }}
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold flex items-center gap-1 mx-auto transition"
                                  >
                                    <Upload size={14} />
                                    Upload
                                  </button>
                                )}
                              </td>

                              {/* Status Column */}
                              <td className="px-4 py-3 text-center">
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                  markData?.status === 'Pass' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                                }`}>
                                  {markData?.status || '-'}
                                </span>
                              </td>

                              {/* Remarks Column */}
                              <td className="px-4 py-3 text-gray-300">
                                {markData?.remarks || '-'}
                              </td>
                            </tr>
                          )
                        })}
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
