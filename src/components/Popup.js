import React, { Component } from "react";
import classNames from "classnames";
import firebase, { auth, provider, database } from "../firebase.js";



class Popup extends React.Component {
  render() {
    if (this.props.isPopupVisible) {
      return (
      <div className="popup">Friend request sent!</div>
      )
    } else {
      return null;
    }
  }
}

export default Popup;
