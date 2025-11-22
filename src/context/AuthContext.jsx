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
        // Skip auth check if we just logged out (prevents unnecessary API call)
        if (sessionStorage.getItem('just_logged_out') === 'true') {
            sessionStorage.removeItem('just_logged_out');
            setUser(null);
            setSalon(null);
            setLoading(false);
            return;
        }
        
        try {
            const data = await authAPI.getCurrentUser();
            setUser(data.user);
            setSalon(data.salon);
        } catch (err) {
            // User not logged in - silently handle 401 errors (expected behavior)
            // Don't log 401 errors for /api/auth/me as they're expected when not authenticated
            if (err.response?.status !== 401 || !err.suppressLog) {
                // Only log if it's not a suppressed 401 error
                console.error('Auth check error:', err);
            }
            setUser(null);
            setSalon(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            setError(null);
            const data = await authAPI.login(credentials);
            setUser(data.user);
            setSalon(data.salon);
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Login failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            const data = await authAPI.register(userData);
            setUser(data.user);
            setSalon(data.salon);
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Registration failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const logout = async () => {
        try {
            // Mark that we're logging out to prevent auth check after page reload
            sessionStorage.setItem('just_logged_out', 'true');
            await authAPI.logout();
            setUser(null);
            setSalon(null);
        } catch (err) {
            console.error('Logout error:', err);
            // Still mark as logged out even if API call fails
            sessionStorage.setItem('just_logged_out', 'true');
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
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
