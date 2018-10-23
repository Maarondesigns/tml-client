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

//components
import GroceryDetails from "./GroceryDetails";

//functions
import { selectList } from "../util_functions/selectList";
import { selectThis } from "../util_functions/selectThis";
import CompleteItem from "../Reusable/CompletedButton";

class Groceries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
      timeouts: [],
      updating: false
    };
  }

  componentWillReceiveProps() {
    this.setState({ selected: this.props.selected });
  }

  displayGroceries(type) {
    let data, mutation;
    if (type === "groceries") {
      data = this.props.getGroceriesQuery;
      mutation = this.props.updateGroceryMutation;
    } else if (type === "recipes") {
      data = this.props.getRecipesQuery;
      mutation = this.props.updateRecipeMutation;
    }
    if (data.loading === true) {
      return <div>Loading Items...</div>;
    } else {
      let dataType = data[type].filter(x => x.completed !== true);
      let completedType = data[type].filter(x => x.completed === true);
      let fontSize = { fontSize: "1.5rem" };
      return (
        <div>
          {dataType.map((item, index) => {
            return (
              <li className="book-li" id={item.id} key={item.id}>
                <CompleteItem
                  buttonId={"delete-book"}
                  buttonSymbol={"check"}
                  id={item.id}
                  thisQuery={data}
                  thisMutation={mutation}
                />
                <div
                  className="booklist-text"
                  onClick={e => {
                    let parent = e.target.parentNode;
                    this.setState({ selected: item.id, updating: false });
                    selectThis(parent);
                  }}
                >
                  {item.name}
                </div>
                <button
                  id="edit-item"
                  onClick={e => {
                    let parent = e.target.parentNode;
                    this.setState({ selected: item.id, updating: true });
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
          {completedType.map((item, index) => {
            return (
              <li className="book-li" id={item.id} key={item.id}>
                <button
                  id="delete-book"
                  onClick={e => {
                    this.removeItem(item.id, e.target.parentNode, type);
                  }}
                >
                  <i className="material-icons" style={fontSize}>
                    delete
                  </i>
                </button>
                <div className="booklist-text completed">{item.name}</div>
                <CompleteItem
                  buttonId={"edit-item"}
                  buttonSymbol={"arrow_upward"}
                  id={item.id}
                  thisQuery={data}
                  thisMutation={mutation}
                />
              </li>
            );
          })}
        </div>
      );
    }
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
    this.state.timeouts.forEach(timeout => clearTimeout(timeout));
  }

  removeItem(itemId, button, type) {
    button.classList.add("delete-button-clicked");
    let mutation, query;
    if (type === "groceries") {
      mutation = this.props.removeGroceryMutation;
      query = getGroceriesQuery;
    } else if (type === "recipes") {
      mutation = this.props.removeRecipeMutation;
      query = getRecipesQuery;
    }
    setTimeout(() => {
      mutation({
        variables: {
          id: itemId
        },
        refetchQueries: [
          {
            query: query
          }
        ]
      });
      this.setState({ selected: null, updating: false });
    }, 1500);
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
              {this.displayGroceries("recipes")}
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
              {this.displayGroceries("groceries")}
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
  graphql(getGroceriesQuery, { name: "getGroceriesQuery" }),
  graphql(removeGroceryMutation, { name: "removeGroceryMutation" }),
  graphql(getRecipesQuery, { name: "getRecipesQuery" }),
  graphql(removeRecipeMutation, { name: "removeRecipeMutation" }),
  graphql(updateGroceryMutation, { name: "updateGroceryMutation" }),
  graphql(updateRecipeMutation, { name: "updateRecipeMutation" })
)(Groceries);
