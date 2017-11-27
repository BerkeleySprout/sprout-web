import React, { Component } from "react";
import classNames from "classnames";
import Popup from "./Popup";
import firebase, { auth, provider, database } from "../firebase.js";

class FriendForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupVisible: false
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  
  handleClick(e) {
    e.preventDefault();

    this.props.addNewFriend(this.state.value)

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
            <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Add friend by email"/>
            <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>Add Friend</button>
          </form>
          <Popup isPopupVisible={isVisible} />
        </div>
      </div>
    )
  }
}

export default FriendForm;
