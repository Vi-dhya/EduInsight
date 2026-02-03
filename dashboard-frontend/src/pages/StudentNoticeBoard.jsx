import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import { Calendar, AlertCircle, Trash2 } from 'lucide-react'
import { noticesAPI } from '../services/api'

export default function StudentNoticeBoard({ onLogout, userRole = 'student' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      setLoading(true)
      const data = await noticesAPI.getNotices('general', 'AI&DS')
      console.log('Fetched notices:', data)
      setNotices(Array.isArray(data) ? data : (data.notices ? data.notices : []))
    } catch (err) {
      console.error('Error fetching notices:', err)
      setNotices([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteNotice = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await noticesAPI.deleteNotice(id)
        setNotices(notices.filter(n => n._id !== id))
        alert('Notice deleted successfully!')
      } catch (err) {
        console.error('Error deleting notice:', err)
        alert('Failed to delete notice')
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
            <h1 className="text-4xl font-bold text-white mb-8">Notice Board</h1>

            {/* Faculty Notices Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Notices from Faculty</h2>
              {notices.length > 0 ? (
                <div className="space-y-4">
                  {notices.map((notice) => (
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
                          className="p-2 hover:bg-red-900 rounded-lg transition text-red-400 hover:text-red-300 ml-4"
                          title="Delete notice"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-effect rounded-xl p-6 card-shadow text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <AlertCircle size={48} className="text-gray-400" />
                    <p className="text-gray-300 text-lg">No notice available yet</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
