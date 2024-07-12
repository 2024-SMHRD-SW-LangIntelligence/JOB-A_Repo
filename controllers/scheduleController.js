const scheduleService = require('../services/scheduleService');

// 새로운 스케줄을 DB에 추가하는 함수
async function add(req, res) {
    const { mem_id, msche_title, msche_st_dt, msche_ed_dt, msche_color } = req.body;
    try {
        // 스케줄 정보를 데이터베이스에 추가
        const schedule = await scheduleService.addSchedule(mem_id, msche_title, msche_st_dt, msche_ed_dt, msche_color);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// 선택한 스케줄을 DB에서 삭제하는 함수
async function remove(req, res) {
    const { mem_id, msche_title, msche_st_dt, msche_ed_dt } = req.body;
    try {
        // 해당 스케줄을 데이터베이스에서 삭제
        const deletedData = await scheduleService.deleteSchedule(mem_id, msche_title, msche_st_dt, msche_ed_dt);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// 로그인한 회원의 모든 스케줄을 조회하는 함수
async function mschedule(req, res) {
    try {
        const mem_id = req.session.user.mem_id;
        // 회원의 모든 스케줄을 데이터베이스에서 조회
        const events = await scheduleService.memberSchedule(mem_id);
        res.json(events);
    } catch (error) {
        res.status(500).send(error.message);
        console.log('실패..');
    }
}

// 특정 제목의 스케줄을 검색하는 함수
async function find(req, res) {
    try {
        const mem_id = req.session.user.mem_id;
        const msche_title = req.query.msche_title || '';
        // 해당 제목의 스케줄을 데이터베이스에서 검색
        const events = await scheduleService.searchSchedule(mem_id, msche_title);
        if (!events || events.length === 0) {
            res.json({ message: '검색 결과가 없습니다.', events: [] });
        } else {
            req.session.searchResults = events;
            res.json({ message: null, events: events });
        }
    } catch (error) {
        console.error('실패..', error);
        res.status(500).send('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
}

// 스케줄을 완료 상태로 변경하는 함수
async function complete(req, res) {
    const { mem_id, msche_title, msche_st_dt, msche_ed_dt } = req.body;
    try {
        // 해당 스케줄의 상태를 완료로 변경
        const completeData = await scheduleService.completeSchedule(mem_id, msche_title, msche_st_dt, msche_ed_dt);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// 오늘의 스케줄을 조회하는 함수
async function getToday(req, res) {
    try {
        const mem_id = req.session.user.mem_id;
        // 오늘 날짜의 스케줄을 데이터베이스에서 조회
        const events = await scheduleService.getTodaySchedule(mem_id);
        if (!events || events.length === 0) {
            res.json({ message: '오늘 일정이 없습니다.', events: [] });
        } else {
            res.json({ message: null, events: events });
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

// 가장 가까운 스케줄을 확인하는 함수
async function checkClosestEvent(req, res) {
    try {
        const mem_id = req.session.user.mem_id;
        // 가장 가까운 스케줄을 데이터베이스에서 조회
        const closestEvents = await scheduleService.getClosestEvents(mem_id);

        const today = new Date(scheduleService.getToday());
        // 7일 이내의 스케줄만 필터링
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

module.exports = { add, remove, mschedule, find, complete, getToday, checkClosestEvent };