const supabase = require('../config/superbase');

// 채팅방 생성
async function createChatRoom(groupName, groupDesc, groupHash, mem_id) {
    const { data, error } = await supabase
        .from('tb_studygroup')
        .insert([{ group_name: groupName, group_desc: groupDesc, group_hash: groupHash, created_at: new Date(), mem_id : mem_id }]);

    if (error) throw error;
    return data;
}

// 채팅방 목록 가져오기
async function getChatRooms() {
    const { data, error } = await supabase
    .from('tb_studygroup')
    .select('*')
    .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
}

module.exports = {
    createChatRoom,
    getChatRooms
};