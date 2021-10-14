import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import ChatRoom from './screens/chatRoom';
import Landing from './screens/landing';
import InterestsHandler from './components/interestsHandler';
import SocketHandler from './components/socketHandler';
import Settings from './components/settings';
import { colors } from './lib/constants';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.root}>

      <StatusBar
        animated={true}
        backgroundColor={colors.statusBar}
        barStyle={'light-content'}
      />
      <SocketHandler />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: true
        }}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="InterestsHandler" component={InterestsHandler} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Chat" component={ChatRoom} />
        </Stack.Navigator>
      </NavigationContainer>

    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
});
export default App;