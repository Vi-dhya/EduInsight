import { Menu, LogOut, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function Header({ sidebarOpen, setSidebarOpen, onLogout, year, setYear, department, setDepartment }) {
  const [showYearDropdown, setShowYearDropdown] = useState(false)
  const [showDeptDropdown, setShowDeptDropdown] = useState(false)

  const years = ['1st', '2nd', '3rd', '4th']
  const departments = ['AI&DS', 'CSE', 'IT', 'AI&ML']

  return (
    <header className="bg-gray-800 border-b border-purple-500 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-700 rounded-lg transition text-gray-300"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-2xl font-bold gradient-text">EduInsight</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Year Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowYearDropdown(!showYearDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
          >
            Year: {year}
            <ChevronDown size={18} />
          </button>
          {showYearDropdown && (
            <div className="absolute top-full right-0 mt-2 bg-gray-700 rounded-lg shadow-lg z-50">
              {years.map(y => (
                <button
                  key={y}
                  onClick={() => {
                    setYear(y)
                    setShowYearDropdown(false)
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-purple-600 text-white transition first:rounded-t-lg last:rounded-b-lg"
                >
                  {y}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Department Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDeptDropdown(!showDeptDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
          >
            Dept: {department}
            <ChevronDown size={18} />
          </button>
          {showDeptDropdown && (
            <div className="absolute top-full right-0 mt-2 bg-gray-700 rounded-lg shadow-lg z-50">
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => {
                    setDepartment(dept)
                    setShowDeptDropdown(false)
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-purple-600 text-white transition first:rounded-t-lg last:rounded-b-lg"
                >
                  {dept}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  )
}
