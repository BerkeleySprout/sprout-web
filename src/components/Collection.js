import React, { Component } from "react";
import CategoryBlock from "./CategoryBlock";
import classNames from "classnames";

class Collection extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.focusOff = this.focusOff.bind(this);
    this.createCategoryBlock = this.createCategoryBlock.bind(this)

    this.state = {
      score: 0,
      open: false,
      activityIndex: null,
      categories: [ { 
        name: "Awe"
      },
      { 
        name: "Compassion"
      },
      { 
        name: "Connection"
      },
      { 
        name: "Empathy"
      },
      { 
        name: "Forgiveness"
      },
      { 
        name: "Gratitude"
      },
      { 
        name: "Happiness"
      },
      { 
        name: "Kindness"
      },
      { 
        name: "Mindfulness"
      },
      { 
        name: "Optimism"
      },
      { 
        name: "Resilience"
      },
      { 
        name: "Self-compassion"
      }
      ]
    };
  }

  handleClick(i) {
    this.setState({
      activeIndex: i,
      open: true
    });
  }

  focusOff(e) {
    e.preventDefault();
    if (e.target.className !== "category--image") {
      this.setState({
        activeIndex: null,
        open: false
      });
    }
  }

  createCategoryBlock(cat, i) {
    let isLast =
      i === this.state.categories.length - 1 ||
      i === this.state.categories.length - 2;
    let shiftLeft = i < this.state.activeIndex;

    return (
      <CategoryBlock
        category={cat}
        key={"cat-" + i}
        handleClick={this.handleClick}
        active={i === this.state.activeIndex}
        focusOff={this.focusOff}
        focused={this.state.open}
        shiftLeft={shiftLeft}
        Index={i}
        isLast={isLast}
        db={this.props.db}
        updateScore={() => this.updateScore()}
      />
    );
  }

  updateScore() {
    let score = this.state.score + 1;
    this.setState({ score: score });
  }

  render() {
    let categoryNodes = this.state.categories.map(this.createCategoryBlock);
    let classes = classNames({
      focused: this.state.open
    });

    return (
      
      
      <div className="container" style={{marginTop: "50px"}}>
        <div className="row no-gutters">
        <div className="col-lg-3">{categoryNodes[0]}</div>
        <div className="col-lg-3">{categoryNodes[1]}</div>
        <div className="col-lg-3">{categoryNodes[2]}</div>
        <div className="col-lg-3">{categoryNodes[3]}</div>
        </div>
        <div className="row no-gutters">
        <div className="col-lg-3">{categoryNodes[4]}</div>
        <div className="col-lg-3">{categoryNodes[5]}</div>
        <div className="col-lg-3">{categoryNodes[6]}</div>
        <div className="col-lg-3">{categoryNodes[7]}</div>
        </div>
        <div className="row no-gutters">
        <div className="col-lg-3">{categoryNodes[8]}</div>
        <div className="col-lg-3">{categoryNodes[9]}</div>
        <div className="col-lg-3">{categoryNodes[10]}</div>
        <div className="col-lg-3">{categoryNodes[11]}</div>
        </div>
      </div>
      
    );
  }
}

export default Collection;