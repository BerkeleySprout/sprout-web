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
            activityIndex: null,
            showrec:true,
            showuser:false,
            activities: [],
            currentActivities: [],
            useractivities: [],
            currentuseractivities: [],
            categoryFilter: [],
            showForm: false,
            friendlist: [],
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
        this.render = this.render.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getActivities = this.getActivities.bind(this);
        this.updateActiveActivities = this.updateActiveActivities.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    onOpenModal = () => {
        this.setState({ showForm: true });
    };

    onCloseModal = () => {
        this.setState({ showForm: false });
    };

    handleClick(category) {
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
    }

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
              .once("value").then(function(s) {
                return s.val();
              });
          });

          Promise.all(friendPromises).then(friendList => {
            this.setState({ friendList: friendList }, () => {console.log(this.state.friendList)});
          });
        }
      }.bind(this)
    );
  }

    updateActiveActivities() {
        if (this.state.categoryFilter.length > 0) {
            let contain = function(element) {
                return this.state.categoryFilter.includes(element);
            };

            let filtering = function(activity) {
                return (
                    activity.categories.filter(contain.bind(this)).length > 0
                );
            };

            var filtered = this.state.activities.filter(filtering.bind(this));
            var filteredB = this.state.useractivities.filter(
                filtering.bind(this)
            );
        } else {
            filtered = this.state.activities;
            filteredB = this.state.useractivities;
        }

        this.setState({
            currentActivities: filtered,
            currentuseractivities: filteredB
        });
    }

    getActivities() {
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
                        useractivities: arr,
                        currentuseractivities: arr
                    },

                    this.updateActiveActivities()
                );
            }.bind(this)
        );
    }

    componentDidMount() {
        this.getActivities();
        this.getFriends();
    }

    render() {
        var categoryButtons = this.state.categories.map(category => {
            // Making first letters uppercase
            var name =
                category.name.charAt(0).toUpperCase() + category.name.slice(1);
            return (
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => this.handleClick(category.name)}
                    value={category.name}
                
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                >
                    {name}
                </button>
            );
        });


        var activities = this.state.showrec ? this.state.currentActivities.map(activity => (
            <ActivityBlock friends={this.state.friendlist} activity={activity} />
        )) : null

        var useractivities = this.state.showuser ? this.state.currentuseractivities.map(activity => (
            <ActivityBlock friends={this.state.friendlist} activity={activity} user={true}/>
        )) : null


        

        return (
            <div className="container">
                <nav className="navbar navbar-light bg-faded">
                    <div
                        className="btn-group mx-auto"
                        role="group"
                        data-toggle="buttons"
                    >
                        {categoryButtons}
                    </div>

                    <div
                        className="btn-group mx-auto"
                        role="group"
                        data-toggle="buttons"
                    >
                        <button
                            type="button"
                            className="btn btn-primary active"
                            style={{ marginTop: "20px", marginBottom: "20px" }}
                            onClick={() => { let current = this.state.showrec; this.setState({showrec: !current})}}
                        >
                            Recommended Activities
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ marginTop: "20px", marginBottom: "20px" }}
                            onClick={() => { let current = this.state.showuser; this.setState({showuser: !current})}}
                        >
                            User Activities
                        </button>
                    </div>
                </nav>



                <button
                    type="button"
                    className="btn btn-sprout-dark"
                    href="#article"
                    style={{ width: "100%" }}
                    onClick={this.onOpenModal}
                >
                    Create New Activity
                </button>

                <Modal
                    open={this.state.showForm}
                    onClose={this.onCloseModal}
                    little
                >
                    <ActivityForm />
                </Modal>

                <br />
                <br />

                <div className="card-columns">
                    {activities} 
                    {useractivities}</div>
            </div>
        );
    }
}

export default Menu;
