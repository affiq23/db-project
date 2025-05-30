const express = require('express');
const router = express.Router();
const { getAllMovies, searchMovies, updateMovie } = require('../controllers/movieController');
router.get('/', getAllMovies);
router.get('/search', searchMovies);
router.get('/movies/update', updateMovie);
module.exports = router;
