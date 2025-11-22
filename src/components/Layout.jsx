import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import TopBar from './TopBar';

const Layout = () => {
    return (
        <div className="app-layout">
            <TopBar />
            <main className="main-content">
                <Outlet />
            </main>
            <BottomNav />
        </div>
    );
};

export default Layout;
