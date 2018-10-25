import React, { Component } from "react";
import firebase from "../firebase.js";

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memo: "",
      durationAmount: 5,
      durationUnit: "",
      datetime: new Date().getTime(),
      moods: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleClick(mood) {
    this.setState({ moods: mood });
  }

  handleSubmit(e) {
    e.preventDefault();
    var current_uid = firebase.auth().currentUser.uid;
    var entry = {
      owner: current_uid,
      memo: this.state.memo,
      durationAmount: this.state.durationAmount,
      durationUnit: this.state.durationUnit,
      datetime: new Date(this.state.datetime).getTime(),
      moods: this.state.moods,
      activity: this.props.activity
    };

    var pushKey = firebase
      .database()
      .ref("sessions/")
      .push().key;
    var updates = {};
    updates["sessions/" + pushKey] = entry;
    updates["users/" + current_uid + "/sessions/" + pushKey] = entry;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        firebase
          .database()
          .ref("users/" + firebase.auth().currentUser.uid + "/scores/")
          .once("value", snapshot => {
            var current_scores = snapshot.val();

            for (var i = 0; i < this.props.activity.categories.length; i++) {
              var category = this.props.activity.categories[i];

              if (Object.keys(current_scores).includes(category)) {
                current_scores[category] = current_scores[category] + 1;
              }
            }

            firebase
              .database()
              .ref("users/" + firebase.auth().currentUser.uid + "/scores/")
              .update(current_scores);
          });
      });
  }

  render() {
    return (
      <div>
        <div className="card-body">
          <h2 className="modal-title">{this.props.activity.title}</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-sm-10">
                <textarea
                  className="form-control largeform"
                  placeholder="How do you feel?"
                  onChange={this.handleChange}
                  value={this.state.memo}
                  id="memo"
                  rows="4"
                />
              </div>

              <div
                className="btn-group-vertical col-sm-2"
                role="group"
                data-toggle="buttons"
              >
                <button
                  type="button"
                  onClick={() => {
                    this.handleClick("happy");
                  }}
                  name="happy"
                  className="btn btn-outline-warning"
                >
                  <i className="em em-smile" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.handleClick("sad");
                  }}
                  name="sad"
                  className="btn btn-outline-primary"
                >
                  <i className="em em-cry" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.handleClick("angry");
                  }}
                  name="angry"
                  className="btn btn-outline-danger"
                >
                  <i className="em em-angry" />
                </button>
              </div>
            </div>

            <div className="form-row">
              <div className="col-sm-3 form-group">
                <input
                  className="input"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.durationAmount}
                  id="durationAmount"
                  placeholder="Duration"
                />
              </div>

              <div className="col-sm-3 form-group">
                <select
                  className="form-control input"
                  onChange={this.handleChange}
                  value={this.state.durationUnit}
                  id="durationUnit"
                >
                  <option>Minutes</option>
                  <option>Hours</option>
                </select>
              </div>

              <div className="col-sm-6 form-group">
                <input
                  className="form-control input"
                  onChange={this.handleChange}
                  type="datetime-local"
                  value={this.state.datetime}
                  id="datetime"
                />
              </div>
            </div>

            <button
              type="submit"
              onstyle={{ width: "100%" }}
              onClick={() => {}}
              className="btn btn-sprout-dark"
            >
              Complete{" "}
              <i className="fa fa-check" style={{ marginLeft: "5px" }} />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EntryForm;
