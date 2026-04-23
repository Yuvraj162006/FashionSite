import React, { useState, useEffect, useRef } from 'react';
import { productsData } from '../data/products';

const Navbar = ({ cartCount, wishlistCount, darkMode, user, userLocation, onLogout, onToggleDarkMode, onSearchChange, onCartClick, onWishlistClick, onLoginClick, onDashboardClick, onLocationClick, searchQuery, onNavigate }) => {
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const searchRef = useRef(null);

    const recommendations = searchQuery && searchQuery.trim() 
        ? productsData
            .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 6)
        : [];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowRecommendations(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchClick = (name) => {
        onSearchChange({ target: { value: name } });
        setShowRecommendations(false);
    };

    return (
        <nav className="navbar">
            <div className="nav-logo" onClick={() => onNavigate('home')}>
                <i className="fas fa-shopping-bag"></i>
                <span className="brand-name">FashionSite</span>
            </div>

            <div 
                className="nav-delivery" 
                onClick={() => onLocationClick && onLocationClick()}
                style={{ cursor: 'pointer' }}
            >
                <i className="fas fa-map-marker-alt"></i>
                <div className="delivery-text">
                    <p className="nav-first">Delivering to {user ? user.name : 'User'}</p>
                    <p className="nav-second">{userLocation ? `${userLocation.city} ${userLocation.pincode}` : 'Update location'}</p>
                </div>
            </div>

            <div className="nav-search" ref={searchRef}>
                <select className="search-select">
                    <option>All</option>
                    <option>Men</option>
                    <option>Women</option>
                    <option>Kids</option>
                    <option>Accessories</option>
                </select>
                <div className="search-input-container" style={{ flex: 1, position: 'relative' }}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search products, categories..."
                        value={searchQuery}
                        onChange={(e) => {
                            onSearchChange(e);
                            setShowRecommendations(true);
                        }}
                        onFocus={() => setShowRecommendations(true)}
                        style={{ width: '100%', height: '100%', border: 'none', padding: '0 15px', outline: 'none' }}
                    />
                    
                    {showRecommendations && recommendations.length > 0 && (
                        <div className="search-recommendations">
                            {recommendations.map(item => (
                                <div 
                                    key={item.id} 
                                    className="recommendation-item"
                                    onClick={() => handleSearchClick(item.name)}
                                >
                                    <i className="fas fa-search" style={{ marginRight: '10px', color: '#999' }}></i>
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="search-icon">
                    <i className="fas fa-magnifying-glass"></i>
                </div>
            </div>

            <div 
                className="nav-signin" 
                onClick={() => user ? setShowUserMenu(!showUserMenu) : onLoginClick()} 
                style={{ cursor: 'pointer', position: 'relative' }}
            >
                <p><span>Hello, {user ? user.name : 'sign in'}</span></p>
                <p className="nav-second">Account & Lists</p>

                {showUserMenu && user && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        backgroundColor: 'white',
                        color: 'black',
                        padding: '10px',
                        borderRadius: '4px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 1000,
                        minWidth: '150px'
                    }}>
                        <div style={{ padding: '8px', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>{user.email}</div>
                        <div 
                            style={{ padding: '8px', cursor: 'pointer' }} 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowUserMenu(false);
                                onDashboardClick && onDashboardClick();
                            }}
                        >
                            📊 Dashboard
                        </div>
                        <div 
                            style={{ padding: '8px', cursor: 'pointer' }} 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowUserMenu(false);
                                onDashboardClick && onDashboardClick();
                            }}
                        >
                            📦 Your Orders
                        </div>
                        <div 
                            style={{ padding: '8px', cursor: 'pointer' }} 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowUserMenu(false);
                                onWishlistClick();
                            }}
                        >
                            ❤️ Your Wishlist
                        </div>
                        <div 
                            style={{ padding: '8px', cursor: 'pointer', color: '#e74c3c', borderTop: '1px solid #eee' }} 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowUserMenu(false);
                                onLogout();
                            }}
                        >
                            Sign Out
                        </div>
                    </div>
                )}
            </div>

            <div 
                className="nav-return"
                onClick={() => {
                    if (user && onDashboardClick) {
                        onDashboardClick();
                    } else if (!user) {
                        onLoginClick();
                    }
                }}
                style={{ cursor: 'pointer' }}
            >
                <p><span>Track</span></p>
                <p className="nav-second">Your Orders</p>
            </div>

            <div
                className="nav-cart"
                onClick={onCartClick}
                style={{ cursor: 'pointer' }}
            >
                <i className="fas fa-shopping-cart"></i>
                Cart
                {cartCount > 0 && (
                    <span className="cart-count">{cartCount}</span>
                )}
            </div>

            <div
                className="nav-wishlist"
                onClick={onWishlistClick}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', borderRadius: '4px', position: 'relative' }}
            >
                <i className="far fa-heart" style={{ fontSize: '24px' }}></i>
                <span style={{ fontWeight: '700' }}>Wishlist</span>
                {wishlistCount > 0 && (
                    <span className="cart-count" style={{ backgroundColor: '#e74c3c' }}>{wishlistCount}</span>
                )}
            </div>

            <div
                className="nav-theme-toggle"
                onClick={onToggleDarkMode}
                style={{ cursor: 'pointer', padding: '10px', display: 'flex', alignItems: 'center', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
                <i className={darkMode ? "fas fa-sun" : "fas fa-moon"} style={{ fontSize: '20px', color: darkMode ? '#f39c12' : '#f1c40f' }}></i>
            </div>
        </nav>
    );
};

export default Navbar;
