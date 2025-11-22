import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

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
        const response = await api.get('/api/auth/me');
        return response.data;
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
