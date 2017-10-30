import * as firebase from "firebase";


var config = {
      apiKey: "AIzaSyBAxI9siULiEKvdcxXOm1Wow3XZXN0q0Nk",
      authDomain: "berkeley-sprout.firebaseapp.com",
      databaseURL: "https://berkeley-sprout.firebaseio.com",
      projectId: "berkeley-sprout",
      storageBucket: "berkeley-sprout.appspot.com",
      messagingSenderId: "723781488882"
    };


firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database()


export default firebase;