import Song from '../models/song.model.js';

export const getSongs = async (req, res) => {
    try {
        const { genre, search } = req.query;
        let filter = {};
        if (genre && genre !== 'All') filter.genre = genre;
        if (search) filter.title = { $regex: search, $options: 'i' };
        const songs = await Song.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, data: songs });
    } catch {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({ success: false, message: 'Song not found' });
        res.json({ success: true, data: song });
    } catch {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const createSong = async (req, res) => {
    const { title, artist, genre, audioUrl, coverUrl, duration } = req.body;
    if (!title || !audioUrl) {
        return res.status(400).json({ success: false, message: 'Title and Audio URL are required' });
    }
    try {
        const song = await Song.create({ title, artist, genre, audioUrl, coverUrl, duration });
        res.status(201).json({ success: true, data: song });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!song) return res.status(404).json({ success: false, message: 'Song not found' });
        res.json({ success: true, data: song });
    } catch {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const deleteSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndDelete(req.params.id);
        if (!song) return res.status(404).json({ success: false, message: 'Song not found' });
        res.json({ success: true, message: 'Song deleted' });
    } catch {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const likeSong = async (req, res) => {
    const { sessionId } = req.body;
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({ success: false, message: 'Song not found' });

        const alreadyLiked = song.likedBy.includes(sessionId);
        if (alreadyLiked) {
            song.likedBy = song.likedBy.filter(id => id !== sessionId);
            song.likes = Math.max(0, song.likes - 1);
        } else {
            song.likedBy.push(sessionId);
            song.likes += 1;
        }
        await song.save();
        res.json({ success: true, likes: song.likes, liked: !alreadyLiked });
    } catch {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};