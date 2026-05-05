const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        maxlength: 100,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
        match: ['/^\S+@\S+\.\S+$/', 'Please provide a valid email']
    },
    password_hash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    profile_picture: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active'
    },
    abuse_count: {
        type: Number,
        default: 0
    }


}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);