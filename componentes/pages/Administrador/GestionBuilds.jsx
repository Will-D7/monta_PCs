import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const builds = [
  { id: '1', name: 'Build Gaming PC', components: 'CPU: i7, GPU: RTX 3080, RAM: 16GB' },
  { id: '2', name: 'Build Office PC', components: 'CPU: i5, GPU: GTX 1650, RAM: 8GB' },
  { id: '3', name: 'Build Budget PC', components: 'CPU: Ryzen 5, GPU: RX 570, RAM: 8GB' },
];

export default function GestionBuilds() {
  const [buildList, setBuildList] = useState(builds);

  const renderItem = ({ item }) => (
    <View style={styles.buildCard}>
      <Text style={styles.buildTitle}>{item.name}</Text>
      <Text style={styles.buildComponents}>{item.components}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Builds</Text>
      <FlatList
        data={buildList}
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
  buildCard: {
    backgroundColor: '#e1f5fe',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  buildTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buildComponents: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
});
