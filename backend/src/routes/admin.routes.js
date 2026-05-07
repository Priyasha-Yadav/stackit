const express = require('express');
const adminController = require('../controllers/admin.controller.js');
const auth = require('../middlewares/auth.middleware.js');
const isAdmin = require('../middlewares/admin.middleware.js');
const router = express.Router();

router.get('/users', auth, isAdmin, adminController.getAllUsers);
router.get('/stats', auth, isAdmin, adminController.getStatistics);
router.get('/flagged', auth, isAdmin, adminController.getFlaggedContent);
router.patch('/users/:id/block', auth, isAdmin, adminController.blockUser);
router.patch('/users/:id/unblock', auth, isAdmin, adminController.unblockUser);
router.delete('/content/:id', auth, isAdmin, adminController.deleteContent);


module.exports = router;