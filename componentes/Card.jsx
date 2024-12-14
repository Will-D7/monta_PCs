import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ title, price, imageUrl }) => (
  <View style={styles.card}>
    {imageUrl && (
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.cardImage} 
        resizeMode="cover"
      />
    )}
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardPrice}>{price}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginBottom: 15,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  cardPrice: {
    fontSize: 12,
    color: '#666',
  },
});

export default Card;