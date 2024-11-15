import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from "react-native-screens";
import { StyleSheet, View } from "react-native";

// Importa Firebase
import app from "./src/firebase/config";

// Importa los componentes y páginas
import SearchBar from "./src/components/SearchBar";
import Categories from "./src/components/Categories";
import ContentSection from "./src/components/ContentSection";
import NavigationBar from "./src/components/NavigationBar";
import BuildPage from "./src/components/pages/BuildPage";
import BuildPageList from "./src/components/pages/BuildPageList";

// Habilita pantallas nativas para mejorar el rendimiento
enableScreens();

// Configuración del stack navigator
const Stack = createStackNavigator();

// Datos de ejemplo para los productos
const enOfertaProducts = [
  { title: "ASUS ROG Strix B760-I Gaming WiFi", price: "450 Bs." },
  { title: "ASUS ROG Maximus Z790 HERO", price: "500 Bs." },
];

const nuevoProducts = [
  { title: "MSI MPG B550 Gaming Plus", price: "E-ATX" },
];

// Pantalla principal (HomeScreen) que muestra los componentes
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <SearchBar />
      <Categories />
      <ContentSection title="En oferta" products={enOfertaProducts} />
      <ContentSection title="Nuevo" products={nuevoProducts} />
      <NavigationBar />
    </View>
  );
};

// Componente principal de la app con el stack navigator
const App = () => {
  console.log("Firebase App initialized: ", app);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BuildPage" component={BuildPage} />
        <Stack.Screen name="BuildPageList" component={BuildPageList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
});

export default App;
