import React, { Component } from "react";
import facebookLogo from "../../img/facebook_logo.png";
import googleLogo from "../../img/google_logo.png";

//components
import PolicyLinks from "./PolicyLinks";
import SupportLinks from "./SupportLinks";

class SignIn extends Component {
  showHelpText() {
    document.querySelector(".sign-in-help-text").style.display = "block";
  }

  showAboutApp() {
    document.querySelector(".about-app").classList.add("show-about-app");
  }
  render() {
    return (
      <div>
        <h4>WELCOME</h4>
        <div id="books-and-details">
          <div className="sign-in webkit-scroll">
            <p>Hi, my name is Michael and I made an app!</p>
            <span className="link-text" onClick={this.showAboutApp}>
              Read More <i className="material-icons tiny">arrow_downward</i>
            </span>
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
            <h6>Sign in using...</h6>

            <div className="google">
              <a
                href="https://mikes-reading-list.herokuapp.com/auth/google"
                className="btn"
              >
                {/* FOR TESTING PURPOSES____________________________ */}
                {/* <a href="http://localhost:4000/auth/google" className="btn"> */}
                {/* FOR TESTING PURPOSES____________________________ */}
                <img src={googleLogo} alt="Google Logo" /> Google
              </a>
            </div>
            <div className="facebook">
              <a
                href="https://mikes-reading-list.herokuapp.com/auth/facebook"
                className="btn"
              >
                {/* FOR TESTING PURPOSES____________________________ */}
                {/* <a href="http://localhost:4000/auth/facebook" className="btn"> */}
                {/* FOR TESTING PURPOSES____________________________ */}
                <img src={facebookLogo} alt="Facebook Logo" /> Facebook
              </a>
            </div>
            <div className="sign-in-help">
              <button
                className="btn btn-small btn-floating"
                onClick={this.showHelpText}
              >
                Why?
              </button>
              <div className="sign-in-help-text">
                I take your security and personal information seriously. Signing
                in using Facebook or Google means that, in addition to not
                having to remember another password, this app will never know
                your password. Your user login will be encrypted and only a
                valid decryption cookie lasting 24 hours will be able to unlock
                your data keeping you "signed-in".
              </div>
            </div>
            <div className="support-container">
              If you like the app or see any issues please: <SupportLinks />
            </div>
            <div className="policy-container">
              By signing into this app with any of the social links you create
              an account and agree to the
              <PolicyLinks />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
