import firebase from 'firebase'
import firestore from 'firebase/firestore'

var config = {
  apiKey: "AIzaSyAJ5kG14p-9qaEAnJey1pHEtlXkMOU1GQQ",
  authDomain: "feedme-c73c0.firebaseapp.com",
  databaseURL: "https://feedme-c73c0.firebaseio.com",
  projectId: "feedme-c73c0",
  storageBucket: "feedme-c73c0.appspot.com",
  messagingSenderId: "911994958906"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

//export firestore database
export default firebaseApp.firestore()