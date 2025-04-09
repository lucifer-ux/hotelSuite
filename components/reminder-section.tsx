"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Bell, Coffee, Utensils, Shirt, FishIcon as Swim } from "lucide-react"

export default function ReminderSection() {
  const [reminders, setReminders] = useState({
    breakfast: true,
    dinner: false,
    laundry: false,
    pool: false,
  })

  const handleToggle = (key: keyof typeof reminders) => {
    setReminders((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Bell className="h-5 w-5 text-blue-600 mr-2" />
          Reminders
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Coffee className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">Breakfast Buffet</span>
            </div>
            <Switch checked={reminders.breakfast} onCheckedChange={() => handleToggle("breakfast")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Utensils className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">Dinner Reservation</span>
            </div>
            <Switch checked={reminders.dinner} onCheckedChange={() => handleToggle("dinner")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shirt className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">Laundry Service</span>
            </div>
            <Switch checked={reminders.laundry} onCheckedChange={() => handleToggle("laundry")} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Swim className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">Pool Hours</span>
            </div>
            <Switch checked={reminders.pool} onCheckedChange={() => handleToggle("pool")} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
