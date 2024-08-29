import Article from "../model/article.model";
import Category from "../model/category.model";

export const resolversCategory = {
  //Get data
  Query: {
    //get all category
    getAllCategory: async () => {
      const listCategory = await Category.find({ deleted: false });

      return listCategory;
    },

    getACategory: async (_, args) => {
      const { id } = args;

      const theCategory = await Category.findOne({
        _id: id,
      });

      return theCategory;
    },
  },
  //end get data

  //Mutation (create edit)
  Mutation: {
    // create category
    CreateCategory: async (_, args: any) => {
      const { category } = args;

      const newCategory = new Category(category);
      await newCategory.save();

      return newCategory;
    },

    // update category
    updateCategory: async (_, args) => {
      try {
        const { id, category } = args;
        await Category.updateOne({ _id: id }, category);

        const theCategory = await Category.findOne({ _id: id, deleted: false });
        return theCategory;
      } catch (error) {
        return null;
      }
    },

    // delete a category
    deleteCategory: async (_, args) => {
      try {
        const { id } = args;
        await Category.updateOne(
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
  },
  //end Mutation
};
