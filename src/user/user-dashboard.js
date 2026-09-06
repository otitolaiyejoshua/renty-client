import React, { useState, useEffect } from 'react';
import api from '../api/api';
import Header from './Header';
import PropertyCard from './PropertyCard';
import InspectModal from './InspectModal';
import './UserDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHeart, faCalendarCheck, faMessage } from '@fortawesome/free-solid-svg-icons';
import { getUserData } from '../getUserData';

const UserDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const user = getUserData();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get('/api/properties');

        console.log(
          '🏠 Renty properties response:',
          response.data
        );

        if (Array.isArray(response.data)) {
          response.data.forEach((property, index) => {
            console.log(
              `🏠 Property ${index + 1}:`,
              property
            );

            console.log(
              'Main image:',
              property.mainImage
            );

            console.log(
              'Interior image:',
              property.interiorImage
            );
          });
        }

        setProperties(
          Array.isArray(response.data)
            ? response.data
            : []
        );
      } catch (error) {
        console.error(
          'Error fetching properties:',
          error
        );
      }
    };

    fetchProperties();
  }, []);
  const name = user?.userName || user?.username || 'there';
  return <div className="user-dashboard-container">
    <Header />
    <main className="user-dashboard-main">
      <section className="dashboard-hero">
        <div><p className="dashboard-kicker">Your Renty space</p><h1>Find a place that feels like home, {name.split(' ')[0]}.</h1><p>Explore verified listings, compare spaces and book inspections without the usual rental stress.</p></div>
        <a href="#available-properties" className="dashboard-search-link">Explore homes <span>→</span></a>
      </section>
      <section className="user-stat-grid">
        <div className="user-stat"><div className="user-stat-top"><span>Available homes</span><span className="user-stat-icon"><FontAwesomeIcon icon={faHouse} /></span></div><strong>{properties.length}</strong><small>Listings currently available</small></div>
        <div className="user-stat"><div className="user-stat-top"><span>Saved homes</span><span className="user-stat-icon"><FontAwesomeIcon icon={faHeart} /></span></div><strong>0</strong><small>Build your shortlist</small></div>
        <div className="user-stat"><div className="user-stat-top"><span>Inspections</span><span className="user-stat-icon"><FontAwesomeIcon icon={faCalendarCheck} /></span></div><strong>0</strong><small>Upcoming visits</small></div>
        <div className="user-stat"><div className="user-stat-top"><span>Messages</span><span className="user-stat-icon"><FontAwesomeIcon icon={faMessage} /></span></div><strong>0</strong><small>Conversations</small></div>
      </section>
      <section id="available-properties">
        <div className="properties-section-head"><div><h2>Recommended properties</h2><p>Fresh listings from agents on Renty</p></div></div>
        <div className="user-properties-grid">
          {properties.length === 0 ? <div className="user-empty-state"><strong>No properties available yet</strong>Check back soon for new listings.</div> : properties.map((property) => <PropertyCard property={property} key={property.id || property._id} onInspect={setSelectedProperty} />)}
        </div>
      </section>
    </main>
    {selectedProperty && <InspectModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />}
  </div>;
};
export default UserDashboard;
