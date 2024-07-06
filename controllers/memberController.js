const memberService = require('../services/memberService');

// 회원가입 기능
async function register(req, res) {
    const { mem_id, mem_pw, mem_nick } = req.body;
    try {
        const user = await memberService.registerUser(mem_id, mem_pw, mem_nick);
        res.send({
            success: true,
          });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


// 로그인 기능
async function login(req, res) {
    const { mem_id, mem_pw } = req.body;
        const user = await memberService.loginUser(mem_id, mem_pw);
        if (user.length > 0) {
            req.session.user = user[0];
            res.send({
                success: true,
              });
        } else {
            res.status(401).send('Invalid email or password');
        }  
}

// 로그아웃 기능
function logout(req, res) {
    req.session.destroy((err) => {
        if(err) {
            return res.status(500).send('Could not log out, please try again');
        }
        res.redirect('/');
    });
}

// 중복아이디 체크 (top에서 ajax로 쓰임)
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
    checkId,
    logout,
};