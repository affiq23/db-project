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
