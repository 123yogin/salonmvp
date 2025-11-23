import { motion } from 'framer-motion';
import '../styles/ServiceCard.css';

const ServiceCard = ({ icon, title, delay = 0 }) => {
    return (
        <motion.div
            className="service-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
        >
            <div className="service-icon">{icon}</div>
            <h3 className="service-title">{title}</h3>
        </motion.div>
    );
};

export default ServiceCard;

