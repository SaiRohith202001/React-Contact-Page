// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome to TOLET Globe</h1>
            <p>Your one-stop solution for finding rental properties.</p>
            
            {/* Add a button to navigate to the contact page */}
            <Link to="/contact">
                <button style={buttonStyle}>Contact Us</button>
            </Link>
        </div>
    );
};

// Styling for the button
const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#00ffc3',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
};

export default HomePage;
