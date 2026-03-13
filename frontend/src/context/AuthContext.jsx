import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('bkm_token') || null);
    const [adminEmail, setAdminEmail] = useState(() => localStorage.getItem('bkm_email') || null);

    const login = (token, email) => {
        localStorage.setItem('bkm_token', token);
        localStorage.setItem('bkm_email', email);
        setToken(token);
        setAdminEmail(email);
    };

    const logout = () => {
        localStorage.removeItem('bkm_token');
        localStorage.removeItem('bkm_email');
        setToken(null);
        setAdminEmail(null);
    };

    return (
        <AuthContext.Provider value={{ token, adminEmail, login, logout, isAdmin: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);