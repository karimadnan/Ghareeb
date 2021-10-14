import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Messages from '../components/messages';
import useStore from '../store/store';
import ChatBar from '../components/chatBar';
import useSettingsStore from '../store/useSettingsStore';
import BottomUI from '../components/bottomUI';
import { colors } from '../lib/constants';

const ChatRoom = ({ route, navigation }) => {
    const chats = useStore(state => state.chats);
    const socket = useStore(state => state.socket);
    const interests = useStore(state => state.interests);
    const chatID = route.params.chatID;
    const current = chats.findIndex(c => c.id === chatID);
    const chat = chats[current];
    const getChatMessages = chat.messages;
    const users = chat.users;
    const roomID = chat.name;
    const darkMode = useSettingsStore(state => state.darkMode);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' && 'padding'}>
            <View style={darkMode ? styles.rootDark : styles.root}>
                <ChatBar navigation={navigation} chat={chat} />
                <Messages messages={getChatMessages} id={socket.id} />
                <BottomUI socket={socket} room={roomID} users={users} interests={interests} current={current} />
            </View>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.paper
    },
    rootDark: {
        flex: 1,
        backgroundColor: colors.paperDark
    }
});

export default ChatRoom;
