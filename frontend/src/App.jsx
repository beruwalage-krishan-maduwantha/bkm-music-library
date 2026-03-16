import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';
import { useState } from 'react';

// Customer pages
import HomePage from './pages/customer/HomePage';

// Admin pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  const playSong = (song, songs = []) => {
    setCurrentSong(song);
    setPlaylist(songs);
  };

  const playNext = () => {
    if (!playlist.length) return;
    const idx = playlist.findIndex(s => s._id === currentSong._id);
    const next = playlist[(idx + 1) % playlist.length];
    setCurrentSong(next);
  };

  const playPrev = () => {
    if (!playlist.length) return;
    const idx = playlist.findIndex(s => s._id === currentSong._id);
    const prev = playlist[(idx - 1 + playlist.length) % playlist.length];
    setCurrentSong(prev);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage playSong={playSong} currentSong={currentSong} />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      {currentSong && (
        <MusicPlayer
          song={currentSong}
          onNext={playNext}
          onPrev={playPrev}
          onClose={() => setCurrentSong(null)}
        />
      )}
    </>
  );
}

export default App;