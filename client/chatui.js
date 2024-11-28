'use client'

import React, { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-montserrat',
})

export default function ChatUI() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi! How can I help you?", 
      sender: 'bot',
      timestamp: '11:23 PM'
    },
    {
      id: 2,
      text: "I'm looking for a new laptop. Can you help me?",
      sender: 'user',
      timestamp: '11:24 PM'
    },
    {
      id: 3,
      text: "Of course! I'd be happy to help you find the perfect laptop. Do you have any specific requirements or preferences?",
      sender: 'bot',
      timestamp: '11:25 PM'
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const toggleChat = () => setIsOpen(!isOpen)

  function queryStackAI(message: string) {
    const data = {
      "user_id": "<USER or Conversation ID>",
      "in-0": message
    }
  }

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      const now = new Date()
      const timestamp = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
      setMessages([...messages, { 
        id: messages.length + 1, 
        text: inputMessage, 
        sender: 'user',
        timestamp 
      }])
      setInputMessage('')
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          text: "Great! I'll help you find the perfect laptop. What's your budget range, and what will you primarily use the laptop for?", 
          sender: 'bot',
          timestamp: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        }])
      }, 1000)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 h-[32rem] rounded-2xl shadow-xl overflow-hidden relative">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/logan-weaver-lgnwvr-6oy7dRod-f8-unsplash.jpg"
              alt="Chat background"
              className="object-cover"
              fill
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] to-[#666666] opacity-55"></div>
          </div>

          {/* Chat Interface */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="p-4 flex justify-between items-center bg-[#1E362F] backdrop-blur-md">

              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className={montserrat.className}>JV</AvatarFallback>
                </Avatar>
                <h2 className={`${montserrat.className} text-lg font-semibold text-white`}>Javi Chat</h2>
              </div>
              <button onClick={toggleChat} className="text-white hover:text-gray-200">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex flex-col max-w-[80%] space-y-1">
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/80 backdrop-blur-sm text-black'
                      }`}
                    >
                      {message.text}
                    </div>
                    <span className="text-xs text-gray-300 px-1">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/10 backdrop-blur-md">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow p-2 rounded-full bg-white/80 backdrop-blur-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
                  onClick={() => queryStackAI(inputMessage)}
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}