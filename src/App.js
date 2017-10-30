import React, { Component } from "react";
import "./App.css";
import ReactDOM from "react-dom";

import Menu from "./components/Menu";

import FriendList from "./components/FriendList";

import firebase, { auth, provider, database } from "./firebase.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      page: 0
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this); 
    this.handleClick = this.handleClick.bind(this); 

  }

  handleClick(page) {
    this.setState({"page" : page})

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
    
        var login = this.state.user ? (
                  <a className="nav-link" onClick={this.logout} href="#">
                    Sign Out
                  </a>
                ) : (
                  <a className="nav-link" onClick={this.login} href="#">
                    Sign In
                  </a>
                )


    var display

    if (this.state.page == 0) {
      display = <Collection db={firebase} />
    } 
    else if (this.state.page == 1) {
      display = <Menu />
    }
    else if (this.state.page == 2) {
      display = <FriendList />
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light navbar-toggleable-md bg-light">
          <a className="navbar-brand" href="#">
            Sprout 
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" onClick={() => this.handleClick(0)}href="#">
                  Home

                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => this.handleClick(1)} href="#">
                  Activities
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => this.handleClick(2)} href="#">

                  Friends
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                { login }
              </li>
            </ul>
          </div>

        </nav>]

        {display}


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
