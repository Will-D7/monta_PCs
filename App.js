import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import app from "./src/firebase/config";

export default function App() {
  console.log("Firebase App initialized: ", app);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! Firebase ta bien</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
