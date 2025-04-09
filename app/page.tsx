"use client"

import { useEffect, useState } from "react"
import SplashScreen from "@/components/splash-screen"
import WelcomeSection from "@/components/welcome-section"
import RoomDetails from "@/components/room-details"
import CheckoutSection from "@/components/checkout-section"
import ReminderSection from "@/components/reminder-section"
import AttractionsSection from "@/components/attractions-section"
import ServiceSection from "@/components/service-section"
import FoodOrderSection from "@/components/food-order-section"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [showSplash, setShowSplash] = useState(true)

  // Mock user data - in a real app, this would come from an API
  const userData = {
    name: "John Smith",
    roomNumber: "304",
    floor: "3",
    roomType: "Deluxe King",
    checkIn: "2025-04-09T14:00:00",
    checkOut: "2025-04-12T11:00:00",
  }

  useEffect(() => {
    // Simulate loading time
    const loadTimer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    // Simulate splash screen duration
    const splashTimer = setTimeout(() => {
      setShowSplash(false)
    }, 4000)

    return () => {
      clearTimeout(loadTimer)
      clearTimeout(splashTimer)
    }
  }, [])

  if (loading || showSplash) {
    return <SplashScreen loading={loading} />
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <div className="container max-w-md mx-auto px-4 py-6 space-y-8 pb-20">
        <WelcomeSection name={userData.name} />
        <RoomDetails roomNumber={userData.roomNumber} floor={userData.floor} roomType={userData.roomType} />
        <CheckoutSection checkIn={userData.checkIn} checkOut={userData.checkOut} />
        <ReminderSection />
        <AttractionsSection />
        <ServiceSection />
        <FoodOrderSection />
      </div>
    </main>
  )
}
