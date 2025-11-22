import axios from 'axios';

// Get API configuration from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Track requests that should suppress 401 errors
const suppress401Errors = new Set();

// Request interceptor to mark auth check requests
api.interceptors.request.use((config) => {
    if (config.url?.includes('/api/auth/me')) {
        suppress401Errors.add(config.url);
    }
    return config;
});

// Response interceptor to suppress console errors for expected 401s
api.interceptors.response.use(
    (response) => {
        // Remove from tracking if successful
        if (suppress401Errors.has(response.config?.url)) {
            suppress401Errors.delete(response.config.url);
        }
        return response;
    },
    (error) => {
        // Suppress console logging for expected 401s on auth check
        if (error.config?.url?.includes('/api/auth/me') && 
            error.response?.status === 401) {
            // Mark as suppressed to prevent console logging
            error.suppressLog = true;
            suppress401Errors.delete(error.config.url);
        }
        return Promise.reject(error);
    }
);

// ============================================
// Authentication API
// ============================================

export const authAPI = {
    register: async (userData) => {
        const response = await api.post('/api/auth/register', userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/api/auth/login', credentials);
        return response.data;
    },

    logout: async () => {
        const response = await api.post('/api/auth/logout');
        return response.data;
    },

    getCurrentUser: async () => {
        // Temporarily suppress console.error to prevent logging expected 401 errors
        const originalConsoleError = console.error;
        const originalConsoleWarn = console.warn;
        
        // Override console methods to filter out auth check 401 errors
        console.error = (...args) => {
            const errorString = String(args[0] || '');
            if (errorString.includes('/api/auth/me') && 
                (errorString.includes('401') || errorString.includes('UNAUTHORIZED'))) {
                return; // Suppress this error
            }
            originalConsoleError.apply(console, args);
        };
        
        console.warn = (...args) => {
            const warnString = String(args[0] || '');
            if (warnString.includes('/api/auth/me') && warnString.includes('401')) {
                return; // Suppress this warning
            }
            originalConsoleWarn.apply(console, args);
        };
        
        try {
            // Use validateStatus to prevent axios from treating 401 as an error
            const response = await api.get('/api/auth/me', {
                validateStatus: (status) => status === 200 || status === 401
            });
            
            // Restore console methods
            console.error = originalConsoleError;
            console.warn = originalConsoleWarn;
            
            if (response.status === 401) {
                // Create a custom error that won't be logged
                const error = new Error('Not authenticated');
                error.response = { status: 401 };
                throw error;
            }
            
            return response.data;
        } catch (error) {
            // Restore console methods in case of other errors
            console.error = originalConsoleError;
            console.warn = originalConsoleWarn;
            throw error;
        }
    },
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
};

export default api;
