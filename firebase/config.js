import * as firebase from "firebase";






const firebaseConfig = {
    apiKey: "AIzaSyAu9kMFQ_vLLpIZtV7rKgKN4Z_bTk6dwl8",
    authDomain: "swizzcontactapp.firebaseapp.com",
    databaseURL: "https://swizzcontactapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "swizzcontactapp",
    storageBucket: "swizzcontactapp.appspot.com",
    messagingSenderId: "564748765793",
    appId: "1:564748765793:web:3ef170fd22ad3f990e7820",
    measurementId: "G-G2SWN9W6G1"
};


firebase.initializeApp(firebaseConfig);




export default firebase


