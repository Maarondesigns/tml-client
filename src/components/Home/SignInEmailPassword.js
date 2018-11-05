import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

import { getUserQuery } from "../../queries/userqueries";

class SignInEmailPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      newUser: false
    };
  }

  isNewUser(checkbox) {
    let container = document.getElementById("v-password-container");
    if (checkbox.checked) {
      this.setState({
        newUser: true
      });
      container.style.display = "block";
    } else {
      this.setState({
        newUser: false
      });
      container.style.display = "none";
    }
  }

  validateUsername(value) {
    let usernameError = document.getElementById("username-error");
    if (!value) {
      usernameError.innerHTML = `Cannot be blank`;
      return;
    }
    let regex = /[{}[\]()'"`,;:]/g;
    if (value.match(regex)) {
      usernameError.innerHTML = `Cannot contain {}[]()'",;:`;
      return;
    } else {
      usernameError.innerHTML = "";
      if (value.indexOf("@") !== -1) {
        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value.match(emailRegex)) {
          this.setState({ email: value, username: "used email" });
        } else {
          usernameError.innerHTML = `Invalid email format`;
          this.setState({ email: null, username: null });
        }
      } else {
        this.setState({ username: value, email: null });
      }
    }
  }
  validatePassword(value) {
    let passwordError = document.getElementById("password-error");
    if (!value) {
      passwordError.innerHTML = `Cannot be blank`;
      return;
    }
    if (value.length < 8) {
      passwordError.innerHTML = `Password must be at least 8 characters.`;
      return;
    }
    let regex = /[{}[\]()'"`,;:]/g;
    if (value.match(regex)) {
      passwordError.innerHTML = `Cannot contain {}[]()'",;:`;
      return;
    } else {
      passwordError.innerHTML = "";
      this.setState({ password: value });
    }
  }
  passwordMatches(value) {
    let vpasswordError = document.getElementById("vpassword-error");
    if (!value) {
      vpasswordError.innerHTML = `Cannot be blank`;
      return;
    }
    if (value !== this.state.password) {
      vpasswordError.innerHTML = "Password does not match.";
    } else {
      vpasswordError.innerHTML = "";
    }
  }

  submitForm(e) {
    e.preventDefault();
    //validate inputs in case they're empty
    this.validateUsername(document.getElementById("username").value);
    this.validatePassword(document.getElementById("password").value);
    if (this.state.newUser === true) {
      this.passwordMatches(document.getElementById("vpassword").value);
    }
    //check for errors in form inputs
    let uError = document.getElementById("username-error").innerHTML;
    let pError = document.getElementById("password-error").innerHTML;
    let vpError = document.getElementById("vpassword-error").innerHTML;
    if (uError || pError || vpError) {
      alert("Please fix errors.");
      return;
    } else {
      //if no error initiate sign in
      //set url based on existing vs new user
      let signin;
      if (this.state.newUser === true) {
        signin = "register";
      } else if (this.state.newUser === false) {
        signin = "login";
      }
      //post user request
      fetch("https://mikes-reading-list.herokuapp.com/auth/" + signin, {
        // fetch("http://192.168.0.8:4000/auth/" + signin, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      }).then(function(response) {
        //if fails alerts with custom message
        if (response.status === 401) {
          response.json().then(json => {
            alert(json.message);
          });
        } //if successful refresh with cookies
        if (response.status === 200) {
          window.location.reload(false);
        }
      });
    }
  }

  render() {
    return (
      <form action="" id="add-new-user" onSubmit={this.submitForm.bind(this)}>
        <p>
          <label>
            <input
              type="checkbox"
              onClick={e => {
                this.isNewUser(e.target);
              }}
            />
            <span>New User</span>
          </label>
        </p>
        <div className="row">
          <div className="input-field">
            <input
              id="username"
              type="text"
              className="validate"
              onChange={e => {
                let value = e.target.value;
                this.validateUsername(value);
              }}
            />
            <label className="active" htmlFor="username">
              Username or Email
            </label>
          </div>
          <div className="error-text" id="username-error" />
        </div>
        <div className="row">
          <div className="input-field">
            <input
              id="password"
              type="password"
              className="validate"
              onChange={e => {
                let value = e.target.value;
                this.validatePassword(value);
              }}
            />
            <label className="active" htmlFor="password">
              Password
            </label>
          </div>
          <div className="error-text" id="password-error" />
        </div>
        <div
          className="row"
          id="v-password-container"
          style={{ display: "none" }}
        >
          <div className="input-field">
            <input
              id="vpassword"
              type="password"
              className="validate"
              onChange={e => this.passwordMatches(e.target.value)}
            />
            <label className="active" htmlFor="vpassword">
              Verify Password
            </label>
          </div>
          <div className="error-text" id="vpassword-error" />
        </div>
        <button
          id="add-user-button"
          className="btn btn-small waves-effect waves-light col m4 s4 pull-m1 pull-s1"
        >
          Sign In
          {/* <i className="material-icons">+</i> */}
        </button>
      </form>
    );
  }
}

export default compose(graphql(getUserQuery, { name: "getUserQuery" }))(
  SignInEmailPassword
);
