import { useState, useEffect } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
    LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { summaryAPI } from '../services/api';

const COLORS = ['#047857', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5'];

const AnalyticsCharts = () => {
    const [view, setView] = useState('monthly'); // 'monthly' or 'yearly'
    const [chartData, setChartData] = useState([]);
    const [metrics, setMetrics] = useState({
        total: 0,
        totalServices: 0,
        avgTicket: 0,
        serviceMix: [],
        staffContribution: []
    });
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
            
            setChartData(result.data);
            setMetrics({
                total: result.total,
                totalServices: result.total_services,
                avgTicket: result.average_ticket,
                serviceMix: result.service_mix,
                staffContribution: result.staff_contribution
            });
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
        return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading analytics...</div>;
    }

    return (
        <div style={{ marginTop: '24px', padding: '0 16px' }}>
            
            {/* Header Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={handlePrev} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px' }}>&lt;</button>
                    <span style={{ fontWeight: '600', fontSize: '16px' }}>{formatLabel()}</span>
                    <button onClick={handleNext} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px' }}>&gt;</button>
                </div>
                
                <div style={{ display: 'flex', gap: '8px', background: '#f3f4f6', padding: '4px', borderRadius: '8px' }}>
                    <button 
                        onClick={() => setView('monthly')}
                        style={{
                            border: 'none',
                            background: view === 'monthly' ? 'white' : 'transparent',
                            padding: '6px 12px',
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
                            padding: '6px 12px',
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

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
                <div className="summary-card" style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Revenue</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-primary)' }}>₹{metrics.total.toLocaleString()}</div>
                </div>
                <div className="summary-card" style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Services</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>{metrics.totalServices}</div>
                </div>
                <div className="summary-card" style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Avg Ticket</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>₹{metrics.avgTicket.toLocaleString()}</div>
                </div>
            </div>

            {/* Growth Chart */}
            <div className="summary-card" style={{ marginBottom: '24px', padding: '20px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>Revenue Trend</h4>
                <div style={{ height: '250px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        {view === 'monthly' ? (
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis 
                                    dataKey="name" 
                                    tick={{ fontSize: 10, fill: '#888' }} 
                                    axisLine={false}
                                    tickLine={false}
                                    interval={view === 'monthly' ? 2 : 0}
                                />
                                <YAxis hide />
                                <Tooltip 
                                    cursor={{ fill: 'transparent' }}
                                    formatter={(value) => [`₹${value}`, 'Revenue']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        ) : (
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Tooltip 
                                    formatter={(value) => [`₹${value}`, 'Revenue']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Line type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 3, fill: 'var(--color-primary)' }} activeDot={{ r: 5 }} />
                            </LineChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pie Charts Section */}
            <div style={{ display: 'grid', gap: '24px' }}>
                {/* Service Mix */}
                {metrics.serviceMix.length > 0 && (
                    <div className="summary-card" style={{ padding: '20px' }}>
                        <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>Top Services (Volume)</h4>
                        <div style={{ height: '250px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={metrics.serviceMix}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {metrics.serviceMix.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [value, 'Count']} />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Staff Contribution */}
                {metrics.staffContribution.length > 0 && (
                    <div className="summary-card" style={{ padding: '20px' }}>
                        <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>Staff Revenue Share</h4>
                        <div style={{ height: '250px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={metrics.staffContribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {metrics.staffContribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyticsCharts;
