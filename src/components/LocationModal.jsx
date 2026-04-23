import React, { useState } from 'react';

const LocationModal = ({ currentLocation, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        city: currentLocation.city || '',
        pincode: currentLocation.pincode || '',
        state: currentLocation.state || '',
        country: currentLocation.country || 'India'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    const popularCities = [
        { name: 'Mumbai', pincode: '400001', state: 'Maharashtra' },
        { name: 'Delhi', pincode: '110001', state: 'Delhi' },
        { name: 'Bangalore', pincode: '560001', state: 'Karnataka' },
        { name: 'Hyderabad', pincode: '500001', state: 'Telangana' },
        { name: 'Chennai', pincode: '600001', state: 'Tamil Nadu' },
        { name: 'Kolkata', pincode: '700001', state: 'West Bengal' },
        { name: 'Pune', pincode: '411001', state: 'Maharashtra' },
        { name: 'Ahmedabad', pincode: '380001', state: 'Gujarat' }
    ];

    const handleQuickSelect = (city) => {
        setFormData({
            city: city.name,
            pincode: city.pincode,
            state: city.state,
            country: 'India'
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose} style={{ zIndex: 600 }}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                <div className="modal-header">
                    <h2>📍 Update Your Location</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>

                <div style={{ padding: '20px' }}>
                    <p style={{ marginBottom: '20px', color: '#666' }}>
                        Select your location to see products available in your area and get accurate delivery estimates.
                    </p>

                    <div style={{ marginBottom: '25px' }}>
                        <h3 style={{ marginBottom: '15px', fontSize: '1rem' }}>Quick Select Popular Cities:</h3>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(2, 1fr)', 
                            gap: '10px' 
                        }}>
                            {popularCities.map((city) => (
                                <button
                                    key={city.name}
                                    type="button"
                                    onClick={() => handleQuickSelect(city)}
                                    style={{
                                        padding: '12px',
                                        border: formData.city === city.name ? '2px solid #2196f3' : '1px solid #ddd',
                                        borderRadius: '8px',
                                        background: formData.city === city.name ? '#e3f2fd' : 'white',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <div style={{ fontWeight: 'bold', color: '#333' }}>{city.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#666' }}>{city.state}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ 
                        borderTop: '1px solid #ddd', 
                        paddingTop: '20px',
                        marginTop: '20px'
                    }}>
                        <h3 style={{ marginBottom: '15px', fontSize: '1rem' }}>Or Enter Custom Location:</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                    City *
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Enter your city"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                        PIN Code *
                                    </label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        required
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        placeholder="XXXXXX"
                                        maxLength="6"
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc'
                                        }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                        State *
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        required
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="State"
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc'
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="checkout-btn"
                                style={{ width: '100%' }}
                            >
                                Update Location
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationModal;
