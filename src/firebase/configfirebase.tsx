import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDmTay-4vGLb5ensCXtlD5arQZsCcSlao4",
    authDomain: "crypto-transactions-db.firebaseapp.com",
    projectId: "crypto-transactions-db",
    storageBucket: "crypto-transactions-db.appspot.com",
    messagingSenderId: "772238036146",
    appId: "1:772238036146:web:ee0438ad4283ae7c6e8dab"
  };

  firebase.initializeApp(firebaseConfig)

  const prjFirestore = firebase.firestore()
  const prjAuth = firebase.auth()

  const timestamp = firebase.firestore.Timestamp

  export { prjFirestore, prjAuth, timestamp}