import express from 'express';
import {
    getSongs, getSongById, createSong, updateSong, deleteSong, likeSong
} from '../controllers/song.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getSongs);
router.get('/:id', getSongById);
router.post('/:id/like', likeSong);

// Admin protected routes
router.post('/', protect, createSong);
router.put('/:id', protect, updateSong);
router.delete('/:id', protect, deleteSong);

export default router;