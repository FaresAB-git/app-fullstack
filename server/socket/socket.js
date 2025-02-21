const socketIO = require('socket.io');

const Socketio = socketIO(server);
{
    io.on('connection', (socket) => {
        console.log(`User connecté : ${socket.id}`);

        socket.on('joinProject', (projectId) => {
            socket.join(projectId);
            console.log(`User ${socket.id} rejoint le projet ${projectId}`);
        });

        socket.on('sendMessage', ({ projectId, message, user }) => {
            io.to(projectId).emit('receiveMessage', { message, user });
        });

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} déconnecté`);
        });
    });
};

module.exports = { Socketio };