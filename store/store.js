import create from 'zustand';
import produce from 'immer';
import { devtools } from 'zustand/middleware'

const useStore = create(devtools(set => ({
    interests: [],
    socket: {},
    chats: [],
    addInterest: (int) => set(state => ({ interests: [...state.interests, int] })),
    removeInterest: (int) => set(state => ({ interests: state.interests.filter(i => i !== int) })),
    setSocket: (soc) => set({ socket: soc }),
    addChat: (chat) => set(state => ({ chats: [...state.chats, chat] })),
    removeChat: (id) => set(state => ({ chats: state.chats.filter(f => f !== id) })),
    addChatMsg: (msg, i) => set(produce(state => { state.chats[i].messages.push(msg) })),
    updateChat: (chat, i) => set(produce(state => { state.chats[i] = chat })),
    chatRead: (i) => set(produce(state => { state.chats[i].unreads = 0 }))
})));

export default useStore;