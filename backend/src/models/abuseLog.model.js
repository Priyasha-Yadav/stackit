const mongoose = require('mongoose');

const abuseLogSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content_type: {
        type: String,
        enum: ['post', 'reply'],
        required: true
    },

    ai_reason: {
        type: String,
        required: true,
        trim: true
    }
    ,
    ai_confidence: {
        type: Number,
        min: 0,
        max:1,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AbuseLog', abuseLogSchema)

