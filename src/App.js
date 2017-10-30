import React, { Component } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import Collection from "./components/Collection";
import firebase, { auth, provider, database } from "./firebase.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this); 

  }

  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  logout() {
    console.log("No")
    auth.signOut().then(() => {
      console.log("success")
      this.setState({
        user: null
      });
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    console.log(auth.currentUser)
        var login = this.state.user ? (
                  <a class="nav-link" onClick={this.logout} href="#">
                    Sign Out
                  </a>
                ) : (
                  <a class="nav-link" onClick={this.login} href="#">
                    Sign In
                  </a>
                )

    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light navbar-toggleable-md bg-light">
          <a class="navbar-brand" href="#">
            Sprout 
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Activities
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Friends
                </a>
              </li>
            </ul>
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                { login }
              </li>
            </ul>
          </div>
        </nav>

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
