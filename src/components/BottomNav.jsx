import { FileText, Home, Scissors, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BottomNav = () => {
    const { user } = useAuth();
    
    const navItems = [
        { icon: Home, label: 'Log', path: '/home', exact: true, allowedRoles: ['OWNER', 'STAFF'] },
        { icon: FileText, label: 'Summary', path: '/home/summary', allowedRoles: ['OWNER'] },
        { icon: Scissors, label: 'Services', path: '/home/edit-services', allowedRoles: ['OWNER'] },
        { icon: User, label: 'Profile', path: '/home/profile', allowedRoles: ['OWNER', 'STAFF'] },
    ];

    const filteredNavItems = navItems.filter(item => 
        !item.allowedRoles || (user && item.allowedRoles.includes(user.role))
    );

    return (
        <nav className="bottom-nav">
            <div className="bottom-nav-content">
                {filteredNavItems.map(({ icon: Icon, label, path, exact }) => (
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
