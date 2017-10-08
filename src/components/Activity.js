import React, { Component } from "react";

class Activity extends Component {
  render() {
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
  }
}

export default Activity;
