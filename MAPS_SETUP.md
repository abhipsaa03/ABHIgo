# ABHI GO – Free map setup

The project now uses:
- **Leaflet + OpenStreetMap** for map display (no Google Maps key)
- **Nominatim** for address search/geocoding
- **OSRM public routing demo server** for driving distance and estimated duration

## Frontend
From the `ABHI_GO/frontend` folder:

```bash
npm install
npm run dev
```

The frontend dependencies include `leaflet` and `react-leaflet`. The old Google Maps React package was removed. No `VITE_GOOGLE_MAPS_API` variable is needed.

## Backend
From the `ABHI_GO/backend` folder:

```bash
npm install
npm start
```

No `GOOGLE_MAPS_API` variable is needed. Keep the other backend environment variables (`MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`, and `PORT`) configured as before.

## Important limits
The public OpenStreetMap tile server, Nominatim service, and OSRM demo server are community services with fair-use policies, rate limits, and no uptime guarantee. They are suitable for development, demos, and light testing, but are **not a guaranteed free production SLA** for a commercial ride-booking service. For production traffic, use a hosted OSM-compatible provider or self-host the services. Do not send bulk/autocomplete traffic to Nominatim; keep requests low and cache results.

Browser location requires the user to grant permission and generally requires HTTPS (localhost is also allowed by browsers).
