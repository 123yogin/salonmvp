import { Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddServicePopup from '../components/AddServicePopup';
import { servicesAPI } from '../services/api';

const EditServices = () => {
    const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const data = await servicesAPI.getAll();
            setServices(data.services);
            setError(null);
        } catch (err) {
            setError('Failed to load services');
            console.error('Error fetching services:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddService = async (newService) => {
        try {
            await servicesAPI.create(newService);
            await fetchServices(); // Refresh list
            setIsAddPopupOpen(false);
        } catch (err) {
            console.error('Error adding service:', err);
            alert('Failed to add service. Please try again.');
        }
    };

    const handleDeleteService = async (serviceId) => {
        if (!confirm('Are you sure you want to delete this service?')) {
            return;
        }

        try {
            await servicesAPI.delete(serviceId);
            await fetchServices(); // Refresh list
        } catch (err) {
            console.error('Error deleting service:', err);
            alert('Failed to delete service. Please try again.');
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
        <>
            <div className="page-container">
                {error && <div className="error-message">{error}</div>}

                <div className="edit-service-list">
                    {services.map((service) => (
                        <div key={service.id} className="edit-service-item">
                            <div className="service-info">
                                <span className="service-name">{service.name}</span>
                                <span className="service-price">₹{service.default_price}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button
                                    className="icon-btn"
                                    style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
                                    onClick={() => handleDeleteService(service.id)}
                                >
                                    <Trash2 size={18} color="#EF4444" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {services.length === 0 && !error && (
                    <div className="empty-state-message">
                        No services yet. Click the button below to add your first service.
                    </div>
                )}
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
        </>
    );
};

export default EditServices;

