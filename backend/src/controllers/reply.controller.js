const Reply = require('../models/reply.model');
const Post = require('../models/post.model');

const mongoose = require('mongoose');

const asyncHandler = require('../utils/asyncHandler');


const getAllReplies = asyncHandler(async (req, res) => {

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

    const replies = await Reply.find({ post_id: id })
        .populate('user_id', 'username profile_picture')
        .sort({ createdAt: -1 });

    return res.status(200).json({
        message: 'Replies fetched successfully',
        replies
    });
});


const addReply = asyncHandler(async (req, res) => {

    const { content, images = [] } = req.body;

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

    if (!content || !content.trim()) {
        const err = new Error('Reply content is required');
        err.status = 400;
        throw err;
    }

    if (!Array.isArray(images) || images.length > 3) {
        const err = new Error('Maximum 3 images allowed');
        err.status = 400;
        throw err;
    }

    const reply = await Reply.create({
        user_id: req.user.id,
        post_id: id,
        content: content.trim(),
        images
    });

    return res.status(201).json({
        message: 'Reply added successfully',
        reply
    });
});


const deleteReply = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Invalid reply id');
        err.status = 400;
        throw err;
    }

    const reply = await Reply.findById(id);

    if (!reply) {
        const err = new Error('Reply not found');
        err.status = 404;
        throw err;
    }

    if (
        req.user.role !== 'admin' &&
        req.user.id !== reply.user_id.toString()
    ) {
        const err = new Error(
            'Only the author or admin can delete this reply'
        );

        err.status = 403;

        throw err;
    }

    await Reply.deleteOne({ _id: id });

    return res.status(200).json({
        message: 'Reply deleted successfully'
    });
});


const replyController = {
    getAllReplies,
    addReply,
    deleteReply
};

module.exports = replyController;