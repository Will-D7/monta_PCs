import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';

const ContentSection = ({ title, products }) => (
  <View>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.cardContainer}>
      {products.map((product, index) => (
        <Card key={index} title={product.title} price={product.price} />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    marginVertical: 15,
    color: '#333',
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ContentSection;
