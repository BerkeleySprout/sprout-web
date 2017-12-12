import React, { Component } from "react";
import CategoryBlock from "./CategoryBlock";
import SessionBlock from "./SessionBlock";
import classNames from "classnames";
import firebase, { auth, provider, database } from "../firebase.js";
import AlertContainer from "react-alert";
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

class Journal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sessions: [],
            filteredSessions: [],
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

    getFilteredSessions(date) {
        var filteredSessionBlocks = (typeof this.state.sessions === undefined || this.state.sessions === null)
         ?  <div class="card"> 
                <div class="card-body">
                    <h2> You have no entries on this day! </h2>
                </div>
            </div> 
         :  Object.keys(this.state.sessions)
         .filter(sessionKey => this.state.sessions.datetime == date)
         .map(sessionKey => (
                <SessionBlock session={this.state.sessions[sessionKey]} /> 
            )); 
    }

    render() {
        var allSessionBlocks = (typeof this.state.sessions === undefined || this.state.sessions === null)
         ?  <div class="card"> 
                <div class="card-body">
                    <h2> You have no entries!</h2>
                </div>
            </div> 
         :  Object.keys(this.state.sessions).map(sessionKey => (
                <SessionBlock session={this.state.sessions[sessionKey]} /> 
            )); 

        var today = new Date();

        var allDates = [];
        if (this.state.sessions != null) {
            var keys = Object.keys(this.state.sessions);
            for (var i = 0; i < keys.length; i++) {
                allDates.push(this.state.sessions[keys[i]].datetime.toString());
            }
        }

        var selected = [];
        for (var i = 0; i < allDates.length; i++) {
            selected.push(new Date(parseInt(allDates[i].toString().split(" ")[1]), 
                                   parseInt(allDates[i].toString().split(" ")[2]),
                                   parseInt(allDates[i].toString().split(" ")[3])))
        }

        var monthNum = {"Jan" : "01",
                        "Feb" : "02",
                        "Mar" : "03",
                        "Apr" : "04",
                        "May" : "05",
                        "Jun" : "06",
                        "Jul" : "07",
                        "Aug" : "08",
                        "Sep" : "09",
                        "Oct" : "10",
                        "Nov" : "11",
                        "Dec" : "12"}
        

        return (
            <div className="container container-fluid" style={{marginTop: "20px"}}>
                <div className="row">
                    <div className="col-lg-4 offset-lg-2 mx-auto">
                        <InfiniteCalendar
                            theme={{
                               selectionColor: '#64af22',
                               textColor: {
                                 default: '#333',
                                 active: '#FFF'
                               },
                               weekdayColor: '#64af22',
                               headerColor: '#64af22',
                               floatingNav: {
                                 background: '#006400',
                                 color: '#FFF',
                                 chevron: '#FFA726'
                               }
                            }}
                            width={(window.innerWidth <= 450) ? window.innerWidth : 450}
                            height={window.innerHeight - 300}
                            rowHeight={70}
                            min={new Date(2017, 11, 1)}
                            minDate={new Date(2017, 11, 1)}
                            max={new Date(2018, 12, 13)}
                            maxDate={new Date(2018, 12, 13)}
                            onSelect={this.getFilteredSessions()}
                        />
                    </div>
                    <div className="col-lg-6 mx-auto">
                        {allSessionBlocks}
                        {allDates.toString().split(" ")[3]} 
                                                {monthNum[allDates.toString().split(" ")[1]]}
                                                {allDates.toString().split(" ")[2]}
                    </div>
                </div>
            </div>
        )
    }
}

export default Journal;
