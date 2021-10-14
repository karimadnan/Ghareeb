const io = require('socket.io')(4000, {
    cors: {
        origin: ['*']
    }
});
const {
    initQue,
    leaveQue,
    chatDC,
    chatLeave
} = require('./sockets/functions');

const sockets = {
    startConnection: () => {
        console.log('Listening for socket connections!');
        io.on('connection', socket => {
            console.log(socket.id, "Socket Connected!");

            socket.on('connect-matching', (ints, id, cb) => initQue(socket, cb, ints, io, id));
            socket.on('disconnect-text', (id) => leaveQue(id));
            socket.on('unmount-chat', () => chatDC(socket, io));
            socket.on("disconnecting", () => {
                chatDC(socket, io)
                leaveQue(socket)
            });
            socket.on('leave-chat', (id) => chatLeave(id, socket, io));
        });
    }
};

module.exports = sockets;