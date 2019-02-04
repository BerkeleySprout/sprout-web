import React, { Component } from "react";
import SessionBlock from "./SessionBlock";
import firebase, { database } from "../firebase.js";

class Journal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessions: [],
      filteredSessions: []
    };
  }

  componentDidMount = () => {
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    this.getFilteredSessions(start);
  };

  getFilteredSessions(date) {
    var min = date;
    var max = date + 86400;
    database
      .ref("users/" + firebase.auth().currentUser.uid + "/sessions")
      .orderByChild("datetime")
      .startAt(min.getTime())
      .endAt(max)
      .on("value", snapshot => {
        if (snapshot.val() != null) {
          this.setState({
            sessions: snapshot.val()
          });
        } else {
          this.setState({
            sessions: null
          });
        }
      });
  }

  render() {
    var allSessionBlocks =
      typeof this.state.sessions === undefined ||
      this.state.sessions === null ? (
        <div class="card">
          <div class="card-body">
            <h2> You have no entries! </h2>
          </div>
        </div>
      ) : (
        Object.keys(this.state.sessions).map(sessionKey => (
          <SessionBlock session={this.state.sessions[sessionKey]} />
        ))
      );

    var allDates = [];
    if (this.state.sessions != null) {
      var keys = Object.keys(this.state.sessions);
      for (var i = 0; i < keys.length; i++) {
        allDates.push(this.state.sessions[keys[i]].datetime.toString());
      }
    }

    var selected = [];
    for (var j = 0; j < allDates.length; j++) {
      selected.push(
        new Date(
          parseInt(allDates[j].toString().split(" ")[1], 10),
          parseInt(allDates[j].toString().split(" ")[2], 10),
          parseInt(allDates[j].toString().split(" ")[3], 10)
        )
      );
    }

    return (
      <div className="container">
        <div className="col-lg-6 mx-auto"> {allSessionBlocks} </div>
      </div>
    );
  }
}

export default Journal;
