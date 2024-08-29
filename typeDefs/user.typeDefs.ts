import { gql } from "apollo-server-express";

export const typeDefsUser = gql`
  type User {
    fullname: String
    email: String
    code: Int
    message: String
    token: String
  }

  type Query {
    getAllUSer: [User]

    getUserInfor: User
  }

  input UserInput {
    fullname: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Mutation {
    createUser(user: UserInput): User

    login(user: LoginInput): User
  }
`;
