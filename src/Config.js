
import * as firebase from 'firebase';

//const settings = { timestampsInSnapshots: true }

var firebaseConfig = {
    apiKey: "AIzaSyBxgszRUoNr__sD3wprGT0dJNR_3ebu7oc",
    authDomain: "study-a8034.firebaseapp.com",
    databaseURL: "https://study-a8034.firebaseio.com",
    projectId: "study-a8034",
    storageBucket: "study-a8034.appspot.com",
    messagingSenderId: "179037153374",
    appId: "1:179037153374:web:591999f321ae40b0caeccf"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.firestone().settings(settings);

export default firebase;