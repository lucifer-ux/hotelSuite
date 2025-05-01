"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Calendar,
  Compass,
  Bell,
  Coffee,
  Utensils,
  Shirt,
  FishIcon as Swim,
  MapPin,
  Star,
  Info,
  Car,
  X,
  ExternalLink,
  Tag,
  ChevronUp,
  ChevronDown,
  Locate,
} from "lucide-react"

interface Place {
    fsq_id: string;
    name: string;
    distance: number;
    categories: {
      id: number;
      name: string;
      short_name: string;
      plural_name: string;
      icon: {
        prefix: string;
        suffix: string;
      };
    }[];
    chains: any[];
    closed_bucket: string;
    geocodes: {
      main: {
        latitude: number;
        longitude: number;
      };
      roof?: {
        latitude: number;
        longitude: number;
      };
    };
    link: string;
    location: {
      address?: string;
      address_extended?: string;
      country: string;
      cross_street?: string;
      formatted_address: string;
      locality: string;
      postcode: string;
      region: string;
    };
    related_places?: any;
    timezone: string;
  }
  
interface Activity {
  id: number
  name: string
  description: string
  time: string
  location: string
  price: string | null
  isFree: boolean
}

interface Attraction {
  id: number
  name: string
  distance: string
  rating: number
  type: string
  image: string
  description?: string
  address?: string
  openingHours?: string
  entryFee?: string
  website?: string
}

interface TaxiService {
  id: number
  name: string
  logo: string
  estimatedTime: string
  estimatedPrice: string
}

type ComponentProps = {
    placesResponse: Place[];
  };

