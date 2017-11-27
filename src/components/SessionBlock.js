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

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            {this.props.session.datetime}
            {this.props.session.moods}

            {this.props.session.memo}
            {this.props.session.memo}
          </div>
        </div>
      </div>
    );
  }
}

export default SessionBlock;
