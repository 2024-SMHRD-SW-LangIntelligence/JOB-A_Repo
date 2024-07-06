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

// 메세지 보내기 관련

const chatController = {
  getChatMessages: async (req, res) => {
    try {
      const { groupIdx } = req.params;
      const messages = await studyService.chatService.getChatMessages(groupIdx);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get chat messages' });
    }
  },

  saveChatMessage: async (req, res) => {
    try {
      const { groupIdx, memId, chat } = req.body;
      console.log('Received data:', { groupIdx, memId, chat });
      const savedMessage = await studyService.chatService.saveChatMessage(groupIdx, memId, chat);
      res.json(savedMessage);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save chat message' });
    }
  }
};


module.exports = {
  createRoom,
  getChatRooms,
  chatController
};