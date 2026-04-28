import React, { useState, useEffect } from 'react';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/admin/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch orders');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ orderStatus: newStatus }),
            });

            if (!response.ok) throw new Error('Failed to update order status');
            alert('Order status updated successfully');
            fetchOrders();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update order status');
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'Pending': '#f39c12',
            'Processing': '#3498db',
            'Confirmed': '#9b59b6',
            'Shipped': '#1abc9c',
            'Delivered': '#27ae60',
            'Cancelled': '#e74c3c'
        };
        return colors[status] || '#95a5a6';
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Loading orders...</div>;
    }

    return (
        <div>
            <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>🛒 Order Management</h1>

            <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ marginBottom: '20px' }}>All Orders ({orders.length})</h2>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee', background: '#f9f9f9' }}>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Order ID</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Customer</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>Items</th>
                                <th style={{ padding: '12px', textAlign: 'right' }}>Total</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                            #{order._id.slice(-8)}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>{order.user?.name || 'N/A'}</td>
                                    <td style={{ padding: '12px' }}>{order.user?.email || 'N/A'}</td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        {order.orderItems?.length || 0}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>
                                        ₹{order.totalPrice || order.totalAmount || 0}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '6px 12px',
                                            borderRadius: '12px',
                                            fontSize: '0.85rem',
                                            background: `${getStatusColor(order.status || order.orderStatus)}20`,
                                            color: getStatusColor(order.status || order.orderStatus),
                                            fontWeight: 'bold'
                                        }}>
                                            {order.status || order.orderStatus || 'Pending'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            style={{
                                                padding: '6px 12px',
                                                background: '#3498db',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                marginRight: '8px'
                                            }}
                                        >
                                            👁️ View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000
                }}>
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '12px',
                        maxWidth: '700px',
                        width: '90%',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    }}>
                        <h2 style={{ marginBottom: '20px' }}>Order Details</h2>

                        <div style={{ marginBottom: '20px' }}>
                            <strong>Order ID:</strong> #{selectedOrder._id}
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <strong>Customer:</strong> {selectedOrder.user?.name} ({selectedOrder.user?.email})
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <strong>Shipping Address:</strong>
                            <div style={{ marginTop: '5px', padding: '10px', background: '#f9f9f9', borderRadius: '4px' }}>
                                {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <strong>Order Items:</strong>
                            {selectedOrder.orderItems?.map((item, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    gap: '15px',
                                    padding: '10px',
                                    background: '#f9f9f9',
                                    borderRadius: '4px',
                                    marginTop: '10px'
                                }}>
                                    <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                    <div style={{ flex: 1 }}>
                                        <div>{item.name}</div>
                                        <div style={{ color: '#666', fontSize: '0.9rem' }}>Qty: {item.qty} × ₹{item.price}</div>
                                    </div>
                                    <div style={{ fontWeight: 'bold' }}>₹{item.qty * item.price}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <strong>Update Status:</strong>
                            <select
                                value={selectedOrder.status || selectedOrder.orderStatus}
                                onChange={(e) => handleStatusUpdate(selectedOrder._id, e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    marginTop: '10px'
                                }}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                        <button
                            onClick={() => setSelectedOrder(null)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: '#95a5a6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
