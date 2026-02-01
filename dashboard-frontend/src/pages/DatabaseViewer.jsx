import { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5001'

export default function DatabaseViewer() {
  const [loading, setLoading] = useState(false)
  const [students, setStudents] = useState([])
  const [certifications, setCertifications] = useState([])
  const [internships, setInternships] = useState([])
  const [notices, setNotices] = useState([])
  const [users, setUsers] = useState([])
  const [activeTab, setActiveTab] = useState('students')

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  }

  const fetchAllData = async () => {
    try {
      setLoading(true)
      
      // Login first to get token
      const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: 'faculty@example.com',
        password: 'password123',
        role: 'faculty'
      })
      
      const headers = {
        headers: {
          'Authorization': `Bearer ${loginResponse.data.token}`,
          'Content-Type': 'application/json'
        }
      }

      // Fetch all data
      const [studentsRes, certificationsRes, internshipsRes, noticesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/department/students`, headers),
        axios.get(`${API_BASE_URL}/department/certifications`, headers),
        axios.get(`${API_BASE_URL}/department/internships`, headers),
        axios.get(`${API_BASE_URL}/notice`, headers)
      ])

      setStudents(studentsRes.data.students || [])
      setCertifications(certificationsRes.data.certifications || [])
      setInternships(internshipsRes.data.internships || [])
      setNotices(noticesRes.data || [])

    } catch (error) {
      console.error('Error fetching data:', error)
      alert('Error fetching data. Make sure you are logged in.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  const renderTable = (data, title, columns) => (
    <div className="glass-effect rounded-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-white mb-4">{title} ({data.length} records)</h2>
      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-purple-600">
              <tr>
                {columns.map(col => (
                  <th key={col.key} className="px-3 py-2 text-left text-white font-semibold">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 10).map((item, idx) => (
                <tr key={item._id || idx} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}`}>
                  {columns.map(col => (
                    <td key={col.key} className="px-3 py-2 text-gray-300">
                      {col.render ? col.render(item[col.key], item) : (item[col.key] || '-')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {data.length > 10 && (
            <p className="text-gray-400 text-center mt-4">Showing first 10 of {data.length} records</p>
          )}
        </div>
      ) : (
        <p className="text-gray-400">No data found</p>
      )}
    </div>
  )

  const studentColumns = [
    { key: '_id', label: 'ID' },
    { key: 'rollNo', label: 'Roll No' },
    { key: 'name', label: 'Name' },
    { key: 'year', label: 'Year' },
    { key: 'collegeEmail', label: 'Email' },
    { key: 'phone', label: 'Phone' }
  ]

  const certificationColumns = [
    { key: '_id', label: 'ID' },
    { key: 'rollNo', label: 'Roll No' },
    { key: 'name', label: 'Student' },
    { key: 'cert', label: 'Certification' },
    { key: 'status', label: 'Status', render: (status) => (
      <span className={`px-2 py-1 rounded text-xs ${
        status === 'Accepted' ? 'bg-green-900 text-green-200' :
        status === 'Rejected' ? 'bg-red-900 text-red-200' :
        'bg-yellow-900 text-yellow-200'
      }`}>
        {status}
      </span>
    )},
    { key: 'year', label: 'Year' }
  ]

  const internshipColumns = [
    { key: '_id', label: 'ID' },
    { key: 'rollNo', label: 'Roll No' },
    { key: 'name', label: 'Student' },
    { key: 'type', label: 'Type' },
    { key: 'reason', label: 'Reason' },
    { key: 'sentToParent', label: 'Sent to Parent', render: (sent) => sent ? '✅ Yes' : '❌ No' }
  ]

  const noticeColumns = [
    { key: '_id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'author', label: 'Author' },
    { key: 'priority', label: 'Priority' },
    { key: 'type', label: 'Type' },
    { key: 'createdAt', label: 'Created', render: (date) => new Date(date).toLocaleDateString() }
  ]

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">MongoDB Database Viewer</h1>
          <button
            onClick={fetchAllData}
            disabled={loading}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Refresh Data'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-purple-500">
          {[
            { key: 'students', label: `Students (${students.length})` },
            { key: 'certifications', label: `Certifications (${certifications.length})` },
            { key: 'internships', label: `Internships (${internships.length})` },
            { key: 'notices', label: `Notices (${notices.length})` }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === tab.key
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-purple-400 text-xl">Loading database data...</div>
          </div>
        ) : (
          <div>
            {activeTab === 'students' && renderTable(students, 'Students', studentColumns)}
            {activeTab === 'certifications' && renderTable(certifications, 'Certifications', certificationColumns)}
            {activeTab === 'internships' && renderTable(internships, 'Internships', internshipColumns)}
            {activeTab === 'notices' && renderTable(notices, 'Notices', noticeColumns)}
          </div>
        )}

        <div className="glass-effect rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Database Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-900 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{students.length}</div>
              <div className="text-blue-200">Students</div>
            </div>
            <div className="bg-green-900 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{certifications.length}</div>
              <div className="text-green-200">Certifications</div>
            </div>
            <div className="bg-purple-900 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{internships.length}</div>
              <div className="text-purple-200">Internships</div>
            </div>
            <div className="bg-orange-900 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{notices.length}</div>
              <div className="text-orange-200">Notices</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400">
            This data is coming directly from your MongoDB database at <code>mongodb://localhost:27017/eduinsight</code>
          </p>
        </div>
      </div>
    </div>
  )
}