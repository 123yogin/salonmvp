import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/components.css';
import './styles/pages.css';

// Lazy Load Pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Home = lazy(() => import('./pages/Home'));
const Summary = lazy(() => import('./pages/Summary'));
const EditServices = lazy(() => import('./pages/EditServices'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));

// Component to redirect authenticated users from landing page
const LandingPageRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', gap: '16px' }}>
                <div className="spinner"></div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Loading...</span>
            </div>
        );
    }
    
    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }
    
    return <LandingPage />;
};

// Loading Component
const LoadingScreen = () => (
    <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', gap: '16px' }}>
        <div className="spinner"></div>
        <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Loading SalonLog...</span>
    </div>
);

function App() {
    return (
        <AuthProvider>
            <Suspense fallback={<LoadingScreen />}>
                <Routes>
                    <Route path="/" element={<LandingPageRoute />} />
                    <Route path="/login" element={<Login />} />
                    {/* Redirect old paths to new paths for backward compatibility */}
                    <Route path="/edit-services" element={<ProtectedRoute><Navigate to="/home/edit-services" replace /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Navigate to="/home/profile" replace /></ProtectedRoute>} />
                    <Route path="/summary" element={<ProtectedRoute><Navigate to="/home/summary" replace /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Navigate to="/home/profile" replace /></ProtectedRoute>} />
                    <Route path="/home" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                        <Route index element={<Home />} />
                        <Route path="summary" element={<Summary />} />
                        <Route path="edit-services" element={<EditServices />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Routes>
            </Suspense>
        </AuthProvider>
    );
}

export default App;

