import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';

const ContentSection = ({ title, products }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.cardContainer}>
      {products.map((product, index) => (
        <Card key={index} title={product.title} price={product.price} />
      ))}
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
