import React, { Component } from "react";
import CategoryBlock from "./CategoryBlock";
import ActivityBlock from "./ActivityBlock";
import classNames from "classnames";
import EntryForm from "./EntryForm";
import firebase, { auth, provider, database } from "../firebase.js";
import AlertContainer from 'react-alert'

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            score: 0,
            activityIndex: null,
            activities: [],
            currentActivities: [],
            categoryFilter: [],
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

        this.getActivities();
    }


    render() {
        var categoryButtons = this.state.categories.map(category => {
            // Making first letters uppercase
            var name = category.name.charAt(0).toUpperCase() + category.name.slice(1);
            return (
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={() => this.handleClick(category.name)}
                    value={category.name}
                    data-toggle="button"
                    aria-pressed="false"
                    autocomplete="off"
                    style={{marginTop: "20px", marginBottom: "20px"}}
                >
                    {name}
                </button>
            );
        });


        var activities = this.state.currentActivities.map(activity => <ActivityBlock activity={activity}/>)
                

/*
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
*/
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
