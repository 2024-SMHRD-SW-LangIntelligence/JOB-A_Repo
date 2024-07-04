const express = require('express');
const router = express.Router();
const certiController = require('../controllers/certiController');

router.post('/add', certiController.add);
router.get('/select_certi', certiController.select_certi);

module.exports = router;