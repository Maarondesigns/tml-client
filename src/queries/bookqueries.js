import { gql } from "apollo-boost";

const getBooksQuery = gql`
  {
    books {
      name
      id
      genre
      completed
      author {
        id
        name
        age
      }
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation(
    $name: String!
    $genre: [String]!
    $authorId: ID!
    $userId: String!
  ) {
    addBook(name: $name, genre: $genre, authorId: $authorId, userId: $userId) {
      name
      id
      userId
    }
  }
`;

const updateBookMutation = gql`
  mutation($id: ID, $name: String, $genre: [String], $completed: Boolean) {
    updateBook(id: $id, name: $name, genre: $genre, completed: $completed) {
      name
      id
      completed
    }
  }
`;

const addAuthorMutation = gql`
  mutation($name: String!, $age: Int!, $userId: String!) {
    addAuthor(name: $name, age: $age, userId: $userId) {
      name
      age
      userId
    }
  }
`;

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      completed
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

const removeBookMutation = gql`
  mutation($id: ID) {
    removeBook(id: $id) {
      id
    }
  }
`;

const removeAuthorMutation = gql`
  mutation($id: ID) {
    removeAuthor(id: $id) {
      id
    }
  }
`;

export {
  getAuthorsQuery,
  getBooksQuery,
  addBookMutation,
  addAuthorMutation,
  getBookQuery,
  removeBookMutation,
  removeAuthorMutation,
  updateBookMutation
};
