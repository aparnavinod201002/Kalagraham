import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCq8eIVnj7dwDJd08p_JYJtuhPHH_ULe7I",
    authDomain: "kalagraham.firebaseapp.com",
    projectId: "kalagraham",
    storageBucket: "kalagraham.firebasestorage.app",
    messagingSenderId: "698503340220",
    appId: "1:698503340220:web:492ab6e1cd9f1719ba70b9",
    measurementId: "G-XM38GWSGZH"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
