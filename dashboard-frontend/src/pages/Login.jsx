import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff, Brain, BookOpen, Cpu, Zap, Code, Lightbulb, Database, Network, Microscope, Layers, BarChart3, Wifi } from 'lucide-react'

// Hardcoded credentials for immediate login
const VALID_CREDENTIALS = {
  'student23102001@college.edu': { password: 'student23102001', role: 'student', name: 'Atchaya', rollNo: '23102001', year: '2nd', department: 'AI&DS' },
  'student23102002@college.edu': { password: 'student23102002', role: 'student', name: 'Ragul', rollNo: '23102002', year: '2nd', department: 'AI&DS' },
  'student23102003@college.edu': { password: 'student23102003', role: 'student', name: 'Rifath', rollNo: '23102003', year: '2nd', department: 'AI&DS' },
  'student23102004@college.edu': { password: 'student23102004', role: 'student', name: 'Faouzia', rollNo: '23102004', year: '2nd', department: 'AI&DS' },
  'student23102005@college.edu': { password: 'student23102005', role: 'student', name: 'Sasidharan', rollNo: '23102005', year: '2nd', department: 'AI&DS' },
  'student23102006@college.edu': { password: 'student23102006', role: 'student', name: 'Shree Prajan', rollNo: '23102006', year: '2nd', department: 'AI&DS' },
  'student23102007@college.edu': { password: 'student23102007', role: 'student', name: 'Saran', rollNo: '23102007', year: '2nd', department: 'AI&DS' },
  'student23102008@college.edu': { password: 'student23102008', role: 'student', name: 'Sowmiya', rollNo: '23102008', year: '2nd', department: 'AI&DS' },
  'student23102009@college.edu': { password: 'student23102009', role: 'student', name: 'Pria Nandhini', rollNo: '23102009', year: '2nd', department: 'AI&DS' },
  'student23102010@college.edu': { password: 'student23102010', role: 'student', name: 'Vimalesh', rollNo: '23102010', year: '2nd', department: 'AI&DS' },
  'facultyrajesh@college.edu': { password: 'facultyra', role: 'faculty', name: 'Dr. Rajesh Kumar', department: 'AI&DS', designation: 'Associate Professor' },
  'facultypriya@college.edu': { password: 'facultypr', role: 'faculty', name: 'Dr. Priya Sharma', department: 'CSE', designation: 'Professor' },
  'facultyvikram@college.edu': { password: 'facultyvi', role: 'faculty', name: 'Dr. Vikram Singh', department: 'EC', designation: 'Assistant Professor' },
  'hodanathi@college.edu': { password: 'hod@123', role: 'hod', name: 'Dr. Anathi', department: 'AI&DS', designation: 'Head of Department' },
  'adramkumar@college.edu': { password: 'ad@123', role: 'ad', name: 'Dr. Ram Kumar', department: 'Academic Affairs', designation: 'Associate Dean' }
}

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    const emailValue = e.target.value
    setEmail(emailValue)
  }

  const handlePasswordChange = (e) => {
    const pwd = e.target.value
    setPassword(pwd)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      // First try backend
      try {
        const response = await axios.post('http://localhost:5007/auth/login', {
          email,
          password
        }, { timeout: 3000 })

        const { token, user } = response.data
        onLogin(token, user.role, user.email)
        
        // Route based on role
        if (user.role === 'faculty') {
          navigate('/faculty-dashboard')
        } else if (user.role === 'hod') {
          navigate('/hod-dashboard')
        } else if (user.role === 'ad') {
          navigate('/ad-dashboard')
        } else {
          navigate('/student-dashboard')
        }
        return
      } catch (backendError) {
        console.log('Backend not available, using local authentication')
      }

      // Fallback to local authentication
      const user = VALID_CREDENTIALS[email.toLowerCase()]
      
      if (!user || user.password !== password) {
        setError('Invalid email or password')
        setLoading(false)
        return
      }

      // Generate a fake token for local auth
      const token = 'local_token_' + Math.random().toString(36).substr(2, 9)
      
      // Store user data
      localStorage.setItem('token', token)
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userRole', user.role)
      localStorage.setItem('userName', user.name)
      
      onLogin(token, user.role, email)
      
      // Route based on role
      if (user.role === 'faculty') {
        navigate('/faculty-dashboard')
      } else if (user.role === 'hod') {
        navigate('/hod-dashboard')
      } else if (user.role === 'ad') {
        navigate('/ad-dashboard')
      } else {
        navigate('/student-dashboard')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Login failed. Please check your email and password.')
    } finally {
      setLoading(false)
    }
  }

  const FloatingIcon = ({ Icon, delay, position, size = 60, opacity = 0.08 }) => (
    <div
      className="absolute animate-float"
      style={{
        ...position,
        animationDelay: `${delay}s`,
      }}
    >
      <Icon size={size} className="text-blue-500" style={{ opacity }} />
    </div>
  )

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-4 overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Background */}
        <svg className="absolute inset-0 w-full h-full opacity-15" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.08)" />
              <stop offset="100%" stopColor="rgba(30, 58, 138, 0.08)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridGradient)" />
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-12 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-12 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-8 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-3000"></div>

        {/* Floating AI/Education Icons */}
        <FloatingIcon Icon={Brain} delay={0} position={{ top: '10%', left: '5%' }} size={70} opacity={0.1} />
        <FloatingIcon Icon={Cpu} delay={1} position={{ top: '20%', right: '8%' }} size={70} opacity={0.1} />
        <FloatingIcon Icon={Database} delay={2} position={{ bottom: '25%', left: '8%' }} size={70} opacity={0.1} />
        <FloatingIcon Icon={Network} delay={1.5} position={{ bottom: '20%', right: '10%' }} size={70} opacity={0.1} />
        <FloatingIcon Icon={BookOpen} delay={0.5} position={{ top: '50%', left: '5%' }} size={60} opacity={0.08} />
        <FloatingIcon Icon={Code} delay={2.5} position={{ top: '60%', right: '8%' }} size={60} opacity={0.08} />
        <FloatingIcon Icon={Microscope} delay={1.2} position={{ top: '35%', left: '50%' }} size={65} opacity={0.09} />
        <FloatingIcon Icon={Layers} delay={2.8} position={{ bottom: '35%', left: '50%' }} size={65} opacity={0.09} />
        <FloatingIcon Icon={BarChart3} delay={0.8} position={{ top: '70%', left: '15%' }} size={55} opacity={0.08} />
        <FloatingIcon Icon={Wifi} delay={2.2} position={{ bottom: '45%', right: '15%' }} size={55} opacity={0.08} />
        <FloatingIcon Icon={Lightbulb} delay={1.8} position={{ top: '45%', right: '20%' }} size={60} opacity={0.08} />
        <FloatingIcon Icon={Zap} delay={0.3} position={{ bottom: '55%', right: '5%' }} size={60} opacity={0.08} />

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-radial-gradient opacity-40"></div>
      </div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glow Effect Behind Card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-1000"></div>

        {/* Login Card */}
        <div className="relative glass-effect rounded-2xl p-8 card-shadow backdrop-blur-xl border border-blue-500/20 bg-slate-900/80">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Animated Logo */}
            <div className="mb-6 flex justify-center">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full animate-spin opacity-60" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-1 bg-gradient-to-r from-blue-500 to-slate-700 rounded-full animate-spin opacity-40" style={{ animationDuration: '5s', animationDirection: 'reverse' }}></div>
                <div className="absolute inset-3 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 rounded-full flex items-center justify-center border border-blue-500/30">
                  <Brain size={32} className="text-blue-400" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent mb-2">
              EduInsight
            </h1>
            <p className="text-blue-300/80 text-sm font-light">Department Analytical Dashboard</p>
            <p className="text-blue-300/50 text-xs mt-2">AI & Data Science Excellence</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mb-8"></div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-blue-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-blue-400 group-focus-within:text-blue-300 transition" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="your.email@college.edu"
                  className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:bg-slate-800 transition duration-300 backdrop-blur-sm text-sm"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-blue-200 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-blue-400 group-focus-within:text-blue-300 transition" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:bg-slate-800 transition duration-300 backdrop-blur-sm text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-blue-400 hover:text-blue-300 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm flex items-center gap-2 backdrop-blur-sm animate-shake">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 mt-6 text-sm"
            >
              <LogIn size={18} />
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent my-6"></div>

          {/* Footer Info */}
          <div className="space-y-3">
            <p className="text-xs text-blue-300/60 text-center font-light">
              Role-Based Access Control
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20 text-blue-300/70 text-center">
                Faculty
              </div>
              <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20 text-blue-300/70 text-center">
                Student
              </div>
              <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20 text-blue-300/70 text-center">
                HOD
              </div>
              <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20 text-blue-300/70 text-center">
                AD
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-blue-300/40 font-light tracking-widest">
            ARTIFICIAL INTELLIGENCE & DATA SCIENCE DEPARTMENT
          </p>
          <p className="text-xs text-blue-300/30 mt-2">Powered by Advanced Analytics</p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-40px) rotate(15deg);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(40px, -60px) scale(1.15);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.95);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 8s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .bg-radial-gradient {
          background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
        }

        .glass-effect {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(10px);
        }

        .card-shadow {
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25);
        }
      `}</style>
    </div>
  )
}
