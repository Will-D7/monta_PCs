import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { crearComponenteService, obtenerAtributosEspecificos } from './cargaService';

const CrearProducto = () => {
  const navigation = useNavigation();
  
  const [producto, setProducto] = useState({
    tipo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    consumo: '',
    atributos: {},
    imagenURL: ''
  });

  const [atributosEspecificos, setAtributosEspecificos] = useState([]);

  const categories = [
    "Procesador", 
    "Placa Madre", 
    "RAM", 
    "GPU", 
    "Fuente Poder", 
    "Disco", 
    "Ventilador", 
    "Gabinete"
  ];

  useEffect(() => {
    // Obtener atributos específicos cuando cambia el tipo
    if (producto.tipo) {
      const atributos = obtenerAtributosEspecificos(producto.tipo);
      setAtributosEspecificos(atributos);
      // Resetear atributos específicos
      setProducto(prev => ({ ...prev, atributos: {} }));
    }
  }, [producto.tipo]);

  const handleAtributoChange = (nombre, value) => {
    setProducto(prev => ({
      ...prev, 
      atributos: { 
        ...prev.atributos, 
        [nombre]: value 
      }
    }));
  };

  const renderCamposEspecificos = () => {
    return atributosEspecificos.map((atributo, index) => (
      <TextInput
        key={index}
        style={styles.input}
        placeholder={atributo.nombre}
        value={producto.atributos[atributo.nombre] || ''}
        onChangeText={(text) => handleAtributoChange(atributo.nombre, text)}
        keyboardType={atributo.tipo === 'numero' || atributo.tipo === 'decimal' ? 'numeric' : 'default'}
      />
    ));
  };

  const handleCreate = async () => {
    try {
      const productoParaGuardar = {
        ...producto,
        precio: parseFloat(producto.precio),
        consumo: parseInt(producto.consumo),
        atributos: producto.atributos
      };
  
      try {
        const nuevoComponente = await crearComponenteService(productoParaGuardar);
        
        if (nuevoComponente) {
          navigation.navigate('GestionProductos', { nuevoProducto: nuevoComponente });
        } else {
          throw new Error('No se pudo crear el componente');
        }
      } catch (supabaseError) {
        console.error('Supabase Error:', supabaseError);
        Alert.alert('Error', `No se pudo crear el producto: ${supabaseError.message}`);
      }
    } catch (error) {
      console.error('Error general:', error);
      Alert.alert('Error', `Ocurrió un error inesperado: ${error.message}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Componente</Text>
      
      <Picker
        selectedValue={producto.tipo}
        onValueChange={(itemValue) => setProducto({ ...producto, tipo: itemValue })}
        style={styles.input}
      >
        <Picker.Item label="Seleccione un tipo" value="" />
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category} value={category} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={producto.nombre}
        onChangeText={(text) => setProducto({ ...producto, nombre: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={producto.descripcion}
        onChangeText={(text) => setProducto({ ...producto, descripcion: text })}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={producto.precio}
        onChangeText={(text) => setProducto({ ...producto, precio: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Consumo (W)"
        keyboardType="numeric"
        value={producto.consumo}
        onChangeText={(text) => setProducto({ ...producto, consumo: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="URL de Imagen"
        value={producto.imagenURL}
        onChangeText={(text) => setProducto({ ...producto, imagenURL: text })}
      />

      {/* Campos específicos según el tipo de producto */}
      {producto.tipo && renderCamposEspecificos()}

      <TouchableOpacity 
        style={styles.createButton} 
        onPress={handleCreate}
      >
        <Text style={styles.buttonText}>Crear Componente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff', 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#4b2a7b', 
  },
  input: { 
    backgroundColor: '#f0f0f0', 
    borderRadius: 8, 
    padding: 15, 
    marginBottom: 15, 
    fontSize: 16, 
  },
  createButton: { 
    backgroundColor: '#4b2a7b', 
    padding: 15, 
    alignItems: 'center', 
    borderRadius: 8, 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
  },
});

export default CrearProducto;