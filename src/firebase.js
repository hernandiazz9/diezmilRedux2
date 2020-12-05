import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDoBwRFxTu6H4MD3lUB-lIVxSgJlmkhLNo",
    authDomain: "auth-f20a3.firebaseapp.com",
    databaseURL: "https://auth-f20a3.firebaseio.com",
    projectId: "auth-f20a3",
    storageBucket: "auth-f20a3.appspot.com",
    messagingSenderId: "682132807744",
    appId: "1:682132807744:web:e1bf6af93c108320d5ffa5"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider();
  const firestore = firebase.firestore()

  export { auth,provider, firebase, firestore }