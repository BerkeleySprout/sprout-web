import React, { Component } from "react";
class SessionBlock extends Component {
  getActivityTitle() {
    if (this.props.session.activity) {
      return this.props.session.activity.title;
    }
  }

  render() {
    var date = new Date(this.props.session.datetime);
    var hours = date.getHours();
    var minutes = date.getMinutes();

    var timeString = "" + (hours > 12 ? hours - 12 : hours);
    timeString += (minutes < 10 ? ":0" : ":") + minutes;
    timeString += hours >= 12 ? " PM" : " AM";

    var mood = this.props.session.moods;
    var emoji;
    if (mood === "happy") {
      emoji = <i class="em em-smile" />;
    }
    if (mood === "sad") {
      emoji = <i class="em em-cry" />;
    }
    if (mood === "angry") {
      emoji = <i class="em em-angry" />;
    }
    var memo;
    memo = this.props.session.memo
      ? this.props.session.memo
      : "There was no reflection included for this activity";

    return (
      <div>
        <div className="card session-card">
          <div className="card-body">
            <div className="title-container">
              <h2> {this.getActivityTitle()} </h2>
              <div class="col">{emoji}</div>
            </div>
            <h6>
              {timeString + " -- "} {this.props.session.durationAmount} Minutes
            </h6>
            <hr />
            <h5>Reflection:</h5>
            <h6> {memo} </h6>
          </div>
        </div>
      </div>
    );
  }
}

export default SessionBlock;
