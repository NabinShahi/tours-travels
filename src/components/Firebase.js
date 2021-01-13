import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAiFDawXR7KUcXqR2ccQzCp4oD0Q5QHzK8",
  authDomain: "travelsoul-8adb3.firebaseapp.com",
  databaseURL: "https://travelsoul-8adb3.firebaseio.com",
  projectId: "travelsoul-8adb3",
  storageBucket: "travelsoul-8adb3.appspot.com",
  messagingSenderId: "295734785686",
  appId: "1:295734785686:web:07b3a75502bc73282874b7",
  measurementId: "G-9D0TN67F4L"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

export { db, auth };