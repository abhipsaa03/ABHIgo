import { useEffect, useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "100%" };
const defaultCenter = { lat: 28.6139, lng: 77.209 };
const mapStyles = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "simplified" }] },
  { elementType: "geometry", stylers: [{ color: "#e8eee1" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#526253" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f7faf4" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#d9e7cf" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9dbd0" }] },
];

const MapFallback = ({ title, message }) => (
  <div className="map-fallback">
    <div className="map-fallback-card">
      <strong>{title}</strong>
      <span>{message}</span>
    </div>
  </div>
);

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError(true);
      setIsLoading(false);
      return undefined;
    }

    const handlePositionUpdate = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
      setIsLoading(false);
    };
    const handleLocationError = () => {
      setLocationError(true);
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(handlePositionUpdate, handleLocationError, {
      enableHighAccuracy: true,
      timeout: 8000,
      maximumAge: 15000,
    });
    const watchId = navigator.geolocation.watchPosition(handlePositionUpdate, handleLocationError, {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 15000,
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!mapsApiKey) {
    return <MapFallback title="Your map is ready to connect" message="Add a Google Maps API key to enable live location and route tracking." />;
  }

  if (locationError) {
    return <MapFallback title="Turn on location to see your map" message="Allow location access in your browser, then return here to follow your ride." />;
  }

  if (isLoading || !currentPosition) {
    return <MapFallback title="Finding your location" message="Your live map will appear as soon as your location is ready." />;
  }

  return (
    <LoadScript googleMapsApiKey={mapsApiKey} loadingElement={<MapFallback title="Loading your map" message="Getting the streets ready." />}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition || defaultCenter}
        zoom={15}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: false,
          styles: mapStyles,
        }}
      >
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;
