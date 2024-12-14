import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Card from './Card';

const ContentSection = ({ 
  title = "Productos", 
  products = [], 
  loading = false 
}) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.cardContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : products.length > 0 ? (
        products.map((product, index) => (
          <Card 
            key={product.id || index} 
            title={product.title} 
            price={product.price} 
            imageUrl={product.imageUrl}
          />
        ))
      ) : (
        <Text>No hay productos disponibles</Text>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 15,
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
});

export default ContentSection;