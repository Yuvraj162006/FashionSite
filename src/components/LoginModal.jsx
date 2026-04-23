import React, { useState } from 'react';

const LoginModal = ({ onClose, onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name: isLogin ? (email.split('@')[0] || 'User') : name,
            email: email
        };
        if (onLogin) onLogin(userData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column' }}>
                <div className="modal-header">
                    <h2 className="modal-title">{isLogin ? 'Sign-In' : 'Create Account'}</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                
                <form className="login-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>Your name</label>
                            <input type="text" placeholder="First and last name" value={name} onChange={e => setName(e.target.value)} required={!isLogin} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #a6a6a6' }} />
                        </div>
                    )}
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>Email or mobile phone number</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #a6a6a6' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>Password</label>
                        <input type="password" required style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #a6a6a6' }} />
                    </div>
                    
                    <button type="submit" className="checkout-btn" style={{ marginBottom: '15px' }}>
                        {isLogin ? 'Continue' : 'Verify email'}
                    </button>
                    
                    <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '20px' }}>
                        By continuing, you agree to FashionHub's Conditions of Use and Privacy Notice.
                    </p>
                    
                    {isLogin ? (
                        <>
                            <div style={{ textAlign: 'center', margin: '15px 0', position: 'relative' }}>
                                <hr style={{ borderTop: '1px solid #e7e7e7', margin: '0' }} />
                                <span style={{ backgroundColor: 'white', padding: '0 10px', position: 'relative', top: '-10px', fontSize: '0.85rem', color: '#767676' }}>New to FashionHub?</span>
                            </div>
                            <button 
                                type="button" 
                                onClick={() => setIsLogin(false)}
                                style={{ width: '100%', padding: '10px', backgroundColor: '#e7e9ec', border: '1px solid #adb1b8', borderRadius: '4px', cursor: 'pointer', fontWeight: 'normal', boxShadow: '0 1px 0 rgba(255,255,255,.6) inset' }}
                            >
                                Create your FashionHub account
                            </button>
                        </>
                    ) : (
                        <div style={{ borderTop: '1px solid #e7e7e7', paddingTop: '15px', fontSize: '0.85rem' }}>
                            Already have an account? <span onClick={() => setIsLogin(true)} style={{ color: '#0066c0', cursor: 'pointer' }}>Sign in <i className="fas fa-caret-right"></i></span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
