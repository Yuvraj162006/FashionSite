import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-panel1" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                ↑ Back to Top
            </div>

            <div className="foot-panel2">
                <ul>
                    <p>About FashionHub</p>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Our Story page is coming soon!'); }}>Our Story</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Sustainability initiatives coming soon!'); }}>Sustainability</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Press details coming soon!'); }}>Press</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Careers page coming soon!'); }}>Careers</a>
                </ul>
                <ul>
                    <p>Connect With Us</p>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.open('https://instagram.com', '_blank'); }}>Instagram</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.open('https://facebook.com', '_blank'); }}>Facebook</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.open('https://twitter.com', '_blank'); }}>Twitter</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.open('https://pinterest.com', '_blank'); }}>Pinterest</a>
                </ul>
                <ul>
                    <p>Customer Service</p>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Contact Us portal is coming soon!'); }}>Contact Us</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('FAQ page is being updated.'); }}>FAQ</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Shipping Info: We ship worldwide!'); }}>Shipping Info</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Returns: 30-day money-back guarantee!'); }}>Returns</a>
                </ul>
                <ul>
                    <p>Policies</p>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy Policy is being updated.'); }}>Privacy Policy</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Terms & Conditions apply.'); }}>Terms & Conditions</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>Size Guide</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Gift Cards are currently sold out.'); }}>Gift Cards</a>
                </ul>
            </div>

            <div className="foot-panel3">
                <div style={{ color: '#FF1493', fontSize: '28px', fontWeight: 'bold' }}>
                    <i className="fas fa-shopping-bag"></i> FashionHub
                </div>
                <p style={{ marginTop: '10px', color: '#999', fontSize: '0.85rem' }}>
                    Your Premier Fashion Destination
                </p>
            </div>

            <div className="foot-panel4">
                <div>© 2024-2026 FashionHub. All rights reserved.</div>
                <div style={{ marginTop: '10px' }}>
                    Designed for Fashion Lovers | Quality You Can Trust
                </div>
            </div>
        </footer>
    );
};

export default Footer;
