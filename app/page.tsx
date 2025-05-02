"use client";

import { useEffect, useState } from "react";
import SplashScreen from "@/components/splash-screen";
import WelcomeSection from "@/components/welcome-section";
import ActivitiesSection from "@/components/activities-section";
import AIButlerSection from "@/components/ai-butler-section";
import OrderServicesSection from "@/components/order-services-section";
import UtilitiesSection from "@/components/utilities-section";
import SearchBar from "@/components/search-bar";
import axios from "axios"

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

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);

  const userData = {
    name: "John Smith",
    roomNumber: "304",
    floor: "3",
    roomType: "Deluxe King",
    checkIn: "2025-04-09T14:00:00",
    checkOut: "2025-04-12T11:00:00",
    wifiName: "Hotel_Premium",
    wifiPassword: "guest2025",
  };

  const fetchPlaces = async (lat:number, lon:number): Promise<Place[]> => {
    try {
      const response = await axios.get('https://api.foursquare.com/v3/places/search', {
        params: {
          ll: lat + ',' + lon, // Latitude and Longitude for Bengaluru
          radius: 5000, // Search within 5 km radius
          limit: 10, // Limit results
        },
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq3tmWh1pvuKRwpTtxYqj8TGoGdckIzRBiYTdb5o13IizU=', // Replace with your API key
        },
      });
      
      setPlaces(response.data.results);
      return response?.data?.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const loadTimer = setTimeout(() => setLoading(false), 2000);
    const splashTimer = setTimeout(() => setShowSplash(false), 4000);
    return () => {
      clearTimeout(loadTimer);
      clearTimeout(splashTimer);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // fetchNearbyPlaces(latitude, longitude);
          const placesResp = await fetchPlaces(latitude, longitude);
          setPlaces(placesResp)
        },
        (error) => {
          console.error("Location error:", error);
          alert("Please enable location services to find nearby places.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchNearbyPlaces = async (lat: number, lon: number) => {
    try {
      const apiKey = process.env.API_KEY;
      const radius = 5000; // 5 km
      const categories = "tourism.sights,tourism.attraction";

      const res = await fetch(
      `https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:${lon},${lat},5000&limit=5&apiKey=${apiKey}`
      );
      const data = await res.json();
      const results = data.features.map((feature: any) => ({
        name: feature.properties.name || "Unnamed Place",
        lat: feature.geometry.coordinates[1],
        lon: feature.geometry.coordinates[0],
        image: feature.properties.datasource?.raw?.preview || null,

      }));

      setPlaces(results);
    } catch (error) {
      console.error("Error fetching Geoapify data:", error);
    }
  };

  const openInMaps = (lat: number, lon: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    window.open(url, "_blank");
  };

  const openInUber = (lat: number, lon: number) => {
    const url = `https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=${lat}&dropoff[longitude]=${lon}`;
    window.open(url, "_blank");
  };

  if (loading || showSplash) return <SplashScreen loading={loading} />;

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <div className="container max-w-md mx-auto px-4 py-6 space-y-8 pb-20">
        <WelcomeSection name={userData.name} />
        <SearchBar onSearch={setSearchQuery} />

        <UtilitiesSection {...userData} />
        <ActivitiesSection placesResponse={places} />
        <AIButlerSection />
        <OrderServicesSection />

        {/* {places.map((place, idx) => (
          <div key={idx} className="place-card">
            <img
              src={place.image || "/placeholder.jpg"}
              alt={place.name}
              width="200"
              className="rounded shadow-md"
            />
            <h3 className="font-semibold">{place.name}</h3>
            <div className="flex gap-3 mt-2">
              <button onClick={() => openInMaps(place.lat, place.lon)}>
                View on Map
              </button>
              <button onClick={() => openInUber(place.lat, place.lon)}>
                Take me there (Uber)
              </button>
            </div>
          </div>
        ))} */}
      </div>
    </main>
  );
}
