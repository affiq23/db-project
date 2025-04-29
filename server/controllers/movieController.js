const db = require('../db');

exports.getAllMovies = (req, res) => {
  const query = `
    SELECT 
      m.movie_id, m.title, m.genre, m.release_date, 
      d.director_id, d.first_name AS director_first_name, d.last_name AS director_last_name
    FROM Movie m
    JOIN Director d ON m.director_id = d.director_id
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
};

// Vulnerable search for SQL injection demo
// Used prepared statement technique to prevent SQL injection from part a)
exports.searchMovies = (req, res) => {
  const searchTerm = req.query.q;
  const query = "SELECT * FROM Movie WHERE title LIKE ?";
  db.query(query, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
    res.json(results);
  });
};

// Part B update 
exports.updateMovie = (req, res) => {
  const movieId = req.query.id;
  const newTitle = req.query.title;

  console.log('Update Request Received:', movieId, newTitle);

  const query = `UPDATE movie SET title = '${newTitle}' WHERE id = ${movieId}`;

  console.log('Executing Change', query);

  db.query(query, (err, results) => {
    if (err) {
      console.error('Query Error:', err);
      return res.status(500).json({ error: 'Server Error', details: err.message });
    }
    res.json({ success: true, message: 'Movie updated!' });
  });
};

