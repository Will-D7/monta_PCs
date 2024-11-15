import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const categories = ['Placa Madre', 'Procesador', 'RAM', 'Case', 'Almacenamiento', 'Ventiladores', 'Tarjeta de video', 'Fuente de alimentación'];

const Categories = () => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
    {categories.map((category, index) => (
      <Text key={index} style={styles.categoryText}>{category}</Text>
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  categoryText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default Categories;
