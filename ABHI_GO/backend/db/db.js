const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function getMongoUri() {
    if (process.env.MONGO_URI) return process.env.MONGO_URI.trim();

    const username = process.env.MONGO_USER;
    const password = process.env.MONGO_PASS;
    const cluster = process.env.MONGO_CONTEXT_URL;

    if (!username || !password || !cluster) {
        throw new Error(
            'MongoDB configuration missing. Set MONGO_URI or all of MONGO_USER, MONGO_PASS and MONGO_CONTEXT_URL in backend/.env.'
        );
    }

    // Encode credentials so characters such as @, #, / and : are safe in the URI.
    return `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${cluster}`;
}

async function connectToDb() {
    try {
        const uri = getMongoUri();
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
        console.log(`MongoDB connected: ${mongoose.connection.name}`);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        console.error('Check backend/.env, the database username/password, cluster hostname, and Atlas Network Access IP allowlist.');
    }
}

module.exports = connectToDb;
