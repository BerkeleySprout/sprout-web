import React, { Component } from "react";
import CategoryBlock from "./CategoryBlock";
import {Stage} from 'react-konva';
import TreeLeaf from "./TreeLeaf";

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

  createTreeLeaf(cat, i) {
    return (
      <TreeLeaf
        category={cat['name']}
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
    
    return (
      
      <div className="jumbotron jumbotron-fluid"
           id="tree-jumbotron">

        <h3 className="tree-title">Your Wellness Tree</h3>
        <div class="container sprout-tree">
          <Stage width={1300} height={500}>
              <TreeLeaf category={'awe'} score={this.props.scores['awe']} mini={0}/>
              <TreeLeaf category={'gratitude'} score={this.props.scores['gratitude']} mini={0}/>
              <TreeLeaf category={'kindness'} score={this.props.scores['kindness']} mini={0}/>
              <TreeLeaf category={'mindfulness'} score={this.props.scores['mindfulness']} mini={0}/>
              <TreeLeaf category={'resilience'} score={this.props.scores['resilience']} mini={0}/>
          </Stage>
        </div>
      </div>
      
    );
  }
}

export default Collection;