import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import SearchBar from '../../componentes/SearchBar';
import Categories from '../../componentes/Categories';
import ContentSection from '../../componentes/ContentSection';
import NavigationBar from '../../componentes/NavigationBar';
import { obtenerComponentesDestacados } from '../services/homeService';

const sliderData = [
  { id: '1', imageUrl: 'https://static.cybertron.com/clx/kits/gmset0000001mk/gmset0000001mk-home-page.png' },
  { id: '2', imageUrl: 'https://www.digitalstorm.com/img/desktop-gaming-pcs.webp' },
  { id: '3', imageUrl: 'https://www.cyberpowerpc.com/images/cs/prism321v/cs-450-178_400.png' },
];

export default function HomeScreen() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const componentesDestacados = await obtenerComponentesDestacados();
        setProductos(componentesDestacados);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar />
      <Categories />
      <View style={styles.sliderContainer}>
        <FlatList
          data={sliderData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.sliderItem}>
              <Image source={{ uri: item.imageUrl }} style={styles.sliderImage} />
            </View>
          )}
          keyExtractor={item => item.id}
          pagingEnabled
        />
      </View>
      <ContentSection 
        title="Nuevos productos" 
        products={productos} 
        loading={loading}
      />
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 10,
    paddingVertical: 90,
  },
  sliderContainer: {
    marginVertical: 10,
  },
  sliderItem: {
    width: 300,
    height: 180,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});