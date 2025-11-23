import { Check, X } from 'lucide-react';
import { useState } from 'react';

const AddStaffPopup = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) return;

        onAdd({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || null,
            role: role.trim() || 'Staff'
        });

        setName('');
        setEmail('');
        setPhone('');
        setRole('');
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <h3 className="popup-title">Invite Staff Member</h3>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="popup-body">
                    <div className="form-group">
                        <label htmlFor="staffName" className="form-label">Name</label>
                        <input
                            type="text"
                            id="staffName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input"
                            placeholder="e.g. Rahul"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="staffEmail" className="form-label">Email (for Login)</label>
                        <input
                            type="email"
                            id="staffEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="rahul@example.com"
                            required
                        />
                        <small style={{color: 'var(--text-secondary)', fontSize: '12px'}}>They will use this email to log in.</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="staffPhone" className="form-label">Phone (Optional)</label>
                        <input
                            type="tel"
                            id="staffPhone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-input"
                            placeholder="e.g. 9876543210"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="staffRole" className="form-label">Role Title (Optional)</label>
                        <input
                            type="text"
                            id="staffRole"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="form-input"
                            placeholder="e.g. Senior Stylist"
                        />
                    </div>

                    <div className="popup-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            <Check size={18} />
                            Send Invite
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStaffPopup;

