import React from 'react';

const ProductCard = ({ product, onViewDetails, onAddToCart, isWishlisted, onToggleWishlist, isInComparison, onToggleComparison }) => {
    return (
        <div
            className="product-card"
            onClick={() => onViewDetails(product)}
        >
            <div className="product-image" style={{ position: 'relative' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                    className="wishlist-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                    }}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        color: isWishlisted ? '#e74c3c' : '#ccc',
                        fontSize: '1.2rem',
                        transition: 'all 0.3s ease'
                    }}
                >
                    <i className={isWishlisted ? "fas fa-heart" : "far fa-heart"}></i>
                </button>
                {onToggleComparison && (
                    <button 
                        className="compare-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleComparison(product);
                        }}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            background: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                            color: isInComparison ? '#2196f3' : '#ccc',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease'
                        }}
                        title={isInComparison ? 'Remove from comparison' : 'Add to comparison'}
                    >
                        <i className="fas fa-balance-scale"></i>
                    </button>
                )}
            </div>
            <h3 className="product-name">{product.name}</h3>
            <div className="product-rating">
                <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
                <span>({product.reviews})</span>
            </div>
            <div className="product-price">
                ₹{product.price.toFixed(2)}
            </div>
            {product.discount > 0 && (
                <div className="product-discount">
                    {product.discount}% off
                </div>
            )}
            <button
                className="add-to-cart-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                }}
            >
                <i className="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
