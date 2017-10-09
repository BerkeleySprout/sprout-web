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
        name: "awe",
        img: "https://unsplash.it/1200/1200/?image=974"
      },
      { 
        name: "empathy",
        img: "https://unsplash.it/1200/1200/?image=1074"
      },
      { 
        name: "connection",
        img: "https://unsplash.it/1200/1200/?image=1066"
      },
      { 
        name: "kindness",
        img: "https://unsplash.it/1200/1200/?image=815"
      },
      { 
        name: "compassion",
        img: "https://unsplash.it/1200/1200/?image=1025"
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
      
      <div className={"categories--menu-container " + classes} 
        style={{ height: window.innerHeight }}
      >
        <ul className="categories menu">{categoryNodes}</ul>
      </div>
    );
  }
}

export default Collection;