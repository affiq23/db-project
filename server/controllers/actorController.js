const db = require('../db'); // import MYSQL connection

// run SELECT query on Actor and send result as JSON, otherwise error
exports.getAllActors = (req, res) => {
  db.query('SELECT * FROM Actor', (err, results) => { 
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
};
