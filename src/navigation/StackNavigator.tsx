import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import BuildPage from '../../componentes/pages/BuildPage';
import UserPage from '../../componentes/pages/UserPage';
import NewComponentForm from '../../componentes/NewComponentForm';
import BuildPageList from '../../componentes/pages/BuildPageList';
import AdminInicio from '../../componentes/pages/Administrador/Inicio';
import GestionProductos from '../../componentes/pages/Administrador/GestionProductos ';
import ProductoDetalles from '../../componentes/pages/Administrador/ProductoDetalles';
import CrearProducto from '../../componentes/pages/Administrador/CrearProducto';
import GestionUsuarios from '../../componentes/pages/Administrador/GestionUsuarios';
import GestionBuilds from '../../componentes/pages/Administrador/GestionBuilds';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

 
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BuildPage" component={BuildPage} />
      <Stack.Screen name="BuildPageList" component={BuildPageList} />
      <Stack.Screen name="UserPage" component={UserPage} />
      <Stack.Screen name="NewComponentForm" component={NewComponentForm} />
      <Stack.Screen name="AdminInicio" component={AdminInicio} />
      <Stack.Screen name="GestionProductos" component={GestionProductos} />
      <Stack.Screen name="ProductoDetalles" component={ProductoDetalles} />
      <Stack.Screen name="CrearProducto" component={CrearProducto} />
      <Stack.Screen name="GestionUsuarios" component={GestionUsuarios} />
      <Stack.Screen name="GestionBuilds" component={GestionBuilds} />
    </Stack.Navigator>
  );
}