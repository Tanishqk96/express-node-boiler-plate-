const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add your name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email address'],
    unique: true,
    lowercase: true,
    match: [
      /^\S+@\S+\.\S+$/,
      'Please enter a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
  },
}, {
  timestamps: true,
});
module.exports = mongoose.model('User', userSchema);