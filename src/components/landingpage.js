import React, { useState } from 'react';
import { Home, Menu, Close } from '@material-ui/icons';

function LandingPage({ openLoginPopup, openSignupPopup, handleScroll }) {
  const [open, setOpen] = useState(false);

  function toggleNav() {
    setOpen(!open);
  }

  return (
    <>
      <div className="header">
        <img className="logo" alt="logo" src="images/logos.jpg" />
        <span className="nav-opener" onClick={toggleNav}>
          {open ? <Close /> : <Menu />}
        </span>
        <ul className={`nav-items ${open ? 'open' : ''}`}>
          <li>
            <span className="links" onClick={() => handleScroll('main')}>
              Home
            </span>
          </li>
          <li>
            <span className="links" onClick={() => handleScroll('about-us')}>
              About us
            </span>
          </li>
          <li>
            <span className="links" onClick={() => handleScroll('services')}>
              Services
            </span>
          </li>
          <li>
            <span className="links" onClick={() => handleScroll('forum')}>
              Forum
            </span>
          </li>
          <li>
            <button className="stylebtn" onClick={() => openLoginPopup(true)}>
              Login
            </button>
          </li>
          <li>
            <button className="stylebtn" onClick={() => openSignupPopup(false)}>
              SignUp
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default LandingPage;
