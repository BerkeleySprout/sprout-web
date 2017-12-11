import React, { Component } from "react";
import classNames from "classnames";
import Popup from "./Popup";
import AlertContainer from 'react-alert';
import firebase, { auth, provider, database } from "../firebase.js";

class EntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memo: "",
      durationAmount: this.props.activity.duration[0],
      durationUnit: "",
      datetime: new Date(),
      moods: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  alertOptions = {
    offset: 14,
    position: 'bottom right',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  }
 
  showAlert = () => {
    this.msg.show('Activity Completed!', {
      time: 2000,
      type: 'success',
      icon: <img src="path/to/some/img/32x32.png" />
    })
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
    var date = this.state.datetime.getFullYear() + '-' + 
              (this.state.datetime.getMonth() + 1) + '-' + 
              this.state.datetime.getDate();
    var entry = {
      owner: current_uid,
      memo: this.state.memo,
      durationAmount: this.state.durationAmount,
      durationUnit: this.state.durationUnit,
      datetime: date,
      moods: this.state.moods,
      activity: this.props.activity
    };

    var pushKey = firebase.database().ref("sessions/").push().key

    var updates = {};

    updates['sessions/' + pushKey] = entry;
    updates['users/' + current_uid + '/sessions/' + pushKey] = entry;

   firebase.database().ref().update(updates).then(() => {
    firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/scores/").once("value", (snapshot) => {

      var current_scores = snapshot.val()

      var updates = {}

      for (var i = 0; i < this.props.activity.categories.length; i++) {
        var category = this.props.activity.categories[i]

        if (Object.keys(current_scores).includes(category)) {
          current_scores[category] = current_scores[category] + 1
        }
      }

      console.log(current_scores)

      firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/scores/").update(current_scores)


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

            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            <button
              type="submit"
              onstyle={{ width: "100%" }}
              onClick={this.showAlert}
              class="btn btn-sprout-dark"
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