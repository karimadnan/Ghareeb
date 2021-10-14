import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { markRead } from '../shared/functions';
import useStore from '../store/store';
import useSettingsStore from '../store/useSettingsStore';
import { colors } from '../lib/constants';

const ChatHandler = (props) => {
    const { data, navigation } = props;
    const { users, unreads, messages, id, cCode } = data;
    const lastMsg = messages[messages.length - 1];
    const darkMode = useSettingsStore(state => state.darkMode);
    const userID = useStore(state => state.socket.id);

    const goToChat = () => {
        navigation.navigate('Chat', {
            chatID: id
        });
        markRead(id);
    };

    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={goToChat}>
                <View style={darkMode ? styles.chatRowDark : styles.chatRow}>
                    {users.length < 2 ?
                        <View style={styles.queAvatar}>
                            <Text style={styles.avatarNText}>?</Text>
                        </View>
                        :
                        <View style={{ ...styles.matchedAvatar, backgroundColor: cCode }}>
                            <Octicons name="octoface" size={30} color="white" />
                        </View>}
                    <View style={
                        darkMode ?
                            styles.chatTabDark
                            : styles.chatTab}>
                        <View style={styles.lastMsg}>
                            <View style={styles.tabInfo}>
                                <Text
                                    style={
                                        darkMode ?
                                            styles.boldMsgDark
                                            : styles.boldMsg
                                    }>
                                    {lastMsg.from === 1 ? 'System' : lastMsg.from === userID ? 'You' : 'Stranger'}
                                </Text>
                                <Text>test</Text>
                            </View>
                            <Text
                                style={
                                    unreads > 0 ?
                                        styles.boldMsgDark
                                        : styles.msgDark}
                                numberOfLines={1}>
                                {lastMsg.text}
                            </Text>
                        </View>
                        {/* {unreads > 0 &&
                            <View style={styles.unread}>
                                <Text style={styles.unreadText}>{unreads}</Text>
                            </View>
                        } */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    chatRow: {
        flexDirection: 'row',
        backgroundColor: colors.content,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: colors.border
    },
    chatRowDark: {
        flexDirection: 'row',
        backgroundColor: colors.contentDark,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: colors.borderDark
    },
    tabInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    statusMarkHome: {
        fontSize: 11,
        alignSelf: 'flex-end',
        color: colors.statusMarkHome
    },
    statusMarkHomeDark: {
        fontSize: 11,
        alignSelf: 'flex-end',
        color: colors.statusMarkHomeDark
    },
    msgDark: {
        padding: 5,
        color: colors.textHomeDark
    },
    boldMsgDark: {
        padding: 5,
        fontWeight: 'bold',
        color: colors.textHomeDark,
        flexWrap: 'nowrap'
    },
    msg: {
        padding: 5,
        color: colors.textHome
    },
    boldMsg: {
        padding: 5,
        fontWeight: 'bold',
        color: colors.textHome
    },
    lastMsg: {
        flexDirection: 'column',
        flex: 1,
        alignItems: "flex-start",
    },
    chatTab: {
        padding: 5,
    },
    chatTabDark: {
        padding: 5,
    },
    unreadText: {
        padding: 3,
        textAlign: 'center',
        color: colors.secondary,
    },
    unread: {
        alignSelf: 'flex-start',
        backgroundColor: colors.primary,
        marginTop: 10,
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
    },
    avatarNText: {
        color: colors.secondary,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    queAvatar: {
        width: 55,
        height: 55,
        padding: 12,
        borderRadius: 55 / 2,
        marginRight: 10,
        backgroundColor: colors.queAvatar,
        alignSelf: 'center'
    },
    matchedAvatar: {
        width: 55,
        height: 55,
        padding: 12,
        borderRadius: 55 / 2,
        marginRight: 10,
        alignSelf: 'center'
    }
});
export default ChatHandler;