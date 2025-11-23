import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/', { replace: true });
    };

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="landing-navbar">
            <div className="navbar-container">
                <div className="navbar-brand" onClick={() => navigate(isAuthenticated ? '/home' : '/')}>
                    <h2>SalonLog</h2>
                </div>
                <div className="navbar-links">
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
            </div>
        </nav>
    );
};

export default Navbar;

