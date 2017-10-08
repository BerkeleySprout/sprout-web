import React, { Component } from "react";
import ActivityList from "./ActivityList";

class CategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            score: 0,
            categories: [
                "awe",
                "compassion",
                "connection",
                "empathy",
                "forgiveness",
                "gratitude",
                "happiness",
                "kindness",
                "mindfulness",
                "optimism",
                "resilience_to_stress",
                "self-comp"
            ]
        };
    }

    updateScore() {
        let score = this.state.score + 1;
        this.setState({ score: score });
    }

    render() {
        let categoryNodes = this.state.categories.map(category => {
            return (
                <ActivityList
                    category={category}
                    db={this.props.db}
                    updateScore={() => this.updateScore()}
                />
            );
        });

        return (
            <div>
                <h1> {this.state.score} </h1>

                <ul>{categoryNodes}</ul>
            </div>
        );
    }
}

export default CategoryList;
