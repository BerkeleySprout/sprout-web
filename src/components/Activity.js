import React, { Component } from "react";

class Activity extends Component {
  render() {
    let title = this.props.activity.title;
    let description = this.props.activity.description;
    let url = this.props.activity.link;
    return (
      <li>
        <a href={url}>
          <h3 className="projectlist--client">{title}</h3>
          <h4 className="projectlist--byline">{description}</h4>
        </a>
      </li>
    );

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
}

export default Activity;
