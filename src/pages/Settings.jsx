import { ChevronRight, LogOut, Scissors, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const navigate = useNavigate();
    const { logout, salon } = useAuth();

    const handleLogout = async () => {
        if (confirm('Are you sure you want to logout?')) {
            await logout();
            navigate('/', { replace: true });
        }
    };

    return (
        <div className="page-container">
            {salon && (
                <div className="salon-info-card">
                    <h3 className="salon-info-title">{salon.name}</h3>
                    {salon.address && (
                        <p className="salon-info-address">{salon.address}</p>
                    )}
                </div>
            )}

            <div className="settings-section">
                <div className="settings-item" onClick={() => navigate('/home/edit-services')}>
                    <div className="settings-item-left">
                        <Scissors size={20} color="var(--text-secondary)" />
                        <span className="settings-label">Edit Services</span>
                    </div>
                    <ChevronRight size={20} color="var(--text-secondary)" />
                </div>

                <div className="settings-item" onClick={() => navigate('/home/profile')}>
                    <div className="settings-item-left">
                        <User size={20} color="var(--text-secondary)" />
                        <span className="settings-label">Profile</span>
                    </div>
                    <ChevronRight size={20} color="var(--text-secondary)" />
                </div>
            </div>

            <div className="settings-section">
                <div className="settings-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    <div className="settings-item-left">
                        <LogOut size={20} color="#EF4444" />
                        <span className="settings-label" style={{ color: '#EF4444' }}>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;

