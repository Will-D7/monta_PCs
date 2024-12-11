import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signUp } from '../services/authService'; // Importa la función signUp

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el botón de registro

  const handleRegister = async () => {
    // Validar contraseñas
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Deshabilitar botón durante la solicitud
    setIsSubmitting(true);

    // Llamada a la función signUp del servicio
    const { error, success } = await signUp(username, email, password);

    setIsSubmitting(false);

    if (error) {
      Alert.alert('Error', error.message || 'Error al registrar el usuario.');
    } else if (success) {
      Alert.alert('Éxito', 'Usuario registrado correctamente. ¡Inicia sesión!');
      navigation.navigate('Login'); // Redirige a la pantalla de inicio de sesión
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/1366_2000.jpeg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>REGISTRARSE</Text>

        {/* Campo para el nombre de usuario */}
        <TextInput
          placeholder="Nombre de Usuario"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        {/* Campo para el correo electrónico */}
        <TextInput 
          placeholder="Correo electrónico" 
          style={styles.input} 
          value={email} 
          onChangeText={setEmail} 
        />

        {/* Campo para la contraseña */}
        <TextInput 
          placeholder="Contraseña" 
          style={styles.input} 
          secureTextEntry 
          value={password} 
          onChangeText={setPassword}
        />

        {/* Campo para confirmar la contraseña */}
        <TextInput 
          placeholder="Confirmar Contraseña"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Botón para crear cuenta */}
        <TouchableOpacity 
          style={[styles.button, isSubmitting && styles.buttonDisabled]} 
          onPress={handleRegister}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? 'Registrando...' : 'CREAR CUENTA'}
          </Text>
        </TouchableOpacity>

        {/* Enlace para iniciar sesión */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>¿Ya tienes cuenta? Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'rgba(0, 0, 0, 0.4)' }, 
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#fff' },
  input: { borderBottomWidth: 1, marginBottom: 20, padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)' },
  button: { backgroundColor: '#4b2a7b', padding: 15, alignItems: 'center', borderRadius: 5 },
  buttonDisabled: { backgroundColor: '#7a6a95' }, // Botón deshabilitado
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { marginTop: 10, color: '#4b2a7b', textAlign: 'center' },
});
