import React, { useState } from 'react';

const CheckoutModal = ({ cartItems, total, onClose, onPlaceOrder, user }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        address: '',
        city: '',
        state: '',
        country: 'India',
        zip: '',
        phone: user?.phone || '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    const [deliveryOption, setDeliveryOption] = useState('standard');

    const deliveryOptions = [
        { id: 'standard', name: 'Standard Delivery', time: '5-7 days', price: 0 },
        { id: 'express', name: 'Express Delivery', time: '2-3 days', price: 99 },
        { id: 'sameday', name: 'Same Day Delivery', time: 'Today', price: 199 },
        { id: 'scheduled', name: 'Scheduled Delivery', time: 'Choose date', price: 149 }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(3);
        
        const selectedDelivery = deliveryOptions.find(opt => opt.id === deliveryOption);
        const itemsPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const taxPrice = itemsPrice * 0.18;
        const shippingPrice = selectedDelivery.price;
        const totalPrice = itemsPrice + taxPrice + shippingPrice;

        const orderData = {
            shippingAddress: {
                address: formData.address,
                city: formData.city,
                postalCode: formData.zip,
                state: formData.state,
                country: formData.country,
                phone: formData.phone
            },
            paymentMethod: 'Card',
            deliveryOption: selectedDelivery,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        };

        setTimeout(() => {
            onPlaceOrder(orderData);
        }, 2000);
    };

    return (
        <div className="modal-overlay" onClick={onClose} style={{ zIndex: 500 }}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                <div className="modal-header">
                    <h2>{step === 1 ? 'Shipping Address' : step === 2 ? 'Payment Method' : 'Processing Order'}</h2>
                    {step !== 3 && <button className="modal-close" onClick={onClose}>&times;</button>}
                </div>

                {step === 1 && (
                    <form onSubmit={handleNext}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name *</label>
                            <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone Number *</label>
                            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Address *</label>
                            <textarea name="address" required value={formData.address} onChange={handleChange} rows="2" placeholder="House No., Building Name, Street" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>City *</label>
                                <input type="text" name="city" required value={formData.city} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>State *</label>
                                <input type="text" name="state" required value={formData.state} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>PIN Code *</label>
                                <input type="text" name="zip" required value={formData.zip} onChange={handleChange} placeholder="XXXXXX" maxLength="6" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Country *</label>
                                <input type="text" name="country" required value={formData.country} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
                            <h4 style={{ marginBottom: '15px', color: '#333' }}>🚚 Select Delivery Option</h4>
                            {deliveryOptions.map(option => (
                                <label key={option.id} style={{ display: 'flex', alignItems: 'center', padding: '12px', marginBottom: '10px', background: deliveryOption === option.id ? '#e3f2fd' : 'white', border: `2px solid ${deliveryOption === option.id ? '#2196f3' : '#ddd'}`, borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s' }}>
                                    <input 
                                        type="radio" 
                                        name="delivery" 
                                        value={option.id}
                                        checked={deliveryOption === option.id}
                                        onChange={(e) => setDeliveryOption(e.target.value)}
                                        style={{ marginRight: '12px' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 'bold', color: '#333' }}>{option.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#666' }}>{option.time}</div>
                                    </div>
                                    <div style={{ fontWeight: 'bold', color: '#2196f3' }}>
                                        {option.price === 0 ? 'FREE' : `₹${option.price}`}
                                    </div>
                                </label>
                            ))}
                        </div>

                        <button type="submit" className="checkout-btn">Continue to Payment</button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9', color: '#333' }}>
                            <h4 style={{ marginBottom: '10px', color: '#333' }}>Order Summary</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span>Items Total:</span>
                                <span>₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span>Delivery ({deliveryOptions.find(opt => opt.id === deliveryOption)?.name}):</span>
                                <span>{deliveryOptions.find(opt => opt.id === deliveryOption)?.price === 0 ? 'FREE' : `₹${deliveryOptions.find(opt => opt.id === deliveryOption)?.price}`}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span>Tax (18%):</span>
                                <span>₹{(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.18).toFixed(2)}</span>
                            </div>
                            <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #ddd' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <strong>Total Amount:</strong>
                                <strong style={{ color: '#2196f3', fontSize: '1.2rem' }}>₹{(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.18 + deliveryOptions.find(opt => opt.id === deliveryOption)?.price).toFixed(2)}</strong>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '10px', padding: '10px', background: '#fff', borderRadius: '4px' }}>
                                <strong>📍 Deliver to:</strong><br />
                                {formData.fullName}<br />
                                {formData.address}, {formData.city}, {formData.state} - {formData.zip}<br />
                                📞 {formData.phone}
                            </div>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px' }}>Card Number</label>
                            <input type="text" name="cardNumber" required value={formData.cardNumber} onChange={handleChange} placeholder="XXXX XXXX XXXX XXXX" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>Expiry Date</label>
                                <input type="text" name="expiry" required value={formData.expiry} onChange={handleChange} placeholder="MM/YY" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                            </div>
                            <div style={{ width: '120px' }}>
                                <label style={{ display: 'block', marginBottom: '5px' }}>CVV</label>
                                <input type="password" name="cvv" required value={formData.cvv} onChange={handleChange} placeholder="***" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button type="button" onClick={() => setStep(1)} style={{ padding: '12px', background: '#e0e0e0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Back</button>
                            <button type="submit" className="checkout-btn" style={{ flex: 1 }}>Pay ₹{(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.18 + deliveryOptions.find(opt => opt.id === deliveryOption)?.price).toFixed(2)} & Place Order</button>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                        <div style={{ fontSize: '4rem', color: '#2d7a3e', marginBottom: '20px' }}>
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h3>Order Placed Successfully!</h3>
                        <p style={{ color: '#666', marginTop: '10px' }}>Thank you for shopping with FashionHub. You will receive an email confirmation shortly.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutModal;
