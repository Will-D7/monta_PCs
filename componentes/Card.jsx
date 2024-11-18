import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, price }) => (
  <View style={styles.card}>
    <View style={styles.imagePlaceholder} />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardPrice}>{price}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd',
    borderRadius: 50,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  cardPrice: {
    fontSize: 14,
    color: '#666',
  },
});

export default Card;
