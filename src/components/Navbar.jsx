import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/', { replace: true });
        setIsMenuOpen(false);
    };

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="landing-navbar">
            <div className="navbar-container">
                <div className="navbar-brand" onClick={() => navigate(isAuthenticated ? '/home' : '/')}>
                    <h2>SalonLog</h2>
                </div>

                {/* Desktop Navigation */}
                <div className="navbar-links desktop-nav">
                    <a href="#home" onClick={(e) => handleScroll(e, 'home')}>Home</a>
                    <a href="#services" onClick={(e) => handleScroll(e, 'services')}>Services</a>
                    <a href="#pricing" onClick={(e) => handleScroll(e, 'pricing')}>Pricing</a>
                    {isAuthenticated ? (
                        <>
                            <button onClick={() => navigate('/home')} className="btn-nav">Dashboard</button>
                            <button onClick={handleLogout} className="btn-nav">Logout</button>
                        </>
                    ) : (
                        <button onClick={() => navigate('/login')} className="btn-nav btn-primary">Login</button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Navigation Dropdown */}
                <div className={`mobile-backdrop ${isMenuOpen ? 'is-open' : ''}`} onClick={() => setIsMenuOpen(false)} />
                <div className={`mobile-menu ${isMenuOpen ? 'is-open' : ''}`}>
                    <a href="#home" onClick={(e) => handleScroll(e, 'home')}>Home</a>
                    <a href="#services" onClick={(e) => handleScroll(e, 'services')}>Services</a>
                    <a href="#pricing" onClick={(e) => handleScroll(e, 'pricing')}>Pricing</a>
                    {isAuthenticated ? (
                        <>
                            <button onClick={() => { navigate('/home'); setIsMenuOpen(false); }} className="btn-nav">Dashboard</button>
                            <button onClick={handleLogout} className="btn-nav">Logout</button>
                        </>
                    ) : (
                        <button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} className="btn-nav btn-primary">Login</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

