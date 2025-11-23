import { FileText, Home, Scissors, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
    const navItems = [
        { icon: Home, label: 'Log', path: '/home', exact: true },
        { icon: FileText, label: 'Summary', path: '/home/summary' },
        { icon: Scissors, label: 'Services', path: '/home/edit-services' },
        { icon: User, label: 'Profile', path: '/home/profile' },
    ];

    return (
        <nav className="bottom-nav">
            <div className="bottom-nav-content">
                {navItems.map(({ icon: Icon, label, path, exact }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end={exact}
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
