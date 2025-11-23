import { ChevronLeft, Mail, MapPin, Phone, Store, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const navigate = useNavigate();
    const { user, salon, loading } = useAuth();

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
                <button
                    onClick={() => navigate(-1)}
                    className="profile-back-btn"
                >
                    <ChevronLeft size={24} />
                </button>
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
        </div>
    );
};

export default Profile;

