import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import YearDropdown from '../components/YearDropdown'
import { Download, Eye, Check, X } from 'lucide-react'

export default function DepartmentDetails({ onLogout, userRole = 'faculty' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedYear, setSelectedYear] = useState('2nd')
  const [activeTab, setActiveTab] = useState('students')
  const [downloadingCerts, setDownloadingCerts] = useState(false)
  const [downloadingInterns, setDownloadingInterns] = useState(false)
  const [downloadingMarks, setDownloadingMarks] = useState(false)
  const [certifications, setCertifications] = useState([])
  const [internships, setInternships] = useState([])
  const [loadingCerts, setLoadingCerts] = useState(false)
  const [loadingInterns, setLoadingInterns] = useState(false)
  const [approvingCert, setApprovingCert] = useState(null)
  const [rejectingCert, setRejectingCert] = useState(null)
  const [approvingIntern, setApprovingIntern] = useState(null)
  const [rejectingIntern, setRejectingIntern] = useState(null)
  const [sendingToParent, setSendingToParent] = useState(null)
  const [selectedMarksYear, setSelectedMarksYear] = useState('2nd')
  const [selectedSubject, setSelectedSubject] = useState('Digital Marketing')
  const [marks, setMarks] = useState([])
  const [loadingMarks, setLoadingMarks] = useState(false)
  const navigate = useNavigate()

  const subjects = [
    'Digital Marketing',
    'Web Technology',
    'Software Testing',
    'Business Analytics',
    'Information Security',
    'Management',
    'Deep Learning'
  ]

  // Fetch certifications and internships when year changes
  useEffect(() => {
    fetchCertifications()
    fetchInternships()
  }, [selectedYear])

  // Fetch marks when year or subject changes
  useEffect(() => {
    if (activeTab === 'marks') {
      fetchMarks()
    }
  }, [selectedMarksYear, selectedSubject, activeTab])

  const [allStudents, setAllStudents] = useState({})

  // Fetch students from backend
  useEffect(() => {
    fetchAllStudents()
  }, [])

  const fetchAllStudents = async () => {
    try {
      const response = await fetch(`http://localhost:5007/api/department/students`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        const students = data.students || []
        // Group by year
        const grouped = { '2nd': [], '3rd': [], '4th': [] }
        students.forEach(s => {
          if (grouped[s.year]) {
            grouped[s.year].push(s)
          }
        })
        setAllStudents(grouped)
      }
    } catch (err) {
      console.error('Error fetching students:', err)
      setAllStudents(getHardcodedStudents())
    }
  }

  const getHardcodedStudents = () => {
    return {
    '2nd': [
      {
        rollNo: '23102001',
        name: 'Atchaya',
        dob: '12-03-2004',
        bloodGroup: 'O+',
        fatherName: 'Murugan',
        motherName: 'Kavitha',
        email: 'student23102001@college.edu',
        phone: '9876500001',
        year: '2nd',
        department: 'AI&DS',
        address: '12, Gandhi Street, Chennai'
      },
      {
        rollNo: '23102002',
        name: 'Ragul',
        dob: '25-07-2004',
        bloodGroup: 'B+',
        fatherName: 'Rajesh',
        motherName: 'Lakshmi',
        email: 'student23102002@college.edu',
        phone: '9876500002',
        year: '2nd',
        department: 'AI&DS',
        address: '45, Anna Nagar, Trichy'
      },
      {
        rollNo: '23102003',
        name: 'Rifath',
        dob: '09-11-2004',
        bloodGroup: 'A+',
        fatherName: 'Ibrahim',
        motherName: 'Ayesha',
        email: 'student23102003@college.edu',
        phone: '9876500003',
        year: '2nd',
        department: 'AI&DS',
        address: '78, Beach Road, Puducherry'
      },
      {
        rollNo: '23102004',
        name: 'Faouzia',
        dob: '18-02-2004',
        bloodGroup: 'AB+',
        fatherName: 'Farook',
        motherName: 'Noorjahan',
        email: 'student23102004@college.edu',
        phone: '9876500004',
        year: '2nd',
        department: 'AI&DS',
        address: '33, Market Street, Coimbatore'
      },
      {
        rollNo: '23102005',
        name: 'Sasidharan',
        dob: '30-06-2004',
        bloodGroup: 'O−',
        fatherName: 'Shankar',
        motherName: 'Meenakshi',
        email: 'student23102005@college.edu',
        phone: '9876500005',
        year: '2nd',
        department: 'AI&DS',
        address: '21, Temple Road, Madurai'
      },
      {
        rollNo: '23102006',
        name: 'Shree Prajan',
        dob: '14-09-2004',
        bloodGroup: 'B−',
        fatherName: 'Prakash',
        motherName: 'Saranya',
        email: 'student23102006@college.edu',
        phone: '9876500006',
        year: '2nd',
        department: 'AI&DS',
        address: '67, Lake View, Salem'
      },
      {
        rollNo: '23102007',
        name: 'Saran',
        dob: '05-01-2004',
        bloodGroup: 'A−',
        fatherName: 'Karthik',
        motherName: 'Deepa',
        email: 'student23102007@college.edu',
        phone: '9876500007',
        year: '2nd',
        department: 'AI&DS',
        address: '90, Bus Stand Road, Erode'
      },
      {
        rollNo: '23102008',
        name: 'Sowmiya',
        dob: '22-08-2004',
        bloodGroup: 'O+',
        fatherName: 'Ramesh',
        motherName: 'Vasanthi',
        email: 'student23102008@college.edu',
        phone: '9876500008',
        year: '2nd',
        department: 'AI&DS',
        address: '15, Park Street, Thanjavur'
      },
      {
        rollNo: '23102009',
        name: 'Pria Nandhini',
        dob: '11-04-2004',
        bloodGroup: 'AB−',
        fatherName: 'Nandha Kumar',
        motherName: 'Rajalakshmi',
        email: 'student23102009@college.edu',
        phone: '9876500009',
        year: '2nd',
        department: 'AI&DS',
        address: '56, Railway Colony, Vellore'
      },
      {
        rollNo: '23102010',
        name: 'Vimalesh',
        dob: '27-12-2004',
        bloodGroup: 'B+',
        fatherName: 'Manikandan',
        motherName: 'Sudha',
        email: 'student23102010@college.edu',
        phone: '9876500010',
        year: '2nd',
        department: 'AI&DS',
        address: '24, Hill View Road, Ooty'
      }
    ],
    '3rd': [
      {
        rollNo: '22103001',
        name: 'Arun Kumar',
        dob: '15-05-2003',
        bloodGroup: 'O+',
        fatherName: 'Kumar',
        motherName: 'Priya',
        email: 'student22103001@college.edu',
        phone: '9876500011',
        year: '3rd',
        department: 'AI&DS',
        address: '10, Main Road, Bangalore'
      },
      {
        rollNo: '22103002',
        name: 'Divya',
        dob: '20-08-2003',
        bloodGroup: 'B+',
        fatherName: 'Ravi',
        motherName: 'Anjali',
        email: 'student22103002@college.edu',
        phone: '9876500012',
        year: '3rd',
        department: 'AI&DS',
        address: '25, Park Avenue, Hyderabad'
      },
      {
        rollNo: '22103003',
        name: 'Vikram',
        dob: '10-03-2003',
        bloodGroup: 'A+',
        fatherName: 'Vikram Sr',
        motherName: 'Meera',
        email: 'student22103003@college.edu',
        phone: '9876500013',
        year: '3rd',
        department: 'AI&DS',
        address: '40, Tech Park, Pune'
      },
      {
        rollNo: '22103004',
        name: 'Neha',
        dob: '25-11-2003',
        bloodGroup: 'AB+',
        fatherName: 'Rajesh',
        motherName: 'Sunita',
        email: 'student22103004@college.edu',
        phone: '9876500014',
        year: '3rd',
        department: 'AI&DS',
        address: '55, Garden Street, Delhi'
      },
      {
        rollNo: '22103005',
        name: 'Arjun',
        dob: '08-07-2003',
        bloodGroup: 'O−',
        fatherName: 'Arjun Sr',
        motherName: 'Lakshmi',
        email: 'student22103005@college.edu',
        phone: '9876500015',
        year: '3rd',
        department: 'AI&DS',
        address: '70, Riverside, Mumbai'
      },
      {
        rollNo: '22103006',
        name: 'Pooja',
        dob: '12-02-2003',
        bloodGroup: 'B−',
        fatherName: 'Prabhu',
        motherName: 'Kavya',
        email: 'student22103006@college.edu',
        phone: '9876500016',
        year: '3rd',
        department: 'AI&DS',
        address: '85, Sunset Road, Goa'
      },
      {
        rollNo: '22103007',
        name: 'Rohan',
        dob: '30-09-2003',
        bloodGroup: 'A−',
        fatherName: 'Rohan Sr',
        motherName: 'Deepika',
        email: 'student22103007@college.edu',
        phone: '9876500017',
        year: '3rd',
        department: 'AI&DS',
        address: '20, Hill Station, Shimla'
      },
      {
        rollNo: '22103008',
        name: 'Sneha',
        dob: '18-04-2003',
        bloodGroup: 'O+',
        fatherName: 'Sneha Sr',
        motherName: 'Rani',
        email: 'student22103008@college.edu',
        phone: '9876500018',
        year: '3rd',
        department: 'AI&DS',
        address: '35, Valley Road, Jaipur'
      },
      {
        rollNo: '22103009',
        name: 'Harsh',
        dob: '22-06-2003',
        bloodGroup: 'AB−',
        fatherName: 'Harsh Sr',
        motherName: 'Neha',
        email: 'student22103009@college.edu',
        phone: '9876500019',
        year: '3rd',
        department: 'AI&DS',
        address: '50, Beach Lane, Kochi'
      },
      {
        rollNo: '22103010',
        name: 'Isha',
        dob: '14-01-2003',
        bloodGroup: 'B+',
        fatherName: 'Isha Sr',
        motherName: 'Priya',
        email: 'student22103010@college.edu',
        phone: '9876500020',
        year: '3rd',
        department: 'AI&DS',
        address: '65, Mountain View, Darjeeling'
      }
    ],
    '4th': [
      {
        rollNo: '21104001',
        name: 'Akshay',
        dob: '10-12-2002',
        bloodGroup: 'O+',
        fatherName: 'Akshay Sr',
        motherName: 'Anjali',
        email: 'student21104001@college.edu',
        phone: '9876500021',
        year: '4th',
        department: 'AI&DS',
        address: '15, Tech Street, Bangalore'
      },
      {
        rollNo: '21104002',
        name: 'Priya',
        dob: '05-08-2002',
        bloodGroup: 'B+',
        fatherName: 'Priya Sr',
        motherName: 'Kavya',
        email: 'student21104002@college.edu',
        phone: '9876500022',
        year: '4th',
        department: 'AI&DS',
        address: '30, Innovation Hub, Hyderabad'
      },
      {
        rollNo: '21104003',
        name: 'Nikhil',
        dob: '20-03-2002',
        bloodGroup: 'A+',
        fatherName: 'Nikhil Sr',
        motherName: 'Sunita',
        email: 'student21104003@college.edu',
        phone: '9876500023',
        year: '4th',
        department: 'AI&DS',
        address: '45, Silicon Valley, Pune'
      },
      {
        rollNo: '21104004',
        name: 'Ananya',
        dob: '15-07-2002',
        bloodGroup: 'AB+',
        fatherName: 'Ananya Sr',
        motherName: 'Meera',
        email: 'student21104004@college.edu',
        phone: '9876500024',
        year: '4th',
        department: 'AI&DS',
        address: '60, Tech Park, Delhi'
      },
      {
        rollNo: '21104005',
        name: 'Siddharth',
        dob: '28-11-2002',
        bloodGroup: 'O−',
        fatherName: 'Siddharth Sr',
        motherName: 'Lakshmi',
        email: 'student21104005@college.edu',
        phone: '9876500025',
        year: '4th',
        department: 'AI&DS',
        address: '75, Innovation Lane, Mumbai'
      },
      {
        rollNo: '21104006',
        name: 'Ritika',
        dob: '09-05-2002',
        bloodGroup: 'B−',
        fatherName: 'Ritika Sr',
        motherName: 'Priya',
        email: 'student21104006@college.edu',
        phone: '9876500026',
        year: '4th',
        department: 'AI&DS',
        address: '20, Tech Avenue, Goa'
      },
      {
        rollNo: '21104007',
        name: 'Varun',
        dob: '17-02-2002',
        bloodGroup: 'A−',
        fatherName: 'Varun Sr',
        motherName: 'Deepika',
        email: 'student21104007@college.edu',
        phone: '9876500027',
        year: '4th',
        department: 'AI&DS',
        address: '35, Mountain Road, Shimla'
      },
      {
        rollNo: '21104008',
        name: 'Shreya',
        dob: '23-09-2002',
        bloodGroup: 'O+',
        fatherName: 'Shreya Sr',
        motherName: 'Rani',
        email: 'student21104008@college.edu',
        phone: '9876500028',
        year: '4th',
        department: 'AI&DS',
        address: '50, Valley Street, Jaipur'
      },
      {
        rollNo: '21104009',
        name: 'Aryan',
        dob: '11-06-2002',
        bloodGroup: 'AB−',
        fatherName: 'Aryan Sr',
        motherName: 'Neha',
        email: 'student21104009@college.edu',
        phone: '9876500029',
        year: '4th',
        department: 'AI&DS',
        address: '65, Beach Road, Kochi'
      },
      {
        rollNo: '21104010',
        name: 'Zara',
        dob: '03-04-2002',
        bloodGroup: 'B+',
        fatherName: 'Zara Sr',
        motherName: 'Priya',
        email: 'student21104010@college.edu',
        phone: '9876500030',
        year: '4th',
        department: 'AI&DS',
        address: '80, Hilltop Lane, Darjeeling'
      }
    ]
  }
  }

  const studentsData = allStudents[selectedYear] || []

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  const fetchCertifications = async () => {
    try {
      setLoadingCerts(true)
      const response = await fetch(`http://localhost:5007/api/department/certifications?year=${selectedYear}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setCertifications(Array.isArray(data) ? data : [])
      }
    } catch (err) {
      console.error('Error fetching certifications:', err)
      setCertifications([])
    } finally {
      setLoadingCerts(false)
    }
  }

  const fetchInternships = async () => {
    try {
      setLoadingInterns(true)
      const response = await fetch(`http://localhost:5007/api/department/internships?year=${selectedYear}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setInternships(Array.isArray(data) ? data : [])
      }
    } catch (err) {
      console.error('Error fetching internships:', err)
      setInternships([])
    } finally {
      setLoadingInterns(false)
    }
  }

  const fetchMarks = async () => {
    try {
      setLoadingMarks(true)
      const response = await fetch(`http://localhost:5007/api/department/marks?year=${selectedMarksYear}&course=${selectedSubject}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setMarks(Array.isArray(data) ? data : [])
      }
    } catch (err) {
      console.error('Error fetching marks:', err)
      setMarks([])
    } finally {
      setLoadingMarks(false)
    }
  }

  const handleDownloadCertificatesZip = async () => {
    try {
      setDownloadingCerts(true)
      const response = await fetch(`http://localhost:5007/api/department/certifications/download-zip?year=${selectedYear}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `certificates_${selectedYear}_year.zip`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert('Failed to download certificates')
      }
    } catch (err) {
      console.error('Error downloading certificates:', err)
      alert('Error downloading certificates: ' + err.message)
    } finally {
      setDownloadingCerts(false)
    }
  }

  const handleDownloadInternshipsZip = async () => {
    try {
      setDownloadingInterns(true)
      const response = await fetch(`http://localhost:5007/api/department/internships/download-zip?year=${selectedYear}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `internships_${selectedYear}_year.zip`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert('Failed to download internships')
      }
    } catch (err) {
      console.error('Error downloading internships:', err)
      alert('Error downloading internships: ' + err.message)
    } finally {
      setDownloadingInterns(false)
    }
  }

  const handleDownloadMarksZip = async () => {
    try {
      setDownloadingMarks(true)
      const response = await fetch(`http://localhost:5007/api/department/marks/download-zip?year=${selectedYear}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `marks_${selectedYear}_year.zip`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert('Failed to download marks')
      }
    } catch (err) {
      console.error('Error downloading marks:', err)
      alert('Error downloading marks: ' + err.message)
    } finally {
      setDownloadingMarks(false)
    }
  }

  const handleApproveCertificate = async (certId) => {
    try {
      setApprovingCert(certId)
      const response = await fetch(`http://localhost:5007/api/department/certifications/${certId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Accepted' })
      })

      if (response.ok) {
        alert('Certificate approved successfully!')
        fetchCertifications()
      } else {
        alert('Failed to approve certificate')
      }
    } catch (err) {
      console.error('Error approving certificate:', err)
      alert('Error approving certificate: ' + err.message)
    } finally {
      setApprovingCert(null)
    }
  }

  const handleRejectCertificate = async (certId) => {
    try {
      setRejectingCert(certId)
      const response = await fetch(`http://localhost:5007/api/department/certifications/${certId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Rejected' })
      })

      if (response.ok) {
        alert('Certificate rejected successfully!')
        fetchCertifications()
      } else {
        alert('Failed to reject certificate')
      }
    } catch (err) {
      console.error('Error rejecting certificate:', err)
      alert('Error rejecting certificate: ' + err.message)
    } finally {
      setRejectingCert(null)
    }
  }

  const handleApproveInternship = async (internId) => {
    try {
      setApprovingIntern(internId)
      const response = await fetch(`http://localhost:5007/api/department/internships/${internId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Accepted' })
      })

      if (response.ok) {
        alert('Internship approved successfully!')
        fetchInternships()
      } else {
        alert('Failed to approve internship')
      }
    } catch (err) {
      console.error('Error approving internship:', err)
      alert('Error approving internship: ' + err.message)
    } finally {
      setApprovingIntern(null)
    }
  }

  const handleRejectInternship = async (internId) => {
    try {
      setRejectingIntern(internId)
      const response = await fetch(`http://localhost:5007/api/department/internships/${internId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'Rejected' })
      })

      if (response.ok) {
        alert('Internship rejected successfully!')
        fetchInternships()
      } else {
        alert('Failed to reject internship')
      }
    } catch (err) {
      console.error('Error rejecting internship:', err)
      alert('Error rejecting internship: ' + err.message)
    } finally {
      setRejectingIntern(null)
    }
  }

  const handleSendToParent = async (internId, studentName, studentEmail) => {
    try {
      setSendingToParent(internId)
      const response = await fetch(`http://localhost:5007/api/department/internships/${internId}/send-to-parent`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          studentName,
          studentEmail,
          message: `Your internship/leave request has been processed by the faculty.`
        })
      })

      if (response.ok) {
        alert('Message sent to parent successfully!')
        fetchInternships()
      } else {
        alert('Failed to send message to parent')
      }
    } catch (err) {
      console.error('Error sending to parent:', err)
      alert('Error sending to parent: ' + err.message)
    } finally {
      setSendingToParent(null)
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
              <h1 className="text-4xl font-bold text-white">Department Details</h1>
              <YearDropdown selectedYear={selectedYear} onYearChange={setSelectedYear} />
            </div>

            <div className="flex gap-4 mb-8 border-b border-purple-500">
              {['students', 'certifications', 'internships', 'marks'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-semibold transition ${
                    activeTab === tab
                      ? 'text-purple-400 border-b-2 border-purple-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab === 'students' && 'Student Details'}
                  {tab === 'certifications' && 'Certifications'}
                  {tab === 'internships' && 'Internships'}
                  {tab === 'marks' && 'Marks'}
                </button>
              ))}
            </div>

            {/* Student Details Tab */}
            {activeTab === 'students' && (
              <div>
                <div className="mb-4 text-gray-300">
                  <p>Showing {Math.min(10, studentsData.length)} of {studentsData.length} students</p>
                </div>
                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Roll No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Date of Birth</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Blood Group</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Father Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Mother Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Email</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Phone</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentsData.slice(0, 10).map((student, idx) => (
                          <tr key={student.rollNo} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                            <td className="px-4 py-3 text-white font-medium">{student.rollNo}</td>
                            <td className="px-4 py-3 text-white font-medium">{student.name}</td>
                            <td className="px-4 py-3 text-gray-300">{student.dob}</td>
                            <td className="px-4 py-3 text-gray-300">{student.bloodGroup}</td>
                            <td className="px-4 py-3 text-gray-300">{student.fatherName}</td>
                            <td className="px-4 py-3 text-gray-300">{student.motherName}</td>
                            <td className="px-4 py-3 text-gray-300 text-sm">{student.email}</td>
                            <td className="px-4 py-3 text-gray-300">{student.phone}</td>
                            <td className="px-4 py-3 text-gray-300 text-sm">{student.address}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Certifications Tab */}
            {activeTab === 'certifications' && (
              <div>
                <div className="mb-6 flex justify-end">
                  {userRole === 'hod' ? (
                    <div className="relative group">
                      <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold flex items-center gap-2 transition">
                        <Download size={20} />
                        Download
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                        <button
                          onClick={handleDownloadCertificatesZip}
                          disabled={downloadingCerts}
                          className="w-full text-left px-4 py-2 text-white hover:bg-purple-600 transition disabled:opacity-50"
                        >
                          {downloadingCerts ? 'Downloading...' : 'Download as ZIP'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleDownloadCertificatesZip}
                      disabled={downloadingCerts}
                      className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold flex items-center gap-2 transition disabled:opacity-50"
                    >
                      <Download size={20} />
                      {downloadingCerts ? 'Downloading...' : 'Download as ZIP'}
                    </button>
                  )}
                </div>
                <div className="mb-4 text-gray-300">
                  <p>Showing {certifications.length} certificates</p>
                </div>
                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Roll No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Certificate</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Protocol</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Credits</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">View</th>
                          {userRole === 'faculty' && <th className="px-4 py-3 text-left text-white font-semibold">Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {loadingCerts ? (
                          <tr className="border-t border-gray-700 bg-gray-800">
                            <td colSpan="8" className="px-4 py-3 text-center text-gray-300">Loading...</td>
                          </tr>
                        ) : certifications.length > 0 ? (
                          certifications.map((cert, idx) => (
                            <tr key={cert._id} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                              <td className="px-4 py-3 text-white font-medium">{cert.rollNo}</td>
                              <td className="px-4 py-3 text-white font-medium">{cert.name}</td>
                              <td className="px-4 py-3 text-gray-300">{cert.cert}</td>
                              <td className="px-4 py-3 text-gray-300">{cert.protocol}</td>
                              <td className="px-4 py-3 text-gray-300">{cert.credits}</td>
                              <td className="px-4 py-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  cert.status === 'Accepted' ? 'bg-green-900 text-green-200' :
                                  cert.status === 'Rejected' ? 'bg-red-900 text-red-200' :
                                  'bg-yellow-900 text-yellow-200'
                                }`}>
                                  {cert.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                {cert.certificateFile ? (
                                  <a
                                    href={`http://localhost:5007${cert.certificateFile}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 transition"
                                    title="View certificate"
                                  >
                                    <Eye size={18} />
                                  </a>
                                ) : (
                                  <span className="text-gray-500">-</span>
                                )}
                              </td>
                              {userRole === 'faculty' && (
                                <td className="px-4 py-3 flex gap-2">
                                  <button
                                    onClick={() => handleApproveCertificate(cert._id)}
                                    disabled={approvingCert === cert._id || cert.status === 'Accepted'}
                                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold flex items-center gap-1 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Approve certificate"
                                  >
                                    <Check size={16} />
                                    {approvingCert === cert._id ? 'Approving...' : 'Approve'}
                                  </button>
                                  <button
                                    onClick={() => handleRejectCertificate(cert._id)}
                                    disabled={rejectingCert === cert._id || cert.status === 'Rejected'}
                                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-semibold flex items-center gap-1 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Reject certificate"
                                  >
                                    <X size={16} />
                                    {rejectingCert === cert._id ? 'Rejecting...' : 'Reject'}
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))
                        ) : (
                          <tr className="border-t border-gray-700 bg-gray-800">
                            <td colSpan="8" className="px-4 py-3 text-center text-gray-300">No certificates uploaded yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Internships Tab */}
            {activeTab === 'internships' && (
              <div>
                <div className="mb-6 flex justify-end">
                  {userRole === 'hod' ? (
                    <div className="relative group">
                      <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold flex items-center gap-2 transition">
                        <Download size={20} />
                        Download
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-50">
                        <button
                          onClick={handleDownloadInternshipsZip}
                          disabled={downloadingInterns}
                          className="w-full text-left px-4 py-2 text-white hover:bg-purple-600 transition disabled:opacity-50"
                        >
                          {downloadingInterns ? 'Downloading...' : 'Download as ZIP'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleDownloadInternshipsZip}
                      disabled={downloadingInterns}
                      className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold flex items-center gap-2 transition disabled:opacity-50"
                    >
                      <Download size={20} />
                      {downloadingInterns ? 'Downloading...' : 'Download as ZIP'}
                    </button>
                  )}
                </div>
                <div className="mb-4 text-gray-300">
                  <p>Showing {internships.length} internships/leaves</p>
                </div>
                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Roll No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Type</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Reason</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">View</th>
                          {userRole === 'faculty' && <th className="px-4 py-3 text-left text-white font-semibold">Send to Parent</th>}
                          {userRole === 'faculty' && <th className="px-4 py-3 text-left text-white font-semibold">Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {loadingInterns ? (
                          <tr className="border-t border-gray-700 bg-gray-800">
                            <td colSpan="8" className="px-4 py-3 text-center text-gray-300">Loading...</td>
                          </tr>
                        ) : internships.length > 0 ? (
                          internships.map((intern, idx) => (
                            <tr key={intern._id} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                              <td className="px-4 py-3 text-white font-medium">{intern.rollNo}</td>
                              <td className="px-4 py-3 text-white font-medium">{intern.name}</td>
                              <td className="px-4 py-3 text-gray-300">{intern.type}</td>
                              <td className="px-4 py-3 text-gray-300">{intern.reason}</td>
                              <td className="px-4 py-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  intern.status === 'Accepted' ? 'bg-green-900 text-green-200' :
                                  intern.status === 'Rejected' ? 'bg-red-900 text-red-200' :
                                  'bg-yellow-900 text-yellow-200'
                                }`}>
                                  {intern.status || 'Pending'}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                {intern.photocopy ? (
                                  <a
                                    href={`http://localhost:5007${intern.photocopy}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 transition"
                                    title="View document"
                                  >
                                    <Eye size={18} />
                                  </a>
                                ) : (
                                  <span className="text-gray-500">-</span>
                                )}
                              </td>
                              {userRole === 'faculty' && (
                                <td className="px-4 py-3">
                                  <button
                                    onClick={() => handleSendToParent(intern._id, intern.name, intern.email)}
                                    disabled={sendingToParent === intern._id}
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Send message to parent"
                                  >
                                    {sendingToParent === intern._id ? 'Sending...' : 'Send to Parent'}
                                  </button>
                                </td>
                              )}
                              {userRole === 'faculty' && (
                                <td className="px-4 py-3 flex gap-2">
                                  <button
                                    onClick={() => handleApproveInternship(intern._id)}
                                    disabled={approvingIntern === intern._id || intern.status === 'Accepted'}
                                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-semibold flex items-center gap-1 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Approve internship"
                                  >
                                    <Check size={16} />
                                    {approvingIntern === intern._id ? 'Approving...' : 'Approve'}
                                  </button>
                                  <button
                                    onClick={() => handleRejectInternship(intern._id)}
                                    disabled={rejectingIntern === intern._id || intern.status === 'Rejected'}
                                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-semibold flex items-center gap-1 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Reject internship"
                                  >
                                    <X size={16} />
                                    {rejectingIntern === intern._id ? 'Rejecting...' : 'Reject'}
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))
                        ) : (
                          <tr className="border-t border-gray-700 bg-gray-800">
                            <td colSpan="8" className="px-4 py-3 text-center text-gray-300">No internships/leaves uploaded yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Marks Tab */}
            {activeTab === 'marks' && (
              <div>
                <div className="mb-6 flex justify-end">
                  <button
                    onClick={handleDownloadMarksZip}
                    disabled={loadingMarks || marks.length === 0 || downloadingMarks}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Download all marks as ZIP with student name and roll number"
                  >
                    <Download size={20} />
                    {downloadingMarks ? 'Downloading...' : 'Download All Marks (ZIP)'}
                  </button>
                </div>

                {loadingMarks ? (
                  <div className="text-center text-gray-300">Loading marks...</div>
                ) : marks.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-800 border-b border-gray-700">
                          <th className="px-4 py-3 text-left text-gray-200 font-semibold">Roll No</th>
                          <th className="px-4 py-3 text-left text-gray-200 font-semibold">Name</th>
                          <th className="px-4 py-3 text-left text-gray-200 font-semibold">Semester</th>
                          <th className="px-4 py-3 text-left text-gray-200 font-semibold">Internal 1</th>
                          <th className="px-4 py-3 text-left text-gray-200 font-semibold">Internal 2</th>
                          <th className="px-4 py-3 text-left text-gray-200 font-semibold">Total Mark</th>
                          <th className="px-4 py-3 text-left text-gray-200 font-semibold">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marks.map((mark, index) => (
                          <tr key={index} className="border-t border-gray-700 hover:bg-gray-800 transition">
                            <td className="px-4 py-3 text-gray-300">{mark.rollNo}</td>
                            <td className="px-4 py-3 text-gray-300">{mark.name}</td>
                            <td className="px-4 py-3 text-gray-300">{mark.semester}</td>
                            <td className="px-4 py-3 text-gray-300">{mark.internal1 || 0}</td>
                            <td className="px-4 py-3 text-gray-300">{mark.internal2 || 0}</td>
                            <td className="px-4 py-3 text-gray-300">{mark.totalMark || 0}</td>
                            <td className="px-4 py-3 text-gray-300">{mark.grade || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center text-gray-300">No marks available</div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
