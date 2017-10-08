import React, { Component } from "react";
import "./App.css";
import ReactDOM from "react-dom"
import Collection from "./components/Collection";

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
        <Collection db={firebase} />
      </div>
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.querySelector("#root"));

export default App;
