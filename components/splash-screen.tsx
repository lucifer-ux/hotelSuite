"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface SplashScreenProps {
  loading: boolean
}

export default function SplashScreen({ loading }: SplashScreenProps) {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => {
      setOpacity(100)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`fixed inset-0 bg-white flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out opacity-${opacity}`}
    >
      {loading ? (
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
      ) : (
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">HOTEL</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 text-center">Welcome to Your Stay</h1>
          <p className="text-gray-600 text-center max-w-xs">Your comfort is our priority</p>
        </div>
      )}
    </div>
  )
}
