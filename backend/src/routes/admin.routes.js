const express = require('express');
const adminController = require('../controllers/admin.controller.js');

const router = express.Router();

router.get('/users', adminController.getAllUsers);
router.get('/stats', adminController.getStatistics);
router.get('/flagged', adminController.getFlaggedContent);
router.patch('/users/:id/block', adminController.blockUser);
router.patch('/users/:id/unblock', adminController.unblockUser);
router.delete('/content/:id', adminController.deleteContent);


module.exports = router;