import React from 'react';
import Tilt from 'react-tilt'
import brain from './thinking.png';
import './logo.scss';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: '5px' }} alt='logo' src={brain}></img>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;