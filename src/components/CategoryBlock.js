import React, { Component } from "react";

import Activity from "./Activity";
import classNames from "classnames";
import { Scrollbars } from "react-custom-scrollbars";

class CategoryBlock extends Component {
  constructor(props) {
    super(props);

    console.log(this.props)

    this.state = {
      score: 0,
      activities: []
    };
    this.setActive = this.setActive.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.props.color
    this.setState
  }



  setActive() {
    this.props.handleClick(this.props.Index);
  }

  getWidth(isActive) {
    let w = !isActive ? "calc(20vw - 100px)" : "100px";
    return w;
  }

  handleClick() {
    let score = this.state.score + 1;
    this.setState({ score: score });
    this.props.updateScore();
  }

  render() {
    let { active, focused, shiftLeft, isLast } = this.props;
    let color = {
        background: "rgb(" + (235-score*20).toString() + ", " + 
                            ((255-score)+offset).toString() + "," + 
                             (235-score*8).toString(),
        backgroundSize: "cover",
        height: "350px",
        width: this.getWidth(active)
      }
    let score = this.props.score + 1;
    let offset = 0;
    if (score > 100) {
      offset = score - 100;
    }
    if (this.props.category == "awe") {
      color = {
        background: "rgb(" + (235-score*20).toString() + ", " + 
                            ((255-score)+offset).toString() + "," + 
                             (235-score*8).toString(),
        backgroundSize: "cover",
        height: "350px",
        width: this.getWidth(active)
      }
    }
    if (this.props.category == "gratitude") {
      color = {
        background: "rgb(" + 255 + ", " + 
                             (250-score*15) + "," + 
                             (250-score*15).toString(),
        backgroundSize: "cover",
        height: "350px",
        width: this.getWidth(active)
      }
    }
    if (this.props.category == "kindness") {
      color = {
        background: "rgb(" + 255 + ", " + 
                             255 + "," + 
                             (250-score*15).toString(),
        backgroundSize: "cover",
        height: "350px",
        width: this.getWidth(active)
      }
    }
    if (this.props.category == "mindfulness") {
      color = {
        background: "rgb(" + (245-score*15) + ", " + 
                             (245-score*15) + "," + 
                             255,
        backgroundSize: "cover",
        height: "350px",
        width: this.getWidth(active)
      }
    }
    if (this.props.category == "resilience") {
      color = {
        background: "rgb(" + 255 + ", " + 
                            ((255-20-score)+offset).toString() + "," + 
                             (235-score*20).toString(),
        backgroundSize: "cover",
        height: "350px",
        width: this.getWidth(active)
      }
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
      activities: {
        textAlign: "center", 
        paddingTop: "20px", 
        fontSize: "15px",
        color: "white"
      },
      scoreLabel: {
        textAlign: "center", 
        paddingTop: "280px",
        fontSize: "15px",
        color: "white",
      },
      score: {
        textAlign: "center", 
        paddingTop: "300px",
        fontSize: "15px",
        color: "white",
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
        
        <div className="category--image" style={color}>
            <h6 style={styles.scoreLabel}>Score</h6>
            <h6 style={styles.score}>{this.props.score}</h6>
            <h6 style={styles.activities}>Recent activities
              <hr style={{marginTop: "5px", background: "white"}}/>
            </h6>
        </div>
        
        </div>
      </ul>
    );
  }
}

export default CategoryBlock;
