import React, { Component } from "react";
import classNames from "classnames";
import Popup from "./Popup";
import firebase, { auth, provider, database } from "../firebase.js";

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memo: "",
      durationAmount: this.props.activity.duration[0],
      durationUnit: "",
      datetime: "2017-11-27T14:00:00",
      moods: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleClick(mood) {
    var current_moods = this.state.moods.slice();

    var exists = current_moods.includes(mood);

    if (exists) {
      var i = current_moods.indexOf(mood);
      current_moods.splice(i, 1);
    } else {
      current_moods.push(mood);
    }

    this.setState({ moods: current_moods });
  }

  handleSubmit(e) {
    e.preventDefault();

    var current_uid = firebase.auth().currentUser.uid
    var entry = {
      owner: current_uid,
      memo: this.state.memo,
      durationAmount: this.state.durationAmount,
      durationUnit: this.state.durationUnit,
      datetime: this.state.datetime,
      moods: this.state.moods
    };

    var pushKey = firebase.database().ref("sessions/").push().key

    var updates = {};

    updates['sessions/' + pushKey] = entry;
    updates['users/' + current_uid + '/sessions/' + pushKey] = entry;

  return firebase.database().ref().update(updates).then(() => {
    firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/scores/").on("value", function(snapshot) {

      var current_scores = snapshot.val()
/*
      for (var i = 0; i < this.props.activity.categories.length; i++) {
        var category = this.props.activity.categories[i]
  */
    })})}

  

  render() {
    return (
      <div class="card">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div class="form-row">
              <div class="form-group col-sm-11">
                <textarea
                  class="form-control largeform"
                  placeholder="How do you feel?"
                  onChange={this.handleChange}
                  value={this.state.memo}
                  id="memo"
                  rows="4"
                />
              </div>

              <div class="btn-group-vertical col-sm-1" role="group">
                <button
                  type="button"
                  onClick={() => {
                    this.handleClick("happy");
                  }}
                  name="happy"
                  class="btn btn-outline-warning"
                >
                  <i class="em em-smile" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.handleClick("sad");
                  }}
                  name="sad"
                  class="btn btn-outline-primary"
                >
                  <i class="em em-cry" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.handleClick("angry");
                  }}
                  name="angry"
                  class="btn btn-outline-danger"
                >
                  <i class="em em-angry" />
                </button>
              </div>
            </div>

            <div class="form-row">
              <div className="col-sm-4 form-group">
                <input
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.durationAmount}
                  id="durationAmount"
                  placeholder="Duration"
                />
              </div>

              <div className="col-sm-4 form-group">
                <select
                  class="form-control"
                  onChange={this.handleChange}
                  value={this.state.durationUnit}
                  id="durationUnit"
                >
                  <option>Minutes</option>
                  <option>Hours</option>
                </select>
              </div>

              <div className="col-sm-4 form-group">
                <input
                  class="form-control"
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
              class="btn btn-outline-success"
            >
              Complete <i
                class="fa fa-check"
                style={{ marginLeft: "5px" }}
              />{" "}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EntryForm;