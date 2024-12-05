import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signUp } from '../services/authService'; // Asegúrate de importar la función signUp

export default function RegisterScreen() {
  const [email, setEmail] = useState(''); // Estado para el email
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const navigation = useNavigation();

  const handleRegister = async () => {
    // Llamamos a la función signUp de supabase
    const user = await signUp(email, password);

    if (user) {
      // Si el registro fue exitoso, navega a la pantalla de login
      navigation.navigate('Login');
      Alert.alert("¡Registro exitoso!", "Ahora puedes iniciar sesión.");
    } else {
      // Si hubo un error, muestra el mensaje de error
      Alert.alert("Error", "Hubo un problema con el registro.");
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/1366_2000.jpeg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>REGISTRARSE</Text>
        <TextInput 
          placeholder="Correo electrónico" 
          style={styles.input} 
          value={email} 
          onChangeText={setEmail} // Actualiza el estado del email
        />
        <TextInput 
          placeholder="Contraseña" 
          style={styles.input} 
          secureTextEntry 
          value={password} 
          onChangeText={setPassword} // Actualiza el estado de la contraseña
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>CREAR CUENTA</Text>
        </TouchableOpacity>
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
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { marginTop: 10, color: '#4b2a7b', textAlign: 'center' },
});
