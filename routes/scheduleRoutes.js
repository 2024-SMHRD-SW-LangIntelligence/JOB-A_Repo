// 각 라우팅 설정
const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.post('/add', scheduleController.add);
router.post('/remove',scheduleController.remove);
router.get('/mschedule',scheduleController.mschedule);
module.exports = router;