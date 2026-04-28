import React, { useState } from 'react';

const CustomizationSection = ({ onCustomize }) => {
    const [selectedType, setSelectedType] = useState(null);

    const customizableProducts = [
        {
            id: 'custom-tshirt',
            type: 'T-Shirt',
            name: 'Custom T-Shirt',
            category: "Men's",
            price: 599,
            image: '/images/product-1.jpg',
            icon: '👕',
            description: 'Design your own custom t-shirt with your photos, text, or templates',
            colors: ['Black', 'White', 'Navy', 'Gray', 'Red'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        },
        {
            id: 'custom-hoodie',
            type: 'Hoodie',
            name: 'Custom Hoodie',
            category: "Men's",
            price: 1299,
            image: '/images/product-3.jpg',
            icon: '🧥',
            description: 'Create a unique hoodie with your custom design',
            colors: ['Black', 'Gray', 'Navy', 'Maroon'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        },
        {
            id: 'custom-cup',
            type: 'Cup',
            name: 'Custom Printed Cup',
            category: 'Accessories',
            price: 299,
            image: '/images/product-5.jpg',
            icon: '☕',
            description: 'Personalize your cup with custom prints and messages',
            colors: ['White', 'Black', 'Blue', 'Red'],
            sizes: ['Standard']
        }
    ];

    const handleCustomizeClick = (product) => {
        onCustomize(product);
    };

    return (
        <div style={{
            padding: '60px 20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ 
                        fontSize: '2.5rem', 
                        marginBottom: '15px',
                        fontWeight: 'bold'
                    }}>
                        🎨 Custom Print Studio
                    </h2>
                    <p style={{ 
                        fontSize: '1.2rem', 
                        opacity: 0.9,
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Design your own unique products with custom prints, photos, and text
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '30px',
                    marginBottom: '40px'
                }}>
                    {customizableProducts.map(product => (
                        <div
                            key={product.id}
                            style={{
                                background: 'white',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                            }}
                        >
                            <div style={{
                                height: '250px',
                                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    fontSize: '120px',
                                    opacity: 0.3,
                                    position: 'absolute'
                                }}>
                                    {product.icon}
                                </div>
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    style={{
                                        width: '80%',
                                        height: '80%',
                                        objectFit: 'contain',
                                        position: 'relative',
                                        zIndex: 1
                                    }}
                                />
                            </div>

                            <div style={{ padding: '25px', color: '#333' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    marginBottom: '10px'
                                }}>
                                    <span style={{ fontSize: '32px' }}>{product.icon}</span>
                                    <h3 style={{ 
                                        fontSize: '1.5rem',
                                        margin: 0,
                                        fontWeight: 'bold'
                                    }}>
                                        {product.name}
                                    </h3>
                                </div>

                                <p style={{
                                    color: '#666',
                                    fontSize: '0.95rem',
                                    marginBottom: '15px',
                                    lineHeight: '1.5'
                                }}>
                                    {product.description}
                                </p>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '15px',
                                    padding: '10px',
                                    background: '#f9f9f9',
                                    borderRadius: '8px'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', color: '#666' }}>Starting at</div>
                                        <div style={{ 
                                            fontSize: '1.5rem', 
                                            fontWeight: 'bold',
                                            color: '#2d7a3e'
                                        }}>
                                            ₹{product.price}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.85rem', color: '#666' }}>Available</div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                                            {product.sizes.length} Sizes
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleCustomizeClick(product)}
                                    style={{
                                        width: '100%',
                                        padding: '15px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <span style={{ fontSize: '24px' }}>🎨</span>
                                    Start Customizing
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '15px',
                    padding: '30px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
                        ✨ How It Works
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '20px'
                    }}>
                        <div>
                            <div style={{ fontSize: '48px', marginBottom: '10px' }}>1️⃣</div>
                            <strong style={{ display: 'block', marginBottom: '5px' }}>Choose Product</strong>
                            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                                Select T-Shirt, Hoodie, or Cup
                            </p>
                        </div>
                        <div>
                            <div style={{ fontSize: '48px', marginBottom: '10px' }}>2️⃣</div>
                            <strong style={{ display: 'block', marginBottom: '5px' }}>Design It</strong>
                            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                                Upload image, add text, or use templates
                            </p>
                        </div>
                        <div>
                            <div style={{ fontSize: '48px', marginBottom: '10px' }}>3️⃣</div>
                            <strong style={{ display: 'block', marginBottom: '5px' }}>Add to Cart</strong>
                            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                                Save your design and checkout
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomizationSection;
