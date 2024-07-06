const certiService = require('../services/certiService');



async function add(req, res) {
    const { certi_name,certified_at,certi_org } = req.body;
    const user = req.session.user;
    try {
        await certiService.addCerti(user, certi_name,certified_at,certi_org);
        res.redirect('/tables');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function select_certi(req, res) {
    const user = req.session.user;
    try {
        const certificates = await certiService.certiSelect(user);
        res.json(certificates);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function schedule(req, res) {
    const user = req.session.user;
    try {
        const scheduleC = await certiService.scheduleCheck(user);
        res.json(scheduleC);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function option_certi(req,res) {
    const user = req.session.user;
    try {
        const option_list = await certiService.option_check(user);
        res.json(option_list);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function org_certi(req,res) {
    try {
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