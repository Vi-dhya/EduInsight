import { Menu, LogOut, Bell, Settings, User, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SimplifiedHeader({ sidebarOpen, setSidebarOpen, onLogout }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const navigate = useNavigate()
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com'
  const userRole = localStorage.getItem('userRole') || 'student'

  const handleSettings = () => {
    navigate('/settings')
  }

  const handleNotifications = () => {
    const noticeRoute = userRole === 'faculty' ? '/notice-board' : '/student-notice-board'
    navigate(noticeRoute)
  }

  const handleProfile = () => {
    alert('My Profile - Coming Soon')
    setShowProfileDropdown(false)
  }

  const handleLogoutClick = () => {
    setShowProfileDropdown(false)
    onLogout()
  }

  return (
    <header className="bg-gray-800 border-b border-purple-500 px-6 py-4 flex items-center justify-between h-20">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-700 rounded-lg transition text-gray-300"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button
          onClick={handleNotifications}
          className="relative p-2 hover:bg-gray-700 rounded-lg transition text-gray-300"
        >
          <Bell size={24} />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        {/* Settings */}
        <button
          onClick={handleSettings}
          className="p-2 hover:bg-gray-700 rounded-lg transition text-gray-300"
        >
          <Settings size={24} />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-lg transition text-gray-300"
          >
            <User size={24} />
            <ChevronDown size={18} />
          </button>

          {showProfileDropdown && (
            <div className="absolute top-full right-0 mt-2 bg-gray-700 rounded-lg shadow-lg z-50 w-48">
              <div className="px-4 py-3 border-b border-gray-600">
                <p className="text-white font-semibold text-sm">{userEmail}</p>
              </div>
              <button
                onClick={handleProfile}
                className="block w-full text-left px-4 py-2 hover:bg-purple-600 text-white transition"
              >
                My Profile
              </button>
              <button
                onClick={handleLogoutClick}
                className="block w-full text-left px-4 py-2 hover:bg-red-600 text-white transition rounded-b-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
