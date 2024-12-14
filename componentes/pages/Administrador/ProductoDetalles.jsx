import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProductoDetalles = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { producto } = route.params;

  const [productoEditado, setProductoEditado] = useState({ ...producto });

  const handleSave = () => {
    console.log('Producto actualizado', productoEditado);
    navigation.navigate('GestionProductos', { productoActualizado: productoEditado });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Producto</Text>

      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={productoEditado.tipo}
        onChangeText={(text) => setProductoEditado({ ...productoEditado, tipo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={productoEditado.nombre}
        onChangeText={(text) => setProductoEditado({ ...productoEditado, nombre: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={productoEditado.descripcion}
        onChangeText={(text) => setProductoEditado({ ...productoEditado, descripcion: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={productoEditado.precio.toString()}
        keyboardType="numeric"
        onChangeText={(text) =>
          setProductoEditado({ ...productoEditado, precio: parseFloat(text) || 0 })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        value={productoEditado.cantidad.toString()}
        keyboardType="numeric"
        onChangeText={(text) =>
          setProductoEditado({ ...productoEditado, cantidad: parseInt(text) || 0 })
        }
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
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
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
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

export default ProductoDetalles;
