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
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h1> {this.props.session.datetime} </h1>
            <h2> {this.getActivityTitle()} </h2>x
            <h5> {this.props.session.memo} </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default SessionBlock;
