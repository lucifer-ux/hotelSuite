"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Utensils, ShoppingBag, Plus, Minus, ShoppingCart, X } from "lucide-react"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  subcategory: string
}

interface CartItem extends MenuItem {
  quantity: number
}

interface Restaurant {
  id: number
  name: string
  cuisine: string
  priceRange: string
  hours: string
  image: string
}

export default function OrderServicesSection() {
  const [activeTab, setActiveTab] = useState("order")
  const [foodSubTab, setFoodSubTab] = useState("food")
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Club Sandwich",
      description: "Chicken, bacon, lettuce, tomato, and mayo",
      price: 16,
      image: "/placeholder.svg?height=80&width=80",
      category: "food",
      subcategory: "food",
    },
    {
      id: 2,
      name: "Caesar Salad",
      description: "Romaine lettuce, croutons, parmesan, and Caesar dressing",
      price: 14,
      image: "/placeholder.svg?height=80&width=80",
      category: "food",
      subcategory: "food",
    },
    {
      id: 3,
      name: "Red Wine",
      description: "House Cabernet Sauvignon, 2018",
      price: 12,
      image: "/placeholder.svg?height=80&width=80",
      category: "food",
      subcategory: "drinks",
    },
    {
      id: 4,
      name: "Craft Beer",
      description: "Local IPA, 16oz",
      price: 8,
      image: "/placeholder.svg?height=80&width=80",
      category: "food",
      subcategory: "drinks",
    },
    {
      id: 5,
      name: "Toothbrush Kit",
      description: "Toothbrush, toothpaste, and floss",
      price: 5,
      image: "/placeholder.svg?height=80&width=80",
      category: "amenities",
      subcategory: "amenities",
    },
    {
      id: 6,
      name: "Slippers",
      description: "Comfortable hotel slippers",
      price: 10,
      image: "/placeholder.svg?height=80&width=80",
      category: "amenities",
      subcategory: "amenities",
    },
  ]

  const restaurants: Restaurant[] = [
    {
      id: 101,
      name: "The Grand Bistro",
      cuisine: "French, Continental",
      priceRange: "$$$",
      hours: "6:00 PM - 10:30 PM",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 102,
      name: "Sakura Japanese",
      cuisine: "Japanese, Sushi",
      priceRange: "$$",
      hours: "12:00 PM - 3:00 PM, 6:00 PM - 10:00 PM",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 103,
      name: "Rooftop Grill",
      cuisine: "Steakhouse, Grill",
      priceRange: "$$$",
      hours: "6:30 PM - 11:00 PM",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const filteredItems = menuItems.filter(
    (item) => item.category === activeTab || (activeTab === "order" && item.subcategory === foodSubTab),
  )

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

        <Tabs defaultValue="order" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="order">Order In-Room</TabsTrigger>
            <TabsTrigger value="dine">Dine In</TabsTrigger>
            <TabsTrigger value="amenities">
              <ShoppingBag className="h-4 w-4 mr-1" />
              Amenities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="order">
            <Tabs defaultValue="food" onValueChange={setFoodSubTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="food">Food</TabsTrigger>
                <TabsTrigger value="drinks">Drinks</TabsTrigger>
              </TabsList>

              <TabsContent value="food" className="space-y-4">
                {menuItems
                  .filter((item) => item.subcategory === "food")
                  .map((item) => (
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

              <TabsContent value="drinks" className="space-y-4">
                {menuItems
                  .filter((item) => item.subcategory === "drinks")
                  .map((item) => (
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
            </Tabs>
          </TabsContent>

          <TabsContent value="dine" className="space-y-4">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-800">{restaurant.name}</h3>
                    <span className="text-sm text-gray-500">{restaurant.priceRange}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{restaurant.cuisine}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <span>Hours: {restaurant.hours}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-blue-600 border-blue-600"
                    onClick={() => setSelectedRestaurant(restaurant)}
                  >
                    Book a Table
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="amenities" className="space-y-4">
            {menuItems
              .filter((item) => item.category === "amenities")
              .map((item) => (
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
        </Tabs>

        {showCart && (
          <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4">
            <div className="bg-white rounded-t-lg p-6 max-w-sm w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Your Order</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowCart(false)}>
                  <X className="h-5 w-5" />
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

        {selectedRestaurant && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Book a Table at {selectedRestaurant.name}</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedRestaurant(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>6:00 PM</option>
                    <option>6:30 PM</option>
                    <option>7:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:00 PM</option>
                    <option>8:30 PM</option>
                    <option>9:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>1 Person</option>
                    <option>2 People</option>
                    <option>3 People</option>
                    <option>4 People</option>
                    <option>5 People</option>
                    <option>6+ People</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    placeholder="Any dietary restrictions or special requests?"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <Button variant="outline" className="flex-1" onClick={() => setSelectedRestaurant(null)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => setSelectedRestaurant(null)}>
                  Confirm Booking
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
