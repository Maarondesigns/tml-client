import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getRecipesQuery,
  getGroceriesQuery,
  addGroceryMutation,
  addRecipeMutation
} from "../../queries/groceryqueries";
import { getUserQuery } from "../../queries/userqueries";

//functions
import { selectList } from "../util_functions/selectList";
import { showAddForms } from "../util_functions/showAddForms";

class AddGrocery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: ""
    };
  }

  submitForm(e) {
    e.preventDefault();
    let name = document.querySelector("#grocery_name");
    let text = name.nextSibling;
    if (name.value.length === 0) {
      text.innerHTML = "Name cannot be blank";
      text.style.color = "red";
      return;
    }

    new Promise(() => showAddForms()).then(selectList("grocery"));

    console.log(this.props.getUserQuery);
    this.props
      .addGroceryMutation({
        variables: {
          name: this.state.name,
          quantity: this.state.quantity,
          userId: this.props.getUserQuery.user.id
        }
      })
      .then(() => this.props.getGroceriesQuery.refetch())
      .then(data => {
        //return label to normal
        text.innerHTML = "Grocery";
        text.style.color = "#9e9e9e";
        //clear form field values
        let quantity = document.getElementById("quantity");
        name.value = quantity.value = "";
        //scroll to new item position and slide left
        let groceryList = document.getElementById("grocery-list");
        let newList = data.data.groceries;
        let newGrocery = document.getElementById(
          newList[newList.length - 1].id
        );
        groceryList.scrollTop = newGrocery.offsetTop;
        newGrocery.classList.add("slide-book-left");
      });
  }

  render() {
    return (
      <div className="add-todos-container">
        <form action="" id="add-books" onSubmit={this.submitForm.bind(this)}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="grocery_name"
                type="text"
                className="validate"
                onChange={e => {
                  let name = document.querySelector("#grocery_name");
                  let text = name.nextSibling;
                  text.innerHTML = "Grocery Name";
                  text.style.color = "#9e9e9e";
                  this.setState({ name: e.target.value });
                }}
              />
              <label className="active" htmlFor="grocery_name">
                Grocery
              </label>
            </div>
          </div>
          <div className="row valign-wrapper">
            <div className="input-field col m6 s6 pull-m1 pull-s1">
              <input
                id="quantity"
                type="text"
                className="validate"
                onChange={e => this.setState({ quantity: e.target.value })}
              />
              <label className="active" htmlFor="quantity">
                Quantity
              </label>
            </div>
            <button
              id="add-todo-button"
              className="btn btn-small waves-effect waves-light col m4 s4 pull-m1 pull-s1"
            >
              + Grocery
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getRecipesQuery, { name: "getRecipesQuery" }),
  graphql(getUserQuery, { name: "getUserQuery" }),
  graphql(getGroceriesQuery, { name: "getGroceriesQuery" }),
  graphql(addGroceryMutation, { name: "addGroceryMutation" }),
  graphql(addRecipeMutation, { name: "addRecipeMutation" })
)(AddGrocery);
