"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Compass, Star } from "lucide-react"

interface Attraction {
  id: number
  name: string
  distance: string
  rating: number
  type: string
  image: string
}

export default function AttractionsSection() {
  const [activeTab, setActiveTab] = useState("places")

  const attractions: Attraction[] = [
    {
      id: 1,
      name: "City Museum",
      distance: "0.5 miles",
      rating: 4.7,
      type: "places",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Central Park",
      distance: "0.8 miles",
      rating: 4.9,
      type: "places",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Wine Tasting",
      distance: "On-site",
      rating: 4.8,
      type: "activities",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "Guided City Tour",
      distance: "Lobby",
      rating: 4.6,
      type: "activities",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const filteredAttractions = attractions.filter((attraction) => attraction.type === activeTab)

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Compass className="h-5 w-5 text-blue-600 mr-2" />
          Attractions
        </h2>

        <Tabs defaultValue="places" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="places">Places to Visit</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="places" className="space-y-4">
            {filteredAttractions.map((attraction) => (
              <div key={attraction.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={attraction.image || "/placeholder.svg"}
                  alt={attraction.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{attraction.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{attraction.distance}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    <span>{attraction.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            {filteredAttractions.map((attraction) => (
              <div key={attraction.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={attraction.image || "/placeholder.svg"}
                  alt={attraction.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{attraction.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{attraction.distance}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    <span>{attraction.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
