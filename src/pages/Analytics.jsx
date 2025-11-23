import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnalyticsCharts from '../components/AnalyticsCharts';

const Analytics = () => {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '20px',
                gap: '12px'
            }}>
                <button 
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <ChevronLeft size={24} color="var(--text-primary)" />
                </button>
                <h2 style={{ margin: 0, fontSize: '20px' }}>Performance Analytics</h2>
            </div>

            <div style={{ marginBottom: '24px' }}>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '14px' }}>
                    Track your salon's growth, revenue trends, and seasonal performance over time.
                </p>
            </div>

            <AnalyticsCharts />
        </div>
    );
};

export default Analytics;

