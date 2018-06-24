import firebase from './firebase';

export const auth = firebase.auth();

export const signOut = () => auth.signOut();

export const signInWithEmailAndPassword = (email, password) => (
  auth.signInWithEmailAndPassword(email, password)
);

export const getCurrentUser = () => auth.currentUser;

export const createUserWithEmailAndPassword = (email, password) => (
  auth.createUserWithEmailAndPassword(email, password)
);
