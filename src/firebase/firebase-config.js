import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};

// const firebaseConfigTesting = {
//     apiKey: "AIzaSyCbWx6IXnz_9dXTHR_NBSdQ1C9r_oCdpaU",
//     authDomain: "dababase-test.firebaseapp.com",
//     projectId: "dababase-test",
//     storageBucket: "dababase-test.appspot.com",
//     messagingSenderId: "912570838167",
//     appId: "1:912570838167:web:75557860a72bd3dfadcdd2"
// };

// if( process.env.NODE_ENV === 'test' ){
//     //  Dev
//     firebase.initializeApp(firebaseConfigTesting);
// } else {
//     //  Prod
//     firebase.initializeApp(firebaseConfig);
// }

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}