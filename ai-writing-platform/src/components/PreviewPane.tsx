'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, RefreshCw, ExternalLink, Code, Smartphone, Monitor } from 'lucide-react'

export default function PreviewPane() {
  const [isRunning, setIsRunning] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  useEffect(() => {
    // Simulate starting the development server
    const timer = setTimeout(() => {
      setIsRunning(true)
      setPreviewUrl('http://localhost:3000')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleRunPreview = () => {
    setIsRunning(false)
    // Simulate restarting the server
    setTimeout(() => {
      setIsRunning(true)
    }, 1500)
  }

  const getDeviceWidth = () => {
    switch (deviceType) {
      case 'mobile':
        return 'w-80'
      case 'tablet':
        return 'w-96'
      default:
        return 'w-full'
    }
  }

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Preview Header */}
      <div className="p-4 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <span className="text-sm font-medium text-slate-700">
                {isRunning ? 'Running' : 'Starting...'}
              </span>
            </div>
            
            {previewUrl && (
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <span>Preview:</span>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-mono"
                >
                  {previewUrl}
                </a>
                <ExternalLink className="w-3 h-3" />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Device Type Selector */}
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setDeviceType('desktop')}
                className={`p-2 rounded-md transition-colors ${
                  deviceType === 'desktop' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceType('tablet')}
                className={`p-2 rounded-md transition-colors ${
                  deviceType === 'tablet' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceType('mobile')}
                className={`p-2 rounded-md transition-colors ${
                  deviceType === 'mobile' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleRunPreview}
              disabled={!isRunning}
              className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${!isRunning ? 'animate-spin' : ''}`} />
              <span>Restart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-4 overflow-auto">
        {!isRunning ? (
          <div className="h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Starting Development Server</h3>
              <p className="text-slate-600">Please wait while we prepare your preview...</p>
            </motion.div>
          </div>
        ) : (
          <div className="h-full">
            {/* Preview Frame */}
            <div className={`mx-auto bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden ${getDeviceWidth()}`}>
              {/* Browser Chrome */}
              <div className="bg-slate-100 px-4 py-2 flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded px-3 py-1 text-xs text-slate-600 text-center">
                    {previewUrl}
                  </div>
                </div>
              </div>

              {/* Preview Content */}
              <div className="h-96 bg-white overflow-hidden">
                <div className="p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Code className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">
                      NovaCode AI Writing Platform
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                      Your enterprise-grade AI writing platform is now running successfully!
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Code className="w-4 h-4 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-slate-900 text-sm">AI Writing</h3>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Code className="w-4 h-4 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-slate-900 text-sm">File Uploads</h3>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Code className="w-4 h-4 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-slate-900 text-sm">Analytics</h3>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium">
                      🚀 Ready to Build More Features!
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Status Info */}
            <div className="mt-4 text-center">
              <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Development server running on port 3000</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}