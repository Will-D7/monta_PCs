import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import NavigationBar from '../NavigationBar';
import {componentsData } from '../dataComponents/componentsData';
import { useNavigation } from '@react-navigation/native';

const BuildPageList = ({ route }) => {
  const { categoryTitle } = route?.params || {};
  const navigation = useNavigation();

  const filteredComponents = componentsData.filter(
    (component) => component.category === categoryTitle
  );

  const handleAddComponent = (component) => {
    navigation.goBack(); // Regresar a BuildPage
    route.params?.onSelectComponent?.(component);
  };

  const renderComponent = ({ item }) => (
    <View style={styles.componentContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddComponent(item)}
        >
          <Text style={styles.addButtonText}>Añadir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{String(categoryTitle)}</Text>
      <FlatList
        data={filteredComponents}
        renderItem={renderComponent}
        keyExtractor={(item) => item.id.toString()}
      />
      </View>
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  componentContainer: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', marginVertical: 5 },
  image: { width: 60, height: 60 },
  infoContainer: { flex: 1, marginLeft: 10 },
  addButton: { backgroundColor: '#4caf50', padding: 10, borderRadius: 5, marginTop: 5 },
  addButtonText: { color: '#fff', textAlign: 'center' },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  componentContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a3b8f',
  },
  addButton: {
    marginTop: 5,
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default BuildPageList;