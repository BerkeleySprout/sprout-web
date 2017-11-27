import React, { Component } from "react";
import CategoryBlock from "./CategoryBlock";
import SessionBlock from "./SessionBlock";
import classNames from "classnames";
import EntryForm from "./EntryForm";
import firebase, { auth, provider, database } from "../firebase.js";
import AlertContainer from 'react-alert'

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

        return
    }

    
    getSessions() {
        let app = database.ref("users/" + firebase.auth().currentUser.uid + "/sessions/");

        app.on(
            "value",
            function(snapshot) {
                let filtered = snapshot.val();

                this.setState(
                    { sessions: filtered }
                );
            }.bind(this)
        );
    }


    componentDidMount() {

        this.getSessions();
    }



    render() {
       

        var sessionBlocks = this.state.sessions.length > 0 ? this.state.sessions.map(session => <SessionBlock session={session} />) : null

        return (

<div class="container">
                {sessionBlocks}

                </div>
            
        );
    }
}

export default Journal;
