import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

const SearchBar = () => (
  <View style={styles.searchBar}>
    <Image source={require('../images/lupa.png')} style={styles.icon} />
    <TextInput placeholder="Buscar..." style={styles.searchInput} />
   
  </View>
);

const styles = StyleSheet.create({
  searchBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:45,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
    borderRadius: 30,
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
