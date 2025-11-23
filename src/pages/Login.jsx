import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        password: '',
        salon_name: '',
        verificationCode: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, register, confirmRegistration } = useAuth();
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
            
            if (isVerifying) {
                // Verification Flow
                if (!formData.verificationCode) {
                    setError('Please enter verification code');
                    setLoading(false);
                    return;
                }
                result = await confirmRegistration(formData.email, formData.verificationCode);
                if (result.success) {
                    setIsVerifying(false);
                    setIsRegister(false);
                    setError('');
                    alert('Account verified! Please login.');
                    // Clear password for security/UX
                    setFormData(prev => ({...prev, password: '', verificationCode: ''}));
                } else {
                    setError(result.error);
                }
            } 
            else if (isRegister) {
                // Registration Flow
                if (!formData.password || !formData.email) {
                    setError('Please fill in all required fields');
                    setLoading(false);
                    return;
                }
                // Note: For MVP we just pass fields Cognito expects. 
                // If you want to save salon_name later, we need to store it in temp state 
                // or pass it to syncProfile after login. 
                // For now, let's assume syncProfile will ask for it if missing, or we handle it then.
                // Actually, AuthContext.login handles syncProfile. 
                // But syncProfile reads from request body. 
                // So we need to make sure when we LOGIN, we pass any extra data if it's a first time login?
                // Or better: syncProfile checks if salon exists. If not, it uses defaults or what we send.
                // But AuthContext.login only sends creds.
                // Let's stick to simple flow: Register -> Verify -> Login.
                // The user will be prompted to set up salon if needed (maybe add that flow later).
                
                result = await register({
                    email: formData.email,
                    password: formData.password
                    // salon_name is currently ignored by Cognito signUp unless custom attribute
                });

                if (result.success) {
                    if (result.requiresVerification) {
                        setIsVerifying(true);
                    } else {
                        navigate('/home');
                    }
                } else {
                    setError(result.error);
                }
            } else {
                // Login Flow
                if (!formData.password || !formData.email) {
                    setError('Please enter email and password');
                    setLoading(false);
                    return;
                }
                result = await login({
                    email: formData.email,
                    password: formData.password,
                });

            if (result.success) {
                navigate('/home');
            } else {
                setError(result.error);
                }
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
                    <p>
                        {isVerifying 
                            ? 'Verify your email' 
                            : (isRegister ? 'Create your account' : 'Welcome back')}
                    </p>
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

                    {!isVerifying ? (
                        <>
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
                        </>
                    ) : (
                        <div className="form-group">
                            <label htmlFor="verificationCode">Verification Code</label>
                            <input
                                type="text"
                                id="verificationCode"
                                name="verificationCode"
                                value={formData.verificationCode}
                                onChange={handleChange}
                                placeholder="123456"
                                className="form-input"
                                required
                            />
                            <p style={{fontSize: '0.8rem', marginTop: '5px', color: '#666'}}>
                                Please check your email ({formData.email}) for the code.
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{ width: '100%', marginTop: '8px' }}
                    >
                        {loading ? 'Please wait...' : (
                            isVerifying ? 'Verify Account' : 
                            (isRegister ? 'Create Account' : 'Login')
                        )}
                    </button>

                    {!isVerifying && (
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
                    )}
                    
                    {isVerifying && (
                         <div className="login-toggle">
                            <button
                                type="button"
                                onClick={() => setIsVerifying(false)}
                                className="toggle-btn"
                            >
                                Back to Login
                            </button>
                        </div>
                    )}
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
