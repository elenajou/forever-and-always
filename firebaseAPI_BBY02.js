//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyDHf4WhvqIGI9KB6Rb741FaOgEqI_D8JnM",
    authDomain: "bby02-grocerease.firebaseapp.com",
    projectId: "bby02-grocerease",
    storageBucket: "bby02-grocerease.appspot.com",
    messagingSenderId: "656552790812",
    appId: "1:656552790812:web:c679a07a9c70eec10948d9",
    measurementId: "G-LYGNH60KLQ"
};
//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();