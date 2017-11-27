import React, { Component } from "react";
import CategoryBlock from "./CategoryBlock";
import classNames from "classnames";
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
            };

            var filtered = this.state.activities.filter(
                function(item) {
                    return item.categories.some(contain.bind(this));
                }.bind(this)
            );
        } else {
            filtered = this.state.activities;
        }

        this.setState({ currentActivities: filtered });
    }

    getActivities() {
        let app = database.ref("activities");

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
                    style={{marginTop: "10px"}}
                >
                    {category.name}
                </button>
            );
        });

        var activities = this.state.currentActivities.map(activity => {
            return (
                <div className="card">

                    <div className="card-body">
                        <div class="row">
                            <div class="col-md-3 ml-auto">
                                <img src={activity.img} />
                            </div>
                            
                            <div class="col-md-6 ml-auto">
                                <h4> {activity.title} </h4>
                                <p> Rating: {activity.rating} </p>
                                <p> {activity.description} </p>
                                <p> Frequency: {activity.frequency.join(" ")}, Duration: {activity.duration.join(" ")} </p>
                            </div>
                            <div class="col-md-3">
                                <br/>
                                <div className="row">
                                    <button
                                        type="button"
                                        className="btn btn-lg btn-success"
                                        href="#article"
                                        onClick={() => this.props.updateScores(activity.categories)}
                                    >
                                        Complete 
                                        <i class="fa fa-check" style={{marginLeft: "5px"}}></i>
                                    </button>
                                </div>

                                <br/>
                                <div className="row">
                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                        style={{marginRight: "10px"}}
                                        href={activity.link}
                                    >
                                        Explore
                                        <i class="fa fa-search" style={{marginLeft: "5px"}}></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        Share
                                        <i class="fa fa-share-alt" style={{marginLeft: "5px"}}></i>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="container">
                <nav class="navbar navbar-light bg-faded">
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
