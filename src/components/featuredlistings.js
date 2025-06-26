// src/components/FeaturedListings.js

import React from 'react';
import Slider from 'react-slick';
const FeaturedListings = React.forwardRef((props,ref)=> {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const listings = [
    { id: 1, image: 'images/listingimage1.jpg', description: 'Beautiful Apartment with Student bunks' },
    { id: 2, image: 'images/listingimage2.jpg', description: 'Spacious apartment with a view' },
    { id: 3, image: 'images/listingimage3.jpg', description: 'Hostel in one of our univiersity locations' },
    { id: 4, image: 'images/listingimage4.jpg', description: 'Hostel Accomodation' },
  ];

  return (
    <div ref={ref} className="services">
      <h2>Featured Listings</h2>
      <Slider {...settings}>
        {listings.map(listing => (
          <div key={listing.id} className="listing-item">
            <img src={listing.image} alt={listing.description} />
            <p>{listing.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
});

export default FeaturedListings;
