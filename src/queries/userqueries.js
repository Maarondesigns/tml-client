import { gql } from "apollo-boost";

const getUserQuery = gql`
  query($id: ID, $email: String, $username: String) {
    user(id: $id, email: $email, username: $username) {
      username
      googleId
      facebookId
      email
      id
      avatar
      bio
      links
      password
    }
  }
`;

const updateUserMutation = gql`
  mutation(
    $id: ID
    $username: String
    $password: String
    $hash: String
    $new_pass: String
    $email: String
    $googleId: String
    $facebookId: String
    $avatar: String
    $bio: String
    $links: [String]
  ) {
    updateUser(
      id: $id
      password: $password
      hash: $hash
      new_pass: $new_pass
      username: $username
      email: $email
      googleId: $googleId
      facebookId: $facebookId
      avatar: $avatar
      bio: $bio
      links: $links
    ) {
      id
      username
      email
      avatar
      bio
      links
      password
    }
  }
`;

export { updateUserMutation, getUserQuery };
