import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import M from "materialize-css";

//queries
import { addTodoMutation, getTodosQuery } from "../../queries/todoqueries";
import { getUserQuery } from "../../queries/userqueries";

//functions
import { selectList } from "../util_functions/selectList";
import { showAddForms } from "../util_functions/showAddForms";
import { showAddFormTwice } from "../util_functions/showAddFormTwice";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      deadline: ""
    };
  }

  componentDidMount() {
    var elems = document.querySelectorAll(".datepicker");
    M.Datepicker.init(elems, {
      format: "yyyy-mm-dd",
      container: "#datepicker-container",
      onOpen: () => {
        let dp = document.getElementById("datepicker-container");
        dp.style.opacity = 0;
        setTimeout(() => {
          dp.style.opacity = 1;
        }, 600);
        showAddFormTwice();
      },
      onClose: () => showAddFormTwice()
    });
  }

  submitForm(e) {
    e.preventDefault();
    let name = document.querySelector("#name");
    let text = name.nextSibling;
    if (name.value.length === 0) {
      text.innerHTML = "Name cannot be blank";
      text.style.color = "red";
      return;
    }

    let deadline = document.getElementById("deadline");

    new Promise(() => showAddForms()).then(selectList("todo"));
    //chaining with refetch() works while refetchQueries inside the mutation creates a race condition
    this.props
      .addTodoMutation({
        variables: {
          name: this.state.name,
          description: this.state.description,
          deadline: deadline.value,
          userId: this.props.getUserQuery.user.id
        }
      })
      .then(() => this.props.getTodosQuery.refetch())
      .then(data => {
        //return label to normal
        text.innerHTML = "Todo Name";
        text.style.color = "#9e9e9e";
        //clear form field values
        let description = document.getElementById("description");
        let deadline = document.getElementById("deadline");
        name.value = description.value = deadline.value = "";
        //scroll to new todo position and slide left
        let todoList = document.querySelector(".book-list");
        let newList = data.data.todos;
        let newFilter = newList.filter(todo => {
          let listItem = document.getElementById(todo.id);
          return !listItem.classList.contains("slide-book-left");
        });
        let newTodo = document.getElementById(newFilter[0].id);
        todoList.scrollTop = newTodo.offsetTop;

        newTodo.classList.add("slide-book-left");
      });
  }

  render() {
    return (
      <div className="add-todos-container">
        <form action="" id="add-books" onSubmit={this.submitForm.bind(this)}>
          <div className="row">
            <div className="input-field">
              <input
                id="name"
                type="text"
                className="validate"
                onChange={e => {
                  let name = document.querySelector("#name");
                  let text = name.nextSibling;
                  text.innerHTML = "Todo Name";
                  text.style.color = "#9e9e9e";
                  this.setState({ name: e.target.value });
                }}
              />
              <label className="active" htmlFor="name">
                Todo Name
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <textarea
                id="description"
                type="text"
                className="materialize-textarea validate"
                onChange={e => this.setState({ description: e.target.value })}
              />
              <label className="active" htmlFor="description">
                Description
              </label>
            </div>
          </div>

          <div className="row valign-wrapper">
            <div className="input-field col m6 s6 pull-m1 pull-s1">
              <input
                id="deadline"
                type="text"
                className=" datepicker validate"
                onChange={e => this.setState({ deadline: e.target.value })}
              />
              <label className="active" htmlFor="deadline">
                Deadline
              </label>
            </div>
            <button
              id="add-todo-button"
              className="btn btn-small waves-effect waves-light col m4 s4 pull-m1 pull-s1"
            >
              Add Todo
              {/* <i className="material-icons">+</i> */}
            </button>
          </div>
          <div className="row" id="datepicker-container" />
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getUserQuery, { name: "getUserQuery" }),
  graphql(getTodosQuery, { name: "getTodosQuery" }),
  graphql(addTodoMutation, { name: "addTodoMutation" })
)(AddTodo);
