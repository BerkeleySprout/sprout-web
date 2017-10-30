import React, { Component } from "react";
import classNames from "classnames";

class Activity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShown: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ isShown: !this.state.isShown });
  }

  MenuBox() {

    let classesA = !this.props.isLast ? classNames({
      columns: true,
    }) : classNames({
      columns: true
    })

    let classesB = !this.props.isLast ? classNames({
      columns: true,  
    }) : classNames({
      columns: true   
      
    })


    return (
      <div class="row">
        <div className={classesA}>
          <a href={this.props.activity.link}>
            <h4 className="projectlist--explore"> Explore </h4>
          </a>
        </div>
        <div className={classesB}>
          <a onClick={this.props.onClick}>
            <h4 className="projectlist--complete"> Complete Task </h4>
          </a>
        </div>
      </div>
    );
  }

  render() {
    let title = this.props.activity.title;
    let description = this.props.activity.description;
    
    let menu = this.state.isShown ? this.MenuBox.bind(this)() : "";

    return [
      <li>
        <a onClick={this.handleClick}>
          <h3 className="projectlist--client">{title}</h3>
          <h4 className="projectlist--byline">{description}</h4>
        </a>
      </li>,
      <li>{menu}</li>
    ];
  }
}

export default Activity;
