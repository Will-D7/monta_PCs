import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import BuildPage from '../../componentes/pages/BuildPage';
import UserPage from '../../componentes/pages/UserPage';
import NewComponentForm from '../../componentes/NewComponentForm';
import BuildPageList from '../../componentes/pages/BuildPageList';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      {/* Rutas de autenticación */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Rutas principales */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BuildPage" component={BuildPage} />
      <Stack.Screen name="BuildPageList" component={BuildPageList} />
      <Stack.Screen name="UserPage" component={UserPage} />
      <Stack.Screen name="NewComponentForm" component={NewComponentForm} />
    </Stack.Navigator>
  );
}
