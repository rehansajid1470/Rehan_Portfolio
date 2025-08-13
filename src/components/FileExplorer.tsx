'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Folder, 
  FileText, 
  FileCode, 
  ChevronRight, 
  ChevronDown,
  Search,
  Edit3,
  Eye,
  Download
} from 'lucide-react'

interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  path: string
  children?: FileNode[]
  content?: string
  language?: string
}

const fileTree: FileNode[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    path: 'src',
    children: [
      {
        id: '2',
        name: 'app',
        type: 'folder',
        path: 'src/app',
        children: [
          {
            id: '3',
            name: 'layout.tsx',
            type: 'file',
            path: 'src/app/layout.tsx',
            content: `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NovaCode AI Writing Platform',
  description: 'Enterprise-grade AI writing platform with chat, file uploads, and analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}`,
            language: 'typescript'
          },
          {
            id: '4',
            name: 'page.tsx',
            type: 'file',
            path: 'src/app/page.tsx',
            content: `'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

  // ... rest of component
}`,
            language: 'typescript'
          },
          {
            id: '5',
            name: 'globals.css',
            type: 'file',
            path: 'src/app/globals.css',
            content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}`,
            language: 'css'
          }
        ]
      },
      {
        id: '6',
        name: 'components',
        type: 'folder',
        path: 'src/components',
        children: [
          {
            id: '7',
            name: 'PromptInput.tsx',
            type: 'file',
            path: 'src/components/PromptInput.tsx',
            content: `'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'

interface PromptInputProps {
  onSubmit: (prompt: string) => void
}

export default function PromptInput({ onSubmit }: PromptInputProps) {
  const [prompt, setPrompt] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ... component implementation
}`,
            language: 'typescript'
          },
          {
            id: '8',
            name: 'ChatInterface.tsx',
            type: 'file',
            path: 'src/components/ChatInterface.tsx',
            content: `'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Upload } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

// ... component implementation`,
            language: 'typescript'
          }
        ]
      }
    ]
  },
  {
    id: '9',
    name: 'package.json',
    type: 'file',
    path: 'package.json',
    content: `{
  "name": "ai-writing-platform",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "next": "14.0.0",
    "@stripe/stripe-js": "^2.0.0",
    "stripe": "^14.0.0",
    "lucide-react": "^0.300.0",
    "framer-motion": "^10.16.0",
    "react-hook-form": "^7.48.0",
    "recharts": "^2.8.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "tailwindcss": "^3.3.0",
    "eslint": "^8",
    "eslint-config-next": "14.0.0"
  }
}`,
    language: 'json'
  },
  {
    id: '10',
    name: 'tailwind.config.js',
    type: 'file',
    path: 'tailwind.config.js',
    content: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
}`,
    language: 'javascript'
  }
]

export default function FileExplorer() {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['1', '2', '6']))
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const renderFileNode = (node: FileNode, level: number = 0) => {
    const isExpanded = expandedFolders.has(node.id)
    const isSelected = selectedFile?.id === node.id

    return (
      <div key={node.id}>
        <motion.div
          className={`flex items-center py-1 px-2 rounded-md cursor-pointer transition-colors ${
            isSelected ? 'bg-blue-100 text-blue-900' : 'hover:bg-slate-100'
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id)
            } else {
              setSelectedFile(node)
            }
          }}
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
        >
          {node.type === 'folder' ? (
            <>
              <ChevronRight 
                className={`w-4 h-4 mr-2 transition-transform ${
                  isExpanded ? 'rotate-90' : ''
                }`}
              />
              <Folder className="w-4 h-4 mr-2 text-blue-500" />
            </>
          ) : (
            <FileCode className="w-4 h-4 mr-2 text-green-500" />
          )}
          <span className="text-sm font-medium">{node.name}</span>
        </motion.div>

        {node.type === 'folder' && isExpanded && node.children && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {node.children.map(child => renderFileNode(child, level + 1))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    )
  }

  const getLanguageColor = (language?: string) => {
    switch (language) {
      case 'typescript':
        return 'text-blue-600'
      case 'javascript':
        return 'text-yellow-600'
      case 'css':
        return 'text-purple-600'
      case 'json':
        return 'text-green-600'
      default:
        return 'text-slate-600'
    }
  }

  return (
    <div className="h-full flex">
      {/* File Tree */}
      <div className="w-1/3 border-r border-slate-200 bg-white">
        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {fileTree.map(node => renderFileNode(node))}
        </div>
      </div>

      {/* File Content */}
      <div className="flex-1 bg-slate-50">
        {selectedFile ? (
          <div className="h-full flex flex-col">
            {/* File Header */}
            <div className="p-4 bg-white border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-slate-600" />
                  <div>
                    <h3 className="font-semibold text-slate-900">{selectedFile.name}</h3>
                    <p className="text-sm text-slate-500">{selectedFile.path}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full bg-slate-100 ${getLanguageColor(selectedFile.language)}`}>
                    {selectedFile.language?.toUpperCase()}
                  </span>
                  <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4">
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm font-mono">
                  {selectedFile.content}
                </code>
              </pre>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-slate-500">
              <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium mb-2">No file selected</h3>
              <p className="text-sm">Select a file from the tree to view its contents</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}