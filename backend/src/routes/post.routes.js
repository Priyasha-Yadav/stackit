const express = require('express');
const postController = require('../controllers/post.controller.js');
const auth = require('../middlewares/auth.middleware.js');
const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.post('/', auth, postController.createPost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;