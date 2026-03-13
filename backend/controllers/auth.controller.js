import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Seed admin from .env on first run
export const seedAdmin = async () => {
    try {
        const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
        if (!exists) {
            await Admin.create({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
            });
            console.log('Admin account created from .env');
        }
    } catch (err) {
        console.error('Seed admin error:', err.message);
    }
};

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin || !(await admin.matchPassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        res.json({
            success: true,
            token: generateToken(admin._id),
            email: admin.email,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};