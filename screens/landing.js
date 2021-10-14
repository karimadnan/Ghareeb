
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, LayoutAnimation, UIManager, Platform, TouchableOpacity } from 'react-native';
import { connectMatching } from '../shared/functions';
import ChatOutview from '../components/chatOutview';
import useStore from '../store/store';
import useSettingsStore from '../store/useSettingsStore';
import { AntDesign } from '@expo/vector-icons';
import AppBar from '../components/appBar';
import { colors } from '../lib/constants';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Landing = ({ navigation }) => {
    const chats = useStore(state => state.chats);
    const darkMode = useSettingsStore(state => state.darkMode);
    const ScrollViewRef = useRef();

    const _handleScroll = () => {
        ScrollViewRef.current.scrollToEnd()
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    const joinQue = () => {
        connectMatching();
    };

    return (
        <View style={darkMode ? styles.rootDark : styles.root}>
            <AppBar navigation={navigation} />
            <View style={styles.topButtons}>
                {chats.length < 5 &&
                    <TouchableOpacity onPress={joinQue} style={darkMode ? styles.newMatchBttnDark : styles.newMatchBttn}>
                        <AntDesign name="plus" size={25} color={darkMode ? "white" : "black"} />
                    </TouchableOpacity>}
            </View>
            <ScrollView alwaysBounceVertical={true} ref={ScrollViewRef} onContentSizeChange={_handleScroll}>
                {chats.map((c) => (
                    <ChatOutview key={c.id} data={c} navigation={navigation} />
                ))}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.paper
    },
    rootDark: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.paperDark
    },
    topButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addInterest: {
        flexDirection: 'row',
        backgroundColor: colors.content,
        alignSelf: 'center',
        padding: 20,
        borderRadius: 50,
        margin: 10
    },
    addInterestDark: {
        flexDirection: 'row',
        backgroundColor: colors.contentDark,
        alignSelf: 'center',
        padding: 20,
        borderRadius: 50,
        margin: 10
    },
    newMatchBttn: {
        alignItems: 'flex-start',
        padding: 20,
        backgroundColor: colors.content,
        alignSelf: 'flex-start',
        borderRadius: 50,
        margin: 10
    },
    newMatchBttnDark: {
        alignItems: 'flex-start',
        padding: 20,
        backgroundColor: colors.contentDark,
        alignSelf: 'flex-start',
        borderRadius: 50,
        margin: 10
    },
});

export default Landing;