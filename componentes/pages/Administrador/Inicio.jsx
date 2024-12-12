import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AdminInicio({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administrador</Text>

      {/* Opciones de administrador */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GestionProductos')}>
        <Text style={styles.buttonText}>Gestionar Productos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GestionUsuarios')}>
        <Text style={styles.buttonText}>Gestionar Usuarios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4b2a7b',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
