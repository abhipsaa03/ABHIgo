import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultCenter = [20.2961, 85.8245]; // Bhubaneswar

const locationIcon = L.divIcon({
  className: "abhi-location-marker",
  html: '<div style="width:18px;height:18px;background:#2563eb;border:4px solid white;border-radius:50%;box-shadow:0 2px 8px #555"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function RecenterMap({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) map.setView(position, 15);
  }, [position, map]);

  return null;
}

export default function LiveTracking() {
  const [position, setPosition] = useState(null);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError(true);
      return;
    }

    const onSuccess = (result) => {
      setPosition([
        result.coords.latitude,
        result.coords.longitude,
      ]);
      setLocationError(false);
    };

    const onError = () => setLocationError(true);

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    const watchId = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      { enableHighAccuracy: true, maximumAge: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "100vh" }}>
      <MapContainer
        center={position || defaultCenter}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {position && (
          <Marker position={position} icon={locationIcon}>
            <Popup>Your current location</Popup>
          </Marker>
        )}

        <RecenterMap position={position} />
      </MapContainer>

      {locationError && (
        <div style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          background: "white",
          padding: 10,
          borderRadius: 8,
          zIndex: 1000
        }}>
          Allow location access to show your live position.
        </div>
      )}
    </div>
  );
}