import React, { Component } from "react";

import CategoryBlock from "./CategoryBlock";
import classNames from "classnames";
import { Scrollbars } from "react-custom-scrollbars";

import firebase, { auth, provider, database } from "../firebase.js";

class FriendBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0
    };
    this.setActive = this.setActive.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  setActive() {
    this.props.handleClick(this.props.Index);
  }

  getWidth(isActive) {
    let w = !isActive ? "calc(20vw - 20px)" : "500px";
    return w;
  }

  handleClick() {
    let score = this.state.score + 1;
    this.setState({ score: score });
    this.props.updateScore();
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-3">
              <img
                src={this.props.user.image}
                className="no-padding"
              />
            </div>
            <div className="col-lg-5">
              <h3 style={{ color: "black" }}> {this.props.user.name}</h3>
            </div>
            <div className="col-lg-4">
              <img
                src=""
                
              />
            </div>
          </div>

          <hr style={{ marginBottom: "0px" }} />
        </div>
      </div>
    );
  }
}

export default FriendBlock;