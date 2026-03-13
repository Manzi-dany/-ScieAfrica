'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

// Simple AI responses based on keywords
const getBotResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase()
  
  // Greetings
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! Welcome to SciAfrica! I'm here to help you explore African science and innovation. How can I assist you today?"
  }
  
  // About SciAfrica
  if (message.includes('what is sciafrica') || message.includes('about') || message.includes('who are you')) {
    return "SciAfrica is a platform showcasing groundbreaking research, innovations, and scientific breakthroughs from across Africa. We cover agriculture, health, biotechnology, AI, and emerging technologies transforming the continent."
  }
  
  // Scientists
  if (message.includes('scientist') || message.includes('researcher') || message.includes('profile')) {
    return "You can explore profiles of leading African scientists on our Scientists page. We feature researchers in biotechnology, agriculture, health, AI, and more. Would you like me to guide you there?"
  }
  
  // Articles/Blog
  if (message.includes('article') || message.includes('blog') || message.includes('news') || message.includes('research')) {
    return "We publish articles on the latest African scientific discoveries. Check out our Blog section for stories on agriculture, health, biotech, and emerging technologies. Is there a specific topic you're interested in?"
  }
  
  // Innovations
  if (message.includes('innovation') || message.includes('startup') || message.includes('technology')) {
    return "Our Innovations section highlights African startups and technological breakthroughs. From fintech to agritech, discover how African innovators are solving continental challenges!"
  }
  
  // Agriculture
  if (message.includes('agriculture') || message.includes('farming') || message.includes('crop')) {
    return "African agriculture is being transformed by innovations like drought-resistant crops, precision farming, and agtech solutions. Check our Agriculture section for the latest developments!"
  }
  
  // Health
  if (message.includes('health') || message.includes('medical') || message.includes('medicine') || message.includes('disease')) {
    return "African health innovation includes mRNA vaccine development, telemedicine platforms, AI-powered diagnostics, and digital health solutions. Explore our Health section to learn more!"
  }
  
  // Contact
  if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
    return "You can reach us through our Contact page. We'd love to hear from you! Whether you're a researcher, journalist, or just curious about African science."
  }
  
  // Help
  if (message.includes('help') || message.includes('support') || message.includes('assist')) {
    return "I can help you navigate SciAfrica! Try asking about:\n• Scientists and researchers\n• Latest articles and news\n• African innovations\n• Agriculture or Health topics\n• How to contact us\n\nWhat would you like to explore?"
  }
  
  // Default response
  return "That's an interesting question! SciAfrica covers various topics including African scientists, innovations, agriculture, health, and emerging technologies. Could you tell me more about what you're looking for? Or type 'help' to see what I can assist with."
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hello! I'm SciAfrica's AI assistant. How can I help you explore African science and innovation today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-background rounded-2xl shadow-2xl border border-border flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">SciAfrica Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/20 p-1 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user'
                      ? 'bg-secondary'
                      : 'bg-primary'
                  }`}
                >
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-secondary-foreground" />
                  ) : (
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                    message.sender === 'user'
                      ? 'bg-secondary text-secondary-foreground rounded-tr-none'
                      : 'bg-muted text-foreground rounded-tl-none'
                  }`}
                >
                  {message.text.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted p-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about SciAfrica..."
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
