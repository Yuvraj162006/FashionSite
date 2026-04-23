// ============================================
// API Service Layer — Centralized HTTP Client
// ============================================

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        return userData.token;
    }
    return null;
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
    const token = getAuthToken();
    
    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

// ============================================
// Auth API
// ============================================
export const authAPI = {
    register: async (userData) => {
        return apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },

    login: async (credentials) => {
        return apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    getProfile: async () => {
        return apiRequest('/auth/profile');
    },

    updateProfile: async (userData) => {
        return apiRequest('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    },

    addAddress: async (address) => {
        return apiRequest('/auth/address', {
            method: 'POST',
            body: JSON.stringify(address),
        });
    },
};

// ============================================
// Products API
// ============================================
export const productsAPI = {
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/products${queryString ? `?${queryString}` : ''}`);
    },

    getById: async (id) => {
        return apiRequest(`/products/${id}`);
    },

    getCategories: async () => {
        return apiRequest('/products/categories');
    },

    getTopProducts: async () => {
        return apiRequest('/products/top');
    },

    createReview: async (productId, review) => {
        return apiRequest(`/products/${productId}/reviews`, {
            method: 'POST',
            body: JSON.stringify(review),
        });
    },

    // Admin only
    create: async (productData) => {
        return apiRequest('/products', {
            method: 'POST',
            body: JSON.stringify(productData),
        });
    },

    update: async (id, productData) => {
        return apiRequest(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData),
        });
    },

    delete: async (id) => {
        return apiRequest(`/products/${id}`, {
            method: 'DELETE',
        });
    },
};

// ============================================
// Cart API
// ============================================
export const cartAPI = {
    get: async () => {
        return apiRequest('/cart');
    },

    add: async (productId, quantity = 1) => {
        return apiRequest('/cart', {
            method: 'POST',
            body: JSON.stringify({ productId, quantity }),
        });
    },

    update: async (productId, quantity) => {
        return apiRequest(`/cart/${productId}`, {
            method: 'PUT',
            body: JSON.stringify({ quantity }),
        });
    },

    remove: async (productId) => {
        return apiRequest(`/cart/${productId}`, {
            method: 'DELETE',
        });
    },

    clear: async () => {
        return apiRequest('/cart', {
            method: 'DELETE',
        });
    },
};

// ============================================
// Wishlist API
// ============================================
export const wishlistAPI = {
    get: async () => {
        return apiRequest('/wishlist');
    },

    add: async (productId) => {
        return apiRequest('/wishlist', {
            method: 'POST',
            body: JSON.stringify({ productId }),
        });
    },

    remove: async (productId) => {
        return apiRequest(`/wishlist/${productId}`, {
            method: 'DELETE',
        });
    },
};

// ============================================
// Orders API
// ============================================
export const ordersAPI = {
    create: async (orderData) => {
        return apiRequest('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData),
        });
    },

    getById: async (id) => {
        return apiRequest(`/orders/${id}`);
    },

    getMyOrders: async () => {
        return apiRequest('/orders/myorders');
    },

    updateToPaid: async (id, paymentResult) => {
        return apiRequest(`/orders/${id}/pay`, {
            method: 'PUT',
            body: JSON.stringify(paymentResult),
        });
    },

    // Admin only
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/orders${queryString ? `?${queryString}` : ''}`);
    },

    updateStatus: async (id, status) => {
        return apiRequest(`/orders/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
    },
};

// ============================================
// Payment API
// ============================================
export const paymentAPI = {
    getConfig: async () => {
        return apiRequest('/payment/config');
    },

    createPaymentIntent: async (amount, currency = 'inr') => {
        return apiRequest('/payment/create-payment-intent', {
            method: 'POST',
            body: JSON.stringify({ amount, currency }),
        });
    },
};

// ============================================
// Admin API
// ============================================
export const adminAPI = {
    getStats: async () => {
        return apiRequest('/admin/stats');
    },

    getUsers: async () => {
        return apiRequest('/auth/users');
    },

    deleteUser: async (id) => {
        return apiRequest(`/auth/users/${id}`, {
            method: 'DELETE',
        });
    },
};

export default {
    auth: authAPI,
    products: productsAPI,
    cart: cartAPI,
    wishlist: wishlistAPI,
    orders: ordersAPI,
    payment: paymentAPI,
    admin: adminAPI,
};
