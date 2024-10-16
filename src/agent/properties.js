import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import KitchenIcon from '@material-ui/icons/Kitchen';
import BathtubIcon from '@material-ui/icons/Bathtub';
import KingBedIcon from '@material-ui/icons/KingBed';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService'; // For toilets
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
        const response = await axios.get(`http://localhost:5000/api/properties/${agentId}`, {
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
        await axios.put(`http://localhost:5000/api/properties/${selectedProperty.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': token,
          },
        });
      } else {
        await axios.post('http://localhost:5000/api/properties', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': token,
          },
        });
      }
      setShowModal(false);
      resetForm();
      const response = await axios.get(`http://localhost:5000/api/properties/${agentId}`, {
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
    setRegion(property.region)
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
        await axios.delete(`http://localhost:5000/api/properties/delete/${propertyId}`, {
          headers: {
            'x-access-token': token,
          },
        });
        const response = await axios.get(`http://localhost:5000/api/properties/${agentId}`, {
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
              <img src={`http://localhost:5000/uploads/${property.mainImage}`} alt={property.title} />
              <h3>{property.title}</h3>
              <p>{property.address}</p>
              <p>₦{property.price}</p>
              <div className="property-details">
                <span><KitchenIcon className="agenticon" fontSize="small" /> {property.kitchens} Kitchen{property.kitchens > 1 ? 's' : ''}</span>
                <span><BathtubIcon className="agenticon" fontSize="small" /> {property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}</span>
                <span><LocalLaundryServiceIcon className="agenticon" fontSize="small" /> {property.toilets} Toilet{property.toilets > 1 ? 's' : ''}</span>
                <span><KingBedIcon className="agenticon" fontSize="small" /> {property.rooms} Room{property.rooms > 1 ? 's' : ''}</span>
              </div>
              <div className="property-actions">
                <div className="menu">
                  <IconButton className="menu-button" onClick={() => toggleMenu(property._id)}>
                    <MoreVertIcon />
                  </IconButton>
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
      <div className="create-new-button-container">
        <button className="create-new-button" onClick={() => setShowModal(true)}>Create New Property Listing</button>
      </div>
      <Modal isOpen={showModal} className="pmodal" onRequestClose={() => setShowModal(false)} contentLabel="Property Form" overlayClassName="poverlay">
  <h2 className="propertyheading">{editMode ? 'Edit Property' : 'Add New Property'}</h2>
  <form onSubmit={handleSubmit} className="agentform">
    <div>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
    </div>
    <div>
      <input type="text" placeholder="State" value={region} onChange={(e) => setRegion(e.target.value)} required />
    </div>
    <div>
      <input type="text" placeholder="University in the Region" value={university} onChange={(e) => setUniversity(e.target.value)} required />
    </div>
    <div>
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
    </div>
    <div>
      <input type="number" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} required />
    </div>
    <div className="row-fields">
      <div className="field">
        <input placeholder="Bathrooms" type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} required />
      </div>
      <div className="field">
        <input placeholder="Toilets" type="number" value={toilets} onChange={(e) => setToilets(e.target.value)} required />
      </div>
    </div>
    <div className="row-fields">
      <div className="field">
        <input placeholder="Rooms" type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} required />
      </div>
      <div className="field">
        <input placeholder="Kitchens" type="number" value={kitchens} onChange={(e) => setKitchens(e.target.value)} required />
      </div>
    </div>
     <div className="image-row">
      <div className="image-upload">
        <label>
          <img className="uploadimage" src="/images/interiorimage.png" alt="Upload Image" />
          <input type="file" accept="image/*" onChange={handleMainImageChange} />
        </label>
        {mainImage && <img src={URL.createObjectURL(mainImage)} alt="Main" className="image-preview" />}
      </div>
      <div className="image-upload">
        <label>
          <img className="uploadimage" src="/images/interiorimage.png" alt="Upload Image" />
          <input type="file" accept="image/*" multiple onChange={handleInteriorImagesChange} />
        </label>
        <div className={`image-upload-status ${animationClass}`}>{imageUploadStatus}</div>
        <div className="image-preview-container">
          {interiorImages.map((image, index) => (
            <img key={index} src={URL.createObjectURL(image)} alt={`Interior ${index + 1}`} className="image-preview" />
          ))}
        </div>
      </div>
    </div>
    <button className="submit" type="submit">{editMode ? 'Update Property' : 'Add Property'}</button>
  </form>
</Modal>
    </div>
  );
};

export default Properties;
