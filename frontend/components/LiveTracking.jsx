import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultCenter = [20.2961, 85.8245]; // Bhubaneswar fallback

// Vite does not automatically resolve Leaflet's default marker image paths in every setup.
const locationIcon = L.divIcon({
  className: "abhigo-location-marker",
  html: '<span style="display:block;width:18px;height:18px;background:#16a34a;border:4px solid white;border-radius:50%;box-shadow:0 1px 8px #0006"></span>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo([position.lat, position.lng], 16, { duration: 0.8 });
  }, [map, position]);
  return null;
}

const MapFallback = ({ title, message }) => (
  <div className="map-fallback">
    <div className="map-fallback-card">
      <strong>{title}</strong>
      <span>{message}</span>
    </div>
  </div>
);

export default function LiveTracking() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError(true);
      setIsLoading(false);
      return undefined;
    }

    const onSuccess = ({ coords }) => {
      setCurrentPosition({ lat: coords.latitude, lng: coords.longitude });
      setLocationError(false);
      setIsLoading(false);
    };
    const onError = () => {
      setLocationError(true);
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 15000,
    });
    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 10000,
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (isLoading) {
    return <MapFallback title="Finding your location" message="Allow location access to show your live position." />;
  }

  const center = currentPosition
    ? [currentPosition.lat, currentPosition.lng]
    : defaultCenter;

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "280px", position: "relative" }}>
      {locationError && (
        <div style={{ position: "absolute", zIndex: 1000, top: 10, left: 10, right: 10, background: "white", padding: "8px 12px", borderRadius: 8, boxShadow: "0 1px 6px #0003", fontSize: 12 }}>
          Location unavailable. Showing the map near Bhubaneswar; enable browser location to track live position.
        </div>
      )}
      <MapContainer center={center} zoom={currentPosition ? 16 : 12} scrollWheelZoom style={{ width: "100%", height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {currentPosition && (
          <>
            <Marker position={center} icon={locationIcon}>
              <Popup>Your current location</Popup>
            </Marker>
            <RecenterMap position={currentPosition} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
