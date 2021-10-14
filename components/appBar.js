import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { colors } from '../lib/constants';

const appBar = ({ navigation }) => {

    const gotoSettings = () => {
        navigation.navigate('Settings');
    };

    return (
        <View style={Platform.OS === 'ios' ? styles.rootIos : styles.rootAndroid}>
            <Pressable>
                <Text style={styles.title}>Test</Text>
            </Pressable>
            <TouchableOpacity onPress={gotoSettings}>
                <Octicons name="gear" size={27} color="white" />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    rootAndroid: {
        height: 60,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.primary
    },
    rootIos: {
        height: 70,
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.primary
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default appBar;