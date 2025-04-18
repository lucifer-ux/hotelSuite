"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Compass,
  MapPin,
  Star,
  Info,
  Car,
  X,
  ExternalLink,
} from "lucide-react";
require('dotenv').config()

interface Location {
  lat: number;
  lon: number;
}

interface Attraction {
  xid: string;
  name: string;
  dist: number;
  rate: number;
  type: string;
  image: string;
  description?: string;
  address?: string;
  openingHours?: string;
  entryFee?: string;
  website?: string;
  point: {
    lat: number;
    lon: number;
  };
}

interface AttractionDetails {
  xid: String;
  name: String;
  wikipedia_extracts?: {
    text: string;
  };
  rate: string;
  address: Address
}

type Address = {
  city: string,
  state: string,
  suburb: string,
  county: string,
  postcode: string,
  country: string,
  city_district: string,
  country_code: string,
  state_district: string
}

interface TaxiService {
  id: number;
  name: string;
  logo: string;
  estimatedTime: string;
  estimatedPrice: string;
}

export default function AttractionsSection() {
  const [activeTab, setActiveTab] = useState("places");
  const [copied, setCopied] = useState(false);
  const formattedAddress = formatAddress( {
    city: "Bengaluru",
    state: "Karnataka",
    county: "Bangalore South",
    suburb: "Adugodi",
    country: "India",
    postcode: "560095",
    country_code: "in",
    city_district: "South Zone",
    state_district: "Bangalore Urban",
  });
  const [selectedAttractionInfo, setSelectedAttractionInfo] =
    useState<AttractionDetails | null>(null);
  const [selectedAttractionBooking, setSelectedAttractionBooking] =
    useState<Attraction | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [ showLocationReq , setShowLocationReq ] = useState(false)
  const [attractionDetails, setattractionDetails] =
    useState<AttractionDetails | null>(null);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setShowLocationReq(false);
      },
      (err) => {
        console.error("error while fetching location", err.message);
        setShowLocationReq(true);
      }
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      const fetchAttractions = async () => {
        const radius = 5000;
        const limit = 10;
        const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=${radius}&lon=${userLocation.lon}&lat=${userLocation.lat}&rate=2&format=json&limit=${limit}`;
        const options: RequestInit = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X_RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
          },
        };
        try {
          const res = await fetch(url, options);
          const data: Attraction[] = await res.json();
          setAttractions(data);
        } catch (e) {
          console.log("something went wrong", e);
        }
      };
      fetchAttractions();
    }
  }, [userLocation]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide "Copied!" after 2s
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  function formatAddress(address: Address): string {
    const {
      suburb,
      city_district,
      city,
      county,
      state_district,
      state,
      postcode,
      country,
    } = address;
    const parts = [
      suburb,
      city_district,
      city,
      county,
      state_district,
      state,
      postcode,
      country,
    ];
  
    return parts.filter(Boolean).join(", ");
  }

  const fetchDetails = async (id: String) => {
    const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${id}`;

    const options: RequestInit = {
      method: "GET",
      headers: {
        "X-RapidAPI-key": API_KEY,
        "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
      },
    };
    try {
      const res = await fetch(url, options);
      const data: AttractionDetails = await res.json();
      setattractionDetails(data);
      setSelectedAttractionInfo(data)
    } catch (e) {
      console.error("something went wrong", e);
    }
  };

  const attractions1: Attraction[] = [
    {
      xid: "1",
      name: "City Museum",
      dist: 0.6,
      rate: 4.7,
      type: "places",
      image: "/placeholder.svg?height=80&width=80",
      description:
        "The City Museum features a vast collection of historical artifacts, modern art installations, and interactive exhibits. Perfect for history buffs and art enthusiasts alike.",
      address: "123 Museum Avenue, Downtown",
      openingHours: "10:00 AM - 6:00 PM (Closed on Mondays)",
      entryFee: "$12 for adults, $8 for children",
      website: "www.citymuseum.com",
      point: {
        lat: 0.0,
        lon: 0.0,
      },
    },
    {
      xid: "2",
      name: "Central Park",
      dist: 0.6,
      rate: 4.9,
      type: "places",
      image: "/placeholder.svg?height=80&width=80",
      description:
        "A sprawling urban oasis featuring walking paths, lakes, gardens, and recreational areas. Enjoy boating, picnicking, or simply relaxing in nature.",
      address: "Central Park Drive",
      openingHours: "6:00 AM - 10:00 PM",
      entryFee: "Free",
      website: "www.centralpark.org",
      point: {
        lat: 0.0,
        lon: 0.0,
      },
    },
    {
      xid: "3",
      name: "Wine Tasting",
      dist: 0.6,
      rate: 4.8,
      type: "activities",
      image: "/placeholder.svg?height=80&width=80",
      description:
        "Sample a curated selection of local and international wines guided by our sommelier. Learn about wine regions, grape varieties, and proper tasting techniques.",
      address: "Hotel Wine Cellar, Lower Level",
      openingHours: "6:00 PM - 8:00 PM (Thursdays and Saturdays)",
      entryFee: "$35 per person",
      website: "",
      point: {
        lat: 0.0,
        lon: 0.0,
      },
    },
    {
      xid: "4",
      name: "Guided City Tour",
      dist: 0.6,
      rate: 4.6,
      type: "activities",
      image: "/placeholder.svg?height=80&width=80",
      description:
        "Explore the city's landmarks, hidden gems, and cultural hotspots with our experienced local guide. Tours last approximately 3 hours and include transportation.",
      address: "Departs from Hotel Lobby",
      openingHours: "10:00 AM daily",
      entryFee: "$25 per person",
      website: "",
      point: {
        lat: 0.0,
        lon: 0.0,
      },
    },
  ];

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
  ];

  const filteredAttractions = attractions1.filter(
    (attraction) => attraction.type === activeTab
  );

  const hamdleAppOpening = (appName:string, lat:number, lon:number) => {
    switch (appName) {
      case "Uber":
        window.open(`uber://?action=setPickup&dropoff[latitude]=${lat}&dropoff[longitude]=${lon}`);
        break;
      case "Ola":
        window.open(`olacabs://app/launch?drop_lat=${lat}&drop_lng=${lon}`);
      default:
        window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`, '_blank');
        break;
    }
  }

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Compass className="h-5 w-5 text-blue-600 mr-2" />
          Attractions
        </h2>

        <Tabs defaultValue="places" onValueChange={setActiveTab}>
          Places to Visit
          {showLocationReq && <div>
            <h3>
              Please enable your location to see attractions
            </h3>
            </div>}
          <TabsContent value="places" className="space-y-4">
            {attractions.map((attraction) => (
              <div
                key={attraction.xid}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">
                    {attraction.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{Math.round(attraction.dist)} meters</span>
                  </div>
                  <div className="flex items-center text-sm mb-2">
                  {Array.from({ length: attraction.rate }).map((_, index) => (
                    <Star key={index} className="h-3 w-3 text-yellow-500 mr-1" />
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-600"
                      // onClick={() => attraction}
                      onClick={() => fetchDetails(attraction.xid)}
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

        {selectedAttractionInfo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {selectedAttractionInfo.name}
                </h3>
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
                {/* <img
                  src={selectedAttractionInfo.image || "/placeholder.svg"}
                  alt={selectedAttractionInfo.name}
                  className="w-full h-48 object-cover rounded-md"
                /> */}

                <div>
                  <div className="flex items-center mb-1">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">
                      {selectedAttractionInfo.rate}/5.0
                    </span>
                    <span className="mx-2">•</span>
                    <span>{selectedAttractionBooking?.dist} meters away</span>
                  </div>

                  <p className="text-gray-700 my-3">
                    {selectedAttractionInfo.wikipedia_extracts?.text}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex">
                      <span className="font-medium w-32">Address:</span>
                      <span className="text-gray-600">
                        {formatAddress(selectedAttractionInfo.address)}
                      </span>
                      <button onClick={handleCopy} style={{ cursor: 'pointer' }}>
                      📋 {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setSelectedAttractionInfo(null);
                      // setSelectedAttractionBooking(selectedAttractionInfo);
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
                  <span className="font-medium">
                    {selectedAttractionBooking.name}
                  </span>{" "}
                  ({selectedAttractionBooking.dist} away)
                </p>

                <div className="space-y-3">
                  {taxiServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        hamdleAppOpening(service.name, selectedAttractionBooking.point.lon, selectedAttractionBooking.point.lat)
                        // In a real app, this would open the respective app or booking flow
                        setSelectedAttractionBooking(null);
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
                          <p className="text-sm text-gray-500">
                            Arrives in {service.estimatedTime}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">
                          {service.estimatedPrice}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>
                    You can also ask the concierge to arrange transportation for
                    you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
