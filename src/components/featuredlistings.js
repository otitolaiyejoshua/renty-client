import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faLocationDot, faBed } from '@fortawesome/free-solid-svg-icons';

const FeaturedListings = React.forwardRef((props, ref) => {
  const settings = { dots: true, infinite: true, speed: 650, slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 4200, arrows: true, adaptiveHeight: false };
  const listings = [
    { id: 1, image: 'images/listingimage1.jpg', title: 'Comfortable student apartment', location: 'Near campus', detail: 'A practical space designed for student living.' },
    { id: 2, image: 'images/listingimage2.jpg', title: 'Modern apartment with a calm view', location: 'University area', detail: 'Bright interiors and a comfortable everyday layout.' },
    { id: 3, image: 'images/listingimage3.jpg', title: 'Premium hostel accommodation', location: 'Prime student district', detail: 'A convenient option close to the university environment.' },
    { id: 4, image: 'images/listingimage4.jpg', title: 'Affordable student housing', location: 'Campus neighbourhood', detail: 'Simple, accessible accommodation for undergraduates.' },
  ];

  return (
    <section ref={ref} className="featured-listings" id="featured-listings">
      <div className="section-container">
        <div className="section-heading-row">
          <div className="section-title">
            <span className="section-eyebrow">Explore homes</span>
            <h2>Featured listings</h2>
            <p>A preview of the kind of student-friendly spaces you can discover on Renty.</p>
          </div>
          <Link to="/search" className="text-link">Explore all <FontAwesomeIcon icon={faArrowRight} /></Link>
        </div>

        <div className="listing-slider-wrap">
          <Slider {...settings}>
            {listings.map((listing) => (
              <div key={listing.id} className="listing-slide">
                <article className="listing-card">
                  <div className="listing-image-wrap">
                    <img src={listing.image} alt={listing.title} />
                    <span className="listing-tag">Student housing</span>
                  </div>
                  <div className="listing-content">
                    <div className="listing-location"><FontAwesomeIcon icon={faLocationDot} /> {listing.location}</div>
                    <h3>{listing.title}</h3>
                    <p>{listing.detail}</p>
                    <div className="listing-meta"><span><FontAwesomeIcon icon={faBed} /> Student-friendly</span><Link to="/search">View homes <FontAwesomeIcon icon={faArrowRight} /></Link></div>
                  </div>
                </article>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
});

export default FeaturedListings;
