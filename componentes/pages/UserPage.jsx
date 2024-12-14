import React from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de tener Ionicons instalado
import NavigationBar from '../NavigationBar';
const UserPage = ({ route }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Encabezado con icono de retroceso y título */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Mi Perfil</Text>
            </View>

            {/* Sección principal con información del perfil */}
            <ScrollView contentContainerStyle={styles.profileContent}>
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: 'https://example.com/user-avatar.png' }} // URL del avatar del usuario
                        style={styles.avatar}
                    />
                    <Text style={styles.username}>John Doe</Text>
                    <Text style={styles.info}>Correo: johndoe@example.com</Text>
                    <Text style={styles.info}>Teléfono: +1234567890</Text>
                    <Text style={styles.info}>Dirección: 123 Calle Falsa, Ciudad Ejemplo</Text>
                </View>

                {/* Botones de navegación */}
                <View style={styles.buttonContainer}>
                   
                    <View style={styles.buttonSpacing} />
                    <Button
                        title="Editar Perfil"
                        onPress={() => navigation.navigate('EditProfile')}
                        color="#03DAC5"
                    />
                    <View style={styles.buttonSpacing} />
                    <Button
                        title="Cerrar Sesión"
                        onPress={() => navigation.navigate('Login')}
                        color="#D32F2F"
                    />
                </View>
            </ScrollView>

     
            <NavigationBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 4,
        borderBottomColor: '#E0E0E0',
        marginVertical:30
    },
    backButton: {
        marginRight: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    profileContent: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#6200EE',
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    info: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    buttonContainer: {
        width: '90%',
        marginTop: 24,
    },
    buttonSpacing: {
        height: 16,
    },
    navbarContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    navbarIcon: {
        padding: 10,
    },
});

export default UserPage;