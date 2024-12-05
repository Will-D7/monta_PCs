import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { uploadImages, saveComponentToDB } from '../src/services/uploadService';


const ComponentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    files: [],
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const pickFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        multiple: true,
      });
      if (result.type === 'success') {
        setFormData((prevData) => ({
          ...prevData,
          files: [...prevData.files, result],
        }));
      }
    } catch (error) {
      console.error('Error al seleccionar archivos:', error.message);
    }
  };

  const handleFormSubmit = async () => {
    if (!formData.name || !formData.price || !formData.description || formData.files.length === 0) {
      setStatusMessage('Por favor, completa todos los campos e incluye al menos una imagen.');
      return;
    }

    setStatusMessage('Subiendo datos, por favor espera...');
    try {
      // Subir imágenes al bucket
      const imgURLs = await uploadImages(formData.files.map((file) => file.file));

      // Crear el objeto del componente
      const componentData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        imgURLs,
      };

      // Guardar el componente en la base de datos
      await saveComponentToDB(componentData);
      setStatusMessage('¡Componente guardado exitosamente!');

      // Reiniciar el formulario
      setFormData({
        name: '',
        price: '',
        description: '',
        files: [],
      });
    } catch (error) {
      setStatusMessage('Ocurrió un error al guardar el componente. Por favor, inténtalo de nuevo.');
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del Componente</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. ASUS ROG Strix"
        value={formData.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />

      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 450"
        value={formData.price}
        keyboardType="numeric"
        onChangeText={(value) => handleInputChange('price', value)}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Placa madre de alto rendimiento"
        value={formData.description}
        onChangeText={(value) => handleInputChange('description', value)}
      />

      <Button title="Seleccionar Imágenes" onPress={pickFiles} />
      <Text>{`Imágenes seleccionadas: ${formData.files.length}`}</Text>

      <Button title="Guardar Componente" onPress={handleFormSubmit} />

      {statusMessage && <Text style={styles.statusMessage}>{statusMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  statusMessage: {
    marginTop: 20,
    color: 'green',
    fontSize: 16,
  },
});

export default ComponentForm;
