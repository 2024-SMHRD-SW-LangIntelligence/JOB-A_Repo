const studyService = require('../services/studyGruopService');

// 채팅방 만들기
async function createRoom(req, res) {
    const { groupName, groupDesc, groupHash, mem_id } = req.body;
    try {
        const newRoom = await studyService.createChatRoom(groupName, groupDesc, groupHash, mem_id);
        res.send({ success: true, room: newRoom });
    } catch (error) {
        res.status(500).send(error.message);
    }
}


// 채팅방 목록 불러오기
async function getChatRooms(req, res) {
    try {
        const chatRooms = await studyService.getChatRooms();
        res.json(chatRooms);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    createRoom,
    getChatRooms
};