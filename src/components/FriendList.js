import React, { Component } from "react";
import FriendBlock from "./FriendBlock";
import Popup from "./Popup";
import MyForm from "./MyForm";
import classNames from "classnames";

class FriendList extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.focusOff = this.focusOff.bind(this);
    

    this.state = {
      score: 0,
      open: false,
      activityIndex: null
    };
  }

  handleClick(i) {
    this.setState({
      activeIndex: i,
      open: true
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

  render() {

    return (
      <div className="container">
        <div className="container" style={{marginTop: "30px", marginBottom: "30px"}}> 
          <MyForm />
        </div>

        <div id="app-container" className="container">
          <FriendBlock />
          <FriendBlock />
          <FriendBlock />
          <FriendBlock />
          <FriendBlock />
          <FriendBlock />
          <FriendBlock />
          <FriendBlock />
          <FriendBlock />
        </div>
      </div>
    );
  }
}

export default FriendList;