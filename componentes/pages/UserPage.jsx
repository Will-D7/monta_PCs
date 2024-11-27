import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import NavigationBar from '../NavigationBar';
import { useNavigation } from '@react-navigation/native';

const UserPage = ({route}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* Logo y barra de búsqueda */}
            

            
            <Text style={styles.title}>Perfil de Usuario</Text>
            <Button
                    title="Añadir Nuevo Componente"
                    onPress={() => navigation.navigate('NewComponentForm')} // Navegar al formulario
                />
            {/* Opciones comunes para todos los usuarios */}
            <Button
                title="Ver Builds Guardadas"
                onPress={() => navigation.navigate('BuildsList')}
            />

            <NavigationBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 16,
    },
});

export default UserPage;