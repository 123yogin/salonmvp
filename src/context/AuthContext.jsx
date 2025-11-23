import { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [salon, setSalon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is logged in on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            // Check if we have a token in storage
            const token = localStorage.getItem('idToken');
            if (token) {
                // Verify backend sync and get user data
            const data = await authAPI.getCurrentUser();
            setUser(data.user);
            setSalon(data.salon);
            } else {
                // No token, not logged in
                setUser(null);
                setSalon(null);
            }
        } catch (err) {
            // Token likely invalid or expired
            // console.log("Auth check failed:", err);
            setUser(null);
            setSalon(null);
            
            // Clear tokens if 401 (Unauthorized) or 404 (User not found in DB yet)
            if (err.response?.status === 401 || err.response?.status === 404) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('idToken');
                localStorage.removeItem('refreshToken');
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            setError(null);
            // 1. Proxy Login to Backend
            await authAPI.login(credentials);
            
            // 2. Sync Profile with Backend
            const data = await authAPI.syncProfile();
            
            setUser(data.user);
            setSalon(data.salon);
            return { success: true };
        } catch (err) {
            console.error("Login error:", err);
            const errorMessage = err.response?.data?.error || 'Login failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            // 1. Proxy Register to Backend
            const response = await authAPI.register(userData);
            
            // 2. Return success
            return { success: true, requiresVerification: !response.userConfirmed }; 
            
        } catch (err) {
            console.error("Registration error:", err);
            const errorMessage = err.response?.data?.error || 'Registration failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };
    
    const confirmRegistration = async (email, code) => {
        try {
            setError(null);
            await authAPI.confirmRegistration(email, code);
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Verification failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
            setUser(null);
            setSalon(null);
        } catch (err) {
            console.error('Logout error:', err);
            setUser(null);
            setSalon(null);
        }
    };

    const value = {
        user,
        salon,
        loading,
        error,
        login,
        register,
        confirmRegistration,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
