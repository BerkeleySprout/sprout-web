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
                    name: "awe",
                    img: "https://unsplash.it/1200/1200/?image=974"
                },
                {
                    name: "empathy",
                    img: "https://unsplash.it/1200/1200/?image=1074"
                },
                {
                    name: "connection",
                    img: "https://unsplash.it/1200/1200/?image=1066"
                },
                {
                    name: "kindness",
                    img: "https://unsplash.it/1200/1200/?image=815"
                },
                {
                    name: "compassion",
                    img: "https://unsplash.it/1200/1200/?image=1025"
                },

                {
                    name: "optimism",
                    img: "https://unsplash.it/1200/1200/?image=1025"
                },

                {
                    name: "happiness",
                    img: "https://unsplash.it/1200/1200/?image=1025"
                },

                {
                    name: "gratitude",
                    img: "https://unsplash.it/1200/1200/?image=1025"
                },

                {
                    name: "mindfulness",
                    img: "https://unsplash.it/1200/1200/?image=1025"
                }
            ]
        };

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

    updateScore() {
        let score = this.state.score + 1;
        this.setState({ score: score });
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
                    className="btn btn-success"
                    onClick={() => this.handleClick(category.name)}
                    value={category.name}
                    data-toggle="button"
                    aria-pressed="false"
                    autocomplete="off"
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
                            <h4> {activity.title} </h4>
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <p> {activity.description} </p>
                            </div>
                             <div class="col-md-4">
                             <div className="btn-group mx-auto" role="group">
                             <button type="button" className="btn btn-primary">Sad</button>
                             <button type="button" className="btn btn-success">Happy</button>
                             </div>
                                <p> {activity.description} </p>
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
