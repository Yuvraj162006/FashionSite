import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminStats from './AdminStats';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminUsers from './AdminUsers';
import AdminAddProduct from './AdminAddProduct';

const AdminDashboard = ({ user, onClose, onLogout }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (activeTab === 'dashboard') {
            fetchDashboardStats();
        }
    }, [activeTab]);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/admin/stats', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }

            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <AdminStats stats={stats} loading={loading} />;
            case 'products':
                return <AdminProducts />;
            case 'add-product':
                return <AdminAddProduct onSuccess={() => setActiveTab('products')} />;
            case 'orders':
                return <AdminOrders />;
            case 'users':
                return <AdminUsers />;
            default:
                return <AdminStats stats={stats} loading={loading} />;
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#f5f5f5',
            zIndex: 9999,
            overflow: 'hidden'
        }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <AdminSidebar
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    user={user}
                    onLogout={onLogout}
                    onClose={onClose}
                />
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    padding: '30px'
                }}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
