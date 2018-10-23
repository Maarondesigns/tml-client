import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getTodosQuery,
  removeTodoMutation,
  updateTodoMutation
} from "../../queries/todoqueries";

//components
import TodoDetails from "./TodoDetails";

//functions
import { selectThis } from "../util_functions/selectThis";
import { selectList } from "../util_functions/selectList";
import CompleteItem from "../Reusable/CompletedButton";

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      updating: false,
      timeouts: []
    };
  }

  componentWillReceiveProps() {
    // DE-SELECT LIST ITEM WHEN ADD-FORMS BUTTON IS CLICKED
    this.setState({ selected: this.props.selected });
  }

  displayTodos() {
    let data = this.props.getTodosQuery;
    if (data.loading === true) {
      return <div>Loading Todos...</div>;
    } else {
      let todos = data.todos.filter(x => x.completed !== true);
      let completed = data.todos.filter(x => x.completed === true);

      todos.sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
      let fontSize = { fontSize: "1.5rem" };
      return (
        <div>
          {todos.map((todo, index) => {
            //LIST OF NOT YET COMPLETED SORTED CHRONOLOGICALLY BY DEADLINE
            let timeUntilDeadline = Math.ceil(
              (new Date(todo.deadline).getTime() - new Date().getTime()) /
                86400000
            );
            let color = `rgb(${255 - timeUntilDeadline * 10}, 146,198)`;

            let textStyle = {
              color: color
            };
            if (timeUntilDeadline < 0) {
              textStyle = { color: "rgb(255,0,0", textDecoration: "underline" };
            }

            return (
              //RETURNING THE LIST OF ITEMS NOT YET COMPLETED
              <li className="book-li" id={todo.id} key={todo.id}>
                <CompleteItem
                  buttonId={"delete-book"}
                  buttonSymbol={"check"}
                  id={todo.id}
                  thisQuery={data}
                  thisMutation={this.props.updateTodoMutation}
                />
                <div
                  className="booklist-text"
                  onClick={e => {
                    let parent = e.target.parentNode;
                    this.setState({ selected: todo.id, updating: false });
                    selectThis(parent);
                  }}
                >
                  {todo.name}{" "}
                  <span style={textStyle}>(in {timeUntilDeadline} days)</span>
                </div>
                <button
                  id="edit-item"
                  onClick={e => {
                    let parent = e.target.parentNode;
                    this.setState({ selected: todo.id, updating: true });
                    selectThis(parent);
                  }}
                >
                  <i className="material-icons" style={fontSize}>
                    edit
                  </i>
                </button>
              </li>
            );
          })}
          {completed.map(todo => {
            //LIST OF COMPLETED ITEMS AT BOTTOM
            return (
              <li className="book-li" id={todo.id} key={todo.id}>
                <button
                  id="delete-book"
                  onClick={e => {
                    this.deleteTodo(todo.id, e.target.parentNode);
                  }}
                >
                  <i className="material-icons" style={fontSize}>
                    delete
                  </i>
                </button>

                <div className="booklist-text completed">{todo.name}</div>
                <CompleteItem
                  buttonId={"edit-item"}
                  buttonSymbol={"arrow_upward"}
                  id={todo.id}
                  thisQuery={data}
                  thisMutation={this.props.updateTodoMutation}
                />
              </li>
            );
          })}
        </div>
      );
    }
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
          <ul className="book-list">{this.displayTodos()}</ul>
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
  graphql(getTodosQuery, { name: "getTodosQuery" }),
  graphql(removeTodoMutation, { name: "removeTodoMutation" }),
  graphql(updateTodoMutation, { name: "updateTodoMutation" })
)(Todos);
