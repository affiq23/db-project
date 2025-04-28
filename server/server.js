// initialize Express server
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // enable CORS so frontend on different port can access (for loading HTML files)
const app = express();
const path  = require('path')
const actorRoutes = require('./routes/actors');
const movieRoutes = require('./routes/movies');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// display frontend pages statically
app.use(express.static(path.join(__dirname, '../frontend')));

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Routes
// Remove direct /movies and /actors routes since controllers handle them

// API endpoints
app.use('/actors', actorRoutes);
app.use('/movies', movieRoutes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
