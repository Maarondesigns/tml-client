import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

//queries
import {
  getTodosQuery,
  removeTodoMutation,
  updateTodoMutation
} from "../../queries/todoqueries";
import { getUserQuery } from "../../queries/userqueries";

//components
import TodoDetails from "./TodoDetails";
import DisplayListItems from "../Reusable/DisplayListItems";

//functions
import { selectThis } from "../util_functions/selectThis";
import { selectList } from "../util_functions/selectList";

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      updating: false,
      timeouts: []
    };
    this.selectItem = this.selectItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  selectItem(e, item) {
    let parent = e.target.parentNode;
    this.setState({ selected: item.id, updating: false });
    selectThis(parent);
  }
  editItem(e, item) {
    let parent = e.target.parentNode;
    this.setState({ selected: item.id, updating: true });
    selectThis(parent);
  }

  componentWillReceiveProps() {
    // DE-SELECT LIST ITEM WHEN ADD-FORMS BUTTON IS CLICKED
    this.setState({ selected: this.props.selected });
  }

  componentDidMount() {
    //MAKE ALL THE LIST ITEMS SLIDE LEFT ON PAGE LOAD
    let timeouts = [];
    this.props.getTodosQuery.refetch().then(data => {
      data.data.todos.sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
      data.data.todos.forEach((todo, index) => {
        let el = document.getElementById(todo.id);
        timeouts.push(
          setTimeout(() => {
            el.classList.add("slide-book-left");
          }, 100 * index)
        );
      });
      this.setState({ timeouts: [...this.state.timeouts, timeouts] });
    });
  }

  componentWillUnmount() {
    this.state.timeouts.forEach(timeout => clearTimeout(timeout));
  }

  deleteTodo(todo, button) {
    //PERMANENTLY DELETE FROM DATABASE
    button.classList.add("delete-button-clicked");
    setTimeout(() => {
      this.props.removeTodoMutation({
        variables: {
          id: todo
        },
        refetchQueries: [
          {
            query: getTodosQuery
          }
        ]
      });
      this.setState({ selected: null });
    }, 1500);
  }

  render() {
    return (
      <div>
        <h4
          onClick={() => {
            this.setState({ selected: null, updating: false });
            selectList("todo");
          }}
        >
          TO DO LIST
        </h4>
        <div id="books-and-details">
          <ul className="book-list">
            <DisplayListItems
              data={this.props.getTodosQuery}
              mutation={this.props.updateTodoMutation}
              user={this.props.getUserQuery.user}
              type={"todos"}
              selectItem={this.selectItem}
              editItem={this.editItem}
              removeItem={this.props.removeTodoMutation}
            />
          </ul>
          <TodoDetails
            updating={this.state.updating}
            todoId={this.state.selected}
          />
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(getUserQuery, { name: "getUserQuery" }),
  graphql(getTodosQuery, { name: "getTodosQuery" }),
  graphql(removeTodoMutation, { name: "removeTodoMutation" }),
  graphql(updateTodoMutation, { name: "updateTodoMutation" })
)(Todos);
