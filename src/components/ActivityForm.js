import React, { Component } from "react";
import firebase from "../firebase.js";

class ActivityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      category: "Awe",
      description: "",
      img: "",
      link: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    var current_uid = firebase.auth().currentUser.uid;

    var category = this.state.category.toLowerCase();

    var entry = {
      title: this.state.title,
      categories: [category],
      description: this.state.description,
      img: this.state.img,
      link: this.state.link,
      creator: current_uid,
      user_created: true,
      username: firebase.auth().currentUser.displayName
    };

    var pushKey = firebase
      .database()
      .ref("useractivities/")
      .push().key;

    var updates = {};

    updates["useractivities/" + pushKey] = entry;
    updates["users/" + current_uid + "/activities/" + pushKey] = entry;

    firebase
      .database()
      .ref()
      .update(updates);
  }

  render() {
    return (
      <div class="card " style={{ width: "35rem" }}>
        <div className="card-body">
          <h4> Create Activity </h4>
          <form onSubmit={this.handleSubmit}>
            <div class="form-group row">
              <div className="col-md-3">
                <label for="category"> Title </label>
              </div>
              <div className="col-md-9">
                <input
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.title}
                  id="title"
                  placeholder="Title"
                />
              </div>
            </div>

            <div class="form-group row">
              <div className="col-md-3">
                <label for="category"> Category </label>
              </div>
              <div className="col-md-9">
                <select
                  class="form-control"
                  onChange={this.handleChange}
                  value={this.state.category}
                  id="category"
                >
                  <option>Awe</option>
                  <option>Gratitude</option>
                  <option>Kindness</option>
                  <option>Mindfulness</option>
                  <option>Resilience</option>
                </select>
              </div>
            </div>

            <div class="form-group row">
              <div className="col-md-3">
                <label> Description </label>
              </div>
              <div className="col-md-9">
                <textarea
                  onChange={this.handleChange}
                  value={this.state.description}
                  id="description"
                  rows="2"
                  placeholder="A brief description"
                />
              </div>
            </div>

            <div class="form-group row">
              <div className="col-md-3">
                <label> Link</label>
              </div>
              <div className="col-md-9">
                <input
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.link}
                  id="link"
                  placeholder="Link to more information"
                />
              </div>
            </div>

            <div class="form-group row">
              <div className="col-md-3">
                <label> Image URL </label>
              </div>
              <div className="col-md-9">
                <input
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.img}
                  id="img"
                  placeholder="Link to an image"
                />
              </div>
            </div>

            <button
              type="submit"
              style={{ width: "100%" }}
              onClick={() => {}}
              class="btn btn-sprout-dark"
            >
              Create Activity{" "}
              <i class="fa fa-check" style={{ marginLeft: "5px" }} />{" "}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ActivityForm;
