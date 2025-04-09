"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { format, parseISO } from "date-fns"

interface CheckoutSectionProps {
  checkIn: string
  checkOut: string
}

export default function CheckoutSection({ checkIn, checkOut }: CheckoutSectionProps) {
  const [showExtendModal, setShowExtendModal] = useState(false)

  const checkInDate = parseISO(checkIn)
  const checkOutDate = parseISO(checkOut)

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar className="h-5 w-5 text-blue-600 mr-2" />
          Your Stay
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Check-in</p>
              <p className="font-medium text-gray-800">{format(checkInDate, "MMM d, yyyy")}</p>
              <p className="text-sm text-gray-600">{format(checkInDate, "h:mm a")}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Check-out</p>
              <p className="font-medium text-gray-800">{format(checkOutDate, "MMM d, yyyy")}</p>
              <p className="text-sm text-gray-600">{format(checkOutDate, "h:mm a")}</p>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              variant="outline"
              className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => setShowExtendModal(true)}
            >
              Extend Stay
            </Button>
            <Button variant="default" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Check Out Now
            </Button>
          </div>
        </div>

        {showExtendModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">Extend Your Stay</h3>
              <p className="text-gray-600 mb-4">How many additional nights would you like to stay?</p>
              <div className="flex justify-between space-x-2 mb-4">
                {[1, 2, 3].map((nights) => (
                  <Button key={nights} variant="outline" className="flex-1">
                    {nights} {nights === 1 ? "Night" : "Nights"}
                  </Button>
                ))}
              </div>
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowExtendModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="default"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowExtendModal(false)}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
