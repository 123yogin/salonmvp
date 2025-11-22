import { Calendar } from 'lucide-react';

const TopBar = () => {
    return (
        <header className="top-bar">
            <div className="top-bar-content">
                <h1 className="app-title">SalonLog</h1>

                <div className="daily-summary-pill">
                    <Calendar size={14} className="icon" />
                    <span className="summary-text">Today: ₹0</span>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
