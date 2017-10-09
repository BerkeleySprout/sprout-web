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
    this.getActivities();
  }

  getActivities() {
    let app = this.props.db.database().ref("activities");

    app.on(
      "value",
      function(snapshot) {
        let category = this.props.category.name;
        console.log(this.props);

        let filtered = snapshot.val().filter(
          function(item) {
            return item.categories.includes(category);
          }.bind(this)
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
          let direction = shiftLeft ? "-" : "";
          let transform =
            focused && !active
              ? "translate3d(" + direction + "100%, 0, 0)"
              : "translate3d(0, 0, 0)";
          return transform;
        })()
      },
      background: {
        background:
          "url(" + this.props.category.img + ") no-repeat center center",
        backgroundSize: "cover",
        height: "500px",
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
        <Activity shiftLeft={this.props.shiftLeft} activity={activity} onClick={() => this.handleClick()} />
      );
    });

    return (
      <li className={classes} style={styles.item}>
        <div className="category--content">
          <h2>{this.props.category.name} {this.state.score}</h2>
          <Scrollbars style={{ width: 500, height: 400 }}>
            <div className="project-list">
              <ul className="menu vertical">{activityNodes}</ul>
            </div>
          </Scrollbars>
        </div>
        <div
          className="category--image-container"
          onClick={this.setActive}
          style={styles.container}
        >
          <div className="category--image" style={styles.background} />
          </div>
        
        <div className="category--name">
          <h6>{this.props.category.name}</h6>
        </div>
        <div className="category--closeButton">
          <a onClick={this.props.focusOff} href="#">Back</a>
        </div>
      </li>
    );
  }
}

export default CategoryBlock;
