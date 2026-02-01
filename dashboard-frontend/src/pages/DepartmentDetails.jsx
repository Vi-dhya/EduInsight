import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import YearDropdown from '../components/YearDropdown'
import { Eye, Download, Archive } from 'lucide-react'

export default function DepartmentDetails({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedYear, setSelectedYear] = useState('2nd')
  const [activeTab, setActiveTab] = useState('students')
  const navigate = useNavigate()

  const generateStudents = (year) => {
    const students = []
    const startRoll = year === '2nd' ? 1001 : year === '3rd' ? 2001 : 3001
    
    for (let i = 0; i < 50; i++) {
      const randomAbcId = Math.floor(Math.random() * 900000) + 100000
      const hasIncomeCert = Math.random() > 0.4
      const randomIncomeNum = hasIncomeCert ? Math.floor(Math.random() * 9000000) + 1000000 : null
      
      students.push({
        id: i + 1,
        name: `Student ${i + 1}`,
        rollNo: `${startRoll + i}`,
        collegeEmail: `student${startRoll + i}@college.edu`,
        personalEmail: `student${i + 1}@gmail.com`,
        phone: `98765${String(43210 + i).slice(-5)}`,
        abcId: `ABC${randomAbcId}`,
        incomeCertificate: hasIncomeCert ? `income-cert-${randomIncomeNum}.pdf` : null,
        year: year
      })
    }
    return students
  }

  const [students] = useState([
    ...generateStudents('2nd'),
    ...generateStudents('3rd'),
    ...generateStudents('4th')
  ])

  const [certifications, setCertifications] = useState([
    { id: 1, studentId: 1001, name: 'Raj Kumar', rollNo: '1001', cert: 'AWS Certified', uploadedFile: 'aws-cert.pdf', status: 'Pending', remarks: 'Under review', year: '2nd' },
    { id: 2, studentId: 1002, name: 'Priya Singh', rollNo: '1002', cert: 'Google Cloud', uploadedFile: 'google-cloud.pdf', status: 'Accepted', remarks: 'Approved by faculty', year: '2nd' },
    { id: 3, studentId: 2001, name: 'Anjali Verma', rollNo: '2001', cert: 'Data Science', uploadedFile: 'data-science.pdf', status: 'Pending', remarks: 'Under review', year: '3rd' },
    { id: 4, studentId: 1003, name: 'Vikram Kumar', rollNo: '1003', cert: 'Azure Certified', uploadedFile: null, status: 'Rejected', remarks: 'Needs revision', year: '2nd' },
    { id: 5, studentId: 1004, name: 'Neha Singh', rollNo: '1004', cert: 'Blockchain Expert', uploadedFile: 'blockchain.pdf', status: 'Pending', remarks: 'Under review', year: '2nd' },
  ])

  const [internships, setInternships] = useState([
    { id: 1, studentId: 1001, name: 'Student 1001', rollNo: '1001', type: 'Leave', reason: 'Google Summer Internship', uploadedFile: 'internship-letter-1001.pdf', parentPhone: '9876543210', sentToParent: true, year: '2nd' },
    { id: 2, studentId: 1005, name: 'Student 1005', rollNo: '1005', type: 'Leave', reason: 'IBM Internship', uploadedFile: 'internship-letter-1005.pdf', parentPhone: '9876543211', sentToParent: true, year: '2nd' },
    { id: 3, studentId: 1007, name: 'Student 1007', rollNo: '1007', type: 'Internship', reason: 'Google Summer Internship', uploadedFile: 'internship-letter-1007.pdf', parentPhone: '9876543212', sentToParent: true, year: '2nd' },
    { id: 4, studentId: 1009, name: 'Student 1009', rollNo: '1009', type: 'Internship', reason: 'IBM Internship', uploadedFile: null, parentPhone: '9876543213', sentToParent: true, year: '2nd' },
    { id: 5, studentId: 1012, name: 'Student 1012', rollNo: '1012', type: 'Internship', reason: 'Medical Leave', uploadedFile: 'internship-letter-1012.pdf', parentPhone: '9876543214', sentToParent: false, year: '2nd' },
    { id: 6, studentId: 1015, name: 'Student 1015', rollNo: '1015', type: 'Leave', reason: 'Microsoft Internship', uploadedFile: 'internship-letter-1015.pdf', parentPhone: '9876543215', sentToParent: true, year: '2nd' },
    { id: 7, studentId: 1016, name: 'Student 1016', rollNo: '1016', type: 'Internship', reason: 'Personal Reasons', uploadedFile: null, parentPhone: '9876543216', sentToParent: true, year: '2nd' },
    { id: 8, studentId: 2001, name: 'Student 2001', rollNo: '2001', type: 'Internship', reason: 'Amazon Internship', uploadedFile: 'internship-letter-2001.pdf', parentPhone: '9876543217', sentToParent: true, year: '3rd' },
    { id: 9, studentId: 3001, name: 'Student 3001', rollNo: '3001', type: 'Leave', reason: 'Final Project', uploadedFile: 'internship-letter-3001.pdf', parentPhone: '9876543218', sentToParent: false, year: '4th' },
  ])

  const filteredStudents = students.filter(s => s.year === selectedYear)
  const filteredCerts = certifications.filter(c => c.year === selectedYear)
  const filteredInterns = internships.filter(i => i.year === selectedYear)

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  const handleAcceptCert = (certId) => {
    setCertifications(certifications.map(c => 
      c.id === certId ? {...c, status: 'Accepted', remarks: 'Approved by faculty'} : c
    ))
  }

  const handleRejectCert = (certId) => {
    setCertifications(certifications.map(c => 
      c.id === certId ? {...c, status: 'Rejected', remarks: 'Needs revision'} : c
    ))
  }

  const handleViewCert = (cert) => {
    if (cert.uploadedFile) {
      alert(`Viewing: ${cert.uploadedFile}`)
    }
  }

  const handleViewInternshipLetter = (intern) => {
    if (intern.uploadedFile) {
      alert(`Viewing: ${intern.uploadedFile}`)
    }
  }

  const handleSendToParent = (internshipId) => {
    setInternships(internships.map(i => 
      i.id === internshipId ? {...i, sentToParent: true} : i
    ))
  }

  const handleDownloadCertificationsZip = () => {
    const certFiles = filteredCerts
      .filter(c => c.uploadedFile)
      .map(c => c.uploadedFile)
    
    if (certFiles.length === 0) {
      alert('No certificates to download')
      return
    }
    
    alert(`Downloading ${certFiles.length} certificate(s) as ZIP:\n${certFiles.join('\n')}`)
    // In production, this would trigger an actual ZIP download
  }

  const handleDownloadInternshipsZip = () => {
    const internFiles = filteredInterns
      .filter(i => i.uploadedFile)
      .map(i => i.uploadedFile)
    
    if (internFiles.length === 0) {
      alert('No internship letters to download')
      return
    }
    
    alert(`Downloading ${internFiles.length} internship letter(s) as ZIP:\n${internFiles.join('\n')}`)
    // In production, this would trigger an actual ZIP download
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
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-bold text-white">Department Details</h1>
              <YearDropdown selectedYear={selectedYear} onYearChange={setSelectedYear} />
            </div>

            <div className="flex gap-4 mb-8 border-b border-purple-500">
              {['students', 'certifications', 'internships'].map(tab => (
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
                </button>
              ))}
            </div>

            {activeTab === 'students' && (
              <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-white font-semibold">Roll No</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Name</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">College Email</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Personal Email</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Phone</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">ABC ID</th>
                        <th className="px-4 py-3 text-left text-white font-semibold">Income Certificate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student, idx) => (
                        <tr key={student.id} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                          <td className="px-4 py-3 text-white font-medium">{student.rollNo}</td>
                          <td className="px-4 py-3 text-white">{student.name}</td>
                          <td className="px-4 py-3 text-gray-300">{student.collegeEmail}</td>
                          <td className="px-4 py-3 text-gray-300">{student.personalEmail}</td>
                          <td className="px-4 py-3 text-gray-300">{student.phone}</td>
                          <td className="px-4 py-3 text-gray-300">{student.abcId}</td>
                          <td className="px-4 py-3">
                            {student.incomeCertificate ? (
                              <button
                                onClick={() => alert(`Viewing: ${student.incomeCertificate}`)}
                                className="p-2 text-blue-400 hover:bg-blue-900 hover:bg-opacity-30 rounded transition"
                                title="View income certificate"
                              >
                                <Eye size={18} />
                              </button>
                            ) : (
                              <span className="text-gray-500 text-sm">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'certifications' && (
              <div>
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleDownloadCertificationsZip}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold flex items-center gap-2 transition"
                  >
                    <Archive size={20} />
                    Download All as ZIP
                  </button>
                </div>
                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Roll No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Student Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Certification</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">View</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Status</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Remarks</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCerts.map((cert, idx) => (
                          <tr key={cert.id} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                            <td className="px-4 py-3 text-white font-medium">{cert.rollNo}</td>
                            <td className="px-4 py-3 text-white font-medium">{cert.name}</td>
                            <td className="px-4 py-3 text-gray-300">{cert.cert}</td>
                            <td className="px-4 py-3">
                              {cert.uploadedFile ? (
                                <button
                                  onClick={() => handleViewCert(cert)}
                                  className="p-2 text-blue-400 hover:bg-blue-900 hover:bg-opacity-30 rounded transition"
                                  title="View uploaded certificate"
                                >
                                  <Eye size={18} />
                                </button>
                              ) : (
                                <span className="text-gray-500 text-sm">-</span>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                cert.status === 'Accepted' ? 'bg-green-900 text-green-200' :
                                cert.status === 'Rejected' ? 'bg-red-900 text-red-200' :
                                'bg-yellow-900 text-yellow-200'
                              }`}>
                                {cert.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-300 text-sm">{cert.remarks}</td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleAcceptCert(cert.id)}
                                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-semibold transition"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleRejectCert(cert.id)}
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold transition"
                                >
                                  Reject
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'internships' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-gray-400">
                    <p>Showing {filteredInterns.length} internships for {selectedYear} Year (From Backend Database)</p>
                  </div>
                  <button
                    onClick={handleDownloadInternshipsZip}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold flex items-center gap-2 transition"
                  >
                    <Archive size={20} />
                    Download All as ZIP
                  </button>
                </div>
                <div className="glass-effect rounded-xl overflow-hidden card-shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-semibold">Roll No</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Student Name</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Type</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Reason</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">View</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Parent Phone</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Sent to Parent</th>
                          <th className="px-4 py-3 text-left text-white font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInterns.map((intern, idx) => (
                          <tr key={intern.id} className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'} hover:bg-gray-700 transition`}>
                            <td className="px-4 py-3 text-white font-medium">{intern.rollNo}</td>
                            <td className="px-4 py-3 text-white font-medium">{intern.name}</td>
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                intern.type === 'Internship' ? 'bg-blue-900 text-blue-200' : 'bg-purple-900 text-purple-200'
                              }`}>
                                {intern.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-300">{intern.reason}</td>
                            <td className="px-4 py-3">
                              {intern.uploadedFile ? (
                                <button
                                  onClick={() => handleViewInternshipLetter(intern)}
                                  className="p-2 text-blue-400 hover:bg-blue-900 hover:bg-opacity-30 rounded transition"
                                  title="View uploaded letter"
                                >
                                  <Eye size={18} />
                                </button>
                              ) : (
                                <span className="text-gray-500 text-sm">-</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-gray-300">{intern.parentPhone}</td>
                            <td className="px-4 py-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                intern.sentToParent ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                              }`}>
                                {intern.sentToParent ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {!intern.sentToParent ? (
                                <button
                                  onClick={() => handleSendToParent(intern.id)}
                                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-semibold transition"
                                >
                                  Send to Parent
                                </button>
                              ) : (
                                <button
                                  disabled
                                  className="px-3 py-1 bg-gray-600 text-gray-300 rounded text-xs font-semibold cursor-not-allowed"
                                >
                                  ✓ Sent
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
