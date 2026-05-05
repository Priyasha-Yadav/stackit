const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        enum: ['reply', 'warning', 'blocked', 'unblocked'],
        required: true
    },

    is_read: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema)
