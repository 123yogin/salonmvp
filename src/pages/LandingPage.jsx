import { motion } from 'framer-motion';
import { BarChart3, CheckCircle2, LayoutDashboard, ShieldCheck, Smartphone, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';
import '../styles/LandingPage.css';

// Hero image - showing a modern business/tech context
const heroImage = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop';

const LandingPage = () => {
    const navigate = useNavigate();
    const features = [
        { icon: <LayoutDashboard />, title: "Smart Dashboard" },
        { icon: <BarChart3 />, title: "Revenue Tracking" },
        { icon: <Zap />, title: "Quick Service Log" },
        { icon: <Smartphone />, title: "Mobile Optimized" },
        { icon: <CheckCircle2 />, title: "Custom Services" },
        { icon: <ShieldCheck />, title: "Secure & Private" },
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
                    <h1 className="hero-title">The Modern Operating System for Your Salon</h1>
                    <p className="hero-subtitle">
                        Ditch the pen and paper. Track daily sales, manage your service menu, and get real-time revenue insights in one simple app.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn btn-primary" onClick={() => navigate('/login')}>Start for Free</button>
                        <Link to="#features" className="btn btn-secondary">See Features</Link>
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
                        alt="Salon Management Dashboard"
                        className="hero-image"
                        loading="eager"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="services-section" id="features">
                <div className="container">
                    <h2 className="section-title">Everything You Need</h2>
                    <p className="section-subtitle">Powerful tools to help your salon business grow.</p>

                    <div className="services-grid">
                        {features.map((feature, index) => (
                            <ServiceCard
                                key={feature.title}
                                icon={feature.icon}
                                title={feature.title}
                                delay={index * 0.1}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section" id="pricing">
                <div className="container">
                    <h2 className="section-title">Simple Pricing</h2>
                    <p className="section-subtitle">Start for free, upgrade as you grow.</p>

                    <div className="pricing-container">
                        {/* Starter Plan */}
                        <motion.div
                            className="pricing-card highlighted"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h3>Starter</h3>
                            <div className="price">$0<span>/month</span></div>
                            <ul className="features-list">
                                <li>Unlimited Service Logs</li>
                                <li>Basic Revenue Analytics</li>
                                <li>Up to 50 Custom Services</li>
                                <li>Single User Access</li>
                            </ul>
                            <button className="btn btn-primary" onClick={() => navigate('/login')}>Get Started Now</button>
                        </motion.div>

                        {/* Pro Plan */}
                        <motion.div
                            className="pricing-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3>Professional</h3>
                            <div className="price">$29<span>/month</span></div>
                            <ul className="features-list">
                                <li>Advanced Analytics & Export</li>
                                <li>Staff Performance Tracking</li>
                                <li>Inventory Management</li>
                                <li>Priority Support</li>
                            </ul>
                            <button className="btn btn-secondary" disabled style={{ opacity: 0.7, cursor: 'not-allowed' }}>Coming Soon</button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to modernize your salon?</h2>
                    <p>Join hundreds of salon owners managing their business smarter.</p>
                    <button className="btn btn-accent" onClick={() => navigate('/login')} aria-label="Get started and login">Create Free Account</button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LandingPage;

