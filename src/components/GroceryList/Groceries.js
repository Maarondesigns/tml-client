import React, { Component } from "react";
import { graphql, compose } from "react-apollo";

//queries
import {
  getGroceriesQuery,
  removeGroceryMutation,
  getRecipesQuery,
  removeRecipeMutation,
  updateGroceryMutation,
  updateRecipeMutation
} from "../../queries/groceryqueries";
import { getUserQuery } from "../../queries/userqueries";

//components
import GroceryDetails from "./GroceryDetails";
import DisplayListItems from "../Reusable/DisplayListItems";

//functions
import { selectList } from "../util_functions/selectList";
import { selectThis } from "../util_functions/selectThis";

class Groceries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      timeouts: [],
      updating: false
    };
    this.selectItem = this.selectItem.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ selected: this.props.selected });
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

  componentDidMount() {
    let timeouts = [];
    this.props.getGroceriesQuery.refetch().then(data => {
      data.data.groceries.forEach((item, index) => {
        let el = document.getElementById(item.id);

        timeouts.push(
          setTimeout(() => {
            el.classList.add("slide-book-left");
          }, 100 * index)
        );
      });
      this.setState({ timeouts: [...this.state.timeouts, timeouts] });
    });
    this.props.getRecipesQuery.refetch().then(data => {
      data.data.recipes.forEach((item, index) => {
        let el = document.getElementById(item.id);
        timeouts.push(
          setTimeout(() => {
            el.classList.add("slide-book-left");
          }, 100 * index)
        );
      });
      this.setState({ timeouts: [...this.state.timeouts, timeouts] });
    });
    selectList("both");
  }

  componentWillUnmount() {
    document.querySelectorAll(".book-li").forEach(li => {
      let list = li.parentNode.parentNode.id;
      if (list === "grocery-list") {
        this.props.updateGroceryMutation({
          variables: {
            id: li.id,
            order: +li.getAttribute("data-order")
          }
        });
      } else if (list === "recipe-list") {
        this.props.updateRecipeMutation({
          variables: {
            id: li.id,
            order: +li.getAttribute("data-order")
          }
        });
      }
    });
    this.state.timeouts.forEach(timeout => clearTimeout(timeout));
  }

  render() {
    return (
      <div>
        <h4
          id="food-list-title"
          onClick={() => {
            this.setState({ selected: null, updating: false });
            selectList("both");
          }}
        >
          FOOD LISTS
        </h4>
        <div id="books-and-details">
          <div id="grocery-and-recipe">
            <h5
              className="food-titles"
              onClick={() => {
                this.setState({ selected: null, updating: false });
                selectList("recipe");
              }}
            >
              RECIPES
            </h5>
            <ul id="recipe-list" className="book-list">
              <DisplayListItems
                data={this.props.getRecipesQuery}
                mutation={this.props.updateRecipeMutation}
                user={this.props.getUserQuery.user}
                type={"recipes"}
                selectItem={this.selectItem}
                editItem={this.editItem}
                removeItem={this.props.removeRecipeMutation}
              />
            </ul>
            <h5
              className="food-titles"
              onClick={() => {
                this.setState({ selected: null, updating: false });
                selectList("grocery");
              }}
            >
              GROCERIES
            </h5>
            <ul id="grocery-list" className="book-list">
              <DisplayListItems
                data={this.props.getGroceriesQuery}
                mutation={this.props.updateGroceryMutation}
                user={this.props.getUserQuery.user}
                type={"groceries"}
                selectItem={this.selectItem}
                editItem={this.editItem}
                removeItem={this.props.removeGroceryMutation}
              />
            </ul>
          </div>
          <GroceryDetails
            updating={this.state.updating}
            itemId={this.state.selected}
          />
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(getUserQuery, { name: "getUserQuery" }),
  graphql(getGroceriesQuery, { name: "getGroceriesQuery" }),
  graphql(removeGroceryMutation, { name: "removeGroceryMutation" }),
  graphql(getRecipesQuery, { name: "getRecipesQuery" }),
  graphql(removeRecipeMutation, { name: "removeRecipeMutation" }),
  graphql(updateGroceryMutation, { name: "updateGroceryMutation" }),
  graphql(updateRecipeMutation, { name: "updateRecipeMutation" })
)(Groceries);
