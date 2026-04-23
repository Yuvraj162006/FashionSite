import React, { useState } from 'react';

const ProductModal = ({ product, onClose, onAddToCart }) => {
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('Black');

    if (!product) return null;

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const colors = ['Black', 'Navy', 'White', 'Gray'];

    const handleAddToCart = () => {
        onAddToCart({
            ...product,
            id: `${product.id}-${selectedSize}-${selectedColor}`,
            name: `${product.name} (${selectedSize}, ${selectedColor})`
        });
        onClose();
    };

    const handleBuyNow = () => {
        onAddToCart({
            ...product,
            id: `${product.id}-${selectedSize}-${selectedColor}`,
            name: `${product.name} (${selectedSize}, ${selectedColor})`
        });
        alert('Added to cart! Proceed to checkout from the cart menu.');
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{product.name}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <div className="modal-image">
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div className="modal-rating">
                    <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
                    <span> {product.rating} rating • {product.reviews} reviews</span>
                </div>

                <div className="modal-price">
                    ₹{product.price.toFixed(2)}
                    {product.originalPrice > product.price && (
                        <>
                            <span style={{
                                textDecoration: 'line-through',
                                marginLeft: '10px',
                                fontSize: '0.9rem',
                                color: '#666'
                            }}>
                                ₹{product.originalPrice.toFixed(2)}
                            </span>
                            <span style={{
                                color: '#2d7a3e',
                                marginLeft: '10px',
                                fontSize: '0.9rem'
                            }}>
                                {product.discount}% off
                            </span>
                        </>
                    )}
                </div>

                <div className="modal-description">{product.description}</div>

                <div style={{ marginBottom: '20px' }}>
                    <strong style={{ display: 'block', marginBottom: '10px' }}>Select Size:</strong>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {sizes.map(size => (
                            <button 
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                style={{
                                    padding: '8px 15px',
                                    border: `2px solid ${selectedSize === size ? '#f0c14b' : '#ddd'}`,
                                    background: selectedSize === size ? '#fdf8e8' : 'white',
                                    color: 'black',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: selectedSize === size ? 'bold' : 'normal'
                                }}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <strong style={{ display: 'block', marginBottom: '10px' }}>Select Color:</strong>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {colors.map(color => (
                            <button 
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                style={{
                                    padding: '8px 15px',
                                    border: `2px solid ${selectedColor === color ? '#f0c14b' : '#ddd'}`,
                                    background: selectedColor === color ? '#fdf8e8' : 'white',
                                    color: 'black',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: selectedColor === color ? 'bold' : 'normal'
                                }}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="modal-specs">
                    <strong style={{ display: 'block', marginBottom: '10px' }}>
                        Product Specifications:
                    </strong>
                    {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key}>
                            <strong>{key}:</strong>
                            <span style={{ marginLeft: '10px' }}>{value}</span>
                        </div>
                    ))}
                </div>

                <div className="modal-actions">
                    <button
                        className="modal-buy-btn"
                        onClick={handleAddToCart}
                    >
                        <i className="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button
                        className="modal-cart-btn"
                        onClick={handleBuyNow}
                    >
                        <i className="fas fa-bolt"></i> Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
