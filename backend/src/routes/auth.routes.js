const express = require('express');
const auth = require('../middlewares/auth.middleware.js');
const authController = require('../controllers/auth.controller.js');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', auth, authController.logout);

module.exports = router;