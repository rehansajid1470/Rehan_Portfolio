'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'

interface PromptInputProps {
  onSubmit: (prompt: string) => void
}

export default function PromptInput({ onSubmit }: PromptInputProps) {
  const [prompt, setPrompt] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim() || isSubmitting) return

    setIsSubmitting(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onSubmit(prompt.trim())
    setIsSubmitting(false)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the application you want to build... (e.g., 'Build me a subscription-based AI writing platform with chat, file uploads, and analytics dashboard')"
          className="w-full px-6 py-4 pr-16 text-lg text-slate-900 placeholder-slate-500 bg-white border-2 border-slate-200 rounded-2xl shadow-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 resize-none"
          rows={3}
          disabled={isSubmitting}
        />
        
        <motion.button
          type="submit"
          disabled={!prompt.trim() || isSubmitting}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all duration-200 ${
            prompt.trim() && !isSubmitting
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
          whileHover={prompt.trim() && !isSubmitting ? { scale: 1.05 } : {}}
          whileTap={prompt.trim() && !isSubmitting ? { scale: 0.95 } : {}}
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          ) : (
            <Send className="w-5 h-5" />
          )}
        </motion.button>
      </div>
      
      {isSubmitting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-slate-600"
        >
          <div className="flex items-center justify-center space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
          </div>
          <p className="mt-2 text-sm">Analyzing your requirements...</p>
        </motion.div>
      )}
    </motion.form>
  )
}