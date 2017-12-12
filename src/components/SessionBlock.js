import React, { Component } from "react";

import ReactStars from "react-stars";
import EntryForm from "./EntryForm";
import classNames from "classnames";
import { Scrollbars } from "react-custom-scrollbars";

import firebase, { auth, provider, database } from "../firebase.js";

class SessionBlock extends Component {
  constructor(props) {
    super(props);
  }

  getActivityTitle() {
    if (this.props.session.activity) {
      return this.props.session.activity.title;
    }
  }

  render() {
    var date = this.props.session.datetime.toString().split(" ")[4];
    var mood = this.props.session.moods;
    var emoji;
    if (mood == "happy") {
      emoji = <i class="em em-smile" />
    }
    if (mood == "sad") {
      emoji = <i class="em em-cry" />
    }
    if (mood == "angry") {
      emoji = <i class="em em-angry" />
    }

    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h5> {date} </h5>
            <h2> {this.getActivityTitle()}</h2>
            <h5> {emoji} </h5>
            <h5> {this.props.session.memo} </h5>
            
          </div>
        </div>
      </div>
    );
  }
}

export default SessionBlock;
