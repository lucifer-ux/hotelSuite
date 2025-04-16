"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, X } from "lucide-react"
import { useState } from "react"

interface WelcomeSectionProps {
  name: string
}

export default function WelcomeSection({ name }: WelcomeSectionProps) {
  const [showQuickDial, setShowQuickDial] = useState(false)

  const quickDialOptions = [
    { name: "Room Service", number: "100" },
    { name: "Housekeeping", number: "101" },
    { name: "Front Desk", number: "102" },
    { name: "Concierge", number: "103" },
    { name: "Emergency", number: "911" },
  ]

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Welcome, {name}!</h1>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 border-blue-600 text-blue-600"
            onClick={() => setShowQuickDial(true)}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Quick Dial</span>
          </Button>
        </div>
        <p className="text-gray-600 mt-2">We're delighted to have you as our guest. Enjoy your stay with us!</p>

        {showQuickDial && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Quick Dial Services</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowQuickDial(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {quickDialOptions.map((option, index) => (
                  <a
                    key={index}
                    href={`tel:${option.number}`}
                    className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{option.name}</span>
                    <span className="text-blue-600 text-sm">Ext. {option.number}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
