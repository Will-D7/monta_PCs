import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import SearchBar from '../../componentes/SearchBar';
import Categories from '../../componentes/Categories';
import ContentSection from '../../componentes/ContentSection';
import NavigationBar from '../../componentes/NavigationBar';

const nuevoProducts = [
  { title: 'MSI MPG B550 Gaming Plus', price: 'E-ATX' },
  { title: 'Asus ROG Strix B660', price: 'ATX' },
  { title: 'Asus ROG Strix B660', price: 'ATX' },
  { title: 'Asus ROG Strix B660', price: 'ATX' },
  { title: 'Asus ROG Strix B660', price: 'ATX' },
  { title: 'Asus ROG Strix B660', price: 'ATX' },
];
const sliderData = [
  { id: '1', imageUrl: 'https://static.cybertron.com/clx/kits/gmset0000001mk/gmset0000001mk-home-page.png' },
  { id: '2', imageUrl: 'https://www.digitalstorm.com/img/desktop-gaming-pcs.webp' },
  { id: '3', imageUrl: 'https://www.cyberpowerpc.com/images/cs/prism321v/cs-450-178_400.png' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <Categories />
      <View style={styles.sliderContainer}>
        {/* Slider */}
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
      <ContentSection title="Nuevos productos" products={nuevoProducts} />
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
    marginVertical: 10, // Reduce el espacio antes y después del slider
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

