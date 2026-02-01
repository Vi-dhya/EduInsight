import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import { Upload, Eye, Trash2, Plus } from 'lucide-react'

export default function StudentDepartment({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('certificates')
  const [showCertForm, setShowCertForm] = useState(false)
  const [showInternForm, setShowInternForm] = useState(false)
  const navigate = useNavigate()

  const [certificates, setCertificates] = useState([
    {
      id: 1,
      name: 'AWS Certified Solutions Architect',
      uploadDate: '2024-01-15',
      status: 'Accepted',
      remarks: 'Excellent certification',
      file: 'aws_cert.pdf'
    },
    {
      id: 2,
      name: 'Google Cloud Professional',
      uploadDate: '2024-01-10',
      status: 'Pending',
      remarks: '',
      file: 'gcp_cert.pdf'
    }
  ])

  const [internships, setInternships] = useState([
    {
      id: 1,
      companyName: 'Tech Corp',
      duration: '2 months',
      uploadDate: '2024-01-20',
      status: 'Accepted',
      remarks: 'Great work',
      file: 'internship_letter.pdf'
    }
  ])

  const [certForm, setCertForm] = useState({ name: '', file: null })
  const [internForm, setInternForm] = useState({ companyName: '', duration: '', file: null })

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  const handleAddCertificate = (e) => {
    e.preventDefault()
    if (certForm.name && certForm.file) {
      setCertificates([...certificates, {
        id: certificates.length + 1,
        name: certForm.name,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'Pending',
        remarks: '',
        file: certForm.file.name
      }])
      setCertForm({ name: '', file: null })
      setShowCertForm(false)
    }
  }

  const handleAddInternship = (e) => {
    e.preventDefault()
    if (internForm.companyName && internForm.duration && internForm.file) {
      setInternships([...internships, {
        id: internships.length + 1,
        companyName: internForm.companyName,
        duration: internForm.duration,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'Pending',
        remarks: '',
        file: internForm.file.name
      }])
      setInternForm({ companyName: '', duration: '', file: null })
      setShowInternForm(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar isOpen={sidebarOpen} userRole="student" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <SimplifiedHeader 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8">Department Details</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-purple-500">
              <button
                onClick={() => setActiveTab('certificates')}
                className={`px-6 py-3 font-semibold transition ${
                  activeTab === 'certificates'
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                Certificates
              </button>
              <button
                onClick={() => setActiveTab('internships')}
                className={`px-6 py-3 font-semibold transition $