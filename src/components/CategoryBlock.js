import React, { Component } from "react";

import Activity from "./Activity";
import classNames from "classnames";
import { Scrollbars } from "react-custom-scrollbars";

class CategoryBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      activities: []
    };
    this.setActive = this.setActive.bind(this);
    this.getActivities = this.getActivities.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getActivities();
  }

  getActivities() {
    let app = this.props.db.database().ref("activities");

    app.on(
      "value",
      function(snapshot) {
        let category = this.props.category.name;
        
        let filtered = snapshot.val().filter(
          function(item) {
            return item.categories.includes(category);
          }
        );

        this.setState({ activities: filtered });
      }.bind(this)
    );
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
\
    let score = this.state.score + 1;
    let green = 0;
    if (score > 100) {
      green = score - 100;
    }
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
        background:
          "url(" + this.props.category.img + ") no-repeat center",
        backgroundSize: "cover",
        height: "500px",
        width: this.getWidth(active)
      },
      block: {
        background: "rgb(" + (235-score*20).toString() + ", " + ((255-score)+green).toString() +"," + (235-score*8).toString(),
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

    let activityNodes = this.state.activities.map(activity => {
      return (
        <Activity isLast={this.props.isLast} activity={activity} onClick={() => this.handleClick()} />
      );
    });

  
    return (
      <ul className="container">
        
        <div
          className="category--image-container"
          onClick={this.handleClick}
          style={styles.container}
        >
        
        <div className="category--image" style={styles.block}>
          <h3>{this.props.category.name}</h3>
        </div>
        
        </div>
        
        <div className="category--closeButton">
          <a onClick={this.props.focusOff}>Back</a>
        </div>
      </ul>
    );
  }
}

export default CategoryBlock;
