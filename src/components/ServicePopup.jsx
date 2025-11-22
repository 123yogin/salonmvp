import { Check, X } from 'lucide-react';

const ServicePopup = ({ isOpen, onClose, serviceName, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <h3 className="popup-title">Confirm Service</h3>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="popup-body">
                    <p className="popup-message">
                        Add <strong>{serviceName}</strong> to today's log?
                    </p>

                    <div className="popup-actions">
                        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button className="btn btn-primary" onClick={onConfirm}>
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
