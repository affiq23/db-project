const db = require('../db'); // import MYSQL connection

// run SELECT query on Actor and send result as JSON, otherwise error
exports.getAllActors = (req, res) => {
  const { nationality, sort } = req.query;
  // console.log('Received filters:', req.query); // Debug log
  let query = `SELECT a.*, COUNT(ma.movie_id) AS movie_count
               FROM Actor a
               LEFT JOIN Movie_Actor ma ON a.actor_id = ma.actor_id
               LEFT JOIN Movie m ON ma.movie_id = m.movie_id`;
  const params = [];

  if (nationality) {
    query += ' WHERE LOWER(a.nationality) = ?';
    params.push(nationality.toLowerCase());
  }

  query += ' GROUP BY a.actor_id';

  if (sort === 'movies') {
    query += ' ORDER BY movie_count DESC';
  } else {
    query += ' ORDER BY a.first_name ASC, a.last_name ASC';
  }

  //console.log('Executing query:', query, params); // Debug log

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
};
