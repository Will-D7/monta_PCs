import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Keyboard, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import NavigationBar from '../NavigationBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SearchBar } from 'react-native-screens';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BuildPage = () => {
  const categories = ["Procesador", "Placa Madre", "RAM", "GPU", "Fuente Poder", "Disco", "Ventilador", "Gabinete"];
  const route = useRoute();
  const navigation = useNavigation();
  
  const [listOptions, setListOptions] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [isAddingNewList, setIsAddingNewList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [selectedComponents, setSelectedComponents] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  // Cargar builds guardadas al montar el componente
  useEffect(() => {
    const loadSavedBuilds = async () => {
      try {
        const savedBuilds = await AsyncStorage.getItem('savedBuilds');
        if (savedBuilds) {
          const parsedBuilds = JSON.parse(savedBuilds);
          setListOptions(parsedBuilds.map(build => build.name));
        }
      } catch (error) {
        console.error('Error loading saved builds:', error);
      }
    };
    loadSavedBuilds();
  }, []);

  // Función para calcular el costo total
  const calculateTotalCost = () => {
    const total = Object.values(selectedComponents).reduce((sum, component) => {
      return sum + (component.price || 0);
    }, 0);
    setTotalCost(total);
  };

  useEffect(() => {
    calculateTotalCost();
  }, [selectedComponents]);

  // Limpiar todos los componentes
  const handleDiscardBuild = () => {
    setSelectedComponents({});
    setTotalCost(0);
    setSelectedList("");
  };

  // Si venimos de BuildPageList con un componente seleccionado
  const componentFromList = route?.params?.selectedComponent;
  const categoryTitle = route?.params?.categoryTitle;

  // Guardar el componente seleccionado en el estado
  if (componentFromList && categoryTitle) {
    setSelectedComponents((prevState) => {
      const updatedComponents = {
        ...prevState,
        [categoryTitle]: componentFromList,
      };
      return updatedComponents;
    });
    navigation.setParams({ selectedComponent: null, categoryTitle: null });
  }

  // Quitar componente seleccionado
  const handleRemoveComponent = (category) => {
    setSelectedComponents((prevState) => {
      const newState = { ...prevState };
      delete newState[category];
      return newState;
    });
  };

  // Manejar selección de lista o creación de nueva lista
  const handleListSelect = async (value) => {
    if (value === "nueva") {
      setIsAddingNewList(true);
      // Limpiar componentes seleccionados al crear nueva lista
      setSelectedComponents({});
      setTotalCost(0);
    } else {
      setSelectedList(value);
      
      // Cargar componentes de la build seleccionada
      try {
        const savedBuilds = await AsyncStorage.getItem('savedBuilds');
        if (savedBuilds) {
          const parsedBuilds = JSON.parse(savedBuilds);
          const selectedBuild = parsedBuilds.find(build => build.name === value);
          if (selectedBuild) {
            // Establecer los componentes de esta build específica
            setSelectedComponents(selectedBuild.components || {});
            
            // Recalcular el costo total basado en los componentes de esta build
            const total = Object.values(selectedBuild.components || {}).reduce((sum, component) => {
              return sum + (component.price || 0);
            }, 0);
            setTotalCost(total);
          }
        }
      } catch (error) {
        console.error('Error loading build:', error);
      }
    }
  };

  // Agregar nueva lista/build
  const handleAddNewList = async () => {
    if (newListName.trim()) {
      try {
        // Obtener builds guardadas
        const savedBuilds = await AsyncStorage.getItem('savedBuilds');
        const parsedBuilds = savedBuilds ? JSON.parse(savedBuilds) : [];

        // Verificar si ya existe una build con ese nombre
        const existingBuildIndex = parsedBuilds.findIndex(build => build.name === newListName.trim());
        
        if (existingBuildIndex !== -1) {
          Alert.alert('Error', 'Ya existe una build con este nombre');
          return;
        }

        // Guardar nueva build
        const newBuild = {
          name: newListName.trim(),
          components: {} // Inicializar con un objeto de componentes vacío
        };

        parsedBuilds.push(newBuild);
        
        await AsyncStorage.setItem('savedBuilds', JSON.stringify(parsedBuilds));
        
        // Actualizar estado
        setListOptions([...listOptions, newListName.trim()]);
        setSelectedList(newListName.trim());
        setSelectedComponents({}); // Limpiar los componentes seleccionados
        setNewListName("");
        setIsAddingNewList(false);
        Keyboard.dismiss();
      } catch (error) {
        console.error('Error saving build:', error);
        Alert.alert('Error', 'No se pudo guardar la build');
      }
    }
  };

  // Guardar build existente
  const handleSaveBuild = async () => {
    if (!selectedList) {
      Alert.alert('Error', 'Selecciona o crea una lista primero');
      return;
    }

    try {
      // Obtener builds guardadas
      const savedBuilds = await AsyncStorage.getItem('savedBuilds');
      const parsedBuilds = savedBuilds ? JSON.parse(savedBuilds) : [];

      // Encontrar y actualizar la build
      const buildIndex = parsedBuilds.findIndex(build => build.name === selectedList);
      
      if (buildIndex !== -1) {
        // Actualizar build existente
        parsedBuilds[buildIndex] = {
          name: selectedList,
          components: selectedComponents
        };
      } else {
        // Crear nueva build si no existe
        parsedBuilds.push({
          name: selectedList,
          components: selectedComponents
        });
      }

      // Guardar builds actualizadas
      await AsyncStorage.setItem('savedBuilds', JSON.stringify(parsedBuilds));
      
      Alert.alert('Éxito', 'Build guardada correctamente');
    } catch (error) {
      console.error('Error saving build:', error);
      Alert.alert('Error', 'No se pudo guardar la build');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
          <SearchBar />
        </TouchableOpacity>
        <Text style={styles.headerText}>Builds </Text>
      </View>

      <View style={styles.shareSection}>
        <Text style={styles.shareText}>¡Comparte la build con tus amigos!</Text>
        <Text style={styles.linkText}>El enlace estará aquí</Text>
      </View>

      <View style={styles.comboBoxContainer}>
        {isAddingNewList ? (
          <TextInput
            style={styles.newListInput}
            placeholder="Escribe el nombre de la nueva lista..."
            value={newListName}
            onChangeText={setNewListName}
            onSubmitEditing={handleAddNewList}
            autoFocus
          />
        ) : (
          <Picker selectedValue={selectedList} onValueChange={handleListSelect}>
            <Picker.Item label="Nombre de nueva lista..." value="nueva" />
            {listOptions.map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        )}
      </View>

      {/* Categorías con botones de "Añadir" */}
      <ScrollView style={styles.componentList}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryBox}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {selectedComponents[category] ? (
              <View style={styles.centeredComponentDetails}>
                <Image 
                  source={{ uri: selectedComponents[category].imgURL }} 
                  style={styles.componentImage} 
                />
                <Text style={styles.componentName}>{selectedComponents[category].name}</Text>
                <Text style={styles.componentPrice}>${selectedComponents[category].price}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveComponent(category)}
                >
                  <Text style={styles.removeButtonText}>Quitar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('BuildPageList', { 
                  categoryTitle: category, 
                  selectedMotherboard: selectedComponents['Placa Madre'], 
                  onSelectComponent: (component) => {
                    setSelectedComponents((prevState) => ({
                      ...prevState,
                      [category]: component,
                    }));
                  }
                })}
              >
                <Text style={styles.addButtonText}>+ Añadir</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Contenedor para el costo total */}
        <View style={styles.totalCostContainer}>
          <Text style={styles.totalCostText}>Costo Total</Text>
          <Text style={styles.totalCostValue}>${totalCost.toFixed(2)}</Text>

          {/* Botones para guardar o descartar la build */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={handleSaveBuild}
            >
              <Text style={styles.buttonText}>Guardar Build</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.discardButton} 
              onPress={handleDiscardBuild}
            >
              <Text style={styles.buttonText}>Descartar Build</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Barra de navegación en la parte inferior */}
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical:40,
    paddingBottom:20
  },
selectedComponentContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  padding: 15,
  backgroundColor: '#fff',
  marginVertical: 5,
},
centeredComponentDetails: {
  alignItems: 'center',
  marginBottom: 10,
},
componentImage: {
  width: 100,
  height: 100,
  borderRadius: 10,
  marginBottom: 10,
},
componentName: {
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 5,
},
componentPrice: {
  fontSize: 16,
  color: '#4a3b8f',
  fontWeight: 'bold',
  marginBottom: 10,
},
removeButton: {
  backgroundColor: '#f44336',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  width: '100%',
},
removeButtonText: {
  color: '#fff',
  fontSize: 16,
},
  categoryBox: { padding: 15, backgroundColor: '#fff', marginVertical: 5 },
  categoryTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  addButton: { backgroundColor: '#e0e0e0', padding: 10, borderRadius: 5 },
  addButtonText: { textAlign: 'center', color: '#333' },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: 40,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    backgroundColor: '#eee',
    borderRadius: 5,
    paddingLeft: 10,
  },
  userIcon: {
    width: 30,
    height: 30,
  },
  shareSection: {
    padding: 10,
    alignItems: 'center',
  },
  shareText: {
    fontSize: 14,
    color: '#555',
  },
  linkText: {
    color: '#0066cc',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  comboBoxContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  newListInput: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  componentList: {
    padding: 10,
    flex: 1,  // Hace que el ScrollView use el espacio disponible
  },
  categoryBox: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#333',
  },
  totalCostContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 70,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  totalCostText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  totalCostValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4a3b8f',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  discardButton: {
    flex: 1,
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default BuildPage;
