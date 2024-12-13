import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '../../componentes/SearchBar';
import Categories from '../../componentes/Categories';
import ContentSection from '../../componentes/ContentSection';
import NavigationBar from '../../componentes/NavigationBar';


const nuevoProducts = [
  { title: 'MSI MPG B550 Gaming Plus', price: 'E-ATX' },
];

export default function HomeScreen() {
  return (
    <ImageBackground 
      source={require('../../assets/1366_2000.jpeg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido a PComponentes</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});