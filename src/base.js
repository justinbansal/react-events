import Rebase from 're-base'; // React firebase package to mirror state to our firebase changes
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCErIwlRoO9O6nvnOwHoVua5X39YMLbjfg",
  authDomain: "react-events-b1478.firebaseapp.com",
  databaseURL: "https://react-events-b1478.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp }; // named export

export default base; // default export
