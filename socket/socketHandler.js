const studyController = require('../controllers/studyGruopController');

module.exports = function (io) {
    // 클라이언트가 서버에 연결될 때 실행되는 이벤트 핸들러
    io.on('connection', (socket) => {
        console.log('A user connected');

        // 사용자가 채팅방에 입장할 때 실행되는 이벤트 핸들러
        socket.on('join room', (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
        });

        // 사용자가 채팅방에서 나갈 때 실행되는 이벤트 핸들러
        socket.on('leave room', (roomId) => {
            socket.leave(roomId);
            console.log(`User ${socket.id} left room ${roomId}`);
        });

        // 채팅 메시지를 받았을 때 실행되는 이벤트 핸들러
        socket.on('chat message', async (data) => {
            console.log('Received chat message:', data);
            try {
                // 받은 메시지를 데이터베이스에 저장하고 같은 방의 모든 사용자에게 전송
                const savedMessage = await studyController.chatController.saveChatMessage({
                    body: {
                        groupIdx: data.groupIdx,
                        memId: data.memId,
                        chat: data.chat
                    }
                }, {
                    json: (message) => {
                        io.to(data.groupIdx).emit('chat message', message);
                    },
                    status: () => ({ json: () => { } })
                });
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        // 채팅방 삭제 요청을 받았을 때 실행되는 이벤트 핸들러
        socket.on('delete room', async (roomId) => {
            try {
                // 채팅방을 삭제하고 모든 클라이언트에게 삭제 알림을 전송
                await studyController.deleteChatRoom({
                    params: { groupIdx: roomId }
                }, {
                    json: () => {
                        io.emit('room deleted', roomId);
                    },
                    status: () => ({ send: () => { } })
                });
            } catch (error) {
                console.error('Error deleting room:', error);
            }
        });

        // 채팅방의 모든 메시지 삭제 요청을 받았을 때 실행되는 이벤트 핸들러
        socket.on('clear messages', async (roomId) => {
            try {
                // 채팅방의 모든 메시지를 삭제하고 해당 방의 모든 사용자에게 알림을 전송
                await studyController.clearChatMessages({
                    params: { groupIdx: roomId }
                }, {
                    json: () => {
                        io.to(roomId).emit('messages cleared');
                    },
                    status: () => ({ send: () => { } })
                });
            } catch (error) {
                console.error('Error clearing messages:', error);
            }
        });

        // 클라이언트 연결이 끊겼을 때 실행되는 이벤트 핸들러
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};