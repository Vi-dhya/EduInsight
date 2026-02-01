import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import SimplifiedHeader from '../components/SimplifiedHeader'
import { Save, Bell, Lock, Eye, User, Mail, Phone, MapPin, BookOpen, Edit2, Check, X, AlertCircle } from 'lucide-react'

export default function Settings({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingDepartment, setIsEditingDepartment] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  const [facultyProfile, setFacultyProfile] = useState({
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@college.edu',
    phone: '9876543210',
    designation: 'Associate Professor',
    qualification: 'Ph.D. in Computer Science',
    experience: '12 years',
    profileImage: '👨‍🏫'
  })

  const [departmentDetails, setDepartmentDetails] = useState({
    department: 'AI&DS',
    specialization: 'Machine Learning & AI',
    officeLocation: 'Block A, Room 201',
    officeHours: 'Monday - Friday, 2:00 PM - 4:00 PM',
    courses: 'Data Structures, Machine Learning, Deep Learning',
    researchInterests: 'Neural Networks, NLP, Computer Vision'
  })

  const [editedProfile, setEditedProfile] = useState(facultyProfile)
  const [editedDepartment, setEditedDepartment] = useState(departmentDetails)

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('appSettings')
    return saved ? JSON.parse(saved) : {
      emailNotifications: true,
      smsNotifications: false,
      darkMode: true,
      twoFactorAuth: false,
    }
  })

  const navigate = useNavigate()

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings))
  }, [settings])

  const handleSettingChange = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSaveProfile = () => {
    if (!editedProfile.name || !editedProfile.email || !editedProfile.phone) {
      setErrorMessage('Please fill in all required fields')
      setTimeout(() => setErrorMessage(''), 3000)
      return
    }
    setFacultyProfile(editedProfile)
    setIsEditingProfile(false)
    setSuccessMessage('Profile updated successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleCancelProfile = () => {
    setEditedProfile(facultyProfile)
    setIsEditingProfile(false)
  }

  const handleSaveDepartment = () => {
    if (!editedDepartment.department || !editedDepartment.specialization) {
      setErrorMessage('Please fill in all required fields')
      setTimeout(() => setErrorMessage(''), 3000)
      return
    }
    setDepartmentDetails(editedDepartment)
    setIsEditingDepartment(false)
    setSuccessMessage('Department details updated successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleCancelDepartment = () => {
    setEditedDepartment(departmentDetails)
    setIsEditingDepartment(false)
  }

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setErrorMessage('Please fill in all password fields')
      setTimeout(() => setErrorMessage(''), 3000)
      return
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('New passwords do not match')
      setTimeout(() => setErrorMessage(''), 3000)
      return
    }
    if (passwordData.newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long')
      setTimeout(() => setErrorMessage(''), 3000)
      return
    }
    setSuccessMessage('Password changed successfully!')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setIsChangingPassword(false)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleSave = () => {
    setSuccessMessage('All settings saved successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleVerifyEmail = () => {
    setSuccessMessage('Verification email sent to ' + facultyProfile.email)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleExportData = () => {
    const data = {
      profile: facultyProfile,
      department: departmentDetails,
      settings: settings
    }
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'profile-data.json'
    link.click()
    setSuccessMessage('Data exported successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <SimplifiedHeader 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-8">Settings & Profile</h1>

            {/* Success/Error Messages */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-900 border border-green-600 rounded-lg flex items-center gap-3">
                <Check className="text-green-400" size={20} />
                <p className="text-green-200">{successMessage}</p>
              </div>
            )}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-900 border border-red-600 rounded-lg flex items-center gap-3">
                <AlertCircle className="text-red-400" size={20} />
                <p className="text-red-200">{errorMessage}</p>
              </div>
            )}

            {/* Faculty Profile Section */}
            <div className="glass-effect rounded-xl p-8 card-shadow mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{facultyProfile.profileImage}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{facultyProfile.name}</h2>
                    <p className="text-purple-400 font-semibold">{facultyProfile.designation}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsEditingProfile(!isEditingProfile)
                    setEditedProfile(facultyProfile)
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition flex items-center gap-2 font-semibold"
                >
                  <Edit2 size={18} />
                  {isEditingProfile ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {isEditingProfile ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-300 text-sm font-semibold mb-2 block">Full Name</label>
                      <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold mb-2 block">Designation</label>
                      <input
                        type="text"
                        value={editedProfile.designation}
                        onChange={(e) => setEditedProfile({...editedProfile, designation: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold mb-2 block">Email</label>
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold mb-2 block">Phone</label>
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold mb-2 block">Qualification</label>
                      <input
                        type="text"
                        value={editedProfile.qualification}
                        onChange={(e) => setEditedProfile({...editedProfile, qualification: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold mb-2 block">Experience (Years)</label>
                      <input
                        type="text"
                        value={editedProfile.experience}
                        onChange={(e) => setEditedProfile({...editedProfile, experience: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center gap-2 font-semibold"
                    >
                      <Check size={18} />
                      Save Profile
                    </button>
                    <button
                      onClick={handleCancelProfile}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2 font-semibold"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Mail className="text-purple-400" size={20} />
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-semibold">{facultyProfile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-purple-400" size={20} />
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-semibold">{facultyProfile.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-purple-400" size={20} />
                    <div>
                      <p className="text-gray-400 text-sm">Qualification</p>
                      <p className="text-white font-semibold">{facultyProfile.qualification}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="text-purple-400" size={20} />
                    <div>
                      <p className="text-gray-400 text-sm">Experience</p>
                      <p className="text-white font-semibold">{facultyProfile.experience}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Department Details Section */}
            <div className="glass-effect rounded-xl p-8 card-shadow mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <MapPin className="text-purple-400" size={28} />
                  Department Details
                </h2>
                <button
                  onClick={() => {
                    setIsEditingDepartment(!isEditingDepartment)
                    setEditedDepartment(departmentDetails)
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition flex items-center gap-2 font-semibold"
                >
                  <Edit2 size={18} />
                  {isEditingDepartment ? 'Cancel' : 'Edit Details'}
                </button>
              </div>

              {isEditingDepartment ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-300 text-sm font-semibold mb-2 block">Department</label>
                      <input
                        type="text"
                        value={editedDepartment.department}
                        onChange={(e) => setEditedDepartment({...editedDepartment, department: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold mb-2 block">Specialization</label>
                      <input
                        type="text"
                        value={editedDepartment.specialization}
                        onChange={(e) => setEditedDepartment({...editedDepartment, specialization: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold mb-2 block">Office Location</label>
                      <input
                        type="text"
                        value={editedDepartment.officeLocation}
                        onChange={(e) => setEditedDepartment({...editedDepartment, officeLocation: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold mb-2 block">Office Hours</label>
                      <input
                        type="text"
                        value={editedDepartment.officeHours}
                        onChange={(e) => setEditedDepartment({...editedDepartment, officeHours: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-gray-300 text-sm font-semibold mb-2 block">Courses Teaching</label>
                      <textarea
                        value={editedDepartment.courses}
                        onChange={(e) => setEditedDepartment({...editedDepartment, courses: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        rows="2"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-gray-300 text-sm font-semibold mb-2 block">Research Interests</label>
                      <textarea
                        value={editedDepartment.researchInterests}
                        onChange={(e) => setEditedDepartment({...editedDepartment, researchInterests: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-purple-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        rows="2"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleSaveDepartment}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center gap-2 font-semibold"
                    >
                      <Check size={18} />
                      Save Details
                    </button>
                    <button
                      onClick={handleCancelDepartment}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2 font-semibold"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Department</p>
                    <p className="text-white font-semibold text-lg">{departmentDetails.department}</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Specialization</p>
                    <p className="text-white font-semibold text-lg">{departmentDetails.specialization}</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Office Location</p>
                    <p className="text-white font-semibold">{departmentDetails.officeLocation}</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Office Hours</p>
                    <p className="text-white font-semibold">{departmentDetails.officeHours}</p>
                  </div>
                  <div className="md:col-span-2 bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Courses Teaching</p>
                    <p className="text-white font-semibold">{departmentDetails.courses}</p>
                  </div>
                  <div className="md:col-span-2 bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Research Interests</p>
                    <p className="text-white font-semibold">{departmentDetails.researchInterests}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Settings */}
            <div className="glass-effect rounded-xl p-6 card-shadow mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="text-purple-400" size={24} />
                <h2 className="text-2xl font-bold text-white">Notifications</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">Email Notifications</p>
                    <p className="text-gray-400 text-sm">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={() => handleSettingChange('emailNotifications')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">SMS Notifications</p>
                    <p className="text-gray-400 text-sm">Receive updates via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={() => handleSettingChange('smsNotifications')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">Verify Email Address</p>
                    <p className="text-gray-400 text-sm">Send verification email to {facultyProfile.email}</p>
                  </div>
                  <button
                    onClick={handleVerifyEmail}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold text-sm"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>

            {/* Display Settings */}
            <div className="glass-effect rounded-xl p-6 card-shadow mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="text-purple-400" size={24} />
                <h2 className="text-2xl font-bold text-white">Display</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">Dark Mode</p>
                    <p className="text-gray-400 text-sm">Use dark theme</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.darkMode}
                      onChange={() => handleSettingChange('darkMode')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="glass-effect rounded-xl p-6 card-shadow mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="text-purple-400" size={24} />
                <h2 className="text-2xl font-bold text-white">Security</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-white font-semibold">Two-Factor Authentication</p>
                    <p className="text-gray-400 text-sm">Add extra security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={() => handleSettingChange('twoFactorAuth')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <button
                    onClick={() => {
                      setIsChangingPassword(!isChangingPassword)
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                    }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition font-semibold"
                  >
                    {isChangingPassword ? 'Cancel Password Change' : 'Change Password'}
                  </button>
                </div>

                {isChangingPassword && (
                  <div className="space-y-4 p-4 bg-gray-800 rounded-lg">
                    <div>
                      <label className="text-gray-300 text-sm font-semibold mb-2 block">Current Password</label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-700 border border-purple-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold mb-2 block">New Password</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-700 border border-purple-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter new password (min 8 characters)"
                      />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm font-semibold mb-2 block">Confirm Password</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-700 border border-purple-400 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleChangePassword}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center gap-2 font-semibold"
                      >
                        <Check size={18} />
                        Update Password
                      </button>
                      <button
                        onClick={() => {
                          setIsChangingPassword(false)
                          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                        }}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2 font-semibold"
                      >
                        <X size={18} />
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition flex items-center gap-2 font-semibold"
              >
                <Save size={20} />
                Save Settings
              </button>
              <button
                onClick={handleExportData}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition flex items-center gap-2 font-semibold"
              >
                <Mail size={20} />
                Export Data
              </button>
              <button
                onClick={() => {
                  localStorage.clear()
                  setSuccessMessage('All data cleared successfully!')
                  setTimeout(() => setSuccessMessage(''), 3000)
                }}
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-lg transition flex items-center gap-2 font-semibold"
              >
                <X size={20} />
                Clear All Data
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
