const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const json = require('body-parser').json;
const urlencoded = require('body-parser').urlencoded;
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const cookieParser = require('cookie-parser');
const mapRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');
connectToDb();

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim());

app.use(cors({
    origin: (origin, callback) => {
        // Allow tools such as curl/Postman and configured frontend origins.
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
}));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({ name: 'ABHI GO API', status: 'ok', message: 'Ride booking backend is running' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', database: require('mongoose').connection.readyState === 1 ? 'connected' : 'connecting' });
});

app.use('/users', userRoutes);
app.use('/captain', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);

module.exports = app;