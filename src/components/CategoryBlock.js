import React, { Component } from "react";

class CategoryBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      activities: []
    };
    this.setActive = this.setActive.bind(this);
  }

  setActive() {
    this.props.handleClick(this.props.Index);
  }

  render() {
    let score = this.props.score + 1;
    let offset = 0;
    let color = {
        background: "rgb(" + (235-score*20).toString() + ", " + 
                            ((255-score)+offset).toString() + "," + 
                             (235-score*8).toString(),
        backgroundSize: "cover",
        height: "350px",
      }
    if (score > 100) {
      offset = score - 100;
    }
    if (this.props.category === "awe") {
      color = {
        background: "rgb(" + (235-score*20).toString() + ", " + 
                            ((255-score)+offset).toString() + "," + 
                             (235-score*8).toString(),
        backgroundSize: "cover",
        height: "350px",
        position: "relative"
      }
    }
    if (this.props.category === "gratitude") {
      color = {
        background: "rgb(" + 255 + ", " + 
                             (250-score*15) + "," + 
                             (250-score*15).toString(),
        backgroundSize: "cover",
        height: "350px",
        position: "relative"
      }
    }
    if (this.props.category === "kindness") {
      color = {
        background: "rgb(" + 255 + ", " + 
                             255 + "," + 
                             (250-score*15).toString(),
        backgroundSize: "cover",
        height: "350px",
        position: "relative"
      }
    }
    if (this.props.category === "mindfulness") {
      color = {
        background: "rgb(" + (245-score*15) + ", " + 
                             (245-score*15) + "," + 
                             255,
        backgroundSize: "cover",
        height: "350px",
        position: "relative"
      }
    }
    if (this.props.category === "resilience") {
      color = {
        background: "rgb(" + 255 + ", " + 
                            ((255-20-score)+offset).toString() + "," + 
                             (235-score*20).toString(),
        backgroundSize: "cover",
        height: "350px",
        position: "relative"
      }
    }
    let styles = {
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
        opacity: "1"
      },
      score: {
        textAlign: "center", 
        paddingTop: "300px",
        fontSize: "15px",
        color: "white",
      }
    };
  
    return (
      <div className="container">
        
        <div
          className="category--image-container"
        >
        
          <div className="category--image" style={color}>
              <h6 style={styles.scoreLabel}>Score</h6>
              <h6 style={styles.score}>{this.props.score}</h6>
          </div>
        
        </div>
      </div>
    );
  }
}

export default CategoryBlock;
