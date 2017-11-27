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
        name: "awe"
      },
      { 
        name: "gratitude"
      },
      { 
        name: "kindness"
      },
      { 
        name: "mindfulness"
      },
      { 
        name: "resilience"
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
    return (
      <CategoryBlock
        category={cat['name']}
        key={"cat-" + i}
        handleClick={this.handleClick}

        score={this.props.scores[cat['name']]}

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
          <div className="col-lg-1"></div>
          <div className="col-lg-2" style={{left: "20px"}}>Awe</div>
          <div className="col-lg-2" style={{left: "20px"}}>Gratitude</div>
          <div className="col-lg-2" style={{left: "20px"}}>Kindness</div>
          <div className="col-lg-2" style={{left: "20px"}}>Mindfulness</div>
          <div className="col-lg-2" style={{left: "20px"}}>Resilience</div>
          <div className="col-lg-1"></div>
        </div>
        <div className="row no-gutters">
          <div className="col-lg-1"></div>
          <div className="col-lg-2">{categoryNodes[0]}</div>
          <div className="col-lg-2">{categoryNodes[1]}</div>
          <div className="col-lg-2">{categoryNodes[2]}</div>
          <div className="col-lg-2">{categoryNodes[3]}</div>
          <div className="col-lg-2">{categoryNodes[4]}</div>
          <div className="col-lg-1"></div>
        </div>
      </div>
      
    );
  }
}

export default Collection;