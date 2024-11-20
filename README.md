
### INSTAlar DEPENDENCIAS
```bash

npm install -g expo-cli

npm install @react-navigation/native && yarn add @react-navigation/stack && expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view	(Agregar la librería de Navegación de React Native Navigation ejecutando)
npm install react-native-keyboard-aware-scroll-view base-64	(Agregar varios componentes UI y paquetes a ser usados en el proyecto)
npm install @react-navigation/stack
npm install @react-native-picker/picker

npm uninstall @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
npm install @supabase/supabase-js

npm install -g yarn (yarn para algunas dependencias actualizadas no compatibles, anteriores o posteriores)
expo install expo-document-picker ( Con lo de arriba)
npx expo install react-native-gesture-handler

```
###
- Se desintala todo lo relacionada a firebase, para ser sustituido por supabase
- txt...



INICIAR PROYECTO
npm start  o npx expo start (de forma remota)
npx expo start --android (via adb...)


### Más Dependencias
```bash
npm install react-native-safe-area-context
```
### A considerar: 
- tsconfig.json se me instaló como casi todo de manera automática, pero si te sale error sólo instalas lo que falta
- Noté que expo a veces te arroja error con un import que nada que ver al cambiar de rama, si eso pasa reinicias expo y ya
