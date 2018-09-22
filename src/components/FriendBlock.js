import React, { Component } from "react";
import { Stage } from "react-konva";
import TreeLeaf from "./TreeLeaf";

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

  getUserImage() {
    if (this.props.user != null) {
      return this.props.user.image;
    }
    return "";
  }

  getUserName() {
    if (this.props.user != null) {
      return this.props.user.name;
    }
    return "";
  }

  getUserScores() {
    if (this.props.user != null) {
      return this.props.user.scores;
    }
    return "";
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-2">
              <img
                src={this.getUserImage()}
                className="no-padding"
                style={{ borderRadius: "50%" }}
                alt=""
              />
            </div>
            <div className="col-lg-6">
              <h3 style={{ color: "black" }}> {this.getUserName()}</h3>
            </div>
            <div className="col-lg-4">
              <div className="category--miniimage-container">
                <div class="container sprout-tree-mini">
                  <Stage width={500} height={300}>
                    <TreeLeaf
                      category={"awe"}
                      score={this.getUserScores()["awe"]}
                      mini={1}
                    />
                    <TreeLeaf
                      category={"gratitude"}
                      score={this.getUserScores()["awe"]}
                      mini={1}
                    />
                    <TreeLeaf
                      category={"kindness"}
                      score={this.getUserScores()["awe"]}
                      mini={1}
                    />
                    <TreeLeaf
                      category={"mindfulness"}
                      score={this.getUserScores()["awe"]}
                      mini={1}
                    />
                    <TreeLeaf
                      category={"resilience"}
                      score={this.getUserScores()["awe"]}
                      mini={1}
                    />
                  </Stage>
                </div>

                {/*
                <div className="category--miniimage" style={aweColor}></div>
                <div className="category--miniimage" style={gratitudeColor}></div>
                <div className="category--miniimage" style={kindnessColor}></div>
                <div className="category--miniimage" style={mindfulnessColor}></div>
                <div className="category--miniimage" style={resilienceColor}></div>
                */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendBlock;
