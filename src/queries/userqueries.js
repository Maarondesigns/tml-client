import { gql } from "apollo-boost";

const getUserQuery = gql`
  query($id: ID) {
    user(id: $id) {
      username
      googleId
      facebookId
      email
      id
      avatar
    }
  }
`;

export { getUserQuery };
