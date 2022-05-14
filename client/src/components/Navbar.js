import { Link } from '@chakra-ui/react';
import React, { useState } from 'react';
import { HiOutlineMusicNote } from 'react-icons/fa';

function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    return (
        <>
        <nav className="navbar">
            
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    {/* put image link in to="/" */}
                    {/* <i> <HiOutlineMusicNote /> */}
                    {/* </i> */}
                    <h1> Bach 2 Rock </h1>
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                </ul>
            </div>
        
        </nav>
        </>
    )
}

export default Navbar;