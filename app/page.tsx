"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FileText,
  MessageCircle,
  Volume2,
  Shield,
  Sparkles,
  Zap,
  Upload,
  Send,
  Paperclip,
  Menu,
  X,
  Plus,
  Search,
  Settings,
  User,
  Star,
  Folder,
  Clock,
  CheckCircle,
  Hash,
  Edit3,
  Trash2,
  Palette,
  Sun,
  Moon,
  Save,
  Heart,
  FileSearch,
  MessageSquare,
  Mic,
  Lock,
  Globe,
  Cpu,
  Database,
  BarChart3,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  file?: {
    name: string
    type: string
    size: number
  }
}

interface ChatHistory {
  id: string
  title: string
  date: Date
  category: string
  starred: boolean
}

interface Space {
  id: string
  name: string
  color: string
  icon: string
  chatCount: number
  createdAt: Date
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false) // Sidebar hidden by default
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "features" | "signin" | "signup">("home")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [signInLoading, setSignInLoading] = useState(false)
  const [signUpLoading, setSignUpLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [spaces, setSpaces] = useState<Space[]>([
    {
      id: "1",
      name: "Legal Contracts",
      color: "bg-blue-600",
      icon: "FileText",
      chatCount: 12,
      createdAt: new Date("2025-01-10"),
    },
    {
      id: "2", 
      name: "Patent Research",
      color: "bg-green-600",
      icon: "Search",
      chatCount: 8,
      createdAt: new Date("2025-01-08"),
    },
    {
      id: "3",
      name: "Compliance Docs",
      color: "bg-purple-600",
      icon: "Shield",
      chatCount: 15,
      createdAt: new Date("2025-01-05"),
    },
  ])
  const [showCreateSpace, setShowCreateSpace] = useState(false)
  const [newSpaceName, setNewSpaceName] = useState("")
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showSpaceCustomizer, setShowSpaceCustomizer] = useState(false)
  const [selectedSpaceColor, setSelectedSpaceColor] = useState("bg-blue-500")
  const [selectedSpaceIcon, setSelectedSpaceIcon] = useState("Hash")
  const [chatHistory] = useState<ChatHistory[]>([
    {
      id: "1",
      title: "Contract Analysis - NDA Agreement",
      date: new Date("2025-01-15"),
      category: "Contracts",
      starred: true,
    },
    {
      id: "2",
      title: "Patent Review - Tech Innovation",
      date: new Date("2025-01-14"),
      category: "Patents",
      starred: false,
    },
    {
      id: "3",
      title: "Legal Brief - Employment Law",
      date: new Date("2025-01-13"),
      category: "Legal Briefs",
      starred: true,
    },
    {
      id: "4",
      title: "Terms of Service Analysis",
      date: new Date("2025-01-12"),
      category: "Contracts",
      starred: false,
    },
  ])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    
    // Check for saved dark mode preference or default to light mode
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "\\") {
        e.preventDefault()
        setSidebarOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsExpanded(true)
    setIsTyping(true)
    setIsFullScreen(true)

    // Simulate AI response with more realistic legal content
    setTimeout(() => {
      const responses = [
        `I understand you're asking about "${inputValue}". Based on my analysis of legal documents, I can help you with contract review, compliance checking, and legal research. Would you like me to analyze a specific document or provide guidance on legal terminology?`,
        `Regarding "${inputValue}", I can provide detailed legal analysis including risk assessment, clause interpretation, and regulatory compliance. I've processed thousands of legal documents and can offer insights on best practices and potential issues.`,
        `For your query about "${inputValue}", I can assist with document summarization, legal precedent research, and contract negotiation points. My AI analysis covers multiple jurisdictions and practice areas. How can I help you further?`,
      ]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ]

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF, DOCX, or IMAGE file.")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsUploading(false)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `Uploaded document: ${file.name}`,
      timestamp: new Date(),
      file: {
        name: file.name,
        type: file.type,
        size: file.size,
      },
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, userMessage])
      setIsExpanded(true)
      setIsTyping(true)
    }, 1000)

    // Enhanced AI processing simulation
    setTimeout(() => {
      const analysisResults = [
        `I've successfully processed your document "${file.name}". Here's my comprehensive analysis:\n\n• Document contains ${Math.floor(Math.random() * 50 + 10)} pages of legal content\n• Identified ${Math.floor(Math.random() * 5 + 3)} key contract terms and ${Math.floor(Math.random() * 3 + 1)} potential risk areas\n• Compliance status: ${Math.random() > 0.3 ? "Compliant" : "Requires attention"}\n• Estimated review time: ${Math.floor(Math.random() * 30 + 15)} minutes\n\nKey findings include liability clauses, payment terms, and termination conditions. Would you like me to explain any specific section in detail?`,
        `Document analysis complete for "${file.name}":\n\n• Legal document type: ${file.name.includes("contract") ? "Service Agreement" : file.name.includes("nda") ? "Non-Disclosure Agreement" : "Legal Document"}\n• Risk assessment: ${Math.random() > 0.5 ? "Low risk" : "Medium risk"} - ${Math.floor(Math.random() * 3 + 1)} areas flagged for review\n• Key provisions identified: ${Math.floor(Math.random() * 8 + 5)} clauses analyzed\n• Regulatory compliance: Meets current standards\n\nI've highlighted important sections including indemnification, governing law, and dispute resolution. What specific aspects would you like me to elaborate on?`,
      ]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: analysisResults[Math.floor(Math.random() * analysisResults.length)],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 3000)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleFileTypeClick = (fileType: string) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = fileType === "PDF" ? ".pdf" : fileType === "DOCX" ? ".docx" : ".img"
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement
      handleFileUpload(target.files)
    }
    input.click()
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignInLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setSignInLoading(false)
      setCurrentPage("home")
      // Show success message
      alert("Successfully signed in!")
    }, 2000)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    setSignUpLoading(true)

    // Simulate registration
    setTimeout(() => {
      setSignUpLoading(false)
      setCurrentPage("home")
      // Show success message
      alert("Successfully signed up!")
    }, 2000)
  }

  const handleSocialSignIn = (provider: string) => {
    setSignInLoading(true)
    // Simulate OAuth flow
    setTimeout(() => {
      setSignInLoading(false)
      setCurrentPage("home")
      alert(`Successfully signed in with ${provider}!`)
    }, 1500)
  }

  const handleCreateSpace = () => {
    if (!newSpaceName.trim()) return
    
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-orange-500", "bg-teal-500"]
    const icons = ["Hash", "FileText", "Search", "Shield", "Folder", "Star"]
    const newSpace: Space = {
      id: Date.now().toString(),
      name: newSpaceName,
      color: colors[Math.floor(Math.random() * colors.length)],
      icon: icons[Math.floor(Math.random() * icons.length)],
      chatCount: 0,
      createdAt: new Date(),
    }
    
    setSpaces(prev => [newSpace, ...prev])
    setNewSpaceName("")
    setShowCreateSpace(false)
  }

  const handleDeleteSpace = (spaceId: string) => {
    setSpaces(prev => prev.filter(space => space.id !== spaceId))
    if (selectedSpace === spaceId) {
      setSelectedSpace(null)
    }
  }

  const handleCloseFullScreen = () => {
    setIsFullScreen(false)
  }

  const handleExpandToHalfScreen = () => {
    setIsFullScreen(false)
    setIsExpanded(true)
  }

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleCreateSpaceWithCustomization = () => {
    if (!newSpaceName.trim()) return
    
    const newSpace: Space = {
      id: Date.now().toString(),
      name: newSpaceName,
      color: selectedSpaceColor,
      icon: selectedSpaceIcon,
      chatCount: 0,
      createdAt: new Date(),
    }
    
    setSpaces(prev => [newSpace, ...prev])
    setNewSpaceName("")
    setShowCreateSpace(false)
    setShowSpaceCustomizer(false)
  }

  const spaceColors = [
    "bg-blue-600", "bg-green-600", "bg-purple-600", "bg-pink-600", 
    "bg-orange-600", "bg-teal-600", "bg-red-600", "bg-indigo-600"
  ]

  const spaceIcons = [
    "Hash", "FileText", "Search", "Shield", "Folder", "Star", 
    "MessageCircle", "Settings", "User", "Globe", "Zap", "Heart"
  ]

  // Icon mapping to avoid eval()
  const iconMap: { [key: string]: any } = {
    Hash,
    FileText,
    Search,
    Shield,
    Folder,
    Star,
    MessageCircle,
    Settings,
    User,
    Globe,
    Zap,
    Heart
  }

  const renderHomePage = () => (
    <>
      {/* Hero section */}
      <section className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Main headline */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 glass-subtle px-4 py-2 rounded-full text-sm text-muted-foreground">
              AI-Powered Legal Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl font-light text-foreground leading-tight text-balance">
              Simplify Complex
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Legal Documents
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance">
              Transform dense legal text into clear, understandable summaries with AI-powered analysis, interactive Q&A,
              and voice guidance.
            </p>
          </div>

          <div
            className={`chat-container mx-auto depth-2 transition-all duration-700 ease-out relative ${
              isFullScreen 
                ? "w-full h-screen rounded-none p-0 animate-fullscreen-expand" 
                : isExpanded 
                  ? "max-w-2xl rounded-3xl p-6 md:p-8 animate-fade-in-up-delayed" 
                  : "max-w-2xl rounded-3xl p-8 md:p-12 animate-fade-in-up-delayed"
            }`}
          >
            {/* Full-screen control buttons */}
            {isFullScreen && (
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleExpandToHalfScreen}
                  className="glass-subtle hover:glow-subtle"
                  title="Expand to half screen"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseFullScreen}
                  className="glass-subtle hover:glow-subtle"
                  title="Close full screen"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            {/* Upload progress indicator */}
            {isUploading && (
              <div className="mb-6 glass-subtle rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-foreground">Processing document...</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{Math.round(uploadProgress)}% complete</p>
              </div>
            )}

            {/* Chat messages */}
            {isExpanded && messages.length > 0 && (
              <div className={`chat-messages-container space-y-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent ${
                isFullScreen ? "h-[calc(100vh-120px)] p-6" : "mb-6 max-h-96"
              }`}>
                {messages.map((message) => (
                  <div key={message.id} className="flex justify-start">
                    <div
                      className={`chat-bubble ${
                        message.type === "user" ? "chat-bubble-user" : "chat-bubble-bot"
                      }`}
                    >
                      {message.file && (
                        <div className="flex items-center gap-2 mb-2 text-sm opacity-80">
                          <FileText className="w-4 h-4" />
                          <span>{message.file.name}</span>
                          <span className="text-xs">({(message.file.size / 1024 / 1024).toFixed(1)}MB)</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                      <div className="text-xs opacity-60 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="chat-bubble chat-bubble-bot">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Chat input */}
            <div
              className={`${isFullScreen ? "chat-input-container" : "relative"} ${dragActive ? "ring-2 ring-primary ring-opacity-50" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <form onSubmit={handleSubmit} className={isFullScreen ? "space-y-0" : "space-y-4"}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder={
                        messages.length === 0
                          ? "Ask me about legal documents or upload a file..."
                          : "Continue the conversation..."
                      }
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className={`border-0 h-14 text-lg placeholder:text-muted-foreground/70 pr-12 focus:glow-subtle transition-all duration-300 ${
                        isFullScreen ? "bg-muted/50 border border-border" : "glass-subtle"
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-muted/50"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="w-5 h-5 text-muted-foreground" />
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className={`h-14 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium group transition-all duration-300 ${
                      isFullScreen ? "" : "glow-primary"
                    }`}
                    disabled={!inputValue.trim()}
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {messages.length === 0 && !isFullScreen && (
                  <div className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Start a conversation or drag & drop your legal documents
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                      <button
                        onClick={() => handleFileTypeClick("PDF")}
                        className="glass-subtle px-3 py-1 rounded-full hover:glow-subtle transition-all duration-300 cursor-pointer"
                      >
                        PDF
                      </button>
                      <button
                        onClick={() => handleFileTypeClick("DOCX")}
                        className="glass-subtle px-3 py-1 rounded-full hover:glow-subtle transition-all duration-300 cursor-pointer"
                      >
                        DOCX
                      </button>
                      <button
                        onClick={() => handleFileTypeClick("IMAGE")}
                        className="glass-subtle px-3 py-1 rounded-full hover:glow-subtle transition-all duration-300 cursor-pointer"
                      >
                        IMAGE
                      </button>
                    </div>
                  </div>
                )}
              </form>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.img"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />

              {dragActive && (
                <div className={`absolute inset-0 glass-strong flex items-center justify-center border-2 border-dashed border-primary/50 ${
                  isFullScreen ? "rounded-none" : "rounded-2xl"
                }`}>
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-primary font-medium">Drop your document here</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Feature highlights */}
          {!isFullScreen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-fade-in-up-delayed-2">
            <div className="glass rounded-3xl p-8 text-center group hover:depth-1 transition-all duration-500">
              <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:glow-subtle transition-all duration-300">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Smart Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload PDFs, DOCX, and IMAGE files for instant AI-powered document analysis and summarization
              </p>
            </div>

            <div className="glass rounded-3xl p-8 text-center group hover:depth-1 transition-all duration-500">
              <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:glow-subtle transition-all duration-300">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Interactive Q&A</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ask questions about your documents and get context-aware, intelligent responses
              </p>
            </div>

            <div className="glass rounded-3xl p-8 text-center group hover:depth-1 transition-all duration-500">
              <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:glow-subtle transition-all duration-300">
                <Volume2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Voice Integration</h3>
              <p className="text-muted-foreground leading-relaxed">
                High-quality audio output and voice commands for enhanced accessibility
              </p>
            </div>
          </div>
          )}
        </div>
      </section>

      {/* Trust indicators */}
      {!isFullScreen && (
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-subtle rounded-3xl p-8">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Intelligent Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Multilingual Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
        )}
    </>
  )

  const renderAboutPage = () => (
    <section className="flex-1 px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage("home")}
              className="glass-subtle hover:glow-subtle"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chat
            </Button>
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-foreground mb-6">
            What We{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Do</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            LegalAI transforms complex legal documents into clear, actionable insights using advanced artificial
            intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up-delayed">
          <div className="glass rounded-3xl p-8 group hover:depth-1 transition-all duration-500">
            <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mb-6 group-hover:glow-subtle transition-all duration-300">
              <FileSearch className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Smart Document Analysis</h3>
            <p className="text-muted-foreground leading-relaxed">
              Advanced AI algorithms analyze legal documents to extract key information, identify important clauses, and
              highlight potential risks or opportunities with 99.7% accuracy.
            </p>
          </div>

          <div className="glass rounded-3xl p-8 group hover:depth-1 transition-all duration-500">
            <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mb-6 group-hover:glow-subtle transition-all duration-300">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Interactive Q&A System</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ask specific questions about your legal documents and receive detailed, context-aware answers that help
              you understand complex legal language and implications.
            </p>
          </div>

          <div className="glass rounded-3xl p-8 group hover:depth-1 transition-all duration-500">
            <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mb-6 group-hover:glow-subtle transition-all duration-300">
              <Mic className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Voice Integration & Audio Output</h3>
            <p className="text-muted-foreground leading-relaxed">
              Listen to document summaries and interact with the AI using voice commands for a hands-free, accessible
              experience with natural language processing.
            </p>
          </div>

          <div className="glass rounded-3xl p-8 group hover:depth-1 transition-all duration-500">
            <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mb-6 group-hover:glow-subtle transition-all duration-300">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Secure Document Processing</h3>
            <p className="text-muted-foreground leading-relaxed">
              Enterprise-grade security ensures your sensitive legal documents are protected with end-to-end encryption,
              zero-trust architecture, and SOC 2 Type II compliance.
            </p>
          </div>

          <div className="glass rounded-3xl p-8 group hover:depth-1 transition-all duration-500">
            <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mb-6 group-hover:glow-subtle transition-all duration-300">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Multi-format Support</h3>
            <p className="text-muted-foreground leading-relaxed">
              Process legal documents in multiple formats (PDF, DOCX, IMAGE) and languages with accurate translation and
              cultural context understanding for global legal work.
            </p>
          </div>

          <div className="glass rounded-3xl p-8 group hover:depth-1 transition-all duration-500">
            <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mb-6 group-hover:glow-subtle transition-all duration-300">
              <Cpu className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">AI-Powered Insights</h3>
            <p className="text-muted-foreground leading-relaxed">
              Machine learning models trained on millions of legal documents provide intelligent insights, risk
              assessments, and recommendations tailored to your specific needs.
            </p>
          </div>

          <div className="glass rounded-3xl p-8 group hover:depth-1 transition-all duration-500">
            <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mb-6 group-hover:glow-subtle transition-all duration-300">
              <Database className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Legal Knowledge Base</h3>
            <p className="text-muted-foreground leading-relaxed">
              Access a comprehensive legal knowledge base with over 10 million legal precedents, statutes, and
              regulations that provides context and explanations for complex legal concepts.
            </p>
          </div>

          <div className="glass rounded-3xl p-8 group hover:depth-1 transition-all duration-500">
            <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mb-6 group-hover:glow-subtle transition-all duration-300">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Analytics & Reporting</h3>
            <p className="text-muted-foreground leading-relaxed">
              Generate detailed reports and analytics on your legal documents, including risk assessments, compliance
              checks, trend analysis, and performance metrics.
            </p>
          </div>

          <div className="glass rounded-3xl p-8 group hover:depth-1 transition-all duration-500">
            <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center mb-6 group-hover:glow-subtle transition-all duration-300">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Compliance Monitoring</h3>
            <p className="text-muted-foreground leading-relaxed">
              Automatically check documents for compliance with relevant regulations and legal standards across 50+
              jurisdictions, ensuring your documents meet all requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  )

  const renderFeaturesPage = () => (
    <section className="flex-1 px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage("home")}
              className="glass-subtle hover:glow-subtle"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Chat
            </Button>
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-foreground mb-6">
            How It{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Works</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our AI-powered pipeline transforms complex legal documents into clear, actionable insights in seconds
          </p>
        </div>

        <div className="space-y-16 animate-fade-in-up-delayed">
          {/* Process Flow Diagram */}
          <div className="glass-strong rounded-3xl p-12 depth-2">
            <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">AI Processing Pipeline</h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="text-center relative">
                <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center mx-auto mb-6 glow-subtle">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">1. Document Upload</h3>
                <p className="text-sm text-muted-foreground">
                  Secure upload of PDF, DOCX, or IMAGE files with drag-and-drop interface and progress tracking
                </p>
                {/* Connector */}
                <div className="hidden lg:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>

              {/* Step 2 */}
              <div className="text-center relative">
                <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center mx-auto mb-6 glow-subtle">
                  <FileSearch className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">2. Text Extraction</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced OCR and parsing extract text while preserving document structure and formatting
                </p>
                {/* Connector */}
                <div className="hidden lg:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>

              {/* Step 3 */}
              <div className="text-center relative">
                <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center mx-auto mb-6 glow-subtle">
                  <Cpu className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">3. AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Machine learning models analyze content for key insights, risks, and compliance issues
                </p>
                {/* Connector */}
                <div className="hidden lg:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center mx-auto mb-6 glow-subtle">
                  <MessageCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">4. Interactive Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get summaries, ask questions, and receive intelligent responses with citations and explanations
                </p>
              </div>
            </div>
          </div>

          {/* Feature Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass rounded-3xl p-8 group hover:depth-1 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:glow-subtle transition-all duration-300">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Lightning Fast Processing</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Our optimized AI pipeline processes documents in under 10 seconds. Advanced caching and parallel
                    processing ensure rapid results even for complex legal documents.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Sub-10 second response times</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Parallel document processing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Intelligent caching system</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8 group hover:depth-1 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 glass-subtle rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:glow-subtle transition-all duration-300">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">Enterprise Security</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Bank-grade security protects your sensitive legal documents with end-to-end encryption, zero-trust
                    architecture, and comprehensive audit trails.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>End-to-end encryption (AES-256)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Zero-trust architecture</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>SOC 2 Type II compliant</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  const renderSignInPage = () => (
    <section className="flex-1 flex items-center justify-center px-8 py-16">
      <div className="w-full max-w-md">
        <div className="form-container glass-strong rounded-3xl p-8 depth-2 animate-scale-in">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-2xl font-semibold text-foreground">LegalAI</span>
            </div>
            <h1 className="text-3xl font-light text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Continue your legal document analysis journey</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input border-0 h-12 focus:glow-subtle transition-all duration-300"
                  required
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-subtle border-0 h-12 pr-12 focus:glow-subtle transition-all duration-300"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-muted" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <button type="button" className="text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium glow-primary"
              disabled={signInLoading}
            >
              {signInLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or continue with</span>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                className="glass-subtle border-0 h-12 hover:glow-subtle bg-transparent w-full max-w-xs"
                onClick={() => handleSocialSignIn("Google")}
                disabled={signInLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button type="button" className="text-primary hover:underline" onClick={() => setCurrentPage("signup")}>
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-muted/20">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Secure Sign-In • SSL Protected</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage("home")}
            className="glass-subtle hover:glow-subtle"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  )

  const renderSignUpPage = () => (
    <section className="flex-1 flex items-center justify-center px-8 py-16">
      <div className="w-full max-w-md">
        <div className="form-container glass-strong rounded-3xl p-8 depth-2 animate-scale-in">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-2xl font-semibold text-foreground">LegalAI</span>
            </div>
            <h1 className="text-3xl font-light text-foreground mb-2">Create Account</h1>
            <p className="text-muted-foreground">Start your legal document analysis journey</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input border-0 h-12 focus:glow-subtle transition-all duration-300"
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input border-0 h-12 focus:glow-subtle transition-all duration-300"
                  required
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-subtle border-0 h-12 pr-12 focus:glow-subtle transition-all duration-300"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input border-0 h-12 focus:glow-subtle transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-muted" required />
              <span className="text-muted-foreground">
                I agree to the{" "}
                <button type="button" className="text-primary hover:underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="text-primary hover:underline">
                  Privacy Policy
                </button>
              </span>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium glow-primary"
              disabled={signUpLoading}
            >
              {signUpLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or continue with</span>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                className="glass-subtle border-0 h-12 hover:glow-subtle bg-transparent w-full max-w-xs"
                onClick={() => handleSocialSignIn("Google")}
                disabled={signUpLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button type="button" className="text-primary hover:underline" onClick={() => setCurrentPage("signin")}>
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-muted/20">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Secure Registration • SSL Protected</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage("home")}
            className="glass-subtle hover:glow-subtle"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  )

  if (!mounted) return null

  return (
    <main className="min-h-screen relative overflow-hidden flex dark-mode-transition">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-out ${
          sidebarOpen 
            ? "w-80 translate-x-0" 
            : "w-0 -translate-x-full"
        }`}
      >
        <div className="h-full glass-strong backdrop-blur-xl border-r border-white/10">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="glass-subtle hover:glow-subtle transition-all duration-300"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              {sidebarOpen && (
                <Button className="glass bg-primary/20 hover:bg-primary/30 text-primary border-primary/30">
                  <Plus className="w-4 h-4 mr-2" />
                  New Chat
                </Button>
              )}
            </div>
          </div>

          {sidebarOpen && (
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* User Profile */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 glass-subtle rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Legal Professional</p>
                    <p className="text-xs text-muted-foreground truncate">user@example.com</p>
                  </div>
                  <Button variant="ghost" size="icon" className="glass-subtle hover:glow-subtle">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Search */}
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search chats..."
                    className="glass-subtle border-0 pl-10 h-10 text-sm focus:glow-subtle"
                  />
                </div>
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recent</span>
                  </div>

                  {chatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      className="glass-subtle rounded-xl p-3 hover:bg-white/10 cursor-pointer transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-3 h-3 text-primary flex-shrink-0" />
                            <p className="text-xs font-medium text-foreground truncate">{chat.title}</p>
                            {chat.starred && <Star className="w-3 h-3 text-yellow-500 fill-current flex-shrink-0" />}
                          </div>
                          <p className="text-xs text-muted-foreground">{chat.date.toLocaleDateString()}</p>
                          <span className="inline-block text-xs text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full mt-1">
                            {chat.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Spaces */}
                <div className="mt-8 space-y-2">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Spaces
                    </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCreateSpace(!showCreateSpace)}
                      className="h-6 w-6 p-0 glass-subtle hover:glow-subtle"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Create Space Input */}
                  {showCreateSpace && (
                    <div className="glass-subtle rounded-lg p-3 mb-2 animate-fade-in">
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Space name..."
                            value={newSpaceName}
                            onChange={(e) => setNewSpaceName(e.target.value)}
                            className="h-8 text-sm border-0 bg-transparent focus:glow-subtle"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCreateSpaceWithCustomization()
                              if (e.key === 'Escape') setShowCreateSpace(false)
                            }}
                            autoFocus
                          />
                          <Button
                            size="sm"
                            onClick={() => setShowSpaceCustomizer(!showSpaceCustomizer)}
                            className="h-8 px-3 glass-subtle hover:glow-subtle"
                          >
                            <Palette className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleCreateSpaceWithCustomization}
                            className="h-8 px-3 bg-primary hover:bg-primary/90"
                          >
                            <Save className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        {/* Space Customization */}
                        {showSpaceCustomizer && (
                          <div className="space-y-2 animate-fade-in">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">Color:</span>
                              <div className="flex gap-1">
                                {spaceColors.map((color) => (
                                  <button
                                    key={color}
                                    onClick={() => setSelectedSpaceColor(color)}
                                    className={`w-4 h-4 rounded-full ${color} ${
                                      selectedSpaceColor === color ? 'ring-2 ring-white' : ''
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">Icon:</span>
                              <div className="flex gap-1 flex-wrap">
                                {spaceIcons.slice(0, 8).map((iconName) => {
                                  const IconComponent = iconMap[iconName]
                                  return (
                                    <button
                                      key={iconName}
                                      onClick={() => setSelectedSpaceIcon(iconName)}
                                      className={`w-6 h-6 rounded flex items-center justify-center ${
                                        selectedSpaceIcon === iconName ? 'bg-primary text-primary-foreground' : 'glass-subtle'
                                      }`}
                                    >
                                      <IconComponent className="w-3 h-3" />
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Spaces List */}
                  <div className="space-y-1">
                    {spaces.map((space) => (
                      <div
                        key={space.id}
                        className={`glass-subtle rounded-lg p-3 hover:bg-white/10 cursor-pointer transition-all duration-200 group ${
                          selectedSpace === space.id ? 'ring-2 ring-primary/50 bg-primary/10' : ''
                        }`}
                        onClick={() => setSelectedSpace(selectedSpace === space.id ? null : space.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded flex items-center justify-center ${space.color}`}>
                              {(() => {
                                const IconComponent = iconMap[space.icon]
                                return IconComponent ? <IconComponent className="w-3 h-3 text-white drop-shadow-sm" /> : <Hash className="w-3 h-3 text-white drop-shadow-sm" />
                              })()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{space.name}</p>
                              <p className="text-xs text-muted-foreground">{space.chatCount} chats</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-red-500/20"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteSpace(space.id)
                              }}
                            >
                              <Trash2 className="w-3 h-3 text-red-400" />
                            </Button>
                          </div>
                        </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-white/10 space-y-2">
                <Button variant="ghost" className="w-full justify-start glass-subtle hover:glow-subtle text-sm">
                  <span>Clear History</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start glass-subtle hover:glow-subtle text-sm">
                  <span>Help & Support</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-out ${
        sidebarOpen 
          ? "md:ml-80" 
          : ""
      }`}>
        {/* Ambient background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-32 w-56 h-56 bg-gradient-to-br from-muted/20 to-transparent rounded-full blur-3xl animate-float-delayed" />
        </div>

        {/* Main content container */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="p-8 animate-fade-in-up">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentPage("home")}
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <span className="text-xl font-semibold text-foreground">LegalAI</span>
                </button>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <button
                  onClick={() => setCurrentPage("features")}
                  className={`transition-colors ${currentPage === "features" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Features
                </button>
                <button
                  onClick={() => setCurrentPage("about")}
                  className={`transition-colors ${currentPage === "about" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  About
                </button>
                <Button variant="ghost" className="glass-subtle" onClick={() => setCurrentPage("signin")}>
                  Sign In
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  className="glass-subtle hover:glow-subtle transition-all duration-300"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
              </nav>
            </div>
          </header>

          {/* Page Content */}
          {currentPage === "home" && renderHomePage()}
          {currentPage === "about" && renderAboutPage()}
          {currentPage === "features" && renderFeaturesPage()}
          {currentPage === "signin" && renderSignInPage()}
          {currentPage === "signup" && renderSignUpPage()}

          {/* Footer */}
          <footer className="p-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">© 2025 LegalAI. All rights reserved.</span>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="glass-subtle hover:glow-subtle transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </Button>
                <div className="text-xs text-muted-foreground">
                  <span>Privacy Policy • Terms of Service • Legal Disclaimer</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  )
}
