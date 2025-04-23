// create Express router and connect GET /actors to getAllActors controller function where query is run
const express = require('express');
const router = express.Router();
const { getAllActors } = require('../controllers/actorController');
router.get('/', getAllActors);
module.exports = router;
