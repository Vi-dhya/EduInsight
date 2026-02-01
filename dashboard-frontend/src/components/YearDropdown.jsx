import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function YearDropdown({ selectedYear, onYearChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleYearSelect = (year) => {
    onYearChange(year)
    setIsOpen(false)
  }

  return (
    <div className="flex items-center gap-4">
      <label className="text-white font-semibold">Select Year:</label>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer font-semibold flex items-center gap-2 hover:from-blue-700 hover:to-purple-700 transition"
        >
          {selectedYear} Year
          <ChevronDown 
            size={18} 
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-full bg-gray-800 rounded-lg shadow-lg z-50 border border-purple-400 overflow-hidden">
            {['2nd', '3rd', '4th'].map((year) => (
              <button
                key={year}
                onClick={() => handleYearSelect(year)}
                className={`w-full text-left px-4 py-3 transition ${
                  selectedYear === year
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                }`}
              >
                {year} Year
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
