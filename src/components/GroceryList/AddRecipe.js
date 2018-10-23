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

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      instructions: "",
      ingredients: ""
    };
  }

  submitForm(e) {
    e.preventDefault();
    let name = document.querySelector("#recipe_name");
    let text = name.nextSibling;
    if (name.value.length === 0) {
      text.innerHTML = "Name cannot be blank";
      text.style.color = "red";
      return;
    }

    new Promise(() => showAddForms()).then(selectList("recipe"));

    this.props
      .addRecipeMutation({
        variables: {
          name: this.state.name,
          instructions: this.state.instructions,
          ingredients: this.state.ingredients,
          userId: this.props.getUserQuery.user.id
        }
      })
      .then(() => this.props.getRecipesQuery.refetch())
      .then(data => {
        //return label to normal
        text.innerHTML = "Recipe Name";
        text.style.color = "#9e9e9e";
        //clear form field values
        let ingredients = document.getElementById("ingredients");
        let instructions = document.getElementById("instructions");
        name.value = ingredients.value = instructions.value = "";
        //scroll to new todo position and slide left
        let RecipeList = document.getElementById("recipe-list");
        let newList = data.data.recipes;
        let newRecipe = document.getElementById(newList[newList.length - 1].id);
        RecipeList.scrollTop = newRecipe.offsetTop;
        newRecipe.classList.add("slide-book-left");
      });
  }

  render() {
    return (
      <div className="add-todos-container">
        <form action="" id="add-authors" onSubmit={this.submitForm.bind(this)}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="ingredients"
                type="text"
                className="validate"
                onChange={e => {
                  this.setState({
                    ingredients: e.target.value.split(",").map(x => x.trim())
                  });
                }}
              />
              <label className="active" htmlFor="ingredients">
                Ingredients: Quantity (comma separated)
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="instructions"
                type="text"
                className="materialize-textarea validate"
                onChange={e => this.setState({ instructions: e.target.value })}
              />
              <label className="active" htmlFor="instructions">
                Cooking Instructions
              </label>
            </div>
          </div>
          <div className="row valign-wrapper">
            <div className="input-field col m6 s6 pull-m1 pull-s1">
              <input
                id="recipe_name"
                type="text"
                className="validate"
                onChange={e => {
                  let name = document.querySelector("#recipe_name");
                  let text = name.nextSibling;
                  text.innerHTML = "Recipe Name";
                  text.style.color = "#9e9e9e";
                  this.setState({ name: e.target.value });
                }}
              />
              <label className="active" htmlFor="recipe_name">
                Recipe Name
              </label>
            </div>
            <button
              id="add-todo-button"
              className="btn btn-small waves-effect waves-light col m4 s4 pull-m1 pull-s1"
            >
              + Recipe
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getUserQuery, { name: "getUserQuery" }),
  graphql(getRecipesQuery, { name: "getRecipesQuery" }),
  graphql(getGroceriesQuery, { name: "getGroceriesQuery" }),
  graphql(addGroceryMutation, { name: "addGroceryMutation" }),
  graphql(addRecipeMutation, { name: "addRecipeMutation" })
)(AddRecipe);
