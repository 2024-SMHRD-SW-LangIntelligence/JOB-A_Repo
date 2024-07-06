// 각 라우팅 설정
const express = require('express');
const router = express.Router();
const studyController = require('../controllers/studyGruopController');

router.post('/create', studyController.createRoom);
router.get('/list', studyController.getChatRooms);
router.get('/messages/:groupIdx', studyController.chatController.getChatMessages);
router.post('/message', studyController.chatController.saveChatMessage);

module.exports = router;