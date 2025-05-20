const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a contact name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\S+@\S+\.\S+$/,
      'Please enter a valid email address',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Contact', contactSchema);
