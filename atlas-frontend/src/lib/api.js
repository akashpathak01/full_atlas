import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Functioning backend URL
    //baseURL: 'https://atlas-backend-production-ca0a.up.railway.app/api',

    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Matches AuthContext storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with a status code outside 2xx
            if (error.response.status === 401) {
                // Token expired or invalid
                localStorage.removeItem('token');
                localStorage.removeItem('atlas_user');
                // Optional: Redirect to login if not already there
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
