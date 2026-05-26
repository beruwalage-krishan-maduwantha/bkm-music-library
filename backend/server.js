import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';
import { seedAdmin } from './controllers/auth.controller.js';

dotenv.config();

const app = express();

app.use(express.json());

// CORS — allow all origins for production
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'BKM Music Library API is running!' });
});

// Connect MongoDB once and reuse connection
let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log('MongoDB Connected!');
        await seedAdmin();
    } catch (err) {
        console.error('MongoDB Error:', err.message);
    }
};

// Vercel serverless handler
const handler = async (req, res) => {
    await connectDB();
    return app(req, res);
};

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    connectDB().then(() => {
        app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
    });
}

export default handler;