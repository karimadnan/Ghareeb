import React from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import NavigationBar from '../components/navigationBar';
import { colors } from "../lib/constants";
import useSettingsStore from '../store/useSettingsStore';

const Settings = ({ navigation }) => {
    const darkMode = useSettingsStore(state => state.darkMode)
    const setDarkMode = useSettingsStore(state => state.toggleDarkMode)

    return (
        <View style={darkMode ? styles.rootDark : styles.root}>
            <NavigationBar navigation={navigation} title={'Settings'} />
            <View style={darkMode ? styles.settingRowDark : styles.settingRow}>
                <Text style={darkMode ? styles.settingTextDark : styles.settingText}>Dark Mode</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#3366ff" }}
                    thumbColor={darkMode ? "#AAAAAA" : "#f5dd4b"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setDarkMode}
                    value={darkMode}
                />
            </View>
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
    navBar: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    navText: {
        color: colors.secondary,
        fontWeight: 'bold',
        fontSize: 20
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.content
    },
    settingRowDark: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: colors.borderDark,
        backgroundColor: colors.contentDark,
    },
    settingText: {
        fontSize: 20,
        color: colors.textHome
    },
    settingTextDark: {
        fontSize: 20,
        color: colors.text
    }
});

export default Settings;