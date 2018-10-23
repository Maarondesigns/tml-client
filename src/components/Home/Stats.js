import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

//queries
import { getBooksQuery } from "../../queries/bookqueries";
import { getUserQuery } from "../../queries/userqueries";
import { getTodosQuery } from "../../queries/todoqueries";
import {
  getGroceriesQuery,
  getRecipesQuery
} from "../../queries/groceryqueries";

//components
import DisplayStats from "./DisplayStats";

class Stats extends Component {
  state = {
    refresh: false
  };

  componentDidMount() {
    if (this.state.refresh === false) {
      this.setState({ refresh: true });
    }
  }
  displayStats() {
    // console.log(books, todos, groceries, recipes);
    let { books } = this.props.getBooksQuery;
    let { todos } = this.props.getTodosQuery;
    let { groceries } = this.props.getGroceriesQuery;
    let { recipes } = this.props.getRecipesQuery;
    let container = document.querySelector(".stats-container");
    if (books && todos && groceries && recipes && container) {
      return (
        <DisplayStats
          todos={todos}
          books={books}
          groceries={groceries}
          recipes={recipes}
        />
      );
    } else return <div>Loading...</div>;
  }
  render() {
    return (
      <div className="stats-container">
        <h5>Your Stats:</h5>
        {this.displayStats()}
      </div>
    );
  }
}

export default compose(
  graphql(getUserQuery, { name: "getUserQuery" }),
  graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(getTodosQuery, { name: "getTodosQuery" }),
  graphql(getGroceriesQuery, { name: "getGroceriesQuery" }),
  graphql(getRecipesQuery, { name: "getRecipesQuery" })
)(Stats);
