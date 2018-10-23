import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import M from "materialize-css";

//queries
import {
  getGroceryQuery,
  getRecipeQuery,
  addGroceryMutation,
  getGroceriesQuery,
  getRecipesQuery,
  updateGroceryMutation,
  updateRecipeMutation
} from "../../queries/groceryqueries";
import { getUserQuery } from "../../queries/userqueries";

//functions
import { selectList } from "../util_functions/selectList";

class GroceryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: "",
      ingredients: "",
      instructions: ""
    };
  }

  splitIngredients(recipe) {
    return recipe.ingredients.map((ingredient, index) => {
      return <li key={"ingredient" + index}>{ingredient}</li>;
    });
  }

  updateItem(e) {
    e.preventDefault();

    const { grocery } = this.props.getGroceryQuery;
    const { recipe } = this.props.getRecipeQuery;

    let variables = { id: this.props.itemId };
    if (this.state.name) {
      variables["name"] = this.state.name;
    }
    if (this.state.quantity) {
      variables["quantity"] = this.state.quantity;
    }
    if (this.state.ingredients) {
      variables["ingredients"] = this.state.ingredients;
    }
    if (this.state.instructions) {
      variables["instructions"] = this.state.instructions;
    }
    if (grocery) {
      console.log(variables);
      this.props
        .updateGroceryMutation({
          variables: variables
        })
        .then(() => this.props.getGroceriesQuery.refetch())
        .then(() => selectList("grocery"));
    }
    if (recipe) {
      this.props
        .updateRecipeMutation({
          variables: variables
        })
        .then(() => this.props.getRecipesQuery.refetch())
        .then(() => selectList("recipe"));
    }
  }

  componentDidUpdate() {
    let editIngredients = document.getElementById("edit-ingredients");
    let editInstructions = document.getElementById("edit-instructions");
    if (editIngredients && editInstructions) {
      M.textareaAutoResize(editIngredients);
      M.textareaAutoResize(editInstructions);
    }
  }

  displayItemDetails() {
    const { grocery } = this.props.getGroceryQuery;
    const { recipe } = this.props.getRecipeQuery;

    if (grocery) {
      if (this.props.updating === true) {
        return (
          <form action="" onSubmit={this.updateItem.bind(this)}>
            Title:{" "}
            <input
              type="text"
              defaultValue={grocery.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            Quantity:{" "}
            <input
              type="text"
              defaultValue={grocery.quantity}
              onChange={e => this.setState({ quantity: e.target.value })}
            />
            <input className="btn" type="submit" value="Update" />
          </form>
        );
      } else {
        return (
          <div>
            <h5>{grocery.name}</h5>
            <p>{grocery.quantity}</p>
          </div>
        );
      }
    } else if (recipe) {
      if (this.props.updating === true) {
        return (
          <form action="" onSubmit={this.updateItem.bind(this)}>
            Recipe:{" "}
            <input
              type="text"
              defaultValue={recipe.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            Ingredients:{" "}
            <textarea
              className="materialize-textarea"
              id="edit-ingredients"
              type="text"
              defaultValue={recipe.ingredients}
              onChange={e =>
                this.setState({
                  ingredients: e.target.value.split(",").map(x => x.trim())
                })
              }
            />
            Instructions:{" "}
            <textarea
              className="materialize-textarea"
              id="edit-instructions"
              type="text"
              defaultValue={recipe.instructions}
              onChange={e => this.setState({ instructions: e.target.value })}
            />
            <input className="btn" type="submit" value="Update" />
          </form>
        );
      } else {
        return (
          <div>
            <h5>{recipe.name}</h5>
            <p>Ingredients:</p>
            <ul>{this.splitIngredients(recipe)}</ul>
            <button
              className="btn"
              onClick={() => this.addGroceriesFromRecipe()}
            >
              Add Recipe to Grocery List
            </button>
            <p>{recipe.instructions}</p>
          </div>
        );
      }
    } else {
      return <div>No grocerys selected.</div>;
    }
  }

  addGroceriesFromRecipe() {
    selectList("grocery");
    const { recipe } = this.props.getRecipeQuery;
    recipe.ingredients.forEach(ingredient => {
      let item = ingredient.split(":");
      this.props
        .addGroceryMutation({
          variables: {
            name: item[0],
            quantity: item[1],
            userId: this.props.getUserQuery.user.id
          }
        })
        .then(() => this.props.getGroceriesQuery.refetch())
        .then(data => {
          let groceryList = document.getElementById("grocery-list");
          let newList = data.data.groceries;
          newList.forEach((x, i) => {
            let newGrocery = document.getElementById(x.id);
            groceryList.scrollTop = newGrocery.offsetTop;
            setTimeout(() => {
              newGrocery.classList.add("slide-book-left");
            }, i * 50);
          });
        });
    });
  }

  render() {
    return (
      <div id="book-details" className="item-details">
        {this.displayItemDetails()}
      </div>
    );
  }
}

export default compose(
  graphql(getRecipeQuery, {
    options: props => {
      return {
        variables: {
          id: props.itemId
        }
      };
    },
    name: "getRecipeQuery"
  }),
  graphql(getGroceryQuery, {
    options: props => {
      return {
        variables: {
          id: props.itemId
        }
      };
    },
    name: "getGroceryQuery"
  }),
  graphql(addGroceryMutation, {
    name: "addGroceryMutation"
  }),
  graphql(getGroceriesQuery, {
    name: "getGroceriesQuery"
  }),
  graphql(getRecipesQuery, {
    name: "getRecipesQuery"
  }),
  graphql(updateGroceryMutation, {
    name: "updateGroceryMutation"
  }),
  graphql(updateRecipeMutation, {
    name: "updateRecipeMutation"
  }),
  graphql(getUserQuery, {
    name: "getUserQuery"
  })
)(GroceryDetails);
