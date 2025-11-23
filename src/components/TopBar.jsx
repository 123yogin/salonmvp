import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { summaryAPI } from '../services/api';

const TopBar = () => {
    const [todayRevenue, setTodayRevenue] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchTodayRevenue = async () => {
        try {
            const data = await summaryAPI.getToday();
            setTodayRevenue(data.total_revenue || 0);
        } catch (err) {
            console.error('Error fetching today revenue:', err);
            setTodayRevenue(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodayRevenue();

        // Listen for service log updates
        const handleServiceAdded = () => {
            fetchTodayRevenue();
        };

        window.addEventListener('serviceLogAdded', handleServiceAdded);

        return () => {
            window.removeEventListener('serviceLogAdded', handleServiceAdded);
        };
    }, []);

    return (
        <header className="top-bar">
            <div className="top-bar-content">
                <h1 className="app-title">SalonLedger</h1>

                <div className="daily-summary-pill">
                    <Calendar size={14} className="icon" />
                    <span className="summary-text">
                        Today: ₹{loading ? '...' : todayRevenue.toFixed(0)}
                    </span>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
