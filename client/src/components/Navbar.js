import { Link } from '@chakra-ui/react';
import React, { useState } from 'react';

function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    return (
        <>
        <nav className="navbar">
            
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    {/* put image link in to="/" */}
                    <h1>Look homepage link thing</h1>
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
            </div>
        
        </nav>
        </>
    )
}

export default Navbar;