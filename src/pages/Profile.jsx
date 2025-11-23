import { ChevronLeft, LogOut, Mail, MapPin, Phone, Store, User, Users, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { staffAPI } from '../services/api';
import AddStaffPopup from '../components/AddStaffPopup';

const Profile = () => {
    const navigate = useNavigate();
    const { user, salon, logout, loading } = useAuth();
    const [staffList, setStaffList] = useState([]);
    const [isStaffPopupOpen, setIsStaffPopupOpen] = useState(false);

    useEffect(() => {
        if (salon) {
            fetchStaff();
        }
    }, [salon]);

    const fetchStaff = async () => {
        try {
            const data = await staffAPI.getAll();
            setStaffList(data.staff);
        } catch (err) {
            console.error('Error fetching staff:', err);
        }
    };

    const handleAddStaff = async (staffData) => {
        try {
            await staffAPI.create(staffData);
            await fetchStaff();
            setIsStaffPopupOpen(false);
        } catch (err) {
            console.error('Error adding staff:', err);
            alert('Failed to add staff member');
        }
    };

    const handleLogout = async () => {
        if (confirm('Are you sure you want to logout?')) {
            await logout();
            navigate('/', { replace: true });
        }
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ height: '60vh' }}>
                <div className="spinner">
                    <div className="spinner-inner"></div>
                </div>
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
                <div className="section-header" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>Staff Members</h3>
                    <button 
                        onClick={() => setIsStaffPopupOpen(true)}
                        style={{ 
                            background: 'var(--color-primary)', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '50%', 
                            width: '32px', 
                            height: '32px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(4, 120, 87, 0.3)'
                        }}
                    >
                        <Plus size={18} />
                    </button>
                </div>
                
                {staffList.map((staff) => (
                    <div key={staff.id} className="settings-item profile-item">
                        <div className="settings-item-left">
                            <Users size={20} color="var(--text-secondary)" />
                            <div className="profile-item-content">
                                <span className="profile-item-label">{staff.role || 'Staff'}</span>
                                <span className="profile-item-value">{staff.name}</span>
                            </div>
                        </div>
                        {staff.phone && (
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{staff.phone}</span>
                        )}
                    </div>
                ))}
                
                {staffList.length === 0 && (
                    <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
                        No staff members added yet.
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

            <AddStaffPopup 
                isOpen={isStaffPopupOpen} 
                onClose={() => setIsStaffPopupOpen(false)} 
                onAdd={handleAddStaff} 
            />
        </div>
    );
};

export default Profile;

