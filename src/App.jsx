import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './styles/components.css';
import './styles/pages.css';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const Summary = lazy(() => import('./pages/Summary'));
const Settings = lazy(() => import('./pages/Settings'));
const EditServices = lazy(() => import('./pages/EditServices'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));

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
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                        <Route index element={<Home />} />
                        <Route path="summary" element={<Summary />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="edit-services" element={<EditServices />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Routes>
            </Suspense>
        </AuthProvider>
    );
}

export default App;

