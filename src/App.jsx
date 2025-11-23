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
                <div className="spinner">
                    <div className="spinner-inner"></div>
                </div>
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
        <div className="spinner">
            <div className="spinner-inner"></div>
        </div>
        <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Loading SalonLedger...</span>
    </div>
);

// Component to restrict access based on role
const RoleRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    
    if (loading) return <LoadingScreen />;
    
    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/home" replace />;
    }
    
    return children;
};

function App() {
    return (
        <AuthProvider>
            <Suspense fallback={<LoadingScreen />}>
                <Routes>
                    <Route path="/" element={<LandingPageRoute />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                        <Route index element={<Home />} />
                        <Route path="summary" element={
                            <RoleRoute allowedRoles={['OWNER']}>
                                <Summary />
                            </RoleRoute>
                        } />
                        <Route path="edit-services" element={
                            <RoleRoute allowedRoles={['OWNER']}>
                                <EditServices />
                            </RoleRoute>
                        } />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Routes>
            </Suspense>
        </AuthProvider>
    );
}

export default App;

