// client/src/components/Analytics.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Analytics.css'; // Import CSS for styling
import { getUserData } from '../getUserData';
const Analytics = () => {
    const [properties,setProperties] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch analytics data on component mount
    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const userData = getUserData();
                const agentId = userData ? userData.userId : null;
                const token = userData ? userData.token : null;
                const response = await axios.get(`https://uniconnect.africa/api/analytics/${agentId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setProperties(response.data[0].propertyCount);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching analytics:', err.response?.data || err.message);
                setError('Failed to load analytics data.');
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) return <div className="analytics-container"><p>Loading...</p></div>;
    if (error) return <div className="analytics-container"><p>{error}</p></div>;

    return (
        <div className="analytics-container">
            <h2>Analytics</h2>
            <div className="analytics-cards">
                <div className="card">
                    <h3>Properties</h3>
                    <p>{properties}</p>
                </div>
                <div className="card">
                    <h3>Bookings</h3>
                    <p>0</p>
                </div>
                <div className="card">
                    <h3>Inspections</h3>
                    <p>0</p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
