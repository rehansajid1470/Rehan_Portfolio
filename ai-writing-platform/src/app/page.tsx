'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, MessageSquare, FileText, BarChart3 } from 'lucide-react'
import PromptInput from '@/components/PromptInput'
import ChatInterface from '@/components/ChatInterface'
import PreviewPane from '@/components/PreviewPane'
import FileExplorer from '@/components/FileExplorer'

export default function Home() {
  const [hasPrompt, setHasPrompt] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [activeTab, setActiveTab] = useState<'preview' | 'files'>('preview')

  const handleFirstPrompt = (prompt: string) => {
    setCurrentPrompt(prompt)
    setHasPrompt(true)
  }

  if (!hasPrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              NovaCode AI
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Your enterprise-grade AI writing platform. Describe what you want to build, and watch it come to life.
            </p>
          </div>
          
          <PromptInput onSubmit={handleFirstPrompt} />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex h-screen"
      >
        {/* Left Pane - Chat Interface */}
        <div className="w-1/2 border-r border-slate-200 bg-white">
          <ChatInterface initialPrompt={currentPrompt} />
        </div>

        {/* Right Pane - Preview & Files */}
        <div className="w-1/2 flex flex-col">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 bg-white">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'files'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Files
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'preview' ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <PreviewPane />
                </motion.div>
              ) : (
                <motion.div
                  key="files"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <FileExplorer />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Run Preview
              </button>
              <button className="flex-1 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                View Files
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
