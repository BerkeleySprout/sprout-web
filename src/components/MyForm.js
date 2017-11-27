import React, { Component } from "react";
import classNames from "classnames";
import Popup from "./Popup";
import firebase, { auth, provider, database } from "../firebase.js";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupVisible: false
    };
  }
  
  handleClick(e) {
    e.preventDefault();
    this.setState({
      isPopupVisible: true
    });
    setTimeout(() => {
      this.setState({
      isPopupVisible: false
    })
    }, 3000);
  }

  render() {
    const isVisible = this.state.isPopupVisible;
    return (
      <div className="row">
        <div className="offset-lg-5" style={{textAlign: "center"}}>
          <form>
            <input placeholder="Add friend by email"/>
            <br />
            <br />
            <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>Add Friend
            <i className="fa fa-user" style={{marginLeft: "7px"}}></i>
            </button>
          </form>
          <Popup isPopupVisible={isVisible} />
        </div>
      </div>
    )
  }
}

export default MyForm;
