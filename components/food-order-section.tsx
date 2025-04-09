"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Utensils, Wine, ShoppingBag, Plus, Minus, ShoppingCart } from "lucide-react"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface CartItem extends MenuItem {
  quantity: number
}

export default function FoodOrderSection() {
  const [activeTab, setActiveTab] = useState("food")
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Club Sandwich",
      description: "Chicken, bacon, lettuce, tomato, and mayo",
      price: 16,
      image: "/placeholder.svg?height=80&width=80",
      category: "food",
    },
    {
      id: 2,
      name: "Caesar Salad",
      description: "Romaine lettuce, croutons, parmesan, and Caesar dressing",
      price: 14,
      image: "/placeholder.svg?height=80&width=80",
      category: "food",
    },
    {
      id: 3,
      name: "Red Wine",
      description: "House Cabernet Sauvignon, 2018",
      price: 12,
      image: "/placeholder.svg?height=80&width=80",
      category: "drinks",
    },
    {
      id: 4,
      name: "Craft Beer",
      description: "Local IPA, 16oz",
      price: 8,
      image: "/placeholder.svg?height=80&width=80",
      category: "drinks",
    },
    {
      id: 5,
      name: "Toothbrush Kit",
      description: "Toothbrush, toothpaste, and floss",
      price: 5,
      image: "/placeholder.svg?height=80&width=80",
      category: "amenities",
    },
    {
      id: 6,
      name: "Slippers",
      description: "Comfortable hotel slippers",
      price: 10,
      image: "/placeholder.svg?height=80&width=80",
      category: "amenities",
    },
  ]

  const filteredItems = menuItems.filter((item) => item.category === activeTab)

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prev, { ...item, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (id: number, change: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.quantity + change)
            return { ...item, quantity: newQuantity }
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    })
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Utensils className="h-5 w-5 text-blue-600 mr-2" />
            Order & Services
          </h2>

          {cart.length > 0 && (
            <Button variant="outline" size="sm" className="relative" onClick={() => setShowCart(true)}>
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            </Button>
          )}
        </div>

        <Tabs defaultValue="food" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="food">
              <Utensils className="h-4 w-4 mr-1" />
              Food
            </TabsTrigger>
            <TabsTrigger value="drinks">
              <Wine className="h-4 w-4 mr-1" />
              Drinks
            </TabsTrigger>
            <TabsTrigger value="amenities">
              <ShoppingBag className="h-4 w-4 mr-1" />
              Amenities
            </TabsTrigger>
          </TabsList>

          {["food", "drinks", "amenities"].map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <span className="font-medium">${item.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-blue-600 border-blue-600"
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add to Order
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        {showCart && (
          <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4">
            <div className="bg-white rounded-t-lg p-6 max-w-sm w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Your Order</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowCart(false)}>
                  &times;
                </Button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 max-h-60 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-10 h-10 rounded-md object-cover mr-3"
                          />
                          <div>
                            <h4 className="font-medium text-gray-800">{item.name}</h4>
                            <p className="text-sm text-gray-500">${item.price} each</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-5 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">Service Charge (18%)</span>
                      <span className="font-medium">${(totalPrice * 0.18).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${(totalPrice * 1.18).toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Place Order</Button>
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
