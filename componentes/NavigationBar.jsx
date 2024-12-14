import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavigationBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navigation}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('../images/casa.png')} style={styles.iconNav} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('BuildPage')}>
        <Image source={require('../images/lista.png')} style={styles.iconNav} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('UserPage')}>
        <Image source={require('../images/usuario.png')} style={styles.iconNav} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#4a3b8f',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 10,
  },
  iconNav: {
    width: 28,
    height: 28,
    tintColor: '#fff',
  },
});

export default NavigationBar;
