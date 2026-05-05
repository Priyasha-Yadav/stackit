const express = require('express');
const notificationController = require('../controllers/notification.controller.js')
const router = express.Router();

router.get('/', notificationController.getAllNotifications)
router.patch('/:id/read', notificationController.markRead)

module.exports = router;