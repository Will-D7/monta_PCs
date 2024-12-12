import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '../../componentes/SearchBar';
import Categories from '../../componentes/Categories';
import ContentSection from '../../componentes/ContentSection';
import NavigationBar from '../../componentes/NavigationBar';

// Datos de ejemplo para productos nuevos
const nuevoProducts = [
  { title: 'MSI MPG B550 Gaming Plus', price: 'E-ATX' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <SearchBar />

      {/* Categorías */}
      <Categories />

      {/* Sección de contenido */}
      <ContentSection title="Nuevo" products={nuevoProducts} />

      {/* Barra de navegación */}
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
