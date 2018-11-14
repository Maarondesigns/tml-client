import React, { Component } from "react";

//components
import Stats from "./Stats";
import PolicyLinks from "./PolicyLinks";
import SupportLinks from "./SupportLinks";
import ProfileInfo from "./ProfileInfo";

class Dash extends Component {
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
  logout() {
    // fetch("http://localhost:4000/auth/logout", {
    fetch("https://mikes-reading-list.herokuapp.com/auth/logout", {
      redirect: "follow",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status === 200) {
        window.location.reload(false);
      }
    });
  }

  render() {
    return (
      <div>
        <h4>WELCOME</h4>
        <div id="books-and-details">
          <div className="user-dashboard webkit-scroll">
            <Stats />
            <div className="sign-out">
              <div className="profile-info card">
                <h5>Profile Info:</h5>
                {this.displayAvatar()}
                <ProfileInfo user={this.props.user} />
              </div>

              <div className="dash-policy-container">
                <div className="support-container card">
                  <SupportLinks />
                </div>
                <div className="policy-container card">
                  <PolicyLinks />
                </div>
                <button
                  className="btn btn-small logout-button"
                  onClick={this.logout}
                >
                  Logout
                  <i className="material-icons right">directions_run</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dash;
