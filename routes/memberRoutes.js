// 각 라우팅 설정
const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.post('/register', memberController.register);
router.post('/login', memberController.login);
router.post('/checkid', memberController.checkId);
router.get('/logout', memberController.logout);

module.exports = router;