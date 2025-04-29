const db = require('../db');

// Get all reviews
exports.getAllReviews = (req, res) => {
  const query = `
    SELECT 
      r.review_id, r.rating, r.date_of_rating, r.reviewer_name, r.review_text,
      m.movie_id, m.title AS movie_title
    FROM Review r
    JOIN Movie m ON r.movie_id = m.movie_id
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
};

// Get reviews for a specific movie
exports.getMovieReviews = (req, res) => {
  const movieId = req.params.movieId;
  const query = `
  SELECT 
    r.review_id, r.rating, r.date_of_rating, r.reviewer_name, r.review_text,
    m.movie_id, m.title AS movie_title
  FROM Review r
  JOIN Movie m ON r.movie_id = m.movie_id
  ORDER BY r.review_id DESC
`;
  
  db.query(query, [movieId], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
};

// Create a new review
exports.createReview = (req, res) => {
  const { movie_id, rating, reviewer_name, review_text } = req.body;

  // Validate required fields
  if (!movie_id || !rating || !reviewer_name || !review_text) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate rating range (assuming 0-10 scale)
  if (rating < 0 || rating > 10) {
    return res.status(400).json({ error: 'Rating must be between 0 and 10' });
  }

  const query = `
    INSERT INTO Review (movie_id, rating, date_of_rating, reviewer_name, review_text)
    VALUES (?, ?, CURDATE(), ?, ?)
  `;
  
  db.query(query, [movie_id, rating, reviewer_name, review_text], (err, result) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
    res.status(201).json({ 
      message: 'Review created successfully',
      review_id: result.insertId 
    });
  });
};


// Update a review
exports.updateReview = (req, res) => {
  const reviewId = req.params.id;
  const { rating, reviewer_name } = req.body;

  // Validate rating if provided
  if (rating && (rating < 0 || rating > 10)) {
    return res.status(400).json({ error: 'Rating must be between 0 and 10' });
  }

  const query = 'UPDATE Review SET rating = ?, reviewer_name = ? WHERE review_id = ?';
  db.query(query, [rating, reviewer_name, reviewId], (err, result) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review updated successfully' });
  });
};

// Delete a review
exports.deleteReview = (req, res) => {
  const reviewId = req.params.id;

  const query = 'DELETE FROM Review WHERE review_id = ?';
  db.query(query, [reviewId], (err, result) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  });
}; 