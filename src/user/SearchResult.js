// src/components/SearchResults.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';
import Header from './Header';
import PropertyCard from './PropertyCard';
import InspectModal from './InspectModal'
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get('query');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty,setSelectedProperty] = useState(null);
  const [isModalOpen,setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchProperties = async () => {
      if (!searchTerm) {
        setError('No search term provided.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://renty-server.onrender.com/api/properties/search/'+searchTerm, {
        });
        console.log('Search Results:', response.data); // Debugging log
        setProperties(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to fetch search results.');
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchTerm]);

  if (loading) {
    return <div className="search-results"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="search-results"><p>{error}</p></div>;
  }

  if (properties.length === 0) {
    return <div className="search-results"><p>No properties found for "{searchTerm}".</p></div>;
  }
  const handleInspect = (property)=>{
    setSelectedProperty(property);
    setIsModalOpen(true);
  }
  const handleCloseModal=()=>{
    setSelectedProperty(null);



    setIsModalOpen(false)
  }
  return (
    <div className="search-results">
      <fontAwesome icon="fa-arrow-right"/>
      <h2>Properties around "{searchTerm}"</h2>
      <div className="property-list">
        {properties.map(property => (
          <PropertyCard property={property} key={property.id} onInspect={handleInspect} />
        ))}
      </div>
      {isModalOpen && selectedProperty &&(<InspectModal property={selectedProperty} onClose={handleCloseModal}/>)}
    </div>
  );
};

export default SearchResults;
