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

    return (
      <div>
        <div className="card">
          <div className="card-body">
            <div class="row">
              <div class="col-md-4">
                <h1> {timeString} </h1>
              </div>
              <div class="col">{emoji}</div>
            </div>
            <h4> {this.getActivityTitle()}</h4>

            <h5> {this.props.session.memo} </h5>

            <h6> Duration: {this.props.session.durationAmount} Minutes </h6>
          </div>
        </div>
      </div>
    );
  }
}

export default SessionBlock;
