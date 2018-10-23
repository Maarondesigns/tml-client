import React, { Component } from "react";

//components
import Groceries from "./Groceries";
import AddBook from "./AddGrocery";
import AddRecipe from "./AddRecipe";

//functions
import { showAddForms } from "../util_functions/showAddForms";
import { scrollToBottom } from "../util_functions/scrollToBottom";
import { selectList } from "../util_functions/selectList";

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

  componentDidMount() {
    scrollToBottom();
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
          <AddBook />
          <AddRecipe />
        </div>
      </div>
    );
  }
}

export default GroceryList;