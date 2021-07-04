import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBACUxFTx5bzeKcRof3N2h9SMsRLJZID7w",
    authDomain: "np-catch-of-the-day.firebaseapp.com",
    databaseURL: "https://np-catch-of-the-day-default-rtdb.firebaseio.com",
    projectId: "np-catch-of-the-day",
    storageBucket: "np-catch-of-the-day.appspot.com",
    messagingSenderId: "796058950891",
    appId: "1:796058950891:web:8ac1cd275385eaf5da32ae",
    measurementId: "G-ZM3FLF506Y"
})
const base = Rebase.createClass(firebaseApp.database());

//this is a names export
export { firebaseApp };

//this is a default export
export default base;