const studyController = require('../controllers/studyGruopController');

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('join room', (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
        });

        socket.on('leave room', (roomId) => {
            socket.leave(roomId);
            console.log(`User ${socket.id} left room ${roomId}`);
        });

        socket.on('chat message', async (data) => {
            console.log('Received chat message:', data);
            try {
                const savedMessage = await studyController.chatController.saveChatMessage({
                    body: {
                        groupIdx: data.groupIdx,
                        memId: data.memId,
                        chat: data.chat
                    }
                }, {
                    json: (message) => {
                        console.log('Sending message to room:', data.groupIdx, message);
                        io.to(data.groupIdx).emit('chat message', message);
                    },
                    status: () => ({ json: () => { } })
                });
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        socket.on('delete room', async (roomId) => {
            try {
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

        socket.on('clear messages', async (roomId) => {
            try {
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

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};