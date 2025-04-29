const express = require('express');
const router = express.Router();
const { 
  getAllReviews,
  getMovieReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

// GET routes
router.get('/', getAllReviews);
router.get('/movie/:movieId', getMovieReviews);

// POST route for creating reviews
router.post('/', createReview);

// PUT route for updating reviews
router.put('/:id', updateReview);

// DELETE route for deleting reviews
router.delete('/:id', deleteReview);

module.exports = router; 