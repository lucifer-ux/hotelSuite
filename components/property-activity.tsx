"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Activity {
  id: number
  name: string
  description: string
  time: string
  location: string
  price: string | null
  isFree: boolean
}

export default function PropertyActivities() {
  const [expanded, setExpanded] = useState(false)

  const activities: Activity[] = [
    {
      id: 1,
      name: "Morning Yoga",
      description: "Start your day with a relaxing yoga session by the pool.",
      time: "7:00 AM - 8:00 AM",
      location: "Pool Deck",
      price: null,
      isFree: true,
    },
    {
      id: 2,
      name: "Wine Tasting",
      description: "Sample our finest selection of local and international wines.",
      time: "6:00 PM - 7:30 PM",
      location: "Wine Cellar",
      price: "$25",
      isFree: false,
    },
    {
      id: 3,
      name: "Cooking Class",
      description: "Learn to prepare local delicacies with our executive chef.",
      time: "4:00 PM - 5:30 PM",
      location: "Main Kitchen",
      price: "$40",
      isFree: false,
    },
    {
      id: 4,
      name: "Live Music",
      description: "Enjoy live jazz performances while you dine.",
      time: "8:00 PM - 10:00 PM",
      location: "Lobby Lounge",
      price: null,
      isFree: true,
    },
  ]

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Property Activities</h2>
          </div>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>

        <div className="mt-4">
          <p className="text-gray-600">Discover exciting activities and events at our property.</p>

          {!expanded && (
            <Button
              variant="outline"
              className="mt-3 text-blue-600 border-blue-600"
              onClick={(e) => {
                e.stopPropagation()
                setExpanded(true)
              }}
            >
              View Activities
            </Button>
          )}
        </div>

        {expanded && (
          <div className="mt-4 space-y-4 pt-4 border-t border-gray-100">
            {activities.map((activity) => (
              <div key={activity.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-800">{activity.name}</h3>
                  {activity.isFree ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Free</Badge>
                  ) : (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{activity.price}</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{activity.time}</span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>{activity.location}</span>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Book Now
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
