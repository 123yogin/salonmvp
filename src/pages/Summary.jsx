import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { summaryAPI } from '../services/api';

const Summary = () => {
    const [summary, setSummary] = useState(null);
    const [breakdown, setBreakdown] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        fetchData();
    }, [location.pathname]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [summaryData, breakdownData] = await Promise.all([
                summaryAPI.getToday(),
                summaryAPI.getBreakdown(),
            ]);
            console.log('Summary data received:', summaryData);
            console.log('Breakdown data received:', breakdownData);
            setSummary(summaryData);
            setBreakdown(breakdownData.breakdown);
            setError(null);
        } catch (err) {
            setError('Failed to load summary data');
            console.error('Error fetching summary:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        // Simple CSV download
        if (!summary || breakdown.length === 0) return;

        const csvContent = [
            'Service,Count,Total',
            ...breakdown.map(item => `${item.service_name},${item.count},${item.total}`),
            '',
            `Total Revenue,,${summary.total_revenue}`,
            `Cash,,${summary.cash_total}`,
            `UPI,,${summary.upi_total}`,
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `salon-report-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleCloseRegister = async () => {
        if (!confirm('Are you sure you want to close the register for today? This will save the daily summary.')) {
            return;
        }

        try {
            await summaryAPI.createDailyClosing(new Date().toISOString().split('T')[0]);
            alert('Daily closing saved successfully!');
        } catch (err) {
            console.error('Error closing register:', err);
            if (err.response?.data?.error) {
                alert(`Error: ${err.response.data.error}`);
            } else {
                alert('Failed to close register. Please try again.');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ height: '60vh' }}>
                <div className="spinner">
                    <div className="spinner-inner"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-container">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="summary-cards-row">
                <div className="summary-card">
                    <span className="card-label">Total Revenue</span>
                    <span className="card-value">₹{summary?.total_revenue?.toFixed(2) || '0.00'}</span>
                </div>

                <div className="summary-card split-card">
                    <div className="split-item">
                        <span className="card-label">Cash</span>
                        <span className="card-value">₹{summary?.cash_total?.toFixed(2) || '0.00'}</span>
                    </div>
                    <div className="split-divider"></div>
                    <div className="split-item">
                        <span className="card-label">UPI / Online</span>
                        <span className="card-value">₹{summary?.upi_total?.toFixed(2) || '0.00'}</span>
                    </div>
                </div>
            </div>

            <div className="breakdown-list">
                {breakdown.length > 0 ? (
                    breakdown.map((item, index) => (
                        <div key={index} className="breakdown-item">
                            <span className="service-name">{item.service_name}</span>
                            <span className="service-price">{item.count} x ₹{(item.total / item.count).toFixed(2)}</span>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                        No services logged today.
                    </div>
                )}
            </div>

            <div className="actions-row" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button className="btn btn-primary download-btn" onClick={handleDownload} disabled={!summary || breakdown.length === 0} style={{ flex: 1 }}>
                    <Download size={18} />
                    Download
                </button>
                <button className="btn btn-secondary" onClick={handleCloseRegister} disabled={!summary} style={{ flex: 1 }}>
                    Close Register
                </button>
            </div>
        </div>
    );
};

export default Summary;

