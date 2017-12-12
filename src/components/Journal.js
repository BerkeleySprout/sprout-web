import React, { Component } from "react";
import CategoryBlock from "./CategoryBlock";
import SessionBlock from "./SessionBlock";
import classNames from "classnames";
import EntryForm from "./EntryForm";
import firebase, { auth, provider, database } from "../firebase.js";
import AlertContainer from "react-alert";
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet

class Journal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sessions: [],
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
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    handleClick(category) {
        return;
    }

    getSessions() {
        let app = database.ref(
            "users/" + firebase.auth().currentUser.uid + "/sessions"
        );

        app.on(
            "value",
            (snapshot) => {
                let filtered = snapshot.val();

                this.setState({ sessions: filtered })
                });
            }

    componentDidMount() {
        this.getSessions();
    }

    render() {
        var sessionBlocks = (typeof this.state.sessions === undefined || this.state.sessions === null) ? <div class="card"> <div class="card-body"><h2> You have no entries! </h2></div></div> : Object.keys(this.state.sessions).map(sessionKey => (
            <SessionBlock session={this.state.sessions[sessionKey]} /> 
        )) 

        var today = new Date();

        return (
            <div className="container container-fluid" style={{marginTop: "20px"}}>
                <div className="row">
                    <div className="col-lg-4 offset-lg-2 mx-auto">
                        <InfiniteCalendar
                            width={400}
                            height={400}
                            selected={today}
                            min={new Date(2017, 11, 1)}
                            minDate={new Date(2017, 11, 1)}
                            max={new Date(2018, 12, 13)}
                            maxDate={new Date(2018, 12, 13)}

                          />
                    </div>
                    <div className="col-lg-6 mx-auto">
                        {sessionBlocks}
                    </div>
                </div>
            </div>
        )
    }
}

export default Journal;
