import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signUp } from '../services/authService'; // función signUp
import { supabase } from '../services/supabaseClient';

export default function RegisterScreen() {
  const [email, setEmail] = useState(''); // Estado para el email
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false); //estado del boton, evitar errores de doble solicitud

  const handleRegister = async () => {
    if(password !== confirmPassword){
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    setIsSubmitting(true);
    const { user, error } = await signUp(email, password); //servicio de registro
    setIsSubmitting(false);

    if(error){
      Alert.alert('Error', error.message);
    }else{
      Alert.alert('Exito', 'Usuario registrado correctamente, puede Iniciar sesión');
      navigation.navigate('Login'); //REDIRIGE A LOGIN
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
        
        <TextInput  //Confirmar contraseña
          placeholder="Confirmar Contraseña"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity 
          style={[styles.button, isSubmitting && styles.buttonDisabled]} 
          onPress={handleRegister}
          disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Registrando...': 'CREAR CUENTA'}
            </Text>
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
