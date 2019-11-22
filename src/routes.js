const express = require('express')
const router = express.Router();

const UserController = require('./app/controllers/UserController');

router.post('/register', UserController.store);

module.exports = router;