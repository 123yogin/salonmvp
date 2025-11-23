import axios from 'axios';

// Get API configuration from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 30000; // Increased to 30s for AWS cold starts

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper to get token from local storage
const getToken = () => localStorage.getItem('idToken');

// Request interceptor to add Auth Token
api.interceptors.request.use((config) => {
    const token = getToken();
    // Don't attach token for auth routes to prevent conflicts
    if (token && !config.url.includes('/api/auth/cognito-')) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized access - Token likely expired");
            // Optional: specific event to trigger global logout
        }
        return Promise.reject(error);
    }
);

// ============================================
// Authentication API (Backend Proxy)
// ============================================

export const authAPI = {
    login: async (credentials) => {
        const response = await api.post('/api/auth/cognito-login', credentials);
        // Save tokens to local storage
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('idToken', response.data.idToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post('/api/auth/cognito-register', userData);
        return response.data;
    },

    confirmRegistration: async (email, code) => {
        const response = await api.post('/api/auth/cognito-confirm', { email, code });
        return response.data;
    },

    // Sync Cognito profile with Backend DB (should be called after login)
    syncProfile: async (additionalData = {}) => {
        const response = await api.post('/api/auth/sync-profile', additionalData);
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/api/auth/me');
            return response.data;
    },

    logout: async () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('idToken');
        localStorage.removeItem('refreshToken');
        return Promise.resolve();
        }
};

// ============================================
// Services API
// ============================================

export const servicesAPI = {
    getAll: async () => {
        const response = await api.get('/api/services');
        return response.data;
    },

    create: async (serviceData) => {
        const response = await api.post('/api/services', serviceData);
        return response.data;
    },

    update: async (serviceId, serviceData) => {
        const response = await api.put(`/api/services/${serviceId}`, serviceData);
        return response.data;
    },

    delete: async (serviceId) => {
        const response = await api.delete(`/api/services/${serviceId}`);
        return response.data;
    },
};

// ============================================
// Service Logs API
// ============================================

export const logsAPI = {
    add: async (logData) => {
        const response = await api.post('/api/logs', logData);
        return response.data;
    },

    getToday: async () => {
        const response = await api.get('/api/logs/today');
        return response.data;
    },

    getByDateRange: async (startDate, endDate) => {
        const params = {};
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;

        const response = await api.get('/api/logs', { params });
        return response.data;
    },
};

// ============================================
// Summary & Analytics API
// ============================================

export const summaryAPI = {
    getToday: async () => {
        const response = await api.get('/api/summary/today');
        return response.data;
    },

    getBreakdown: async () => {
        const response = await api.get('/api/summary/breakdown');
        return response.data;
    },

    getStaffPerformance: async () => {
        const response = await api.get('/api/summary/staff-performance');
        return response.data;
    },

    createDailyClosing: async (date) => {
        const response = await api.post('/api/daily-closing', { date });
        return response.data;
    },
};

// ============================================
// Staff API
// ============================================

export const staffAPI = {
    getAll: async () => {
        const response = await api.get('/api/staff');
        return response.data;
    },

    create: async (staffData) => {
        const response = await api.post('/api/staff', staffData);
        return response.data;
    },

    delete: async (staffId) => {
        const response = await api.delete(`/api/staff/${staffId}`);
        return response.data;
    },
};

export default api;
