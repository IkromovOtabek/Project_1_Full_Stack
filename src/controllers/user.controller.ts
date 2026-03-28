import { LoginInput, User, UserInput } from "../libs/types/user";
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
      //TODO: Tokens

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
      //TODO: Tokens

    res.json({ user: result });
  } catch (err) {
    console.log("Error login", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.stadanrd.code).json(Errors.stadanrd); 
  }
};

export default userController;
