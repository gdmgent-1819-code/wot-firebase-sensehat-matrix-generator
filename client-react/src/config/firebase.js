import * as firebase from 'firebase';
import 'firebase/firestore';
import Config from '../config.json';

/*
Initalize firebase
*/
firebase.initializeApp(Config.firebaseConfig);

const firestoreRef = firebase.firestore();
export const matricesRef = firestoreRef.collection('matrices');