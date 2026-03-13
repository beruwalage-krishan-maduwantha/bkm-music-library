# 🎵 BKM Music Library

A full-stack music streaming web application built with the MERN stack. Features an admin dashboard for managing AI-generated music and a customer-facing library with a live audio player.

![BKM Music Library](https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)

---

## ✨ Features

### 🧑‍💻 Customer Side
- Browse and play AI-generated music
- Search songs by title
- Filter by genre (Pop, Rock, Hip-Hop, Electronic, Jazz, Classical, R&B, Ambient)
- Like / unlike songs
- Full music player with play/pause, skip, seek, and volume control

### 🔐 Admin Side
- Secure JWT-based login
- Add, edit, and delete songs
- Manage song details: title, artist, genre, audio URL, cover image, duration
- Protected routes — only accessible with valid token

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Chakra UI, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JSON Web Tokens (JWT), bcryptjs |
| Music Source | Producer AI (AI-generated music) |

---

## 📁 Project Structure

```
bkm-music-library/
├── backend/
│   ├── config/         # MongoDB connection
│   ├── controllers/    # Auth & song logic
│   ├── middleware/     # JWT protection
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   └── server.js
└── frontend/
    └── src/
        ├── components/ # Navbar, MusicPlayer, SongCard
        ├── context/    # Auth context (JWT)
        └── pages/
            ├── admin/    # Login, Dashboard
            └── customer/ # Home, Browse
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account

### 1. Clone the repo
```bash
git clone https://github.com/beruwalage-krishan-maduwantha/bkm-music-library.git
cd bkm-music-library
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@bkmmusic.com
ADMIN_PASSWORD=your_password
PORT=5000
```

```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Open in browser
| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Customer music library |
| `http://localhost:5173/admin/login` | Admin login |
| `http://localhost:5000/api/songs` | REST API |

---

## 🔌 API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/login` | Public | Admin login |
| GET | `/api/songs` | Public | Get all songs |
| GET | `/api/songs/:id` | Public | Get single song |
| POST | `/api/songs/:id/like` | Public | Like a song |
| POST | `/api/songs` | Admin | Add a song |
| PUT | `/api/songs/:id` | Admin | Update a song |
| DELETE | `/api/songs/:id` | Admin | Delete a song |

---

## 👨‍🎓 About

Built as a portfolio project by **Krishan Maduwantha**  
Higher Diploma in Computing & Software Engineering  
ICBT Campus, Galle (Cardiff Metropolitan University, UK)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).