const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/user-controller');

const router = express.Router();

/*
  GET    /api/users           → Get all users
  GET    /api/users/:id       → Get user by ID
  POST   /api/users           → Create new user
  PUT    /api/users/:id       → Update user by ID
  DELETE /api/users/:id       → Delete user by ID
*/

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);
module.exports = router;
