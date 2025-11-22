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
            <div className="header-actions" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        padding: '0'
                    }}
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Profile</h2>
            </div>

            <div className="settings-section">
                <div className="settings-item" style={{ cursor: 'default' }}>
                    <div className="settings-item-left">
                        <Store size={20} color="var(--text-secondary)" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span className="settings-label" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Salon Name</span>
                            <span className="settings-value" style={{ fontSize: '16px', fontWeight: '500' }}>
                                {salon?.name || 'Not available'}
                            </span>
                        </div>
                    </div>
                </div>

                {user?.email && (
                    <div className="settings-item" style={{ cursor: 'default' }}>
                        <div className="settings-item-left">
                            <Mail size={20} color="var(--text-secondary)" />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span className="settings-label" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Email</span>
                                <span className="settings-value" style={{ fontSize: '16px', fontWeight: '500' }}>
                                    {user.email}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {user?.phone && (
                    <div className="settings-item" style={{ cursor: 'default' }}>
                        <div className="settings-item-left">
                            <Phone size={20} color="var(--text-secondary)" />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span className="settings-label" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Phone Number</span>
                                <span className="settings-value" style={{ fontSize: '16px', fontWeight: '500' }}>
                                    {user.phone}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {salon?.address && (
                    <div className="settings-item" style={{ cursor: 'default' }}>
                        <div className="settings-item-left">
                            <MapPin size={20} color="var(--text-secondary)" />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span className="settings-label" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Address</span>
                                <span className="settings-value" style={{ fontSize: '16px', fontWeight: '500' }}>
                                    {salon.address}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {salon?.timezone && (
                    <div className="settings-item" style={{ cursor: 'default' }}>
                        <div className="settings-item-left">
                            <User size={20} color="var(--text-secondary)" />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span className="settings-label" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Timezone</span>
                                <span className="settings-value" style={{ fontSize: '16px', fontWeight: '500' }}>
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

