import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        password: '',
        salon_name: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let result;
            if (isRegister) {
                // Registration
                if (!formData.password || (!formData.email && !formData.phone)) {
                    setError('Please fill in all required fields');
                    setLoading(false);
                    return;
                }
                result = await register(formData);
            } else {
                // Login
                if (!formData.password || (!formData.email && !formData.phone)) {
                    setError('Please enter email/phone and password');
                    setLoading(false);
                    return;
                }
                result = await login({
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                });
            }

            if (result.success) {
                navigate('/home');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <motion.div
                className="login-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="login-header">
                    <div className="login-icon">
                        <Scissors size={32} />
                    </div>
                    <h1>SalonLedger</h1>
                    <p>{isRegister ? 'Create your account' : 'Welcome back'}</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <motion.div
                            className="error-message"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="form-input"
                            autoComplete="email"
                            inputMode="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone (Optional)</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 1234567890"
                            className="form-input"
                            autoComplete="tel"
                            inputMode="tel"
                        />
                    </div>

                    {isRegister && (
                        <motion.div
                            className="form-group"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                        >
                            <label htmlFor="salon_name">Salon Name</label>
                            <input
                                type="text"
                                id="salon_name"
                                name="salon_name"
                                value={formData.salon_name}
                                onChange={handleChange}
                                placeholder="My Salon"
                                className="form-input"
                                autoComplete="organization"
                            />
                        </motion.div>
                    )}

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="form-input"
                            required
                            autoComplete={isRegister ? "new-password" : "current-password"}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{ width: '100%', marginTop: '8px' }}
                    >
                        {loading ? 'Please wait...' : (isRegister ? 'Create Account' : 'Login')}
                    </button>

                    <div className="login-toggle">
                        <span>
                            {isRegister ? 'Already have an account?' : "Don't have an account?"}
                        </span>
                        <button
                            type="button"
                            onClick={() => {
                                setIsRegister(!isRegister);
                                setError('');
                            }}
                            className="toggle-btn"
                        >
                            {isRegister ? 'Login' : 'Register'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
