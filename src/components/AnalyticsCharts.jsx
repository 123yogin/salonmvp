import { useState, useEffect } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
    LineChart, Line, CartesianGrid 
} from 'recharts';
import { summaryAPI } from '../services/api';

const AnalyticsCharts = () => {
    const [view, setView] = useState('monthly'); // 'monthly' or 'yearly'
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        fetchData();
    }, [view, date]);

    const fetchData = async () => {
        try {
            setLoading(true);
            let result;
            if (view === 'monthly') {
                result = await summaryAPI.getMonthlyAnalytics(date.getMonth() + 1, date.getFullYear());
            } else {
                result = await summaryAPI.getYearlyAnalytics(date.getFullYear());
            }
            setData(result.data);
            setTotal(result.total);
        } catch (err) {
            console.error('Error loading analytics:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePrev = () => {
        const newDate = new Date(date);
        if (view === 'monthly') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else {
            newDate.setFullYear(newDate.getFullYear() - 1);
        }
        setDate(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(date);
        if (view === 'monthly') {
            newDate.setMonth(newDate.getMonth() + 1);
        } else {
            newDate.setFullYear(newDate.getFullYear() + 1);
        }
        setDate(newDate);
    };

    const formatLabel = () => {
        if (view === 'monthly') {
            return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }
        return date.getFullYear().toString();
    };

    if (loading) {
        return <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading charts...</div>;
    }

    return (
        <div style={{ marginTop: '24px', padding: '0 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Analytics</h3>
                <div style={{ display: 'flex', gap: '8px', background: '#f3f4f6', padding: '4px', borderRadius: '8px' }}>
                    <button 
                        onClick={() => setView('monthly')}
                        style={{
                            border: 'none',
                            background: view === 'monthly' ? 'white' : 'transparent',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500',
                            color: view === 'monthly' ? 'var(--color-primary)' : 'var(--text-secondary)',
                            boxShadow: view === 'monthly' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Monthly
                    </button>
                    <button 
                        onClick={() => setView('yearly')}
                        style={{
                            border: 'none',
                            background: view === 'yearly' ? 'white' : 'transparent',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500',
                            color: view === 'yearly' ? 'var(--color-primary)' : 'var(--text-secondary)',
                            boxShadow: view === 'yearly' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            <div className="summary-card" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <button onClick={handlePrev} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px' }}>&lt;</button>
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>{formatLabel()}</span>
                    <button onClick={handleNext} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px' }}>&gt;</button>
                </div>
                
                <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Total Revenue</span>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-primary)' }}>₹{total.toLocaleString()}</div>
                </div>

                <div style={{ height: '200px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        {view === 'monthly' ? (
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis 
                                    dataKey="name" 
                                    tick={{ fontSize: 10 }} 
                                    interval={view === 'monthly' ? 2 : 0} // Skip labels if crowded
                                />
                                <YAxis hide />
                                <Tooltip 
                                    formatter={(value) => [`₹${value}`, 'Revenue']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        ) : (
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                <YAxis hide />
                                <Tooltip 
                                    formatter={(value) => [`₹${value}`, 'Revenue']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Line type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 3 }} />
                            </LineChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCharts;

