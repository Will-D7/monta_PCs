import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import NavigationBar from '../../NavigationBar';

export default function AdminInicio({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administrador</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
   
        <TouchableOpacity
          style={[styles.card, styles.productCard]}
          onPress={() => navigation.navigate('GestionProductos')}
        >
          <Text style={styles.cardTitle}>Gestionar Productos</Text>
          <Text style={styles.cardDescription}>Añadir, editar o eliminar productos.</Text>
        </TouchableOpacity>

   
        <TouchableOpacity
          style={[styles.card, styles.userCard]}
          onPress={() => navigation.navigate('GestionUsuarios')}
        >
          <Text style={styles.cardTitle}>Gestionar Usuarios</Text>
          <Text style={styles.cardDescription}>Administrar los usuarios del sistema.</Text>
        </TouchableOpacity>

  
        <TouchableOpacity
          style={[styles.card, styles.buildCard]}
          onPress={() => navigation.navigate('GestionBuilds')}
        >
          <Text style={styles.cardTitle}>Gestión de Builds</Text>
          <Text style={styles.cardDescription}>Crea y gestiona configuraciones de PC.</Text>
        </TouchableOpacity>
      </ScrollView>
      
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4b2a7b',
    marginBottom: 30,
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  productCard: {
    backgroundColor: '#e1bee7', // Morado claro
  },
  userCard: {
    backgroundColor: '#ffcc80', // Naranja claro
  },
  buildCard: {
    backgroundColor: '#c5e1a5', // Verde claro
  },
});
