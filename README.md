# ABHI GO

ABHI GO is a ride booking app with passenger and driver flows, ride requests, map based address search, fare estimates, and live ride updates.

## What is included

- A responsive landing page with an animated 3D city illustration.
- Passenger and driver sign in and registration screens.
- Ride selection, estimated fares, driver matching, pickup confirmation, and live ride status screens.
- Responsive layouts for phone, tablet, and desktop widths.
- Accessible form labels, keyboard usable controls, reduced motion support, and request loading/error states.

## Stack

- Frontend: React, Vite, Tailwind CSS, GSAP, Socket.IO client, Google Maps JavaScript API.
- Backend: Node.js, Express, MongoDB/Mongoose, Socket.IO.

## Run locally

### Backend

1. Install Node.js and MongoDB, or configure a MongoDB connection string.
2. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI` and a private `JWT_SECRET`. Add a Google Maps API key if you want map services.
3. Install packages and start the API:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

### Frontend

1. Copy `frontend/.env.example` to `frontend/.env`.
2. Set the API URL and, for live maps and location search, a restricted Google Maps API key.
3. Install packages and start Vite:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

The API uses `http://localhost:4000` and Vite normally uses `http://localhost:5173`.

## Notes

- The API and a valid database connection are required for account and ride flows.
- Google Maps services need an enabled Maps JavaScript API key with the required Places and distance/geocoding services.
- If the maps key or browser location is unavailable, the app shows a styled fallback in place of the live map.
- Before public launch, add production security controls, privacy and location policies, payment handling, identity checks, monitoring, and operational support.
- The app is based on the upstream UberClone project by K-Daksh. Retain the applicable upstream and third party licenses when redistributing.
