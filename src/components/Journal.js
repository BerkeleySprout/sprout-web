import React, { Component } from "react";
import CategoryBlock from "./CategoryBlock";
import SessionBlock from "./SessionBlock";
import classNames from "classnames";
import EntryForm from "./EntryForm";
import firebase, { auth, provider, database } from "../firebase.js";
import AlertContainer from "react-alert";
import AbosluteGrid from "../../node_modules/react-absolute-grid/lib/AbsoluteGrid.jsx";

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

        var sampleItems = [
          {key: 1, name: 'Test', sort: 0, filtered: 0},
          {key: 2, name: 'Test 1', sort: 1, filtered: 0},
        ];

        return (
            <div class="container" style={{marginTop: "20px"}}>
                {sessionBlocks}
            </div>
        )
    }
}

export default Journal;