export default function ActivitiesSection({placesResponse}: ComponentProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [attractionsSubTab, setAttractionsSubTab] = useState("places")
  const [reminders, setReminders] = useState({
    breakfast: true,
    dinner: false,
    laundry: false,
    pool: false,
  })
  const [selectedAttractionInfo, setSelectedAttractionInfo] = useState<Attraction | null>(null)
  const [selectedAttractionBooking, setSelectedAttractionBooking] = useState<Attraction | null>(null)
  const [propertyExpanded, setPropertyExpanded] = useState(true)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  
  const handleToggle = (key: keyof typeof reminders) => {
    setReminders((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }
  placesResponse.map((place, idx) => {
    console.log("mapceckk", place?.categories[0]?.icon?.prefix + "64" + place?.categories[0]?.icon?.suffix)
  })
  console.log("workingggg", placesResponse)

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

  const renderPlaceholder = () => (
    <div className="text-center py-8">
      <Compass className="h-12 w-12 mx-auto text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-700 mb-2">Explore Activities & Attractions</h3>
      <p className="text-gray-500 mb-6">Select a category above to discover what's available during your stay</p>
      <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
        <Button 
          variant="outline" 
          className="flex flex-col items-center p-4 h-auto"
          onClick={() => setActiveTab("property")}
        >
          <Calendar className="h-6 w-6 mb-2 text-blue-600" />
          <span className="text-sm">Property</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center p-4 h-auto"
          onClick={() => setActiveTab("attractions")}
        >
          <Compass className="h-6 w-6 mb-2 text-blue-600" />
          <span className="text-sm">Attractions</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center p-4 h-auto"
          onClick={() => setActiveTab("reminders")}
        >
          <Bell className="h-6 w-6 mb-2 text-blue-600" />
          <span className="text-sm">Reminders</span>
        </Button>
      </div>
    </div>
  )

  const attractions: Attraction[] = [
    {
      id: 1,
      name: "City Museum",
      distance: "0.5 miles",
      rating: 4.7,
      type: "places",
      image: "/placeholder.svg?height=80&width=80",
      description:
        "The City Museum features a vast collection of historical artifacts, modern art installations, and interactive exhibits. Perfect for history buffs and art enthusiasts alike.",
      address: "123 Museum Avenue, Downtown",
      openingHours: "10:00 AM - 6:00 PM (Closed on Mondays)",
      entryFee: "$12 for adults, $8 for children",
      website: "www.citymuseum.com",
    },
    {
      id: 2,
      name: "Central Park",
      distance: "0.8 miles",
      rating: 4.9,
      type: "places",
      image: "/placeholder.svg?height=80&width=80",
      description:
        "A sprawling urban oasis featuring walking paths, lakes, gardens, and recreational areas. Enjoy boating, picnicking, or simply relaxing in nature.",
      address: "Central Park Drive",
      openingHours: "6:00 AM - 10:00 PM",
      entryFee: "Free",
      website: "www.centralpark.org",
    },
    {
      id: 3,
      name: "Wine Tasting",
      distance: "On-site",
      rating: 4.8,
      type: "activities",
      image: "/placeholder.svg?height=80&width=80",
      description:
        "Sample a curated selection of local and international wines guided by our sommelier. Learn about wine regions, grape varieties, and proper tasting techniques.",
      address: "Hotel Wine Cellar, Lower Level",
      openingHours: "6:00 PM - 8:00 PM (Thursdays and Saturdays)",
      entryFee: "$35 per person",
      website: "",
    },
    {
      id: 4,
      name: "Guided City Tour",
      distance: "Lobby",
      rating: 4.6,
      type: "activities",
      image: "/placeholder.svg?height=80&width=80",
      description:
        "Explore the city's landmarks, hidden gems, and cultural hotspots with our experienced local guide. Tours last approximately 3 hours and include transportation.",
      address: "Departs from Hotel Lobby",
      openingHours: "10:00 AM daily",
      entryFee: "$25 per person",
      website: "",
    },
  ]

  const taxiServices: TaxiService[] = [
    {
      id: 1,
      name: "Uber",
      logo: "/placeholder.svg?height=40&width=40",
      estimatedTime: "5 min",
      estimatedPrice: "$8-12",
    },
    {
      id: 2,
      name: "Ola",
      logo: "/placeholder.svg?height=40&width=40",
      estimatedTime: "7 min",
      estimatedPrice: "$7-10",
    },
    {
      id: 3,
      name: "Rapido",
      logo: "/placeholder.svg?height=40&width=40",
      estimatedTime: "3 min",
      estimatedPrice: "$6-9",
    },
    {
      id: 4,
      name: "Local Taxi",
      logo: "/placeholder.svg?height=40&width=40",
      estimatedTime: "10 min",
      estimatedPrice: "$10-15",
    },
  ]

  const filteredAttractions = attractions.filter((attraction) => attraction.type === attractionsSubTab)

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Activities & Bookings</h2>

        <Tabs value={activeTab || ""} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="property">
              <Calendar className="h-4 w-4 mr-1" />
              Attractions
            </TabsTrigger>
            <TabsTrigger value="attractions">
              <Compass className="h-4 w-4 mr-1" />
              Property
            </TabsTrigger>
            <TabsTrigger value="reminders">
              <Bell className="h-4 w-4 mr-1" />
              Reminders
            </TabsTrigger>
          </TabsList>
          {!activeTab && renderPlaceholder()}
          <TabsContent value="property">
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Discover exciting activities and events at our property.</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto"
                  onClick={() => setPropertyExpanded(!propertyExpanded)}
                >
                  {propertyExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </Button>
              </div>

              {propertyExpanded && (
                <div className="space-y-4">
                  {placesResponse.map((place, idx) => (
                        <div className="w-100 bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center space-y-2">
                        {/* Image Placeholder */}
                        
                        <div className="w-full h-28 bg-gray-200 rounded-md flex items-center justify-center text-black-400">
                          <img alt="sectionicon" src={`${place?.categories[0]?.icon?.prefix}64${place?.categories[0]?.icon?.suffix}`} />
                        </div>
                  
                        {/* Title */}
                        <h3 className="text-lg font-semibold">{place.name}</h3>
                  
                        {/* Distance */}
                        <div className="flex justify-between gap-20">
                        <MapPin/>
                        <p className="text-sm text-gray-600"> {(place.distance / 1609).toFixed(1)} miles</p>
                        </div>
                        
                  
                        {/* Static Rating */}
                        <div className="flex justify-between gap-20">
                          <span className="text-black-200"><Star/></span>
                          <span className="text-sm font-medium">4.7</span>
                        </div>
                  
                        {/* Buttons */}
                        <div className="flex justify-between w-full mt-2 space-x-2">
                          <button
                            onClick={() => alert(`${place.categories[0]?.name ?? 'Unknown'}\n\n${place.location.formatted_address}`)}
                            className="flex-1 border border-blue-600 text-blue-600 rounded-md py-1 hover:bg-blue-50 transition"
                          >
                         Know More
                          </button>
                          <a href={`https://www.google.com/maps/search/?api=1&query=${place.geocodes.main.latitude},${place.geocodes.main.longitude}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <button className="w-full bg-blue-600 text-white rounded-md py-1 hover:bg-blue-700 transition">
                            Book Now
                            </button>
                          </a>
                        </div>
                      </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="attractions">
            
            <Tabs defaultValue="places" onValueChange={setAttractionsSubTab}>
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
                      <div className="flex items-center text-sm mb-2">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span>{attraction.rating}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-600"
                          onClick={() => setSelectedAttractionInfo(attraction)}
                        >
                          <Info className="h-3 w-3 mr-1" />
                          Know More
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => setSelectedAttractionBooking(attraction)}
                        >
                          <Car className="h-3 w-3 mr-1" />
                          Book Now
                        </Button>
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
                      <div className="flex items-center text-sm mb-2">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span>{attraction.rating}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-600"
                          onClick={() => setSelectedAttractionInfo(attraction)}
                        >
                          <Info className="h-3 w-3 mr-1" />
                          Know More
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => setSelectedAttractionBooking(attraction)}
                        >
                          <Car className="h-3 w-3 mr-1" />
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="reminders">
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
          </TabsContent>
        </Tabs>

        {/* Know More Modal */}
        {selectedAttractionInfo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{selectedAttractionInfo.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setSelectedAttractionInfo(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <img
                  src={selectedAttractionInfo.image || "/placeholder.svg"}
                  alt={selectedAttractionInfo.name}
                  className="w-full h-48 object-cover rounded-md"
                />

                <div>
                  <div className="flex items-center mb-1">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{selectedAttractionInfo.rating}/5.0</span>
                    <span className="mx-2">•</span>
                    <span>{selectedAttractionInfo.distance} away</span>
                  </div>

                  <p className="text-gray-700 my-3">{selectedAttractionInfo.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex">
                      <span className="font-medium w-32">Address:</span>
                      <span className="text-gray-600">{selectedAttractionInfo.address}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Opening Hours:</span>
                      <span className="text-gray-600">{selectedAttractionInfo.openingHours}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium w-32">Entry Fee:</span>
                      <span className="text-gray-600">{selectedAttractionInfo.entryFee}</span>
                    </div>
                    {selectedAttractionInfo.website && (
                      <div className="flex items-center">
                        <span className="font-medium w-32">Website:</span>
                        <a
                          href={`https://${selectedAttractionInfo.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 flex items-center"
                        >
                          {selectedAttractionInfo.website}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setSelectedAttractionInfo(null)
                      setSelectedAttractionBooking(selectedAttractionInfo)
                    }}
                  >
                    <Car className="h-4 w-4 mr-2" />
                    Book Transportation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Book Now Modal */}
        {selectedAttractionBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Book Transportation</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setSelectedAttractionBooking(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div>
                <p className="mb-4">
                  Select a transportation service to visit{" "}
                  <span className="font-medium">{selectedAttractionBooking.name}</span> (
                  {selectedAttractionBooking.distance} away)
                </p>

                <div className="space-y-3">
                  {taxiServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        // In a real app, this would open the respective app or booking flow
                        alert(`Opening ${service.name} app to book your ride`)
                        setSelectedAttractionBooking(null)
                      }}
                    >
                      <div className="flex items-center">
                        <img
                          src={service.logo || "/placeholder.svg"}
                          alt={service.name}
                          className="w-10 h-10 rounded-md mr-3"
                        />
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-gray-500">Arrives in {service.estimatedTime}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{service.estimatedPrice}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>You can also ask the concierge to arrange transportation for you.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
