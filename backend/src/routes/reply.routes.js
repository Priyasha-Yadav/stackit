const express = require('express');
const replyController = require('../controllers/reply.controller.js')
const router = express.Router();

router.get('/posts/:id/replies', replyController.getAllReplies)
router.post('/posts/:id/replies', replyController.addReply)
router.delete('/replies/:id', replyController.deleteReply)

module.exports = router;

