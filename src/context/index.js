import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBa_ylOqCpTDGW6eT6zEiWSzai4AgrTF1I',
  authDomain: 'burguer-test-c5de3.firebaseapp.com',
  databaseURL: 'https://burguer-test-c5de3.firebaseio.com',
  projectId: 'burguer-test-c5de3',
  storageBucket: 'burguer-test-c5de3.appspot.com',
  messagingSenderId: '451718821355',
  appId: '1:451718821355:web:4737fbaf762429005755ae',
};

const Context = React.createContext({
  firebase: firebase.initializeApp(firebaseConfig),
});

export const Provider = Context.Provider;

export default Context;
