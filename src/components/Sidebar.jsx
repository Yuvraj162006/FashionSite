import React from 'react';

const Sidebar = ({ priceRange, onPriceChange }) => {
    return (
        <div className="sidebar">
            <div className="filter-group">
                <div className="filter-title">Price Range</div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                        type="number"
                        className="price-input"
                        value={priceRange.min}
                        onChange={(e) => onPriceChange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                        placeholder="Min"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        className="price-input"
                        value={priceRange.max}
                        onChange={(e) => onPriceChange({ ...priceRange, max: parseInt(e.target.value) || 10000 })}
                        placeholder="Max"
                    />
                </div>
            </div>

            <div className="filter-group">
                <div className="filter-title">Rating</div>
                <div className="filter-option">
                    <input type="checkbox" id="rating4" />
                    <label htmlFor="rating4">⭐⭐⭐⭐ & up</label>
                </div>
                <div className="filter-option">
                    <input type="checkbox" id="rating3" />
                    <label htmlFor="rating3">⭐⭐⭐ & up</label>
                </div>
            </div>

            <div className="filter-group">
                <div className="filter-title">Discount</div>
                <div className="filter-option">
                    <input type="checkbox" id="discount50" />
                    <label htmlFor="discount50">50% or more</label>
                </div>
                <div className="filter-option">
                    <input type="checkbox" id="discount30" />
                    <label htmlFor="discount30">30% or more</label>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
