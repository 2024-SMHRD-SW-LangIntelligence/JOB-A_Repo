const scheduleService = require('../services/scheduleService');

// 스케쥴 DB 저장
async function add(req, res) {
    const { mem_id, msche_title, msche_st_dt, msche_ed_dt,msche_color } = req.body;
    try {
        const schedule = await scheduleService.addSchedule(mem_id,msche_title, msche_st_dt, msche_ed_dt,msche_color);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
}
// 선택 스케쥴  DB에서 삭제
async function remove(req, res) {
    const { mem_id,msche_title, msche_st_dt, msche_ed_dt } = req.body;
    try {
        const deletedData = await scheduleService.deleteSchedule(mem_id, msche_title, msche_st_dt, msche_ed_dt);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
}
// 로그인한 회원의 스케쥴 보여주기
async function mschedule(req,res){
    try{
        const mem_id = req.session.user.mem_id;
        const events =  await scheduleService.memberSchedule(mem_id);
        res.json(events);
    } catch (error) {
        res.status(500).send(error.message);
        console.log('실패..');
    }
}
module.exports = {add,remove,mschedule};