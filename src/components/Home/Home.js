import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

//components
import SignIn from "./SignIn";
import Dash from "./Dash";

//queries
import { getUserQuery } from "../../queries/userqueries";

class Home extends Component {
  displayDash() {
    let data = this.props.getUserQuery;

    if (data.user) {
      return <Dash user={data.user} />;
    } else {
      let tabs = document.getElementById("nav-tabs");
      let main = document.getElementById("main");
      let bns = document.getElementById("books-and-details");
      if (tabs) tabs.style.display = "none";
      if (main) {
        main.style.height = "100vh";
        main.style.marginTop = 0;
      }
      if (bns) {
        bns.style.height = "100vh";
        bns.style.maxHeight = "100vh";
      }
      return <SignIn />;
    }
  }
  render() {
    return <div>{this.displayDash()}</div>;
  }
}

export default compose(graphql(getUserQuery, { name: "getUserQuery" }))(Home);
