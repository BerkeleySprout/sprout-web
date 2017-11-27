import React, { Component } from "react";
import CategoryBlock from "./CategoryBlock";
import ActivityBlock from "./ActivityBlock";
import classNames from "classnames";
import EntryForm from "./EntryForm";
import firebase, { auth, provider, database } from "../firebase.js";

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            score: 0,
            open: false,
            activityIndex: null,
            activities: [],
            currentActivities: [],
            categoryFilter: [],
            isMounted: false,
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
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

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

    updateActiveActivities() {
        if (this.state.categoryFilter.length > 0) {
            let contain = function(element) {

                return this.state.categoryFilter.includes(element);

            }

            let filtering = function(activity) {

                return activity.categories.filter(contain.bind(this)).length > 0;

            }

            var filtered = this.state.activities.filter(
                filtering.bind(this)
            );

        } else {
            filtered = this.state.activities;
        }

        
        this.setState({ currentActivities: filtered });
    }

    getActivities() {
        let app = database.ref("activities/");

        app.on(
            "value",
            function(snapshot) {
                let filtered = snapshot.val();

                this.setState(
                    { activities: filtered, currentActivities: filtered },
                    this.updateActiveActivities()
                );
            }.bind(this)
        );
    }


    componentDidMount() {
        this.setState({ isMounted: true });

        this.getActivities();
    }
    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

   /* postSession() {
        session = {
            activity: activity,
            memo: memo,
            date: date,
            duration: duration,
            friends: friends
        }

    }
    */

    render() {
        var categoryButtons = this.state.categories.map(category => {
            return (
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => this.handleClick(category.name)}
                    value={category.name}
                    data-toggle="button"
                    aria-pressed="false"
                    autocomplete="off"
                    style={{marginTop: "15px"}}
                >
                    {category.name}
                </button>
            );
        });

        var activities = this.state.currentActivities.map(activity => <ActivityBlock activity={activity}/>)
                


        return (

            <div className="container">
                <nav className="navbar navbar-light bg-faded">
                    <div className="btn-group mx-auto " role="group">
                        {categoryButtons}
                    </div>
                </nav>

                {activities}
            </div>
        );
    }
}

export default Menu;
