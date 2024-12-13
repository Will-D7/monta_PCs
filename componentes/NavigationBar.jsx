import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavigationBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navigation}>
      <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#4a3b8f',
  },
  iconNav: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});

export default NavigationBar;
