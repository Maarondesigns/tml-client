import React, { Component } from "react";

//components
import Stats from "./Stats";
import PolicyLinks from "./PolicyLinks";
import SupportLinks from "./SupportLinks";

class Dash extends Component {
  displayId() {
    if (this.props.user.googleId) {
      return <div>Connected using Google (ID: {this.props.user.googleId})</div>;
    } else if (this.props.user.facebookId) {
      return (
        <div>
          Connected using Facebook (ID:
          {this.props.user.facebookId})
        </div>
      );
    }
  }
  displayAvatar() {
    if (this.props.user.avatar) {
      return <img src={this.props.user.avatar} alt="profile avatar" />;
    } else {
      return (
        <div className="btn btn-large btn-floating">
          <i className="large material-icons">account_circle</i>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h4>WELCOME</h4>
        <div id="books-and-details">
          <div className="user-dashboard webkit-scroll">
            <Stats />
            <div className="sign-out">
              <div className="profile-info">
                <h5>Profile Info:</h5>
                {this.displayAvatar()}
                <div>User Name: {this.props.user.username}</div>
                <div>Email: {this.props.user.email}</div>
                {this.displayId()}
                <button className="btn btn-small logout-button">
                  <a
                    href="https://mikes-reading-list.herokuapp.com/auth/logout"
                    className=""
                  >
                    <label>Logout</label>
                    <i className="material-icons right">directions_run</i>
                  </a>
                  {/* FOR TESTING PURPOSES____________________________ */}
                  {/* <a href="http://localhost:4000/auth/logout" className="">
                    <label>Logout</label>
                    <i className="material-icons right">directions_run</i>
                  </a> */}
                  {/* FOR TESTING PURPOSES____________________________ */}
                </button>
              </div>
              <div className="dash-policy-container">
                <div className="support-container">
                  <SupportLinks />
                </div>
                <div className="policy-container">
                  <PolicyLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dash;
