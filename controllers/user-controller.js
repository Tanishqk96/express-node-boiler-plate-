const asyncHandler = require('express-async-handler');
const User = require('../config/user-schema');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const JWT_SECRET = '999hashed-password999';
// @desc    Get all users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(404).json({ message: 'No users found' });
  }
  else{
    return res.json(users); 
  }
});

// @desc    Get single user by ID
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  else{
    return res.json(user); 
  }
  res.status(200).json({ message: `Get user with ID: ${req.params.id}` });
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
   console.log(req.body);
  // Check for required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Check if user already exists
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    try {
      const user = await User.create({
        name,
        email,
        password: hash
      });

      res.status(201).json({
        message: 'User created successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          password:hash
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  });
});

// @desc    Update user by ID
const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update user with ID: ${req.params.id}` });
});

// @desc    Delete user by ID
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.json("User deleted successfully:",user);
  res.status(200).json({ message: `Delete user with ID: ${req.params.id}` });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.status(200).json({
    message: 'User logged in successfully',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};
