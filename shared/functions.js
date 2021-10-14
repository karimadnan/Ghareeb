import useStore from '../store/store';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

let socket;
let interests;
let chats;
const addChat = useStore.getState().addChat;
const updateChat = useStore.getState().updateChat;
const updateRead = useStore.getState().chatRead;
const sendMsg = useStore.getState().addChatMsg;

const unsub1 = useStore.subscribe((s) => {
    socket = s.socket;
    interests = s.interests;
    chats = s.chats;
});

const connectMatching = () => {
    const newChatId = uuidv4();
    let colors = ['#14FFEC', '#FF165D', '#6639A6', '#1FAB89', '#FFCD3C', '#CE1212', '#07689F'];
    const getColor = colors[Math.floor(Math.random() * colors.length)];

    socket.emit('connect-matching', interests, newChatId, (msg, time) => {
        let newChat = {
            id: newChatId,
            users: [socket.id],
            messages: [{ from: 1, text: msg, time: time, id: uuidv4() }],
            unreads: 1,
            cCode: getColor
        };
        addChat(newChat);
    });
};

const onMatched = (msg, data, id, time) => {
    let getIndex = chats.findIndex(c => c.id === id);

    if (getIndex !== -1) {
        let chat = {
            ...data,
            id,
            messages: [{ from: 1, text: msg, time, id: uuidv4() }],
            unreads: chats[getIndex].unreads + 1,
            cCode: chats[getIndex].cCode
        };
        updateChat(chat, getIndex);
    };
};

const markRead = (id) => {
    const getIndex = chats.findIndex(c => c.id === id);

    if (getIndex !== -1) {
        updateRead(getIndex);
    };
};

const sendMessage = (msg, chat) => {
    let newObj = {
        from: socket.id,
        text: msg,
        time: moment().valueOf(),
        id: uuidv4()
    };
    sendMsg(newObj, chat);
};

export {
    connectMatching,
    onMatched,
    markRead,
    sendMessage
}