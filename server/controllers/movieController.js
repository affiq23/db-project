const db = require('../db');

exports.getAllMovies = (req, res) => {
  db.query('SELECT * FROM Movie', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
};
