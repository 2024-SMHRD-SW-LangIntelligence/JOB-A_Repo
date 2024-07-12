const studyService = require('../services/studyGruopService');

// 채팅방 생성 함수
async function createRoom(req, res) {
  const { groupName, groupDesc, groupHash, mem_id } = req.body;
  try {
    // 새로운 채팅방을 데이터베이스에 생성
    const newRoom = await studyService.createChatRoom(groupName, groupDesc, groupHash, mem_id);
    res.send({ success: true, room: newRoom });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// 채팅방 목록 조회 함수
async function getChatRooms(req, res) {
  try {
    // 모든 채팅방 정보를 데이터베이스에서 조회
    const chatRooms = await studyService.getChatRooms();
    res.json(chatRooms);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// 채팅 메시지 관련 컨트롤러
const chatController = {
  // 특정 채팅방의 메시지 조회 함수
  getChatMessages: async (req, res) => {
    try {
      const { groupIdx } = req.params;
      // 특정 채팅방의 메시지를 데이터베이스에서 조회
      const messages = await studyService.chatService.getChatMessages(groupIdx);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get chat messages' });
    }
  },

  // 채팅 메시지 저장 함수
  saveChatMessage: async (req, res) => {
    console.log('Saving chat message:', req.body);
    try {
      const { groupIdx, memId, chat } = req.body;
      // 새로운 채팅 메시지를 데이터베이스에 저장
      const savedMessage = await studyService.chatService.saveChatMessage(groupIdx, memId, chat);
      console.log('Message saved successfully:', savedMessage);
      res.json(savedMessage);
    } catch (error) {
      console.error('Failed to save chat message:', error);
      res.status(500).json({ error: 'Failed to save chat message' });
    }
  }
};

// 채팅방 삭제 함수
async function deleteChatRoom(req, res) {
  const { groupIdx } = req.params;
  try {
    // 특정 채팅방을 데이터베이스에서 삭제
    await studyService.deleteChatRoom(groupIdx);
    res.json({ success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// 채팅방의 모든 메시지 삭제 함수
async function clearChatMessages(req, res) {
  const { groupIdx } = req.params;
  try {
    // 특정 채팅방의 모든 메시지를 데이터베이스에서 삭제
    await studyService.clearChatMessages(groupIdx);
    res.json({ success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  createRoom,
  getChatRooms,
  chatController,
  deleteChatRoom,
  clearChatMessages
};