const User = require('../models/user.model');
const Post = require('../models/post.model');
const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler')

const getAllUsers = asyncHandler(async (req, res) => { })
const getStatistics = asyncHandler(async (req, res) => { })
const getFlaggedContent = asyncHandler(async (req, res) => { })
const blockUser = asyncHandler(async (req, res) => { })
const unblockUser = asyncHandler(async (req, res) => { })
const deleteContent = asyncHandler(async (req, res) => { })

const adminController = { getAllUsers, getStatistics, getFlaggedContent, blockUser, unblockUser, deleteContent };
module.exports = adminController;