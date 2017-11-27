import React, { Component } from "react";
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
    let testColor = {
        background: "rgb(20,20,20)",
        backgroundSize: "cover",
        height: "150px",
        width: "50px"
      }
    let aweColor = {
      background: "rgb(" + (235-this.props.user.scores["awe"]*20).toString() + ", " + 
                           (255-this.props.user.scores["awe"]).toString() + "," + 
                           (235-this.props.user.scores["awe"]*8).toString(),
      backgroundSize: "cover",
      height: "150px",
      width: "50px"
    }

    let gratitudeColor = {
      background: "rgb(" + 255 + ", " + 
                           (250-this.props.user.scores["gratitude"]*15) + "," + 
                           (250-this.props.user.scores["gratitude"]*15).toString(),
      backgroundSize: "cover",
      height: "150px",
      width: "50px"
    }

    let kindnessColor = {
      background: "rgb(" + 255 + ", " + 
                           255 + "," + 
                           (250-this.props.user.scores["kindness"]*15).toString(),
      backgroundSize: "cover",
      height: "150px",
      width: "50px"
    }

    let mindfulnessColor = {
      background: "rgb(" + (245-this.props.user.scores["mindfulness"]*15) + ", " + 
                           (245-this.props.user.scores["mindfulness"]*15) + "," + 
                           255,
      backgroundSize: "cover",
      height: "150px",
      width: "50px"
    }

    let resilienceColor = {
      background: "rgb(" + 255 + ", " + 
                           (255-20-this.props.user.scores["resilience"]).toString() + "," + 
                           (235-this.props.user.scores["resilience"]*20).toString(),
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
                style={{borderRadius: "50%"}}
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