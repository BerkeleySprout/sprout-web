import React, { Component } from "react";
import "./App.css";
import CategoryList from "./components/CategoryList";

import * as firebase from "firebase";

class App extends Component {
  constructor(props) {
    super(props);
    var config = {
      apiKey: "AIzaSyBAxI9siULiEKvdcxXOm1Wow3XZXN0q0Nk",
      authDomain: "berkeley-sprout.firebaseapp.com",
      databaseURL: "https://berkeley-sprout.firebaseio.com",
      projectId: "berkeley-sprout",
      storageBucket: "berkeley-sprout.appspot.com",
      messagingSenderId: "723781488882"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <div>
        <CategoryList db={firebase} />
      </div>
    );
  }
}

export default App;
