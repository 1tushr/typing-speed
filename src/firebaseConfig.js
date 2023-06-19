import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCzCwXi83YDeUWL9zpFoaC5DN5GicVpw1I",
    authDomain: "typing-speed-b7060.firebaseapp.com",
    projectId: "typing-speed-b7060",
    storageBucket: "typing-speed-b7060.appspot.com",
    messagingSenderId: "145003050781",
    appId: "1:145003050781:web:51e344df8c8ae793db53f4",
    measurementId: "G-S4BYECVH5Q"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const auth =firebase.auth();
  const db=firebaseApp.firestore();
  export {auth,db}