import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="landing-footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>SalonLedger</h3>
                        <p>Modern salon management for the digital age.</p>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#pricing">Pricing</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Contact</h4>
                        <p>Email: info@salonledger.com</p>
                        <p>Phone: +1 (555) 123-4567</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} SalonLedger. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

