const User = require('../models/user.model');
const Post = require('../models/post.model');

const getAllUsers = (req, res) => { }
const getStatistics = (req, res) => { }
const getFlaggedContent = (req, res) => { }
const blockUser = (req, res) => { }
const unblockUser = (req, res) => { }
const deleteContent = (req, res) => { }

const adminController = { getAllUsers, getStatistics, getFlaggedContent, blockUser, unblockUser, deleteContent };
module.exports = adminController;