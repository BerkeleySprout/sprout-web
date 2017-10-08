import React, { Component } from "react";

import Activity from "./Activity";
// eslint-disable-next-line
import _ from "lodash";

class ActivityList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      activities: []
    };

    this.handleData = this.handleData.bind(this);
    let app = this.props.db.database().ref("activities");

    app.on(
      "value",
      function(snapshot) {
        this.handleData(snapshot.val());
      }.bind(this)
    );
  }

  handleData(values) {
    let category = this.props.category;

    let filtered = values.filter(function(item) {
      return item.categories.includes(category);
    });

    console.log(filtered);

    this.setState({ activities: filtered });
  }

  handleClick() {
    let score = this.state.score + 1;
    this.setState({ score: score });
    this.props.updateScore();
  }

  render() {
    let activityNodes = this.state.activities.map(activity => {
      return (
        <Activity activity={activity} onClick={() => this.handleClick()} />
      );
    });
    return (
      <div>
        <h2> {this.props.category} </h2>
        <h3> score: {this.state.score} </h3>
        <ul>{activityNodes}</ul>
      </div>
    );
  }
}

export default ActivityList;
