import React, { Component } from "react";
import ReactStars from "react-stars";
import firebase, { auth, provider, database } from "../firebase.js";
import {Layer, Rect, Circle, Stage, Group} from 'react-konva';

class TreeLeaf extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         isMouseInside: false
      };
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
    handleMouseEnter() {
      this.setState({
        isMouseInside: true
      });
    }
    handleMouseLeave() {
      this.setState({
        isMouseInside: false
      });
    }
    render() {
      let category = this.props.category;
      let color = "rgba(206, 244, 157, 0.8)"
      let x = 491;
      let y = 260;
      if (category == 'awe') {
        color = "rgba(206, 244, 157, 0.8)"
        x = 491;
        y = 260;
      }
      if (category == 'gratitude') {
        color = "rgba(202, 207, 237, 0.8)"
        x = 491;
        y = 160;
      }
      if (category == 'kindness') {
        color = "rgba(244, 241, 152, 0.8)"
        x = 543;
        y = 86;
      }
      if (category == 'mindfulness') {
        color = "rgba(187, 242, 240, 0.8)"
        x = 620;
        y = 132;
      }
      if (category == 'resilience') {
        color = "rgba(244, 217, 217, 0.8)"
        x = 626;
        y = 235;
      }
      return (
        <Circle
          x={x} y={y} radius={this.props.score + 30}
          fill={color}
          stroke={this.state.isMouseInside ? 1 : 0}
          strokeWidth="1"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        />
      );
    }
}

export default TreeLeaf;