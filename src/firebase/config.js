
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAngFxOLaCnwcEDYIZIL32ZzGRn15eeanA",
  authDomain: "assembpc-5b5bf.firebaseapp.com",
  projectId: "assembpc-5b5bf",
  storageBucket: "assembpc-5b5bf.appspot.com",
  messagingSenderId: "47827412871",
  appId: "1:47827412871:web:eccf03b3b6909fa10f5522",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la instancia para usarla en el resto de la aplicación
export default app;
