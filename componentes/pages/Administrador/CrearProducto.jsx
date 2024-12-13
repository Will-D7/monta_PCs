// Crear producto (CrearProducto.tsx)
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CrearProducto = () => {
  const navigation = useNavigation();
  const [producto, setProducto] = useState({
    tipo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    consumo: '',
    imagen: null,
  });

  const handleCreate = () => {

    console.log('Producto creado', producto);
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Producto</Text>
      
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

      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.buttonText}>Crear Producto</Text>
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
  createButton: {
    backgroundColor: '#4b2a7b',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CrearProducto;
