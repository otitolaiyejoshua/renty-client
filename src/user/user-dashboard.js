import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import PropertyCard from './PropertyCard';
import InspectModal from './InspectModal';
import './UserDashboard.css';

const UserDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://renty-server.onrender.com/api/properties');
        console.log("Fetched properties:", response.data); // Debugging line
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, []);

  const handleInspect = (property) => {
    console.log("Inspecting property:", property); // Debugging line
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("Closing modal"); // Debugging line
    setSelectedProperty(null);
    setIsModalOpen(false);
  };

  return (
    <div className="user-dashboard-container">
      <Header />
      <div className="user-properties-grid">
        {properties.length === 0 ? (
          <p>No properties available</p>
        ) : (
          properties.map((property) => (
            <PropertyCard property={property} key={property.id} onInspect={handleInspect} />
          ))
        )}
      </div>
      {isModalOpen && selectedProperty && (
        <InspectModal property={selectedProperty} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default UserDashboard;
