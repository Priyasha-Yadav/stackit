const bcrypt = require('bcryptjs')
const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');

const register = asyncHandler(async (req, res) => {
    let { full_name, username, email, password } = req.body;

    if (!full_name || !username || !email || !password) {
        const err = new Error('All fields are required');
        err.status = 400;
        throw err;
    }

    email = email.trim().toLowerCase();
    username = username.trim().toLowerCase();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        const err = new Error('Password must be at least 8 characters, include one uppercase letter and one number');
        err.status = 400;
        throw err;
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        const err = new Error(
            existingUser.email === email
                ? 'Email already in use'
                : 'Username already in use'
        );
        err.status = 409;
        throw err;
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        full_name,
        username,
        email,
        password_hash
    });

    const token = jwt.sign(
        {
            id: newUser._id,
            role: newUser.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    );

    return res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
            id: newUser._id,
            full_name: newUser.full_name,
            username: newUser.username,
            email: newUser.email
        }
    });
});


const login = asyncHandler(async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        const err = new Error('All fields are required');
        err.status = 400;
        throw err;
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
        const err = new Error('Invalid email or password');
        err.status = 401;
        throw err;
    }

    if (user.status === 'blocked') {
        const err = new Error('Account is blocked');
        err.status = 403;
        throw err;
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!isMatch) {
        const err = new Error('Invalid email or password');
        err.status = 401;
        throw err;
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    );

    return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
            id: user._id,
            full_name: user.full_name,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
});

const logout = asyncHandler((req, res) => {
    return res.status(200).json({
        message: 'Logged out successfully'
    });
});

const authController = { register, login, logout };
module.exports = authController;