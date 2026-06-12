import { LoginInput, User, UserInput, UserUpdateInput } from "../libs/types/user";
import { T } from "../libs/types/common";
import express, { Request, Response } from "express";
import UserService from "../models/User.service";
import Errors from "../libs/Errors";

const userService = new UserService();

const userController: T = {};

userController.signup = async (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    const input: UserInput = req.body,
      result: User = await userService.signup(input);
    (req.session as any).user = result;

    res.json({ user: result });
  } catch (err) {
    console.log("Error SignUp", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd);
  }
};

userController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const input: LoginInput = req.body,
      result = await userService.login(input);
    (req.session as any).user = result;

    res.json({ user: result });
  } catch (err) {
    console.log("Error login", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd); 
  }
};

userController.getTopUsers = async (req: Request, res: Response) => {
  try {
    const limit = Number((req.query as any)?.limit ?? 5);
    const result = await userService.getTopUsers(limit);
    res.json(result);
  } catch (err) {
    console.log("Error getTopUsers", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd);
  }
};

userController.getStoreContact = async (req: Request, res: Response) => {
  try {
    const result = await userService.getStoreContact();
    res.json(result);
  } catch (err) {
    console.log("Error getStoreContact", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd);
  }
};

userController.updateUser = async (req: Request, res: Response) => {
  try {
    const input: UserUpdateInput = req.body;
    const file = (req as any).file as Express.Multer.File | undefined;
    if (file) {
      input.userImage = file.path.replace(/\\/g, "/");
    }

    const result = await userService.updateChosenUser(input);
    res.json(result);
  } catch (err) {
    console.log("Error updateUser", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd);
  }
};

export default userController;
