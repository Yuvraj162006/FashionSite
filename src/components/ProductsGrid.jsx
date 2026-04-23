import React from 'react';
import ProductCard from './ProductCard';

const ProductsGrid = ({ products, onViewDetails, onAddToCart, wishlistItems, onToggleWishlist, comparisonProducts, onToggleComparison, sortBy, onSortChange }) => {
    return (
        <div className="products-container">
            <div className="products-header">
                <div className="products-count">
                    Showing {products.length} products
                    {comparisonProducts && comparisonProducts.length > 0 && (
                        <span style={{ marginLeft: '15px', color: '#2196f3', fontWeight: 'bold' }}>
                            | {comparisonProducts.length} in comparison
                        </span>
                    )}
                </div>
                <select
                    className="sort-dropdown"
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                >
                    <option value="popular">Sort: Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                </select>
            </div>

            {comparisonProducts && comparisonProducts.length > 0 && (
                <div style={{
                    padding: '10px 15px',
                    background: '#e3f2fd',
                    borderRadius: '8px',
                    marginBottom: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span>
                        <i className="fas fa-balance-scale" style={{ marginRight: '8px' }}></i>
                        {comparisonProducts.length} product{comparisonProducts.length > 1 ? 's' : ''} selected for comparison
                    </span>
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('showComparison'))}
                        style={{
                            padding: '8px 16px',
                            background: '#2196f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Compare Now
                    </button>
                </div>
            )}

            <div className="products-grid">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onViewDetails={onViewDetails}
                            onAddToCart={onAddToCart}
                            isWishlisted={wishlistItems.some(item => item.id === product.id)}
                            onToggleWishlist={onToggleWishlist}
                            isInComparison={comparisonProducts && comparisonProducts.some(item => item.id === product.id)}
                            onToggleComparison={onToggleComparison}
                        />
                    ))
                ) : (
                    <div style={{
                        gridColumn: '1/-1',
                        textAlign: 'center',
                        padding: '40px'
                    }}>
                        <div style={{
                            fontSize: '3rem',
                            marginBottom: '10px'
                        }}>🔍</div>
                        <p>No products found. Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsGrid;
