import { ChevronLeft, LogOut, Mail, MapPin, Phone, Store, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const navigate = useNavigate();
    const { user, salon, logout, loading } = useAuth();

    const handleLogout = async () => {
        if (confirm('Are you sure you want to logout?')) {
            await logout();
            navigate('/', { replace: true });
        }
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ height: '60vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="profile-header">
                <h2 className="profile-title">Profile</h2>
            </div>

            <div className="settings-section">
                <div className="settings-item profile-item">
                    <div className="settings-item-left">
                        <Store size={20} color="var(--text-secondary)" />
                        <div className="profile-item-content">
                            <span className="profile-item-label">Salon Name</span>
                            <span className="profile-item-value">
                                {salon?.name || 'Not available'}
                            </span>
                        </div>
                    </div>
                </div>

                {user?.email && (
                    <div className="settings-item profile-item">
                        <div className="settings-item-left">
                            <Mail size={20} color="var(--text-secondary)" />
                            <div className="profile-item-content">
                                <span className="profile-item-label">Email</span>
                                <span className="profile-item-value">
                                    {user.email}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {user?.phone && (
                    <div className="settings-item profile-item">
                        <div className="settings-item-left">
                            <Phone size={20} color="var(--text-secondary)" />
                            <div className="profile-item-content">
                                <span className="profile-item-label">Phone Number</span>
                                <span className="profile-item-value">
                                    {user.phone}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {salon?.address && (
                    <div className="settings-item profile-item">
                        <div className="settings-item-left">
                            <MapPin size={20} color="var(--text-secondary)" />
                            <div className="profile-item-content">
                                <span className="profile-item-label">Address</span>
                                <span className="profile-item-value">
                                    {salon.address}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {salon?.timezone && (
                    <div className="settings-item profile-item">
                        <div className="settings-item-left">
                            <User size={20} color="var(--text-secondary)" />
                            <div className="profile-item-content">
                                <span className="profile-item-label">Timezone</span>
                                <span className="profile-item-value">
                                    {salon.timezone}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
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

export default Profile;

