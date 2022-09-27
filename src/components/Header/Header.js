import React from 'react';
import Logo from '../../images/Logo.svg';
import './Header.css';


const Header = () => {
    return (
        <div className='header'>
            <img src={Logo} alt="" />
            <div>
                <a href="/Shop">Shop</a>
                <a href="/Order">Order</a>
                <a href="/Inventory">Inventory</a>
                <a href="/About">About</a>
            </div>
        </div>
    );
};

export default Header;