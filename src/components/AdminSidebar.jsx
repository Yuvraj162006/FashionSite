import React from 'react';

const AdminSidebar = ({ activeTab, onTabChange, user, onLogout, onClose }) => {
    const menuItems = [
        { id: 'dashboard', icon: '📊', label: 'Dashboard' },
        { id: 'products', icon: '📦', label: 'Products' },
        { id: 'add-product', icon: '➕', label: 'Add Product' },
        { id: 'orders', icon: '🛒', label: 'Orders' },
        { id: 'users', icon: '👥', label: 'Users' },
    ];

    return (
        <div style={{
            width: '280px',
            background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
        }}>
            {/* Header */}
            <div style={{
                padding: '30px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                }}>
                    <h2 style={{
                        margin: 0,
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                    }}>
                        🛡️ Admin Panel
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            color: 'white',
                            fontSize: '24px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            width: '35px',
                            height: '35px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ×
                    </button>
                </div>
                <p style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    opacity: 0.7
                }}>
                    Welcome, {user?.name}
                </p>
            </div>

            {/* Menu Items */}
            <div style={{ flex: 1, padding: '20px 0' }}>
                {menuItems.map(item => (
                    <div
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        style={{
                            padding: '15px 25px',
                            cursor: 'pointer',
                            background: activeTab === item.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                            borderLeft: activeTab === item.id ? '4px solid #4CAF50' : '4px solid transparent',
                            transition: 'all 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            fontSize: '1rem',
                            fontWeight: activeTab === item.id ? 'bold' : 'normal'
                        }}
                        onMouseEnter={(e) => {
                            if (activeTab !== item.id) {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (activeTab !== item.id) {
                                e.currentTarget.style.background = 'transparent';
                            }
                        }}
                    >
                        <span style={{ fontSize: '24px' }}>{item.icon}</span>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div style={{
                padding: '20px',
                borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
                <button
                    onClick={onLogout}
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                    }}
                >
                    <span>🚪</span>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
