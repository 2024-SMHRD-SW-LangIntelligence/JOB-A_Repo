const supabase = require('../config/superbase');

// 자격증 추가certi_idx, mem_id,
async function addCerti(certi_name,certi_org) {
    const { data, error } = await supabase
        .from('tb_certificate')
        .insert([{ certi_idx:'1', mem_id:'1', certi_name,certified_at: new Date(),certi_org }]);

    if (error) throw error;
    return data;
}
// 자격증 중복 확인
async function checkCerti(certi_name) {
    const { data, error } = await supabase
        .from('tb_certificate')
        .select('*')
        .eq('certi_name', certi_name);

    if (error) throw error;
    return data.length > 0;
}
// 자격증 내놔
async function certiSelect(mem_id) {
    const { data, error } = await supabase
        .from('tb_certificate')
        .select('*')
        .eq('mem_id', mem_id);

    if (error) throw error;
    return data.length > 0;
}

module.exports = {
    addCerti,
    checkCerti,
    certiSelect
};