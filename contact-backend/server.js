// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Joi = require('joi');
const ContactForm = require('./models/ContactForm');

const app = express();
const connectDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://sairohith202001:Iphone2720@cluster0.fwwek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('DataBase Connected');
    } catch (error) {
        console.log(error.message);
    }
};
connectDatabase()
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(bodyParser.json());



// Joi validation schema
const contactFormSchema = Joi.object({
    topic: Joi.string().required().messages({
        'string.empty': 'Topic is required'
    }),
    name: Joi.string().min(2).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name should have at least 2 characters'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be valid'
    }),
    message: Joi.string().min(10).required().messages({
        'string.empty': 'Message is required',
        'string.min': 'Message should have at least 10 characters'
    })
});

// POST route for form submission with validation
app.post('/api/contact', async (req, res, next) => {
    const { error } = contactFormSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { topic, name, email, message } = req.body;

    try {
        const newFormSubmission = new ContactForm({
            topic,
            name,
            email,
            message
        });
        await newFormSubmission.save();
        res.status(201).json({ message: 'Form submitted successfully!' });
    } catch (err) {
        next(err);  // Forward the error to the error handling middleware
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
