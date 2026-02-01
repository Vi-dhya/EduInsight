import { BookOpen, FileText, Bell, Home, Ticket } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Sidebar({ isOpen, userRole = 'student' }) {
  const navigate = useNavigate()
  const location = useLocation()

  const studentMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/student-dashboard' },
    { icon: BookOpen, label: 'Student Details', path: '/student-department-details' },
    { icon: FileText, label: 'Exam Details', path: '/student-exam-details' },
    { icon: Ticket, label: 'Ticket', path: '/student-ticket' },
    { icon: Bell, label: 'Notice Board', path: '/student-notice-board' },
  ]

  const facultyMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/faculty-dashboard' },
    { icon: BookOpen, label: 'Department Details', path: '/department-details' },
    { icon: FileText, label: 'Exam Details', path: '/exam-details' },
    { icon: Ticket, label: 'Ticket', path: '/faculty-ticket' },
    { icon: Bell, label: 'Notice Board', path: '/notice-board' },
  ]

  const menuItems = userRole === 'faculty' ? facultyMenuItems : studentMenuItems

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-gray-800 border-r border-purple-500 transition-all duration-300 flex flex-col`}>
      {/* EduInsight Branding */}
      <div className="w-full px-6 py-4 border-b border-purple-500 flex items-center justify-center h-20">
        <div className="text-center">
          <h1 className={`font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent transition-all duration-300 ${
            isOpen ? 'text-2xl' : 'text-lg'
          }`}>
            {isOpen ? 'EduInsight' : 'EI'}
          </h1>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon size={24} />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
