import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import { Upload, Eye, Download, Trash2 } from 'lucide-react'
import { departmentAPI } from '../services/api'

export default function StudentDepartmentDetails({ onLogout, userRole = 'student' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('certifications')
  const [showCertUpload, setShowCertUpload] = useState(false)
  const [showInternUpload, setShowInternUpload] = useState(false)
  const [certFile, setCertFile] = useState(null)
  const [internFile, setInternFile] = useState(null)
  const [certProtocol, setCertProtocol] = useState('coursera')
  const [internType, setInternType] = useState('Internship')
  const [loading, setLoading] = useState(false)
  const [certifications, setCertifications] = useState([])
  const [internships, setInternships] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const navigate = useNavigate()

  // Extract rollNo from email
  const getUserRollNo = () => {
    const email = localStorage.getItem('userEmail')
    const match = email.match(/student(\d+)@/)
    return match ? match[1] : null
  }

  // Fetch certifications and internships
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setDataLoading(true)
      const rollNo = getUserRollNo()
      
      // Fetch certifications
      const certsResponse = await fetch(`http://localhost:5007/api/department/certifications?rollNo=${rollNo}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (certsResponse.ok) {
        const certsData = await certsResponse.json()
        setCertifications(Array.isArray(certsData) ? certsData : [])
      }

      // Fetch internships
      const internsResponse = await fetch(`http://localhost:5007/api/department/internships?rollNo=${rollNo}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (internsResponse.ok) {
        const internsData = await internsResponse.json()
        setInternships(Array.isArray(internsData) ? internsData : [])
      }
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setDataLoading(false)
    }
  }

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  const handleCertUpload = async () => {
    if (!certFile) {
      alert('Please select a file')
      return
    }

    // Validate file type
    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'doc', 'docx']
    const fileExtension = certFile.name.split('.').pop().toLowerCase()
    if (!allowedExtensions.includes(fileExtension)) {
      alert('Invalid file format. Allowed: PDF, JPG, JPEG, PNG, GIF, BMP, DOC, DOCX')
      return
    }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', certFile)
      formData.append('protocol', certProtocol)

      const response = await fetch('http://localhost:5007/api/files/upload-certificate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      })

      const data = await response.json()
      if (response.ok) {
        alert('Certificate uploaded successfully!')
        setShowCertUpload(false)
        setCertFile(null)
        // Refresh data
        await new Promise(resolve => setTimeout(resolve, 500))
        fetchData()
      } else {
        alert('Failed to upload certificate: ' + data.message)
      }
    } catch (err) {
      console.error('Error uploading certificate:', err)
      alert('Error uploading certificate: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInternUpload = async () => {
    if (!internFile) {
      alert('Please select a file')
      return
    }

    // Validate file type
    const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'doc', 'docx']
    const fileExtension = internFile.name.split('.').pop().toLowerCase()
    if (!allowedExtensions.includes(fileExtension)) {
      alert('Invalid file format. Allowed: PDF, JPG, JPEG, PNG, GIF, BMP, DOC, DOCX')
      return
    }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('file', internFile)
      formData.append('type', internType)

      const response = await fetch('http://localhost:5007/api/files/upload-internship', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      })

      const data = await response.json()
      if (response.ok) {
        alert('Internship/Leave document uploaded successfully!')
        setShowInternUpload(false)
        setInternFile(null)
        // Refresh data
        await new Promise(resolve => setTimeout(resolve, 500))
        fetchData()
      } else {
        alert('Failed to upload document: ' + data.message)
      }
    } catch (err) {
      console.error('Error uploading internship:', err)
      alert('Error uploading document: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCertification = async (certId) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) {
      return
    }

    try {
      setDeleting(certId)
      const response = await fetch(`http://localhost:5007/api/department/certifications/${certId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.ok) {
        alert('Certificate deleted successfully!')
        fetchData()
      } else {
        alert('Failed to delete certificate')
      }
    } catch (err) {
      console.error('Error deleting certificate:', err)
      alert('Error deleting certificate: ' + err.message)
    } finally {
      setDeleting(null)
    }
  }

  const handleDeleteInternship = async (internId) => {
    if (!window.confirm('Are you sure you want to delete this internship/leave record?')) {
      return
    }

    try {
      setDeleting(internId)
      const response = await fetch(`http://localhost:5007/api/department/internships/${internId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.ok) {
        alert('Internship/Leave record deleted successfully!')
        fetchData()
      } else {
        alert('Failed to delete internship/leave record')
      }
    } catch (err) {
      console.error('Error deleting internship:', err)
      alert('Error deleting internship/leave record: ' + err.message)
    } finally {
      setDeleting(null)
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
            <h1 className="text-4xl font-bold text-white mb-8">Department Details</h1>

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
                  {tab === 'certifications' && 'Certifications'}
                  {tab === 'internships' && 'Internships/Leave'}
                </button>
              ))}
            </div>

            {/* Certifications Tab */}
            {activeTab === 'certifications' && (
              <div>
                <div className="mb-6 flex justify-end">
                  <button
                    onClick={() => setShowCertUpload(!showCertUpload)}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition"
                  >
                    <Upload size={20} />
                    Upload Certificate
                  </button>
                </div>

                {showCertUpload && (
                  <div className="glass-effect rounded-xl p-6 card-shadow mb-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Upload Certificate</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Select Protocol</label>
                        <select
                          value={certProtocol}
                          onChange={(e) => setCertProtocol(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-gray-300 focus:outline-none focus:border-purple-400 transition"
                        >
                          <option value="coursera">Coursera</option>
                          <option value="udemy">Udemy</option>
                          <option value="edx">EdX</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Select Certificate File</label>
                        <input
                          type="file"
                          onChange={(e) => setCertFile(e.target.files[0])}
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-gray-300 focus:outline-none focus:border-purple-400 transition"
                        />
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={handleCertUpload}
                          disabled={loading}
                          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
                        >
                          {loading ? 'Uploading...' : 'Upload'}
                        </button>
                        <button
                          onClick={() => {
                            setShowCertUpload(false)
                            setCertFile(null)
                          }}
                          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Roll No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Certificate Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Protocol</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Credits</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">File</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {certifications.length === 0 ? (
                          <tr className="border-t border-gray-700 bg-gray-800 hover:bg-gray-700 transition">
                            <td colSpan="8" className="px-4 py-3 text-center text-gray-400">No certifications uploaded yet</td>
                          </tr>
                        ) : (
                          certifications.map((cert) => (
                            <tr key={cert._id} className="border-t border-gray-700 bg-gray-800 hover:bg-gray-700 transition">
                              <td className="px-4 py-3 text-white">{cert.rollNo}</td>
                              <td className="px-4 py-3 text-white">{cert.name}</td>
                              <td className="px-4 py-3 text-gray-300">{cert.cert}</td>
                              <td className="px-4 py-3 text-gray-300">{cert.protocol}</td>
                              <td className="px-4 py-3 text-gray-300">{cert.credits}</td>
                              <td className="px-4 py-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  cert.status === 'Accepted' ? 'bg-green-900 text-green-200' :
                                  cert.status === 'Rejected' ? 'bg-red-900 text-red-200' :
                                  'bg-yellow-900 text-yellow-200'
                                }`}>
                                  {cert.status || 'Pending'}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <a
                                  href={`http://localhost:5007${cert.certificateFile}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300"
                                  title="Download Certificate"
                                >
                                  <Download size={18} />
                                </a>
                              </td>
                              <td className="px-4 py-3">
                                <button
                                  onClick={() => handleDeleteCertification(cert._id)}
                                  disabled={deleting === cert._id}
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-semibold flex items-center gap-1 transition disabled:opacity-50"
                                >
                                  <Trash2 size={16} />
                                  {deleting === cert._id ? 'Deleting...' : 'Delete'}
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Internships/Leave Tab */}
            {activeTab === 'internships' && (
              <div>
                <div className="mb-6 flex justify-end">
                  <button
                    onClick={() => setShowInternUpload(!showInternUpload)}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition"
                  >
                    <Upload size={20} />
                    Upload Internship/Leave
                  </button>
                </div>

                {showInternUpload && (
                  <div className="glass-effect rounded-xl p-6 card-shadow mb-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Upload Internship/Leave Document</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Select Type</label>
                        <select
                          value={internType}
                          onChange={(e) => setInternType(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-gray-300 focus:outline-none focus:border-purple-400 transition"
                        >
                          <option value="Internship">Internship</option>
                          <option value="Leave">Leave</option>
                          <option value="Project">Project</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Select Document File</label>
                        <input
                          type="file"
                          onChange={(e) => setInternFile(e.target.files[0])}
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-gray-300 focus:outline-none focus:border-purple-400 transition"
                        />
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={handleInternUpload}
                          disabled={loading}
                          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
                        >
                          {loading ? 'Uploading...' : 'Upload'}
                        </button>
                        <button
                          onClick={() => {
                            setShowInternUpload(false)
                            setInternFile(null)
                          }}
                          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Roll No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Type</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Reason</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Sent to Parent</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">File</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {internships.length === 0 ? (
                          <tr className="border-t border-gray-700 bg-gray-800 hover:bg-gray-700 transition">
                            <td colSpan="8" className="px-4 py-3 text-center text-gray-400">No internships/leave uploaded yet</td>
                          </tr>
                        ) : (
                          internships.map((intern) => (
                            <tr key={intern._id} className="border-t border-gray-700 bg-gray-800 hover:bg-gray-700 transition">
                              <td className="px-4 py-3 text-white">{intern.rollNo}</td>
                              <td className="px-4 py-3 text-white">{intern.name}</td>
                              <td className="px-4 py-3 text-gray-300">{intern.type}</td>
                              <td className="px-4 py-3 text-gray-300">{intern.reason}</td>
                              <td className="px-4 py-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  intern.status === 'Accepted' ? 'bg-green-900 text-green-200' :
                                  intern.status === 'Rejected' ? 'bg-red-900 text-red-200' :
                                  'bg-yellow-900 text-yellow-200'
                                }`}>
                                  {intern.status || 'Pending'}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-300">{intern.sentToParent ? 'Yes' : 'No'}</td>
                              <td className="px-4 py-3">
                                <a
                                  href={`http://localhost:5007${intern.photocopy}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300"
                                  title="Download Document"
                                >
                                  <Download size={18} />
                                </a>
                              </td>
                              <td className="px-4 py-3">
                                <button
                                  onClick={() => handleDeleteInternship(intern._id)}
                                  disabled={deleting === intern._id}
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-semibold flex items-center gap-1 transition disabled:opacity-50"
                                >
                                  <Trash2 size={16} />
                                  {deleting === intern._id ? 'Deleting...' : 'Delete'}
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
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
