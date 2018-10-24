import React, { Component } from "react";

class FriendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupVisible: false,
      friendExists: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.value != null) {
      this.props.addNewFriend(this.state.value);

      this.setState({
        isPopupVisible: true
      });

      setTimeout(() => {
        this.setState({
          isPopupVisible: false
        });
      }, 3000);
    }
  }

  render() {
    return (
      <div className="container">
        <form className="row">
          <div className="col-lg-10">
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Add friend by email"
            />
          </div>
          <div className="col-lg-2">
            <button
              className="btn btn-sprout-dark"
              onClick={this.handleClick.bind(this)}
              style={{ marginBottom: "20px" }}
            >
              Add Friend
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default FriendForm;
