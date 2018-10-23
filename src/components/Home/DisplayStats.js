import React from "react";
import DisplayBars from "./DisplayBars";

const DisplayStats = ({ books, todos, groceries, recipes }) => {
  //   console.log(books, todos, groceries, recipes);
  let completeTodos = todos.filter(todo => todo.completed === true);
  let completeBooks = books.filter(book => book.completed === true);
  let completeGroceries = groceries.filter(
    grocery => grocery.completed === true
  );
  let completeRecipes = recipes.filter(recipe => recipe.completed === true);
  let incompleteTodos = todos.filter(todo => todo.completed !== true);
  let incompleteBooks = books.filter(book => book.completed !== true);
  let incompleteGroceries = groceries.filter(
    grocery => grocery.completed !== true
  );
  let incompleteRecipes = recipes.filter(recipe => recipe.completed !== true);
  return (
    <div>
      <DisplayBars
        incomplete={incompleteTodos}
        complete={completeTodos}
        type={"Todos"}
      />
      <DisplayBars
        incomplete={incompleteBooks}
        complete={completeBooks}
        type={"Books"}
      />
      <DisplayBars
        incomplete={incompleteGroceries}
        complete={completeGroceries}
        type={"Groceries"}
      />
      <DisplayBars
        incomplete={incompleteRecipes}
        complete={completeRecipes}
        type={"Recipes"}
      />
    </div>
  );
};

export default DisplayStats;
