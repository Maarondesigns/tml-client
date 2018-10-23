import React, { Component } from "react";

//components
import Todos from "./Todos";
import AddTodo from "./AddTodo";

//functions
import { showAddForms } from "../util_functions/showAddForms";
import { scrollToBottom } from "../util_functions/scrollToBottom";
import { selectList } from "../util_functions/selectList";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  showAddForms() {
    this.setState({ selected: null });
    showAddForms();
    selectList("todo");
  }

  componentDidMount() {
    scrollToBottom();
  }

  render() {
    return (
      <div>
        <Todos selected={this.state.selected} />
        <button
          id="add-button"
          onClick={() => {
            this.showAddForms();
          }}
        >
          +
        </button>
        <div id="add-forms">
          <AddTodo />
        </div>
      </div>
    );
  }
}

export default ToDoList;
