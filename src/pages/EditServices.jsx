import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AddServicePopup from '../components/AddServicePopup';

const EditServices = () => {
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [services, setServices] = useState([
        { id: 1, name: 'Haircut (Men)', price: 250 },
        { id: 2, name: 'Haircut (Women)', price: 500 },
        { id: 3, name: 'Shaving', price: 150 },
        { id: 4, name: 'Hair Spa', price: 800 },
        { id: 5, name: 'Facial', price: 1200 },
        { id: 6, name: 'Head Massage', price: 300 },
    ]);

    const handleAddService = (newService) => {
        setServices([...services, { id: Date.now(), ...newService }]);
    };

    return (
        <div className="page-container">
            <div className="edit-service-list">
                {services.map((service) => (
                    <div key={service.id} className="edit-service-item">
                        <div className="service-info">
                            <span className="service-name">{service.name}</span>
                            <span className="service-price">₹{service.price}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="icon-btn" style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <Edit2 size={18} color="var(--text-secondary)" />
                            </button>
                            <button className="icon-btn" style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <Trash2 size={18} color="#EF4444" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="fab-container">
                <button className="fab-btn" onClick={() => setIsAddPopupOpen(true)}>
                    <Plus size={20} />
                    Add New Service
                </button>
            </div>

            <AddServicePopup
                isOpen={isAddPopupOpen}
                onClose={() => setIsAddPopupOpen(false)}
                onAdd={handleAddService}
            />
        </div>
    );
};

export default EditServices;
