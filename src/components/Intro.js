import React,{ useRef,useState} from 'react'
import './Intro.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Main from './main.js'
import LandingPage from './landingpage';
import HowItWorks from './howitworks.js'
import AboutUs from './about.js'
import FeaturedListings from './featuredlistings.js';
import Forum from './forum.js';
import PopupForm from './popupform.js';
import Footer from './footer.js'
function Intro(){
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [initialIsLogin, setInitialIsLogin] = useState(true); // default to login

  const openLoginPopup = () => {
    setInitialIsLogin(true);
    setIsPopupOpen(true);
  };

  const openSignupPopup = () => {
    setInitialIsLogin(false);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const MainRef = useRef(null);
  const aboutRef = useRef(null);
  const forumRef = useRef(null);
  const ServiceRef = useRef(null);

  const handleScroll = (section) => {
    if (section === 'main') {
      MainRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'about-us') {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }else if (section === 'services') {
      ServiceRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    else if (section === 'forum') {
      forumRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return(
    <>
      <div className='App'>
      <LandingPage
        openLoginPopup={openLoginPopup}
        openSignupPopup={openSignupPopup}
        handleScroll={handleScroll}
      />
      <PopupForm
        isOpen={isPopupOpen}
        onClose={closePopup}
        initialIsLogin={initialIsLogin}
      />
        <Main ref={MainRef}/>
        <AboutUs ref={aboutRef}/>
        <HowItWorks/>
        <FeaturedListings ref={ServiceRef}/>
        <Forum ref= {forumRef}/>
        <Footer />
      </div>
    </>
  )}
export default Intro;