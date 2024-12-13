import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';

const users = [
  { id: '1', name: 'Juan Pérez', email: 'juan@example.com' },
  { id: '2', name: 'Ana Gómez', email: 'ana@example.com' },
  { id: '3', name: 'Carlos López', email: 'carlos@example.com' },
];

export default function GestionUsuarios({ navigation }) {
  const [userList, setUserList] = useState(users);

  const deleteUser = (id) => {
    Alert.alert(
      'Eliminar Usuario',
      '¿Estás seguro de que deseas eliminar este usuario?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => {
            setUserList(userList.filter((user) => user.id !== id));
            Alert.alert('Usuario eliminado', 'El usuario ha sido eliminado con éxito');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteUser(item.id)}
      >
        <Text style={styles.deleteText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Usuarios</Text>
      <FlatList
        data={userList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b2a7b',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  userCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e57373',
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
