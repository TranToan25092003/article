import Article from "../model/article.model";
import Category from "../model/category.model";

export const resolversArticle = {
  //Get data
  Query: {
    //get all article
    getArticle: async (_: any, args: any) => {
      const {
        sortKey,
        sortValue,
        page,
        limitPage,
        filterKey,
        filterValue,
        keyword,
      } = args;

      const condition = { deleted: false };

      // sort
      const sort = {};

      if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
      }
      //end sort

      //filter
      if (filterKey && filterValue) {
        condition[filterKey] = filterValue;
      }
      //end filter

      //search
      if (keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        condition["title"] = keywordRegex;
      }
      //end search

      const articles = await Article.find(condition)
        .sort(sort)
        .limit(limitPage)
        .skip((page - 1) * limitPage);

      return articles;
    },

    // get a specific article
    getSpecific: async (_, args) => {
      const { id } = args;
      const article = await Article.findOne({ _id: id, deleted: false });
      return article;
    },
  },
  //end get data

  // get multip type data in once time call API
  Article: {
    category: async (article) => {
      const theCategory = await Category.findOne({ _id: article.categoryId });
      return theCategory;
    },
  },

  //Mutation (create edit)
  Mutation: {
    //create new Article
    createArticle: async (_, args) => {
      const { article } = args;
      const newArticle = new Article(article);
      await newArticle.save();

      return newArticle;
    },

    // delete article
    deleteArticle: async (_, args) => {
      try {
        const { id } = args;
        await Article.updateOne(
          {
            _id: id,
          },
          {
            deleted: true,
          }
        );

        return "delete success";
      } catch (error) {
        return "delete failed";
      }
    },

    // update article
    updateArticle: async (_, args) => {
      const { id, article } = args;

      await Article.updateOne(
        {
          _id: id,
        },
        article
      );
      return article;
    },
  },
  //end Mutation
};
