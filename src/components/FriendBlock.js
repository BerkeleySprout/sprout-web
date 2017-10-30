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
    let { active, focused, shiftLeft, isLast } = this.props;

    let styles = {
      container: {
        transform: (function() {
          return active
            ? "scale(1.1) translate3d(0, 0, 0)"
            : "scale(1) translate3d(0, 0, 0)";
        })()
      },
      item: {
        transform: (function() {
          //let direction = shiftLeft ? "-" : "";
          let transform =
            focused && !active
              ? "translate3d(0, 0, 0)"
              : "translate3d(0, 0, 0)";
          return transform;
        })()
      },
      background: {
        backgroundSize: "cover",
        height: "500px",
        width: this.getWidth(active)
      },
      block: {
        background: "rgb(230, 255, 230)",
        backgroundSize: "cover",
        height: "150px",
        width: this.getWidth(active)
      }
    };
    
    let classes = classNames({
      category: true,
      isActive: active,
      isLast,
      shiftLeft
    });

  
    return (
      <div className="container" style={{paddingTop:"20px"}}>
        <div className="category--content">
          <Scrollbars style={{ width: 500, height: 430}}>
            <div className="project-list">
              <ul className="menu vertical"></ul>
            </div>
          </Scrollbars>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <img src="http://www.qygjxz.com/data/out/190/5691490-profile-pictures.png"
            className="no-padding"/>
          </div>
          <div className="col-lg-9">
            <h3 style={{color:"black"}}> Tao Ong</h3>
            <h6 style={{color:"black"}}> Berkeley, CA</h6>
          </div>
          
          </div>
        <div className="category--closeButton">
          <a onClick={this.props.focusOff}>Back</a>
        </div>
        <hr/>
      </div>
    );
  }
}

export default FriendBlock;
