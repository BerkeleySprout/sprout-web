import React, { Component } from "react";
import ReactStars from "react-stars";
import firebase, { auth, provider, database } from "../firebase.js";
import {Layer, Rect, Circle, Text, Stage, Group} from 'react-konva';

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
      var category = this.props.category;
      var categoryCaps = category.charAt(0).toUpperCase() + category.slice(1);
      var color, x, y, textX, textY;
      if (category == 'awe') {
        color = "rgba(206, 244, 157, 0.8)"
        x = 491;
        y = 260;
        textX = 290;
        textY = 260;
      }
      if (category == 'gratitude') {
        color = "rgba(202, 207, 237, 0.8)"
        x = 491;
        y = 160;
        textX = 218;
        textY = 150;
      }
      if (category == 'kindness') {
        color = "rgba(244, 241, 152, 0.8)"
        x = 543;
        y = 86;
        textX = 290;
        textY = 55;
      }
      if (category == 'mindfulness') {
        color = "rgba(187, 242, 240, 0.8)"
        x = 620;
        y = 132;
        textX = 720;
        textY = 122;
      }
      if (category == 'resilience') {
        color = "rgba(244, 217, 217, 0.8)"
        x = 629;
        y = 235;
        textX = 729;
        textY = 225;
      }
      return (
        <Layer>
          <Text x={textX} 
                y={textY}
                fontSize={this.state.isMouseInside ? 30 : 0}
                fontFamily={'Khula'}
                fill={"rgba(55, 55, 55, 0.7)"}
                align='center'
                text={categoryCaps + ": " + this.props.score} />
          <Circle
            x={x} y={y} radius={Math.min(this.props.score + 30, 80)}
            fill={color}
            stroke={this.state.isMouseInside ? 1 : 0}
            strokeWidth="1"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          />
        </Layer>
      );
    }
}

export default TreeLeaf;