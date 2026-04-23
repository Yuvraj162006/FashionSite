import React, { useState } from 'react';
import '../styles/UserDashboard.css';

const UserDashboard = ({ user, orders, onClose, onLogout, onViewOrder }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = {
        totalOrders: orders?.length || 0,
        totalSpent: orders?.reduce((sum, order) => sum + order.totalPrice, 0) || 0,
        pendingOrders: orders?.filter(o => o.status === 'Processing').length || 0,
        completedOrders: orders?.filter(o => o.status === 'Delivered').length || 0,
    };

    return (
        <div className="dashboard-modal">
            <div className="dashboard-content">
                <button className="close-btn" onClick={onClose}>×</button>
                
                <div className="dashboard-header">
                    <div className="user-info">
                        <div className="avatar">
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.name} />
                            ) : (
                                <span>{user.name?.charAt(0).toUpperCase()}</span>
                            )}
                        </div>
                        <div>
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                            <span className="user-badge">{user.role}</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-tabs">
                    <button 
                        className={activeTab === 'overview' ? 'active' : ''}
                        onClick={() => setActiveTab('overview')}
                    >
                        📊 Overview
                    </button>
                    <button 
                        className={activeTab === 'orders' ? 'active' : ''}
                        onClick={() => setActiveTab('orders')}
                    >
                        📦 Orders
                    </button>
                    <button 
                        className={activeTab === 'profile' ? 'active' : ''}
                        onClick={() => setActiveTab('profile')}
                    >
                        👤 Profile
                    </button>
                </div>

                <div className="dashboard-body">
                    {activeTab === 'overview' && (
                        <div className="overview-tab">
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon">📦</div>
                                    <div className="stat-info">
                                        <h3>{stats.totalOrders}</h3>
                                        <p>Total Orders</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">💰</div>
                                    <div className="stat-info">
                                        <h3>₹{stats.totalSpent.toFixed(2)}</h3>
                                        <p>Total Spent</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">⏳</div>
                                    <div className="stat-info">
                                        <h3>{stats.pendingOrders}</h3>
                                        <p>Pending Orders</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">✅</div>
                                    <div className="stat-info">
                                        <h3>{stats.completedOrders}</h3>
                                        <p>Completed</p>
                                    </div>
                                </div>
                            </div>

                            <div className="recent-activity">
                                <h3>Recent Orders</h3>
                                {orders && orders.length > 0 ? (
                                    <div className="orders-list">
                                        {orders.slice(0, 5).map((order) => (
                                            <div 
                                                key={order._id} 
                                                className="order-item"
                                                onClick={() => onViewOrder && onViewOrder(order)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="order-info">
                                                    <span className="order-id">#{order._id?.slice(-6)}</span>
                                                    <span className="order-date">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="order-details">
                                                    <span className="order-total">₹{order.totalPrice}</span>
                                                    <span className={`order-status ${order.status?.toLowerCase()}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="no-data">No orders yet</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="orders-tab">
                            <h3>All Orders</h3>
                            {orders && orders.length > 0 ? (
                                <div className="orders-table">
                                    {orders.map((order) => (
                                        <div 
                                            key={order._id} 
                                            className="order-card"
                                            onClick={() => onViewOrder && onViewOrder(order)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="order-header">
                                                <span className="order-id">Order #{order._id?.slice(-8)}</span>
                                                <span className={`status-badge ${order.status?.toLowerCase()}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="order-body">
                                                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                                <p><strong>Items:</strong> {order.orderItems?.length || 0}</p>
                                                <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                                                <p><strong>Payment:</strong> {order.isPaid ? '✅ Paid' : '❌ Pending'}</p>
                                            </div>
                                            <button 
                                                className="btn-primary" 
                                                style={{ marginTop: '10px', width: '100%' }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onViewOrder && onViewOrder(order);
                                                }}
                                            >
                                                🚚 Track Order
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-data">No orders found</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="profile-tab">
                            <div className="profile-section">
                                <h3>Personal Information</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Name</label>
                                        <p>{user.name}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Email</label>
                                        <p>{user.email}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Phone</label>
                                        <p>{user.phone || 'Not provided'}</p>
                                    </div>
                                    <div className="info-item">
                                        <label>Member Since</label>
                                        <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-actions">
                                <button className="btn-primary">Edit Profile</button>
                                <button className="btn-secondary">Change Password</button>
                                <button className="btn-danger" onClick={onLogout}>Logout</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
