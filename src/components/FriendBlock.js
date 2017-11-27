import React, { Component } from "react";

import Activity from "./Activity";
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
    let testColor = {
        background: "rgb(20,20,20)",
        backgroundSize: "cover",
        height: "150px",
        width: "50px"
      }
    let aweColor = {
      background: "rgb(" + (235-0*20).toString() + ", " + 
                           (255-0).toString() + "," + 
                           (235-0*8).toString(),
      backgroundSize: "cover",
      height: "150px",
      width: "50px"
    }

  let gratitudeColor = {
      background: "rgb(" + 255 + ", " + 
                           (250-0*15) + "," + 
                           (250-0*15).toString(),
      backgroundSize: "cover",
      height: "150px",
      width: "50px"
    }

  let kindnessColor = {
      background: "rgb(" + 255 + ", " + 
                           255 + "," + 
                           (250-0*15).toString(),
      backgroundSize: "cover",
      height: "150px",
      width: "50px"
    }

  let mindfulnessColor = {
      background: "rgb(" + (245-0*15) + ", " + 
                           (245-0*15) + "," + 
                           255,
      backgroundSize: "cover",
      height: "150px",
      width: "50px"
    }

  let resilienceColor = {
      background: "rgb(" + 255 + ", " + 
                           (255-20-0).toString() + "," + 
                           (235-0*20).toString(),
      backgroundSize: "cover",
      height: "150px",
      width: "50px"
    }

    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-2">
              <img
                src={this.props.user.image}
                className="no-padding"
              />
            </div>
            <div className="col-lg-6">
              <h3 style={{ color: "black" }}> {this.props.user.name}</h3>
            </div>
            <div className="col-lg-4">
              <div className="category--miniimage-container">
          
                <div className="category--miniimage" style={aweColor}></div>
                <div className="category--miniimage" style={gratitudeColor}></div>
                <div className="category--miniimage" style={kindnessColor}></div>
                <div className="category--miniimage" style={mindfulnessColor}></div>
                <div className="category--miniimage" style={resilienceColor}></div>
                
              
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendBlock;