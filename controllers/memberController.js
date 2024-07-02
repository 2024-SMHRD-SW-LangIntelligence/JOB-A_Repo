const memberService = require('../services/memberService');

async function register(req, res) {
    const { mem_id, mem_pw, mem_nick } = req.body;
    try {
        const user = await memberService.registerUser(mem_id, mem_pw, mem_nick);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function login(req, res) {
    const { mem_id, mem_pw } = req.body;
    try {
        const user = await memberService.loginUser(mem_id, mem_pw);
        if (user.length > 0) {
            res.send(`User ${mem_id} logged in successfully`);
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function checkId(req, res) {
    const { mem_id } = req.body;
    try {
        const userExists = await memberService.checkUserExists(mem_id);
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
    register,
    login,
    checkId
};