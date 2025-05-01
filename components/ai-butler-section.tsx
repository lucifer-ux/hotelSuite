"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Send } from "lucide-react"

interface Message {
  text: string
  isUser: boolean
}

export default function AIButlerSection() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [chatOpen, setChatOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickPrompts = [
    "I need room cleaning",
    "Request extra towels",
    "TV isn't working",
    "Need laundry service",
    "Restaurant recommendations",
    "Checkout process",
  ]

  useEffect(() => {
    if (chatOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, chatOpen])

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { text, isUser: true }])
    setInputValue("")

    // Simulate bot response
    setTimeout(() => {
      let response = "I'll help you with that right away. How else can I assist you today?"

      if (text.toLowerCase().includes("cleaning") || text.toLowerCase().includes("towels")) {
        response =
          "I've notified housekeeping of your request. Someone will be there within 30 minutes. Is there anything else you need?"
      } else if (text.toLowerCase().includes("tv") || text.toLowerCase().includes("working")) {
        response =
          "I'm sorry to hear that. A maintenance technician will come to your room shortly to fix the issue. Would you like me to follow up with you once it's resolved?"
      } else if (text.toLowerCase().includes("laundry")) {
        response =
          "Our laundry service is available from 8 AM to 8 PM. Would you like someone to collect your items now?"
      } else if (
        text.toLowerCase().includes("restaurant") ||
        text.toLowerCase().includes("food") ||
        text.toLowerCase().includes("eat")
      ) {
        response =
          "I'd be happy to recommend some restaurants! Our hotel has The Grand Bistro (French), Sakura (Japanese), and Rooftop Grill (Steakhouse). Would you like me to make a reservation at any of these?"
      } else if (text.toLowerCase().includes("checkout") || text.toLowerCase().includes("check out")) {
        response =
          "Checkout is at 11 AM. You can check out through the app, or visit the front desk. Would you like me to arrange late checkout or help with luggage assistance?"
      } else if (text.toLowerCase().includes("wifi") || text.toLowerCase().includes("internet")) {
        response =
          "Our WiFi network is 'Hotel_Premium' and the password is 'guest2025'. Let me know if you have any connectivity issues."
      }

      setMessages((prev) => [...prev, { text: response, isUser: false }])
    }, 1000)
  }

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
          AI Butler
        </h2>

        <div className="text-gray-600 mb-4">
          Your personal AI assistant is here to help with any requests or questions during your stay.
        </div>

        <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setChatOpen(true)}>
          Chat with AI Butler
        </Button>

        {chatOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="bg-blue-600 text-white p-4 flex items-center">
              <Button variant="ghost" size="sm" className="text-white p-0 mr-2" onClick={() => setChatOpen(false)}>
                &larr;
              </Button>
              <h3 className="font-semibold">AI Butler</h3>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 my-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Hello! I'm your AI Butler. How can I assist you during your stay?</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.isUser
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <div className="p-4 border-t">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleSendMessage(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>

              <div className="flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(inputValue)
                    }
                  }}
                />
                <Button className="rounded-l-none bg-blue-600" onClick={() => handleSendMessage(inputValue)}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
