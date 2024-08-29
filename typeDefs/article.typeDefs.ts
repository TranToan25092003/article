import { gql } from "apollo-server-express";
//GraphQl
export const typeDefsArticle = gql`
  type Article {
    id: ID
    title: String
    avatar: String
    description: String
    category: Category
  }

  type Query {
    getArticle(
      sortKey: String
      sortValue: String
      page: Int = 1
      limitPage: Int = 2
      filterKey: String
      filterValue: String
      keyword: String
    ): [Article]

    getSpecific(id: ID): Article
  }

  input ArticleInput {
    title: String
    avatar: String
    description: String
    categoryId: String
  }

  type Mutation {
    createArticle(article: ArticleInput): Article

    deleteArticle(id: ID): String

    updateArticle(id: ID, article: ArticleInput): Article
  }
`;
