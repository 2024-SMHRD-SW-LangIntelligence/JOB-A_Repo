// 각 라우팅 설정
const express = require('express');
const router = express.Router();
const studyController = require('../controllers/studyGruopController');

router.post('/create', studyController.createRoom);
router.get('/list', studyController.getChatRooms);


module.exports = router;