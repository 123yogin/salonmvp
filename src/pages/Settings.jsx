import { ChevronRight, LogOut, Scissors, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <div className="settings-section">
                <div className="settings-item" onClick={() => navigate('/edit-services')}>
                    <div className="settings-item-left">
                        <Scissors size={20} color="var(--text-secondary)" />
                        <span className="settings-label">Edit Services</span>
                    </div>
                    <ChevronRight size={20} color="var(--text-secondary)" />
                </div>

                <div className="settings-item" onClick={() => navigate('/profile')}>
                    <div className="settings-item-left">
                        <User size={20} color="var(--text-secondary)" />
                        <span className="settings-label">Profile</span>
                    </div>
                    <ChevronRight size={20} color="var(--text-secondary)" />
                </div>
            </div>

            <div className="settings-section">
                <div className="settings-item">
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
