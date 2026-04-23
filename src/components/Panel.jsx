import React from 'react';

const Panel = ({ onPanelClick }) => {
    return (
        <div className="panel">
            <div className="panel-all">
                <i className="fas fa-bars"></i>
                All Categories
            </div>
            <div className="panel-ops">
                <p onClick={() => onPanelClick('trending')}>🔥 Trending Now</p>
                <p onClick={() => onPanelClick('new-arrivals')}>✨ New Arrivals</p>
                <p onClick={() => onPanelClick('bestsellers')}>⭐ Best Sellers</p>
                <p onClick={() => onPanelClick('deals')}>💰 Special Deals</p>
            </div>
            <div className="panel-deals">
                <i className="fas fa-star"></i> Why FashionHub?
            </div>
        </div>
    );
};

export default Panel;
