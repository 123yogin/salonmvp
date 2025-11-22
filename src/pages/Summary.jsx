import { Download } from 'lucide-react';

const Summary = () => {
    return (
        <div className="page-container">
            <div className="summary-cards-row">
                <div className="summary-card">
                    <span className="card-label">Total Revenue</span>
                    <span className="card-value">₹12,450</span>
                </div>

                <div className="summary-card split-card">
                    <div className="split-item">
                        <span className="card-label">Cash</span>
                        <span className="card-value">₹4,200</span>
                    </div>
                    <div className="split-divider"></div>
                    <div className="split-item">
                        <span className="card-label">UPI / Online</span>
                        <span className="card-value">₹8,250</span>
                    </div>
                </div>
            </div>

            <div className="breakdown-list">
                <div className="breakdown-item">
                    <span className="service-name">Haircut (Men)</span>
                    <span className="service-price">12 x ₹250</span>
                </div>
                <div className="breakdown-item">
                    <span className="service-name">Facial</span>
                    <span className="service-price">3 x ₹1200</span>
                </div>
                <div className="breakdown-item">
                    <span className="service-name">Shaving</span>
                    <span className="service-price">8 x ₹150</span>
                </div>
                <div className="breakdown-item">
                    <span className="service-name">Hair Spa</span>
                    <span className="service-price">2 x ₹800</span>
                </div>
            </div>

            <button className="btn btn-primary download-btn">
                <Download size={18} />
                Download Report
            </button>
        </div>
    );
};

export default Summary;
