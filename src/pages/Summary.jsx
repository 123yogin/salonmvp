import { Download, BarChart2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { summaryAPI } from '../services/api';

const Summary = () => {
    // Get today's date in YYYY-MM-DD format for default
    const todayStr = new Date().toISOString().split('T')[0];
    
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(todayStr);
    const [summary, setSummary] = useState(null);
    const [breakdown, setBreakdown] = useState([]);
    const [staffPerformance, setStaffPerformance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        fetchData();
    }, [location.pathname, selectedDate]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [summaryData, breakdownData, staffData] = await Promise.all([
                summaryAPI.getToday(selectedDate),
                summaryAPI.getBreakdown(selectedDate),
                summaryAPI.getStaffPerformance(selectedDate),
            ]);
            setSummary(summaryData);
            setBreakdown(breakdownData.breakdown);
            setStaffPerformance(staffData.performance);
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
        if (!summary || (breakdown.length === 0 && staffPerformance.length === 0)) return;

        const csvContent = [
            `Date: ${selectedDate}`,
            'Service,Count,Total',
            ...breakdown.map(item => `${item.service_name},${item.count},${item.total}`),
            '',
            'Staff Performance',
            'Name,Count,Total',
            ...staffPerformance.map(item => `${item.staff_name},${item.count},${item.total}`),
            '',
            `Total Revenue,,${summary.total_revenue}`,
            `Cash,,${summary.cash_total}`,
            `UPI,,${summary.upi_total}`,
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `salon-report-${selectedDate}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleCloseRegister = async () => {
        const isToday = selectedDate === todayStr;
        const msg = isToday 
            ? 'Are you sure you want to close the register for TODAY? This will save the daily summary.' 
            : `Are you sure you want to close the register for ${selectedDate}?`;
            
        if (!confirm(msg)) {
            return;
        }

        try {
            await summaryAPI.createDailyClosing(selectedDate);
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
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '16px',
                padding: '0 8px'
            }}>
                <h2 style={{ margin: 0, fontSize: '20px' }}>Summary</h2>
                <input 
                    type="date" 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        outline: 'none'
                    }}
                />
            </div>

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
                <h3 style={{ padding: '0 16px', fontSize: '16px', marginBottom: '8px', marginTop: '20px' }}>Service Breakdown</h3>
                {breakdown.length > 0 ? (
                    breakdown.map((item, index) => (
                        <div key={index} className="breakdown-item">
                            <span className="service-name">{item.service_name}</span>
                            <span className="service-price">{item.count} x ₹{(item.total / item.count).toFixed(2)}</span>
                            <span style={{fontWeight: 'bold'}}>₹{item.total.toFixed(2)}</span>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
                        No services logged today.
                    </div>
                )}
            </div>

            {staffPerformance.length > 0 && (
                <div className="breakdown-list">
                    <h3 style={{ padding: '0 16px', fontSize: '16px', marginBottom: '8px', marginTop: '20px' }}>Staff Performance</h3>
                    {staffPerformance.map((item, index) => (
                        <div key={index} className="breakdown-item">
                            <span className="service-name">{item.staff_name}</span>
                            <span className="service-price">{item.count} Services</span>
                            <span style={{fontWeight: 'bold'}}>₹{item.total.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            )}

            <div style={{ marginTop: '20px', padding: '0 8px' }}>
                <button 
                    className="btn btn-secondary" 
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    onClick={() => navigate('/home/analytics')}
                >
                    <BarChart2 size={18} />
                    View Performance Trends
                </button>
            </div>

            <div className="actions-row" style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
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

