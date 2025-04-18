import React, { useEffect, useState } from 'react';

// --- Types ---
interface Location {
  lat: number;
  lon: number;
}

interface Attraction {
  xid: string;
  name: string;
  dist: number;
  point: {
    lat: number;
    lon: number;
  };
}

interface AttractionDetails {
  xid: string;
  name: string;
  wikipedia_extracts?: {
    text: string;
  };
}

// --- Component ---
const AttractionsPage: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [selectedDetails, setSelectedDetails] = useState<AttractionDetails | null>(null);

  const API_KEY = '54f122cfcemshfca0e098ded862fp15334fjsn30db1b48b187';

  // 1. Ask for location permission
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (err) => {
        console.error('Geolocation error:', err.message);
      }
    );
  }, []);

  // 2. Fetch attractions based on user location
  useEffect(() => {
    if (userLocation) {
      const fetchAttractions = async () => {
        const radius = 5000;
        const limit = 10;
        const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=${radius}&lon=${userLocation.lon}&lat=${userLocation.lat}&rate=2&format=json&limit=${limit}`;

        const options: RequestInit = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com',
          },
        };

        try {
          const res = await fetch(url, options);
          const data: Attraction[] = await res.json();
          setAttractions(data);
        } catch (err) {
          console.error('Error fetching attractions:', err);
        }
      };

      fetchAttractions();
    }
  }, [userLocation]);

  // 3. Fetch detailed info for an attraction
  const fetchDetails = async (xid: string) => {
    const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${xid}`;

    const options: RequestInit = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com',
      },
    };

    try {
      const res = await fetch(url, options);
      const data: AttractionDetails = await res.json();
      setSelectedDetails(data);
    } catch (err) {
      console.error('Error fetching attraction details:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Nearby Attractions</h1>

      {!userLocation && <p>Requesting location...</p>}

      {attractions.map((place) => (
        <div key={place.xid} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <h3>{place.name || 'Unnamed Place'}</h3>
          <p>Distance: {Math.round(place.dist)} meters</p>
          <button onClick={() => fetchDetails(place.xid)}>Know More</button>
          <button onClick={() => alert(`Lat: ${place.point.lat}, Lon: ${place.point.lon}`)}>Go Now</button>
        </div>
      ))}

      {selectedDetails && (
        <div style={{ marginTop: '30px', background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
          <h2>{selectedDetails.name}</h2>
          <p>{selectedDetails.wikipedia_extracts?.text || 'No detailed info available.'}</p>
          <button onClick={() => setSelectedDetails(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AttractionsPage;
