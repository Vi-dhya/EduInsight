import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import { Send, Reply, CheckCircle, Clock, AlertCircle, Trash2 } from 'lucide-react'
import { ticketsAPI } from '../services/api'

export default function FacultyTicket({ onLogout, userRole = 'faculty' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [showRaiseTicket, setShowRaiseTicket] = useState(false)
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [ticketForm, setTicketForm] = useState({
    studentRoll: '',
    studentName: '',
    title: '',
    description: '',
    priority: 'medium'
  })
  const navigate = useNavigate()

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const data = await ticketsAPI.getTickets()
      setTickets(Array.isArray(data) ? data : (data.tickets ? data.tickets : []))
    } catch (err) {
      console.error('Error fetching tickets:', err)
      setTickets([])
    } finally {
      setLoading(false)
    }
  }

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket)
    setReplyText('')
  }

  const handleSendReply = async () => {
    if (replyText.trim() && selectedTicket) {
      try {
        const message = {
          sender: 'faculty',
          name: 'Faculty',
          text: replyText
        }
        
        await ticketsAPI.addMessage(selectedTicket._id || selectedTicket.id, message)
        fetchTickets()
        setReplyText('')
        alert('Message sent successfully!')
      } catch (err) {
        console.error('Error sending reply:', err)
        alert('Failed to send message')
      }
    }
  }

  const handleResolveTicket = async () => {
    if (selectedTicket) {
      try {
        await ticketsAPI.updateTicketStatus(selectedTicket._id || selectedTicket.id, 'Resolved')
        fetchTickets()
        alert('Ticket resolved successfully!')
      } catch (err) {
        console.error('Error resolving ticket:', err)
        alert('Failed to resolve ticket')
      }
    }
  }

  const handleDeleteTicket = async (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        await ticketsAPI.deleteTicket(ticketId)
        setTickets(tickets.filter(t => (t._id || t.id) !== ticketId))
        setSelectedTicket(null)
        alert('Ticket deleted successfully!')
      } catch (err) {
        console.error('Error deleting ticket:', err)
        alert('Failed to delete ticket')
      }
    }
  }

  const handleRaiseTicket = async () => {
    if (ticketForm.studentRoll && ticketForm.studentName && ticketForm.title && ticketForm.description) {
      try {
        const newTicket = await ticketsAPI.createTicket({
          title: ticketForm.title,
          description: ticketForm.description,
          priority: ticketForm.priority,
          rollNo: ticketForm.studentRoll,
          studentName: ticketForm.studentName,
          studentEmail: `student${ticketForm.studentRoll}@university.edu`
        })
        setTickets([newTicket, ...tickets])
        setShowRaiseTicket(false)
        setTicketForm({
          studentRoll: '',
          studentName: '',
          title: '',
          description: '',
          priority: 'medium'
        })
        alert('Ticket raised successfully!')
      } catch (err) {
        console.error('Error raising ticket:', err)
        alert('Failed to raise ticket')
      }
    } else {
      alert('Please fill in all fields')
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
      <Sidebar isOpen={sidebarOpen} userRole={userRole} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <SimplifiedHeader 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-white">Student Tickets</h1>
              <button
                onClick={() => setShowRaiseTicket(true)}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition"
              >
                Raise Ticket
              </button>
            </div>

            {/* Raise Ticket Modal */}
            {showRaiseTicket && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="glass-effect rounded-xl p-8 card-shadow max-w-md w-full mx-4">
                  <h2 className="text-2xl font-bold text-white mb-6">Raise Ticket to Student</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Student Roll No</label>
                      <input
                        type="text"
                        value={ticketForm.studentRoll}
                        onChange={(e) => setTicketForm({...ticketForm, studentRoll: e.target.value})}
                        placeholder="e.g., 23102001"
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Student Name</label>
                      <input
                        type="text"
                        value={ticketForm.studentName}
                        onChange={(e) => setTicketForm({...ticketForm, studentName: e.target.value})}
                        placeholder="e.g., Atchaya"
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Ticket Title</label>
                      <input
                        type="text"
                        value={ticketForm.title}
                        onChange={(e) => setTicketForm({...ticketForm, title: e.target.value})}
                        placeholder="e.g., Exam Schedule Clarification"
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Description</label>
                      <textarea
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                        placeholder="Describe the issue or message..."
                        rows="3"
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Priority</label>
                      <select
                        value={ticketForm.priority}
                        onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-500 rounded-lg text-white focus:outline-none focus:border-purple-400 transition"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleRaiseTicket}
                        className="flex-1 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
                      >
                        Raise Ticket
                      </button>
                      <button
                        onClick={() => {
                          setShowRaiseTicket(false)
                          setTicketForm({
                            studentRoll: '',
                            studentName: '',
                            title: '',
                            description: '',
                            priority: 'medium'
                          })
                        }}
                        className="flex-1 px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
              {/* Tickets List */}
              <div className="glass-effect rounded-xl overflow-hidden card-shadow flex flex-col">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">Tickets ({tickets.length})</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {loading ? (
                    <div className="p-6 text-center text-gray-400">
                      <p>Loading tickets...</p>
                    </div>
                  ) : tickets.length === 0 ? (
                    <div className="p-6 text-center text-gray-400">
                      <AlertCircle size={32} className="mx-auto mb-2 opacity-50" />
                      <p>No tickets yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-700">
                      {tickets.map((ticket) => (
                        <div key={ticket._id || ticket.id} className="flex items-start justify-between p-4 hover:bg-gray-700 bg-opacity-50 transition group">
                          <button
                            onClick={() => handleSelectTicket(ticket)}
                            className={`flex-1 text-left transition ${
                              selectedTicket?._id === ticket._id || selectedTicket?.id === ticket.id
                                ? 'bg-purple-900 bg-opacity-50 border-l-4 border-purple-400'
                                : ''
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-white text-sm">{ticket.title}</h3>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 mb-2">{ticket.studentName} ({ticket.rollNo})</p>
                            <div className="flex items-center justify-between">
                              <span className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                                {getStatusIcon(ticket.status)}
                                {ticket.status}
                              </span>
                              <span className="text-xs text-gray-400">{ticket.createdDate ? new Date(ticket.createdDate).toLocaleDateString() : 'N/A'}</span>
                            </div>
                          </button>
                          <button
                            onClick={() => handleDeleteTicket(ticket._id || ticket.id)}
                            className="p-2 hover:bg-red-900 rounded-lg transition text-red-400 hover:text-red-300 ml-2 opacity-0 group-hover:opacity-100"
                            title="Delete ticket"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
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
                        <p className="text-sm text-purple-200 mt-1">{selectedTicket.studentName} ({selectedTicket.rollNo})</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(selectedTicket.status)}`}>
                        {getStatusIcon(selectedTicket.status)}
                        {selectedTicket.status}
                      </span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {selectedTicket.messages && selectedTicket.messages.length > 0 ? (
                      selectedTicket.messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'faculty' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs px-4 py-3 rounded-lg ${
                            msg.sender === 'faculty'
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-700 text-gray-100'
                          }`}>
                            <p className="text-sm font-semibold mb-1">{msg.name}</p>
                            <p className="text-sm">{msg.text}</p>
                            <p className="text-xs opacity-70 mt-2">{msg.date ? new Date(msg.date).toLocaleString() : 'N/A'}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-400">
                        <p>No messages yet</p>
                      </div>
                    )}
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
