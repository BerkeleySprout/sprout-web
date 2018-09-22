import React, { Component } from "react";
import { Layer, Circle, Text } from "react-konva";

class TreeLeaf extends Component {
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
  getScore() {
    if (this.props.mini) {
      return Math.min((this.props.score + 30) / 2.5, 80 / 2.5);
    }
    return Math.min(this.props.score + 30, 80);
  }
  render() {
    var category = this.props.category;
    var categoryCaps = category.charAt(0).toUpperCase() + category.slice(1);
    var color, x, y, textX, textY;
    if (this.props.mini === 0) {
      if (category === "awe") {
        color = "rgba(206, 244, 157, 0.8)";
        x = 491;
        y = 260;
        textX = 290;
        textY = 260;
      }
      if (category === "gratitude") {
        color = "rgba(202, 207, 237, 0.8)";
        x = 491;
        y = 160;
        textX = 218;
        textY = 150;
      }
      if (category === "kindness") {
        color = "rgba(244, 241, 152, 0.8)";
        x = 543;
        y = 86;
        textX = 290;
        textY = 55;
      }
      if (category === "mindfulness") {
        color = "rgba(187, 242, 240, 0.8)";
        x = 620;
        y = 132;
        textX = 720;
        textY = 122;
      }
      if (category === "resilience") {
        color = "rgba(244, 217, 217, 0.8)";
        x = 629;
        y = 235;
        textX = 729;
        textY = 225;
      }
    } else {
      if (category === "awe") {
        color = "rgba(206, 244, 157, 0.8)";
        x = 128;
        y = 94;
      }
      if (category === "gratitude") {
        color = "rgba(202, 207, 237, 0.8)";
        x = 128;
        y = 55;
      }
      if (category === "kindness") {
        color = "rgba(244, 241, 152, 0.8)";
        x = 148;
        y = 24;
      }
      if (category === "mindfulness") {
        color = "rgba(187, 242, 240, 0.8)";
        x = 179;
        y = 44;
      }
      if (category === "resilience") {
        color = "rgba(244, 217, 217, 0.8)";
        x = 182;
        y = 80;
      }
    }

    return (
      <Layer>
        <Text
          x={textX}
          y={textY}
          fontSize={this.state.isMouseInside && !this.props.mini ? 25 : 0}
          fontFamily={"Khula, Catamaran, Open Sans, Lato"}
          fill={"rgba(55, 55, 55, 0.7)"}
          align="center"
          text={categoryCaps + ": " + this.props.score}
        />
        <Circle
          x={x}
          y={y}
          radius={this.getScore()}
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
