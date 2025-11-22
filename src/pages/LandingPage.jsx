import { motion } from 'framer-motion';
import { Calendar, Scissors, Smile, Star, User, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';
import './LandingPage.css';

// Hero image - using placeholder if actual image doesn't exist
// You can replace this with the actual image path when available
const heroImage = 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop';

const LandingPage = () => {
    const navigate = useNavigate();
    const services = [
        { icon: <Scissors />, title: "Men's Haircut" },
        { icon: <User />, title: "Women's Haircut" },
        { icon: <Zap />, title: "Beard Grooming" },
        { icon: <Star />, title: "Hair Styling" },
        { icon: <Smile />, title: "Facial & Skin Care" },
        { icon: <Calendar />, title: "Spa & Massage" },
    ];

    return (
        <div className="landing-page">
            <Navbar />

            {/* Hero Section */}
            <section className="hero" id="home">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="hero-title">Premium Unisex Salon & Grooming Experience</h1>
                    <p className="hero-subtitle">
                        Modern salon services for everyone. Visit us, explore styles, and enjoy a seamless digital grooming experience.
                    </p>
                    <div className="hero-buttons">
                        <Link to="#services" className="btn btn-primary">Explore Services</Link>
                        <button className="btn btn-secondary" onClick={() => navigate('/login')} aria-label="Login to the application">Login</button>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-image-container"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.img
                        src={heroImage}
                        alt="Unisex Salon"
                        className="hero-image"
                        loading="lazy"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </section>

            {/* Services Section */}
            <section className="services-section" id="services">
                <div className="container">
                    <h2 className="section-title">Our Services</h2>
                    <p className="section-subtitle">Top-notch grooming services for men and women.</p>

                    <div className="services-grid">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={service.title}
                                icon={service.icon}
                                title={service.title}
                                delay={index * 0.1}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section" id="pricing">
                <div className="container">
                    <h2 className="section-title">Pricing Plans</h2>
                    <p className="section-subtitle">Choose the perfect package for your needs.</p>

                    <div className="pricing-container">
                        {/* Basic Plan */}
                        <motion.div
                            className="pricing-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h3>Basic Grooming</h3>
                            <div className="price">$29<span>/visit</span></div>
                            <ul className="features-list">
                                <li>Haircut & Styling</li>
                                <li>Beard Trim</li>
                                <li>Standard Wash</li>
                                <li>Beverage</li>
                            </ul>
                            <button className="btn btn-secondary">View Details</button>
                        </motion.div>

                        {/* Premium Plan */}
                        <motion.div
                            className="pricing-card highlighted"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3>Premium Care</h3>
                            <div className="price">$59<span>/visit</span></div>
                            <ul className="features-list">
                                <li>All Basic Features</li>
                                <li>Facial Treatment</li>
                                <li>Premium Products</li>
                                <li>Priority Booking</li>
                                <li>Head Massage</li>
                            </ul>
                            <button className="btn btn-accent">View Details</button>
                        </motion.div>

                        {/* Advanced Plan */}
                        <motion.div
                            className="pricing-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <h3>Advanced Styling</h3>
                            <div className="price">$89<span>/visit</span></div>
                            <ul className="features-list">
                                <li>All Premium Features</li>
                                <li>Full Body Spa</li>
                                <li>Hair Treatment</li>
                                <li>Consultation</li>
                            </ul>
                            <button className="btn btn-secondary">View Details</button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Visit our salon anytime</h2>
                    <p>Fast, easy, and seamless. Get the look you deserve.</p>
                    <button className="btn btn-accent" onClick={() => navigate('/login')} aria-label="Get started and login">Get Started</button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;

