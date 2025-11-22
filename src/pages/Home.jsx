import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import ServicePopup from '../components/ServicePopup';
import { logsAPI, servicesAPI } from '../services/api';

const Home = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
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

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setIsPopupOpen(true);
    };

    const handleConfirm = async (logData) => {
        try {
            await logsAPI.add({
                service_id: selectedService.id,
                price: logData.price,
                payment_method: logData.payment_method,
                staff_id: logData.staff_id,
            });
            setIsPopupOpen(false);
            // Could show success message here
        } catch (err) {
            console.error('Error adding service log:', err);
            alert('Failed to add service. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ height: '60vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-container">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="service-grid">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="service-card"
                        onClick={() => handleServiceClick(service)}
                    >
                        <div className="service-info">
                            <span className="service-name">{service.name}</span>
                            <span className="service-price">₹{service.default_price}</span>
                        </div>
                        <div className="add-icon">
                            <Plus size={20} />
                        </div>
                    </div>
                ))}
            </div>

            {services.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                    No services available. Add services from Settings → Edit Services.
                </div>
            )}

            <ServicePopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                service={selectedService}
                onConfirm={handleConfirm}
            />
        </div>
    );
};

export default Home;

