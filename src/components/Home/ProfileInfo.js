import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import M from "materialize-css";

//queries
import { updateUserMutation, getUserQuery } from "../../queries/userqueries";

//functions
import { mapUrlToIcons } from "../util_functions/mapUrlToIcons";

class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updating: false,
      username: "",
      email: "",
      bio: "",
      links: props.user.links,
      password: "",
      new_pass: "",
      verify_pass: ""
    };
  }

  displayId() {
    let signInMethod;
    if (this.props.user.googleId && !this.props.user.password) {
      signInMethod = "Google only";
    } else if (this.props.user.facebookId && !this.props.user.password) {
      signInMethod = "Facebook only";
    } else if (this.props.user.googleId && this.props.user.password) {
      signInMethod = "Google and username/email";
    } else if (this.props.user.facebookId && this.props.user.password) {
      signInMethod = "Facebook and username/email";
    } else {
      signInMethod = "Username/Email only";
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

  addLinks() {
    function addAnotherLink() {
      let input = document.getElementById("add-link-input");
      if (!input.value.match(/^http/)) {
        alert("Please include http:// or https://");
      } else {
        this.setState({ links: [...this.state.links, input.value] });
        input.value = "";
      }
    }
    let editingIcons = mapUrlToIcons(this.state.links).map(icon => {
      return (
        <div>
          {icon}
          <div
            className="delete-social-icons"
            onClick={e => {
              //get the href link of the icon and remove any trailing '/'
              let removeUrl = e.target.previousSibling.childNodes[0].href.replace(
                /\/$/,
                ""
              );
              //filter that url from links array and set state to new filter
              let linksFilter = this.state.links.filter(
                link => link !== removeUrl
              );
              this.setState({ links: linksFilter });
            }}
          >
            x
          </div>
        </div>
      );
    });

    return (
      <div id="add-links-container">
        <input id="add-link-input" type="text" />
        <div id="links-icons">
          <div className="btn btn-small" onClick={addAnotherLink.bind(this)}>
            <i className="material-icons">add</i>
          </div>
          {editingIcons}
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    let editBio = document.getElementById("edit-user-bio");
    if (editBio) {
      M.textareaAutoResize(editBio);
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
    if (this.state.bio) user["bio"] = this.state.bio;
    if (this.state.links) user["links"] = this.state.links;
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
          bio: "",
          links: this.props.user.links,
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
          <div>Bio: {this.props.user.bio}</div>
          <div>
            Links: <div id="links-icons">{mapUrlToIcons(this.state.links)}</div>
          </div>
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
          Bio:{" "}
          <textarea
            type="text"
            className="materialize-textarea"
            id="edit-user-bio"
            defaultValue={this.props.user.bio}
            onChange={e => this.setState({ bio: e.target.value })}
          />
          Links: {this.addLinks()}
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
