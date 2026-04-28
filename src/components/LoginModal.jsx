import React, { useState } from 'react';

const LoginModal = ({ onClose, onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const url = isLogin 
                ? 'http://localhost:5000/api/auth/login'
                : 'http://localhost:5000/api/auth/register';

            const body = isLogin
                ? { email, password }
                : { name, email, password };

            console.log('🔐 Attempting login...', { email, url });

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            console.log('📡 Response status:', response.status);

            const data = await response.json();
            console.log('📦 Response data:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed');
            }

            // Store token
            localStorage.setItem('token', data.data.token);
            console.log('✅ Token stored successfully');

            // Pass user data to parent
            if (onLogin) {
                onLogin({
                    _id: data.data._id,
                    name: data.data.name,
                    email: data.data.email,
                    role: data.data.role,
                });
            }
        } catch (err) {
            console.error('❌ Login error:', err);
            setError(err.message || 'Failed to connect to server. Please ensure backend is running on port 5000.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column' }}>
                <div className="modal-header">
                    <h2 className="modal-title">{isLogin ? 'Sign-In' : 'Create Account'}</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                
                {error && (
                    <div style={{
                        padding: '12px',
                        background: '#ffebee',
                        color: '#c62828',
                        borderRadius: '4px',
                        marginBottom: '15px',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                <form className="login-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>Your name</label>
                            <input 
                                type="text" 
                                placeholder="First and last name" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                required={!isLogin} 
                                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #a6a6a6' }} 
                            />
                        </div>
                    )}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #a6a6a6' }} 
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required 
                            minLength="6"
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #a6a6a6' }} 
                        />
                        {!isLogin && (
                            <small style={{ color: '#666', fontSize: '0.8rem' }}>
                                Password must be at least 6 characters
                            </small>
                        )}
                    </div>
                    
                    <button 
                        type="submit" 
                        className="checkout-btn" 
                        style={{ marginBottom: '15px' }}
                        disabled={loading}
                    >
                        {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                    
                    <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '20px' }}>
                        By continuing, you agree to FashionHub's Conditions of Use and Privacy Notice.
                    </p>
                    
                    {isLogin ? (
                        <>
                            <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e7e7e7' }}>
                                <p style={{ fontSize: '0.85rem', marginBottom: '10px' }}>New to FashionHub?</p>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setIsLogin(false);
                                        setError('');
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        background: '#f0f0f0',
                                        border: '1px solid #a6a6a6',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Create your FashionHub account
                                </button>
                            </div>
                            
                            <div style={{
                                marginTop: '20px',
                                padding: '15px',
                                background: '#fff3cd',
                                borderRadius: '4px',
                                border: '1px solid #ffc107'
                            }}>
                                <strong style={{ display: 'block', marginBottom: '10px', color: '#856404' }}>
                                    🛡️ Admin Login
                                </strong>
                                <div style={{ fontSize: '0.85rem', color: '#856404' }}>
                                    <div>Email: <code>admin@fashionhub.com</code></div>
                                    <div>Password: <code>admin123456</code></div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e7e7e7' }}>
                            <p style={{ fontSize: '0.85rem', marginBottom: '10px' }}>Already have an account?</p>
                            <button 
                                type="button"
                                onClick={() => {
                                    setIsLogin(true);
                                    setError('');
                                }}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    background: '#f0f0f0',
                                    border: '1px solid #a6a6a6',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Sign in to your account
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
