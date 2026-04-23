import React, { useState } from 'react';
import '../styles/OrderTracking.css';

const OrderTracking = ({ order, onClose }) => {
    const [showMap, setShowMap] = useState(false);

    const orderStatuses = [
        { status: 'Processing', icon: '📝', description: 'Order is being processed' },
        { status: 'Confirmed', icon: '✅', description: 'Order confirmed by seller' },
        { status: 'Shipped', icon: '📦', description: 'Order has been shipped' },
        { status: 'Out for Delivery', icon: '🚚', description: 'Order is out for delivery' },
        { status: 'Delivered', icon: '🎉', description: 'Order delivered successfully' },
    ];

    const getCurrentStatusIndex = () => {
        return orderStatuses.findIndex(s => s.status === order.status);
    };

    const currentIndex = getCurrentStatusIndex();

    const getEstimatedDelivery = () => {
        const orderDate = new Date(order.createdAt);
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(deliveryDate.getDate() + 5); // 5 days delivery
        return deliveryDate.toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    };

    const getDeliveryAddress = () => {
        const addr = order.shippingAddress;
        return `${addr.address}, ${addr.city}, ${addr.postalCode}, ${addr.country}`;
    };

    return (
        <div className="tracking-modal">
            <div className="tracking-content">
                <button className="close-btn" onClick={onClose}>×</button>
                
                <div className="tracking-header">
                    <h2>Track Your Order</h2>
                    <p className="order-id">Order ID: #{order._id?.slice(-8)}</p>
                </div>

                <div className="order-summary">
                    <div className="summary-item">
                        <span className="label">Order Date:</span>
                        <span className="value">
                            {new Date(order.createdAt).toLocaleDateString('en-IN')}
                        </span>
                    </div>
                    <div className="summary-item">
                        <span className="label">Estimated Delivery:</span>
                        <span className="value estimated">{getEstimatedDelivery()}</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">Total Amount:</span>
                        <span className="value amount">₹{order.totalPrice}</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">Payment Status:</span>
                        <span className={`value ${order.isPaid ? 'paid' : 'pending'}`}>
                            {order.isPaid ? '✅ Paid' : '⏳ Pending'}
                        </span>
                    </div>
                </div>

                <div className="delivery-address">
                    <h3>📍 Delivery Address</h3>
                    <p>{getDeliveryAddress()}</p>
                    <button 
                        className="map-btn"
                        onClick={() => setShowMap(!showMap)}
                    >
                        {showMap ? '📋 Hide Map' : '🗺️ View on Map'}
                    </button>
                </div>

                {showMap && (
                    <div className="map-container">
                        <div className="map-placeholder">
                            <div className="map-marker">📍</div>
                            <p>Delivery Location</p>
                            <small>{order.shippingAddress.city}</small>
                        </div>
                    </div>
                )}

                <div className="tracking-timeline">
                    <h3>Order Status Timeline</h3>
                    <div className="timeline">
                        {orderStatuses.map((statusItem, index) => (
                            <div 
                                key={index}
                                className={`timeline-item ${
                                    index <= currentIndex ? 'completed' : 'pending'
                                } ${index === currentIndex ? 'current' : ''}`}
                            >
                                <div className="timeline-marker">
                                    <div className="marker-icon">{statusItem.icon}</div>
                                    {index < orderStatuses.length - 1 && (
                                        <div className="timeline-line"></div>
                                    )}
                                </div>
                                <div className="timeline-content">
                                    <h4>{statusItem.status}</h4>
                                    <p>{statusItem.description}</p>
                                    {index <= currentIndex && (
                                        <span className="timestamp">
                                            {index === 0 
                                                ? new Date(order.createdAt).toLocaleString('en-IN')
                                                : index === currentIndex
                                                ? 'Current Status'
                                                : 'Completed'
                                            }
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="order-items">
                    <h3>Order Items ({order.orderItems?.length || 0})</h3>
                    <div className="items-list">
                        {order.orderItems?.map((item, index) => (
                            <div key={index} className="order-item">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <h4>{item.name}</h4>
                                    <p>Quantity: {item.qty}</p>
                                    <p className="item-price">₹{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tracking-actions">
                    <button className="btn-primary">Download Invoice</button>
                    <button className="btn-secondary">Contact Support</button>
                    {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                        <button className="btn-danger">Cancel Order</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
