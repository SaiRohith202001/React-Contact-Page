// src/components/Header.js
import React from 'react';

const Header = () => {
    return (
        <header>
            <div className="logo">Tolet Globe</div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/about">About Us</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
