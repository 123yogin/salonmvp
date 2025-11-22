import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { staffAPI } from '../services/api';

const ServicePopup = ({ isOpen, onClose, service, onConfirm }) => {
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [price, setPrice] = useState('');
    const [staffId, setStaffId] = useState('');
    const [staffList, setStaffList] = useState([]);

    useEffect(() => {
        if (isOpen && service) {
            setPrice(service.default_price.toString());
            fetchStaff();
        }
    }, [isOpen, service]);

    const fetchStaff = async () => {
        try {
            const data = await staffAPI.getAll();
            setStaffList(data.staff);
        } catch (err) {
            console.error('Error fetching staff:', err);
        }
    };

    const handleConfirm = () => {
        onConfirm({
            price: parseFloat(price),
            payment_method: paymentMethod,
            staff_id: staffId || null,
        });
        // Reset form
        setPaymentMethod('cash');
        setStaffId('');
    };

    if (!isOpen || !service) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <h3 className="popup-title">Add Service</h3>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="popup-body">
                    <div style={{ marginBottom: '20px' }}>
                        <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '4px' }}>
                            {service.name}
                        </p>
                    </div>

                    <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label htmlFor="price" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="form-input"
                            style={{ width: '100%' }}
                        />
                    </div>

                    {staffList.length > 0 && (
                        <div className="form-group" style={{ marginBottom: '16px' }}>
                            <label htmlFor="staff" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                Staff (Optional)
                            </label>
                            <select
                                id="staff"
                                value={staffId}
                                onChange={(e) => setStaffId(e.target.value)}
                                className="form-input"
                                style={{ width: '100%' }}
                            >
                                <option value="">Select staff</option>
                                {staffList.map((staff) => (
                                    <option key={staff.id} value={staff.id}>
                                        {staff.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                            Payment Method
                        </label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                className={`btn ${paymentMethod === 'cash' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setPaymentMethod('cash')}
                                style={{ flex: 1 }}
                            >
                                Cash
                            </button>
                            <button
                                className={`btn ${paymentMethod === 'upi' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setPaymentMethod('upi')}
                                style={{ flex: 1 }}
                            >
                                UPI
                            </button>
                        </div>
                    </div>

                    <div className="popup-actions">
                        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleConfirm}>
                            <Check size={18} />
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePopup;
