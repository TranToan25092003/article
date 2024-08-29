import { Request, Response, NextFunction } from "express";
import User from "../model/user.model";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // check token
  try {
    if (req.headers.authorization) {
      const token: string = req.headers.authorization.split(" ")[0];
      const account = await User.findOne({
        token: token,
        deleted: false,
      }).select("-password");

      if (account) {
        req["user"] = account;
      }
    }
    next();
  } catch (error) {}
};
