const supabase = require('../config/superbase');

// 자격증 추가certi_idx, mem_id,
async function addCerti(user,certi_name,certified_at,certi_org) {
    const { data, error } = await supabase
        .from('tb_certificate')
        .insert([
            {
                mem_id: user.mem_id,
                certi_name: certi_name,
                certified_at: certified_at,
                certi_org: certi_org
            }
        ]);

    if (error) throw error;
    return data;
}

// 자격증 내놔
async function certiSelect(user) {
    const { data, error } = await supabase
        .from('tb_certificate')
        .select('*')
        .eq('mem_id', user.mem_id);

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

module.exports = {
    addCerti,
    certiSelect
};