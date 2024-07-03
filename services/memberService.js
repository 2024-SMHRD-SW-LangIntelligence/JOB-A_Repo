const supabase = require('../config/superbase');

// 회원가입 로직
async function registerUser(mem_id, mem_pw, mem_nick) {
    const { data, error } = await supabase
        .from('tb_member')
        .insert([{ mem_id, mem_pw, mem_nick, joined_at: new Date() }]);

    if (error) throw error;
    return data;
}
// 자격증 추가 로직 미완 ------------------------------------------------------------------------------------------------------------
async function certi_add(certi_name, certified_at, certi_org) {
    const { data, error } = await supabase
        .from('tb_certificate')
        .insert([{ certi_name, certified_at, certi_org }]);

    if (error) throw error;
    return data;
}

// 중복 아이디 체크 로직
async function checkUserExists(mem_id) {
    const { data, error } = await supabase
        .from('tb_member')
        .select('*')
        .eq('mem_id', mem_id);

    if (error) throw error;
    return data.length > 0;
}


// 로그인 로직
async function loginUser(mem_id, mem_pw) {
    const { data, error } = await supabase
        .from('tb_member')
        .select('*')
        .eq('mem_id', mem_id)
        .eq('mem_pw', mem_pw)
    if (error) throw error;
    return data;
}

module.exports = {
    registerUser,
    loginUser,
    checkUserExists,
    certi_add
};