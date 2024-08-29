import { gql } from "apollo-server-express";
//GraphQl
export const typeDefsCategory = gql`
  type Category {
    id: ID
    title: String
    avatar: String
  }

  type Query {
    getAllCategory: [Category]
    getACategory(id: ID): Category
  }

  input CategoryInput {
    title: String
    avatar: String
  }

  type Mutation {
    CreateCategory(category: CategoryInput): Category
    updateCategory(id: ID, category: CategoryInput): Category
    deleteCategory(id: ID): String
  }
`;
