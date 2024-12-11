import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmail } from '../services/authService'; // Asegúrate de que la ruta sea correcta

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa todos los campos.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Llamada a la función de inicio de sesión
      const { user } = await signInWithEmail(email, password);

      setIsSubmitting(false);

      if (user) {
        Alert.alert('Éxito', 'Inicio de sesión exitoso.');
        navigation.navigate('Home'); // 'Home' stack de navegación o cambiar
      }
    } catch (error) {
      setIsSubmitting(false);

      // Captura el mensaje de error específico
      let errorMessage = 'Error al iniciar sesión.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'El correo electrónico no está registrado.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'La contraseña es incorrecta.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Formato de correo inválido.';
      }
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/1366_2000.jpeg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>INICIAR SESIÓN</Text>

        {/* Campo para el correo electrónico */}
        <TextInput
          placeholder="Correo electrónico"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Campo para la contraseña */}
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Botón para iniciar sesión */}
        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Iniciando sesión...' : 'INICIAR SESIÓN'}
          </Text>
        </TouchableOpacity>

        {/* Enlace para ir a la pantalla de registro */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
  buttonDisabled: {
    backgroundColor: '#7a7a7a',
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
