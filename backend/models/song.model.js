import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true, default: 'BKM' },
    genre: {
        type: String,
        required: true,
        enum: ['Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'R&B', 'Ambient', 'Other'],
        default: 'Other'
    },
    audioUrl: { type: String, required: true },
    coverUrl: { type: String, default: '' },
    duration: { type: String, default: '' },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: String }], // store session IDs or user IDs
}, { timestamps: true });

const Song = mongoose.model('Song', songSchema);
export default Song;