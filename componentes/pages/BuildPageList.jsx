import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import NavigationBar from '../NavigationBar';
import { supabase } from '../../src/services/supabaseClient';
import { useNavigation } from '@react-navigation/native';

const BuildPageList = ({ route }) => {
  const { categoryTitle } = route?.params || {};
  const navigation = useNavigation();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  const fetchComponents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('componente') 
        .select('id_componente, nombre, descripcion, atributos, imagenurl, precio') // Seleccionamos los campos necesarios
        .eq('tipo', categoryTitle); 
  
      if (error) throw error;
  
      // Mapeamos los datos para facilitar su uso en el renderizado
      const formattedData = data.map((item) => ({
        id: item.id_componente,
        name: item.nombre,
        description: item.descripcion,
        price: item.precio,
        imgURL: item.imagenurl,
      }));
  
      setComponents(formattedData || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    
    fetchComponents();
  },[categoryTitle]);

  const handleAddComponent = (component) => {
    navigation.goBack(); // Regresar a BuildPage
    route.params?.onSelectComponent?.({
      id: component.id, // id del componente
      name: component.name, // nombre del componente
      price: component.price, // precio del componente
      description: component.description, // descripción
      imgURL: component.imgURL, // URL de la imagen
    });
  };
  

  const renderComponent = ({ item }) => (
    <View style={styles.componentContainer}>
      <Image source={{ uri: item.imgURL }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddComponent(item)}
        >
          <Text style={styles.addButtonText}>Añadir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4a3b8f" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{String(categoryTitle)}</Text>
        <FlatList
          data={components}
          renderItem={renderComponent}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  componentContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a3b8f',
  },
  addButton: {
    marginTop: 5,
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BuildPageList;