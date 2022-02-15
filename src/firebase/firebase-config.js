import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAb6oAAJbKVXlCG-V9mx6L6vHxbqTOF-Cg",
    authDomain: "journal-app-react-71695.firebaseapp.com",
    projectId: "journal-app-react-71695",
    storageBucket: "journal-app-react-71695.appspot.com",
    messagingSenderId: "20642473308",
    appId: "1:20642473308:web:38af3628089bb5e8874d99"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}