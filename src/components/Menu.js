import React, { Component } from "react";
import ActivityForm from "./ActivityForm";
import ActivityBlock from "./ActivityBlock";
import Modal from "react-responsive-modal";
import firebase, { database } from "../firebase.js";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      showCategories: false,
      activityIndex: null,
      showrec: true,
      showuser: false,
      activities: [],
      currentActivities: [],
      userActivities: [],
      currentUserActivities: [],
      categoryFilter: [],
      showForm: false,
      friendList: [],
      categories: [
        {
          name: "awe"
        },
        {
          name: "gratitude"
        },
        {
          name: "kindness"
        },
        {
          name: "mindfulness"
        },
        {
          name: "resilience"
        }
      ]
    };
  }

  onOpenModal = () => {
    this.setState({ showForm: true });
  };

  onCloseModal = () => {
    this.setState({ showForm: false });
  };

  handleClick = category => {
    let remove = function(array, element) {
      return array.filter(e => e !== element);
    };

    if (this.state.categoryFilter.includes(category)) {
      let newFilters = remove(this.state.categoryFilter, category);
      this.setState(
        { categoryFilter: newFilters },
        this.updateActiveActivities
      );
    } else {
      let newFilters = this.state.categoryFilter.concat([category]);
      this.setState(
        { categoryFilter: newFilters },
        this.updateActiveActivities
      );
    }
  };

  getFriends = () => {
    let app = database.ref(
      "users/" + firebase.auth().currentUser.uid + "/friends"
    );

    app.on(
      "value",
      function(snapshot) {
        var exists = snapshot.val() !== null;

        if (exists) {
          let friendsToFetch = Object.keys(snapshot.val());

          const friendPromises = friendsToFetch.map(function(uid) {
            return database
              .ref("users/")
              .child(uid)
              .once("value")
              .then(function(s) {
                return s.val();
              });
          });

          Promise.all(friendPromises).then(friendList => {
            this.setState({ friendList: friendList }, () => {
              console.log(this.state.friendList);
            });
          });
        }
      }.bind(this)
    );
  };

  updateActiveActivities = () => {
    if (this.state.categoryFilter.length > 0) {
      let contain = function(element) {
        return this.state.categoryFilter.includes(element);
      };

      let filtering = function(activity) {
        return activity.categories.filter(contain.bind(this)).length > 0;
      };

      var filtered = this.state.activities.filter(filtering.bind(this));
      var filteredB = this.state.userActivities.filter(filtering.bind(this));
    } else {
      filtered = this.state.activities;
      filteredB = this.state.userActivities;
    }

    this.setState({
      currentActivities: filtered,
      currentUserActivities: filteredB
    });
  };

  getActivities = () => {
    let app = database.ref("/");

    app.on(
      "value",
      function(snapshot) {
        let filtered = snapshot.child("activities").val();
        let filteredB = snapshot.child("useractivities").val();

        let arr = [];

        Object.keys(filteredB).forEach(key => arr.push(filteredB[key]));

        this.setState(
          {
            activities: filtered,
            currentActivities: filtered,
            userActivities: arr,
            currentUserActivities: arr
          },

          this.updateActiveActivities()
        );
      }.bind(this)
    );
  };

  componentDidMount() {
    this.getActivities();
    this.getFriends();
  }

  render() {
    var categoryButtons = this.state.categories.map(category => {
      // Making first letters uppercase
      var name = category.name.charAt(0).toUpperCase() + category.name.slice(1);
      return (
        <button
          type="button"
          className="btn btn-outline-dark menu-category-item"
          onClick={() => this.handleClick(category.name)}
          value={category.name}
        >
          {name}
        </button>
      );
    });

    var activities = this.state.showrec
      ? this.state.currentActivities.map(activity => (
          <ActivityBlock friends={this.state.friendList} activity={activity} />
        ))
      : null;

    var userActivities = this.state.showuser
      ? this.state.currentUserActivities.map(activity => (
          <ActivityBlock
            friends={this.state.friendList}
            activity={activity}
            user={true}
          />
        ))
      : null;

    return (
      <div className="container">
        <div id="menu-categories">
          <div
            className="btn-group menu-category-group"
            role="group"
            data-toggle="buttons"
          >
            {categoryButtons}
          </div>

          <div
            className="btn-group menu-category-group"
            role="group"
            data-toggle="buttons"
          >
            <button
              type="button"
              className="btn btn-primary active menu-category-item"
              onClick={() => {
                let current = this.state.showrec;
                this.setState({ showrec: !current });
              }}
            >
              Recommended Activities
            </button>
            <button
              type="button"
              className="btn btn-primary menu-category-item"
              onClick={() => {
                let current = this.state.showuser;
                this.setState({ showuser: !current });
              }}
            >
              User Activities
            </button>
          </div>
          <div className="menu-category-group">
            <button
              type="button"
              className="btn btn-sprout-dark menu-category-item"
              onClick={this.onOpenModal}
            >
              Create Activity
            </button>
          </div>
        </div>

        <Modal open={this.state.showForm} onClose={this.onCloseModal} little>
          <ActivityForm />
        </Modal>

        <div className="card-columns">
          {activities}
          {userActivities}
        </div>
      </div>
    );
  }
}

export default Menu;
