"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Key, Wifi, Calendar, Phone, ChevronDown, ChevronUp, Bed, Map, Copy, Check, X } from "lucide-react"
import { format, parseISO } from "date-fns"

interface UtilitiesSectionProps {
  roomNumber: string
  floor: string
  roomType: string
  checkIn: string
  checkOut: string
  wifiName: string
  wifiPassword: string
}

export default function UtilitiesSection({
  roomNumber,
  floor,
  roomType,
  checkIn,
  checkOut,
  wifiName,
  wifiPassword,
}: UtilitiesSectionProps) {
  const [activeTab, setActiveTab] = useState("room")
  const [roomExpanded, setRoomExpanded] = useState(false)
  const [showExtendModal, setShowExtendModal] = useState(false)
  const [showQuickDial, setShowQuickDial] = useState(false)
  const [wifiCopied, setWifiCopied] = useState(false)

  const checkInDate = parseISO(checkIn)
  const checkOutDate = parseISO(checkOut)

  const quickDialOptions = [
    { name: "Room Service", number: "100" },
    { name: "Housekeeping", number: "101" },
    { name: "Front Desk", number: "102" },
    { name: "Concierge", number: "103" },
    { name: "Emergency", number: "911" },
  ]

  const copyWifiPassword = () => {
    navigator.clipboard.writeText(wifiPassword)
    setWifiCopied(true)
    setTimeout(() => setWifiCopied(false), 2000)
  }

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Utilities</h2>

        <Tabs defaultValue="room" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="room">
              <Key className="h-4 w-4 mr-1" />
              Room
            </TabsTrigger>
            <TabsTrigger value="wifi">
              <Wifi className="h-4 w-4 mr-1" />
              WiFi
            </TabsTrigger>
            <TabsTrigger value="checkout">
              <Calendar className="h-4 w-4 mr-1" />
              Stay
            </TabsTrigger>
          </TabsList>

          <TabsContent value="room">
            <div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <span className="text-blue-600 font-semibold">{roomNumber}</span>
                  </div>
                  <span className="ml-2 text-gray-600">Room {roomNumber}</span>
                </div>
                <div className="text-gray-600">Floor {floor}</div>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="text-gray-700">{roomType}</span>
                <Button variant="ghost" size="sm" className="p-0 h-auto" onClick={() => setRoomExpanded(!roomExpanded)}>
                  {roomExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </Button>
              </div>

              {roomExpanded && (
                <div className="mt-4 space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-700">{roomType}</span>
                  </div>
                  <div className="flex items-center">
                    <Map className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-gray-700">East Wing</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-800">Room Features:</h3>
                    <ul className="mt-2 text-gray-600 space-y-1">
                      <li>• King-size bed</li>
                      <li>• Smart TV with streaming</li>
                      <li>• Mini bar</li>
                      <li>• Air conditioning</li>
                      <li>• Free Wi-Fi</li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center"
                  onClick={() => setShowQuickDial(true)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Quick Dial Services
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wifi">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-800">Network Name</h3>
                  <span className="text-blue-600 font-medium">{wifiName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">Password</h3>
                  <div className="flex items-center">
                    <span className="text-blue-600 font-medium mr-2">{wifiPassword}</span>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={copyWifiPassword}>
                      {wifiCopied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>• Free high-speed WiFi is available throughout the hotel</p>
                <p>• For technical assistance, dial 104 from your room phone</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="checkout">
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
          </TabsContent>
        </Tabs>

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
