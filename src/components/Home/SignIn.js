import React, { Component } from "react";
import facebookLogo from "../../img/facebook_logo.png";
import googleLogo from "../../img/google_logo.png";

//components
import PolicyLinks from "./PolicyLinks";
import SupportLinks from "./SupportLinks";
import IntroVideo from "./IntroVideo";
import SignInEmailPassword from "./SignInEmailPassword";

class SignIn extends Component {
  state = {
    showing: ".social-login",
    hiding: ".username-login"
  };

  showSignIn() {
    let showing = this.state.showing;
    let hiding = this.state.hiding;
    this.setState({ showing: hiding, hiding: showing });
    let signIn = document.querySelector(".sign-in-help");
    signIn.classList.add("signin-animation");
    setTimeout(() => {
      document.querySelector(showing).style.display = "none";
      document.querySelector(hiding).style.display = "block";
    }, 400);
    setTimeout(() => {
      signIn.classList.remove("signin-animation");
    }, 1000);
  }

  showAboutApp() {
    document.querySelector(".about-app").classList.add("show-about-app");
  }
  render() {
    return (
      <div>
        <h4>WELCOME</h4>
        <div className="sign-in webkit-scroll">
          <div className="intro-container card">
            <p>Hi, my name is Michael and I made an app!</p>
            <IntroVideo />
            <p className="link-text" onClick={this.showAboutApp}>
              Read More <i className="material-icons tiny">arrow_downward</i>
            </p>
            <div className="about-app">
              <p>
                Have you found yourself constantly making different lists trying
                to be productive, like me, but they always seem to get
                disorganized? Sure there are plenty of nice todo list apps out
                there, but they all force you to customize each list yourself
                with catch-all functionality.
              </p>
              <p>
                This app changes that. Every list type you find here has
                different functionality that is best suited for that specific
                list type. Currently with Todo, Reading, and Grocery/Recipe and
                more type to continually be designed and added. As this is a new
                endeavor I am looking for creative input and suggestions about
                everything, new types of lists and features to add and make the
                experience better, and even the name of the app itself. Sign up
                below and become one of my first beta testers and part of the
                journey!
              </p>
            </div>
          </div>
          <div className="sign-in-help card">
            <div className="social-login">
              <button
                className="btn btn-small sign-in-button"
                onClick={this.showSignIn.bind(this)}
              >
                <i className="large material-icons">account_circle</i>
                Sign in with Username
              </button>
              <div className="google btn btn-small sign-in-button">
                <a href="https://mikes-reading-list.herokuapp.com/auth/google">
                  {/* FOR TESTING PURPOSES____________________________ */}
                  {/* <a href="http://192.168.0.8:4000/auth/google"> */}
                  {/* FOR TESTING PURPOSES____________________________ */}
                  <img src={googleLogo} alt="Google Logo" /> Sign in with Google
                </a>
              </div>
              <div className="facebook btn btn-small sign-in-button">
                <a href="https://mikes-reading-list.herokuapp.com/auth/facebook">
                  {/* FOR TESTING PURPOSES____________________________ */}
                  {/* <a href="http://192.168.0.8:4000/auth/facebook"> */}
                  {/* FOR TESTING PURPOSES____________________________ */}
                  <img src={facebookLogo} alt="Facebook Logo" /> Sign in with
                  Facebook
                </a>
              </div>
            </div>
            <div className="username-login">
              <button
                className="btn btn-small sign-in-button"
                onClick={this.showSignIn.bind(this)}
              >
                Sign in with Social Media
              </button>
              <SignInEmailPassword />
            </div>
          </div>
          <div className="support-container card">
            <SupportLinks />
          </div>
          <div className="policy-container card">
            By creating an account you agree to the
            <PolicyLinks />
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
