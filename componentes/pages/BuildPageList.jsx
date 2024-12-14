import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Modal, Button } from 'react-native';
import NavigationBar from '../NavigationBar';
import { supabase } from '../../src/services/supabaseClient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { 
  obtenerRAMCompatible, 
  obtenerProcesadoresCompatibles, 
  obtenerDiscosCompatibles 
} from '../../src/services/filterComponents';

const BuildPageList = () => {
  const route = useRoute();
  const { categoryTitle, selectedMotherboard } = route?.params || {};
  const navigation = useNavigation();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [componentDetails, setComponentDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const mapCategories = {
    "Fuente Poder": "Fuente_Poder"
  };
  const fetchComponents = async () => {
    try {
      console.log("Categoría:", categoryTitle);
      console.log("Placa madre seleccionada:", selectedMotherboard);
      setLoading(true);
      
      // Variable para almacenar el ID de placa real
      let idPlacaReal = null;
      
      // Intentar obtener el id_placa real
      if (selectedMotherboard) {
        const { data: placaData, error: placaError } = await supabase
          .from('placa_madre')
          .select('id_placa')
          .eq('id_componente', selectedMotherboard.id)
          .single();
        
        if (placaError) {
          console.error("Error al buscar id_placa:", placaError);
        } else if (placaData) {
          idPlacaReal = placaData.id_placa;
          console.log("ID de placa real encontrado:", idPlacaReal);
        } else {
          console.error("No se encontró ninguna placa con id_componente", selectedMotherboard.id);
        }
      }
    
      // Si es una categoría que requiere filtrado y ya hay placa madre
      const filterMap = {
        "RAM": () => obtenerRAMCompatible(idPlacaReal),
        "Procesador": () => obtenerProcesadoresCompatibles(idPlacaReal),
        "Almacenamiento": () => obtenerDiscosCompatibles(idPlacaReal)
      };
    
      let data = [];
      if (selectedMotherboard && filterMap[categoryTitle] && idPlacaReal) {
        data = await filterMap[categoryTitle]();
        
        // Mapear los resultados filtrados al formato esperado
        data = data.map(item => ({
          id: item.id_ram || item.id_procesador || item.id_disco,
          name: item.nombre,
          description: `${item.tipo || ''} ${item.capacidad || item.socket || ''}`,
          price: item.price || 0,
          imgURL: item.imgURL || ''
        }));
      } else {
        // Si no hay filtro especial o no se encontró id_placa, busca todos los componentes de esa categoría
        const databaseCategory = mapCategories[categoryTitle] || categoryTitle;
        const response = await supabase
          .from('componente') 
          .select('id_componente, nombre, descripcion, precio, imagenurl')
          .eq('tipo', databaseCategory);
    
        if (response.error) throw response.error;
    
        data = response.data.map((item) => ({
          id: item.id_componente,
          name: item.nombre,
          description: item.descripcion,
          price: item.precio,
          imgURL: item.imagenurl,
        }));
      }
    
      setComponents(data || []);
    } catch (err) {
      console.error("Error completo:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, [categoryTitle, selectedMotherboard]);

  const handleAddComponent = (component) => {
    navigation.goBack(); // Regresar a BuildPage
    route.params?.onSelectComponent?.({
      id: component.id, 
      name: component.name, 
      price: component.price, 
      description: component.description, 
      imgURL: component.imgURL,
    });
  };
  const fetchComponentDetails = async (componentId, categoryTitle) => {
    try {
      setDetailsLoading(true);
      let details = null;

      // Map category to specific table
      const categoryTableMap = {
        "RAM": "ram",
        "Procesador": "procesador",
        "Almacenamiento": "disco",
        "Fuente Poder": "fuente_poder",
        "Placa Madre": "placa_madre",
        // Add more categories as needed
      };

      const tableName = categoryTableMap[categoryTitle] || 'componente';

      if (tableName === 'componente') {
        // For generic components, fetch from componente table
        const { data, error } = await supabase
          .from('componente')
          .select('*')
          .eq('id_componente', componentId)
          .single();

        if (error) throw error;
        details = data;
      } else {
        // For specific component types, fetch from their respective tables
        const { data, error } = await supabase
          .from(tableName)
          .select(`
            *,
            componente:id_componente (*)
          `)
          .eq('id_componente', componentId)
          .single();

        if (error) throw error;
        details = data;
      }

      setComponentDetails(details);
    } catch (err) {
      console.error("Error fetching component details:", err);
      setError(err.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleImagePress = (component) => {
    setSelectedComponent(component);
    fetchComponentDetails(component.id, categoryTitle);
    setModalVisible(true);
  };

  const renderComponent = ({ item }) => (
    <View style={styles.componentContainer}>
      <TouchableOpacity onPress={() => handleImagePress(item)}>
        <Image source={{ uri: item.imgURL }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.price}>{item.description}</Text>
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
  const renderModal = () => {
    if (!selectedComponent) return null;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: selectedComponent.imgURL }} style={styles.modalImage} />
            <Text style={styles.modalName}>{selectedComponent.name}</Text>
            <Text style={styles.modalPrice}>${selectedComponent.price}</Text>

            {detailsLoading ? (
              <ActivityIndicator size="large" color="#4a3b8f" />
            ) : componentDetails ? (
              <View style={styles.table}>
                <Text style={styles.tableDescription}>Características principales:</Text>
                
                {/* Dynamic rendering of component details */}
                {Object.entries(componentDetails)
                  .filter(([key, value]) => 
                    // Exclude certain keys that are not meaningful to display
                    !['id_componente', 'componente', 'created_at'].includes(key) && 
                    value !== null && 
                    value !== undefined
                  )
                  .map(([key, value]) => (
                    <View key={key} style={styles.tableRow}>
                      <Text style={styles.tableCellKey}>
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                      </Text>
                      <Text style={styles.tableCellValue}>{String(value)}</Text>
                    </View>
                  ))
                }
              </View>
            ) : (
              <Text style={styles.errorText}>No se encontraron detalles del componente</Text>
            )}
            
            <Button title="Cerrar" onPress={() => setModalVisible(false)} color="#6200EE" />
          </View>
        </View>
      </Modal>
    );
  };

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
      
      {renderModal()}

      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 16,
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalPrice: {
    fontSize: 18,
    color: '#4a3b8f',
    marginBottom: 8,
  },
  table: {
    width: '100%',
    marginVertical: 16,
  },
  tableDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCellKey: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  tableCellValue: {
    fontSize: 16,
    color: '#666',
    flex: 1,
    textAlign: 'right',
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
  price: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4a3b8f',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

export default BuildPageList;
