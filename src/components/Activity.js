import React, { Component } from "react";
import CSSTransitionGroup from 'react-transition-group/CSSTransition';

class Activity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShown: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ isShown: !this.state.isShown })
  }


  MenuBox() {
    return (
      <div class="row">
      <div class="small-2 columns">
        <a href= {this.props.activity.link}> 
            <h4 className="projectlist--byline"> Explore </h4>
          </a>
          </div>
<div class="small-10 columns">
          <a onClick={this.props.onClick}> 
            <h4 className="projectlist--byline"> Complete Task </h4>
          </a>
          </div>
        </div>
      
      )

  }

  render() {

    let title = this.props.activity.title;
    let description = this.props.activity.description;
    let url = this.props.activity.link;

    console.log(this.props.shiftLeft)



    let menu = this.state.isShown ? this.MenuBox.bind(this)() : '';

    return (
      
      [<li>
        <a onClick={this.handleClick}>
          <h3 className="projectlist--client">{title}</h3>
          <h4 className="projectlist--byline">{description}</h4>
        </a>
      </li>,
      <li>
        {menu}
        </li>]
       
      


      )
      }

    /*
    return (
      <div>
        <li>
          <h4> {this.props.activity.title} </h4>
          <p> {this.props.activity.description} </p>
          <form action={this.props.activity.link}>
            <input type="submit" value="Explore" />
          </form>
          <button className="complete" onClick={this.props.onClick}>
            Complete Task
          </button>
        </li>
      </div>
    );
    */
  
}

export default Activity;
