import { ChevronRight, LogOut, Scissors, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const navigate = useNavigate();
    const { logout, salon } = useAuth();

    const handleLogout = async () => {
        if (confirm('Are you sure you want to logout?')) {
            await logout();
            window.location.href = '/';
        }
    };

    return (
        <div className="page-container">
            {salon && (
                <div style={{ padding: '20px', marginBottom: '20px', background: 'var(--card-bg)', borderRadius: '12px' }}>
                    <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>{salon.name}</h3>
                    {salon.address && (
                        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{salon.address}</p>
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

