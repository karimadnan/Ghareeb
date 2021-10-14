const que = require('../users/handleQue');
const room = require('../rooms/handleRooms');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const functions = {
    chatLeave: (id, socket, io) => {
        functions.roomDC(id, socket, io);
    },
    chatDC: (socket, io) => {
        room.inAnyRoom([socket.id])
            .then((res) => {
                if (res) {
                    functions.roomDC(res.name, socket, io);
                };
            });
    },
    initQue: (socket, cb, ints, io, id) => {
        const user = { soc: socket.id, interests: ints, chatID: id };
        if (cb) {
            cb('Looking for someone to match you with!', moment().valueOf());
        };

        que.addToQue(user)
            .then((err) => {
                if (err) {
                    return socket.emit('res-error', err.msg);
                }
                functions.runQue(user, socket, io);
                setTimeout(() => {
                    functions.bePairable(user.chatID);
                }, 30000);
            });
    },
    leaveQue: (roomID) => {
        que.isInQue(roomID).then((res) => {
            if (res.inQue) {
                que.removeFromQue(roomID)
                    .then((res) => {
                        if (res) {
                            console.log(res.error, res.msg);
                        };
                    });
            };
        })
    },
    roomDC: (id, socket, io) => {
        room.getDeleteRoom(id, socket.id).then((res) => {
            if (res.value) {
                const deleted = res.value;
                const other = deleted.inside.filter(s => s !== socket.id);
                const roomClients = io.sockets.adapter.rooms.get(id);
                if (roomClients) {
                    roomClients.forEach((s) => {
                        const clientSocket = io.sockets.sockets.get(s);
                        if (clientSocket) {
                            clientSocket.leave(id);
                        };
                    });
                };
                io.to(other).emit('disconnect-chat', id, 'Stranger disconnected! Chat is no longer available.');
            }
        })
    },
    bePairable: (socket) => {
        que.isInQue(socket.id).then((res) => {
            if (res.inQue) {
                que.bePairable(socket.id);
            };
        });
    },
    runQue: (user, socket, io) => {
        que.fetchBestMatch(user, false)
            .then((peers) => {
                peers.toArray((err, docs) => {
                    const matches = docs.map(peer =>
                    ({
                        soc: peer.soc,
                        interests: peer.interests.filter(int => user.interests.includes(int)),
                        chatID: peer.chatID
                    })).sort((a, b) => b.interests.length - a.interests.length);

                    if (matches.length > 0) {
                        functions.matchProcess(user, matches, false, socket, io);
                    } else {
                        que.fetchBestMatch(user, true)
                            .then((peers) => {
                                peers.toArray((err, docs) => {
                                    functions.matchProcess(user, docs, true, socket, io);
                                });
                            });
                    };
                });
            });
    },
    matchProcess: (user, matches, any, socket, io) => {
        matches.every((match) => {
            que.isInQue(match.chatID).then((res) => {
                if (res.inQue) {
                    que.removeOneFromQue(user.chatID);
                    que.removeOneFromQue(match.chatID);
                    if (io.sockets.sockets.get(match.soc)) {
                        let msgF = false;
                        let msgS = false;

                        if (user.interests.length > 0 && match.nt) {
                            msgF = true;
                        };
                        if (match.interests.length > 0) {
                            if (user.nt || user.interests.length <= 0) {
                                msgS = true;
                            };
                        };

                        let msg = 'You got matched to a stranger say Hi!';

                        if (!any) {
                            if (match.interests.length > 0) {
                                msg = msg + `\nYou both like: `;
                                match.interests.forEach((int, index) => {
                                    msg = msg + `${int}${match.interests.length - 1 === index ? '.' : ', '}`
                                });
                            };
                        };

                        const roomID = uuidv4();
                        const roomData = {
                            name: roomID,
                            users: [match.soc, user.soc]
                        };
                        room.createRoom(roomData).then((err) => {
                            if (err) {
                                console.log("TEST");
                                // socket.emit(`connect-matching`, user.interests);
                                // io.to(match.soc).emit('connect-matching', match.interests);
                                // return socket.emit('res-error', err.msg);
                            };
                            let rn = "We couldn't find someone with matching interests!";
                            let fMsg = msgF ? rn + msg : msg;
                            let sMsg = msgS ? rn + msg : msg;

                            const time = moment().valueOf();
                            socket.emit('match-to-peer', fMsg, roomData, user.chatID, time);
                            io.to(match.soc).emit('match-to-peer', sMsg, roomData, match.chatID, time);

                            const peerSocket = io.sockets.sockets.get(match.soc);
                            socket.join(roomID)
                            peerSocket.join(roomID)
                        });
                        return false;
                    }
                };
            });
        });
        return que.setQueStatus(user.chatID, false);
    }
};

module.exports = functions;