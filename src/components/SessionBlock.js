import React, { Component } from "react";

import ReactStars from "react-stars";
import EntryForm from "./EntryForm";
import classNames from "classnames";
import { Scrollbars } from "react-custom-scrollbars";

import firebase, { auth, provider, database } from "../firebase.js";

class SessionBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false
    };

    this.handleShowClick = this.handleShowClick.bind(this);
  }

  handleShowClick(e) {
    e.preventDefault();

    var current = this.state.showForm;

    this.setState({
      showForm: !current
    });
  }

  render() {
    var form = this.state.showForm ? (
      <EntryForm activity={this.props.activity} />
    ) : null;

    return (
      <div>
        <div className="card">
          <div className="card-body">

         {this.props.session.memo}
            
            </div>
            </div>
      </div>
    );
  }
}

export default SessionBlock;