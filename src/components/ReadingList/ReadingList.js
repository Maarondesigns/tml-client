import React, { Component } from "react";

//components
import Books from "./Books";
import AddBook from "./AddBook";
import AddAuthor from "./AddAuthor";

//functions
import { showAddForms } from "../util_functions/showAddForms";
import { scrollToBottom } from "../util_functions/scrollToBottom";
import { selectList } from "../util_functions/selectList";

class ReadingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  showAddForms() {
    this.setState({ selected: null });
    showAddForms();
    selectList("reading");
  }

  componentDidMount() {
    scrollToBottom();
  }
  render() {
    return (
      <div>
        <Books selected={this.state.selected} />
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
          <AddAuthor />
        </div>
      </div>
    );
  }
}

export default ReadingList;
