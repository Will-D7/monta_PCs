import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground 
      source={require('../../assets/1366_2000.jpeg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>BIENVENIDO!</Text>

        <TextInput placeholder="Correo electrónico" style={styles.input} />
        <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry />

        {/* Botón de iniciar sesión que redirige directamente a HomePage */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('HomePage')}
        >
          <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
        </TouchableOpacity>

        {/* Botón para redirigir a la pantalla de registro */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>¿No tienes cuenta? Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fondo semi-transparente
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4b2a7b',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
    color: '#4b2a7b',
    textAlign: 'center',
  },
});
