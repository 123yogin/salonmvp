import { ChevronLeft, MapPin, Phone, Store, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    // Placeholder data - in a real app this would come from a backend/context
    const profileData = {
        salonName: "Luxe Salon & Spa",
        ownerName: "Yogin",
        phone: "+91 98765 43210",
        address: "123, Fashion Street, Mumbai"
    };

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
                            <span className="settings-value" style={{ fontSize: '16px', fontWeight: '500' }}>{profileData.salonName}</span>
                        </div>
                    </div>
                </div>

                <div className="settings-item" style={{ cursor: 'default' }}>
                    <div className="settings-item-left">
                        <User size={20} color="var(--text-secondary)" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span className="settings-label" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Owner Name</span>
                            <span className="settings-value" style={{ fontSize: '16px', fontWeight: '500' }}>{profileData.ownerName}</span>
                        </div>
                    </div>
                </div>

                <div className="settings-item" style={{ cursor: 'default' }}>
                    <div className="settings-item-left">
                        <Phone size={20} color="var(--text-secondary)" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span className="settings-label" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Phone Number</span>
                            <span className="settings-value" style={{ fontSize: '16px', fontWeight: '500' }}>{profileData.phone}</span>
                        </div>
                    </div>
                </div>

                <div className="settings-item" style={{ cursor: 'default' }}>
                    <div className="settings-item-left">
                        <MapPin size={20} color="var(--text-secondary)" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span className="settings-label" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Address</span>
                            <span className="settings-value" style={{ fontSize: '16px', fontWeight: '500' }}>{profileData.address}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
