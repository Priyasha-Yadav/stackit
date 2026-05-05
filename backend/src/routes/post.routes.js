const express = require('express');
const postController = require('../controllers/post.controller.js');

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.delete('/:id', postController.deletePost);

module.exports = router;