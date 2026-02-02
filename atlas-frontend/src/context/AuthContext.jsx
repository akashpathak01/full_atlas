import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

const AuthContext = createContext();

// Mock user database removed

export function AuthProvider({ children }) {
    // Helper to normalize backend roles (UPPERCASE) to Frontend App.jsx expected format (Title Case)
    const normalizeRole = (backendRole) => {
        if (!backendRole) return null;

        // Map based on App.jsx allowedRoles expectations
        const roleMap = {
            'SUPER_ADMIN': 'Super Admin',
            'ADMIN': 'Admin',
            'SELLER': 'Seller',
            'CALL_CENTER_AGENT': 'Call Center Agent',
            'CALL_CENTER_MANAGER': 'Call Center Manager',
            'STOCK_KEEPER': 'Stock Keeper',
            'PACKAGING_AGENT': 'Packaging Agent',
            'DELIVERY_AGENT': 'Delivery Agent'
        };

        // Return mapped role or original if no match (fallback)
        return roleMap[backendRole] || backendRole;
    };

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('atlas_user');
        if (saved) {
            const parsedUser = JSON.parse(saved);
            // Apply normalization to the role when initializing from localStorage
            if (parsedUser.role) {
                parsedUser.role = normalizeRole(parsedUser.role);
            }
            return parsedUser;
        }
        return null;
    });

    const login = async (email, password) => {
        try {
            // Using the centralized API utility (automatically handles localhost:5000)
            const response = await api.post('/auth/login', { email, password });

            // Axios returns data directly in response.data
            const { token, user: userData } = response.data;

            // Normalize role to handle object or string if needed
            const rawRole = userData.role?.name || userData.role;
            const normalizedRole = normalizeRole(rawRole); // Convert SUPER_ADMIN -> Super Admin

            const userObj = { ...userData, role: normalizedRole, token };
            setUser(userObj);

            // Store critical auth data
            localStorage.setItem('atlas_user', JSON.stringify(userObj));
            localStorage.setItem('token', token);
            localStorage.setItem('role', normalizedRole);

            return userObj;
        } catch (error) {
            console.error('Login error:', error);
            // Throw existing error message from backend or default
            const message = error.response?.data?.message || 'Login failed';
            throw new Error(message);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('atlas_user');
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
