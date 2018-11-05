import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

//queries
import { updateUserMutation, getUserQuery } from "../../queries/userqueries";

class ProfileInfo extends Component {
  state = {
    updating: false,
    username: "",
    email: "",
    avatar: "",
    password: "",
    new_pass: "",
    verify_pass: ""
  };

  displayId() {
    let signInMethod;
    if (this.props.user.googleId) {
      signInMethod = "Google";
    } else if (this.props.user.facebookId) {
      signInMethod = "Facebook";
    } else {
      signInMethod = "Username/Email";
    }
    return <div>{"Connected using " + signInMethod}</div>;
  }

  changePassword(checkbox) {
    let container = document.getElementById("change-password");
    if (checkbox.checked) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  }

  updateUser(e) {
    e.preventDefault();
    let user = {
      id: this.props.user.id,
      password: this.state.password
    };
    //if created account with social links password is unset
    if (this.props.user.password) {
      user["hash"] = this.props.user.password;
    } else if (this.props.user.googleId) {
      user["hash"] = this.props.user.googleId;
      user["googleId"] = this.props.user.googleId;
    } else if (this.props.user.facebookId) {
      user["hash"] = this.props.user.facebookId;
      user["facebookId"] = this.props.user.facebookId;
    }
    //only set what needs to be changed
    if (this.state.username) user["username"] = this.state.username;
    if (this.state.email) user["email"] = this.state.email;
    if (this.state.avatar) user["avatar"] = this.state.avatar;
    //if changing password make sure no typo
    if (this.state.new_pass) {
      if (this.state.new_pass !== this.state.verify_pass) {
        alert("passwords don't match!");
        return;
      } else {
        user["new_pass"] = this.state.new_pass;
      }
    }
    this.props
      .updateUserMutation({
        variables: user
      })
      .then(() => this.props.getUserQuery.refetch())
      .then(res => {
        this.setState({
          updating: false,
          username: "",
          email: "",
          avatar: "",
          password: "",
          new_pass: "",
          verify_pass: ""
        });
      });
  }

  render() {
    if (this.state.updating === false) {
      return (
        <React.Fragment>
          <div>Username: {this.props.user.username}</div>
          <div>Email: {this.props.user.email}</div>
          {this.displayId()}
          <button
            className="btn btn-small"
            onClick={() => this.setState({ updating: true })}
          >
            <i className="material-icons">edit</i>
          </button>
        </React.Fragment>
      );
    } else if (this.state.updating === true) {
      return (
        <form action="" onSubmit={this.updateUser.bind(this)}>
          Username:{" "}
          <input
            type="text"
            defaultValue={this.props.user.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          Email:{" "}
          <input
            type="text"
            defaultValue={this.props.user.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          Password:{" "}
          <input
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <p>
            <label>
              <input
                type="checkbox"
                onClick={e => {
                  this.changePassword(e.target);
                }}
              />
              <span>Change Password</span>
            </label>
          </p>
          <div id="change-password" style={{ display: "none" }}>
            <div
              className="pass-change-"
              style={{
                fontSize: "10px",
                border: "dashed 1px black",
                borderRadius: "4px",
                padding: "6px",
                marginBottom: "6px"
              }}
            >
              If account was created with social login, password is initally
              unset. Once a password is created it will be needed for updating
              profile. Logging in through social links will still work the same.
            </div>
            New Password:{" "}
            <input
              type="password"
              onChange={e => this.setState({ new_pass: e.target.value })}
            />
            Verify New Password:{" "}
            <input
              type="password"
              onChange={e => this.setState({ verify_pass: e.target.value })}
            />
          </div>
          <button className="btn btn-small" type="submit">
            <i className="material-icons">check</i>
          </button>
        </form>
      );
    }
  }
}

export default compose(
  graphql(updateUserMutation, { name: "updateUserMutation" }),
  graphql(getUserQuery, { name: "getUserQuery" })
)(ProfileInfo);
