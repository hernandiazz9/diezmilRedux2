import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDnm6z-GkdHs4Co8MUfnJ-2THMGpTcfHzY",
  authDomain: "diezmil-f4144.firebaseapp.com",
  projectId: "diezmil-f4144",
  storageBucket: "diezmil-f4144.appspot.com",
  messagingSenderId: "157221241052",
  appId: "1:157221241052:web:f1ea3447e86219f7a63419"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider();
  const firestore = firebase.firestore()

  export { auth,provider, firebase, firestore }