import { gql } from "apollo-boost";

const getGroceriesQuery = gql`
  {
    groceries {
      name
      id
      quantity
      completed
      order
    }
  }
`;
const getRecipesQuery = gql`
  {
    recipes {
      name
      id
      instructions
      ingredients
      completed
      order
    }
  }
`;

const addGroceryMutation = gql`
  mutation($name: String!, $quantity: String!, $userId: String!) {
    addGrocery(name: $name, quantity: $quantity, userId: $userId) {
      name
      userId
      quantity
      id
    }
  }
`;
const addRecipeMutation = gql`
  mutation(
    $name: String!
    $instructions: String!
    $ingredients: [String]!
    $userId: String!
  ) {
    addRecipe(
      name: $name
      instructions: $instructions
      ingredients: $ingredients
      userId: $userId
    ) {
      userId
      name
      id
    }
  }
`;

const removeGroceryMutation = gql`
  mutation($id: ID) {
    removeGrocery(id: $id) {
      id
    }
  }
`;
const removeRecipeMutation = gql`
  mutation($id: ID) {
    removeRecipe(id: $id) {
      id
    }
  }
`;

const getGroceryQuery = gql`
  query($id: ID) {
    grocery(id: $id) {
      name
      id
      quantity
    }
  }
`;
const getRecipeQuery = gql`
  query($id: ID) {
    recipe(id: $id) {
      name
      id
      instructions
      ingredients
    }
  }
`;

const updateGroceryMutation = gql`
  mutation(
    $id: ID
    $name: String
    $quantity: String
    $completed: Boolean
    $order: Int
  ) {
    updateGrocery(
      id: $id
      name: $name
      quantity: $quantity
      completed: $completed
      order: $order
    ) {
      id
      name
      quantity
      userId
      completed
      order
    }
  }
`;

const updateRecipeMutation = gql`
  mutation(
    $id: ID
    $name: String
    $instructions: String
    $ingredients: [String]
    $completed: Boolean
    $order: Int
  ) {
    updateRecipe(
      id: $id
      name: $name
      instructions: $instructions
      ingredients: $ingredients
      completed: $completed
      order: $order
    ) {
      id
      name
      instructions
      ingredients
      userId
      completed
      order
    }
  }
`;

export {
  getGroceriesQuery,
  addGroceryMutation,
  removeGroceryMutation,
  getGroceryQuery,
  getRecipesQuery,
  addRecipeMutation,
  removeRecipeMutation,
  getRecipeQuery,
  updateGroceryMutation,
  updateRecipeMutation
};
