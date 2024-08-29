import User from "../model/user.model";

import { random } from "../helper/randomToken";

export const resolverUser = {
  //Query
  Query: {
    //get all user
    getAllUSer: async () => {
      const users = await User.find({ deleted: false });

      return users;
    },

    //get userInfor
    getUserInfor: async (_: any, args: any, context: any) => {
      try {
        if (!context.req.user.token) {
          return {
            code: 400,
            message: "user does not exist",
          };
        }
        const token = context.req.user.token;

        const theUser = await User.findOne({ token: token });

        if (theUser) {
          return {
            code: 200,
            message: "success",
            email: theUser.email,
            token: theUser.token,
          };
        } else {
          return {
            code: 400,
            message: "user does not exist",
          };
        }
      } catch (error) {
        return {
          code: 400,
          message: "user does not exist",
        };
      }
    },
  },

  // Mutation
  Mutation: {
    // create new user
    createUser: async (_: any, args: any) => {
      const { user } = args;
      const token: string = random(20);
      user["token"] = token;

      const newUSer = new User(user);
      const data = await newUSer.save();
      return {
        fullname: data.fullname,
        email: data.email,
        code: 200,
        message: "success",
        token: data.token,
      };
    },

    //Login
    login: async (_: any, args: any) => {
      const { email, password } = args.user;

      const theUser = await User.findOne({
        email: email,
        password: password,
        deleted: false,
      });

      let loginResult = {};

      if (!theUser) {
        loginResult = {
          code: 400,
          message: "Login failed",
        };
      } else {
        loginResult = {
          code: 200,
          message: "login success",
          token: theUser.token,
        };
      }

      return loginResult;
    },
  },
};
