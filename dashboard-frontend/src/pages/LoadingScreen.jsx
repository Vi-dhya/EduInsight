import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, BookOpen, Cpu, Zap, Code, Lightbulb, Database, Network, Microscope, Layers, BarChart3, Wifi } from 'lucide-react'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev
        return prev + Math.random() * 30
      })
    }, 300)

    const timer = setTimeout(() => {
      setProgress(100)
      setIsLoading(false)
      setTimeout(() => navigate('/login'), 500)
    }, 3500)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [navigate])

  const FloatingIcon = ({ Icon, delay, position, size = 60, opacity = 0.1 }) => (
    <div
      className="absolute animate-float"
      style={{
        ...position,
        animationDelay: `${delay}s`,
      }}
    >
      <Icon size={size} className="text-blue-400" style={{ opacity }} />
    </div>
  )

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden flex items-center justify-center">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Professional Grid Background */}
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="100%" stopColor="rgba(30, 58, 138, 0.1)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridGradient)" />
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Animated Gradient Orbs - Professional Blue Tones */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-12 animate-blob animation-delay-3000"></div>

        {/* Floating AI/Education Icons - More Components */}
        <FloatingIcon Icon={Brain} delay={0} position={{ top: '10%', left: '5%' }} size={80} opacity={0.12} />
        <FloatingIcon Icon={Cpu} delay={1} position={{ top: '15%', right: '8%' }} size={80} opacity={0.12} />
        <FloatingIcon Icon={Database} delay={2} position={{ bottom: '20%', left: '10%' }} size={80} opacity={0.12} />
        <FloatingIcon Icon={Network} delay={1.5} position={{ bottom: '15%', right: '12%' }} size={80} opacity={0.12} />
        <FloatingIcon Icon={BookOpen} delay={0.5} position={{ top: '50%', left: '8%' }} size={70} opacity={0.1} />
        <FloatingIcon Icon={Code} delay={2.5} position={{ top: '60%', right: '10%' }} size={70} opacity={0.1} />
        <FloatingIcon Icon={Microscope} delay={1.2} position={{ top: '30%', left: '50%' }} size={75} opacity={0.11} />
        <FloatingIcon Icon={Layers} delay={2.8} position={{ bottom: '30%', left: '50%' }} size={75} opacity={0.11} />
        <FloatingIcon Icon={BarChart3} delay={0.8} position={{ top: '70%', left: '20%' }} size={65} opacity={0.1} />
        <FloatingIcon Icon={Wifi} delay={2.2} position={{ bottom: '40%', right: '20%' }} size={65} opacity={0.1} />
        <FloatingIcon Icon={Lightbulb} delay={1.8} position={{ top: '40%', right: '25%' }} size={70} opacity={0.1} />
        <FloatingIcon Icon={Zap} delay={0.3} position={{ bottom: '50%', right: '5%' }} size={70} opacity={0.1} />

        {/* Animated Lines/Connections */}
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </linearGradient>
          </defs>
          <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-dash" />
          <line x1="90%" y1="20%" x2="10%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-dash" style={{ animationDelay: '1s' }} />
        </svg>

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-radial-gradient opacity-30"></div>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center max-w-2xl px-6">
        {/* Animated Central Icon */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-40 h-40">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full animate-spin opacity-60" style={{ animationDuration: '4s' }}></div>
            
            {/* Middle ring */}
            <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-slate-700 rounded-full animate-spin opacity-40" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
            
            {/* Inner circle */}
            <div className="absolute inset-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 rounded-full flex items-center justify-center border border-blue-500/30">
              <Brain size={80} className="text-blue-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <div className="mb-6">
          <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent animate-fade-in leading-tight">
            Welcome to
          </h1>
          <h2 className="text-6xl font-black bg-gradient-to-r from-blue-400 via-blue-300 to-slate-300 bg-clip-text text-transparent animate-fade-in leading-tight" style={{ animationDelay: '0.2s' }}>
            AI&DS Department
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-xl text-blue-200 mb-4 animate-fade-in font-light tracking-wide" style={{ animationDelay: '0.4s' }}>
          Department Analytical Dashboard
        </p>
        <p className="text-sm text-blue-300/70 mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Powered by Advanced AI & Machine Learning Technologies
        </p>

        {/* Progress Bar */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="w-80 h-1.5 bg-slate-800 rounded-full overflow-hidden mx-auto border border-blue-500/30">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-blue-300/60 mt-3 font-mono">{Math.round(progress)}% Loading</p>
        </div>

        {/* Status Messages */}
        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="flex items-center justify-center gap-2 text-blue-300/80 text-sm">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Initializing AI Systems</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-blue-300/60 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <span>Loading Analytics Engine</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-blue-300/40 text-sm">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            <span>Preparing Dashboard</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-blue-500/20">
          <p className="text-xs text-blue-300/50 font-light tracking-widest">
            ARTIFICIAL INTELLIGENCE & DATA SCIENCE
          </p>
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

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dash {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
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

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-dash {
          stroke-dasharray: 1000;
          animation: dash 3s linear infinite;
        }

        .bg-radial-gradient {
          background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
        }
      `}</style>
    </div>
  )
}
