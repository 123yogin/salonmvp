import { Check, X } from 'lucide-react';
import { useState } from 'react';

const AddStaffPopup = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        onAdd({
            name: name.trim(),
            phone: phone.trim() || null,
            role: role.trim() || null
        });

        setName('');
        setPhone('');
        setRole('');
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <h3 className="popup-title">Add New Staff</h3>
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
                        <label htmlFor="staffRole" className="form-label">Role (Optional)</label>
                        <input
                            type="text"
                            id="staffRole"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="form-input"
                            placeholder="e.g. Hair Stylist"
                        />
                    </div>

                    <div className="popup-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            <Check size={18} />
                            Add Staff
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStaffPopup;

