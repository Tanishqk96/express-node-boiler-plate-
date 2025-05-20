const express = require('express');
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/Contact-controller');

const router = express.Router();

router.get('/', getContacts);
router.get('/:id', getContactById);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;