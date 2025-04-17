"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Bed, Map, Key } from "lucide-react"
import Wifi from "../public/wifi.svg"

interface RoomDetailsProps {
  roomNumber: string
  floor: string
  roomType: string
}

export default function RoomDetails({ roomNumber, floor, roomType }: RoomDetailsProps) {
  const [expanded, setExpanded] = useState(false)
  const [wifiExpanded, setWifiExpanded] = useState(false)
  return (
    <> 
    <Card className="border-none shadow-md">
      
      <CardContent className="p-6">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <div className="flex items-center">
            <Key className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Your Room</h2>
          </div>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full">
              <span className="text-blue-600 font-semibold">{roomNumber}</span>
            </div>
            <span className="ml-2 text-gray-600">Room {roomNumber}</span>
          </div>
          <div className="text-gray-600">Floor {floor}</div>
          </div>

        {expanded && (
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
      </CardContent>
    </Card>
    <Card className="border-none shadow-md" onClick={() => setWifiExpanded(!wifiExpanded)}>
      <div className="flex justify-center items-center">
        <img className="ml-8" src="/wifi.svg" height={20} width={20}/>
        <h4 className="m-8 flex items-center"> Wi-fi</h4>
        {wifiExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
      </div>
      {wifiExpanded && <p  className="pb-6 flex item-center justify-center">name: HotelWifi</p>}
      {wifiExpanded && <p className="pb-6 flex item-center justify-center">password: 12345678</p>}
    </Card>
    </>
  )
}
