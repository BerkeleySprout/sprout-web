import React, { Component } from "react";
import "./App.css";
import ReactDOM from "react-dom";

import Menu from "./components/Menu";

import FriendList from "./components/FriendList";

import Collection from "./components/Collection";

import Journal from "./components/Journal";

import firebase, { auth, provider, database } from "./firebase.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      page: 0,
      scores: { 
      "awe" : 0,
      "gratitude": 0,
      "kindness": 0,
      "mindfulness": 0,
      "resilience": 0

      }



    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.updateScores = this.updateScores.bind(this); 
    this.handleClick = this.handleClick.bind(this); 
    this.createNewUser = this.createNewUser.bind(this); 

  }

  handleClick(page) {
    this.setState({"page" : page})

  }

  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user: user
      });

      function addUserIfNew (snapshot) {
          var exists = (snapshot.val() !== null);

          if (!exists) {
            this.createNewUser(user)
          }
        }

        

        firebase.database().ref('users/' + user.uid).once('value', addUserIfNew.bind(this))

      }
      )

  }

  createNewUser() {

    var new_user = {
      uid: this.state.user.uid,
      name: this.state.user.displayName,
      image: this.state.user.photoURL, 
      email: this.state.user.email,  
      createdAt: Date.now(),
      scores: {
        "awe": 0, 
        "resilience": 0,
        "gratitude": 0,
        "kindness": 0,
        "mindfulness": 0
      }
    }
    firebase.database().ref('users/' + this.state.user.uid).set(new_user)

  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }

  // updateScores(categories) {
  //     let newScores = Object.assign({}, this.state.scores)
  //       for (let i = 0; i < categories.length; i++){
  //         let category = categories[i]
  //         newScores[category] += 1 
  //         console.log(newScores)    
  //   } 

  //     firebase.database().ref('users/' + this.state.user + '/scores').set(newScores);
 
  // }

  // componentDidMount() {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       this.setState({ user });
  //     }
  //   });
  //   var scores = firebase.database().ref('users/' + this.state.user + '/scores');
  //   scores.on('value', function(snapshot) {
  //     if (snapshot.val() != null) {
  //       this.updateScores(snapshot.val());
  //     }
  //   });
  //   }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user }, this.updateScores.bind(this));
      }
    })
    }


  



  updateScores() {

    firebase.database().ref("users/" + this.state.user.uid + "/scores").on("value", (snapshot) => 
      {    
        

        this.setState({scores : snapshot.val()}) } )

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
var greeting = this.state.user ? (<nav className="navbar-brand"> Welcome {this.state.user.displayName} </nav>) : (<nav className="navbar-brand"> Welcome </nav>)

var display


     

      if (this.state.page == 0) {
        display = <Collection scores={this.state.scores} db={firebase} />
      } 
      else if (this.state.page == 1) {
        display = <Menu updateScores={this.updateScores}/>
      }
      else if (this.state.page == 2) {
        display = <Journal />
      }
      else if (this.state.page == 3) {
        display = <FriendList />
      }

    return (
      <div>
        <nav className="navbar navbar-main navbar-expand-lg navbar-light navbar-toggleable-md navbar-inverse" data-spy="affix" data-offset-top="197">
          <a className="navbar-brand" href="#">
            <img alt="Sprout" src="https://image.ibb.co/gqC9yR/sprout_logo_icon.png"/>
          </a>
           {greeting}
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
              <li className="nav-item">
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
                  Journal
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => this.handleClick(3)} href="#">
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
