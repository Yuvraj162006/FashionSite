// ============================================
// Global App Context — State Management
// ============================================
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    // User state
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    // Cart state
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('cartItems');
        return saved ? JSON.parse(saved) : [];
    });

    // Wishlist state
    const [wishlistItems, setWishlistItems] = useState(() => {
        const saved = localStorage.getItem('wishlistItems');
        return saved ? JSON.parse(saved) : [];
    });

    // Dark mode state
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved === 'true';
    });

    // Toast state
    const [toast, setToast] = useState(null);

    // Loading state
    const [loading, setLoading] = useState(false);

    // Save user to localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Save wishlist to localStorage
    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    // Save dark mode and apply class
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    // Auth functions
    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        setCartItems([]);
        setWishlistItems([]);
        localStorage.removeItem('user');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('wishlistItems');
    };

    const updateUser = (userData) => {
        setUser((prev) => ({ ...prev, ...userData }));
    };

    // Cart functions
    const addToCart = (product, quantity = 1) => {
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, quantity }]);
        }
    };

    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter((item) => item.id !== productId));
    };

    const updateCartQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCartItems(
                cartItems.map((item) =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // Wishlist functions
    const addToWishlist = (product) => {
        if (!wishlistItems.find((item) => item.id === product.id)) {
            setWishlistItems([...wishlistItems, product]);
        }
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems(wishlistItems.filter((item) => item.id !== productId));
    };

    const toggleWishlist = (product) => {
        const existing = wishlistItems.find((item) => item.id === product.id);
        if (existing) {
            removeFromWishlist(product.id);
            return false;
        } else {
            addToWishlist(product);
            return true;
        }
    };

    // Toast function
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    const hideToast = () => {
        setToast(null);
    };

    // Dark mode toggle
    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    // Calculate cart totals
    const cartTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const value = {
        // State
        user,
        cartItems,
        wishlistItems,
        darkMode,
        toast,
        loading,
        cartTotal,
        cartCount,

        // Auth functions
        login,
        logout,
        updateUser,

        // Cart functions
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,

        // Wishlist functions
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,

        // UI functions
        showToast,
        hideToast,
        toggleDarkMode,
        setLoading,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
