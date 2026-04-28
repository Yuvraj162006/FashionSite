import React from 'react';

const AdminStats = ({ stats, loading }) => {
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <div style={{ fontSize: '3rem' }}>⏳</div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    if (!stats) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <p>Failed to load dashboard stats</p>
            </div>
        );
    }

    const statCards = [
        {
            title: 'Total Users',
            value: stats.stats.totalUsers,
            icon: '👥',
            color: '#3498db',
            bgColor: '#e3f2fd'
        },
        {
            title: 'Total Products',
            value: stats.stats.totalProducts,
            icon: '📦',
            color: '#9b59b6',
            bgColor: '#f3e5f5'
        },
        {
            title: 'Total Orders',
            value: stats.stats.totalOrders,
            icon: '🛒',
            color: '#e67e22',
            bgColor: '#fff3e0'
        },
        {
            title: 'Total Revenue',
            value: `₹${stats.stats.totalRevenue}`,
            icon: '💰',
            color: '#27ae60',
            bgColor: '#e8f5e9'
        },
        {
            title: 'Pending Orders',
            value: stats.stats.pendingOrders,
            icon: '⏳',
            color: '#e74c3c',
            bgColor: '#ffebee'
        }
    ];

    return (
        <div>
            <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>📊 Dashboard Overview</h1>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
            }}>
                {statCards.map((card, index) => (
                    <div
                        key={index}
                        style={{
                            background: 'white',
                            padding: '25px',
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            border: `2px solid ${card.bgColor}`
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '15px'
                        }}>
                            <div style={{
                                fontSize: '2.5rem',
                                background: card.bgColor,
                                width: '60px',
                                height: '60px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {card.icon}
                            </div>
                        </div>
                        <div style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: card.color,
                            marginBottom: '5px'
                        }}>
                            {card.value}
                        </div>
                        <div style={{
                            fontSize: '0.9rem',
                            color: '#666'
                        }}>
                            {card.title}
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                marginBottom: '30px'
            }}>
                <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>📦 Recent Orders</h2>
                {stats.recentOrders && stats.recentOrders.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Order ID</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Customer</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                                <th style={{ padding: '12px', textAlign: 'right' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentOrders.map(order => (
                                <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>#{order._id.slice(-6)}</td>
                                    <td style={{ padding: '12px' }}>{order.user?.name || 'N/A'}</td>
                                    <td style={{ padding: '12px' }}>{order.user?.email || 'N/A'}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 12px',
                                            borderRadius: '12px',
                                            fontSize: '0.85rem',
                                            background: order.status === 'Delivered' ? '#e8f5e9' : '#fff3e0',
                                            color: order.status === 'Delivered' ? '#27ae60' : '#e67e22'
                                        }}>
                                            {order.status || order.orderStatus}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>
                                        ₹{order.totalPrice || order.totalAmount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p style={{ color: '#666' }}>No recent orders</p>
                )}
            </div>

            {/* Low Stock Products */}
            <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>⚠️ Low Stock Alert</h2>
                {stats.lowStockProducts && stats.lowStockProducts.length > 0 ? (
                    <div style={{ display: 'grid', gap: '15px' }}>
                        {stats.lowStockProducts.map(product => (
                            <div
                                key={product._id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '15px',
                                    padding: '15px',
                                    background: '#fff3e0',
                                    borderRadius: '8px',
                                    border: '1px solid #ffe0b2'
                                }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        objectFit: 'cover',
                                        borderRadius: '8px'
                                    }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                        {product.name}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                        Stock: {product.countInStock} units
                                    </div>
                                </div>
                                <div style={{
                                    padding: '8px 16px',
                                    background: '#e74c3c',
                                    color: 'white',
                                    borderRadius: '8px',
                                    fontWeight: 'bold'
                                }}>
                                    Low Stock
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: '#666' }}>All products have sufficient stock</p>
                )}
            </div>
        </div>
    );
};

export default AdminStats;
