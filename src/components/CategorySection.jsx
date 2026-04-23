import React from 'react';

const CategorySection = ({ categories, selectedCategory, onCategorySelect }) => {
    return (
        <div className="category-section">
            {categories.map(category => (
                <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => onCategorySelect(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategorySection;
