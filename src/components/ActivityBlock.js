import React, { Component } from "react";

import ReactStars from "react-stars";

import EntryForm from "./EntryForm";
import classNames from "classnames";
import { Scrollbars } from "react-custom-scrollbars";

import Modal from 'react-responsive-modal';

import firebase, { auth, provider, database } from "../firebase.js";

class ActivityBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false
    };

    this.handleShowClick = this.handleShowClick.bind(this);
  }

  onOpenModal = () => {
    this.setState({ showForm: true });
  };

  onCloseModal = () => {
    this.setState({ showForm: false });
  };

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
   var credit = this.props.user ?  <h6> Created by: {this.props.activity.username} </h6> : null  

    return (
      <div>
        <div
          className="card" 
          style={{ width: "rem" }}
        >
          <img class="card-img-top" src={this.props.activity.img} />

          <div className="card-body">
            <h4 className="card-title"> {this.props.activity.title} </h4>

            <div className="card-text">
              <h6> {this.props.activity.description} </h6>
              {credit}
            </div>
          </div>

          <div className="card-footer">
            <div style={{ width: "35%", margin: "0 auto" }}>
              <ReactStars
                count={5}
                value={Math.ceil(this.props.activity.rating / 20)}
                size={20}
                color2={"#ffd700"}
              />
            </div>

            <a
              id="explore-button"
              className="btn btn-sprout-light"
              style={{ width: "100%" }}
              href={this.props.activity.link}
            >
              Explore
              <i class="fa fa-search" style={{ marginLeft: "5px" }} />
            </a>

            <button
              type="button"
              className="btn btn-sprout-dark"
              href="#article"
              style={{ width: "100%" }}
              onClick={this.onOpenModal}
            >
              Complete
            </button>
          </div>
        </div>

        <Modal open={this.state.showForm} onClose={this.onCloseModal} little>
           <EntryForm friends={this.props.friends} activity={this.props.activity} />
        </Modal>
      </div>
    );
  }
}

export default ActivityBlock;
