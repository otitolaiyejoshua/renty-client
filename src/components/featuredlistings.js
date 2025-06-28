import React from 'react';
import Slider from 'react-slick';

const FeaturedListings = React.forwardRef((props, ref) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  const listings = [
    { id: 1, image: 'images/listingimage1.jpg', description: 'Stylish Apartment with Modern Bunks – Ideal for Students' },
    { id: 2, image: 'images/listingimage2.jpg', description: 'Elegant, Spacious Apartment with a Serene View' },
    { id: 3, image: 'images/listingimage3.jpg', description: 'Premium Hostel Housing in Prime University Area' },
    { id: 4, image: 'images/listingimage4.jpg', description: 'Safe and Affordable Hostel Accommodation for Undergraduates' },
  ];

  return (
    <section ref={ref} className="services" style={{ maxWidth: '850px', margin: '80px auto', textAlign: 'center' }}>
      <h2 style={{
        color: '#2e7dc0',
        fontSize: '2.5rem',
        marginBottom: '30px',
        fontWeight: '600'
      }}>
        Featured Listings
      </h2>

      <Slider {...settings}>
        {listings.map(listing => (
          <div key={listing.id} className="listing-item" style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
          }}>
            <img
              src={listing.image}
              alt={listing.description}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              padding: '15px 20px',
              fontSize: '1.1rem',
              fontWeight: '500',
              textAlign: 'left'
            }}>
              {listing.description}
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
});

export default FeaturedListings;
