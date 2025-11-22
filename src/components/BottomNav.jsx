import { FileText, Home, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
    const navItems = [
        { icon: Home, label: 'Log', path: '/home' },
        { icon: FileText, label: 'Summary', path: '/home/summary' },
        { icon: Settings, label: 'Settings', path: '/home/settings' },
    ];

    return (
        <nav className="bottom-nav">
            <div className="bottom-nav-content">
                {navItems.map(({ icon: Icon, label, path }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <Icon size={24} strokeWidth={2} />
                        <span className="nav-label">{label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;
