import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { View, StyleSheet } from 'react-native';

import SearchBar from './componentes/SearchBar';
import Categories from './componentes/Categories';
import ContentSection from './componentes/ContentSection';
import NavigationBar from './componentes/NavigationBar';
import BuildPage from './componentes/pages/BuildPage';
import BuildPageList from './componentes/pages/BuildPageList';

// Importaciones nuevas
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';

// Habilitar pantallas nativas
enableScreens();

const Stack = createStackNavigator();

const HomePage = () => {
  return (
    <View style={styles.container}>
      <SearchBar />
      <Categories />
      <ContentSection title="En oferta" products={enOfertaProducts} />
      <ContentSection title="Nuevo" products={nuevoProducts} />
      <NavigationBar />
    </View>
  );
};

const enOfertaProducts = [
  { title: 'ASUS ROG Strix B760-I Gaming WiFi', price: '450 Bs.' },
  { title: 'ASUS ROG Maximus Z790 HERO', price: '500 Bs.' },
];

const nuevoProducts = [
  { title: 'MSI MPG B550 Gaming Plus', price: 'E-ATX' },
];

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        {/* Rutas de login y registro */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Ruta para Home y demás vistas */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="BuildPage" component={BuildPage} />
        <Stack.Screen name="BuildPageList" component={BuildPageList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});

export default App;
