import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import SongDrawer from './SongDrawer';
import DashboardDrawer from './DashboardDrawer';
import MakePlaylistForm from './forms/MakePlaylistForm';
import { FiMusic } from 'react-icons/fi'
import { Button } from '@chakra-ui/react';
import Auth from './utils/auth'

function Navbar( {safeMode, setSafeMode} ) {

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    if (safeMode) {
      return
    } else {
      alert('Safe Mode is disabled. Explicit audio may be played.')
    }
  }, [safeMode])

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  function showNav() {
    if (Auth.loggedIn()) {
      return (
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
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

        <li className='nav-links' onClick={logout}>
          Sign Out
        </li> 
        </ul>
      );
    } else {
      return (
        <li className='nav-item'>
        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
          Home
        </Link>
      </li>
      )
    }

  }

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            BACH
            <FiMusic />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {showNav()}
          </ul>
        </div>
      </nav>

      {safeMode ? (
        <Button
          onClick={() => setSafeMode(!safeMode)}
          style={{backgroundColor: 'green', color: 'black'}}
        > Safe Mode On
        </Button>
        ) : (
        <Button
          onClick={() => setSafeMode(!safeMode)}
          style={{backgroundColor: 'red', color: 'white'}}
        > Safe Mode Off
        </Button>
      )}
    </>
  );
}

export default Navbar;
