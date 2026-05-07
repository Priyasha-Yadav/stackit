const Post = require('../models/post.model');
const asyncHandler = require('../utils/asyncHandler')

const search = asyncHandler(async (req, res) => { 
    const { q } = req.query;
    if (!q || !q.trim()) {
        const err = new Error('Search query is required');
        err.status = 400;
        throw err;
    }
    
});

searchController = { search };
module.exports = searchController