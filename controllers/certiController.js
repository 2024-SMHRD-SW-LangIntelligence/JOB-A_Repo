const certiService = require('../services/certiService');

// 자격증 추가 함수
async function add(req, res) {
    const { certi_name,certified_at,certi_num,certi_org } = req.body;
    const user = req.session.user;
    try {
        // 자격증 정보를 데이터베이스에 추가
        await certiService.addCerti(user, certi_name,certified_at,certi_num,certi_org);
        res.redirect('/tables');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// 사용자의 자격증 목록 조회 함수
async function select_certi(req, res) {
    const user = req.session.user;
    try {
        // 사용자의 자격증 정보를 데이터베이스에서 조회
        const certificates = await certiService.certiSelect(user);
        res.json(certificates);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// 자격증 일정 조회 함수
async function schedule(req, res) {
    const user = req.session.user;
    try {
        // 사용자의 자격증 일정 정보를 데이터베이스에서 조회
        const scheduleC = await certiService.scheduleCheck(user);
        res.json(scheduleC);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// 자격증 옵션 조회 함수
async function option_certi(req,res) {
    const user = req.session.user;
    try {
        // 사용자의 자격증 옵션 정보를 데이터베이스에서 조회
        const option_list = await certiService.option_check(user);
        res.json(option_list);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// 자격증 발급 기관 목록 조회 함수
async function org_certi(req,res) {
    try {
        // 자격증 발급 기관 목록을 데이터베이스에서 조회
        const org_list = await certiService.certiOrg();
        res.json(org_list);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    add,
    select_certi,
    schedule,
    option_certi,
    org_certi
};