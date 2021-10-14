import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../lib/constants';

const NavigationBar = ({ navigation, children, title }) => {

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={Platform.OS === 'ios' ? styles.rootIos : styles.rootAndroid}>
            <TouchableOpacity onPress={handleBack} style={styles.goBack}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
                {title && <Text style={styles.navText}>{title}</Text>}
            </TouchableOpacity>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    rootAndroid: {
        height: 60,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: colors.primary
    },
    rootIos: {
        height: 70,
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: colors.primary
    },
    goBack: {
        flexDirection: 'row'
    },
    navText: {
        color: colors.secondary,
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default NavigationBar;