import React, { useState, useEffect } from 'react';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/admin/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to delete user');
            alert('User deleted successfully');
            fetchUsers();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete user');
        }
    };

    const handleRoleChange = async (id, newRole) => {
        if (!window.confirm(`Change user role to ${newRole}?`)) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/admin/users/${id}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ role: newRole }),
            });

            if (!response.ok) throw new Error('Failed to update user role');
            alert('User role updated successfully');
            fetchUsers();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update user role');
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Loading users...</div>;
    }

    return (
        <div>
            <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>👥 User Management</h1>

            <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ marginBottom: '20px' }}>All Users ({users.length})</h2>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee', background: '#f9f9f9' }}>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Phone</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>Role</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>Joined</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontWeight: 'bold'
                                            }}>
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span>{user.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px' }}>{user.email}</td>
                                    <td style={{ padding: '12px' }}>{user.phone || 'N/A'}</td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '6px 12px',
                                            borderRadius: '12px',
                                            fontSize: '0.85rem',
                                            background: user.role === 'admin' ? '#e8f5e9' : '#e3f2fd',
                                            color: user.role === 'admin' ? '#27ae60' : '#3498db',
                                            fontWeight: 'bold'
                                        }}>
                                            {user.role === 'admin' ? '🛡️ Admin' : '👤 User'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        {user.role !== 'admin' && (
                                            <>
                                                <button
                                                    onClick={() => handleRoleChange(user._id, 'admin')}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: '#27ae60',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        marginRight: '8px',
                                                        fontSize: '0.85rem'
                                                    }}
                                                >
                                                    ⬆️ Make Admin
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: '#e74c3c',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.85rem'
                                                    }}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </>
                                        )}
                                        {user.role === 'admin' && (
                                            <span style={{ color: '#95a5a6', fontSize: '0.85rem' }}>
                                                Protected
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
                        No users found
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
