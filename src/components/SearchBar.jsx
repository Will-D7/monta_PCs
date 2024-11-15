import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

const SearchBar = () => (
  <View style={styles.searchBar}>
    <Image source={require('../images/lupa.png')} style={styles.icon} />
    <TextInput placeholder="Buscar..." style={styles.searchInput} />
    <Image source={require('../images/campana.png')} style={styles.icon} />
  </View>
);

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#aaa',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
  },
});

export default SearchBar;
