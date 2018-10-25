import React, { Component } from "react";
import "./App.scss";
import ReactDOM from "react-dom";
import Menu from "./components/Menu";
import FriendList from "./components/FriendList";
import Collection from "./components/Collection";
import Journal from "./components/Journal";
import firebase, { auth, provider } from "./firebase.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      page: 0,
      scores: {
        awe: 0,
        gratitude: 0,
        kindness: 0,
        mindfulness: 0,
        resilience: 0
      }
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.updateScores = this.updateScores.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
  }

  handleClick = page => {
    this.setState({ page: page });
  };

  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user: user
      });

      function addUserIfNew(snapshot) {
        var exists = snapshot.val() !== null;
        if (!exists) {
          this.createNewUser(user);
        }
      }

      firebase
        .database()
        .ref("users/" + user.uid)
        .once("value", addUserIfNew.bind(this));
    });
  }

  createNewUser() {
    var new_user = {
      uid: this.state.user.uid,
      name: this.state.user.displayName,
      image: this.state.user.photoURL,
      email: this.state.user.email,
      createdAt: Date.now(),
      scores: {
        awe: 0,
        resilience: 0,
        gratitude: 0,
        kindness: 0,
        mindfulness: 0
      }
    };
    firebase
      .database()
      .ref("users/" + this.state.user.uid)
      .set(new_user);
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user }, this.updateScores.bind(this));
      }
    });
  }

  updateScores() {
    firebase
      .database()
      .ref("users/" + this.state.user.uid + "/scores")
      .on("value", snapshot => {
        this.setState({ scores: snapshot.val() });
      });
  }

  render() {
    var login = this.state.user ? (
      <a className="nav-link" onClick={this.logout}>
        Sign Out
      </a>
    ) : (
      <a className="nav-link" onClick={this.login}>
        Sign In
      </a>
    );

    var username = this.state.user ? this.state.user.displayName : null;

    var display;
    if (this.state.page === 0) {
      display = (
        <Collection
          scores={this.state.scores}
          db={firebase}
          username={username}
        />
      );
    } else if (this.state.page === 1) {
      display = <Menu updateScores={this.updateScores} />;
    } else if (this.state.page === 2) {
      display = <Journal />;
    } else if (this.state.page === 3) {
      display = <FriendList />;
    }

    var navbarArr = ["Home", "Activities"];
    if (this.state.user) {
      navbarArr = ["Home", "Activities", "Journal", "Friends"];
    }
    var navbar = navbarArr.map((item, index) => (
      <li className="nav-item">
        <a className="nav-link" onClick={() => this.handleClick(index)}>
          {item}
        </a>
      </li>
    ));

    return (
      <div>
        <nav
          className="navbar sticky-top navbar-main navbar-expand-lg navbar-light navbar-toggleable-md navbar-inverse"
          data-spy="affix"
          data-offset-top="197"
          id="my-navbar"
        >
          <a className="navbar-brand">
            <img
              alt="Sprout"
              src="https://image.ibb.co/ihzJPb/sprout_logo_icon.png"
            />
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
            <ul className="navbar-nav ml-auto navbar-center">{navbar}</ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">{login}</li>
            </ul>
          </div>
        </nav>
        {display}
      </div>
    );
  }
}

ReactDOM.render(
  React.createElement(App, null),
  document.querySelector("#root")
);

export default App;
