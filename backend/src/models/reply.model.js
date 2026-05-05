const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },

    content: {
        type: String,
        trim: true
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
    }
}, { timestamps: true })

module.exports = mongoose.model('Reply', replySchema);
