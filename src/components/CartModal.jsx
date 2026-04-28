import React from 'react';

const CartModal = ({ cartItems, onClose, onRemoveItem, onUpdateQuantity, onCheckout }) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    const handleCheckout = () => {
        if (onCheckout) onCheckout();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Shopping Cart ({cartItems.length})</h2>
                    <button className="cart-close-btn" onClick={onClose}>×</button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🛒</div>
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image" style={{ position: 'relative' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                    {item.isCustomized && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: '5px',
                                            background: '#ffc107',
                                            color: '#000',
                                            padding: '3px 8px',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            fontWeight: 'bold'
                                        }}>
                                            🎨 Custom
                                        </div>
                                    )}
                                </div>
                                <div className="cart-item-details">
                                    <div className="cart-item-name">{item.name}</div>
                                    {item.isCustomized && item.customDesign && (
                                        <div style={{
                                            fontSize: '11px',
                                            color: '#666',
                                            marginTop: '5px',
                                            padding: '5px',
                                            background: '#f9f9f9',
                                            borderRadius: '4px'
                                        }}>
                                            <strong>Custom Design:</strong>
                                            {item.customDesign.type === 'upload' && ' Uploaded Image'}
                                            {item.customDesign.type === 'template' && ` Template: ${item.customDesign.template?.name}`}
                                            {item.customDesign.type === 'text' && ` Text: "${item.customDesign.text?.substring(0, 20)}${item.customDesign.text?.length > 20 ? '...' : ''}"`}
                                        </div>
                                    )}
                                    <div className="cart-item-price">₹{item.price.toFixed(2)}</div>
                                    <div className="cart-quantity">
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>−</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button
                                        className="cart-remove-btn"
                                        onClick={() => onRemoveItem(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-subtotal">
                            <span>Subtotal:</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '15px'
                        }}>
                            <span>Tax (18%):</span>
                            <span>₹{tax.toFixed(2)}</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            marginBottom: '15px'
                        }}>
                            <span>Total:</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <button className="checkout-btn" onClick={handleCheckout}>
                            <i className="fas fa-lock"></i> Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;
