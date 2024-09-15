// backend/models/ContactForm.js

const mongoose = require('mongoose');

const ContactFormSchema = new mongoose.Schema({
   topic: {
      type: String,
      required: true
   },
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   message: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   }
});

const ContactForm = mongoose.model('ContactForm', ContactFormSchema);

module.exports = ContactForm;
