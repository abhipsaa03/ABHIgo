# ABHI GO backend

The Express API handles account authentication, ride requests, fare and location services, and Socket.IO updates.

## Configure

1. Copy `.env.example` to `.env`.
2. Set a MongoDB URI and a private, long `JWT_SECRET`.
3. Add a restricted Google Maps API key if you need geocoding, address suggestions, and distance estimates.

Do not commit `.env` or share API keys. Use a restricted database and API key for local development.

## Run

```bash
npm install
npm run dev
```

The API listens on port 4000 by default.
