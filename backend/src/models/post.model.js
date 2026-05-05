const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 200
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    tags: {
        type: [String],
        default: [],
        validate: {
            validator: (tags) => tags.length <= 5,
            message: 'Maximum 5 tags are allowed'
        }
    },
    images: {
        type: [String],
        default: [],
        validate: {
            validator: (images) => images.length <= 3,
            message: 'Maximum 3 images are allowed'
        }
    },
    is_flagged: {
        type: Boolean,
        default: false
    },
    flag_reason: {
        type: String,
        default: null

    },
    view_count: {
        type: Number,
        default: 0

    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);