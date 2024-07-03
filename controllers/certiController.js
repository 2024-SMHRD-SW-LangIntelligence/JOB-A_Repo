const memberService = require('../services/certiService');

async function add(req, res) {
    const { certi_idx, mem_id, certi_name,certified_at,certi_org } = req.body;
    try {
        const user = await memberService.addCerti(certi_idx, mem_id, certi_name,certified_at,certi_org);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function Certi_check(req, res) {
    const { certi_name } = req.body;
    try {
        const userExists = await memberService.checkCerti(certi_name);
        if (userExists) {
            res.send("not available");
        } else {
            res.send("available");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
async function select_certi(req, res) {
    const { mem_id } = req.body;
    try {
        const userExists = await memberService.certiSelect(mem_id);
        if (userExists) {
            res.send("not available");
        } else {
            res.send("available");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    add,
    Certi_check,
    select_certi
};