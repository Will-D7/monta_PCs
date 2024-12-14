import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

const categories = ['Placa Madre', 'Procesador', 'RAM', 'Case', 'Almacenamiento', 'Ventiladores', 'Tarjeta de video', 'Fuente de alimentación'];

const Categories = () => (
  <View style={styles.categoryWrapper}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
      {categories.map((category, index) => (
        <View key={index} style={styles.categoryItem}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  categoryWrapper: {
    paddingVertical: 30,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryItem: {
    backgroundColor: '#4a3b8f',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Categories;
