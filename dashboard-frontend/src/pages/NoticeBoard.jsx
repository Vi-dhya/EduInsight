import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import { Trash2, Plus, Calendar, AlertCircle } from 'lucide-react'
import { noticesAPI } from '../services/api'

export default function NoticeBoard({ onLogout, userRole = 'faculty' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedYear, setSelectedYear] = useState('2nd')
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium'
  })

  const navigate = useNavigate()

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      setLoading(true)
      const data = await noticesAPI.getNotices('general', 'AI&DS')
      setNotices(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching notices:', err)
      setErrorMessage('Failed to load notices')
      setTimeout(() => setErrorMessage(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  const filteredNotices = priorityFilter === 'all' 
    ? notices 
    : notices.filter(n => n.priority === priorityFilter)

  const handleAddNotice = async (e) => {
    e.preventDefault()
    if (formData.title.trim() && formData.content.trim()) {
      try {
        await noticesAPI.addNotice({
          title: formData.title,
          content: formData.content,
          priority: formData.priority,
          type: 'general',
          department: 'AI&DS'
        })
        setFormData({ title: '', content: '', priority: 'medium' })
        setShowAddForm(false)
        setSuccessMessage('Notice posted successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
        fetchNotices()
      } catch (err) {
        console.error('Error adding notice:', err)
        setErrorMessage('Failed to post notice')
        setTimeout(() => setErrorMessage(''), 3000)
      }
    }
  }

  const handleDeleteNotice = async (id) => {
    try {
      await noticesAPI.deleteNotice(id)
      setSuccessMessage('Notice deleted successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
      fetchNotices()
    } catch (err) {
      console.error('Error deleting notice:', err)
      setErrorMessage('Failed to delete notice')
      setTimeout(() => setErrorMessage(''), 3000)
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

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-900">
        <Sidebar isOpen={sidebarOpen} userRole={userRole} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white text-xl">Loading notices...</p>
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
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-white">Notice Board</h1>
              <div className="flex items-center gap-4">
                <div>
                  <label className="text-gray-300 font-semibold mr-2">Year:</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 border border-purple-400 rounded-lg text-white focus:outline-none focus:border-purple-300 transition font-semibold"
                  >
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition"
                >
                  <Plus size={20} />
                  Add Notice
                </button>
              </div>
            </div>

            {successMessage && (
              <div className="mb-6 p-4 bg-green-900 border border-green-600 rounded-lg text-green-200">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-900 border border-red-600 rounded-lg text-red-200">
                {errorMessage}
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <div>
                <label className="text-gray-300 font-semibold mr-3">Filter by Priority:</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-white focus:outline-none focus:border-purple-400 transition"
                >
                  <option value="all">All Notices</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
              <div className="text-gray-400 text-sm">
                Showing {filteredNotices.length} of {notices.length} notices
              </div>
            </div>

            {showAddForm && (
              <div className="glass-effect rounded-xl p-6 card-shadow mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">Add New Notice</h2>
                <form onSubmit={handleAddNotice} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Enter notice title"
                      className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      placeholder="Enter notice description"
                      rows="4"
                      className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-white focus:outline-none focus:border-purple-400 transition"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
                    >
                      Post Notice
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice) => (
                  <div key={notice._id} className="glass-effect rounded-xl p-6 card-shadow hover:scale-102 transition">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{notice.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(notice.priority)}`}>
                            {notice.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-4">{notice.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            {new Date(notice.createdAt).toLocaleDateString()}
                          </div>
                          <div>From: <span className="text-purple-400 font-semibold">{notice.author}</span></div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteNotice(notice._id)}
                        className="p-2 hover:bg-red-900 rounded-lg transition text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
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
