import React, { Component } from "react";
import FriendForm from "./FriendForm";
import FriendBlock from "./FriendBlock";

import firebase, { database } from "../firebase.js";

class FriendList extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.focusOff = this.focusOff.bind(this);
    this.addNewFriend = this.addNewFriend.bind(this);

    this.state = {
      isPopupVisible: false,
      friendList: []
    };

    this.getFriends = this.getFriends.bind(this);

    this.getFriends();
  }

  getFriends() {
    let app = database.ref(
      "users/" + firebase.auth().currentUser.uid + "/friends"
    );

    app.on(
      "value",
      function(snapshot) {
        var exists = snapshot.val() !== null;

        if (exists) {
          let friendsToFetch = Object.keys(snapshot.val());

          const friendPromises = friendsToFetch.map(function(uid) {
            return database
              .ref("users/")
              .child(uid)
              .once("value")
              .then(function(s) {
                return s.val();
              });
          });

          Promise.all(friendPromises).then(friendList => {
            this.setState({ friendList: friendList }, () => {
              console.log(this.state.friendList);
            });
          });
        }
      }.bind(this)
    );
  }

  handleClick(e) {
    this.setState({
      isPopupVisible: false
    });
  }

  focusOff(e) {
    e.preventDefault();
    if (e.target.className !== "category--image") {
      this.setState({
        activeIndex: null,
        open: false
      });
    }
  }

  updateScore() {
    let score = this.state.score + 1;
    this.setState({ score: score });
  }

  addNewFriend(email) {
    function addFriend(friend_uid) {
      var current_uid = firebase.auth().currentUser.uid;

      var updates = {};

      updates["users/" + current_uid + "/friends/" + friend_uid] = true;
      updates["users/" + friend_uid + "/friends/" + current_uid] = true;

      firebase
        .database()
        .ref()
        .update(updates);
    }

    function checkIfExists(snapshot) {
      var exists = snapshot.val() !== null;

      if (exists) {
        addFriend.bind(this)(Object.keys(snapshot.val())[0]);
      } else {
        console.log("User does not exist");
      }
    }

    firebase
      .database()
      .ref("users/")
      .orderByChild("email")
      .equalTo(email)
      .limitToFirst(1)
      .once("value", checkIfExists.bind(this));
  }

  createFriendBlock(friend) {
    return <FriendBlock user={friend} />;
  }

  render() {
    var friendBlocks =
      this.state.friendList.length > 0 ? (
        this.state.friendList.map(this.createFriendBlock)
      ) : (
        <div class="card">
          {" "}
          <div class="card-body">
            <h2>
              {" "}
              You have no friends! Better ask your neighbor to be friends!{" "}
            </h2>
          </div>
        </div>
      );

    return (
      <div className="container">
        <div
          className="row"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <FriendForm addNewFriend={this.addNewFriend} />
        </div>
        {friendBlocks}
      </div>
    );
  }
}

export default FriendList;
