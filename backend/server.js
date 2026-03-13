import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedAdmin } from './controllers/auth.controller.js';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);

app.listen(PORT, async () => {
    await connectDB();
    await seedAdmin();
    console.log(`BKM Music Library running at http://localhost:${PORT}`);
});