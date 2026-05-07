const express = require('express');
const replyController = require('../controllers/reply.controller.js')
const auth = require('../middlewares/auth.middleware.js');
const router = express.Router();

router.get('/posts/:id/replies', replyController.getAllReplies)
router.post('/posts/:id/replies', auth, replyController.addReply)
router.delete('/replies/:id', auth, replyController.deleteReply)

module.exports = router;

