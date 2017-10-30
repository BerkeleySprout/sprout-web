import React, { Component } from "react";

import Activity from "./Activity";
import classNames from "classnames";
import { Scrollbars } from "react-custom-scrollbars";

class FriendBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
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
      <div className="container" style={{paddingTop:"20px"}}>
        <div className="category--content">
        </div>
        <div className="row">
          <div className="col-lg-3">
            <img src="http://www.qygjxz.com/data/out/190/5691490-profile-pictures.png"
            className="no-padding"/>
          </div>
          <div className="col-lg-5">
            <h3 style={{color:"black"}}> Tao Ong</h3>
            <h6 style={{color:"black"}}> Berkeley, CA</h6>
          </div>
          <div className="col-lg-4">
            <img src="https://i.imgur.com/OEURIKH.png"
            className="no-padding full"/>
          </div>
          </div>
        <div className="category--closeButton">
          <a onClick={this.props.focusOff}>Back</a>
        </div>
        <hr style={{marginBottom:"0px"}}/>
      </div>
    );
  }
}

export default FriendBlock;
