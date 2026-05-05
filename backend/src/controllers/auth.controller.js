const bcrypt = require('bcryptjs')
const User = require('../models/user.model');

const register = async (req, res) => {
    const { full_name, username, email, password } = req.body;
    const user = await User.findOne({email});
    if (user) return res.status(409).json({ message: 'User with this email already exist' });
    const password_hash = await bcrypt.hash(password, 10);
    const newUser = {full_name, username, email, password_hash};
    await User.save(newUser);
    return res.status(201).json({message: 'User created successfully'});

}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(404).json({ message: 'User not found' });

}

const logout = (req, res) => {

}

const authController = { register, login, logout };
module.exports = authController;