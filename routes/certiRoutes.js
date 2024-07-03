const express = require('express');
const router = express.Router();
const certiController = require('../controllers/certiController');

router.post('/add', certiController.add);
router.post('/Certi_check', certiController.Certi_check);   // 자격증 추가
router.post('/select_certi', certiController.select_certi); // mem_id 넣기

module.exports = router;