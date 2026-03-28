import express, { Request, Response } from "express";
import { T } from "../libs/types/common";
import UserService from "../models/User.service";
import { LoginInput, UserInput } from "../libs/types/user";
import { UserType } from "../libs/enums/user.enum";

const userService = new UserService();

const adminController: T = {};

adminController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home");
  } catch (err) {
    console.log("Error goHome", err);
  }
};

adminController.getSignup = (req: Request, res: Response) => {
  try {
    console.log("getSignup");
    res.render("signup");
  } catch (err) {
    console.log("Error SignUp", err);
  }
};

adminController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.render("login");
  } catch (err) {
    console.log("Error Login", err);
  }
};

adminController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("getSignup");

    const newUser: UserInput = req.body;
    newUser.userType = UserType.ADMIN;
    const result = await userService.processSignup(newUser);
    //TODO: SESSIONS AUTHENTICATION

    res.send(result);
  } catch (err) {
    console.log("Error SignUp", err);
    res.send(err);
  }
};

adminController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("proccessLogin");
    const input: LoginInput = req.body;
    const result = await userService.processLogin(input);
    //TODO: SESSIONS AUTHENTICATION

    res.send("DONE");
  } catch (err) {
    console.log("Error proccessLogin", err);
    res.send(err);
  }
};

export default adminController;
