const { Server } = require('socket.io');
const { messageController, groupMessageController } = require('../controller');

let onlineUsers = [];
const addUser = (user, socketId, arr) => {
    const isExist = arr.findIndex((item) => item.user._id === user.user._id);
    if (isExist !== -1) {
        arr.splice(isExist, 1);
    }
    user.socketId = socketId;
    arr.push(user);
};

const removeUser = (socketId) => {
    const isExist = onlineUsers.findIndex((item) => item.socketId === socketId);
    if (isExist !== -1) {
        onlineUsers.splice(isExist, 1);
    }
};

const socketInit = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`${socket.id} User connected`);
        socket.on("ADD_USER", (user) => {
            addUser(user, socket.id, onlineUsers);
            io.emit("USER_ADDED", onlineUsers);
        });


        socket.on('SEND_MESSAGE', async (data) => {
            const savedMessage = await messageController.saveMessage(data);
            io.to(data.receiver.socketId).to(data.sender.socketId).emit('RECEIVED_MESSAGE', savedMessage.data);
        });

        socket.on('DELETE_MESSAGE', async (data) => {
            io.to(data.receiver.socketId).to(data.sender.socketId).emit('DELETED_MESSAGE', data);
        });


        socket.on('JOIN_GROUP', ({ groupId, userId }) => {
            const userSocket = onlineUsers.find(user => user.user._id === userId)?.socketId;

            if (userSocket) {
                socket.join(groupId);
                console.log(`User with ID ${userId} joined group room ${groupId}`);
            }
        });


        socket.on('SEND_GROUP_MESSAGE', async ({ groupId, message, senderId, senderName, senderEmail }) => {
            console.log(`Broadcasting to group: ${groupId}`);
            console.log(message);
            const savedGroupMessage = await groupMessageController.saveGroupMessage({ groupId, message, senderId, senderName, senderEmail })
            console.log(savedGroupMessage);

            io.to(groupId).emit('GROUP_MESSAGE_RECEIVED', {
                groupId,
                message,
                senderId,
                senderName,
                senderEmail
            });
        });


        // Handling disconnects
        socket.on("disconnect", () => {
            console.log(`${socket.id} Disconnected`);
            removeUser(socket.id);
            io.emit("USER_ADDED", onlineUsers); // Notify others of updated user list
        });
    });
};

module.exports = socketInit;
