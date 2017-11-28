import React, { Component } from "react";
import classNames from "classnames";
import Popup from "./Popup";
import AlertContainer from 'react-alert';
import firebase, { auth, provider, database } from "../firebase.js";

class FriendForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupVisible: false,
      friendExists: false
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  alertOptions = {
    offset: 14,
    position: 'bottom right',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  }
 
  showAlertSuccess = () => {
    this.msg.show('Friend added!', {
      time: 2000,
      type: 'success',
      icon: <img src="path/to/some/img/32x32.png" />
    })
  }

  showAlertFail = () => {
    this.msg.show('That user doesn\'t exist yet!', {
      time: 2000,
      type: 'failure',
      icon: <img src="path/to/some/img/32x32.png" />
    })
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  
  handleClick(e) {
    
    e.preventDefault();
    if (this.state.value != null) {

      this.props.addNewFriend(this.state.value);

      this.showAlertSuccess();

      this.setState({
        isPopupVisible: true
      });

      setTimeout(() => {
        this.setState({
        isPopupVisible: false
      })
      }, 3000);
    } else {
      this.showAlertFail();
    }
    
  }

  render() {
    const isVisible = this.state.isPopupVisible;
    return (
      <div className="row">
        
          <form>
            <input type="text" 
                   value={this.state.value} 
                   onChange={this.handleChange} 
                   placeholder="Add friend by email"
                   style={{display: "inline-block"}}/>
            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            <button className="btn btn-primary" 
                    onClick={this.handleClick.bind(this)}
                    style={{marginBottom: "20px", display: "inline-block"}}>Add Friend</button>
                    
          </form>
          
        
      </div>
    )
  }
}

export default FriendForm;
