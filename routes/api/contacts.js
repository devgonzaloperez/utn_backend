const express = require('express');
const router = express.Router();
const contactsController = require('../../controllers/contactsController');

router.route('/')
    .get(contactsController.getAllContacts)
    .post(contactsController.createNewContact)
    .put(contactsController.updateContact)
    .delete(contactsController.deleteContact)

router.route('/:id')
    .get(contactsController.getContact);

module.exports = router;