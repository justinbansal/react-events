import firebase from 'firebase';

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyBMHKfuUQUsV_h7ZErXss4H69SaOkjdxNQ",
  authDomain: "react-events2.firebaseapp.com",
  databaseURL: "https://react-events2.firebaseio.com",
  projectId: "react-events2",
  storageBucket: "react-events2.appspot.com",
  messagingSenderId: "533101036325",
  appId: "1:533101036325:web:9813351aeacca8e0c790cc"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
