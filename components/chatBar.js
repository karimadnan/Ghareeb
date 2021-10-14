import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import NavigationBar from '../components/navigationBar';
import { colors } from '../lib/constants';

const ChatBar = ({ navigation, chat }) => {

    return (
        <View>
            <NavigationBar navigation={navigation}>
                {chat.users.length === 2 ?
                    <View style={{ ...styles.matchedAvatar, backgroundColor: chat.cCode }}>
                        <Octicons name="octoface" size={20} color="white" />
                    </View> :
                    <View style={styles.queAvatar}>
                        <Text style={styles.queText}>?</Text>
                    </View>
                }
                <View style={styles.strangerInfo} >
                    <Text style={styles.nameText}>Stranger</Text>
                    <Text style={styles.isTypingText}>is typing...</Text>
                </View>
            </NavigationBar>
        </View>
    )
};

const styles = StyleSheet.create({
    queAvatar: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        marginLeft: 5,
        backgroundColor: colors.queAvatar,
        borderWidth: 1,
        borderColor: colors.secondary
    },
    queText: {
        color: colors.secondary,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    strangerInfo: {
        flexDirection: 'column'
    },
    nameText: {
        marginLeft: 10,
        color: colors.secondary,
        fontSize: 15,
        fontWeight: 'bold',
    },
    isTypingText: {
        marginLeft: 10,
        color: colors.secondary,
        fontSize: 15,
    },
    matchedAvatar: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        padding: 6,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: colors.secondary
    }
})

export default ChatBar;