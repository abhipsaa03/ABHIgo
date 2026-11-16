const axios = require('axios');
const captainModel = require('../models/captain.model');

const NOMINATIM = 'https://nominatim.openstreetmap.org';
const OSRM = 'https://router.project-osrm.org';
const http = axios.create({
    timeout: 15000,
    headers: { 'User-Agent': 'ABHIGO-RideBooking/1.0 (location services)' }
});

async function geocode(address) {
    if (!address || typeof address !== 'string') throw new Error('A valid address is required');
    const { data } = await http.get(`${NOMINATIM}/search`, {
        params: { q: address, format: 'jsonv2', limit: 1, addressdetails: 1 }
    });
    if (!Array.isArray(data) || !data.length) throw new Error(`Location not found: ${address}`);
    return {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
        display_name: data[0].display_name
    };
}

module.exports.getAddressCoordinates = async (address) => {
    const point = await geocode(address);
    return { ltd: point.lat, lng: point.lng };
};

module.exports.getDistance = async (origin, destination) => {
    const [start, end] = await Promise.all([geocode(origin), geocode(destination)]);
    const coordinates = `${start.lng},${start.lat};${end.lng},${end.lat}`;
    const { data } = await http.get(`${OSRM}/route/v1/driving/${coordinates}`, {
        params: { overview: 'false', alternatives: false, steps: false }
    });
    if (data.code !== 'Ok' || !data.routes?.length) throw new Error('Unable to calculate route');
    const route = data.routes[0];
    const km = route.distance / 1000;
    const minutes = Math.max(1, Math.round(route.duration / 60));
    return {
        distance: { text: `${km.toFixed(1)} km`, value: Math.round(route.distance) },
        duration: { text: `${minutes} mins`, value: Math.round(route.duration) },
        status: 'OK'
    };
};

module.exports.getSuggestions = async (address) => {
    if (!address || typeof address !== 'string') return [];
    const { data } = await http.get(`${NOMINATIM}/search`, {
        params: { q: address, format: 'jsonv2', limit: 5, addressdetails: 1 }
    });
    return (Array.isArray(data) ? data : []).map((place) => ({
        place_id: String(place.place_id),
        description: place.display_name,
        structured_formatting: { main_text: place.name || place.display_name }
    }));
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        }
    });
    return captains;
};
