import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import useSettingsStore from '../store/useSettingsStore';
import { colors } from '../lib/constants';

const Messages = (props) => {
    const { messages, id, typing } = props;
    const darkMode = useSettingsStore(state => state.darkMode);

    const bubble = (d) => {
        switch (d) {
            case id:
                return darkMode ? styles.bubbleHomeDark : styles.bubbleHome;
            default:
                return darkMode ? styles.bubbleAwayDark : styles.bubbleAway;
        };
    };

    const messageText = (d) => {
        switch (d) {
            case id:
                return darkMode ? styles.textHomeDark : styles.textHome;
            default:
                return darkMode ? styles.textAwayDark : styles.textAway;
        };
    };

    const infoStyle = (d) => {
        switch (d) {
            case id:
                return darkMode ? styles.statusMarkHomeDark : styles.statusMarkHome;
            default:
                return darkMode ? styles.statusMarkAwayDark : styles.statusMarkAway;
        };
    };

    const renderMessage = ({ item }) => {
        return (
            <Message msg={item} />
        );
    }

    const Message = ({ msg }) => {
        const { from, text, time } = msg;
        const formatTime = moment(time).format('LT');
        const bubbleStyle = bubble(from);
        const textStyle = messageText(from);
        const statusStyle = infoStyle(from);

        return (
            <View style={bubbleStyle}>
                <Text style={textStyle}>{text}</Text>
                <Text style={statusStyle}>{formatTime}
                    {/* {from === id ?
                    status === 1 ?
                        <Ionicons name="ios-checkmark-sharp" size={24} color="black" />
                        :
                        <Ionicons name="ios-checkmark-done-sharp" size={24} color="blue" />
                    : undefined} */}
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ padding: 10 }}>
                <FlatList

                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={message => message.id}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bubbleAwayDark: {
        backgroundColor: colors.bubbleAwayDark,
        padding: 10,
        marginTop: 5,
        maxWidth: '70%',
        alignSelf: 'flex-start',
        borderRadius: 20,
    },
    bubbleAway: {
        backgroundColor: colors.bubbleAway,
        padding: 10,
        marginTop: 5,
        maxWidth: '70%',
        alignSelf: 'flex-start',
        borderRadius: 20,
    },
    bubbleHomeDark: {
        backgroundColor: colors.bubbleHomeDark,
        padding: 10,
        marginTop: 10,
        maxWidth: '70%',
        alignSelf: 'flex-end',
        borderRadius: 20,
    },
    bubbleHome: {
        backgroundColor: colors.bubbleHome,
        padding: 10,
        marginTop: 10,
        maxWidth: '70%',
        alignSelf: 'flex-end',
        borderRadius: 20,
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
    statusMarkAway: {
        fontSize: 11,
        alignSelf: 'flex-end',
        color: colors.statusMarkAway
    },
    statusMarkAwayDark: {
        fontSize: 11,
        alignSelf: 'flex-end',
        color: colors.statusMarkAwayDark
    },
    textAwayDark: {
        color: colors.textAwayDark,
        fontSize: 18,
    },
    textAway: {
        color: colors.textAway,
        fontSize: 18,
    },
    textHomeDark: {
        color: colors.textHomeDark,
        fontSize: 18,
    },
    textHome: {
        color: colors.textHome,
        fontSize: 18,
    }
})
export default Messages;
