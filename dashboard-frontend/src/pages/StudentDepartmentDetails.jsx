import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, Send, Phone } from 'lucide-react'
import { departmentAPI, filesAPI } from '../services/api'

export default function StudentDepartmentDetails({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('certifications')
  const [studentData, setStudentData] = useState({
    name: '',
    rollNo: '',
    phone: '',
    fatherPhone: '',
    motherPhone: ''
  })
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [showInternshipForm, setShowInternshipForm] = useState(false)
  const [certifications, setCertifications] = useState([])
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    certName: '',
    file: null
  })

  const [internshipFormData, setInternshipFormData] = useState({
    type: 'Internship',
    reason: '',
    file: null
  })

  // Fetch student data and certifications on mount
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail')
    const rollNoMatch = userEmail?.match(/student(\d{8})/)
    if (rollNoMatch) {
      const rollNo = rollNoMatch[1]
      setStudentData(prev => ({...prev, rollNo, name: `Student ${rollNo}`}))
      fetchCertifications(rollNo)
      fetchInternships(rollNo)
    }
  }, [])

  const fetchCertifications = async (rollNo) => {
    try {
      setLoading(true)
      const data = await departmentAPI.getCertifications('2nd')
      // API returns { count, certifications }
      const allCerts = Array.isArray(data.certifications) ? data.certifications : (Array.isArray(data) ? data : [])
      // Filter certifications for current student
      const studentCerts = allCerts.filter(c => c.rollNo === rollNo || (c.studentId && c.studentId.rollNo === rollNo))
      setCertifications(studentCerts)
    } catch (err) {
      setError('Failed to load certifications')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchInternships = async (rollNo) => {
    try {
      const data = await departmentAPI.getInternships('2nd')
      // API returns { count, internships }
      const allInterns = Array.isArray(data.internships) ? data.internships : (Array.isArray(data) ? data : [])
      // Filter internships for current student
      const studentInterns = allInterns.filter(i => i.rollNo === rollNo || (i.studentId && i.studentId.rollNo === rollNo))
      setInternships(studentInterns)
    } catch (err) {
      console.error(err)
    }
  }

  const handleInternshipFileChange = (e) => {
    setInternshipFormData({...internshipFormData, file: e.target.files[0]})
  }

  const handleFileChange = (e) => {
    setFormData({...formData, file: e.target.files[0]})
  }

  const handleUploadCert = async (e) => {
    e.preventDefault()
    if (!formData.certName || !formData.file) {
      alert('Please fill all fields')
      return
    }

    try {
      setLoading(true)
      // Upload file to backend
      const fileResponse = await filesAPI.uploadCertificate(formData.file)
      
      // Add certification to database
      const certData = {
        name: studentData.name,
        rollNo: studentData.rollNo,
        cert: formData.certName,
        status: 'Pending',
        remarks: 'Awaiting review',
        year: '2nd',
        certificateFile: fileResponse.file.path
      }
      
      await departmentAPI.addCertification(certData)
      
      // Refresh certifications list
      fetchCertifications(studentData.rollNo)
      setFormData({ certName: '', file: null })
      setShowUploadForm(false)
      alert('Certificate uploaded successfully!')
    } catch (err) {
      console.error(err)
      alert('Failed to upload certificate')
    } finally {
      setLoading(false)
    }
  }

  const handleUploadInternship = async (e) => {
    e.preventDefault()
    if (!internshipFormData.type || !internshipFormData.reason || !internshipFormData.file) {
      alert('Please fill all fields')
      return
    }

    try {
      setLoading(true)
      // Upload file to backend
      const fileResponse = await filesAPI.uploadInternship(internshipFormData.file)
      
      // Add internship to database
      const internshipData = {
        name: studentData.name,
        rollNo: studentData.rollNo,
        type: internshipFormData.type,
        reason: internshipFormData.reason,
        parentPhone: studentData.fatherPhone,
        photocopy: fileResponse.file.path,
        year: '2nd',
        sentToParent: false
      }
      
      await departmentAPI.addInternship(internshipData)
      
      // Refresh internships list
      fetchInternships(studentData.rollNo)
      setInternshipFormData({ type: 'Internship', reason: '', file: null })
      setShowInternshipForm(false)
      alert('Internship/Leave uploaded successfully!')
    } catch (err) {
      console.error(err)
      alert('Failed to upload internship')
    } finally {
      setLoading(false)
    }
  }

  const handleSendToParent = async (internshipId) => {
    try {
      await departmentAPI.sendToParent(internshipId)
      fetchInternships(studentData.rollNo)
      alert('Sent to parent successfully!')
    } catch (err) {
      console.error(err)
      alert('Failed to send to parent')
    }
  }

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Accepted':
        return 'bg-green-900 text-green-200'
      case 'Rejected':
        return 'bg-red-900 text-red-200'
      case 'Pending':
        return 'bg-yellow-900 text-yellow-200'
      case 'Completed':
        return 'bg-green-900 text-green-200'
      case 'Approved':
        return 'bg-green-900 text-green-200'
      case 'Ongoing':
        return 'bg-blue-900 text-blue-200'
      default:
        return 'bg-gray-700 text-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Accepted':
      case 'Completed':
        return <CheckCircle size={18} className="text-green-400" />
      case 'Rejected':
        return <XCircle size={18} className="text-red-400" />
      case 'Pending':
        return <AlertCircle size={18} className="text-yellow-400" />
      default:
        return null
    }
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
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8">My Details</h1>

            <div className="flex gap-4 mb-8 border-b border-purple-500">
              {['certifications', 'internships'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-semibold transition ${
                    activeTab === tab
                      ? 'text-purple-400 border-b-2 border-purple-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab === 'certifications' ? 'Certifications' : 'Internships'}
                </button>
              ))}
            </div>

            {activeTab === 'certifications' && (
              <>
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => setShowUploadForm(!showUploadForm)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition"
                  >
                    <Upload size={20} />
                    Upload Certificate
                  </button>
                </div>

                {showUploadForm && (
                  <div className="glass-effect rounded-xl p-6 card-shadow mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Upload New Certificate</h2>
                    <form onSubmit={handleUploadCert} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Certificate Name</label>
                        <input
                          type="text"
                          value={formData.certName}
                          onChange={(e) => setFormData({...formData, certName: e.target.value})}
                          placeholder="e.g., AWS Certified Solutions Architect"
                          className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Upload Certificate File</label>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.png"
                          className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-gray-300 focus:outline-none focus:border-purple-400 transition"
                          required
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
                        >
                          Upload Certificate
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowUploadForm(false)}
                          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Student Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Roll No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Certificate Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Remarks</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">File</th>
                        </tr>
                      </thead>
                      <tbody>
                        {certifications.map((cert, idx) => (
                          <tr key={cert._id || idx} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                            <td className="px-4 py-3 text-white font-medium">{cert.studentId?.name || cert.name || 'N/A'}</td>
                            <td className="px-4 py-3 text-white font-medium">{cert.studentId?.rollNo || cert.rollNo || 'N/A'}</td>
                            <td className="px-4 py-3 text-gray-300">{cert.cert || cert.certificateName || 'N/A'}</td>
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${getStatusColor(cert.status)}`}>
                                {getStatusIcon(cert.status)}
                                {cert.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-300">{cert.remarks || 'N/A'}</td>
                            <td className="px-4 py-3">
                              {cert.certificateFile ? (
                                <div className="flex items-center gap-2 text-purple-400">
                                  <FileText size={16} />
                                  <span className="text-sm">{cert.certificateFile.split('/').pop()}</span>
                                </div>
                              ) : (
                                <span className="text-gray-500 text-sm">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'internships' && (
              <>
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => setShowInternshipForm(!showInternshipForm)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition"
                  >
                    <Upload size={20} />
                    Upload Internship/Leave
                  </button>
                </div>

                {showInternshipForm && (
                  <div className="glass-effect rounded-xl p-6 card-shadow mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Upload Internship/Leave</h2>
                    <form onSubmit={handleUploadInternship} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Type</label>
                        <select
                          value={internshipFormData.type}
                          onChange={(e) => setInternshipFormData({...internshipFormData, type: e.target.value})}
                          className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-white focus:outline-none focus:border-purple-400 transition"
                          required
                        >
                          <option value="Internship">Internship</option>
                          <option value="Leave">Leave</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Reason</label>
                        <textarea
                          value={internshipFormData.reason}
                          onChange={(e) => setInternshipFormData({...internshipFormData, reason: e.target.value})}
                          placeholder="Enter reason for internship or leave"
                          className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition resize-none"
                          rows="4"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Upload Document</label>
                        <input
                          type="file"
                          onChange={handleInternshipFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.png"
                          className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-gray-300 focus:outline-none focus:border-purple-400 transition"
                          required
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowInternshipForm(false)}
                          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Student Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Roll No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Type</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Reason</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {internships.map((intern, idx) => (
                          <tr key={intern._id || idx} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                            <td className="px-4 py-3 text-white font-medium">{intern.studentId?.name || intern.name || 'N/A'}</td>
                            <td className="px-4 py-3 text-white font-medium">{intern.studentId?.rollNo || intern.rollNo || 'N/A'}</td>
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                intern.type === 'Internship' ? 'bg-blue-900 text-blue-200' : 'bg-purple-900 text-purple-200'
                              }`}>
                                {intern.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-300 text-sm">{intern.reason || 'N/A'}</td>
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${getStatusColor(intern.status)}`}>
                                {getStatusIcon(intern.status)}
                                {intern.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-300">{intern.remarks || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
