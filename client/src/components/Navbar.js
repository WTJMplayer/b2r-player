import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import SongDrawer from './SongDrawer';
import DashboardDrawer from './DashboardDrawer';
import MakePlaylistForm from './forms/MakePlaylistForm';
import { FiMusic } from 'react-icons/fi'


function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);


  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            WJTM
            <FiMusic />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/dashboard' className='nav-links' onClick={closeMobileMenu}>
                Dashboard
              </Link>
            </li>

            <li className='nav-links'>
              <DashboardDrawer />
            </li>
            
            <li className='nav-links'>
              <SongDrawer />
            </li>

            <li className='nav-links'>
              <MakePlaylistForm />
            </li>

          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
