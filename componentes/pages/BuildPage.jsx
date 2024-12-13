import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import NavigationBar from '../NavigationBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../../src/services/supabaseClient';

const BuildPage = () => {
  const categories = ["Procesador", "Placa Madre", "RAM", "Tarjeta de Video", "Fuente de alimentación", "Almacenamiento", "Ventiladores", "Case"];
  const route = useRoute();
  const navigation = useNavigation();
  const [listOptions, setListOptions] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [isAddingNewList, setIsAddingNewList] = useState(false);
  const [newListName, setNewListName] = useState(""); //nuevo nombre de lista
  const [selectedComponents, setSelectedComponents] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [user, setUser] = useState(null);


//////Crear y guardar build en supabase,
const handleSaveBuild = async () => {
  try {
    if (!selectedList) {
      alert('Selecciona o crea una lista para guardar la build.');
      return;
    }

    if (Object.keys(selectedComponents).length === 0) {
      alert('No has añadido componentes a la build.');
      return;
    }

    // Insertar la build en la tabla 'builds' si es nueva
    let buildId = null;

    // Buscar si existe la build seleccionada
    const existingBuild = listOptions.find((list) => list.name === selectedList);
    if (existingBuild) {
      buildId = existingBuild.id;
    } else {
      // Crear una nueva build si no existe
      const { data: buildData, error: buildError } = await supabase
        .from('builds')
        .insert([{ name: selectedList, user_id: user.id }])
        .select('id')
        .single();

      if (buildError) throw buildError;

      buildId = buildData.id;
      setListOptions([...listOptions, { id: buildId, name: selectedList }]);
    }

    // Preparar componentes para guardar
    const buildComponents = Object.values(selectedComponents).map((component) => ({
      build_id: buildId,
      component_id: component.id,
      price: component.price,
    }));

    // Guardar componentes en la tabla 'build_components'
    const { error: componentsError } = await supabase
      .from('build_components')
      .insert(buildComponents);

    if (componentsError) throw componentsError;

    alert('¡Build guardada correctamente!');
    handleDiscardBuild(); // Limpiar después de guardar
  } catch (error) {
    console.error('Error al guardar la build:', error.message);
    alert('Hubo un problema al guardar la build.');
  }
};

/////



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

  //Limpiar todos los componentes
  const handleDiscardBuild = () => {
    setSelectedComponents({});
    setTotalCost(0);
  };
  
//////


  // Simulación de usuario autenticado
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  // Obtener las builds del usuario
  useEffect(() => {
    const fetchUserLists = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('builds')
          .select('id, name')
          .eq('user_id', user.id);
        if (error) {
          console.error('Error fetching user lists:', error.message);
        } else {
          setListOptions(data);
        }
      }
    };
    fetchUserLists();
  }, [user]);




//////

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


  const handleListSelect = (value) => {
    if (value === "nueva") {
      setIsAddingNewList(true);
    } else {
      setSelectedList(value);
    }
  };

  const handleAddNewList = async () => {
    if (newListName.trim()) {
      const { data, error } = await supabase
        .from('builds')
        .insert([{ name: newListName.trim(), user_id: user.id }])
        .select('*');

      if (error) {
        console.error('Error creating new list:', error.message);
      } else {
        setListOptions([...listOptions, ...data]);
        setSelectedList(data[0]?.name || "");
        setNewListName("");
        setIsAddingNewList(false);
        Keyboard.dismiss();
      }
    }
  };


  return (
    <View style={styles.container}>
      {/* Logo y barra de búsqueda */}
      <View style={styles.header}>
        <Image source={require('../../images/logo.png')} style={styles.logo} />
        <TextInput placeholder="Buscar componente, build o distribuidores" style={styles.searchInput} />
        <Image source={require('../../images/usuario.png')} style={styles.userIcon} />
      </View>

      {/* Sección para generar URL */}
      <View style={styles.shareSection}>
        <Text style={styles.shareText}>¡Comparte la build con tus amigos!</Text>
        <Text style={styles.linkText}>El enlace estará aquí</Text>
      </View>

      {/* Combo box para seleccionar lista */}
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
            <Picker.Item label="Selecciona una lista o crea una nueva" value="" />
            <Picker.Item label="Nueva lista..." value="nueva" />
            {listOptions.map((option) => (
              <Picker.Item key={option.id} label={option.name} value={option.name} />
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
              <View>
                <View>
                  <Text>{selectedComponents[category].name}</Text>
                  <Text style={{ fontWeight: 'bold', marginTop: 4 }}>${selectedComponents[category].price}</Text>
                </View>

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
               // onPress={() => navigation.navigate('BuildPageList', { categoryTitle: category, onSelectComponent:(component)=>{setSelectedComponent(component)} })}
                onPress={() => navigation.navigate('BuildPageList', { 
                categoryTitle: category, 
                selectedMotherboard: selectedComponents['Placa Madre'], // Pasa la placa madre seleccionada
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
          <Text style={styles.totalCostValue}>${totalCost}</Text>

          {/* Botones para guardar o descartar la build */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveBuild}>
              <Text style={styles.buttonText}>Guardar Build</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.discardButton} onPress={handleDiscardBuild}>
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
  },
  categoryBox: { padding: 15, backgroundColor: '#fff', marginVertical: 5 },
  categoryTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  addButton: { backgroundColor: '#e0e0e0', padding: 10, borderRadius: 5 },
  addButtonText: { textAlign: 'center', color: '#333' },
  removeButton: { backgroundColor: '#f44336', padding: 10, borderRadius: 5, marginTop: 5 },
  removeButtonText: { textAlign: 'center', color: '#fff' },
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
    backgroundColor: '#c2bae8',
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