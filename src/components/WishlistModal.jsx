import React from 'react';

const WishlistModal = ({ wishlistItems, onClose, onRemoveFromWishlist, onAddToCart }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="cart-modal" onClick={e => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Your Wishlist ({wishlistItems.length} items)</h2>
                    <button className="cart-close-btn" onClick={onClose}>&times;</button>
                </div>
                
                <div className="cart-items">
                    {wishlistItems.length === 0 ? (
                        <div className="empty-cart">
                            <i className="far fa-heart" style={{ fontSize: '3rem', marginBottom: '15px', color: '#ccc' }}></i>
                            <p>Your wishlist is empty.</p>
                            <button className="checkout-btn" style={{ marginTop: '20px' }} onClick={onClose}>
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        wishlistItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                </div>
                                <div className="cart-item-details">
                                    <div className="cart-item-name">{item.name}</div>
                                    <div className="cart-item-price">₹{item.price.toFixed(2)}</div>
                                    <button 
                                        className="cart-remove-btn" 
                                        style={{ color: '#2d7a3e', marginRight: '15px' }}
                                        onClick={() => {
                                            onAddToCart(item);
                                            onRemoveFromWishlist(item.id);
                                        }}
                                    >
                                        <i className="fas fa-shopping-cart"></i> Move to Cart
                                    </button>
                                    <button className="cart-remove-btn" onClick={() => onRemoveFromWishlist(item.id)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default WishlistModal;
