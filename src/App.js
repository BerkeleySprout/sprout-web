import React, { Component } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import Collection from "./components/Collection";
import firebase, { auth, provider } from './firebase.js';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: null  
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this); // <-- add this line
    //this.logout = this.logout.bind(this); // <-- add this line

  }

  login() {
  auth.signInWithPopup(provider) 
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
}

logout() {
  auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
}

componentDidMount() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({ user });
    } 
  });
}

  render() {
    return(
      <div>

      {this.state.user ?
        <button onClick={this.logout}>Log Out</button>                
        :
        <button onClick={this.login}>Log In</button>              
      }


      <Collection db={firebase} />
      </div>
      );
  }
}

ReactDOM.render(
  React.createElement(App, null),
  document.querySelector("#root")
  );

export default App;
