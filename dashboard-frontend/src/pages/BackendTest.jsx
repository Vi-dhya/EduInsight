import { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5001'

export default function BackendTest() {
  const [backendStatus, setBackendStatus] = useState('Testing...')
  const [authStatus, setAuthStatus] = useState('Not tested')
  const [dataStatus, setDataStatus] = useState('Not tested')
  const [studentCount, setStudentCount] = useState(0)
  const [certificationCount, setCertificationCount] = useState(0)
  const [token, setToken] = useState('')

  const testBackend = async () => {
    try {
      // Test 1: Health check
      setBackendStatus('Testing backend health...')
      const healthResponse = await axios.get(`${API_BASE_URL}/health`)
      setBackendStatus(`✅ Backend is running: ${healthResponse.data.status}`)

      // Test 2: Login
      setAuthStatus('Testing login...')
      const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: 'faculty@example.com',
        password: 'password123',
        role: 'faculty'
      })
      setToken(loginResponse.data.token.substring(0, 20) + '...')
      setAuthStatus('✅ Login successful')

      // Test 3: Get data
      setDataStatus('Testing data fetch...')
      const headers = {
        'Authorization': `Bearer ${loginResponse.data.token}`,
        'Content-Type': 'application/json'
      }

      const studentsResponse = await axios.get(
        `${API_BASE_URL}/department/students?year=2nd`,
        { headers }
      )
      setStudentCount(studentsResponse.data.count)

      const certificationsResponse = await axios.get(
        `${API_BASE_URL}/department/certifications?year=2nd`,
        { headers }
      )
      setCertificationCount(certificationsResponse.data.count)

      setDataStatus('✅ Data fetched successfully')

    } catch (error) {
      console.error('Backend test error:', error)
      if (error.response) {
        setBackendStatus(`❌ Backend error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`)
      } else if (error.request) {
        setBackendStatus('❌ Backend not responding - Check if server is running on port 5001')
      } else {
        setBackendStatus(`❌ Error: ${error.message}`)
      }
    }
  }

  useEffect(() => {
    testBackend()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Backend Connection Test</h1>
        
        <div className="space-y-6">
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Connection Status</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Backend Health:</span>
                <span className="text-white font-mono">{backendStatus}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Authentication:</span>
                <span className="text-white font-mono">{authStatus}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Data Fetching:</span>
                <span className="text-white font-mono">{dataStatus}</span>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Data from Backend</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">JWT Token:</span>
                <span className="text-white font-mono text-sm">{token || 'Not generated'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Students (2nd Year):</span>
                <span className="text-white font-mono text-xl">{studentCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Certifications (2nd Year):</span>
                <span className="text-white font-mono text-xl">{certificationCount}</span>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">What This Means</h2>
            <div className="text-gray-300 space-y-2">
              <p>✅ If you see green checkmarks above, your backend is working perfectly!</p>
              <p>✅ The numbers show real data from your MongoDB database</p>
              <p>✅ Your frontend can successfully communicate with the backend</p>
              <p>❌ If you see red X marks, there's a connection issue</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={testBackend}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
            >
              Test Again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}