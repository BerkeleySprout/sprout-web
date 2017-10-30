import React, { Component } from "react";
import FriendBlock from "./FriendBlock";
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
      
      <div id="app-container" class="container">
        <FriendBlock />
        <FriendBlock />
        <FriendBlock />
        <FriendBlock />
      </div>
    );
  }
}

export default FriendList;