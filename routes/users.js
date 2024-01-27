const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UserController')

router.get('/', usersController.getAllUsers)
router.get('/:id', usersController.getDetailUser)
router.put('/:id', usersController.updateUser);

module.exports = router;