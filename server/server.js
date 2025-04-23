// initialize Express server
const express = require('express');
const cors = require('cors'); // enable CORS so frontend on different port can access (for loading HTML files)
const app = express();
const path  = require('path')
const actorRoutes = require('./routes/actors');
const movieRoutes = require('./routes/movies');

app.use(cors());
app.use(express.json());

// display frontend pages statically
app.use(express.static(path.join(__dirname, '../frontend')));

// API endpoints
app.use('/actors', actorRoutes);
app.use('/movies', movieRoutes)


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
