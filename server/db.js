// imports mysql2 and sets up connection
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'affiq',
  password: 'abcd1234',
  database: 'movies'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// export connection to be used in controllers
module.exports = db;
