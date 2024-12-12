// Listado de productos (GestionProductos.tsx)
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GestionProductos = () => {
  const navigation = useNavigation();
  const [productos, setProductos] = useState([]);

  useEffect(() => {

    setProductos([
      { id: '1', nombre: 'Producto 1' },
      { id: '2', nombre: 'Producto 2' },
      { id: '3', nombre: 'Producto 3' },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Productos</Text>
      
      <FlatList
        data={productos}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductoDetalles', { productoId: item.id })}
          >
            <Text style={styles.productText}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CrearProducto')}
      >
        <Text style={styles.buttonText}>Crear Producto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4b2a7b',
    textAlign: 'center',
  },
  productCard: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  productText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b2a7b',
  },
  createButton: {
    backgroundColor: '#4b2a7b',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GestionProductos;
