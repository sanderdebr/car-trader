import React from 'react';
import './nav.scss';

const Nav = () => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p className='f3 link dim underline pa3 pointer'>Uitloggen</p>
        </nav>
    );
}

export default Nav;