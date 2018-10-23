import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import { getUserQuery } from "../queries/userqueries";

class Nav extends Component {
  selectTab = e => {
    document.querySelectorAll(".nav-tab").forEach(el => {
      el.classList.remove("selected-tab");
    });
    e.target.classList.add("selected-tab");
  };

  componentDidUpdate() {
    let tabs = ["todolist", "readinglist", "grocerylist", "home"];

    let urlArray = window.location.href.split("/").filter(x => x.length > 0);

    tabs.forEach(x => {
      let filter = urlArray.filter(url => url.match(x));
      if (filter.length !== 0) {
        document.querySelector("." + x).classList.add("selected-tab");
      } else if (urlArray.length === 2 && this.props.getUserQuery.user)
        document.querySelector(".home").classList.add("selected-tab");
    });
  }

  displayTabs() {
    if (this.props.getUserQuery.user) {
      return (
        <div id="nav-tabs">
          <Link to="/home" className="nav-tab home" onClick={this.selectTab}>
            HOME
          </Link>
          <Link
            to="/todolist"
            className="nav-tab todolist"
            onClick={this.selectTab}
          >
            TO DO
          </Link>
          <Link
            to="/readinglist"
            className="nav-tab readinglist"
            onClick={this.selectTab}
          >
            READING
          </Link>
          <Link
            to="/grocerylist"
            className="nav-tab grocerylist"
            onClick={this.selectTab}
          >
            FOOD
          </Link>
        </div>
      );
    } else {
      return <div />;
    }
  }
  render() {
    return this.displayTabs();
  }
}

export default compose(graphql(getUserQuery, { name: "getUserQuery" }))(Nav);
