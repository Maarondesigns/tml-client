import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import M from "materialize-css";

//queries
import {
  getTodoQuery,
  getTodosQuery,
  updateTodoMutation
} from "../../queries/todoqueries";

//functions
import { selectList } from "../util_functions/selectList";

class TodoDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      deadline: ""
    };
  }
  updateItem(e) {
    e.preventDefault();
    let variables = { id: this.props.todoId };
    if (this.state.name) {
      variables["name"] = this.state.name;
    }
    if (this.state.description) {
      variables["description"] = this.state.description;
    }
    if (this.state.deadline) {
      variables["deadline"] = this.state.deadline;
    }
    this.props
      .updateTodoMutation({
        variables: variables
      })
      .then(() => this.props.getTodosQuery.refetch())
      .then(() => selectList("todo"));
  }

  componentDidUpdate() {
    let editDescription = document.getElementById("edit-description");
    if (editDescription) {
      M.textareaAutoResize(editDescription);
    }
  }

  displayTodoDetails() {
    const { todo } = this.props.data;
    if (todo) {
      if (this.props.updating === true) {
        return (
          <form action="" onSubmit={this.updateItem.bind(this)}>
            Title:{" "}
            <input
              type="text"
              defaultValue={todo.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            Description:{" "}
            <textarea
              className="materialize-textarea"
              id="edit-description"
              type="text"
              defaultValue={todo.description}
              onChange={e => this.setState({ description: e.target.value })}
            />
            Deadline:{" "}
            <input
              type="text"
              defaultValue={todo.deadline}
              onChange={e => this.setState({ deadline: e.target.value })}
            />
            <input className="btn" type="submit" value="Update" />
          </form>
        );
      } else {
        return (
          <div>
            <h5>{todo.name}</h5>
            <p>{todo.description}</p>
            <p>
              By: <strong>{todo.deadline}</strong>
            </p>
          </div>
        );
      }
    } else {
      return <div>No todos selected.</div>;
    }
  }

  render() {
    return <div id="book-details">{this.displayTodoDetails()}</div>;
  }
}

export default compose(
  graphql(getTodoQuery, {
    options: props => {
      return {
        variables: {
          id: props.todoId
        }
      };
    }
  }),
  graphql(updateTodoMutation, { name: "updateTodoMutation" }),
  graphql(getTodosQuery, { name: "getTodosQuery" })
)(TodoDetails);
