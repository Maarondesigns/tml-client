import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

//components
import Groceries from "./Groceries";
import AddGrocery from "./AddGrocery";
import AddRecipe from "./AddRecipe";

//queries
import { getUserQuery } from "../../queries/userqueries";

//functions
import { showAddForms } from "../util_functions/showAddForms";
import { showAddFormTwice } from "../util_functions/showAddFormTwice";
import { scrollToBottom } from "../util_functions/scrollToBottom";
import { selectList } from "../util_functions/selectList";
import { dragAndDrop } from "../util_functions/dragAndDrop";

class GroceryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  showAddForms() {
    this.setState({ selected: null });
    showAddForms();
    selectList("both");
  }

  showSpecificForm(show, hide) {
    setTimeout(() => {
      document.getElementById("add-" + show + "-form").style.display =
        "initial";
      document.getElementById("add-" + hide + "-form").style.display = "none";
      document.getElementById("show-" + hide + "-form").style.display =
        "initial";
      document.getElementById("show-" + show + "-form").style.display = "none";
    }, 100);
    showAddFormTwice();
  }

  componentDidMount() {
    scrollToBottom();
    dragAndDrop();
  }

  render() {
    return (
      <div>
        <Groceries selected={this.state.selected} />
        <button
          id="add-button"
          onClick={() => {
            this.showAddForms();
          }}
        >
          +
        </button>
        <div id="add-forms">
          <div id="recipe-or-grocery">
            <button
              id="show-grocery-form"
              className="btn btn-small"
              onClick={() => this.showSpecificForm("grocery", "recipe")}
            >
              Add Grocery Form
            </button>
            <button
              id="show-recipe-form"
              className="btn btn-small"
              onClick={() => this.showSpecificForm("recipe", "grocery")}
            >
              Add Recipe Form
            </button>
          </div>
          <div id="add-grocery-form" style={{ display: "none" }}>
            <AddGrocery />
          </div>
          <div id="add-recipe-form" style={{ display: "none" }}>
            <AddRecipe />
          </div>
        </div>
      </div>
    );
  }
}

export default compose(graphql(getUserQuery, { name: "getUserQuery" }))(
  GroceryList
);
