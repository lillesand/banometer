import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA_fTqk6HY8aJdSZUbYOnRUEhBfLkREcKc",
  authDomain: "banometer.firebaseapp.com",
  databaseURL: "https://banometer.firebaseio.com",
  projectId: "banometer",
  storageBucket: "banometer.appspot.com",
  appId: "1:986707920899:web:4c516946699b7cad122636"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const database = firebaseApp.database();
export const photosPath = "/photos/jorbu";
export const trainingPath = (person: string) => {
  return `/users/${person}/exercises`;
};
