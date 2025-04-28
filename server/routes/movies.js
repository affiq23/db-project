const express = require('express');
const router = express.Router();
const { getAllMovies, searchMovies } = require('../controllers/movieController');
router.get('/', getAllMovies);
router.get('/search', searchMovies);
module.exports = router;