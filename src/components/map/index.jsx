import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapContainer = ({ venueAddress }) => {
  const [venueLocation, setVenueLocation] = useState(null);
  const apiKey = import.meta.env.VITE_MAP_API_KEY;

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(venueAddress)}&key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch coordinates");
        }
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setVenueLocation({ lat, lng });
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    if (venueAddress) {
      fetchCoordinates();
    }
  }, [venueAddress, apiKey]);

  return (
    <LoadScript googleMapsApiKey={apiKey} loadingElement={<div>Loading...</div>} libraries={["places"]}>
      <GoogleMap
        id="venue-map"
        mapContainerStyle={{ width: "400px", height: "500px"}}
        center={venueLocation}
        zoom={12}
      >
        {venueLocation && <Marker position={venueLocation} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
