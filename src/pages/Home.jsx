import { Plus } from 'lucide-react';
import { useState } from 'react';
import ServicePopup from '../components/ServicePopup';

const Home = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        { id: 1, name: 'Haircut (Men)', price: 250 },
        { id: 2, name: 'Haircut (Women)', price: 500 },
        { id: 3, name: 'Shaving', price: 150 },
        { id: 4, name: 'Hair Spa', price: 800 },
        { id: 5, name: 'Facial', price: 1200 },
        { id: 6, name: 'Head Massage', price: 300 },
    ];

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setIsPopupOpen(true);
    };

    const handleConfirm = () => {
        // Logic to add service would go here
        console.log('Confirmed:', selectedService);
        setIsPopupOpen(false);
    };

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
                            <span className="service-price">₹{service.price}</span>
                        </div>
                        <div className="add-icon">
                            <Plus size={20} />
                        </div>
                    </div>
                ))}
            </div>

            <ServicePopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                serviceName={selectedService?.name}
                onConfirm={handleConfirm}
            />
        </div>
    );
};

export default Home;
