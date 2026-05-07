const mongoose = require('mongoose');
const Post = require('../models/post.model');
const asyncHandler = require('../utils/asyncHandler');


const getPosts = asyncHandler(async (req, res) => {

    const posts = await Post.find()
        .sort({ createdAt: -1 });

    return res.status(200).json({
        message: 'Posts fetched successfully',
        posts
    });
});


const getPostById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Invalid post id');
        err.status = 400;
        throw err;
    }

    const post = await Post.findByIdAndUpdate(
        id,
        { $inc: { view_count: 1 } },
        { new: true }
    );

    if (!post) {
        const err = new Error('Post not found');
        err.status = 404;
        throw err;
    }

    return res.status(200).json({
        message: 'Post fetched successfully',
        post
    });
});



const createPost = asyncHandler(async (req, res) => {

    const { title, description, tags = [], images = [] } = req.body;

    if (!title || !description) {
        const err = new Error('Title and description are required');
        err.status = 400;
        throw err;
    }

    if (!Array.isArray(tags) || tags.length === 0) {
        const err = new Error('At least one tag is required');
        err.status = 400;
        throw err;
    }

    if (images.length > 3) {
        const err = new Error('Maximum 3 images allowed');
        err.status = 400;
        throw err;
    }

    const post = await Post.create({
        user_id: req.user.id,
        title: title.trim(),
        description: description.trim(),
        tags,
        images
    });

    return res.status(201).json({
        message: 'Post created successfully',
        post
    });
});


const deletePost = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Invalid post id');
        err.status = 400;
        throw err;
    }

    const post = await Post.findById(id);

    if (!post) {
        const err = new Error('Post not found');
        err.status = 404;
        throw err;
    }


    if (
        post.user_id.toString() !== req.user.id &&
        req.user.role !== 'admin'
    ) {
        const err = new Error(
            'Only the author or admin can delete this post'
        );
        err.status = 403;
        throw err;
    }

    await Post.deleteOne({ _id: id });

    return res.status(200).json({
        message: 'Post deleted successfully'
    });
});


const postController = {
    getPosts,
    getPostById,
    createPost,
    deletePost
};

module.exports = postController;