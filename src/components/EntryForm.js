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
      datetime: "",
      moods: [],

    };

    console.log("" + this.props.activity.duration[0] + "")
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleChange(e) {

    this.setState({ [e.target.id]: e.target.value });
  }

  handleClick(e) {

    var current_moods = this.state.moods.slice()

    var mood = e.target.name

    var exists = current_moods.includes(mood)

    if (exists) {

      var i = current_moods.indexOf(mood);
      current_moods.splice(i, 1);

    } else {
      current_moods.append(e.target.name)
    }

    this.setState({ moods: current_moods });
  }

  handleSubmit(e) {
    e.preventDefault();


    var entry = {
      memo : this.state.memo,
      durationAmount : this.state.durationAmount,
      durationUnit: this.state.durationUnit,
      datetime: this.state.datetime,
      moods: this.state.mood,
    }

    console.log(entry)

    
  }

  handleClick(e) {
    e.preventDefault();
  }

  render() {
    console.log(this.props.activity)
    return (
      <div class="card">
        <div className="card-body">
          <form>
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
                <button type="button" onClick={this.handleClick} name="happy" class="btn btn-outline-warning">
                  <i class="em em-smile" />
                </button>
                <button type="button" name="sad" class="btn btn-outline-primary">
                  <i class="em em-cry" />
                </button>
                <button type="button" name="angry" class="btn btn-outline-danger">
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
                <select class="form-control" onChange={this.handleChange} value={this.state.durationUnit.value} id="durationUnit">
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

             <button type="submit" style={{width:"100%"}} class="btn btn-outline-success">Complete <i class="fa fa-check" style={{marginLeft: "5px"}}></i> </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EntryForm;