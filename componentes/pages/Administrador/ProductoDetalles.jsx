// Detalles del producto (ProductoDetalles.tsx)
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProductoDetalles = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productoId } = route.params;
  
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    consumo: '',
    tipo: '',
    imagen: null,
  });

  useEffect(() => {
    
    setProducto({
      nombre: 'Producto ' + productoId,
      descripcion: 'Descripción del producto ' + productoId,
      precio: '100',
      consumo: '5',
      tipo: 'Electrónico',
      imagen: null, 
    });
  }, [productoId]);

  const handleSave = () => {

    console.log('Producto actualizado', producto);
  };

  const handleDelete = () => {

    console.log('Producto eliminado', productoId);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Producto</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={producto.tipo}
        onChangeText={(text) => setProducto({ ...producto, tipo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={producto.nombre}
        onChangeText={(text) => setProducto({ ...producto, nombre: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={producto.descripcion}
        onChangeText={(text) => setProducto({ ...producto, descripcion: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={producto.precio}
        onChangeText={(text) => setProducto({ ...producto, precio: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Consumo"
        keyboardType="numeric"
        value={producto.consumo}
        onChangeText={(text) => setProducto({ ...producto, consumo: text })}
      />

      <TouchableOpacity style={styles.imageButton}>
        <Text style={styles.buttonText}>Subir Imagen</Text>
      </TouchableOpacity>

  
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Eliminar Producto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4b2a7b',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: '#4b2a7b',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#4b2a7b',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductoDetalles;
