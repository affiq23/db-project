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

exports.searchMovies = (req, res) => {
  console.log('Search request received:', req.query); // Debug log
  const searchTerm = req.query.q;
  
  if (!searchTerm) {
    console.log('No search term provided'); // Debug log
    return res.status(400).json({ error: 'Search term is required' });
  }

  // Secure search query using prepared statements
  const query = `
    SELECT 
      m.movie_id, m.title, m.genre, m.release_date, 
      d.director_id, d.first_name AS director_first_name, d.last_name AS director_last_name
    FROM Movie m
    JOIN Director d ON m.director_id = d.director_id
    WHERE m.title LIKE ? OR m.genre LIKE ?
  `;
  
  const searchPattern = `%${searchTerm}%`;
  console.log('Executing search query with pattern:', searchPattern); // Debug log
  
  db.query(query, [searchPattern, searchPattern], (err, results) => {
    if (err) {
      console.error('Search query error:', err); // Debug log
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
    console.log('Search results:', results); // Debug log
    res.json(results);
  });
};
