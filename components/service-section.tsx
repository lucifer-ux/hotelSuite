"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare, Utensils, Shirt, Wrench, MouseIcon as Mop, Send } from "lucide-react"

interface ServiceContact {
  name: string
  icon: React.ReactNode
  number: string
}

export default function ServiceSection() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [inputValue, setInputValue] = useState("")

  const serviceContacts: ServiceContact[] = [
    {
      name: "Room Service",
      icon: <Utensils className="h-5 w-5" />,
      number: "100",
    },
    {
      name: "Housekeeping",
      icon: <Mop className="h-5 w-5" />,
      number: "101",
    },
    {
      name: "Maintenance",
      icon: <Wrench className="h-5 w-5" />,
      number: "102",
    },
    {
      name: "Laundry",
      icon: <Shirt className="h-5 w-5" />,
      number: "103",
    },
  ]

  const quickPrompts = ["I need room cleaning", "Request extra towels", "TV isn't working", "Need laundry service"]

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { text, isUser: true }])
    setInputValue("")

    // Simulate bot response
    setTimeout(() => {
      let response = "I'll help you with that right away. A staff member will assist you shortly."

      if (text.includes("cleaning") || text.includes("towels")) {
        response = "I've notified housekeeping of your request. Someone will be there within 30 minutes."
      } else if (text.includes("TV") || text.includes("working")) {
        response = "I'm sorry to hear that. A maintenance technician will come to your room shortly to fix the issue."
      } else if (text.includes("laundry")) {
        response =
          "Our laundry service is available from 8 AM to 8 PM. Would you like someone to collect your items now?"
      }

      setMessages((prev) => [...prev, { text: response, isUser: false }])
    }, 1000)
  }

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          {/* <Phone className="h-5 w-5 text-blue-600 mr-2" /> */}
          Online Butler
        </h2>

        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={() => setChatOpen(true)}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Chat with Butler
          </Button>
        </div>

        {chatOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="bg-blue-600 text-white p-4 flex items-center">
              <Button variant="ghost" size="sm" className="text-white p-0 mr-2" onClick={() => setChatOpen(false)}>
                &larr;
              </Button>
              <h3 className="font-semibold">Service Assistant</h3>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 my-8">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>How can we help you today?</p>
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
                <Button className="rounded-l-none" onClick={() => handleSendMessage(inputValue)}>
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
