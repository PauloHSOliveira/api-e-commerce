const express = require('express')
const router = express.Router();

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/Sessioncontroller');

const authMiddleware = require('./app/middlewares/auth');

router.post('/register', UserController.store);

router.post('/login', SessionController.store);

router.use(authMiddleware);

module.exports = router;