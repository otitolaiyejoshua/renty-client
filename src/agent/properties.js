import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'; // More options icon
import { faKitchenSet, faBathtub, faBed, faToilet } from '@fortawesome/free-solid-svg-icons'; // Kitchen, Bathroom, Bed, Toilet icons
import './Properties.css';
import { getUserData } from '../getUserData';

Modal.setAppElement('#root');

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState('');
  const [university, setUniversity] = useState('');
  const [price, setPrice] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [toilets, setToilets] = useState('');
  const [rooms, setRooms] = useState('');
  const [kitchens, setKitchens] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [interiorImages, setInteriorImages] = useState([]);
  const [imageUploadStatus, setImageUploadStatus] = useState('Select 3 interior images');
  const [showMenu, setShowMenu] = useState(null); // Track which menu is visible
  const [animationClass, setAnimationClass] = useState('');
  const userData = getUserData();
  const agentId = userData ? userData.userId : null;
  const token = userData ? userData.token : null;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`https://renty-server.onrender.com/api/properties/${agentId}`, {
          headers: {
            'x-access-token': token,
          },
        });
        setProperties(response.data);
        console.log(properties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [agentId, token]);

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleInteriorImagesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    
    // Accumulate new files with the previous ones
    const updatedImages = [...interiorImages, ...newFiles];
  
    // If more than 3 images are selected, only keep the first 3
    if (updatedImages.length > 3) {
      alert('You can only select 3 interior images');
      return;
    }
  
    setInteriorImages(updatedImages);
  
    const remainingImages = 3 - updatedImages.length;
    setImageUploadStatus(remainingImages > 0 ? `${remainingImages} more to go` : 'Done');
  
    // Trigger animation class
    setAnimationClass('fade-in');
    setTimeout(() => setAnimationClass(''), 500); // Reset animation class after 500ms
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (interiorImages.length !== 3) {
      alert("You must upload exactly 3 interior images.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('address', address);
    formData.append('region', region);
    formData.append('university', university);
    formData.append('price', price);
    formData.append('bathrooms', bathrooms);
    formData.append('toilets', toilets);
    formData.append('rooms', rooms);
    formData.append('kitchens', kitchens);
    formData.append('agentId', agentId);
    formData.append('mainImage', mainImage);
    interiorImages.forEach((image, index) => {
      formData.append(`interiorImage${index + 1}`, image);
    });

    try {
      if (editMode) {
        await axios.put(`https://renty-server.onrender.com/api/properties/${selectedProperty.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': token,
          },
        });
      } else {
        await axios.post('https://renty-server.onrender.com/api/properties', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': token,
          },
        });
      }
      setShowModal(false);
      resetForm();
      const response = await axios.get(`https://renty-server.onrender.com/api/properties/${agentId}`, {
        headers: {
          'x-access-token': token,
        },
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Error adding/updating property:', error);
    }
  };

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setTitle(property.title);
    setAddress(property.address);
    setRegion(property.region);
    setUniversity(property.university);
    setPrice(property.price);
    setBathrooms(property.bathrooms);
    setToilets(property.toilets);
    setRooms(property.rooms);
    setKitchens(property.kitchens);
    setShowModal(true);
    setEditMode(true);
    setShowMenu(null); // Close menu on edit
  };

  const handleDeleteClick = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await axios.delete(`https://renty-server.onrender.com/api/properties/delete/${propertyId}`, {
          headers: {
            'x-access-token': token,
          },
        });
        const response = await axios.get(`https://renty-server.onrender.com/api/properties/${agentId}`, {
          headers: {
            'x-access-token': token,
          },
        });
        setProperties(response.data);
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setAddress('');
    setPrice('');
    setBathrooms('');
    setToilets('');
    setRooms('');
    setKitchens('');
    setMainImage(null);
    setInteriorImages([]);
    setImageUploadStatus('Select 3 interior images');
  };

  const toggleMenu = (propertyId) => {
    setShowMenu(showMenu === propertyId ? null : propertyId);
  };

  const handleClickOutside = (event) => {
    if (showMenu && !event.target.closest('.menu-content')) {
      setShowMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="properties-container">
      <h2>My Properties</h2>
      {properties.length === 0 ? (
        <p>No properties</p>
      ) : (
        <div className="properties-grid">
          {properties.map((property) => (
            <div className="property-card" key={property._id}>
              <img src={`https://renty-server.onrender.com/uploads/${property.mainImage}`} alt={property.title} />
              <h3>{property.title}</h3>
              <p>{property.address}</p>
              <p>₦{property.price}</p>
              <div className="property-details">
                <span>
                  <FontAwesomeIcon icon={faKitchenSet} className="agenticon" /> {property.kitchens} Kitchen{property.kitchens > 1 ? 's' : ''}
                </span>
                <span>
                  <FontAwesomeIcon icon={faBathtub} className="agenticon" /> {property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}
                </span>
                <span>
                  <FontAwesomeIcon icon={faBed} className="agenticon" /> {property.rooms} Room{property.rooms > 1 ? 's' : ''}
                </span>
                <span>
                  <FontAwesomeIcon icon={faToilet} className="agenticon" /> {property.toilets} Toilet{property.toilets > 1 ? 's' : ''}
                </span>
              </div>
              <div className="property-actions">
                <div className="menu">
                  <button
                    className="menu-button"
                    onClick={() => toggleMenu(property._id)}
                    type="button"
                  >
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                  <div className={`menu-content ${showMenu === property._id ? 'show' : ''}`}>
                    <div onClick={() => handleEditClick(property)}>Edit</div>
                    <div onClick={() => handleDeleteClick(property._id)}>Delete</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="create-property-button" onClick={() => { setShowModal(true); resetForm(); }}>
        Create New Property Listing
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Property Form"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{editMode ? 'Edit Property' : 'Create Property'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <input type="text" placeholder="Region" value={region} onChange={(e) => setRegion(e.target.value)} required />
          <input type="text" placeholder="University" value={university} onChange={(e) => setUniversity(e.target.value)} required />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <input type="number" placeholder="Bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} required />
          <input type="number" placeholder="Toilets" value={toilets} onChange={(e) => setToilets(e.target.value)} required />
          <input type="number" placeholder="Rooms" value={rooms} onChange={(e) => setRooms(e.target.value)} required />
          <input type="number" placeholder="Kitchens" value={kitchens} onChange={(e) => setKitchens(e.target.value)} required />
          <input type="file" accept="image/*" onChange={handleMainImageChange} required />
          <input type="file" accept="image/*" multiple onChange={handleInteriorImagesChange} required />
          <p className={`image-upload-status ${animationClass}`}>{imageUploadStatus}</p>
          <button type="submit">{editMode ? 'Update Property' : 'Create Property'}</button>
          <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default Properties;
