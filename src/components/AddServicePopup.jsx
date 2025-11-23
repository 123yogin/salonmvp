import { Plus, X } from 'lucide-react';
import { useState } from 'react';

const AddServicePopup = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && price) {
            onAdd({ name, default_price: Number(price) });
            setName('');
            setPrice('');
        }
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <h3 className="popup-title">Add New Service</h3>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form className="popup-body" onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                        <div className="input-group">
                            <label className="input-label">Service Name</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. Haircut"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Price (₹)</label>
                            <input
                                type="number"
                                className="input-field"
                                placeholder="0"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                min="0"
                                inputMode="decimal"
                            />
                        </div>
                    </div>

                    <div className="popup-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            <Plus size={18} />
                            Add Service
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddServicePopup;
