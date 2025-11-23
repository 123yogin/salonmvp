import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { staffAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ServicePopup = ({ isOpen, onClose, service, onConfirm }) => {
    const { user } = useAuth();
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
            
            // Auto-select logged-in staff
            if (user?.role === 'STAFF') {
                const myStaffRecord = data.staff.find(s => s.email === user.email);
                if (myStaffRecord) {
                    setStaffId(myStaffRecord.id);
                }
            } else {
                 setStaffId(''); // Reset for owners so they pick manually
            }
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
        // staffId is reset in useEffect based on role
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
                    <div className="service-name-display">
                        <p className="service-name-text">
                            {service.name}
                        </p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price" className="form-label">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="form-input"
                            inputMode="decimal"
                        />
                    </div>

                    {staffList.length > 0 && (
                        <div className="form-group">
                            <label htmlFor="staff" className="form-label">
                                Staff {user?.role === 'STAFF' ? '(You)' : '(Optional)'}
                            </label>
                            <select
                                id="staff"
                                value={staffId}
                                onChange={(e) => setStaffId(e.target.value)}
                                className="form-input"
                                disabled={user?.role === 'STAFF'}
                                style={user?.role === 'STAFF' ? { opacity: 0.7, backgroundColor: '#f5f5f5' } : {}}
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

                    <div className="form-group payment-method-group">
                        <label className="payment-method-label">Payment Method</label>
                        <div className="payment-method-buttons">
                            <button
                                className={`btn ${paymentMethod === 'cash' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setPaymentMethod('cash')}
                            >
                                Cash
                            </button>
                            <button
                                className={`btn ${paymentMethod === 'upi' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setPaymentMethod('upi')}
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
