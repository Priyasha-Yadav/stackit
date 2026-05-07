const express = require('express');
const notificationController = require('../controllers/notification.controller.js')
const auth = require('../middlewares/auth.middleware.js');
const router = express.Router();

router.get('/', auth, notificationController.getAllNotifications);
router.patch('/:id/read', auth, notificationController.markNotificationAsRead);
router.patch('/read-all', auth, notificationController.markAllNotificationsAsRead);

module.exports = router;