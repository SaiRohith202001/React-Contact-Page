// src/components/ContactForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        topic: '',
        name: '',
        email: '',
        message: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);  // To track submission state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Frontend validation function
    const validateForm = () => {
        const errors = {};
        if (!formData.topic) errors.topic = 'Please select a topic';
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.message || formData.message.length < 10) {
            errors.message = 'Message must be at least 10 characters';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error and success messages
        setErrorMessage('');
        setSuccessMessage('');

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsSubmitting(true);  // Start submission loading state

        try {
            const response = await axios.post('https://react-contact-backend.onrender.com', formData);
            setSuccessMessage(response.data.message);
            setErrorMessage('');
            setErrors({});
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.error || 'Something went wrong. Please try again.');
            } else if (error.request) {
                setErrorMessage('No response from server. Please check your network.');
            } else {
                setErrorMessage('Error submitting the form. Please try again.');
            }
        } finally {
            setIsSubmitting(false);  // End submission loading state
        }
    };

    return (
        <div className="container">
            {/* Left Section: Contact Information */}
            <div className="contact-info">
                <h2>Contact Us, We're Ready to Help!</h2>
                <p>
                    We strive to provide you with the best experience and the best platform to find your choice.
                    Post us any queries and we’ll get back to you.
                </p>

                {/* Chat Section */}
                <div className="chat">
                    <span className="chat-icon">💬</span>
                    <div>
                        <p>Chat with us!!</p>
                        <p>Our friendly team is here to help</p>
                        <a className="email" href="mailto:toletglobetech@gmail.com">toletglobetech@gmail.com</a>
                    </div>
                </div>

                {/* Call Section */}
                <div className="call">
                    <span className="call-icon">📞</span>
                    <div>
                        <p>Call us...</p>
                        <p>Mon - Fri 8 am to 10 pm</p>
                        <a className="phone" href="tel:+919876543210">+91 9876543210</a>
                    </div>
                </div>
            </div>

            {/* Right Section: Form */}
            <div className="form-section">
                <form onSubmit={handleSubmit}>
                    <h2>Submit Query</h2>

                    <label>
                        Topic:
                        <select name="topic" value={formData.topic} onChange={handleChange}>
                            <option value="">Select your query topic</option>
                            <option value="Rental">Rental Houses</option>
                            <option value="Rental Flats">Rental Flats</option>
                            <option value="Pg">PG</option>
                            <option value="Workspace">Rental Workspace</option>
                            <option value="support">Customer Support</option>
                        </select>
                        {errors.topic && <p className="error-message">{errors.topic}</p>}
                    </label>

                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </label>

                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </label>

                    <label>
                        Message:
                        <input name="message" value={formData.message} onChange={handleChange} />
                        {errors.message && <p className="error-message">{errors.message}</p>}
                    </label>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>

                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default ContactForm;
