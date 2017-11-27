import React, { Component } from "react";

import ReactStars from "react-stars";
import EntryForm from "./EntryForm";
import classNames from "classnames";
import { Scrollbars } from "react-custom-scrollbars";

import firebase, { auth, provider, database } from "../firebase.js";

class ActivityBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false
    };

    this.handleShowClick = this.handleShowClick.bind(this);
  }

  handleShowClick(e) {
    e.preventDefault();

    var current = this.state.showForm;

    this.setState({
      showForm: !current
    });
  }

  render() {
    var form = this.state.showForm ? (
      <EntryForm activity={this.props.activity} />
    ) : null;

    return (
      <div>
        <div className="card">
          <div className="card-body">
            <div class="row">
              <div class="col-md-3 ml-auto">
                <img src={this.props.activity.img} />
              </div>

              <div class="col-md-5 ml-auto">
                <div class="row">
                  <div class="col-md-8">
                    <h3> {this.props.activity.title} </h3>
                  </div>
                  <div class="col-md-4">
                    <ReactStars
                      count={5}
                      value={Math.ceil(this.props.activity.rating / 20)}
                      size={20}
                      color2={"#ffd700"}
                    />
                  </div>
                </div>
                <h5> {this.props.activity.description} </h5>
                <h6>
                  {" "}
                  Recommended Frequency: {this.props.activity.frequency.join("/")}
                </h6>

                <h6>
                  {" "}
                  Recommended Duration: {this.props.activity.duration.join(" ")}
                </h6>

                
              </div>

              <div class="col-md-4">
                <br />
                <div className="row">
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    style={{ marginRight: "6%", width: "47%"}}
                    href={this.props.activity.link}
                  >
                    <a href={this.props.activity.link} style={{color: "rgb(255,195,0)"}}>Explore</a>
                    <i class="fa fa-search" style={{ marginLeft: "5px" }} />
                  </button>
                  <button
                    type="button"
                    style={{ width: "47%" }}
                    className="btn btn-outline-primary"
                  >
                    Share
                    <i class="fa fa-share-alt" style={{ marginLeft: "5px" }} />
                  </button>
                </div>

                <br />
                <div className="row">
                  <button
                    type="button"
                    className="btn btn-lg btn-outline-success"
                    href="#article"
                    style={{ width: "100%" }}
                    onClick={this.handleShowClick}
                  >
                    Begin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {form}
      </div>
    );
  }
}

export default ActivityBlock;