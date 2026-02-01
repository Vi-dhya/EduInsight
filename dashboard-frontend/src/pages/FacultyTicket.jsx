import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import { Send, Reply, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function FacultyTicket({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [replyText, setReplyText] = useState('')
  const navigate = useNavigate()

  const [tickets, setTickets] = useState([
    {
      id: 1,
      studentName: 'Raj Kumar',
      studentRoll: '23102060',
      title: 'Exam Schedule Clarification',
      description: 'Need clarification on the exam schedule for semester 2',
      priority: 'high',
      status: 'Replied',
      createdDate: '2024-01-28',
      messages: [
        { sender: 'student', name: 'Raj Kumar', text: 'Need clarification on the exam schedule for semester 2', date: '2024-01-28 10:30 AM' },
        { sender: 'faculty', name: 'Dr. Smith', text: 'The exam schedule has been updated. Please check the notice board for details.', date: '2024-01-29 2:15 PM' }
      ]
    },
    {
      id: 2,
      studentName: 'Priya Singh',
      studentRoll: '23102061',
      title: 'Certificate Upload Issue',
      description: 'Unable to upload certificate file, getting error',
      priority: 'medium',
      status: 'Pending',
      createdDate: '2024-01-30',
      messages: [
        { sender: 'student', name: 'Priya Singh', text: 'Unable to upload certificate file, getting error', date: '2024-01-30 11:00 AM' }
      ]
    },
    {
      id: 3,
      studentName: 'Amit Patel',
      studentRoll: '23102062',
      title: 'Marks Not Updated',
      description: 'My marks for internal 1 are not showing in the system',
      priority: 'high',
      status: 'Resolved',
      createdDate: '2024-01-25',
      messages: [
        { sender: 'student', name: 'Amit Patel', text: 'My marks for internal 1 are not showing in the system', date: '2024-01-25 9:00 AM' },
        { sender: 'faculty', name: 'Dr. Smith', text: 'I have updated your marks. Please refresh the page to see the changes.', date: '2024-01-27 3:30 PM' }
      ]
    },
    {
      id: 4,
      studentName: 'Neha Sharma',
      studentRoll: '23102063',
      title: 'Internship Duration Query',
      description: 'Can I extend my internship duration?',
      priority: 'low',
      status: 'Pending',
      createdDate: '2024-01-31',
      messages: [
        { sender: 'student', name: 'Neha Sharma', text: 'Can I extend my internship duration?', date: '2024-01-31 1:45 PM' }
      ]
    }
  ])

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket)
    setReplyText('')
  }

  const handleSendReply = () => {
    if (replyText.trim() && selectedTicket) {
      const updatedTickets = tickets.map(t => {
        if (t.id === selectedTicket.id) {
          const newMessage = {
            sender: 'faculty',
            name: 'Dr. Smith',
            text: replyText,
            date: new Date().toLocaleString()
          }
          return {
            ...t,
            messages: [...t.messages, newMessage],
            status: 'Replied'
          }
        }
        return t
      })
      setTickets(updatedTickets)
      setSelectedTicket(updatedTickets.find(t => t.id === selectedTicket.id))
      setReplyText('')
    }
  }

  const handleResolveTicket = () => {
    if (selectedTicket) {
      const updatedTickets = tickets.map(t => {
        if (t.id === selectedTicket.id) {
          return { ...t, status: 'Resolved' }
        }
        return t
      })
      setTickets(updatedTickets)
      setSelectedTicket(updatedTickets.find(t => t.id === selectedTicket.id))
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

  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved':
        return 'bg-green-900 text-green-200'
      case 'Replied':
        return 'bg-blue-900 text-blue-200'
      case 'Pending':
        return 'bg-yellow-900 text-yellow-200'
      default:
        return 'bg-gray-700 text-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Resolved':
        return <CheckCircle size={18} className="text-green-400" />
      case 'Replied':
        return <CheckCircle size={18} className="text-blue-400" />
      case 'Pending':
        return <Clock size={18} className="text-yellow-400" />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar isOpen={sidebarOpen} userRole="faculty" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <SimplifiedHeader 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8">Student Tickets</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
              {/* Tickets List */}
              <div className="glass-effect rounded-xl overflow-hidden card-shadow flex flex-col">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">Tickets ({tickets.length})</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {tickets.length === 0 ? (
                    <div className="p-6 text-center text-gray-400">
                      <AlertCircle size={32} className="mx-auto mb-2 opacity-50" />
                      <p>No tickets yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-700">
                      {tickets.map((ticket) => (
                        <button
                          key={ticket.id}
                          onClick={() => handleSelectTicket(ticket)}
                          className={`w-full text-left p-4 transition ${
                            selectedTicket?.id === ticket.id
                              ? 'bg-purple-900 bg-opacity-50 border-l-4 border-purple-400'
                              : 'hover:bg-gray-700 bg-opacity-50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-white text-sm">{ticket.title}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mb-2">{ticket.studentName} ({ticket.studentRoll})</p>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                              {getStatusIcon(ticket.status)}
                              {ticket.status}
                            </span>
                            <span className="text-xs text-gray-400">{ticket.createdDate}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Ticket Details and Chat */}
              {selectedTicket ? (
                <div className="lg:col-span-2 glass-effect rounded-xl overflow-hidden card-shadow flex flex-col">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-white">{selectedTicket.title}</h2>
                        <p className="text-sm text-purple-200 mt-1">{selectedTicket.studentName} ({selectedTicket.studentRoll})</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(selectedTicket.status)}`}>
                        {getStatusIcon(selectedTicket.status)}
                        {selectedTicket.status}
                      </span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {selectedTicket.messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === 'faculty' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-3 rounded-lg ${
                          msg.sender === 'faculty'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700 text-gray-100'
                        }`}>
                          <p className="text-sm font-semibold mb-1">{msg.name}</p>
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs opacity-70 mt-2">{msg.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Section */}
                  {selectedTicket.status !== 'Resolved' && (
                    <div className="border-t border-gray-700 p-6 space-y-4">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply here..."
                        rows="3"
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition resize-none"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={handleSendReply}
                          disabled={!replyText.trim()}
                          className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                        >
                          <Send size={18} />
                          Send Reply
                        </button>
                        <button
                          onClick={handleResolveTicket}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
                        >
                          Resolve
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedTicket.status === 'Resolved' && (
                    <div className="border-t border-gray-700 p-6 text-center">
                      <CheckCircle size={32} className="mx-auto text-green-400 mb-2" />
                      <p className="text-gray-300">This ticket has been resolved</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="lg:col-span-2 glass-effect rounded-xl overflow-hidden card-shadow flex items-center justify-center">
                  <div className="text-center">
                    <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-300 text-lg">Select a ticket to view details</p>
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
