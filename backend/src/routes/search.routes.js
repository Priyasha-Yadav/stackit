const express = require('express');
const searchController = require('../controllers/search.controller.js');

const router = express.Router();

router.get('/search', searchController.search);

module.exports = router;