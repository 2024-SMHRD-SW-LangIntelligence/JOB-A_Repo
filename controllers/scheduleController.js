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

async function find(req, res) {
    try {
        const mem_id = req.session.user.mem_id;
        const msche_title = req.query.msche_title || ''; // 검색어는 쿼리 파라미터에서 가져옵니다.

        // scheduleService를 통해 데이터 조회
        const events = await scheduleService.searchSchedule(mem_id, msche_title);
        if (!events || events.length === 0) {
            // 검색 결과가 없는 경우
            res.json({ message: '검색 결과가 없습니다.', events: [] });
          } else {
            // 검색 결과가 있는 경우
            req.session.searchResults = events;
            res.json({ message: null, events: events});
          }
    } catch (error) {
        console.error('실패..', error);
        res.status(500).send('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
}

async function complete(req, res) {
    const { mem_id,msche_title, msche_st_dt, msche_ed_dt } = req.body;
    try {
        const completeData = await scheduleService.completeSchedule(mem_id, msche_title, msche_st_dt, msche_ed_dt);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getToday(req, res) {
    try {
        const mem_id = req.session.user.mem_id;
        const events = await scheduleService.getTodaySchedule(mem_id);
        if (!events || events.length === 0) {
            // 오늘 일정이 없는 경우
            res.json({ message: '오늘 일정이 없습니다.', events: [] });
          } else {
            // 오늘 일정이 있는 경우
            res.json({ message: null, events: events});
          }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}


async function checkClosestEvent(req, res) {
    try {
        const mem_id = req.session.user.mem_id;
        const closestEvents = await scheduleService.getClosestEvents(mem_id);

        const today = new Date(scheduleService.getToday());
        const filteredEvents = closestEvents.map(event => {
            const eventDate = new Date(event.msche_st_dt);
            const dateDifference = Math.floor((eventDate - today) / (1000 * 60 * 60 * 24));
            return {
                ...event,
                dateDifference
            };
        }).filter(event => event.dateDifference >= 0 && event.dateDifference <= 7);

        if (filteredEvents.length > 0) {
            return res.status(200).json({
                events: filteredEvents.map(event => ({
                    title: event.msche_title,
                    startDate: event.msche_st_dt,
                    endDate: event.msche_ed_dt,
                    daysLeft: event.dateDifference
                }))
            });
        } else {
            return res.status(204).send(); // No Content
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `에러 발생: ${error.message}`
        });
    }
}


module.exports = {add,remove,mschedule,find,complete,getToday,checkClosestEvent};