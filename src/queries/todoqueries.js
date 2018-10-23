import { gql } from "apollo-boost";

const getTodosQuery = gql`
  {
    todos {
      name
      id
      description
      deadline
      completed
    }
  }
`;

const addTodoMutation = gql`
  mutation(
    $name: String!
    $description: String!
    $deadline: Date!
    $userId: String!
  ) {
    addTodo(
      name: $name
      description: $description
      deadline: $deadline
      userId: $userId
    ) {
      name
      id
      userId
    }
  }
`;

const updateTodoMutation = gql`
  mutation(
    $id: ID
    $name: String
    $description: String
    $deadline: Date
    $completed: Boolean
  ) {
    updateTodo(
      id: $id
      name: $name
      description: $description
      deadline: $deadline
      completed: $completed
    ) {
      id
      name
      deadline
      description
      userId
      completed
    }
  }
`;

const removeTodoMutation = gql`
  mutation($id: ID) {
    removeTodo(id: $id) {
      id
    }
  }
`;

const getTodoQuery = gql`
  query($id: ID) {
    todo(id: $id) {
      name
      id
      description
      deadline
    }
  }
`;

export {
  getTodosQuery,
  addTodoMutation,
  updateTodoMutation,
  removeTodoMutation,
  getTodoQuery
};
