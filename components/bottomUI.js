import React, { useState } from 'react';
import { View, Pressable, TextInput, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { sendMessage } from '../shared/functions';
import useSettingsStore from '../store/useSettingsStore';
import { colors } from '../lib/constants';


const BottomUI = (props) => {
    const { current } = props;
    const [ext, setExt] = useState(0);
    const [msg, setMsg] = useState('');
    const darkMode = useSettingsStore(state => state.darkMode);


    const handleSend = () => {
        if (msg !== '') {
            setMsg('');
            sendMessage(msg, current)
        };
    };

    const onChangeFun = (val) => {
        setMsg(val);
    };

    return (
        <View style={styles.root}>
            <Pressable
                style={
                    ext > 0 ? styles.endButton
                        : ext > 1 ? styles.findButton
                            : darkMode ? styles.normalButtonDark
                                : styles.normalButton}>
                {ext > 1 ?
                    <AntDesign name="find" size={24} color="white" />
                    :
                    <FontAwesome name="remove" size={22}
                        color={
                            ext > 1 ? "white"
                                : darkMode ? "#b9bbbe"
                                    : '#212121'} />}
            </Pressable>
            <TextInput
                placeholderTextColor={darkMode ? colors.textHomeDark : colors.textHome}
                placeholder='Type a message to stranger'
                maxLength={200}
                keyboardAppearance={Platform.OS === 'ios' && darkMode ? 'dark' : 'light'}
                autoCorrect={false}
                clearButtonMode={Platform.OS === 'ios' ? true : null}
                style={
                    darkMode ? styles.inputDark
                        : styles.input}
                editable={true} onChangeText={onChangeFun} value={msg} />
            <Pressable onPress={handleSend}
                style={
                    msg.length > 0 ? styles.sendButton
                        : darkMode ? styles.normalButtonDark
                            : styles.normalButton}>
                <MaterialCommunityIcons name="send" size={24}
                    color={
                        msg.length > 0 ? "white"
                            : darkMode ? "#b9bbbe"
                                : '#212121'} />
            </Pressable>
        </View>

    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    input: {
        padding: 10,
        width: '70%',
        flexWrap: 'wrap',
        backgroundColor: colors.content,
        borderRadius: 20,
        margin: 10
    },
    inputDark: {
        padding: 10,
        width: '70%',
        backgroundColor: colors.contentDark,
        borderRadius: 20,
        color: colors.text,
        margin: 10
    },
    normalButton: {
        padding: 10,
        backgroundColor: colors.content,
        borderRadius: 20
    },
    normalButtonDark: {
        padding: 10,
        backgroundColor: colors.contentDark,
        borderRadius: 20
    },
    sendButton: {
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 20
    },
    findButton: {
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 20
    },
    endButton: {
        padding: 10,
        backgroundColor: colors.queAvatar,
        borderRadius: 20
    }
});

export default BottomUI;
