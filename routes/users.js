const express = require('express');

const usersController = require('../controllers/users');

const storage = require('../helpers/storage');

const router = express.Router();


// AUTHENTHICATION
router.get('/', usersController.getUsers)
router.get('/:id', usersController.getUsersId)
router.post('/', storage, usersController.addUser);

module.exports = router;