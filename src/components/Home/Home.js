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
      return <SignIn />;
    }
  }
  render() {
    return <div>{this.displayDash()}</div>;
  }
}

export default compose(graphql(getUserQuery, { name: "getUserQuery" }))(Home);
