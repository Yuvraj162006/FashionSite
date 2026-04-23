import React, { useState, useEffect } from 'react';

const HeroSection = () => {
    const [currentBanner, setCurrentBanner] = useState(0);

    const banners = [
        {
            id: 1,
            title: "The Premium Summer Edit",
            description: "Discover our exclusive collection of lightweight, breathable fabrics designed for elegance.",
            image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        },
        {
            id: 2,
            title: "Tech that Moves You",
            description: "Experience next-generation audio and precision wearables from top global brands.",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        },
        {
            id: 3,
            title: "Elevate Your Routine",
            description: "High-performance activewear engineered for both comfort and unmatched style.",
            image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        },
        {
            id: 4,
            title: "The Art of Details",
            description: "Complete your look with our curated selection of luxury watches and designer bags.",
            image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        },
        {
            id: 5,
            title: "Sneaker Culture",
            description: "Step up your game with limited-edition drops and timeless street-style classics.",
            image: "https://images.unsplash.com/photo-1552346154-21d32810baa3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        },
    ];

    // Auto-rotate banners every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [banners.length]);

    const handlePrevBanner = () => {
        setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const handleNextBanner = () => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
    };

    const handleDotClick = (index) => {
        setCurrentBanner(index);
    };

    const banner = banners[currentBanner];

    return (
        <div className="hero-section">
            <div 
                className="hero-banner"
                style={{ 
                    backgroundImage: `url(${banner.image})`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="hero-overlay"></div>

                <div className="hero-content">
                    <h1 className="hero-title">{banner.title}</h1>
                    <p className="hero-description">{banner.description}</p>
                    <button className="hero-cta-btn">
                        <i className="fas fa-shopping-bag"></i> Shop Collection
                    </button>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button className="hero-nav-btn hero-prev" onClick={handlePrevBanner}>
                <i className="fas fa-chevron-left"></i>
            </button>
            <button className="hero-nav-btn hero-next" onClick={handleNextBanner}>
                <i className="fas fa-chevron-right"></i>
            </button>

            {/* Dot Indicators */}
            <div className="hero-dots">
                {banners.map((_, index) => (
                    <div
                        key={index}
                        className={`hero-dot ${index === currentBanner ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    ></div>
                ))}
            </div>

            {/* Promotional Message Bar */}
            <div className="hero-promo-bar">
                <i className="fas fa-truck"></i>
                <span>Free Worldwide Shipping on all orders over ₹499 | 30-Day Easy Returns | Premium Support</span>
                <i className="fas fa-shield-alt"></i>
            </div>
        </div>
    );
};

export default HeroSection;
