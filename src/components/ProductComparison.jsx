import React from 'react';
import '../styles/ProductComparison.css';

const ProductComparison = ({ products, onClose, onRemove }) => {
    if (!products || products.length === 0) {
        return (
            <div className="comparison-modal">
                <div className="comparison-content empty">
                    <button className="close-btn" onClick={onClose}>×</button>
                    <h2>Product Comparison</h2>
                    <p>No products to compare. Add products to comparison from product cards.</p>
                </div>
            </div>
        );
    }

    const features = [
        { key: 'price', label: 'Price' },
        { key: 'rating', label: 'Rating' },
        { key: 'reviews', label: 'Reviews' },
        { key: 'category', label: 'Category' },
        { key: 'brand', label: 'Brand' },
        { key: 'countInStock', label: 'In Stock' },
    ];

    return (
        <div className="comparison-modal">
            <div className="comparison-content">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Compare Products ({products.length})</h2>
                
                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                {products.map((product) => (
                                    <th key={product.id}>
                                        <div className="product-header">
                                            <img src={product.image} alt={product.name} />
                                            <h4>{product.name}</h4>
                                            <button 
                                                className="remove-btn"
                                                onClick={() => onRemove(product.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature) => (
                                <tr key={feature.key}>
                                    <td className="feature-label">{feature.label}</td>
                                    {products.map((product) => (
                                        <td key={product.id}>
                                            {feature.key === 'price' && `₹${product.price}`}
                                            {feature.key === 'rating' && (
                                                <span className="rating">
                                                    ⭐ {product.rating || 0}
                                                </span>
                                            )}
                                            {feature.key === 'reviews' && `${product.reviews || 0} reviews`}
                                            {feature.key === 'countInStock' && (
                                                <span className={product.countInStock > 0 ? 'in-stock' : 'out-stock'}>
                                                    {product.countInStock > 0 ? `${product.countInStock} available` : 'Out of Stock'}
                                                </span>
                                            )}
                                            {!['price', 'rating', 'reviews', 'countInStock'].includes(feature.key) && 
                                                product[feature.key]
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductComparison;
