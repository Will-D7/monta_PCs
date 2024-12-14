// Listado de productos (GestionProductos.tsx)
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const GestionProductos = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [productos, setProductos] = useState([]);

  useEffect(() => {

    setProductos([
      { id: '1', nombre: 'Mouse Gamer RGB', descripcion: 'Mouse con iluminación RGB personalizable', precio: 35, cantidad: 20, tipo: 'Periférico' },
      { id: '2', nombre: 'Teclado Mecánico', descripcion: 'Teclado con switches mecánicos y retroiluminación', precio: 75, cantidad: 15, tipo: 'Periférico' },
      { id: '3', nombre: 'Monitor Full HD', descripcion: 'Monitor de 24 pulgadas con resolución Full HD', precio: 150, cantidad: 10, tipo: 'Periférico' },
      { id: '4', nombre: 'Gabinete con Ventana de Cristal', descripcion: 'Gabinete ATX con panel lateral de cristal templado', precio: 80, cantidad: 8, tipo: 'Gabinete' },
      { id: '5', nombre: 'Procesador Intel i7', descripcion: 'Procesador Intel Core i7 de 10ª generación', precio: 300, cantidad: 5, tipo: 'Procesador' },
    ]);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Agregar un nuevo producto
      if (route.params?.nuevoProducto) {
        setProductos((prevProductos) => [route.params.nuevoProducto, ...prevProductos]);
      }

      // Actualizar producto existente
      if (route.params?.productoActualizado) {
        const productoActualizado = route.params.productoActualizado;
        setProductos((prevProductos) =>
          prevProductos.map((prod) =>
            prod.id === productoActualizado.id ? productoActualizado : prod
          )
        );
      }
    });

    return unsubscribe;
  }, [navigation, route.params?.nuevoProducto, route.params?.productoActualizado]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Productos</Text>
      
      <FlatList
        data={productos}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductoDetalles', { producto: item })}
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
