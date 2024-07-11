const supabase = require('../config/superbase');

// 채팅방 생성
async function createChatRoom(groupName, groupDesc, groupHash, mem_id) {
    const { data, error } = await supabase
        .from('tb_studygroup')
        .insert([{ group_name: groupName, group_desc: groupDesc, group_hash: groupHash, created_at: new Date(), mem_id: mem_id }]);

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

// 메세지 보내기 관련
const chatService = {
    getChatMessages: async (groupIdx) => {
        const { data, error } = await supabase
            .from('tb_chatting')
            .select('*')
            .eq('group_idx', groupIdx)
            .order('chat_at', { ascending: true });

        if (error) throw error;
        return data;
    },

    saveChatMessage: async (groupIdx, memId, chat) => {
        const { data, error } = await supabase
            .from('tb_chatting')
            .insert({ group_idx: groupIdx, mem_id: memId, chat: chat, chat_at: new Date().toISOString() })
            .select();

        if (error) throw error;
        return data[0];
    }
};

async function deleteChatRoom(groupIdx) {
    const { data, error } = await supabase
        .from('tb_studygroup')
        .delete()
        .eq('group_idx', groupIdx);

    if (error) throw error;
    return data;
}

async function clearChatMessages(groupIdx) {
    const { data, error } = await supabase
        .from('tb_chatting')
        .delete()
        .eq('group_idx', groupIdx);

    if (error) throw error;
    return data;
}


module.exports = {
    createChatRoom,
    getChatRooms,
    chatService,
    deleteChatRoom,
    clearChatMessages
};